"""MAESTRO v3 테스트 세트 일부를 HTTP Range 요청으로 받는다 (전체 zip 108GB 를 내려받지 않음).
사용법: python scripts/eval/fetch_maestro.py [저장 폴더=data/maestro] [곡 목록=scripts/eval/maestro-subset.json]
대상 곡: scripts/eval/maestro-subset.json (평가용, 테스트 세트) / maestro-tune.json (후처리 값 조정용, 검증 세트)   /   데이터 라이선스: CC BY-NC-SA 4.0 (저장소에는 포함하지 않음)
"""
import io, json, os, sys, urllib.request, zipfile

URL = "https://storage.googleapis.com/magentadata/datasets/maestro/v3.0.0/maestro-v3.0.0.zip"


class RangeFile(io.RawIOBase):
    """zipfile 이 필요한 부분(중앙 디렉터리, 개별 파일)만 Range 요청으로 읽는 파일 객체"""

    def __init__(self, url):
        self.url, self.pos = url, 0
        self.size = int(urllib.request.urlopen(urllib.request.Request(url, method="HEAD")).headers["Content-Length"])

    def seekable(self): return True
    def readable(self): return True
    def tell(self): return self.pos

    def seek(self, off, whence=0):
        self.pos = off if whence == 0 else self.pos + off if whence == 1 else self.size + off
        return self.pos

    def readinto(self, b):
        if self.pos >= self.size: return 0
        end = min(self.size, self.pos + len(b)) - 1
        data = urllib.request.urlopen(urllib.request.Request(self.url, headers={"Range": f"bytes={self.pos}-{end}"})).read()
        b[:len(data)] = data
        self.pos += len(data)
        return len(data)


here = os.path.dirname(os.path.abspath(__file__))
out_dir = sys.argv[1] if len(sys.argv) > 1 else os.path.join(here, "..", "..", "data", "maestro")
os.makedirs(out_dir, exist_ok=True)
subset = json.load(open(sys.argv[2] if len(sys.argv) > 2 else os.path.join(here, "maestro-subset.json"), encoding="utf-8"))
zf = zipfile.ZipFile(io.BufferedReader(RangeFile(URL), buffer_size=8 << 20))
for r in subset:
    for key, ext in (("midi", ".midi"), ("audio", ".wav")):
        out = os.path.join(out_dir, r["id"] + ext)
        if os.path.exists(out): continue
        with zf.open("maestro-v3.0.0/" + r[key]) as src, open(out + ".part", "wb") as dst:
            while chunk := src.read(8 << 20): dst.write(chunk)
        os.replace(out + ".part", out)
        print("저장:", out, flush=True)
print("완료:", out_dir)
