import { SUCCESS_CRITERIA, WORKSHOP_UNITS, ARCHIVE_UNITS } from '../data/curriculum.js';
import { RESOURCES, DISAGREEMENTS } from '../data/resources.js';
import { getState, update, uid, putFile } from '../lib/store.js';
import { esc, tag, today, thumbs, hydrateThumbs, evidenceLegend } from '../lib/ui.js';
import { ALLOCATION_LABELS, normalizeAllocation, weeklyPlan, milestoneStatus, clientWorkGate } from '../lib/logic.js';
import { mentorUnlocked } from './ledger.js';

// ------------------------------------------------------------------ The Path
export function renderPath(root) {
  const st = getState();
  const alloc = normalizeAllocation(st.allocation);
  const plan = weeklyPlan(alloc, st.hoursPerWeek);
  const mid = st.mentor?.id ?? null;
  const gate = clientWorkGate(st);
  const critStatus = (c) => {
    const ms = c.evidence.filter((e) => e.startsWith('ms.'));
    if (ms.length) {
      const done = ms.filter((m) => milestoneStatus(st.signoffs, m, mid) === 'approved').length;
      return `${done}/${ms.length} mentor-approved`;
    }
    const q = c.evidence.filter((e) => e.startsWith('quiz:'));
    if (q.length) {
      const prefixes = q.map((x) => x.slice(5) + '.');
      const qs = Object.entries(st.quiz).filter(([id]) => prefixes.some((p) => id.startsWith(p)));
      return qs.length ? `${qs.length} knowledge check(s) taken` : 'not started';
    }
    if (c.evidence.includes('workshop')) return `${Object.keys(st.workshop).length} workshop tasks done`;
    if (c.evidence.includes('archive')) return 'self-study';
    return '';
  };
  const next = nextSteps(st, gate);
  root.innerHTML = `
    <h2>The Path</h2>
    <p class="lede">LINEAGE is a full tattoo apprenticeship program: art and technique together from day one, with the move to human skin made only under supervision.</p>
    <div class="banner small">The ultimate objective is to become a competent professional tattoo artist who can design, prepare, execute and evaluate tattoos safely. All live tattooing happens under appropriate professional supervision and within applicable law, licensing and public-health standards.</div>

    <section class="panel"><h3>Next steps</h3><ol>${next.map((n) => `<li>${n}</li>`).join('')}</ol></section>

    <section class="panel">
      <h3>Curriculum balance</h3>
      <p class="small">Starting allocation: 30/25/20/15/10. Adjust as your competency grows and as your mentor advises, shifting toward practical and supervised work while keeping up drawing practice. ${st.allocationSetBy === 'mentor' ? '<b>Last set by your mentor.</b>' : st.allocationSetBy === 'apprentice' ? 'Last set by you.' : 'Default.'}</p>
      <form id="alloc-form">
        ${Object.entries(ALLOCATION_LABELS).map(([k, label]) => `<label class="slider"><span>${esc(label)}: <output>${alloc[k]}%</output> · ${plan[k]} h/week</span><input type="range" name="${k}" min="0" max="70" value="${alloc[k]}"></label>`).join('')}
        <label>Study hours per week <input type="number" name="hours" min="1" max="80" value="${esc(st.hoursPerWeek)}"></label>
        <button>Save balance</button> ${mentorUnlocked() ? '<span class="badge st-approved">saving as mentor</span>' : ''}
        <button type="button" id="alloc-reset">Reset to default</button>
      </form>
    </section>

    <section class="panel"><h3>Success criteria</h3>
      <ol>${SUCCESS_CRITERIA.map((c) => `<li>${esc(c.text)}: <span class="muted">${esc(critStatus(c))}</span></li>`).join('')}</ol>
    </section>`;

  const form = root.querySelector('#alloc-form');
  form.querySelectorAll('input[type=range]').forEach((r) => r.addEventListener('input', () => { r.previousElementSibling.querySelector('output').textContent = `${r.value}% (before normalising)`; }));
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const a = normalizeAllocation(Object.fromEntries(Object.keys(ALLOCATION_LABELS).map((k) => [k, Number(fd.get(k))])));
    update((s) => { s.allocation = a; s.hoursPerWeek = Number(fd.get('hours')) || s.hoursPerWeek; s.allocationSetBy = mentorUnlocked() ? 'mentor' : 'apprentice'; });
  });
  root.querySelector('#alloc-reset').addEventListener('click', () => update((s) => { s.allocation = normalizeAllocation({}); s.allocationSetBy = 'default'; }));
}

function nextSteps(st, gate) {
  const out = [];
  if (!st.mentor) out.push('Find a licensed Vermont tattooist (3+ years, no discipline) willing to supervise you, and have them register in <a href="#/ledger">Mentor Mode</a>.');
  if (!st.legal?.apprenticeLicense) out.push('Apply for your Vermont apprentice license and file the OPR supervising statement <b>before</b> starting the apprenticeship. See <a href="#/station/supervised">Legal & licensing</a>.');
  if (!st.legal?.bbpCompleted) out.push('Complete an approved universal precautions / bloodborne pathogens course. See <a href="#/station/safety">Safety Training</a>.');
  if (!st.submissions.length) out.push('Start <a href="#/station/practice/ex.familiar">Machine familiarity</a> on synthetic skin.');
  else out.push(`Continue the <a href="#/station/practice">synthetic-skin assignments</a> (${st.submissions.length} submissions so far).`);
  if (Object.keys(st.workshop).length < 3) out.push('Keep a daily drawing practice in <a href="#/workshop">The Workshop</a>.');
  if (!gate.unlocked && st.mentor) out.push('Work toward the ★ milestones your mentor must sign before supervised client work.');
  if (gate.unlocked) out.push('Plan a small beginner project with your mentor, and schedule healing reviews for every supervised tattoo.');
  return out;
}

