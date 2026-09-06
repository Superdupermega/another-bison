// Shared database helper for Vercel serverless functions.
// Uses Neon's HTTP driver (free tier: vercel.com/marketplace/neon). Reads DATABASE_URL or POSTGRES_URL.
// Every handler degrades to HTTP 503 with {ok:false, reason:"db_unconfigured"} when no URL is set,
// so the static site keeps working (forms fall back to mailto, tools to localStorage).
import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

let sqlInstance = null;
let schemaReady = null;

export function dbUrl() {
  return process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.NEON_DATABASE_URL || '';
}

export function getSql() {
  if (!dbUrl()) return null;
  if (!sqlInstance) sqlInstance = neon(dbUrl());
  return sqlInstance;
}

export async function ensureSchema(sql) {
  if (!schemaReady) {
    const here = dirname(fileURLToPath(import.meta.url));
    let ddl;
    try { ddl = readFileSync(join(here, '..', 'db', 'schema.sql'), 'utf8'); }
    catch { ddl = readFileSync(join(process.cwd(), 'db', 'schema.sql'), 'utf8'); }
    const stmts = ddl.split(/;\s*\n/).map(s => s.replace(/--[^\n]*/g, '').trim()).filter(Boolean);
    schemaReady = (async () => { for (const s of stmts) await sql.query(s); })().catch(e => { schemaReady = null; throw e; });
  }
  return schemaReady;
}

export function json(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

export async function readJson(req, limit = 200_000) {
  if (req.body && typeof req.body === 'object') return req.body;
  const chunks = []; let size = 0;
  for await (const c of req) { size += c.length; if (size > limit) throw new Error('payload_too_large'); chunks.push(c); }
  const raw = Buffer.concat(chunks).toString('utf8');
  if (!raw) return {};
  try { return JSON.parse(raw); } catch { throw new Error('invalid_json'); }
}

export const isEmail = s => typeof s === 'string' && s.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
export const clip = (s, n) => (typeof s === 'string' ? s.slice(0, n) : '');

// Wraps a handler: method check, db presence, schema, uniform errors.
export function withDb(methods, fn) {
  return async (req, res) => {
    if (!methods.includes(req.method)) return json(res, 405, { ok: false, reason: 'method_not_allowed' });
    const sql = getSql();
    if (!sql) return json(res, 503, { ok: false, reason: 'db_unconfigured', hint: 'Set DATABASE_URL (Neon) in Vercel project settings.' });
    try { await ensureSchema(sql); return await fn(req, res, sql); }
    catch (e) {
      const known = ['payload_too_large', 'invalid_json'];
      if (known.includes(e.message)) return json(res, 400, { ok: false, reason: e.message });
      console.error(e);
      return json(res, 500, { ok: false, reason: 'server_error' });
    }
  };
}
