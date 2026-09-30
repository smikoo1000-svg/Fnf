"""Transkun v2 (pip 패키지 transkun==2.0.1, MIT) 를 브라우저용 ONNX 두 개로 변환한다.

  vendor/transkun/tk_core.onnx  frames[C,T,4096] → posIdx[K,3](end,begin,sym) · posVal[K] · ctx[90,T,256]
  vendor/transkun/tk_attr.onnx  ctxBegin[N,256] · ctxEnd[N,256] → velocity[N] · ofValue[N,2] · presence[N,2]

후처리(semi-CRF 비터비, 구간 이어 붙이기)는 js/analysis/transkun.js 가 원본과 같게 수행한다.
구간 점수 행렬 S[T,T,90] 는 16초 구간에서 171MB 이므로, 비터비에 실제로 쓰이는 양수 항목만 희소하게 내보낸다
(스킵 점수가 0 이라 0 이하 구간은 절대 선택되지 않으므로 결과는 같다. tests/metrics.test.js 참고).

사용법 (CPU 만으로 충분):
  python -m venv venv && . venv/bin/activate
  pip install --index-url https://download.pytorch.org/whl/cpu torch torchaudio
  pip install onnx onnxruntime onnxscript moduleconf numpy
  pip download transkun==2.0.1 --no-deps -d tk && (cd tk && unzip -oq transkun-2.0.1-py3-none-any.whl)
  python scripts/transkun/export_onnx.py tk vendor/transkun
"""
import math, os, sys

import numpy as np
import onnx
import torch
import torch.nn as nn
from onnx import TensorProto, helper, numpy_helper

src, out_dir = sys.argv[1], sys.argv[2]
sys.path.insert(0, src)
import moduleconf  # noqa: E402
import transkun.LayersTransformer as LT  # noqa: E402

torch.set_grad_enabled(False)


def load_model():
    conf = moduleconf.parseFromFile(os.path.join(src, "transkun/pretrained/2.0.conf"))
    model = conf["Model"].module.TransKun(conf=conf["Model"].config)
    ck = torch.load(os.path.join(src, "transkun/pretrained/2.0.pt"), map_location="cpu")
    model.load_state_dict(ck["best_state_dict"] if "best_state_dict" in ck else ck["state_dict"], strict=False)
    model.backbone.useGradientCheckpoint = False  # 추론에는 불필요하고 ONNX 추적을 방해함
    return model.eval()


def sdpa_manual(q, k, v, *args, **kwargs):
    """F.scaled_dot_product_attention 과 같은 계산. 원본은 5차원 텐서를 넘기는데 ONNX 변환기는 4차원만 지원한다."""
    return torch.softmax((q @ k.transpose(-1, -2)) * (q.shape[-1] ** -0.5), dim=-1) @ v


class PatchedF:
    def __getattr__(self, name):
        return sdpa_manual if name == "scaled_dot_product_attention" else getattr(torch.nn.functional, name)


LT.F = PatchedF()


class Core(nn.Module):
    """원본 TransKun.processFramesBatch 에서 CRF 직전까지 (gain 정규화 → 멜 스펙트럼 → 백본 → 구간 점수)"""

    def __init__(self, m):
        super().__init__()
        self.m = m
        self.register_buffer("targets", torch.tensor(m.targetMIDIPitch))

    def forward(self, frames):
        m = self.m
        x = frames.unsqueeze(0)  # [1, C, T, W]
        x = (x - x.mean(dim=[1, 2, 3], keepdim=True)) / (x.std(dim=[1, 2, 3], keepdim=True) + 1e-8)
        feat = m.framewiseFeatureExtractor(x).contiguous()
        feat = feat.view(1, *feat.shape[-3:])
        ctx = m.backbone(feat, outputIndices=self.targets)  # [1, 90, T, 256]
        S, _ = m.scorer(ctx)  # [T, T, 1, 90]
        S = S[:, :, 0, :]
        T = S.shape[0]
        mask = (S > 0) & torch.ones(T, T, dtype=torch.bool).tril().unsqueeze(-1)
        return torch.nonzero(mask), S[mask], ctx[0]


def cb_mean(logits):
    """ContinuousBernoulli(logits).mean 을 데이터 의존 분기 없이 같은 식으로"""
    eps = torch.finfo(logits.dtype).eps
    probs = torch.clamp(torch.sigmoid(logits), eps, 1 - eps)
    outside = (probs <= 0.499) | (probs > 0.501)
    cut = torch.where(outside, probs, torch.full_like(probs, 0.499))
    mus = cut / (2.0 * cut - 1.0) + 1.0 / (torch.log1p(-cut) - torch.log(cut))
    x = probs - 0.5
    return torch.where(outside, mus, 0.5 + (1.0 / 3.0 + 16.0 / 45.0 * x * x) * x)


class Attr(nn.Module):
    """원본 transcribeFrames 의 구간 속성 예측 (velocityCriteron="hamming")"""

    def __init__(self, m):
        super().__init__()
        self.vel, self.of = m.velocityPredictor, m.refinedOFPredictor

    def forward(self, a, b):
        x = torch.cat([a, b, a * b], dim=-1)
        ofLogit, presLogit = self.of(x).chunk(2, dim=-1)
        return torch.argmax(self.vel(x), dim=-1), torch.clamp((cb_mean(ofLogit) - 0.5) / 0.99, -0.5, 0.5), presLogit > 0


def fp16_storage(path):
    """큰 float32 가중치를 float16 으로 저장하고 Cast 로 되돌린다 (ORT 가 세션 생성 시 상수 접기 → 실행은 float32)."""
    m = onnx.load(path)
    g = m.graph
    inits, casts = [], []
    for init in g.initializer:
        if init.data_type == TensorProto.FLOAT and np.prod(init.dims) >= 1024:
            h = numpy_helper.from_array(numpy_helper.to_array(init).astype(np.float16), init.name + "__fp16")
            inits.append(h)
            casts.append(helper.make_node("Cast", [h.name], [init.name], to=TensorProto.FLOAT, name=init.name + "__cast"))
        else:
            inits.append(init)
    g.ClearField("initializer"); g.initializer.extend(inits)
    nodes = list(g.node); g.ClearField("node"); g.node.extend(casts + nodes)
    g.ClearField("value_info")
    onnx.checker.check_model(m)
    for f in (path, path + ".data"):
        if os.path.exists(f): os.remove(f)
    onnx.save(m, path)


os.makedirs(out_dir, exist_ok=True)
model = load_model()
frames = torch.randn(2, 346, 4096) * 0.1
T, C = torch.export.Dim("T", min=16, max=2048), torch.export.Dim("C", min=1, max=2)
core_path = os.path.join(out_dir, "tk_core.onnx")
torch.onnx.export(Core(model).eval(), (frames,), core_path, dynamo=True, opset_version=18, input_names=["frames"],
                  output_names=["posIdx", "posVal", "ctx"], dynamic_shapes=({0: C, 1: T},), external_data=False)
N = torch.export.Dim("N", min=1, max=100000)
attr_path = os.path.join(out_dir, "tk_attr.onnx")
torch.onnx.export(Attr(model).eval(), (torch.randn(7, 256), torch.randn(7, 256)), attr_path, dynamo=True, opset_version=18,
                  input_names=["ctxBegin", "ctxEnd"], output_names=["velocity", "ofValue", "presence"],
                  dynamic_shapes=({0: N}, {0: N}), external_data=False)
for p in (core_path, attr_path):
    fp16_storage(p)
    print(p, os.path.getsize(p) // 1024, "KB")