// ------------------------------------------------------------------ Workshop
export function renderWorkshop(root) {
  const st = getState();
  root.innerHTML = `
    <h2>The Workshop</h2>
    <p class="lede">Drawing, design and traditional tattoo art: the 30% foundation that continues throughout your apprenticeship.</p>
    ${WORKSHOP_UNITS.map((u) => `<section class="panel"><h3>${esc(u.title)}</h3>
      ${u.tasks.map((t, i) => { const key = `${u.id}.${i}`; return `<label><input type="checkbox" data-task="${key}" ${st.workshop[key] ? 'checked' : ''}> ${esc(t)} ${st.workshop[key] ? `<span class="muted small">(${esc(st.workshop[key])})</span>` : ''}</label>`; }).join('')}
    </section>`).join('')}
    <p>Upload designs to <a href="#/portfolio">The Portfolio</a> and ask <a href="#/mentor?type=design">The Mentor</a> for critique. Technique-specific design work (translating flash, line weight, sizing) is in <a href="#/station/techniques/trk.trad">Traditional Tattoo Application</a>.</p>`;
  root.querySelectorAll('[data-task]').forEach((c) => c.addEventListener('change', () => update((s) => { if (c.checked) s.workshop[c.dataset.task] = today(); else delete s.workshop[c.dataset.task]; })));
}

// ------------------------------------------------------------------ Archive
export function renderArchive(root, sub) {
  const kinds = [['regulation', 'Regulation'], ['safety', 'Public health & safety'], ['education', 'Professional education'], ['equipment', 'Equipment & manufacturers'], ['community', 'Community']];
  root.innerHTML = `
    <h2>The Archive</h2>
    <nav class="pills"><a href="#/archive" class="${sub !== 'research' ? 'active' : ''}">History & theory</a><a href="#/archive/research" class="${sub === 'research' ? 'active' : ''}">Research library</a></nav>
    ${sub === 'research' ? `
      <p class="lede">Sources for professional technical tattoo education. ✓ marks sources checked during research. Everything else is a lead to investigate. Always confirm the current regulatory text with the regulator.</p>
      ${kinds.map(([k, label]) => `<h3>${esc(label)}</h3><ul class="res">${RESOURCES.filter((r) => r.kind === k).map((r) => `<li>${r.verified ? '✓ ' : ''}${r.url ? `<a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.title)}</a>` : `<b>${esc(r.title)}</b>`}<br><span class="small">${esc(r.note)}</span></li>`).join('')}</ul>`).join('')}
      <h3>Where educators disagree</h3>${evidenceLegend()}
      ${DISAGREEMENTS.map((d) => `<details class="topic"><summary>${esc(d.topic)} ${tag(d.evidence)}</summary><ul>${d.positions.map((p) => `<li>${esc(p)}</li>`).join('')}</ul><p><b>LINEAGE's approach:</b> ${esc(d.lineage)}</p></details>`).join('')}
    ` : `
      <p class="lede">Tattoo history and technical theory: the 15% that explains why traditional work looks the way it does.</p>
      ${ARCHIVE_UNITS.map((u) => `<section class="panel"><h3>${esc(u.title)}</h3><ul>${u.topics.map((t) => `<li>${esc(t)}</li>`).join('')}</ul></section>`).join('')}`}`;
}

// ------------------------------------------------------------------ Portfolio
export function renderPortfolio(root) {
  const st = getState();
  root.innerHTML = `
    <h2>The Portfolio</h2>
    <p class="lede">Your best designs, flash, practice pieces and healed supervised work. Label clearly which pieces are on synthetic skin and which are on human skin, and always include healed photos of client work.</p>
    <form id="pf-form" class="form">
      <label>Title <input name="title" required></label>
      <label>Kind <select name="kind"><option>Design / flash</option><option>Synthetic-skin practice</option><option>Supervised tattoo (fresh)</option><option>Supervised tattoo (healed)</option></select></label>
      <label>Files <input type="file" name="files" accept="image/*" multiple required></label>
      <label>Note <textarea name="note"></textarea></label>
      <button>Add to portfolio</button></form>
    <div class="gallery">${st.portfolio.slice().reverse().map((p) => `<figure class="item"><figcaption><b>${esc(p.title)}</b> · ${esc(p.kind)} · ${esc(p.date)}</figcaption>${thumbs(p.fileIds)}<p class="small">${esc(p.note)}</p></figure>`).join('')}</div>`;
  hydrateThumbs(root);
  root.querySelector('#pf-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const fileIds = [];
    for (const f of fd.getAll('files').filter((x) => x.size)) fileIds.push(await putFile(f));
    update((s) => s.portfolio.push({ id: uid('pf'), title: fd.get('title'), kind: fd.get('kind'), note: fd.get('note'), fileIds, date: today() }));
  });
}
