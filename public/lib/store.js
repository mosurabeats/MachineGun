// Local persistence. Structured state lives in localStorage; photos and videos
// live in IndexedDB. Everything stays on this device unless the apprentice
// sends an upload to the AI Mentor or exports a backup.

import { DEFAULT_ALLOCATION } from './logic.js';

const KEY = 'lineage.state.v1';

const EMPTY = () => ({
  version: 1,
  allocation: { ...DEFAULT_ALLOCATION },
  allocationSetBy: 'default',
  hoursPerWeek: 15,
  quiz: {},            // lessonId -> { pct, date }
  lessonsRead: {},     // lessonId -> date
  submissions: [],     // synthetic practice: { id, exerciseId, date, notes, surface, setup, fileIds }
  checklistRuns: [],   // { id, mode, date, checked: {stepId: [bool]} }
  mentor: null,        // { id, name, credential, shop, passHash: {salt, hash}, registered }
  legal: {},           // { apprenticeLicense, licenseExpires, shopRegistration, bbpCompleted, bbpExpires, bbpProvider, confirmedByMentor, confirmedDate }
  signoffs: [],        // mentor milestone sign-offs
  mentorNotes: [],     // mentor observations not tied to a milestone
  hours: [],           // { id, date, hours, activity, countersign }
  clientSessions: [],  // supervised human-skin sessions
  healingReviews: [],  // { id, sessionId, checkpoint, date, notes, fileIds, mentorNote }
  portfolio: [],       // { id, title, kind, fileIds, note, date }
  aiLog: [],           // AI Mentor reviews (source: 'ai'), never counted as sign-offs
  workshop: {},        // taskKey -> date
  seq: 0,
});

let state = load();
const listeners = new Set();

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return EMPTY();
    return { ...EMPTY(), ...JSON.parse(raw) };
  } catch {
    return EMPTY();
  }
}

export function getState() { return state; }

export function update(fn) {
  const draft = structuredClone(state);
  fn(draft);
  draft.seq = (draft.seq || 0) + 1;
  state = draft;
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { console.warn('Could not persist state', e); }
  listeners.forEach((l) => l(state));
}

export function subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); }

export function uid(prefix = 'id') {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function exportJSON() {
  return JSON.stringify(state, null, 2);
}

export function importJSON(text) {
  const parsed = JSON.parse(text);
  if (typeof parsed !== 'object' || parsed === null || parsed.version !== 1) throw new Error('Not a LINEAGE backup');
  state = { ...EMPTY(), ...parsed };
  localStorage.setItem(KEY, JSON.stringify(state));
  listeners.forEach((l) => l(state));
}

// ---------------------------------------------------------------- IndexedDB

const DB_NAME = 'lineage-files';
let dbp = null;
function db() {
  if (!dbp) {
    dbp = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = () => req.result.createObjectStore('files');
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }
  return dbp;
}

export async function putFile(file) {
  const id = uid('file');
  const d = await db();
  await new Promise((resolve, reject) => {
    const tx = d.transaction('files', 'readwrite');
    tx.objectStore('files').put({ blob: file, name: file.name, type: file.type, size: file.size, date: new Date().toISOString() }, id);
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
  return id;
}

export async function getFile(id) {
  const d = await db();
  return new Promise((resolve, reject) => {
    const req = d.transaction('files').objectStore('files').get(id);
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error);
  });
}

const urlCache = new Map();
export async function fileURL(id) {
  if (urlCache.has(id)) return urlCache.get(id);
  const rec = await getFile(id);
  if (!rec) return null;
  const url = URL.createObjectURL(rec.blob);
  urlCache.set(id, { url, type: rec.type, name: rec.name });
  return urlCache.get(id);
}
