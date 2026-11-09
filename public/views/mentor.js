import { EXERCISES } from '../data/practice.js';
import { getState, update, uid, getFile } from '../lib/store.js';
import { esc, today, filesToImages, filesToBlobs } from '../lib/ui.js';
import { askMentor, mentorMode } from '../lib/runtime.js';
import { aiSummary } from './station.js';

export const UPLOAD_TYPES = [
  { id: 'synthetic', label: 'Synthetic-skin practice' },
  { id: 'setup', label: 'Tattoo machine setup photograph' },
  { id: 'video', label: 'Practice video' },
  { id: 'stencil', label: 'Stencil application' },
  { id: 'supervised', label: 'Completed supervised tattoo' },
  { id: 'healed', label: 'Healed tattoo photograph' },
  { id: 'notes', label: 'Written notes from a practical session' },
  { id: 'design', label: 'Drawing / design / flash' },
];

export function renderMentor(root, params) {
  const st = getState();
  const sub = params.get('submission') ? st.submissions.find((s) => s.id === params.get('submission')) : null;
  const type = params.get('type') || 'synthetic';
  root.innerHTML = `
    <h2>The Mentor</h2>
    <p class="lede">An AI technical mentor that gives feedback on what is visible in your uploads and recommends practice.</p>
    <div class="banner small">
      <b>What the AI Mentor can do:</b> describe visible line consistency, saturation, composition, stencil accuracy, placement, visible irregularities and healing appearance over time, and point you to exercises.<br>
      <b>What it cannot do:</b> judge needle depth, safe skin trauma or professional competency from photos; diagnose complications; certify you, or sign any milestone. Anything that looks like a possible complication is flagged for your mentor or a health-care professional.
    </div>
    <p id="ai-status" class="small muted">Checking AI availability…</p>
    <form id="ai-form" class="form">
      <label>Upload type <select name="type">${UPLOAD_TYPES.map((t) => `<option value="${t.id}" ${t.id === type ? 'selected' : ''}>${esc(t.label)}</option>`).join('')}</select></label>
      <label>Related exercise <select name="exerciseId"><option value="">-</option>${EXERCISES.map((e) => `<option value="${e.id}" ${sub?.exerciseId === e.id ? 'selected' : ''}>${esc(e.title)}</option>`).join('')}</select></label>
      ${sub ? `<p class="small">Using ${sub.fileIds.length} file(s) from your ${esc(sub.date)} submission.</p>` : ''}
      <label>Photos / video (videos are sampled as still frames) <input type="file" name="files" accept="image/*,video/*" multiple></label>
      <label>Notes & questions <textarea name="notes" placeholder="Setup used, what you were trying to do, what you want feedback on">${esc(sub ? `Setup: ${sub.setup || ''}\n${sub.notes || ''}` : '')}</textarea></label>
      <button>Ask the Mentor</button>
    </form>
    <div id="ai-out"></div>
    <h3>History</h3>
    ${st.aiLog.length ? st.aiLog.slice().reverse().slice(0, 20).map((a) => `<details class="topic"><summary>${esc(a.date)} · ${esc(UPLOAD_TYPES.find((t) => t.id === a.type)?.label || a.type)}</summary>${aiSummary(a.result)}</details>`).join('') : '<p class="muted">No reviews yet.</p>'}`;

  mentorMode().then((m) => {
    const el = root.querySelector('#ai-status');
    if (!el) return;
    el.textContent = m === 'hosted' ? 'AI Mentor online. Reviews use your own Claude account; the first request asks your permission.'
      : m === 'server' ? 'AI Mentor online.'
      : 'AI Mentor offline. Locally, start LINEAGE with ANTHROPIC_API_KEY set (see README); hosted, open the page inside claude.ai.';
  });

  root.querySelector('#ai-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const out = root.querySelector('#ai-out');
    const files = fd.getAll('files').filter((f) => f.size);
    if (sub) for (const id of sub.fileIds) { const rec = await getFile(id); if (rec) files.push(new File([rec.blob], rec.name, { type: rec.type })); }
    const kind = fd.get('type');
    if (!files.length && !fd.get('notes').trim()) { out.innerHTML = '<p class="warn">Add an upload or notes.</p>'; return; }
    out.innerHTML = '<p class="muted">Reviewing… this can take up to a minute.</p>';
    e.target.querySelector('button').disabled = true;
    try {
      const hostedMode = (await mentorMode()) === 'hosted';
      const result = await askMentor({
        uploadType: kind,
        exerciseId: fd.get('exerciseId') || null,
        notes: fd.get('notes'),
        images: hostedMode ? undefined : await filesToImages(files),
        blobs: hostedMode ? await filesToBlobs(files) : undefined,
      });
      const body = { result };
      update((s) => s.aiLog.push({ id: uid('ai'), source: 'ai', type: kind, submissionId: sub?.id || null, exerciseId: fd.get('exerciseId') || null, date: today(), result: body.result }));
      // re-render shows history; show the newest result on top
      renderMentor(root, params);
      root.querySelector('#ai-out').innerHTML = `<h3>Feedback</h3>${aiSummary(body.result)}`;
    } catch (err) {
      out.innerHTML = `<p class="warn">Could not get feedback: ${esc(err.message)}</p>`;
      e.target.querySelector('button').disabled = false;
    }
  });
}
