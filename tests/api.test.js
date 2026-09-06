// Handler tests against a fake sql tag (no network). Run: npm test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Readable } from 'node:stream';
import * as db from '../api/_db.js';
import { run as lead } from '../api/lead.js';
import { run as contact } from '../api/contact.js';
import { run as specs } from '../api/specs.js';
import { run as readiness } from '../api/readiness.js';

function fake(rows = []) { const calls = []; const sql = async (strings, ...vals) => { calls.push({ q: strings.join('$'), vals }); return rows; }; sql.calls = calls; return sql; }
function req(method, body, url = '/api/x') { const r = Readable.from([Buffer.from(JSON.stringify(body || {}))]); r.method = method; r.url = url; r.headers = {}; return r; }
function res() { return { headers: {}, setHeader(k, v) { this.headers[k] = v; }, end(b) { this.body = JSON.parse(b); } }; }

test('helpers: readJson, isEmail, clip', async () => {
  assert.deepEqual(await db.readJson(req('POST', { a: 1 })), { a: 1 });
  await assert.rejects(db.readJson(req('POST', { big: 'x'.repeat(100) }), 50), /payload_too_large/);
  assert.equal(db.isEmail('a@b.co'), true); assert.equal(db.isEmail('nope'), false);
  assert.equal(db.clip('abcdef', 3), 'abc'); assert.equal(db.clip(5, 3), '');
});
test('withDb: 405 on wrong method, 503 when db unconfigured', async () => {
  delete process.env.DATABASE_URL; delete process.env.POSTGRES_URL;
  const h = db.withDb(['POST'], async () => {});
  let r = res(); await h(req('GET'), r); assert.equal(r.statusCode, 405);
  r = res(); await h(req('POST'), r); assert.equal(r.statusCode, 503); assert.equal(r.body.reason, 'db_unconfigured');
});
test('lead: rejects bad email, inserts good one lowercased', async () => {
  let sql = fake(), r = res(); await lead(req('POST', { email: 'bad' }), r, sql); assert.equal(r.statusCode, 400);
  sql = fake(); r = res(); await lead(req('POST', { email: 'A@B.CO', source: 'spec-builder-copy', context: { title: 'x' } }), r, sql);
  assert.equal(r.statusCode, 200); assert.match(sql.calls[0].q, /insert into leads/); assert.equal(sql.calls[0].vals[0], 'a@b.co');
});
test('contact: requires name and email', async () => {
  let sql = fake(), r = res(); await contact(req('POST', { email: 'a@b.co' }), r, sql); assert.equal(r.body.reason, 'name_required');
  sql = fake(); r = res(); await contact(req('POST', { name: 'T', email: 'a@b.co', message: 'hi' }), r, sql); assert.equal(r.statusCode, 200); assert.match(sql.calls[0].q, /insert into contacts/);
});
test('specs: stores yaml and returns id; GET validates id and 404s', async () => {
  let sql = fake(), r = res(); await specs(req('POST', { title: 'T', yaml: 'bis: "0.1"\ntitle: T\nowner: Head of X\n', sss: 88.2 }), r, sql);
  assert.equal(r.statusCode, 200); assert.match(r.body.id, /^[a-z0-9]{10,12}$/); assert.match(r.body.url, /spec-builder\.html\?id=/); assert.equal(sql.calls[0].vals[4], 88.2);
  sql = fake(); r = res(); await specs(req('GET', null, '/api/specs?id=BAD!'), r, sql); assert.equal(r.statusCode, 400);
  sql = fake([]); r = res(); await specs(req('GET', null, '/api/specs?id=abcdefghij'), r, sql); assert.equal(r.statusCode, 404);
  sql = fake([{ id: 'abcdefghij', title: 'T', yaml: 'x' }]); r = res(); await specs(req('GET', null, '/api/specs?id=abcdefghij'), r, sql); assert.equal(r.body.spec.title, 'T');
});
test('readiness: validates, clamps, aggregates', async () => {
  let sql = fake(), r = res(); await readiness(req('POST', { total: 50, answers: [1, 2] }), r, sql); assert.equal(r.body.reason, 'incomplete');
  sql = fake(); r = res(); await readiness(req('POST', { total: 50, dims: { Intent: 140, Topology: 20 }, answers: Array(12).fill(9) }), r, sql);
  assert.equal(r.statusCode, 200); assert.equal(JSON.parse(sql.calls[0].vals[1]).Intent, 100); assert.equal(sql.calls[0].vals[2][0], 3);
  sql = fake([{ n: 4, avg_total: 52, intent: 40, topology: 55, verification: 60, accountability: 50 }]); r = res(); await readiness(req('GET'), r, sql);
  assert.equal(r.body.n, 4); assert.equal(r.body.dims.Topology, 55);
});
