"""mir_eval / Transkun 기준으로 JS 채점 함수(js/eval/metrics.js)의 기대값 픽스처를 만든다.
사용법: pip install mir_eval numpy && python scripts/eval/make_metric_fixtures.py [transkun 소스 경로]
결과: tests/fixtures/metric_cases.json
"""
import json, sys, random
import numpy as np, mir_eval

rng = random.Random(1234)

def to_arrays(notes):
    iv = np.array([[n["start"], n["end"]] for n in notes]).reshape(-1, 2)
    p = np.array([mir_eval.util.midi_to_hz(n["pitch"]) for n in notes])
    return iv, p

def score(ref, est):
    ri, rp = to_arrays(ref); ei, ep = to_arrays(est)
    on = mir_eval.transcription.precision_recall_f1_overlap(ri, rp, ei, ep, offset_ratio=None)
    oo = mir_eval.transcription.precision_recall_f1_overlap(ri, rp, ei, ep)
    return {"onset": list(on[:3]), "onsetOffset": list(oo[:3])}

cases = []
# 1) 경계값: 정확히 50ms 차이는 맞음, 50.1ms 는 틀림 / 이분 매칭이 필요한 배치
cases.append({"name": "tolerance-edges", "ref": [
    {"start": 1.0, "end": 1.5, "pitch": 60}, {"start": 2.0, "end": 2.2, "pitch": 62}, {"start": 3.0, "end": 4.0, "pitch": 64}],
    "est": [{"start": 1.05, "end": 1.55, "pitch": 60}, {"start": 2.0501, "end": 2.2, "pitch": 62}, {"start": 3.0, "end": 4.2, "pitch": 64}]})
cases.append({"name": "bipartite", "ref": [
    {"start": 1.00, "end": 2.0, "pitch": 60}, {"start": 1.06, "end": 2.0, "pitch": 60}],
    "est": [{"start": 1.03, "end": 2.0, "pitch": 60}, {"start": 1.09, "end": 2.0, "pitch": 60}]})
# 2) 무작위 사례
for k in range(12):
    ref = []
    for _ in range(rng.randint(20, 120)):
        s = rng.uniform(0, 30); ref.append({"start": s, "end": s + rng.uniform(0.03, 2.0), "pitch": rng.randint(40, 90)})
    est = []
    for r in ref:
        if rng.random() < 0.12: continue
        j = lambda sd: rng.gauss(0, sd)
        est.append({"start": max(0, r["start"] + j(0.03)), "end": r["end"] + j(0.08), "pitch": r["pitch"] + (rng.choice([12, -12, 1]) if rng.random() < 0.05 else 0)})
    for _ in range(rng.randint(0, 15)):
        s = rng.uniform(0, 30); est.append({"start": s, "end": s + rng.uniform(0.05, 1), "pitch": rng.randint(40, 90)})
    for e in est: e["end"] = max(e["end"], e["start"] + 0.01)
    cases.append({"name": f"random-{k}", "ref": ref, "est": est})
for c in cases: c["expected"] = score(c["ref"], c["est"])

# 3) 페달 연장: transkun.Data.extendPedal 결과
pedal_cases = []
if len(sys.argv) > 1:
    sys.path.insert(0, sys.argv[1])
    from transkun.Data import extendPedal, Note
    for k in range(6):
        notes = []
        for _ in range(60):
            s = rng.uniform(0, 20); notes.append({"start": round(s, 4), "end": round(s + rng.uniform(0.05, 1.5), 4), "pitch": rng.randint(50, 70), "velocity": 64})
        pedals, t = [], 0.0
        while t < 20:
            s = t + rng.uniform(0.2, 2); e = s + rng.uniform(0.3, 3); pedals.append({"start": round(s, 4), "end": round(e, 4), "pitch": -64, "velocity": 127}); t = e
        ext = extendPedal([Note(**n) for n in notes], [Note(**p) for p in pedals])
        pedal_cases.append({"notes": notes, "pedals": pedals, "expected": [{"start": n.start, "end": n.end, "pitch": n.pitch} for n in ext]})
json.dump({"cases": cases, "pedalCases": pedal_cases}, open("tests/fixtures/metric_cases.json", "w"))
print(len(cases), "metric cases,", len(pedal_cases), "pedal cases")
