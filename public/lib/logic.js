// Pure, dependency-free logic shared by the browser app and the Node test suite.
// Nothing in here talks to the network or the AI Mentor. Every gate that unlocks
// work on human skin is decided only from records a human mentor has signed.

export const DEFAULT_ALLOCATION = Object.freeze({
  design: 30,     // drawing, design, traditional tattoo art
  machine: 25,    // machine technique & synthetic-skin practice
  safety: 20,     // safety, anatomy, professional procedures
  theory: 15,     // tattoo history & technical theory
  assessment: 10, // assessments, critiques, portfolio
});

export const ALLOCATION_LABELS = {
  design: 'Drawing, design & traditional tattoo art',
  machine: 'Machine technique & synthetic-skin practice',
  safety: 'Safety, anatomy & professional procedures',
  theory: 'Tattoo history & technical theory',
  assessment: 'Assessments, critiques & portfolio',
};

/**
 * Normalise an allocation so it sums to exactly 100 using whole numbers.
 * Negative or non-numeric values count as 0. Rounding error is assigned to the
 * largest bucket so the result is deterministic.
 */
export function normalizeAllocation(alloc) {
  const keys = Object.keys(DEFAULT_ALLOCATION);
  const raw = keys.map((k) => {
    const v = Number(alloc?.[k]);
    return Number.isFinite(v) && v > 0 ? v : 0;
  });
  const total = raw.reduce((a, b) => a + b, 0);
  if (total === 0) return { ...DEFAULT_ALLOCATION };
  const scaled = raw.map((v) => Math.round((v / total) * 100));
  const diff = 100 - scaled.reduce((a, b) => a + b, 0);
  if (diff !== 0) {
    let maxI = 0;
    scaled.forEach((v, i) => { if (v > scaled[maxI]) maxI = i; });
    scaled[maxI] += diff;
  }
  return Object.fromEntries(keys.map((k, i) => [k, scaled[i]]));
}

/** Split a weekly hour budget across the allocation (hours, one decimal). */
export function weeklyPlan(alloc, hoursPerWeek) {
  const a = normalizeAllocation(alloc);
  const h = Math.max(0, Number(hoursPerWeek) || 0);
  return Object.fromEntries(Object.entries(a).map(([k, pct]) => [k, Math.round(h * pct) / 100]));
}

// ---------------------------------------------------------------------------
// Mentor sign-offs
// ---------------------------------------------------------------------------

/**
 * A sign-off is valid only when it was created in Mentor Mode (passphrase
 * verified), names a mentor and the mentor's credential, and records an
 * explicit decision. The `source` field must be 'mentor'. Anything the AI
 * produces is stored with source 'ai' and can never satisfy a gate.
 * When `mentorId` is given, the sign-off must also come from that mentor, so
 * replacing the registered mentor voids earlier sign-offs for gating purposes.
 */
export function isValidSignoff(s, mentorId) {
  return Boolean(
    s &&
    (mentorId === undefined || s.mentorId === mentorId) &&
    s.source === 'mentor' &&
    s.verified === true &&
    typeof s.mentorName === 'string' && s.mentorName.trim() &&
    typeof s.mentorCredential === 'string' && s.mentorCredential.trim() &&
    (s.decision === 'approved' || s.decision === 'needs-work') &&
    s.date
  );
}

/** Latest valid sign-off for a milestone, or null. */
export function latestSignoff(signoffs, milestoneId, mentorId) {
  const list = (signoffs || [])
    .filter((s) => s.milestoneId === milestoneId && isValidSignoff(s, mentorId))
    .sort((a, b) => String(a.date).localeCompare(String(b.date)) || (a.seq || 0) - (b.seq || 0));
  return list.length ? list[list.length - 1] : null;
}

/** 'approved' | 'needs-work' | 'pending' */
export function milestoneStatus(signoffs, milestoneId, mentorId) {
  const s = latestSignoff(signoffs, milestoneId, mentorId);
  return s ? s.decision : 'pending';
}

// Milestones that must ALL be mentor-approved before supervised client work
// can be logged. They live in data/milestones.js; the ids are fixed here so the
// gate cannot be changed by editing content.
export const CLIENT_WORK_PREREQUISITES = Object.freeze([
  'ms.bbp-training',          // bloodborne pathogens / universal precautions course verified
  'ms.procedure-synthetic',   // full procedure walkthrough performed on synthetic skin, observed
  'ms.lining-synthetic',      // lining competency on synthetic skin, observed in person
  'ms.shading-synthetic',     // shading/packing competency on synthetic skin, observed in person
  'ms.cross-contamination',   // observed barrier/cross-contamination practice
  'ms.readiness-client',      // mentor's explicit readiness decision for supervised client work
]);

/**
 * Whether supervised client sessions may be logged.
 * Requires: a registered mentor, the apprentice's own legal-status record
 * confirmed by that mentor, unexpired BBP training, and every prerequisite
 * milestone approved by the mentor. Returns reasons for anything missing so the
 * UI can explain exactly what remains.
 */
