import { MILESTONES } from '../data/milestones.js';
import { MACHINE_LESSONS } from '../data/machines.js';
import { NEEDLE_LESSONS } from '../data/needles.js';
import { SKIN_LESSONS } from '../data/skin.js';
import { HEALING_CHECKPOINTS } from '../lib/logic.js';
import { getState, update, uid, exportJSON, importJSON } from '../lib/store.js';
import { esc, today } from '../lib/ui.js';
import { hashPassphrase, verifyPassphrase, hoursSummary, milestoneStatus, clientWorkGate } from '../lib/logic.js';

// Mentor Mode unlock lives only in memory and expires automatically.
let mentorUnlockedUntil = 0;
const MENTOR_SESSION_MS = 15 * 60 * 1000;
export const mentorUnlocked = () => Date.now() < mentorUnlockedUntil;

export function renderLedger(root) {
  const st = getState();
  const L = st.legal || {};
  const mid = st.mentor?.id ?? null;
  const hrs = hoursSummary(st.hours, 1000, mid);
  const gate = clientWorkGate(st);
  const lessons = [...MACHINE_LESSONS, ...NEEDLE_LESSONS, ...SKIN_LESSONS].filter((l) => l.quiz?.length);
  const unlocked = mentorUnlocked() && st.mentor;

  root.innerHTML = `
    <h2>The Ledger</h2>
    <p class="lede">Your record of apprenticeship: legal status, hours, knowledge checks and mentor-verified milestones.</p>

    <section class="panel ${unlocked ? 'mentor-on' : ''}">
      <h3>Mentor Mode ${unlocked ? '<span class="badge st-approved">unlocked</span>' : ''}</h3>
      ${!st.mentor ? `
        <p class="small">Your supervising mentor registers here with their own passphrase. Only they can sign milestones, confirm your legal status and countersign hours. Hand the device to your mentor for this step.</p>
        <form id="mentor-register" class="form">
          <label>Mentor full name <input name="name" required></label>
          <label>Vermont tattooist license # (or credential) <input name="credential" required></label>
          <label>Shop & shop registration # <input name="shop" required></label>
          <label>Years actively practising <input type="number" name="years" min="0" required></label>
          <label><input type="checkbox" name="attest" required> I am a licensed tattooist in good standing, I meet the supervisor requirements in the Vermont rules (at least 3 years of practice, no disciplinary record), and I am this apprentice's supervisor.</label>
          <label>Mentor passphrase (min 10 characters) <input type="password" name="p1" minlength="10" required></label>
          <label>Repeat passphrase <input type="password" name="p2" minlength="10" required></label>
          <button>Register mentor</button>
        </form>` : unlocked ? mentorPanel(st) : `
        <p>Registered mentor: <b>${esc(st.mentor.name)}</b> (${esc(st.mentor.credential)}), ${esc(st.mentor.shop)}</p>
        <form id="mentor-unlock" class="row"><input type="password" name="p" placeholder="Mentor passphrase" required><button>Unlock Mentor Mode</button></form>
        <details class="small"><summary>Change supervising mentor</summary>
          <p>Removing the mentor voids all of their sign-offs and countersignatures for gating purposes. The records are kept for history. The new mentor must sign again.</p>
          <button id="mentor-reset" class="danger">Remove registered mentor</button></details>`}
      <p class="muted small">Mentor Mode stops casual self-signing on a shared device. It is not legal identity verification, and it does not replace OPR's forms or the shop's records.</p>
    </section>

    <section class="panel">
      <h3>Legal status (Vermont)</h3>
      <form id="legal-form" class="form grid2">
        <label>Apprentice license # <input name="apprenticeLicense" value="${esc(L.apprenticeLicense || '')}"></label>
        <label>License expires <input type="date" name="licenseExpires" value="${esc(L.licenseExpires || '')}"></label>
        <label>Supervising statement filed with OPR <input type="date" name="statementFiled" value="${esc(L.statementFiled || '')}"></label>
        <label>Shop registration # <input name="shopRegistration" value="${esc(L.shopRegistration || '')}"></label>
        <label>Universal precautions / BBP course provider <input name="bbpProvider" value="${esc(L.bbpProvider || '')}"></label>
        <label>Completed <input type="date" name="bbpCompleted" value="${esc(L.bbpCompleted || '')}"></label>
        <label>Expires / renewal due <input type="date" name="bbpExpires" value="${esc(L.bbpExpires || '')}"></label>
        <div><button>Save</button></div>
      </form>
      <p class="small">${L.confirmedByMentor && L.confirmedByMentor === st.mentor?.id ? `✓ Confirmed by your mentor on ${esc(L.confirmedDate)}.` : 'Not yet confirmed by your mentor. Editing these fields clears any earlier confirmation.'}</p>
      <p class="muted small">Check every requirement against the current statute, rules and OPR forms: see The Archive → Research.</p>
    </section>

    <section class="panel">
      <h3>Apprenticeship hours</h3>
      <p><b>${hrs.countersigned}</b> mentor-countersigned of ${hrs.target} (logged: ${hrs.logged}). <progress max="100" value="${hrs.pct}"></progress> ${hrs.pct}%</p>
      <p class="muted small">The OPR supervising statement lists 1,000 hours for a tattooist and counts hours only under an ACTIVE apprentice license. Hours logged before your license was active do not count.</p>
      <form id="hours-form" class="row">
        <input type="date" name="date" value="${today()}" required>
        <input type="number" name="hours" step="0.25" min="0.25" max="16" placeholder="hours" required>
        <input name="activity" placeholder="activity (e.g. shop sanitation, supervised session, observation)" required>
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
  const L = st.legal || {};
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
    <div class="form">
      <h4>Legal status confirmation</h4>
      <p class="small">License: ${esc(L.apprenticeLicense || '-')} (expires ${esc(L.licenseExpires || '-')}), statement filed ${esc(L.statementFiled || '-')}, shop ${esc(L.shopRegistration || '-')}, BBP ${esc(L.bbpProvider || '-')} ${esc(L.bbpCompleted || '')}</p>
      <button id="confirm-legal" ${L.apprenticeLicense ? '' : 'disabled'}>I have seen the license, the filed supervising statement, the shop registration and the BBP certificate, and they are current</button>
    </div>
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
    if (fd.get('p1') !== fd.get('p2')) return alert('Passphrases do not match.');
    if (Number(fd.get('years')) < 3 && !confirm('The Vermont rules require apprentice supervisors to have practised at least 3 years. Register anyway?')) return;
    const passHash = await hashPassphrase(fd.get('p1'));
    update((s) => { s.mentor = { id: uid('mentor'), name: fd.get('name').trim(), credential: fd.get('credential').trim(), shop: fd.get('shop').trim(), years: Number(fd.get('years')), passHash, registered: today() }; });
    mentorUnlockedUntil = Date.now() + MENTOR_SESSION_MS;
    renderLedger(root);
  });

  $('#mentor-unlock')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const ok = await verifyPassphrase(new FormData(e.target).get('p'), st.mentor.passHash);
    if (!ok) return alert('Incorrect passphrase.');
    mentorUnlockedUntil = Date.now() + MENTOR_SESSION_MS;
    renderLedger(root);
  });

  $('#mentor-reset')?.addEventListener('click', () => {
    if (!confirm('Remove the registered mentor? Their sign-offs will no longer count.')) return;
    update((s) => { s.formerMentors = [...(s.formerMentors || []), { ...s.mentor, passHash: undefined, removed: today() }]; s.mentor = null; });
    mentorUnlockedUntil = 0;
  });

  $('#mentor-lock')?.addEventListener('click', () => { mentorUnlockedUntil = 0; renderLedger(root); });

  const requireMentor = () => {
    if (!mentorUnlocked()) { alert('Mentor Mode has locked. Unlock again.'); renderLedger(root); return false; }
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

  $('#confirm-legal')?.addEventListener('click', () => {
    if (!requireMentor()) return;
    update((s) => { s.legal.confirmedByMentor = s.mentor.id; s.legal.confirmedDate = today(); });
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

  $('#legal-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    update((s) => {
      const next = Object.fromEntries([...fd.entries()].map(([k, v]) => [k, String(v).trim()]));
      const changed = Object.keys(next).some((k) => (s.legal[k] || '') !== next[k]);
      s.legal = { ...s.legal, ...next };
      if (changed) { delete s.legal.confirmedByMentor; delete s.legal.confirmedDate; }
    });
  });

  $('#hours-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    update((s) => s.hours.push({ id: uid('hr'), date: fd.get('date'), hours: Number(fd.get('hours')), activity: fd.get('activity') }));
  });

  $('#export').addEventListener('click', () => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([exportJSON()], { type: 'application/json' }));
    a.download = `lineage-backup-${today()}.json`;
    a.click();
  });
  $('#import').addEventListener('change', async (e) => {
    const f = e.target.files[0];
    if (!f) return;
    try { importJSON(await f.text()); } catch (err) { alert(err.message); }
  });
}
