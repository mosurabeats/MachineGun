// Labelled schematic diagrams (inline SVG). Schematic, not to scale unless stated.

const T = (x, y, s, a = 'start') => `<text x="${x}" y="${y}" text-anchor="${a}" class="dg-t">${s}</text>`;
const L = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="dg-l"/>`;
const wrap = (vb, body, cap) => `<figure class="diagram"><svg viewBox="${vb}" role="img" aria-label="${cap}">${body}</svg><figcaption>${cap}</figcaption></figure>`;

export const DIAGRAMS = {
  coil: () => wrap('0 0 420 260', `
    <rect x="60" y="150" width="200" height="16" class="dg-metal"/>
    <rect x="70" y="60" width="16" height="96" class="dg-metal"/>
    <rect x="110" y="96" width="34" height="56" rx="6" class="dg-coil"/><rect x="152" y="96" width="34" height="56" rx="6" class="dg-coil"/>
    <rect x="100" y="80" width="100" height="10" class="dg-arm"/>
    <path d="M200 85 C230 80 240 70 250 60" class="dg-spring"/>
    <path d="M100 82 C 90 70 86 64 86 60" class="dg-spring"/>
    <rect x="200" y="40" width="10" height="44" class="dg-metal"/>
    <circle cx="205" cy="86" r="4" class="dg-contact"/>
    <rect x="230" y="40" width="8" height="40" class="dg-metal"/>
    <line x1="235" y1="85" x2="235" y2="240" class="dg-needle"/>
    <rect x="225" y="170" width="20" height="60" class="dg-tube"/>
    ${T(10, 100, 'Frame')}${L(40, 98, 70, 98)}
    ${T(110, 182, 'Coils (front & rear)')}${L(140, 172, 140, 152)}
    ${T(100, 30, 'Rear spring')}${L(120, 33, 92, 66)}
    ${T(150, 20, 'Front spring')}${L(180, 24, 222, 74)}
    ${T(290, 50, 'Contact screw')}${L(288, 47, 210, 50)}
    ${T(290, 92, 'Contact point')}${L(288, 89, 210, 86)}
    ${T(10, 76, 'Armature bar')}${L(70, 74, 100, 84)}
    ${T(290, 135, 'Needle bar')}${L(288, 132, 236, 132)}
    ${T(290, 200, 'Tube / grip')}${L(288, 197, 246, 197)}
    ${T(290, 240, 'Needle tip')}${L(288, 237, 238, 237)}
  `, 'Coil machine anatomy (schematic). Current path: front spring → contact screw → coils. The armature pulls down, the contact opens, the springs return it.'),

  rotary: () => wrap('0 0 420 240', `
    <rect x="40" y="30" width="80" height="60" rx="8" class="dg-coil"/>
    <circle cx="160" cy="60" r="26" class="dg-metal"/>
    <circle cx="170" cy="60" r="6" class="dg-contact"/>
    <line x1="120" y1="60" x2="134" y2="60" class="dg-l"/>
    <rect x="164" y="64" width="12" height="70" class="dg-arm"/>
    <line x1="170" y1="134" x2="170" y2="226" class="dg-needle"/>
    <rect x="158" y="150" width="24" height="60" class="dg-tube"/>
    <path d="M150 30 A 26 26 0 0 1 186 40" class="dg-arrow" marker-end="url(#ah)"/>
    <defs><marker id="ah" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="dg-ah"/></marker></defs>
    ${T(40, 110, 'DC motor')}
    ${T(220, 40, 'Cam / eccentric')}${L(218, 37, 182, 52)}
    ${T(220, 64, 'Offset = ½ stroke')}${L(218, 61, 176, 60)}
    ${T(220, 104, 'Drive pin / linkage')}${L(218, 101, 177, 100)}
    ${T(220, 180, 'Grip / cartridge')}${L(218, 177, 182, 177)}
    ${T(220, 222, 'Needle')}${L(218, 219, 172, 219)}
  `, 'Rotary mechanism (schematic). The eccentric offset turns rotation into up-and-down motion. Total stroke is twice the offset.'),

  needle: () => wrap('0 0 420 200', `
    <rect x="30" y="80" width="240" height="14" class="dg-metal"/>
    <path d="M270 80 L360 87 L270 94 Z" class="dg-metal"/>
    <line x1="270" y1="110" x2="360" y2="110" class="dg-l"/>
    ${T(315, 126, 'Taper length', 'middle')}
    <line x1="22" y1="80" x2="22" y2="94" class="dg-l"/>${T(16, 72, 'Diameter (gauge)')}
    <path d="M300 150 L390 154 L300 158 Z" class="dg-metal"/>${T(300, 175, 'Long taper: finer point')}
    <path d="M300 30 L340 34 L300 38 Z" class="dg-metal"/>${T(300, 22, 'Short taper: blunter point')}
    ${T(30, 140, '#12 ≈ 0.35 mm · #10 ≈ 0.30 mm · #8 ≈ 0.25 mm')}
  `, 'Single needle geometry. Taper names and lengths vary by manufacturer.'),

  skinSites: () => {
    const sites = [['Eyelid', 1], ['Inner arm', 2], ['Ribs / side', 2], ['Neck', 2], ['Top of foot', 2], ['Forearm (outer)', 3], ['Calf', 3], ['Upper arm (outer)', 3], ['Chest', 3], ['Thigh (outer)', 4], ['Back', 5], ['Palm / sole', 5]];
    return wrap('0 0 420 300', sites.map(([n, v], i) => `${T(10, 24 + i * 23, n)}<rect x="140" y="${12 + i * 23}" width="${v * 50}" height="14" class="dg-bar dg-bar${v}"/>`).join('') +
      T(140, 296, 'relative skin thickness (thin → thick), approximate'),
      'Relative skin thickness by body site. Approximate and highly variable between people. Thin sites are more vulnerable to blowouts.');
  },

  stretch: () => wrap('0 0 420 220', `
    <rect x="20" y="70" width="380" height="80" rx="10" class="dg-skin"/>
    <path d="M60 110 L180 110" class="dg-arrow" marker-end="url(#ah2)"/>
    <path d="M240 110 L360 110" class="dg-arrow" marker-start="url(#ah2r)"/>
    <defs><marker id="ah2" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="dg-ah"/></marker>
    <marker id="ah2r" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M10 0 L0 5 L10 10 z" class="dg-ah"/></marker></defs>
    <circle cx="210" cy="110" r="6" class="dg-contact"/>
    ${T(210, 60, 'Needle works between the stretch points', 'middle')}
    ${T(60, 170, 'Non-dominant hand: thumb / fingers spread skin')}${T(60, 188, 'Brace: pinky or heel of working hand on skin')}
    ${T(60, 206, 'Pull lines toward you; reposition stretch as you go')}
  `, 'Three-point stretch (schematic): skin held flat and taut in front of the needle without distorting the stencil.'),

  angle: () => wrap('0 0 420 200', `
    <line x1="20" y1="160" x2="400" y2="160" class="dg-l"/>
    <line x1="120" y1="160" x2="200" y2="40" class="dg-needle"/>
    <path d="M150 160 A 30 30 0 0 0 137 135" class="dg-l"/>${T(158, 150, '≈45–60°')}
    <line x1="300" y1="160" x2="300" y2="40" class="dg-needle"/>${T(310, 100, '≈90° (some packing/shading)')}
    ${T(20, 190, 'Lining: tip riding the skin, pulled toward you. Commonly taught angles, not rules.')}
  `, 'Machine angle relative to the skin (industry convention).'),

  field: () => wrap('0 0 420 220', `
    <rect x="10" y="20" width="190" height="180" class="dg-clean"/>${T(105, 40, 'CLEAN FIELD', 'middle')}
    <rect x="220" y="20" width="190" height="180" class="dg-dirty"/>${T(315, 40, 'CONTAMINATED', 'middle')}
    ${T(20, 70, '• Barrier-covered tray')}${T(20, 90, '• Ink caps, ointment portions')}${T(20, 110, '• Unopened needles')}${T(20, 130, '• Bagged machine & cord')}
    ${T(230, 70, '• Used wipes, caps')}${T(230, 90, '• Sharps container')}${T(230, 110, '• Biohazard bin')}${T(230, 130, '• Phone, pens, drawers ✗')}
    ${T(210, 190, 'Gloves change whenever you cross from right to left', 'middle')}
  `, 'Clean vs contaminated field. Plan the layout before the session.'),

  healing: () => wrap('0 0 420 160', `
    <rect x="20" y="60" width="70" height="30" class="dg-bar dg-bar1"/><rect x="90" y="60" width="140" height="30" class="dg-bar dg-bar3"/><rect x="230" y="60" width="170" height="30" class="dg-bar dg-bar5"/>
    ${T(55, 50, 'Inflammation', 'middle')}${T(160, 50, 'Proliferation', 'middle')}${T(315, 50, 'Remodelling', 'middle')}
    ${T(20, 110, 'Days 0–3')}${T(90, 110, '~Days 3 – weeks 3/4')}${T(230, 110, 'Weeks → months')}
    ${T(20, 140, 'Redness, plasma, swelling → flaking, itch → surface healed, deeper tissue still maturing')}
  `, 'Wound-healing phases (overlapping; timing varies by person, size and site).'),
};

export const diagram = (id) => (DIAGRAMS[id] ? DIAGRAMS[id]() : '');
