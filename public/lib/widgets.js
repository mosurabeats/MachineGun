// Interactive teaching widgets. All are schematic: they illustrate
// relationships and are explicitly not setup guides or depth references.

import { CONFIGS, GAUGES } from '../data/needles.js';
import { SKIN_LAYERS } from '../data/skin.js';
import { esc } from './ui.js';

const WIDGETS = { 'stroke-sim': strokeSim, 'hand-speed': handSpeed, 'needle-compare': needleCompare, 'skin-diagram': skinDiagram };

export function mountWidgets(root) {
  root.querySelectorAll('[data-widget]').forEach((el) => {
    const w = WIDGETS[el.dataset.widget];
    if (w && !el.dataset.mounted) { el.dataset.mounted = '1'; w(el); }
  });
}

function slider(id, label, min, max, step, value, unit = '') {
  return `<label class="slider"><span>${esc(label)}: <output id="${id}-o">${value}${unit}</output></span>
    <input type="range" id="${id}" min="${min}" max="${max}" step="${step}" value="${value}"></label>`;
}

// ---------------------------------------------------------------- stroke
function strokeSim(el) {
  el.innerHTML = `
    <h4>Stroke, give & protrusion simulator</h4>
    <p class="warn small">Schematic only, not to scale. This does not show safe or correct depth, which depends on the person, the body site, your hand and angle, and is learned under supervision.</p>
    <div class="widget-grid">
      <svg viewBox="0 0 240 220" class="sim" aria-label="Needle stroke animation">
        <rect x="95" y="10" width="50" height="90" rx="6" class="sim-grip"/>
        <rect x="108" y="100" width="24" height="20" class="sim-tip"/>
        <line id="ss-needle" x1="120" y1="20" x2="120" y2="120" class="sim-needle"/>
        <rect x="0" y="150" width="240" height="18" class="layer-epi"/>
        <rect x="0" y="168" width="240" height="36" class="layer-derm"/>
        <rect x="0" y="204" width="240" height="16" class="layer-sub"/>
        <text x="4" y="162" class="sim-label">epidermis</text><text x="4" y="190" class="sim-label">dermis</text><text x="4" y="216" class="sim-label">fat</text>
        <line x1="0" y1="120" x2="240" y2="120" class="sim-ref"/><text x="150" y="117" class="sim-label">tip</text>
      </svg>
      <div>
        ${slider('ss-stroke', 'Stroke length', 1.8, 5, 0.1, 3.5, ' mm')}
        ${slider('ss-hang', 'Needle protrusion (hang)', 0, 4, 0.1, 1.5, ' mm')}
        ${slider('ss-give', 'Give (softness)', 0, 100, 1, 20, '%')}
        ${slider('ss-speed', 'Speed (relative)', 1, 10, 1, 4)}
        <label class="slider"><span>Distance from tip to skin: <output id="ss-gap-o">0 mm</output></span><input type="range" id="ss-gap" min="0" max="3" step="0.1" value="0"></label>
        <div id="ss-read" class="readout"></div>
      </div>
    </div>`;
  const $ = (id) => el.querySelector(`#${id}`);
  const ids = ['ss-stroke', 'ss-hang', 'ss-give', 'ss-speed', 'ss-gap'];
  const units = { 'ss-stroke': ' mm', 'ss-hang': ' mm', 'ss-give': '%', 'ss-speed': '', 'ss-gap': ' mm' };
  ids.forEach((id) => $(id).addEventListener('input', () => { $(`${id}-o`).textContent = $(id).value + units[id]; read(); }));
  const PX = 10; // px per mm, schematic
  const TIP_Y = 120;
  function vals() { return Object.fromEntries(ids.map((id) => [id.slice(3), Number($(id).value)])); }
  function read() {
    const v = vals();
    const maxBeyondTip = v.hang;
    const reach = Math.max(0, maxBeyondTip - v.gap);
    $('ss-read').innerHTML = `
      <p>At full extension the needle sits about <b>${maxBeyondTip.toFixed(1)} mm</b> beyond the tip. The stroke is how far it travels each cycle (<b>${v.stroke.toFixed(1)} mm</b>), so at rest it ${v.hang - v.stroke < 0 ? `retracts about <b>${(v.stroke - v.hang).toFixed(1)} mm inside</b> the tip` : `still extends ${(v.hang - v.stroke).toFixed(1)} mm beyond the tip`}.</p>
      <p>Schematic reach past the skin surface: <b>${reach.toFixed(1)} mm</b>${v.give > 0 ? `, softened by give, which lets the needle yield to resistance` : ''}. On real skin, effective depth also depends on angle, hand pressure, stretch and skin thickness.</p>
      <p class="muted small">${v.stroke >= 4 ? 'Longer strokes are commonly described as hitting harder and being less forgiving.' : v.stroke <= 2.5 ? 'Shorter strokes are commonly described as softer and suited to gentle shading.' : 'Mid-range strokes are commonly described as all-round settings.'} (Industry convention. Check your machine maker\'s guidance.)</p>`;
  }
  read();
  let t0 = performance.now();
  function frame(t) {
    if (!el.isConnected) return;
    const v = vals();
    const phase = ((t - t0) / 1000) * v.speed * 1.2 * Math.PI * 2;
    const ext = v.hang - v.stroke * (0.5 + 0.5 * Math.cos(phase)); // mm beyond tip
    const skinMM = v.gap;
    let y = ext;
    if (ext > skinMM) y = skinMM + (ext - skinMM) * (1 - v.give / 150); // give reduces travel under resistance
    $('ss-needle').setAttribute('y2', TIP_Y + y * PX);
    $('ss-needle').setAttribute('y1', 20 + y * PX);
    el.querySelectorAll('.layer-epi,.layer-derm,.layer-sub,.sim-label').forEach((n) => n.setAttribute('transform', `translate(0, ${skinMM * PX - 30})`));
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

// ---------------------------------------------------------------- hand speed
function handSpeed(el) {
  el.innerHTML = `
    <h4>Hand speed × machine speed</h4>
    <p class="small">Punctures per mm = machine cycles per second ÷ hand speed (mm/s). The dots show where each puncture lands along a 40 mm line for a liner of the chosen width.</p>
    ${slider('hs-hz', 'Machine speed', 40, 160, 5, 100, ' cycles/s')}
    ${slider('hs-hand', 'Hand speed', 2, 60, 1, 15, ' mm/s')}
    ${slider('hs-w', 'Liner group width', 0.3, 2.5, 0.1, 1.0, ' mm')}
    <svg viewBox="0 0 400 40" class="dots" id="hs-svg"></svg>
    <div id="hs-read" class="readout"></div>`;
  const $ = (id) => el.querySelector(`#${id}`);
  const units = { 'hs-hz': ' cycles/s', 'hs-hand': ' mm/s', 'hs-w': ' mm' };
  ['hs-hz', 'hs-hand', 'hs-w'].forEach((id) => $(id).addEventListener('input', () => { $(`${id}-o`).textContent = $(id).value + units[id]; draw(); }));
  function draw() {
    const hz = +$('hs-hz').value, hand = +$('hs-hand').value, w = +$('hs-w').value;
    const spacing = hand / hz; // mm between punctures
    const PX = 10;
    let dots = '';
    for (let x = 0; x <= 40; x += spacing) dots += `<circle cx="${x * PX}" cy="20" r="${(w / 2) * PX}" class="dot"/>`;
    $('hs-svg').innerHTML = dots;
    const overlap = w / spacing;
    $('hs-read').innerHTML = `<p>Spacing between punctures: <b>${spacing.toFixed(2)} mm</b>, so each spot is hit about <b>${overlap.toFixed(1)}×</b> per pass.</p>
      <p>${spacing > w ? '<b>Gaps:</b> punctures are farther apart than the needle group is wide, so the line will look dotted or skippy.' : overlap > 12 ? '<b>Heavy overlap:</b> each spot is hit many times in one pass. On skin, piling hits in one place adds trauma. How much is too much is learned under supervision.' : 'Continuous coverage.'}</p>
      <p class="muted small">The arithmetic is exact. Real lines also depend on depth, angle, ink load and skin.</p>`;
  }
  draw();
}

// ---------------------------------------------------------------- needles
function needleCompare(el) {
  const opt = (sel) => CONFIGS.map((c) => `<option value="${c.id}" ${c.id === sel ? 'selected' : ''}>${c.id} · ${esc(c.name)}</option>`).join('');
  const gopt = (sel) => GAUGES.map((g) => `<option value="${g.mm}" ${g.gauge === sel ? 'selected' : ''}>${g.gauge} (${g.mm} mm)</option>`).join('');
  const side = (k, cfg, g) => `<div class="nc-side">
      <select id="nc-c${k}">${opt(cfg)}</select><select id="nc-n${k}"></select><select id="nc-g${k}">${gopt(g)}</select>
      <svg viewBox="-12 -12 24 24" class="needle-svg" id="nc-s${k}"></svg><div id="nc-t${k}" class="small"></div></div>`;
  el.innerHTML = `<h4>Needle configuration comparison</h4>
    <p class="small">Top-down view of the needle points, to scale. Each view zooms to fit its group, so compare the size readout (group width) as well as the picture.</p>
    <div class="nc">${side(1, 'RL', '#12')}${side(2, 'CM', '#10')}</div>`;
  const $ = (id) => el.querySelector(`#${id}`);
  [1, 2].forEach((k) => {
    const fillCounts = () => {
      const c = CONFIGS.find((x) => x.id === $(`nc-c${k}`).value);
      $(`nc-n${k}`).innerHTML = c.counts.map((n) => `<option>${n}</option>`).join('');
      $(`nc-n${k}`).value = String(c.counts[Math.min(2, c.counts.length - 1)]);
    };
    $(`nc-c${k}`).addEventListener('change', () => { fillCounts(); draw(k); });
    $(`nc-n${k}`).addEventListener('change', () => draw(k));
    $(`nc-g${k}`).addEventListener('change', () => draw(k));
    fillCounts(); draw(k);
  });
  function draw(k) {
    const c = CONFIGS.find((x) => x.id === $(`nc-c${k}`).value);
    const n = +$(`nc-n${k}`).value;
    const d = +$(`nc-g${k}`).value;
    const S = 10; // scale: 1 mm -> 10 units
    const r = (d / 2) * S;
    const pos = layout(c.layout, n, d, c.tight);
    const ext = Math.max(2.4 * S / 2, ...pos.map(([x, y]) => Math.hypot(x, y) * S + r)) * 1.15;
    $(`nc-s${k}`).setAttribute('viewBox', `${-ext} ${-ext} ${ext * 2} ${ext * 2}`);
    $(`nc-s${k}`).innerHTML = pos.map(([x, y]) => `<circle cx="${x * S}" cy="${y * S}" r="${r}" class="pin"/>`).join('');
    const xs = pos.map(([x]) => x);
    const width = (Math.max(...xs) - Math.min(...xs) + d).toFixed(2);
    $(`nc-t${k}`).innerHTML = `<p><b>${n}${esc(c.id)}</b> (approx. ${width} mm wide): ${esc(c.use)}</p><p>${esc(c.skin)}</p><p class="muted">Common defects: ${esc(c.defects)}</p>`;
  }
}

function layout(kind, n, d, tight) {
  const pts = [];
  if (kind === 'round' || kind === 'roundshader') {
    if (n === 1) return [[0, 0]];
    const gap = kind === 'round' ? 1.0 : 1.35;
    const R = (d * gap) / (2 * Math.sin(Math.PI / Math.min(n, 9)));
    const outer = Math.min(n, n > 9 ? n - Math.floor(n / 3) : n);
    for (let i = 0; i < outer; i++) pts.push([R * Math.cos((2 * Math.PI * i) / outer), R * Math.sin((2 * Math.PI * i) / outer)]);
    const inner = n - outer;
    for (let i = 0; i < inner; i++) pts.push([R * 0.45 * Math.cos((2 * Math.PI * i) / inner), R * 0.45 * Math.sin((2 * Math.PI * i) / inner)]);
    return pts;
  }
  if (kind === 'flat') {
    for (let i = 0; i < n; i++) pts.push([(i - (n - 1) / 2) * d, 0]);
    return pts;
  }
  // magnums: two staggered rows
  const top = Math.ceil(n / 2), bottom = n - top;
  const step = d * (tight ? 1 : 1.05);
  for (let i = 0; i < top; i++) {
    const x = (i - (top - 1) / 2) * step;
    const curve = kind === 'curved' ? Math.pow(x / ((top * step) / 2 || 1), 2) * d * 0.9 : 0;
    pts.push([x, -d * 0.45 - curve]);
  }
  for (let i = 0; i < bottom; i++) {
    const x = (i - (bottom - 1) / 2) * step;
    const curve = kind === 'curved' ? Math.pow(x / ((top * step) / 2 || 1), 2) * d * 0.9 : 0;
    pts.push([x, d * 0.45 - curve]);
  }
  return pts;
}

// ---------------------------------------------------------------- skin
function skinDiagram(el) {
  el.innerHTML = `<h4>Skin layers</h4>
    <div class="widget-grid">
      <svg viewBox="0 0 220 160" class="skin-svg" role="img" aria-label="Cross-section of skin">
        <rect data-l="epi" x="0" y="10" width="220" height="22" class="layer-epi hot"/>
        <rect data-l="derm" x="0" y="32" width="220" height="70" class="layer-derm hot"/>
        <rect data-l="sub" x="0" y="102" width="220" height="50" class="layer-sub hot"/>
        <g class="pigment">${Array.from({ length: 18 }, (_, i) => `<circle cx="${30 + i * 9}" cy="${50 + (i % 3) * 6}" r="2.2"/>`).join('')}</g>
        <text x="150" y="25" class="sim-label">epidermis</text><text x="150" y="70" class="sim-label">dermis (pigment)</text><text x="150" y="130" class="sim-label">fat</text>
      </svg>
      <div id="skin-info" class="readout"><p>Select a layer.</p></div>
    </div>
    <p class="muted small">Schematic proportions. Real thickness varies by body site and person.</p>`;
  el.querySelectorAll('[data-l]').forEach((r) => r.addEventListener('click', () => {
    const L = SKIN_LAYERS.find((x) => x.id === r.dataset.l);
    el.querySelector('#skin-info').innerHTML = `<h5>${esc(L.name)}</h5><p><b>Typical thickness:</b> ${esc(L.range)}</p><p>${esc(L.desc)}</p>`;
  }));
}