export function clientWorkGate(state, today = new Date()) {
  const reasons = [];
  const mentor = state?.mentor;
  if (!mentor || !mentor.name || !mentor.passHash) {
    reasons.push('No supervising mentor is registered in Mentor Mode.');
  }
  const legal = state?.legal || {};
  if (!legal.apprenticeLicense || !legal.apprenticeLicense.trim()) {
    reasons.push('No apprentice license / registration number is recorded.');
  }
  if (!legal.confirmedByMentor || (mentor && legal.confirmedByMentor !== mentor.id)) {
    reasons.push('Your mentor has not confirmed your apprentice license status and the shop registration.');
  }
  if (legal.licenseExpires && new Date(legal.licenseExpires) < startOfDay(today)) {
    reasons.push('The recorded apprentice license has expired.');
  }
  if (!legal.bbpCompleted) {
    reasons.push('No bloodborne-pathogen / universal-precautions course completion date is recorded.');
  } else if (legal.bbpExpires && new Date(legal.bbpExpires) < startOfDay(today)) {
    reasons.push('Bloodborne-pathogen training has expired; renew before client work.');
  }
  for (const id of CLIENT_WORK_PREREQUISITES) {
    const st = milestoneStatus(state?.signoffs, id, mentor?.id ?? null);
    if (st !== 'approved') reasons.push(`Mentor approval pending: ${id}`);
  }
  return { unlocked: reasons.length === 0, reasons };
}

function startOfDay(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

// ---------------------------------------------------------------------------
// Apprenticeship hours (Vermont OPR supervising statement lists 1,000 hours for
// a tattooist; hours only count under an ACTIVE apprentice license). The app
// tracks hours; the legal record is whatever OPR requires.
// ---------------------------------------------------------------------------

export function hoursSummary(entries, target = 1000, mentorId) {
  let logged = 0;
  let countersigned = 0;
  for (const e of entries || []) {
    const h = Number(e.hours);
    if (!Number.isFinite(h) || h <= 0) continue;
    logged += h;
    if (isValidCountersign(e.countersign, mentorId)) countersigned += h;
  }
  return {
    logged: round1(logged),
    countersigned: round1(countersigned),
    target,
    pct: target ? Math.min(100, Math.round((countersigned / target) * 100)) : 0,
  };
}

const round1 = (n) => Math.round(n * 10) / 10;

function isValidCountersign(c, mentorId) {
  return Boolean(c && c.source === 'mentor' && c.verified === true && (mentorId === undefined || c.mentorId === mentorId));
}

// ---------------------------------------------------------------------------
// Healing review schedule for a completed supervised tattoo.
// ---------------------------------------------------------------------------

export const HEALING_CHECKPOINTS = Object.freeze([
  { id: 'd3', label: 'Day 2-3 (early inflammation)', days: 3 },
  { id: 'w2', label: 'Week 2 (peeling / flaking)', days: 14 },
  { id: 'w6', label: 'Week 4-6 (surface healed)', days: 42 },
  { id: 'm3', label: 'Month 3 (settled)', days: 90 },
]);

export function healingDue(sessionDate, reviews, today = new Date()) {
  const start = new Date(sessionDate);
  const done = new Set((reviews || []).map((r) => r.checkpoint));
  return HEALING_CHECKPOINTS.map((c) => {
    const due = new Date(start);
    due.setDate(due.getDate() + c.days);
    return {
      ...c,
      due: due.toISOString().slice(0, 10),
      done: done.has(c.id),
      overdue: !done.has(c.id) && due < startOfDay(today),
    };
  });
}

// ---------------------------------------------------------------------------
// Practice progression: an exercise unlocks once its prerequisites each have at
// least one submission. Self-paced; this is NOT a competency judgement.
// ---------------------------------------------------------------------------

export function exerciseUnlocked(exercise, submissions) {
  const have = new Set((submissions || []).map((s) => s.exerciseId));
  return (exercise.requires || []).every((r) => have.has(r));
}

// ---------------------------------------------------------------------------
// Quiz scoring
// ---------------------------------------------------------------------------

export function scoreQuiz(questions, answers) {
  let correct = 0;
  const detail = questions.map((q, i) => {
    const ok = answers?.[i] === q.answer;
    if (ok) correct++;
    return { ok, explain: q.explain };
  });
  return { correct, total: questions.length, pct: questions.length ? Math.round((correct / questions.length) * 100) : 0, detail };
}

// ---------------------------------------------------------------------------
// Passphrase hashing for Mentor Mode (PBKDF2-SHA256 via WebCrypto).
// This keeps the apprentice from casually signing their own milestones on a
// shared device. It is a record-keeping safeguard, not legal identity proof.
// ---------------------------------------------------------------------------

export async function hashPassphrase(passphrase, saltB64) {
  const enc = new TextEncoder();
  const salt = saltB64 ? b64ToBytes(saltB64) : crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey('raw', enc.encode(passphrase), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations: 210000 }, key, 256);
  return { salt: bytesToB64(salt), hash: bytesToB64(new Uint8Array(bits)) };
}

export async function verifyPassphrase(passphrase, record) {
  if (!record?.salt || !record?.hash) return false;
  const { hash } = await hashPassphrase(passphrase, record.salt);
  return hash === record.hash;
}

function bytesToB64(bytes) {
  let s = '';
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s);
}
function b64ToBytes(b64) {
  const s = atob(b64);
  const out = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) out[i] = s.charCodeAt(i);
  return out;
}
