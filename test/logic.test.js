import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizeAllocation, weeklyPlan, DEFAULT_ALLOCATION, isValidSignoff, milestoneStatus,
  clientWorkGate, CLIENT_WORK_PREREQUISITES, hoursSummary, healingDue, exerciseUnlocked,
  scoreQuiz, hashPassphrase, verifyPassphrase,
} from '../public/lib/logic.js';
import { MILESTONES } from '../public/data/milestones.js';
import { EXERCISES } from '../public/data/practice.js';
import { TRACKS } from '../public/data/techniques.js';
import { PROCEDURE } from '../public/data/procedure.js';
import { MACHINE_LESSONS } from '../public/data/machines.js';
import { NEEDLE_LESSONS } from '../public/data/needles.js';
import { SKIN_LESSONS } from '../public/data/skin.js';
import { RESOURCES } from '../public/data/resources.js';
import { SECTIONS } from '../public/data/curriculum.js';
import { validateMentorRequest } from '../server/index.js';
import { finalize, OUTPUT_SCHEMA, buildMessages } from '../server/mentor.js';

const MENTOR = { id: 'm1', name: 'Pat Doe', credential: 'VT-123', passHash: { salt: 's', hash: 'h' } };
const sign = (milestoneId, decision = 'approved', extra = {}) => ({ milestoneId, decision, source: 'mentor', verified: true, mentorId: 'm1', mentorName: 'Pat Doe', mentorCredential: 'VT-123', date: '2026-01-01', ...extra });
const readyState = () => ({
  mentor: MENTOR,
  legal: { apprenticeLicense: 'APP-1', confirmedByMentor: 'm1', bbpCompleted: '2026-01-01', bbpExpires: '2099-01-01', licenseExpires: '2099-01-01' },
  signoffs: CLIENT_WORK_PREREQUISITES.map((id) => sign(id)),
});

test('default allocation is 30/25/20/15/10', () => {
  assert.deepEqual({ ...DEFAULT_ALLOCATION }, { design: 30, machine: 25, safety: 20, theory: 15, assessment: 10 });
  assert.equal(Object.values(DEFAULT_ALLOCATION).reduce((a, b) => a + b), 100);
});

test('normalizeAllocation always sums to 100', () => {
  for (const a of [{ design: 1, machine: 1, safety: 1, theory: 0, assessment: 0 }, { design: 70, machine: 70, safety: 70, theory: 70, assessment: 70 }, { design: -5, machine: 'x' }, {}]) {
    const n = normalizeAllocation(a);
    assert.equal(Object.values(n).reduce((x, y) => x + y), 100);
  }
  assert.deepEqual(normalizeAllocation({}), { ...DEFAULT_ALLOCATION });
});

test('weeklyPlan splits hours', () => {
  const p = weeklyPlan(DEFAULT_ALLOCATION, 20);
  assert.equal(p.design, 6);
  assert.equal(p.assessment, 2);
});

test('AI or unverified sign-offs never count', () => {
  assert.equal(isValidSignoff(sign('x')), true);
  assert.equal(isValidSignoff(sign('x', 'approved', { source: 'ai' })), false);
  assert.equal(isValidSignoff(sign('x', 'approved', { verified: false })), false);
  assert.equal(isValidSignoff(sign('x', 'approved', { mentorCredential: '' })), false);
  assert.equal(isValidSignoff(sign('x', 'certified')), false);
  assert.equal(isValidSignoff(sign('x'), 'other-mentor'), false);
});

test('latest sign-off wins', () => {
  const list = [sign('a', 'approved', { date: '2026-01-01' }), sign('a', 'needs-work', { date: '2026-02-01' })];
  assert.equal(milestoneStatus(list, 'a', 'm1'), 'needs-work');
  assert.equal(milestoneStatus([], 'a', 'm1'), 'pending');
});

test('client work gate: locked by default, unlocked only with all mentor approvals', () => {
  assert.equal(clientWorkGate({}).unlocked, false);
  assert.equal(clientWorkGate(readyState()).unlocked, true);
});

