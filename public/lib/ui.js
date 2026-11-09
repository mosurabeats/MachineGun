import { EVIDENCE } from '../data/evidence.js';
import { getState, update, fileURL } from './store.js';
import { scoreQuiz } from './logic.js';
import { diagram } from './diagrams.js';
import { resourcesFor } from '../data/resources.js';
import { MACHINES_DEEP } from '../data/deep/machines.js';
import { NEEDLES_DEEP, SKIN_DEEP } from '../data/deep/needles-skin.js';

export const DEEP = { ...MACHINES_DEEP, ...NEEDLES_DEEP, ...SKIN_DEEP };

export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export const today = () => new Date().toISOString().slice(0, 10);

export function tag(code) {
  const e = EVIDENCE[code];
  if (!e) return '';
  return `<span class="tag tag-${code}" title="${esc(e.desc)}">${esc(e.label)}</span>`;
}

export function evidenceLegend() {
  return `<div class="legend">${Object.keys(EVIDENCE).map((k) => tag(k)).join(' ')}
    <span class="muted small">Every claim is tagged so you can tell science, law, shop convention and opinion apart.</span></div>`;
}

/** Render a lesson (sections + key points + quiz). Interactive widgets are mounted by id. */
export function lessonHTML(lesson) {
  const st = getState();
  const q = st.quiz[lesson.id];
  return `
  <article class="lesson" id="${esc(lesson.id)}">
    <header><h3>${esc(lesson.title)}</h3><p class="lede">${esc(lesson.summary)}</p></header>
    ${(lesson.sections || []).map((s) => `
      <section><h4>${esc(s.h)} ${tag(s.tag)}</h4>${s.p.map((p) => `<p>${esc(p)}</p>`).join('')}</section>`).join('')}
    ${deepHTML(lesson)}
    ${lesson.interactive ? `<div class="widget" data-widget="${esc(lesson.interactive)}"></div>` : ''}
    ${lesson.keyPoints?.length ? `<div class="keypoints"><strong>Key points</strong><ul>${lesson.keyPoints.map((k) => `<li>${esc(k)}</li>`).join('')}</ul></div>` : ''}
    ${lesson.quiz?.length ? quizHTML(lesson) : ''}
    ${q ? `<p class="muted small">Last knowledge check: ${q.pct}% on ${esc(q.date)}</p>` : ''}
  </article>`;
}

const STATUS = { checked: 'checked', known: 'established', lead: 'lead' };
/** Render a list of learning resources with status badges and links. */
export function resourceList(list) {
  return `<ul class="res">${list.map((r) => `<li>${r.url ? `<a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.title)}</a>` : `<b>${esc(r.title)}</b>`} <span class="badge rs-${r.status}">${STATUS[r.status] || r.status}</span><br><span class="small">${esc(r.note)}</span></li>`).join('')}</ul>`;
}

function deepHTML(lesson) {
  const d = DEEP[lesson.id];
  if (!d) return '';
  return `
    ${d.diagram ? diagram(d.diagram) : ''}
    ${(d.sections || []).map((s) => `<section><h4>${esc(s.h)} ${tag(s.tag)}</h4>${s.p.map((p) => `<p>${esc(p)}</p>`).join('')}</section>`).join('')}
    ${(d.examples || []).map((e) => `<div class="example"><strong>${esc(e.t)}</strong><p>${esc(e.p)}</p></div>`).join('')}
    ${d.mistakes?.length ? `<h4>Common mistakes</h4><table class="tbl"><thead><tr><th>Mistake</th><th>Why it matters</th><th>Fix</th></tr></thead><tbody>${d.mistakes.map((m) => `<tr><td>${esc(m.m)}</td><td>${esc(m.why)}</td><td>${esc(m.fix)}</td></tr>`).join('')}</tbody></table>` : ''}
    ${d.drills?.length ? `<div class="drills"><strong>Drills</strong><ol>${d.drills.map((x) => `<li>${esc(x)}</li>`).join('')}</ol></div>` : ''}
    ${resourcesFor(lesson.id).length ? `<div class="drills"><strong>Study with</strong>${resourceList(resourcesFor(lesson.id))}</div>` : ''}`;
}

function quizHTML(lesson) {
  return `<form class="quiz" data-quiz="${esc(lesson.id)}">
    <strong>Knowledge check</strong>
    ${lesson.quiz.map((q, i) => `
      <fieldset><legend>${esc(q.q)}</legend>
        ${q.options.map((o, j) => `<label><input type="radio" name="q${i}" value="${j}" required> ${esc(o)}</label>`).join('')}
        <div class="explain" hidden></div>
      </fieldset>`).join('')}
    <button type="submit">Check answers</button> <span class="quiz-result"></span>
  </form>`;
}

