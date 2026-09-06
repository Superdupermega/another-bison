// Local dev server: static site from ./site plus the Vercel API handlers from ./api.
// Usage: DATABASE_URL=... node scripts/dev-server.mjs [port]
// Without DATABASE_URL the JS handlers return 503 (db_unconfigured) exactly as in production.
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { spawn } from 'node:child_process';

const port = +(process.argv[2] || 8080);
const site = join(process.cwd(), 'site');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml', '.yaml': 'text/yaml' };
const handlers = {};
for (const n of ['health', 'lead', 'contact', 'specs', 'readiness']) handlers[n] = (await import(`../api/${n}.js`)).default;

function pySpec(req, res) {
  const chunks = []; req.on('data', c => chunks.push(c)); req.on('end', () => {
    const py = spawn('python3', ['-c', `import sys,json,importlib.util
s=importlib.util.spec_from_file_location('specapi','api/spec.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
try: code,body=m.process(json.loads(sys.stdin.read() or '{}'))
except Exception as e: code,body=400,{'ok':False,'reason':'invalid_json','detail':str(e)}
print(json.dumps({'code':code,'body':body}))`]);
    let out = ''; py.stdout.on('data', d => out += d); py.stderr.on('data', d => process.stderr.write(d));
    py.on('close', () => { try { const r = JSON.parse(out); res.statusCode = r.code; res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(r.body)); } catch { res.statusCode = 500; res.end('{"ok":false}'); } });
    py.stdin.end(Buffer.concat(chunks));
  });
}

http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  if (url.pathname.startsWith('/api/')) {
    const name = url.pathname.slice(5).replace(/\/$/, '');
    if (name === 'spec') return pySpec(req, res);
    if (handlers[name]) return handlers[name](req, res);
    res.statusCode = 404; return res.end('{"ok":false,"reason":"no_such_endpoint"}');
  }
  let p = normalize(url.pathname).replace(/^(\.\.[/\\])+/, ''); if (p === '/' || p === '\\') p = '/index.html';
  let file = join(site, p);
  try { if ((await stat(file)).isDirectory()) file = join(file, 'index.html'); } catch { if (!extname(file)) file += '.html'; }
  try { await stat(file); } catch { res.statusCode = 404; return res.end('Not found'); }
  res.setHeader('Content-Type', types[extname(file)] || 'application/octet-stream');
  createReadStream(file).pipe(res);
}).listen(port, () => console.log(`bison dev server http://localhost:${port}`));
