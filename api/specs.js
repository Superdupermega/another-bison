// POST {title, yaml, lint?, sss?} -> {id, url}; GET ?id=... -> the stored spec.
import { withDb, readJson, json, clip } from './_db.js';
import { randomBytes } from 'node:crypto';
export async function run(req, res, sql) {
  if (req.method === 'GET') {
    const id = new URL(req.url, 'http://x').searchParams.get('id') || '';
    if (!/^[a-z0-9]{10,16}$/.test(id)) return json(res, 400, { ok: false, reason: 'invalid_id' });
    const r = await sql`select id, title, yaml, lint, sss, form, created_at from specs where id = ${id}`;
    if (!r.length) return json(res, 404, { ok: false, reason: 'not_found' });
    return json(res, 200, { ok: true, spec: r[0] });
  }
  const b = await readJson(req, 200_000);
  const y = clip(b.yaml, 150_000); if (!y || y.length < 20) return json(res, 400, { ok: false, reason: 'yaml_required' });
  const id = randomBytes(8).toString('base64url').replace(/[^a-z0-9]/gi, '').toLowerCase().slice(0, 12).padEnd(10, '0');
  const lint = Array.isArray(b.lint) ? b.lint.slice(0, 50) : null;
  const sss = Number.isFinite(+b.sss) ? Math.max(0, Math.min(100, +b.sss)) : null;
  const form = (b.form && typeof b.form === 'object' && JSON.stringify(b.form).length < 160_000) ? JSON.stringify(b.form) : null;
  await sql`insert into specs (id, title, yaml, lint, sss, form) values (${id}, ${clip(b.title, 200)}, ${y}, ${lint ? JSON.stringify(lint) : null}::jsonb, ${sss}, ${form}::jsonb)`;
  return json(res, 200, { ok: true, id, url: `/tools/spec-builder.html?id=${id}` });
}
export default withDb(['POST', 'GET'], run);
