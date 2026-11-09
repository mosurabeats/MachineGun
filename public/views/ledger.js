import { MILESTONES } from '../data/milestones.js';
import { MACHINE_LESSONS } from '../data/machines.js';
import { NEEDLE_LESSONS } from '../data/needles.js';
import { SKIN_LESSONS } from '../data/skin.js';
import { HEALING_CHECKPOINTS } from '../lib/logic.js';
import { getState, update, uid, exportJSON, importJSON } from '../lib/store.js';
import { esc, today } from '../lib/ui.js';
import { notify, confirmIt } from '../lib/dialog.js';
import { saveText } from '../lib/runtime.js';
import { hashPassphrase, verifyPassphrase, hoursSummary, milestoneStatus, clientWorkGate } from '../lib/logic.js';

// Mentor Mode unlock lives only in memory and expires automatically.
let mentorUnlockedUntil = 0;
const MENTOR_SESSION_MS = 15 * 60 * 1000;
export const mentorUnlocked = () => Date.now() < mentorUnlockedUntil;

export function renderLedger(root) {
  const st = getState();
  const mid = st.mentor?.id ?? null;
  const hrs = hoursSummary(st.hours, 0, mid);
  const gate = clientWorkGate(st);
  const lessons = [...MACHINE_LESSONS, ...NEEDLE_LESSONS, ...SKIN_LESSONS].filter((l) => l.quiz?.length);
  const unlocked = mentorUnlocked() && st.mentor;

  root.innerHTML = `
    <h2>The Ledger</h2>
    <p class="lede">Your record of apprenticeship: practice hours, knowledge checks and mentor-verified milestones.</p>

    <section class="panel ${unlocked ? 'mentor-on' : ''}">
      <h3>Mentor Mode ${unlocked ? '<span class="badge st-approved">unlocked</span>' : ''}</h3>
      ${!st.mentor ? `
        <p class="small">Your supervising mentor registers here with their own passphrase. Only they can sign milestones and countersign hours. Hand the device to your mentor for this step.</p>
        <form id="mentor-register" class="form">
          <label>Mentor full name <input name="name" required></label>
          <label>Shop <input name="shop" required></label>
          <label>Years tattooing <input type="number" name="years" min="0" required></label>
          <label><input type="checkbox" name="attest" required> I am a professional tattoo artist and this apprentice's mentor.</label>
          <label>Mentor passphrase (min 10 characters) <input type="password" name="p1" minlength="10" required></label>
          <label>Repeat passphrase <input type="password" name="p2" minlength="10" required></label>
          <button>Register mentor</button>
        </form>` : unlocked ? mentorPanel(st) : `
        <p>Registered mentor: <b>${esc(st.mentor.name)}</b>, ${esc(st.mentor.shop)}</p>
        <form id="mentor-unlock" class="row"><input type="password" name="p" placeholder="Mentor passphrase" required><button>Unlock Mentor Mode</button></form>
        <details class="small"><summary>Change supervising mentor</summary>
          <p>Removing the mentor voids all of their sign-offs and countersignatures for gating purposes. The records are kept for history. The new mentor must sign again.</p>
          <button id="mentor-reset" class="danger">Remove registered mentor</button></details>`}
      <p class="muted small">Mentor Mode stops casual self-signing on a shared device. It is not identity verification.</p>
    </section>

    <section class="panel">
      <h3>Practice hours</h3>
      <p><b>${hrs.logged}</b> hours logged, ${hrs.countersigned} countersigned by your mentor.</p>
      <form id="hours-form" class="row">
        <input type="date" name="date" value="${today()}" required>
        <input type="number" name="hours" step="0.25" min="0.25" max="16" placeholder="hours" required>
        <input name="activity" placeholder="activity (e.g. synthetic lining drills, observation, drawing)" required>
        <button>Log hours</button></form>
      <table class="tbl"><thead><tr><th>Date</th><th>Hours</th><th>Activity</th><th>Countersigned</th></tr></thead><tbody>
        ${st.hours.slice().reverse().slice(0, 30).map((h) => `<tr><td>${esc(h.date)}</td><td>${esc(h.hours)}</td><td>${esc(h.activity)}</td><td>${h.countersign && h.countersign.mentorId === mid ? `✓ ${esc(h.countersign.mentorName)}` : '-'}</td></tr>`).join('')}
      </tbody></table>
    </section>

    <section class="panel">
      <h3>Supervised client work gate</h3>
      ${gate.unlocked ? '<p>✓ Unlocked by mentor approvals.</p>' : `<ul>${gate.reasons.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>`}
    </section>

    <section class="panel">
      <h3>Milestones</h3>
      <table class="tbl"><tbody>${MILESTONES.map((m) => `<tr><td>${m.gate ? '★ ' : ''}${esc(m.title)}</td><td>${badge(milestoneStatus(st.signoffs, m.id, mid))}</td></tr>`).join('')}</tbody></table>
    </section>

    <section class="panel">
      <h3>Knowledge checks</h3>
      <table class="tbl"><tbody>${lessons.map((l) => `<tr><td>${esc(l.title)}</td><td>${st.quiz[l.id] ? `${st.quiz[l.id].pct}% (${esc(st.quiz[l.id].date)})` : '-'}</td></tr>`).join('')}</tbody></table>
      <p class="muted small">Knowledge checks measure understanding, not practical skill.</p>
    </section>

    <section class="panel">
      <h3>Backup</h3>
      <p class="small">Your data is stored only in this browser. Export regularly. Photos and videos are not included in the export.</p>
      <button id="export">Export JSON</button> <label class="filebtn">Import <input type="file" id="import" accept="application/json" hidden></label>
    </section>`;

  bind(root);
}

function badge(s) {
  return `<span class="badge st-${s}">${s === 'approved' ? 'mentor-approved' : s === 'needs-work' ? 'needs work' : 'pending'}</span>`;
}

function mentorPanel(st) {
  const pendingHours = st.hours.filter((h) => !(h.countersign && h.countersign.mentorId === st.mentor.id));
  const sessions = st.clientSessions.filter((s) => !s.mentorNote);
  const reviews = st.healingReviews.filter((r) => !r.mentorNote);
  return `
    <p>Signed in as <b>${esc(st.mentor.name)}</b>. Auto-locks after 15 minutes. <button id="mentor-lock">Lock now</button></p>
    <form id="signoff-form" class="form">
      <h4>Sign a milestone</h4>
      <label>Milestone <select name="milestoneId">${MILESTONES.map((m) => `<option value="${m.id}">${m.gate ? '★ ' : ''}${esc(m.title)}</option>`).join('')}</select></label>
      <label>Decision <select name="decision"><option value="needs-work">Needs more training</option><option value="approved">Approved</option></select></label>
      <label>Observations (what you saw in person) <textarea name="observations" required></textarea></label>
      <label>Skills requiring further training <textarea name="skillsToTrain"></textarea></label>
      <label><input type="checkbox" name="inperson" required> I observed this directly and in person. It is not based on photos, the AI Mentor or the apprentice's self-report.</label>
      <button>Sign</button>
    </form>
    ${pendingHours.length ? `<div class="form"><h4>Countersign hours</h4>
      ${pendingHours.map((h) => `<label><input type="checkbox" class="cs-hour" value="${esc(h.id)}"> ${esc(h.date)} · ${esc(h.hours)} h · ${esc(h.activity)}</label>`).join('')}
      <button id="countersign">Countersign selected</button></div>` : ''}
    ${sessions.map((s) => `<form class="form note-form" data-kind="session" data-id="${esc(s.id)}"><h4>Feedback on session ${esc(s.date)}: ${esc(s.design)}</h4><textarea name="text" required></textarea><button>Save feedback</button></form>`).join('')}
    ${reviews.map((r) => `<form class="form note-form" data-kind="review" data-id="${esc(r.id)}"><h4>Healing review ${esc(r.date)} (${esc(HEALING_CHECKPOINTS.find((c) => c.id === r.checkpoint)?.label)})</h4><p class="small">${esc(r.notes)}</p><textarea name="text" required></textarea><button>Save</button></form>`).join('')}
    <p class="small">To adjust the curriculum balance as the mentor, open <a href="#/path">The Path</a> while Mentor Mode is unlocked.</p>`;
}

function bind(root) {
  const st = getState();
  const $ = (s) => root.querySelector(s);

  $('#mentor-register')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    if (fd.get('p1') !== fd.get('p2')) return notify('The passphrases do not match.');
    const passHash = await hashPassphrase(fd.get('p1'));
    update((s) => { s.mentor = { id: uid('mentor'), name: fd.get('name').trim(), credential: fd.get('shop').trim(), shop: fd.get('shop').trim(), years: Number(fd.get('years')), passHash, registered: today() }; });
    mentorUnlockedUntil = Date.now() + MENTOR_SESSION_MS;
    renderLedger(root);
  });

  $('#mentor-unlock')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const ok = await verifyPassphrase(new FormData(e.target).get('p'), st.mentor.passHash);
    if (!ok) return notify('That passphrase is incorrect.');
    mentorUnlockedUntil = Date.now() + MENTOR_SESSION_MS;
    renderLedger(root);
  });

  $('#mentor-reset')?.addEventListener('click', async () => {
    if (!(await confirmIt('Remove the registered mentor? Their sign-offs will no longer count.', 'Remove mentor', true))) return;
    update((s) => { s.formerMentors = [...(s.formerMentors || []), { ...s.mentor, passHash: undefined, removed: today() }]; s.mentor = null; });
    mentorUnlockedUntil = 0;
  });

  $('#mentor-lock')?.addEventListener('click', () => { mentorUnlockedUntil = 0; renderLedger(root); });

  const requireMentor = () => {
    if (!mentorUnlocked()) { renderLedger(root); notify('Mentor Mode has locked. Unlock it again to continue.'); return false; }
    mentorUnlockedUntil = Date.now() + MENTOR_SESSION_MS;
    return true;
  };
  const sig = () => ({ source: 'mentor', verified: true, mentorId: getState().mentor.id, mentorName: getState().mentor.name, mentorCredential: getState().mentor.credential });

  $('#signoff-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!requireMentor()) return;
    const fd = new FormData(e.target);
    update((s) => s.signoffs.push({ id: uid('so'), milestoneId: fd.get('milestoneId'), decision: fd.get('decision'), observations: fd.get('observations'), skillsToTrain: fd.get('skillsToTrain'), date: today(), seq: s.seq, inPerson: true, ...sig() }));
  });

  $('#countersign')?.addEventListener('click', () => {
    if (!requireMentor()) return;
    const ids = [...root.querySelectorAll('.cs-hour:checked')].map((c) => c.value);
    update((s) => s.hours.forEach((h) => { if (ids.includes(h.id)) h.countersign = { ...sig(), date: today() }; }));
  });

  root.querySelectorAll('.note-form').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!requireMentor()) return;
    const text = new FormData(f).get('text');
    const note = { text, date: today(), mentorName: getState().mentor.name, mentorId: getState().mentor.id };
    update((s) => {
      const list = f.dataset.kind === 'session' ? s.clientSessions : s.healingReviews;
      const rec = list.find((x) => x.id === f.dataset.id);
      if (rec) rec.mentorNote = note;
    });
  }));

  $('#hours-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    update((s) => s.hours.push({ id: uid('hr'), date: fd.get('date'), hours: Number(fd.get('hours')), activity: fd.get('activity') }));
  });

  $('#export').addEventListener('click', async () => {
    try { await saveText(`lineage-backup-${today()}.json`, exportJSON()); } catch (err) { notify(err.message); }
  });
  $('#import').addEventListener('change', async (e) => {
    const f = e.target.files[0];
    if (!f) return;
    try { importJSON(await f.text()); } catch (err) { notify(`That file could not be imported: ${err.message}`); }
  });
}
