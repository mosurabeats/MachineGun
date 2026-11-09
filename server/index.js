// LINEAGE server: serves the static app and proxies AI Mentor requests so the
// API key never reaches the browser. No user data is stored server-side.

import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { reviewUpload, aiAvailable } from './mentor.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'public');
const PORT = Number(process.env.PORT) || 3000;
const MAX_BODY = 30 * 1024 * 1024;
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon' };
const IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const UPLOAD_TYPES = new Set(['synthetic', 'setup', 'video', 'stencil', 'supervised', 'healed', 'notes', 'design']);

function send(res, status, body, type = 'application/json') {
  res.writeHead(status, { 'Content-Type': type, 'X-Content-Type-Options': 'nosniff' });
  res.end(typeof body === 'string' || Buffer.isBuffer(body) ? body : JSON.stringify(body));
}

async function readBody(req) {
  let size = 0;
  const chunks = [];
  for await (const c of req) {
    size += c.length;
    if (size > MAX_BODY) throw Object.assign(new Error('Upload too large'), { status: 413 });
    chunks.push(c);
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

export function validateMentorRequest(body) {
  if (!body || typeof body !== 'object') return 'Invalid request';
  if (!UPLOAD_TYPES.has(body.uploadType)) return 'Unknown upload type';
  if (!Array.isArray(body.images ?? [])) return 'images must be an array';
  if ((body.images ?? []).length > 6) return 'At most 6 images';
  for (const img of body.images ?? []) {
    if (!IMAGE_TYPES.has(img?.media_type) || typeof img?.data !== 'string' || !img.data) return 'Unsupported image';
  }
  if (!(body.images ?? []).length && !String(body.notes ?? '').trim()) return 'Nothing to review';
  return null;
}

async function handleMentor(req, res) {
  if (!aiAvailable()) return send(res, 503, { error: 'AI Mentor is not configured (set ANTHROPIC_API_KEY).' });
  let body;
  try { body = await readBody(req); } catch (e) { return send(res, e.status || 400, { error: e.message }); }
  const problem = validateMentorRequest(body);
  if (problem) return send(res, 400, { error: problem });
  try {
    const result = await reviewUpload(body);
    send(res, 200, { result });
  } catch (e) {
    console.error('[mentor]', e.status || '', e.message);
    send(res, e.status && e.status < 600 ? e.status : 502, { error: e.status === 422 || e.status === 502 ? e.message : 'AI Mentor request failed.' });
  }
}

async function serveStatic(req, res) {
  const url = new URL(req.url, 'http://localhost');
  let p = decodeURIComponent(url.pathname);
  if (p === '/') p = '/index.html';
  const file = path.resolve(ROOT, '.' + p);
  if (!file.startsWith(ROOT + path.sep)) return send(res, 403, 'Forbidden', 'text/plain');
  try {
    const s = await stat(file);
    if (!s.isFile()) throw new Error('not a file');
    send(res, 200, await readFile(file), TYPES[path.extname(file)] || 'application/octet-stream');
  } catch {
    send(res, 404, 'Not found', 'text/plain');
  }
}

export const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/api/health') return send(res, 200, { ai: aiAvailable() });
  if (req.method === 'POST' && req.url === '/api/mentor') return handleMentor(req, res);
  if (req.method === 'GET' || req.method === 'HEAD') return serveStatic(req, res);
  send(res, 405, 'Method not allowed', 'text/plain');
});

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  server.listen(PORT, () => console.log(`LINEAGE running at http://localhost:${PORT}${aiAvailable() ? '' : ' (AI Mentor offline: set ANTHROPIC_API_KEY)'}`));
}
