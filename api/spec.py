"""Hosted BIS services: POST /api/spec with JSON {"yaml": "...", "op": "lint" | "sss" | "both"}.
Returns lint findings and, for sss, the Spec Sufficiency Score computed with the mock runner
(the reference harness; plug in real agent runs with tools/sss/sss.py --runner cmd)."""
import json, os, sys, importlib.util
from http.server import BaseHTTPRequestHandler

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
def _load(name, rel):
    spec = importlib.util.spec_from_file_location(name, os.path.join(ROOT, rel))
    mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod); return mod

def process(payload):
    import yaml
    text = payload.get('yaml') or ''
    if not isinstance(text, str) or len(text) > 150_000: return 400, {'ok': False, 'reason': 'yaml_required'}
    op = payload.get('op', 'both')
    try: doc = yaml.safe_load(text)
    except Exception as e: return 400, {'ok': False, 'reason': 'yaml_parse_error', 'detail': str(e)[:300]}
    if not isinstance(doc, dict): return 400, {'ok': False, 'reason': 'yaml_not_mapping'}
    out = {'ok': True}
    lint = _load('bislint', 'tools/bis-lint.py')
    F, W = lint.lint(doc); out['lint'] = {'failures': F, 'warnings': W, 'pass': not F}
    if op in ('sss', 'both'):
        sss = _load('sss', 'tools/sss/sss.py')
        results = [sss.mock_run(doc, 1000 + i) for i in range(3)]
        rep = sss.score(results); rep['questions'] = sorted({q for r in results for q in r['questions']}); rep['runner'] = 'mock'
        out['sss'] = rep
    return 200, out

class handler(BaseHTTPRequestHandler):
    def _send(self, code, body):
        data = json.dumps(body).encode()
        self.send_response(code); self.send_header('Content-Type', 'application/json'); self.send_header('Cache-Control', 'no-store')
        self.send_header('Content-Length', str(len(data))); self.end_headers(); self.wfile.write(data)
    def do_POST(self):
        n = int(self.headers.get('Content-Length') or 0)
        if n > 200_000: return self._send(400, {'ok': False, 'reason': 'payload_too_large'})
        try: payload = json.loads(self.rfile.read(n) or b'{}')
        except Exception: return self._send(400, {'ok': False, 'reason': 'invalid_json'})
        try: code, body = process(payload)
        except Exception as e: code, body = 500, {'ok': False, 'reason': 'server_error', 'detail': str(e)[:300]}
        self._send(code, body)
    def do_GET(self): self._send(200, {'ok': True, 'usage': 'POST {"yaml": "...", "op": "lint|sss|both"}'})
