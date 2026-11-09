import { MACHINE_LESSONS, TROUBLESHOOTING } from '../data/machines.js';
import { NEEDLE_LESSONS, CONFIGS, GAUGES, TAPERS } from '../data/needles.js';
import { SKIN_LESSONS } from '../data/skin.js';
import { EXERCISES, PRACTICE_LEVELS } from '../data/practice.js';
import { PROCEDURE, CASE_STUDIES } from '../data/procedure.js';
import { SUPERVISED_MODULES } from '../data/supervised.js';
import { MILESTONES } from '../data/milestones.js';
import { TRACKS } from '../data/techniques.js';
import { UNITS } from '../data/deep/technique-units.js';
import { QUESTIONS, DOMAINS } from '../data/questions.js';
import { RESOURCES } from '../data/resources.js';
import { getState, update, silentUpdate, uid, putFile } from '../lib/store.js';
import { esc, tag, today, lessonHTML, bindQuizzes, evidenceLegend, thumbs, hydrateThumbs } from '../lib/ui.js';
import { mountWidgets } from '../lib/widgets.js';
import { clientWorkGate, exerciseUnlocked, healingDue, milestoneStatus, HEALING_CHECKPOINTS } from '../lib/logic.js';

export const STATION_PAGES = [
  { id: 'overview', name: 'Overview' },
  { id: 'machines', name: 'Machine Laboratory' },
  { id: 'needles', name: 'Needle Library' },
  { id: 'skin', name: 'Skin Anatomy' },
  { id: 'equipment', name: 'Equipment' },
  { id: 'techniques', name: 'Technique Tracks' },
  { id: 'practice', name: 'Synthetic-Skin Assignments' },
  { id: 'procedure', name: 'Procedure Checklists' },
  { id: 'troubleshoot', name: 'Troubleshooting' },
  { id: 'safety', name: 'Safety Training' },
  { id: 'supervised', name: 'Supervised Client Work' },
  { id: 'healed', name: 'Healed Reviews' },
  { id: 'milestones', name: 'Practical Milestones' },
  { id: 'questions', name: 'Question Bank' },
];

const ALL_LESSONS = Object.fromEntries([...MACHINE_LESSONS, ...NEEDLE_LESSONS, ...SKIN_LESSONS].map((l) => [l.id, l]));
const RES = Object.fromEntries(RESOURCES.map((r) => [r.id, r]));

export function renderStation(root, sub = 'overview', arg, arg2) {
  const page = STATION_PAGES.find((p) => p.id === sub) ? sub : 'overview';
  root.innerHTML = `
    <div class="station">
      <nav class="subnav">${STATION_PAGES.map((p) => `<a href="#/station/${p.id}" class="${p.id === page ? 'active' : ''}">${esc(p.name)}</a>`).join('')}</nav>
      <div class="subpage">${PAGES[page](arg, arg2)}</div>
    </div>`;
  bindQuizzes(root, ALL_LESSONS);
  mountWidgets(root);
  BIND[page]?.(root, arg, arg2);
  hydrateThumbs(root);
}

const lessonList = (lessons) => lessons.map(lessonHTML).join('');
const toc = (lessons) => `<ol class="toc">${lessons.map((l) => `<li><a href="#${esc(l.id)}" data-scroll="${esc(l.id)}">${esc(l.title)}</a></li>`).join('')}</ol>`;
const refLinks = (ids) => ids?.length ? `<p class="small refs">References: ${ids.map((id) => RES[id] ? (RES[id].url ? `<a href="${esc(RES[id].url)}" target="_blank" rel="noopener">${esc(RES[id].title)}</a>` : esc(RES[id].title)) : '').join(' · ')}</p>` : '';

