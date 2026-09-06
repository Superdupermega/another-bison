import { getSql, json, dbUrl } from './_db.js';
export default async function handler(req, res) {
  const sql = getSql();
  if (!sql) return json(res, 200, { ok: true, db: 'unconfigured' });
  try { const r = await sql`select now() as now`; return json(res, 200, { ok: true, db: 'connected', now: r[0].now, host: new URL(dbUrl()).host }); }
  catch (e) { return json(res, 200, { ok: false, db: 'error', error: String(e.message || e) }); }
}
