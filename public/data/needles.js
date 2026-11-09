// Needle Reference Library. Diameters use the common gauge-to-mm convention;
// taper names and lengths vary by manufacturer, so always read the box.

export const GAUGES = [
  { gauge: '#6', mm: 0.20, note: 'Very fine, sometimes sold as "bugpin" or "super bugpin". Fine detail, delicate soft shading.' },
  { gauge: '#8', mm: 0.25, note: 'Fine ("bugpin"). Smoother soft shading, finer lines.' },
  { gauge: '#10', mm: 0.30, note: 'Middle ground used for many liners and shaders.' },
  { gauge: '#12', mm: 0.35, note: 'Standard. Holds more ink and is common for bold lining and packing.' },
];

export const TAPERS = [
  { id: 'st', name: 'Short taper (ST)', note: 'Wider point, which puts more of the needle into the skin at a given depth. Commonly associated with bold lines and packing.', tag: 'ind' },
  { id: 'lt', name: 'Long taper (LT)', note: 'Narrower point. Commonly associated with finer lines and softer gradients.', tag: 'ind' },
  { id: 'xlt', name: 'Extra-long taper (XLT)', note: 'Very fine point, used for very soft shading and fine work.', tag: 'ind' },
];

// layout: 'round' (circle), 'flat' (single row), 'mag' (two staggered rows),
// 'curved' (staggered, curved ends), 'roundshader' (loose circle)
export const CONFIGS = [
  {
    id: 'RL', name: 'Round liner', layout: 'round', tight: true, counts: [1, 3, 5, 7, 9, 11, 14, 18],
    use: 'Lines and fine detail. The tightly soldered circle concentrates the points so they act like one line.',
    skin: 'Creates a single channel per pass. Line weight depends on grouping size, hand speed and depth.',
    defects: 'Inconsistent hand speed gives uneven weight. Overworking the same line widens and traumatises it.',
  },
  {
    id: 'RS', name: 'Round shader', layout: 'roundshader', tight: false, counts: [3, 5, 7, 9, 11, 14],
    use: 'Small shading areas, softer and fuzzier lines, small fills.',
    skin: 'Looser spacing gives a softer edge than a liner of the same count.',
    defects: 'Asked to line cleanly, it gives a soft or fuzzy edge.',
  },
  {
    id: 'F', name: 'Flat', layout: 'flat', tight: true, counts: [5, 7, 9, 11, 13, 15],
    use: 'Single row. Geometric fills, crisp edges and some shading styles.',
    skin: 'A hard leading edge. Easier to cut skin if dragged on its side.',
    defects: 'Hard edges show any inconsistency in the angle.',
  },
  {
    id: 'M1', name: 'Magnum (weaved / stacked)', layout: 'mag', tight: false, counts: [5, 7, 9, 11, 13, 15, 17, 19, 23, 27, 31],
    use: 'Shading, black packing and color fill over larger areas.',
    skin: 'Two staggered rows spread the points, covering more skin per pass.',
    defects: 'Driving the corners into the skin at an angle can cause trauma at the edges. Patchiness comes from inconsistent motion.',
  },
  {
    id: 'CM', name: 'Curved magnum (soft-edge, "RM")', layout: 'curved', tight: false, counts: [7, 9, 11, 13, 15, 17, 19, 23, 27, 31],
    use: 'Smooth blending, soft gradients, color fill. The curved ends reduce hard edges.',
    skin: 'The center points sit slightly lower than the ends, softening the edges of each pass.',
    defects: 'Still overworks skin if passes are repeated too much.',
  },
];

export const NEEDLE_LESSONS = [
  {
    id: 'ndl.anatomy',
    title: 'Needle anatomy: diameter, taper and grouping density',
    summary: 'The three dimensions of every needle and what each changes.',
    interactive: 'needle-compare',
    sections: [
      { h: 'Diameter', tag: 'ind', p: [
        'Gauge numbers map to needle diameters: #12 is about 0.35 mm, #10 about 0.30 mm, #8 about 0.25 mm. Thicker needles carry more ink and leave larger channels. Thinner needles leave smaller channels and are often chosen for soft gradients.',
      ]},
      { h: 'Taper', tag: 'ind', p: [
        'Taper is how gradually the point narrows. Manufacturers name and measure tapers differently, so compare within one brand.',
      ]},
      { h: 'Grouping density', tag: 'ind', p: [
        '"Tight" groupings are soldered close together and act as a single unit, as in liners. "Loose" or "textured" groupings are spaced out for softer coverage.',
      ]},
    ],
    keyPoints: ['Diameter, taper and grouping density each change the result.', 'Compare tapers within one brand. Naming is not standardised.'],
    quiz: [
      { q: 'A #12 needle is approximately…', options: ['0.20 mm', '0.25 mm', '0.30 mm', '0.35 mm'], answer: 3, explain: '#12 is about 0.35 mm, which is common for bold lining and packing.' },
      { q: 'Which configuration is designed to soften the edges of each pass?', options: ['Round liner', 'Flat', 'Curved magnum', 'Tight round liner'], answer: 2, explain: 'The curved end profile of a curved magnum softens edges.' },
    ],
  },
  {
    id: 'ndl.cartridge-vs-bar',
    title: 'Cartridges versus traditional needle bars',
    summary: 'Compatibility, contamination control and handling differences.',
    sections: [
      { h: 'Traditional needle bars', tag: 'ind', p: [
        'Needles are soldered to a bar that hooks onto the armature (coil) or drive pin and runs through a tube. They are used with rubber bands or grommets on coils. Pre-sterilised single-use bars and tubes are standard. Reusable steel tubes require validated sterilisation.',
      ]},
      { h: 'Cartridges', tag: 'ind', p: [
        'Self-contained single-use units that click into a cartridge grip or pen. Many contain a membrane meant to stop ink and fluids flowing back into the machine. Cartridges are widely but not universally interchangeable, so check the machine maker\'s compatibility list.',
      ]},
      { h: 'Safety', tag: 'reg', p: [
        'All needles are single-use sharps and go into an approved sharps container after the procedure. Never reuse a needle or cartridge between clients, and never recap by hand.',
      ]},
    ],
    keyPoints: ['Check compatibility between cartridge and machine.', 'Every needle is single-use and goes in a sharps container.'],
    quiz: [
      { q: 'What should happen to a used cartridge?', options: ['Rinse and reuse on the same client next session', 'Dispose of it in an approved sharps container', 'Autoclave and reuse', 'Put it in regular trash'], answer: 1, explain: 'Needles are single-use sharps.' },
    ],
  },
  {
    id: 'ndl.selection',
    title: 'Choosing a needle for the objective',
    summary: 'Match the needle to the goal: line, pack, blend or soften. Mentors vary in what they prefer.',
    sections: [
      { h: 'Starting points', tag: 'ind', p: [
        'Bold traditional outlines are commonly done with a larger round liner (for example 7–14RL in #12). Fine detail calls for a smaller liner. Solid black packing calls for a magnum, or a large round shader or liner for small areas. Soft gradients call for a curved magnum, often in a finer gauge.',
        'These are common starting points. Your mentor and shop will have preferences, and so will you as your hand develops.',
      ]},
      { h: 'Causes of inconsistent lines and saturation', tag: 'ind', p: [
        'Before blaming the needle, check hand speed, angle, ink load, machine speed under load and stretch. A needle problem is more likely if a fresh needle fixes it immediately, or if inspection shows bent or barbed points.',
      ]},
    ],
    keyPoints: ['Select by objective, then tune with your mentor.', 'Rule out technique before blaming the needle.'],
    quiz: [],
  },
];