const PAGES = {
  overview() {
    const st = getState();
    const gate = clientWorkGate(st);
    const subs = st.submissions.length;
    const approved = MILESTONES.filter((m) => milestoneStatus(st.signoffs, m.id, st.mentor?.id ?? null) === 'approved').length;
    return `
      <h2>The Station</h2>
      <p class="lede">The practical tattooing education center: machines, needles, skin, procedure, safety, and the supervised transition to human skin.</p>
      <div class="banner">
        <strong>Online study never authorizes tattooing a person.</strong> Work on human skin happens only under a qualified, licensed supervising mentor, in a registered shop, under an active Vermont apprentice license. LINEAGE and its AI Mentor cannot certify readiness.
      </div>
      <div class="cards">
        <div class="card"><div class="big">${subs}</div>synthetic-skin submissions</div>
        <div class="card"><div class="big">${approved}/${MILESTONES.length}</div>mentor-approved milestones</div>
        <div class="card ${gate.unlocked ? 'ok' : 'locked'}"><div class="big">${gate.unlocked ? 'Unlocked' : 'Locked'}</div>supervised client log</div>
      </div>
      <div class="grid2">
        ${STATION_PAGES.slice(1).map((p) => `<a class="tile" href="#/station/${p.id}"><h4>${esc(p.name)}</h4></a>`).join('')}
      </div>
      ${evidenceLegend()}`;
  },

  machines() {
    return `<h2>Machine Laboratory</h2>
      <p class="lede">Coil, rotary and pen machines. Settings are taught as relationships you tune on your own machine with the manufacturer's guidance and your mentor, not as universal numbers.</p>
      ${evidenceLegend()}${toc(MACHINE_LESSONS)}${lessonList(MACHINE_LESSONS)}
      <p><a href="#/station/troubleshoot">→ Technical troubleshooting guide</a></p>
      ${videoStudy('machine')}`;
  },

  needles() {
    return `<h2>Needle Reference Library</h2>
      ${evidenceLegend()}
      <div class="widget" data-widget="needle-compare"></div>
      <h3>Configurations</h3>
      <table class="tbl"><thead><tr><th>Code</th><th>Name</th><th>Typical use</th><th>Common counts</th></tr></thead><tbody>
      ${CONFIGS.map((c) => `<tr><td><b>${esc(c.id)}</b></td><td>${esc(c.name)}</td><td>${esc(c.use)}</td><td>${c.counts.join(', ')}</td></tr>`).join('')}</tbody></table>
      <h3>Diameters ${tag('ind')}</h3>
      <table class="tbl"><tbody>${GAUGES.map((g) => `<tr><td><b>${esc(g.gauge)}</b></td><td>${g.mm} mm</td><td>${esc(g.note)}</td></tr>`).join('')}</tbody></table>
      <h3>Tapers ${tag('ind')}</h3>
      <ul>${TAPERS.map((t) => `<li><b>${esc(t.name)}</b>: ${esc(t.note)}</li>`).join('')}</ul>
      <p class="small muted">Taper names and lengths are not standardised across manufacturers. Compare within one brand.</p>
      ${lessonList(NEEDLE_LESSONS)}`;
  },

  skin() {
    return `<h2>Skin Anatomy & Tattoo Technique</h2>
      <p class="lede">The biology underneath every technique. Medical facts are separated from shop convention and contested practice.</p>
      <div class="banner small">Education only. This is not medical advice. Abnormal responses are referred to a health-care professional; neither you nor the AI diagnoses them.</div>
      ${evidenceLegend()}${toc(SKIN_LESSONS)}${lessonList(SKIN_LESSONS)}`;
  },

  equipment() {
    const items = [
      ['Power supplies, footswitches, clip cords & RCA', 'See the Machine Lab lesson on power. Inspect before every session and barrier-protect what you touch.', 'ind'],
      ['Grips & tubes', 'Disposable grips are single-use. Reusable steel grips and tubes require cleaning followed by validated sterilisation (autoclave with monitoring) per the Vermont rules and your shop protocol.', 'reg'],
      ['Cartridges & needles', 'Single-use, opened in front of the client, disposed of as sharps. Check compatibility and expiry.', 'reg'],
      ['Inks', 'Reputable manufacturers only. Record brand and lot. Never dilute with non-sterile water. Use single-use ink caps.', 'med'],
      ['Stencil supplies', 'Thermal or hectograph stencils and stencil solution. Apply from single-use portions.', 'ind'],
      ['Barriers & PPE', 'Machine and cord bags, surface covers, nitrile gloves, aprons, eye protection as your exposure control plan specifies.', 'reg'],
      ['Sharps & biohazard containers', 'Approved sharps containers within reach. Regulated waste handled per OSHA and state requirements.', 'reg'],
      ['Disinfectants', 'EPA-registered disinfectants used at label contact times. Cleaning comes before disinfection.', 'med'],
      ['Practice surfaces', 'Synthetic skin sheets and 3D forms (arms, hands). Use them with full barrier practice so the habits carry over.', 'ind'],
    ];
    return `<h2>Equipment Education</h2>${evidenceLegend()}
      <div class="list">${items.map(([h, p, t]) => `<div class="item"><h4>${esc(h)} ${tag(t)}</h4><p>${esc(p)}</p></div>`).join('')}</div>
      ${refLinks(['osha-bbp', 'vt-rules', 'fda-ink', 'cdc-tattoo'])}`;
  },

  techniques(arg, topicId) {
    const st = getState();
    const track = TRACKS.find((t) => t.id === arg) || TRACKS[0];
    if (topicId) return unitPage(track, topicId);
    const ex = Object.fromEntries(EXERCISES.map((e) => [e.id, e]));
    return `<h2>Technique Tracks</h2>
      <nav class="pills">${TRACKS.map((t) => `<a class="${t.id === track.id ? 'active' : ''}" href="#/station/techniques/${t.id}">${esc(t.title)}</a>`).join('')}</nav>
      <p class="small">Each topic has five parts: theory, demonstration study, a simulated exercise on synthetic skin, a professional observation assignment, and a supervised practical assessment signed by your mentor.</p>
      <p>Synthetic milestone: <b>${esc(msTitle(track.synthMilestone))}</b> (${statusBadge(st, track.synthMilestone)}) · Human-skin assessment: <b>${esc(msTitle(track.milestone))}</b> (${statusBadge(st, track.milestone)})</p>
      ${track.topics.map((t) => `
        <details class="topic"><summary>${esc(t.title)} <a class="small" href="#/station/techniques/${track.id}/${t.id}">open full unit →</a></summary>
          <dl>
            <dt>Theory</dt><dd>${esc(t.theory)}</dd>
            <dt>Demonstration study</dt><dd>${esc(t.demo)}</dd>
            <dt>Simulated exercise</dt><dd><a href="#/station/practice/${esc(t.exercise)}">${esc(ex[t.exercise]?.title || t.exercise)}</a></dd>
            <dt>Professional observation</dt><dd>${esc(t.observe)} <button class="link" data-observe="${esc(t.id)}">Log observation</button></dd>
            <dt>Supervised assessment</dt><dd>Signed by your mentor in Mentor Mode: ${esc(msTitle(track.milestone))}.</dd>
          </dl>
        </details>`).join('')}`;
  },

  practice(arg) {
    const st = getState();
    if (arg) return exerciseDetail(arg);
    return `<h2>Synthetic-Skin Assignments</h2>
      <p class="lede">A progressive program on synthetic practice surfaces. Every assignment needs photo or video evidence.</p>
      <div class="banner small">Assignments unlock as you submit work. That tracks progress, not competency. The AI Mentor gives feedback on what is visible, but it cannot judge needle depth, safe skin trauma or professional competency from photos of synthetic skin. Competency milestones are signed by your mentor in person.</div>
      ${PRACTICE_LEVELS.map((lv) => `
        <h3>Level ${lv.id}: ${esc(lv.name)}</h3><p class="muted">${esc(lv.desc)}</p>
        <div class="list">${EXERCISES.filter((e) => e.level === lv.id).map((e) => {
          const n = st.submissions.filter((s) => s.exerciseId === e.id).length;
          const open = exerciseUnlocked(e, st.submissions);
          return `<a class="item ${open ? '' : 'locked'}" href="#/station/practice/${e.id}">
            <h4>${esc(e.title)} ${n ? `<span class="badge">${n} submitted</span>` : ''} ${open ? '' : '<span class="badge">locked</span>'}</h4>
            <p>${esc(e.goal)}</p></a>`;
        }).join('')}</div>`).join('')}`;
  },

  procedure() {
    const st = getState();
    const runs = st.checklistRuns.slice(-5).reverse();
    return `<h2>Complete Tattoo Procedure</h2>
      <p class="lede">All 18 steps of a professional appointment. Safety-critical steps are marked and link to public-health and Vermont sources. Read the current text of each.</p>
      <div class="row"><button id="run-practice">Start a practice run (synthetic skin)</button>
        <span class="muted small">Supervised client runs are logged in <a href="#/station/supervised">Supervised Client Work</a>.</span></div>
      <div id="run-area"></div>
      <ol class="procedure">${PROCEDURE.map((s) => `
        <li class="${s.critical ? 'critical' : ''}"><h4>${s.n}. ${esc(s.title)} ${s.critical ? '<span class="tag tag-reg">safety-critical</span>' : ''}</h4>
          <ul>${s.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>${refLinks(s.refs)}</li>`).join('')}</ol>
      <h3>Case studies</h3>
      ${CASE_STUDIES.map((c) => `<details class="topic"><summary>${esc(c.title)}</summary><p>${esc(c.scenario)}</p><p><b>${esc(c.question)}</b></p>
        <details><summary>Show the expected response</summary><p>${esc(c.answer)}</p></details></details>`).join('')}
      ${videoStudy('procedure')}
      ${runs.length ? `<h3>Recent practice runs</h3><ul>${runs.map((r) => `<li>${esc(r.date)}: ${countChecked(r)} of ${totalItems()} items</li>`).join('')}</ul>` : ''}`;
  },

  troubleshoot() {
    return `<h2>Technical Troubleshooting</h2>
      <p class="lede">Start with technique, then setup, then equipment. Change one thing at a time. Items marked <span class="tag tag-reg">stop</span> mean stop work and get help.</p>
      ${TROUBLESHOOTING.map((t) => `<details class="topic"><summary>${esc(t.symptom)}</summary>
        <ol>${t.causes.map((c) => `<li><b>${esc(c.c)}</b>${c.stop ? ' <span class="tag tag-reg">stop</span>' : ''}<br><span class="small">${esc(c.check)}</span></li>`).join('')}</ol>
        ${t.note ? `<p class="warn small">${esc(t.note)}</p>` : ''}</details>`).join('')}`;
  },

  safety() {
    const st = getState();
    const L = st.legal || {};
    return `<h2>Safety Training</h2>
      ${evidenceLegend()}
      <div class="list">
        <div class="item"><h4>Bloodborne pathogens & universal precautions ${tag('reg')}</h4>
          <p>Treat all blood and body fluids as potentially infectious. Exposure control plan, PPE, sharps handling (no recapping), regulated waste, and post-exposure procedures follow OSHA 29 CFR 1910.1030. Vermont requires a universal precautions / infectious disease course. Confirm the current required course with OPR.</p>
          <p>Your recorded course: <b>${L.bbpCompleted ? `${esc(L.bbpProvider || 'course')} completed ${esc(L.bbpCompleted)}${L.bbpExpires ? `, expires ${esc(L.bbpExpires)}` : ''}` : 'not recorded'}</b>. <a href="#/ledger">Record it in The Ledger</a>.</p></div>
        <div class="item"><h4>Cross-contamination ${tag('med')}</h4><p>Anything touched with a contaminated glove is contaminated. Define the clean field, the dirty field and the transitions between them before every session. See procedure steps 4–6, 14 and 17.</p></div>
        <div class="item"><h4>Ink safety ${tag('med')}</h4><p>The CDC has linked tattoo infection outbreaks to contaminated ink and dilution with non-sterile water. The FDA has issued warnings about specific contaminated inks, including in 2025. Check FDA advisories, record lot numbers, and report reactions to MedWatch.</p></div>
        <div class="item"><h4>Exposure incidents ${tag('reg')}</h4><p>After a needlestick or splash, follow your shop's post-exposure plan: wash, report to your mentor, and seek prompt medical evaluation. Document the incident.</p></div>
        <div class="item"><h4>Client emergencies ${tag('med')}</h4><p>Know where the first-aid kit is and how to call 911. A first-aid or CPR course is strongly recommended.</p></div>
      </div>
      ${refLinks(['osha-bbp', 'vt-rules', 'vt-statute', 'cdc-tattoo', 'fda-ink'])}`;
  },

  supervised() {
    const st = getState();
    const gate = clientWorkGate(st);
    return `<h2>Supervised Human-Skin Tattooing</h2>
      <p class="lede">The transition from synthetic surfaces to consenting adult clients, under a qualified mentor and within Vermont law.</p>
      <div class="gate ${gate.unlocked ? 'ok' : 'locked'}">
        <h3>${gate.unlocked ? 'Supervised session log unlocked' : 'Supervised session log locked'}</h3>
        ${gate.unlocked ? '<p>Your mentor has approved every prerequisite. Every client session still requires your mentor present and directly supervising.</p>'
          : `<p>The log unlocks only when your registered mentor has signed every prerequisite. The AI Mentor cannot unlock it.</p><ul>${gate.reasons.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>`}
      </div>
      <h3>Curriculum</h3>
      ${SUPERVISED_MODULES.map((m) => `<details class="topic"><summary>${esc(m.title)} ${tag(m.tag)}</summary>${m.body.map((p) => `<p>${esc(p)}</p>`).join('')}
        ${m.id === 'sup.legal' ? refLinks(['vt-statute', 'vt-rules', 'vt-supervise', 'vt-opr']) : ''}</details>`).join('')}
      ${gate.unlocked ? sessionForm() : ''}
      ${sessionList(st)}`;
  },

  healed() {
    const st = getState();
    const sessions = st.clientSessions;
    return `<h2>Healed Tattoo Reviews</h2>
      <p class="lede">Track every supervised tattoo through healing. Compare each stage with the fresh photo and review with your mentor.</p>
      ${!sessions.length ? '<p class="muted">No supervised sessions logged yet. Reviews appear here once client work begins.</p>' : sessions.map((s) => {
        const due = healingDue(s.date, st.healingReviews.filter((r) => r.sessionId === s.id));
        return `<div class="item"><h4>${esc(s.date)} · ${esc(s.placement)} · ${esc(s.design)}</h4>
          <ul class="checkpoints">${due.map((c) => `<li class="${c.done ? 'done' : c.overdue ? 'overdue' : ''}">${esc(c.label)}: due ${c.due} ${c.done ? '✓' : c.overdue ? '(overdue)' : ''}</li>`).join('')}</ul>
          ${st.healingReviews.filter((r) => r.sessionId === s.id).map((r) => `<div class="review"><b>${esc(HEALING_CHECKPOINTS.find((c) => c.id === r.checkpoint)?.label)}</b> · ${esc(r.date)}<p>${esc(r.notes)}</p>${thumbs(r.fileIds)}
            ${r.mentorNote ? `<p class="mentor-note">Mentor (${esc(r.mentorNote.mentorName)}): ${esc(r.mentorNote.text)}</p>` : ''}</div>`).join('')}
          <form class="healing-form" data-session="${esc(s.id)}">
            <select name="checkpoint">${HEALING_CHECKPOINTS.map((c) => `<option value="${c.id}">${esc(c.label)}</option>`).join('')}</select>
            <input type="file" name="files" accept="image/*" multiple required>
            <textarea name="notes" placeholder="What you see: line spread, patchiness, raised areas, color retention…" required></textarea>
            <button>Add healing review</button> <a href="#/mentor?type=healed">Ask the AI Mentor for observations</a>
          </form></div>`;
      }).join('')}
      <p class="warn small">Concerning signs (spreading redness, heat, pus, red streaks, fever, raised or itchy reactions confined to one color) are referred to a health-care professional. Do not wait for a scheduled review.</p>`;
  },

  questions(domain) {
    const st = getState();
    const pool = QUESTIONS.filter((q) => !domain || domain === 'all' || q.domain === domain);
    const hist = (st.bank || []).slice(-8).reverse();
    return `<h2>Question Bank</h2>
      <p class="lede">${QUESTIONS.length} questions across ${Object.keys(DOMAINS).length} domains, including scenario judgement questions. Each set draws 10 at random and favours questions you have missed.</p>
      <nav class="pills"><a class="${!domain || domain === 'all' ? 'active' : ''}" href="#/station/questions/all">All (${QUESTIONS.length})</a>${Object.entries(DOMAINS).map(([k, v]) => `<a class="${domain === k ? 'active' : ''}" href="#/station/questions/${k}">${esc(v)} (${QUESTIONS.filter((q) => q.domain === k).length})</a>`).join('')}</nav>
      <button id="bank-start">Start a 10-question set${domain && domain !== 'all' ? `: ${esc(DOMAINS[domain])}` : ''}</button>
      <div id="bank-area" data-pool="${esc(pool.map((q) => q.id).join(','))}"></div>
      ${hist.length ? `<h3>Recent sets</h3><table class="tbl"><tbody>${hist.map((h) => `<tr><td>${esc(h.date)}</td><td>${esc(h.domain === 'all' ? 'All' : DOMAINS[h.domain] || h.domain)}</td><td>${h.correct}/${h.total}</td></tr>`).join('')}</tbody></table>` : ''}
      <h3>Mastery by domain</h3><table class="tbl"><tbody>${Object.entries(DOMAINS).map(([k, v]) => {
        const qs = QUESTIONS.filter((q) => q.domain === k);
        const right = qs.filter((q) => (st.qstats || {})[q.id]?.lastOk).length;
        return `<tr><td>${esc(v)}</td><td><progress max="${qs.length}" value="${right}"></progress> ${right}/${qs.length} last answered correctly</td></tr>`;
      }).join('')}</tbody></table>
      <p class="muted small">Knowledge checks measure understanding, not practical skill or readiness to tattoo.</p>`;
  },

  milestones() {
    const st = getState();
    const phases = [['pre-client', 'Before client work'], ['supervised', 'Supervised client work'], ['independence', 'Toward independent practice']];
    return `<h2>Mentor-Approved Practical Milestones</h2>
      <p class="lede">Only your registered supervising mentor can sign these, in Mentor Mode in <a href="#/ledger">The Ledger</a>. ★ marks prerequisites for supervised client work.</p>
      ${phases.map(([ph, label]) => `<h3>${esc(label)}</h3><div class="list">${MILESTONES.filter((m) => m.phase === ph).map((m) => `
        <div class="item"><h4>${m.gate ? '★ ' : ''}${esc(m.title)} ${statusBadge(st, m.id)}</h4><p class="small">${esc(m.observe)}</p>${latestNote(st, m.id)}</div>`).join('')}</div>`).join('')}`;
  },
};

// ------------------------------------------------------------------ helpers

function videoStudy(kind) {
  const prompts = kind === 'machine'
    ? ['Find a manufacturer\'s setup video for a machine your shop uses. Write down the stroke, voltage range and cartridge compatibility it states.', 'Watch an experienced artist tune a coil machine. List each adjustment and its stated effect.', 'Compare two educators\' opinions on pen vs coil for learning. Note where they disagree.']
    : ['Watch a full procedure video from a licensed artist. Mark every glove change and barrier touch.', 'Identify one cross-contamination risk in a video and describe the fix.'];
  return `<div class="item"><h4>Video & demonstration study</h4><p class="small">LINEAGE does not host third-party videos. Use the <a href="#/archive/research">research library</a> to find professional sources, then complete these observation prompts:</p>
    <ul>${prompts.map((p) => `<li>${esc(p)}</li>`).join('')}</ul></div>`;
}

function unitPage(track, topicId) {
  const t = track.topics.find((x) => x.id === topicId);
  if (!t) return '<p>Unknown topic.</p>';
  const u = UNITS[topicId] || {};
  const ex = EXERCISES.find((e) => e.id === t.exercise);
  const done = getState().unitProgress?.[topicId] || {};
  return `<p><a href="#/station/techniques/${track.id}">← ${esc(track.title)}</a></p>
    <h2>${esc(t.title)}</h2>
    <p class="lede">${esc(t.theory)}</p>
    <section class="panel"><h3>1. Theory</h3>${(u.lessons || []).map((p) => `<p>${esc(p)}</p>`).join('')}</section>
    <section class="panel"><h3>2. Demonstration study</h3><p>${esc(t.demo)}</p><p class="small muted">Find professional demonstrations through the <a href="#/archive/research">research library</a>, and record what you watched with the <b>Log observation</b> button in section 4.</p></section>
    <section class="panel"><h3>3. Drill progression (synthetic skin)</h3>
      ${u.progression?.length ? `<table class="tbl"><thead><tr><th>Session</th><th>Drill</th><th>Target</th><th>Done</th></tr></thead><tbody>${u.progression.map((p) => `<tr><td>${p.s}</td><td>${esc(p.drill)}</td><td>${esc(p.target)}</td><td><input type="checkbox" data-unit="${esc(topicId)}" data-step="${p.s}" ${done[p.s] ? 'checked' : ''}></td></tr>`).join('')}</tbody></table>` : ''}
      ${ex ? `<p>Linked assignment: <a href="#/station/practice/${esc(ex.id)}">${esc(ex.title)}</a>. Submit photos there for AI feedback.</p>` : ''}
      ${u.goodEnough?.length ? `<h4>Good enough to move on (visible criteria on synthetic skin)</h4><ul>${u.goodEnough.map((g) => `<li>${esc(g)}</li>`).join('')}</ul><p class="muted small">Meeting these on synthetic skin is not competency on human skin.</p>` : ''}
    </section>
    ${u.defects?.length ? `<section class="panel"><h3>Defect guide</h3><table class="tbl"><thead><tr><th>Defect</th><th>Looks like</th><th>Likely cause</th><th>Fix</th></tr></thead><tbody>${u.defects.map((d) => `<tr><td><b>${esc(d.d)}</b></td><td>${esc(d.looks)}</td><td>${esc(d.cause)}</td><td>${esc(d.fix)}</td></tr>`).join('')}</tbody></table></section>` : ''}
    <section class="panel"><h3>4. Professional observation</h3><p>${esc(t.observe)}</p><button class="link" data-observe="${esc(t.id)}">Log observation</button></section>
    <section class="panel"><h3>5. Supervised practical assessment</h3><p>Signed by your mentor in person: <b>${esc(msTitle(track.synthMilestone))}</b> (${statusBadge(getState(), track.synthMilestone)}). On human skin: <b>${esc(msTitle(track.milestone))}</b> (${statusBadge(getState(), track.milestone)}).</p></section>`;
}

function msTitle(id) { return MILESTONES.find((m) => m.id === id)?.title || id; }

function statusBadge(st, id) {
  const s = milestoneStatus(st.signoffs, id, st.mentor?.id ?? null);
  return `<span class="badge st-${s}">${s === 'approved' ? 'mentor-approved' : s === 'needs-work' ? 'needs work' : 'pending'}</span>`;
}

function latestNote(st, id) {
  const list = st.signoffs.filter((s) => s.milestoneId === id && s.mentorId === st.mentor?.id);
  const s = list[list.length - 1];
  if (!s) return '';
  return `<p class="mentor-note">${esc(s.date)} · ${esc(s.mentorName)}: ${esc(s.observations)}${s.skillsToTrain ? `<br><b>Train next:</b> ${esc(s.skillsToTrain)}` : ''}</p>`;
}

function totalItems() { return PROCEDURE.reduce((a, s) => a + s.items.length, 0); }
function countChecked(run) { return Object.values(run.checked || {}).flat().filter(Boolean).length; }

function exerciseDetail(id) {
  const st = getState();
  const e = EXERCISES.find((x) => x.id === id);
  if (!e) return '<p>Unknown exercise.</p>';
  const subs = st.submissions.filter((s) => s.exerciseId === id).reverse();
  const open = exerciseUnlocked(e, st.submissions);
  const reqs = (e.requires || []).map((r) => EXERCISES.find((x) => x.id === r)?.title).filter(Boolean);
  return `<p><a href="#/station/practice">← All assignments</a></p>
    <h2>${esc(e.title)}</h2><p class="lede">${esc(e.goal)}</p>
    ${!open ? `<div class="banner small">Submit work for the earlier assignments first: ${reqs.map(esc).join(', ')}. You can still read this assignment.</div>` : ''}
    <div class="grid2">
      <div><h4>Steps</h4><ol>${e.steps.map((s) => `<li>${esc(s)}</li>`).join('')}</ol></div>
      <div><h4>Required evidence</h4><ul>${e.evidence.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
        <h4>Visible criteria</h4><ul>${e.criteria.map((s) => `<li>${esc(s)}</li>`).join('')}</ul></div>
    </div>
    ${open ? `<form id="submit-form" class="form">
      <h4>Submit practice work</h4>
      <label>Photos / videos (required) <input type="file" name="files" accept="image/*,video/*" multiple required></label>
      <label>Surface <select name="surface"><option>Synthetic skin sheet</option><option>3D synthetic form (arm/hand/leg)</option><option>Other practice surface</option></select></label>
      <label>Setup (machine, needle, stroke, voltage/battery, give) <input name="setup" placeholder="e.g. rotary 3.5 mm, 7RL #12 LT, battery 80%"></label>
      <label>Notes (what you noticed, what was hard) <textarea name="notes"></textarea></label>
      <button>Save submission</button>
    </form>` : ''}
    <h3>Submissions</h3>
    ${subs.length ? subs.map((s) => `<div class="item"><h4>${esc(s.date)} · ${esc(s.surface)}</h4><p class="small">${esc(s.setup)}</p><p>${esc(s.notes)}</p>${thumbs(s.fileIds)}
      <a href="#/mentor?type=synthetic&submission=${esc(s.id)}">Get AI Mentor feedback</a>
      ${st.aiLog.filter((a) => a.submissionId === s.id).map((a) => `<details><summary>AI Mentor feedback ${esc(a.date)}</summary>${aiSummary(a.result)}</details>`).join('')}
    </div>`).join('') : '<p class="muted">No submissions yet.</p>'}`;
}

export function aiSummary(r) {
  if (!r) return '';
  const li = (a) => (a || []).map((x) => `<li>${esc(x)}</li>`).join('');
  return `<div class="ai">
    <h5>Visible observations</h5><ul>${li(r.visible_observations)}</ul>
    <h5>Cannot be determined from this upload</h5><ul>${li(r.cannot_determine)}</ul>
    <h5>Recommended training</h5><ul>${(r.recommended_training || []).map((t) => `<li>${t.exercise_id && t.exercise_id !== 'none' ? `<a href="#/station/practice/${esc(t.exercise_id)}">${esc(t.exercise_id)}</a>: ` : ''}${esc(t.reason)}</li>`).join('')}</ul>
    ${r.flags_for_professional?.length ? `<h5 class="warn">Flag for professional evaluation</h5><ul>${li(r.flags_for_professional)}</ul>` : ''}
    <p class="muted small">AI feedback describes what is visible. It is not a competency assessment, a medical opinion or authorization to tattoo.</p></div>`;
}

function sessionForm() {
  return `<form id="session-form" class="form">
    <h3>Log a supervised client session</h3>
    <p class="small">Your learning record only. The shop keeps the legal client record. Do not enter client names or contact details.</p>
    <label>Date <input type="date" name="date" value="${today()}" required></label>
    <label>Client reference (initials or shop record #) <input name="clientRef" required></label>
    <label><input type="checkbox" name="adult" required> Age 18+ verified with government photo ID</label>
    <label><input type="checkbox" name="consent" required> Written informed consent obtained, including consent to being tattooed by a supervised apprentice</label>
    <label>Supervising mentor present <input name="supervisor" value="${esc(getState().mentor?.name || '')}" required></label>
    <label>Design <input name="design" required></label>
    <label>Placement <input name="placement" required></label>
    <label>Needles & machine <input name="setup"></label>
    <label>Inks (brand / lot) <input name="inks"></label>
    <label>Duration (hours) <input type="number" name="duration" step="0.25" min="0"></label>
    <label>Complications or incidents <textarea name="complications" placeholder="None, or describe what happened and how it was handled"></textarea></label>
    <label>Your reflection <textarea name="reflection"></textarea></label>
    <label>Fresh photos (with client consent) <input type="file" name="files" accept="image/*" multiple></label>
    <button>Save session</button></form>`;
}

function sessionList(st) {
  if (!st.clientSessions.length) return '';
  return `<h3>Logged sessions</h3>${st.clientSessions.slice().reverse().map((s) => `<div class="item">
    <h4>${esc(s.date)} · ${esc(s.design)} · ${esc(s.placement)}</h4>
    <p class="small">Client ${esc(s.clientRef)} · Supervisor ${esc(s.supervisor)} · ${esc(s.setup)} · ${esc(s.inks)}</p>
    ${s.complications ? `<p class="warn small">Incidents: ${esc(s.complications)}</p>` : ''}
    <p>${esc(s.reflection)}</p>${thumbs(s.fileIds)}
    ${s.mentorNote ? `<p class="mentor-note">Mentor (${esc(s.mentorNote.mentorName)}): ${esc(s.mentorNote.text)}</p>` : '<p class="muted small">Awaiting mentor feedback (Mentor Mode → The Ledger).</p>'}
    <a href="#/station/healed">Healing reviews →</a></div>`).join('')}`;
}

async function saveFiles(fileList) {
  const ids = [];
  for (const f of fileList) ids.push(await putFile(f));
  return ids;
}

const BIND = {
  machines: bindScroll, skin: bindScroll,
  practice(root, arg) {
    const form = root.querySelector('#submit-form');
    if (!form) return;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const files = fd.getAll('files').filter((f) => f.size);
      if (!files.length) return alert('Add at least one photo or video.');
      const fileIds = await saveFiles(files);
      update((s) => s.submissions.push({ id: uid('sub'), exerciseId: arg, date: today(), surface: fd.get('surface'), setup: fd.get('setup'), notes: fd.get('notes'), fileIds }));
    });
  },
  procedure(root) {
    root.querySelector('#run-practice').addEventListener('click', () => {
      const area = root.querySelector('#run-area');
      area.innerHTML = `<form id="run-form" class="form"><h4>Practice run: ${today()}</h4>
        ${PROCEDURE.map((s) => `<fieldset><legend>${s.n}. ${esc(s.title)}</legend>${s.items.map((it, i) => `<label><input type="checkbox" name="${s.id}" value="${i}"> ${esc(it)}</label>`).join('')}</fieldset>`).join('')}
        <button>Save run</button></form>`;
      area.querySelector('#run-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const checked = Object.fromEntries(PROCEDURE.map((s) => [s.id, s.items.map((_, i) => fd.getAll(s.id).includes(String(i)))]));
        update((st) => st.checklistRuns.push({ id: uid('run'), mode: 'practice', date: today(), checked }));
      });
    });
  },
  questions(root, domain) {
    root.querySelector('#bank-start').addEventListener('click', () => {
      const area = root.querySelector('#bank-area');
      const ids = area.dataset.pool.split(',');
      const stats = getState().qstats || {};
      // weight missed / unseen questions higher
      const weighted = ids.map((id) => ({ id, w: Math.random() * (stats[id]?.lastOk ? 1 : 3) })).sort((a, b) => b.w - a.w).slice(0, 10);
      const set = weighted.map(({ id }) => QUESTIONS.find((q) => q.id === id));
      area.innerHTML = `<form class="quiz form" id="bank-form">${set.map((q, i) => `<fieldset><legend>${i + 1}. ${esc(q.q)} <span class="muted small">(${esc(DOMAINS[q.domain])})</span></legend>${q.options.map((o, j) => `<label><input type="radio" name="q${i}" value="${j}" required> ${esc(o)}</label>`).join('')}<div class="explain" hidden></div></fieldset>`).join('')}<button>Submit</button> <span class="quiz-result"></span></form>`;
      area.querySelector('#bank-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        let correct = 0;
        const results = set.map((q, i) => { const ok = Number(fd.get(`q${i}`)) === q.answer; if (ok) correct++; return { q, ok }; });
        e.target.querySelectorAll('fieldset').forEach((fs, i) => {
          const ex = fs.querySelector('.explain'); const { q, ok } = results[i];
          ex.hidden = false; ex.className = `explain ${ok ? 'ok' : 'bad'}`;
          ex.textContent = `${ok ? 'Correct.' : `Answer: ${q.options[q.answer]}.`} ${q.explain}`;
        });
        e.target.querySelector('button').disabled = true;
        e.target.querySelector('.quiz-result').textContent = `${correct}/${set.length}`;
        // persist without re-rendering away the answers
        const st = getState();
        const qstats = { ...(st.qstats || {}) };
        results.forEach(({ q, ok }) => { const p = qstats[q.id] || { seen: 0, right: 0 }; qstats[q.id] = { seen: p.seen + 1, right: p.right + (ok ? 1 : 0), lastOk: ok }; });
        silentUpdate((s) => { s.qstats = qstats; s.bank = [...(s.bank || []), { date: today(), domain: domain || 'all', correct, total: set.length }]; });
      });
    });
  },
  techniques(root) {
    root.querySelectorAll('[data-unit]').forEach((c) => c.addEventListener('change', () => update((s) => {
      s.unitProgress = s.unitProgress || {};
      s.unitProgress[c.dataset.unit] = { ...(s.unitProgress[c.dataset.unit] || {}), [c.dataset.step]: c.checked ? today() : undefined };
    })));
    root.querySelectorAll('[data-observe]').forEach((b) => b.addEventListener('click', () => {
      const text = prompt('What did you observe? (artist, setting, what you learned)');
      if (text) update((s) => s.mentorNotes.push({ id: uid('obs'), kind: 'observation', topic: b.dataset.observe, text, date: today(), source: 'apprentice' }));
    }));
  },
  supervised(root) {
    const form = root.querySelector('#session-form');
    if (!form) return;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!clientWorkGate(getState()).unlocked) return alert('Locked.');
      const fd = new FormData(form);
      const fileIds = await saveFiles(fd.getAll('files').filter((f) => f.size));
      const rec = Object.fromEntries(['date', 'clientRef', 'supervisor', 'design', 'placement', 'setup', 'inks', 'duration', 'complications', 'reflection'].map((k) => [k, fd.get(k)]));
      update((s) => s.clientSessions.push({ id: uid('cs'), ...rec, adultVerified: true, consentObtained: true, fileIds }));
    });
  },
  healed(root) {
    root.querySelectorAll('.healing-form').forEach((form) => form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const fileIds = await saveFiles(fd.getAll('files').filter((f) => f.size));
      update((s) => s.healingReviews.push({ id: uid('hr'), sessionId: form.dataset.session, checkpoint: fd.get('checkpoint'), date: today(), notes: fd.get('notes'), fileIds }));
    }));
  },
};

function bindScroll(root) {
  root.querySelectorAll('[data-scroll]').forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault();
    root.querySelector(`#${CSS.escape(a.dataset.scroll)}`)?.scrollIntoView({ behavior: 'smooth' });
  }));
}
