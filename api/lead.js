import { withDb, readJson, json, isEmail, clip } from './_db.js';
export async function run(req, res, sql) {
  const b = await readJson(req, 20_000);
  if (!isEmail(b.email)) return json(res, 400, { ok: false, reason: 'invalid_email' });
  const source = clip(b.source || 'unknown', 64);
  const context = (b.context && typeof b.context === 'object') ? b.context : {};
  await sql`insert into leads (email, source, context) values (${b.email.toLowerCase()}, ${source}, ${JSON.stringify(context)}::jsonb)`;
  return json(res, 200, { ok: true });
}
export default withDb(['POST'], run);