test('client work gate: each missing requirement re-locks', () => {
  for (const id of CLIENT_WORK_PREREQUISITES) {
    const s = readyState();
    s.signoffs = s.signoffs.filter((x) => x.milestoneId !== id);
    assert.equal(clientWorkGate(s).unlocked, false, id);
  }
  let s = readyState(); s.mentor = null; assert.equal(clientWorkGate(s).unlocked, false);
  s = readyState(); s.legal.apprenticeLicense = ''; assert.equal(clientWorkGate(s).unlocked, false);
  s = readyState(); delete s.legal.confirmedByMentor; assert.equal(clientWorkGate(s).unlocked, false);
  s = readyState(); s.legal.bbpExpires = '2000-01-01'; assert.equal(clientWorkGate(s).unlocked, false);
  s = readyState(); s.legal.licenseExpires = '2000-01-01'; assert.equal(clientWorkGate(s).unlocked, false);
  s = readyState(); s.signoffs.push(sign('ms.readiness-client', 'needs-work', { date: '2026-03-01' })); assert.equal(clientWorkGate(s).unlocked, false);
});

test('client work gate: AI-sourced approvals cannot unlock', () => {
  const s = readyState();
  s.signoffs = s.signoffs.map((x) => ({ ...x, source: 'ai' }));
  assert.equal(clientWorkGate(s).unlocked, false);
});

test('client work gate: replacing the mentor voids earlier sign-offs', () => {
  const s = readyState();
  s.mentor = { ...MENTOR, id: 'm2' };
  assert.equal(clientWorkGate(s).unlocked, false);
});

test('every gate prerequisite exists as a milestone flagged gate', () => {
  const ids = new Set(MILESTONES.filter((m) => m.gate).map((m) => m.id));
  assert.deepEqual([...ids].sort(), [...CLIENT_WORK_PREREQUISITES].sort());
});

test('hours summary counts only valid countersigned hours from the current mentor', () => {
  const cs = { source: 'mentor', verified: true, mentorId: 'm1' };
  const h = hoursSummary([{ hours: 4, countersign: cs }, { hours: 2 }, { hours: 3, countersign: { ...cs, mentorId: 'x' } }, { hours: -1 }], 1000, 'm1');
  assert.equal(h.logged, 9);
  assert.equal(h.countersigned, 4);
});

test('healing checkpoints and overdue detection', () => {
  const d = healingDue('2026-01-01', [{ checkpoint: 'd3' }], new Date('2026-02-01'));
  assert.equal(d.find((c) => c.id === 'd3').done, true);
  assert.equal(d.find((c) => c.id === 'w2').overdue, true);
  assert.equal(d.find((c) => c.id === 'm3').overdue, false);
});

test('exercise prerequisites reference real exercises and first exercise is open', () => {
  const ids = new Set(EXERCISES.map((e) => e.id));
  for (const e of EXERCISES) for (const r of e.requires) assert.ok(ids.has(r), `${e.id} requires unknown ${r}`);
  assert.equal(exerciseUnlocked(EXERCISES[0], []), true);
  assert.equal(exerciseUnlocked(EXERCISES.find((e) => e.id === 'ex.flash'), []), false);
  for (const e of EXERCISES) assert.ok(e.evidence.length > 0, `${e.id} must require evidence`);
});

test('technique tracks link to real exercises and milestones', () => {
  const ex = new Set(EXERCISES.map((e) => e.id));
  const ms = new Set(MILESTONES.map((m) => m.id));
  assert.deepEqual(TRACKS.map((t) => t.title), ['Lining', 'Black and Gray', 'Color Tattooing', 'Traditional Tattoo Application']);
  for (const t of TRACKS) {
    assert.ok(ms.has(t.milestone) && ms.has(t.synthMilestone));
    for (const tp of t.topics) {
      assert.ok(ex.has(tp.exercise), tp.id);
      for (const k of ['theory', 'demo', 'observe']) assert.ok(tp[k], `${tp.id}.${k}`);
    }
  }
});

test('procedure has 18 ordered steps with valid references', () => {
  assert.equal(PROCEDURE.length, 18);
  PROCEDURE.forEach((s, i) => assert.equal(s.n, i + 1));
  const res = new Set(RESOURCES.map((r) => r.id));
  for (const s of PROCEDURE) for (const r of s.refs) assert.ok(res.has(r), `${s.id} -> ${r}`);
});

