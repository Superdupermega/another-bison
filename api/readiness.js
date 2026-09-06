// POST {total, dims:{Intent:..}, answers:[..12]} anonymous; GET -> aggregate benchmark.
import { withDb, readJson, json } from './_db.js';
const DIMS = ['Intent', 'Topology', 'Verification', 'Accountability'];
export async function run(req, res, sql) {
  if (req.method === 'GET') {
    const agg = await sql`select count(*)::int as n, round(avg(total))::int as avg_total,
      round(avg((dims->>'Intent')::numeric))::int as intent,
      round(avg((dims->>'Topology')::numeric))::int as topology,
      round(avg((dims->>'Verification')::numeric))::int as verification,
      round(avg((dims->>'Accountability')::numeric))::int as accountability
      from readiness`;
    const a = agg[0];
    return json(res, 200, { ok: true, n: a.n, avg_total: a.avg_total, dims: { Intent: a.intent, Topology: a.topology, Verification: a.verification, Accountability: a.accountability } });
  }
  const b = await readJson(req, 10_000);
  const total = Math.round(+b.total);
  if (!Number.isFinite(total) || total < 0 || total > 100) return json(res, 400, { ok: false, reason: 'invalid_total' });
  const answers = Array.isArray(b.answers) ? b.answers.slice(0, 24).map(x => Math.max(0, Math.min(3, Math.round(+x) || 0))) : [];
  if (answers.length < 12) return json(res, 400, { ok: false, reason: 'incomplete' });
  const dims = {}; for (const d of DIMS) { const v = +((b.dims || {})[d]); dims[d] = Number.isFinite(v) ? Math.max(0, Math.min(100, Math.round(v))) : null; }
  await sql`insert into readiness (total, dims, answers) values (${total}, ${JSON.stringify(dims)}::jsonb, ${answers})`;
  return json(res, 200, { ok: true });
}
export default withDb(['POST', 'GET'], run);