/** Wire up any quizzes inside root. `lessons` is a lookup of lessonId -> lesson. */
export function bindQuizzes(root, lessons) {
  root.querySelectorAll('form[data-quiz]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const lesson = lessons[form.dataset.quiz];
      const answers = lesson.quiz.map((_, i) => Number(new FormData(form).get(`q${i}`)));
      const r = scoreQuiz(lesson.quiz, answers);
      form.querySelectorAll('fieldset').forEach((fs, i) => {
        const ex = fs.querySelector('.explain');
        ex.hidden = false;
        ex.className = `explain ${r.detail[i].ok ? 'ok' : 'bad'}`;
        ex.textContent = `${r.detail[i].ok ? 'Correct.' : 'Not quite.'} ${r.detail[i].explain}`;
      });
      form.querySelector('.quiz-result').textContent = `${r.correct}/${r.total}`;
      update((s) => { s.quiz[lesson.id] = { pct: r.pct, date: today() }; });
    });
  });
}

export async function hydrateThumbs(root) {
  for (const el of root.querySelectorAll('[data-file]')) {
    const f = await fileURL(el.dataset.file);
    if (!f) { el.textContent = 'missing file'; continue; }
    if (f.type.startsWith('video/')) el.innerHTML = `<video src="${f.url}" controls preload="metadata"></video>`;
    else el.innerHTML = `<img src="${f.url}" alt="${esc(f.name)}">`;
  }
}

export function thumbs(fileIds = []) {
  return `<div class="thumbs">${fileIds.map((id) => `<div class="thumb" data-file="${esc(id)}"></div>`).join('')}</div>`;
}

/** Read image files (and frames sampled from videos) as base64 for the AI Mentor. */
export async function filesToImages(files, maxImages = 6) {
  const out = [];
  for (const f of files) {
    if (out.length >= maxImages) break;
    if (f.type.startsWith('image/')) out.push(await imageToJpeg(f));
    else if (f.type.startsWith('video/')) out.push(...(await videoFrames(f, Math.min(3, maxImages - out.length))));
  }
  return out;
}

/** Image Blobs for the hosted AI Mentor: images as-is when accepted, others and video frames as JPEG. */
export async function filesToBlobs(files, maxImages = 6) {
  const OK = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  const toBlob = (img) => {
    const bin = atob(img.data);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new File([bytes], img.label || 'frame.jpg', { type: img.media_type });
  };
  const out = [];
  for (const f of files) {
    if (out.length >= maxImages) break;
    if (OK.includes(f.type)) out.push(f);
    else if (f.type.startsWith('image/')) out.push(toBlob(await imageToJpeg(f)));
    else if (f.type.startsWith('video/')) out.push(...(await videoFrames(f, Math.min(3, maxImages - out.length))).map(toBlob));
  }
  return out;
}

async function imageToJpeg(file, maxDim = 1568) {
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, maxDim / Math.max(bmp.width, bmp.height));
  const c = document.createElement('canvas');
  c.width = Math.round(bmp.width * scale);
  c.height = Math.round(bmp.height * scale);
  c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height);
  return { media_type: 'image/jpeg', data: c.toDataURL('image/jpeg', 0.85).split(',')[1], label: file.name };
}

async function videoFrames(file, n) {
  const url = URL.createObjectURL(file);
  const v = document.createElement('video');
  v.src = url; v.muted = true; v.preload = 'auto';
  await new Promise((res, rej) => { v.onloadeddata = res; v.onerror = rej; });
  const frames = [];
  for (let i = 1; i <= n; i++) {
    v.currentTime = (v.duration * i) / (n + 1);
    await new Promise((res) => { v.onseeked = res; });
    const scale = Math.min(1, 1568 / Math.max(v.videoWidth, v.videoHeight));
    const c = document.createElement('canvas');
    c.width = Math.round(v.videoWidth * scale);
    c.height = Math.round(v.videoHeight * scale);
    c.getContext('2d').drawImage(v, 0, 0, c.width, c.height);
    frames.push({ media_type: 'image/jpeg', data: c.toDataURL('image/jpeg', 0.85).split(',')[1], label: `${file.name} frame ${i}/${n} at ${v.currentTime.toFixed(1)}s` });
  }
  URL.revokeObjectURL(url);
  return frames;
}