test('lessons are well-formed and quiz answers are in range', () => {
  for (const l of [...MACHINE_LESSONS, ...NEEDLE_LESSONS, ...SKIN_LESSONS]) {
    for (const s of l.sections) assert.ok(['med', 'reg', 'ind', 'anec'].includes(s.tag), `${l.id} untagged section`);
    for (const q of l.quiz) assert.ok(q.answer >= 0 && q.answer < q.options.length, l.id);
  }
});

test('seven primary sections including The Station', () => {
  assert.equal(SECTIONS.length, 7);
  assert.ok(SECTIONS.find((s) => s.id === 'station' && s.primary));
});

test('quiz scoring', () => {
  const r = scoreQuiz([{ answer: 1 }, { answer: 0 }], [1, 1]);
  assert.equal(r.correct, 1);
  assert.equal(r.pct, 50);
});

test('passphrase hash verifies and rejects', async () => {
  const rec = await hashPassphrase('correct horse battery');
  assert.equal(await verifyPassphrase('correct horse battery', rec), true);
  assert.equal(await verifyPassphrase('wrong', rec), false);
});

test('mentor request validation', () => {
  assert.ok(validateMentorRequest({ uploadType: 'bogus', notes: 'x' }));
  assert.ok(validateMentorRequest({ uploadType: 'synthetic', images: [] }));
  assert.ok(validateMentorRequest({ uploadType: 'synthetic', images: [{ media_type: 'text/html', data: 'x' }] }));
  assert.equal(validateMentorRequest({ uploadType: 'synthetic', images: [{ media_type: 'image/jpeg', data: 'abc' }] }), null);
  assert.equal(validateMentorRequest({ uploadType: 'notes', notes: 'session notes' }), null);
});

test('AI result always carries the synthetic-skin limitation', () => {
  const r = finalize({ visible_observations: ['ok'], cannot_determine: [], recommended_training: [], flags_for_professional: [] }, 'synthetic');
  assert.ok(r.cannot_determine.some((x) => /depth/i.test(x) && /synthetic/i.test(x)));
  assert.equal(OUTPUT_SCHEMA.properties.recommended_training.items.properties.exercise_id.enum.length, EXERCISES.length + 1);
});

test('buildMessages interleaves labelled images then text', () => {
  const m = buildMessages({ uploadType: 'synthetic', exerciseId: 'ex.straight', notes: 'hi', images: [{ media_type: 'image/jpeg', data: 'AAA', label: 'a.jpg' }] });
  const types = m[0].content.map((c) => c.type);
  assert.deepEqual(types, ['text', 'image', 'text']);
  assert.match(m[0].content[2].text, /ex\.straight/);
});

test('reviewUpload sends the guarded request and parses structured output', async () => {
  const { default: Anthropic } = await import('@anthropic-ai/sdk');
  const { reviewUpload, MODEL } = await import('../server/mentor.js');
  let sent, headers;
  const fakeFetch = async (url, init) => {
    sent = JSON.parse(init.body);
    headers = Object.fromEntries(new Headers(init.headers).entries());
    const out = { visible_observations: ['Line 3 wobbles mid-way'], cannot_determine: [], recommended_training: [{ exercise_id: 'ex.straight', reason: 'consistency' }], flags_for_professional: [] };
    return new Response(JSON.stringify({ id: 'msg_1', type: 'message', role: 'assistant', model: MODEL, stop_reason: 'end_turn', content: [{ type: 'text', text: JSON.stringify(out) }], usage: { input_tokens: 1, output_tokens: 1 } }), { status: 200, headers: { 'content-type': 'application/json' } });
  };
  const c = new Anthropic({ apiKey: 'test', fetch: fakeFetch, maxRetries: 0 });
  const r = await reviewUpload({ uploadType: 'synthetic', exerciseId: 'ex.straight', notes: 'n', images: [{ media_type: 'image/jpeg', data: 'AAA' }] }, c);
  assert.equal(sent.model, 'claude-opus-5-5');
  assert.equal(sent.fallbacks, 'default');
  assert.match(headers['anthropic-beta'], /server-side-fallback-2026-07-01/);
  assert.equal(sent.output_config.format.type, 'json_schema');
  assert.match(sent.system, /Never infer correct needle depth/);
  assert.equal(r.recommended_training[0].exercise_id, 'ex.straight');
  assert.ok(r.cannot_determine.length >= 1);
});
