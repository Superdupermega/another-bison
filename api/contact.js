import { withDb, readJson, json, isEmail, clip } from './_db.js';
export async function run(req, res, sql) {
  const b = await readJson(req, 50_000);
  if (!isEmail(b.email)) return json(res, 400, { ok: false, reason: 'invalid_email' });
  const name = clip(b.name, 200); if (!name) return json(res, 400, { ok: false, reason: 'name_required' });
  await sql`insert into contacts (name, email, company, interest, message)
            values (${name}, ${b.email.toLowerCase()}, ${clip(b.company, 200)}, ${clip(b.interest, 120)}, ${clip(b.message, 5000)})`;
  return json(res, 200, { ok: true });
}
export default withDb(['POST'], run);
