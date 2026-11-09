// The Workshop: drawing, design and traditional tattoo art curriculum.
// Each unit: lessons (instruction), exercises (with ids for completion tracking),
// critique (criteria for self/mentor/AI review).

export const WORKSHOP = [
  {
    id: 'ws.line', title: '1. Line confidence',
    lessons: [
      'Tattoo lines are pulled in single committed strokes, so your drawing practice should train the same habit. Draw from the shoulder and elbow for long lines and from the wrist only for short ones. Ghost the stroke (move above the paper without touching), then commit. Do not sketch with hairy, repeated strokes in your final linework.',
      'Line quality has three parts: accuracy (it goes where intended), consistency (even weight), and confidence (smooth, with no wobble). Train all three daily. Ten to twenty minutes a day beats one long session a week.',
    ],
    exercises: [
      { id: 'ws.line.1', t: 'A page of straight lines between dot pairs (40 lines).' },
      { id: 'ws.line.2', t: 'A page of ellipses at different angles and sizes (30 ellipses).' },
      { id: 'ws.line.3', t: 'A page of S-curves and spirals.' },
      { id: 'ws.line.4', t: 'Ink a pencil rough in single strokes, with no corrections.' },
      { id: 'ws.line.5', t: '14-day streak: one line page per day.' },
    ],
    critique: ['Lines hit their targets', 'No hairy or repeated strokes', 'Consistent weight', 'Smooth curves'],
  },
  {
    id: 'ws.shape', title: '2. Shape, silhouette and readability',
    lessons: [
      'A tattoo must read at a distance, which means first of all through its silhouette. Fill your design in solid black on tracing paper. If you cannot tell what it is, the design will not read on skin at a glance. Strong traditional motifs have instantly recognisable silhouettes.',
      'Simplify. Every element should earn its place. Small fussy shapes become noise in skin.',
    ],
    exercises: [
      { id: 'ws.shape.1', t: 'Silhouette test: black-fill 10 of your designs and rate how well each reads.' },
      { id: 'ws.shape.2', t: 'Redesign the 3 weakest silhouettes.' },
      { id: 'ws.shape.3', t: 'Thumbnails: 20 tiny (3 cm) versions of one motif.' },
    ],
    critique: ['Silhouette readable at thumbnail size', 'No unnecessary small shapes'],
  },
  {
    id: 'ws.form', title: '3. Form, value and light',
    lessons: [
      'Form is how a shape appears three-dimensional. It comes from value: light, mid-tone, shadow, reflected light and cast shadow. Pick one light source and stay consistent. Traditional tattooing usually simplifies this to black shading on one side.',
      'Value scales train your eye and hand. A 5-step scale is the working range for most tattoo shading, and a 9-step scale refines your control.',
    ],
    exercises: [
      { id: 'ws.form.1', t: '5-step and 9-step value scales in pencil.' },
      { id: 'ws.form.2', t: 'Shade a sphere, a cylinder, a cube and a cone with one light source.' },
      { id: 'ws.form.3', t: 'Shade a rose leaf, a petal and a skull in traditional whip-shading style on paper.' },
    ],
    critique: ['Consistent light source', 'Distinct values', 'Form reads as 3D'],
  },
  {
    id: 'ws.trad', title: '4. Traditional motifs',
    lessons: [
      'The Western traditional vocabulary includes roses, daggers, swallows, panthers, eagles, snakes, skulls, ships, anchors, hearts, banners, women\'s heads, tigers and lettering. Each motif has conventions that make it read: the swallow\'s forked tail, the panther\'s clawing pose, the dagger\'s point through skin or a rose.',
      'Learn by copying historical flash (for study, not for selling as your own), then by designing your own versions within the conventions. Credit the source artists when you share studies.',
    ],
    exercises: [
      { id: 'ws.trad.1', t: 'Copy 10 historical flash motifs carefully. Note the source of each.' },
      { id: 'ws.trad.2', t: 'Design your own version of each of 5 motifs.' },
      { id: 'ws.trad.3', t: 'Combine 2 motifs into one design (for example, a dagger and a rose).' },
    ],
    critique: ['Motif conventions respected', 'Bold, readable', 'Your own voice visible in original designs'],
  },
  {
    id: 'ws.color', title: '5. Color for tattooing',
    lessons: [
      'Paint flash with the palette you will tattoo. Limit yourself: black plus 3–5 colors. Check value contrast by photographing your painting in greyscale. Color areas that disappear in greyscale will blur on skin.',
      'Paint flat color with black shading first, which is classic traditional practice. Then explore blends.',
    ],
    exercises: [
      { id: 'ws.color.1', t: 'Palette swatch card of your tattoo colors.' },
      { id: 'ws.color.2', t: 'Paint 3 designs in a limited palette and run the greyscale check on each.' },
    ],
    critique: ['Limited palette', 'Passes the greyscale check'],
  },
  {
    id: 'ws.lettering', title: '6. Lettering and banners',
    lessons: [
      'Tattoo lettering has to stay legible for decades. Leave enough space inside letters (counters) and between letters so they do not close up. Classic tattoo scripts and block letters come from sign-painting traditions. Learn one script and one block alphabet thoroughly.',
      'Banners: plan the ribbon\'s fold logic, keep the text area flat and readable, and check spelling three times. Get the client\'s written approval of spelling.',
    ],
    exercises: [
      { id: 'ws.lettering.1', t: 'Full script alphabet, upper and lower case.' },
      { id: 'ws.lettering.2', t: 'Full block alphabet.' },
      { id: 'ws.lettering.3', t: '5 banners with names, at 3 sizes. Mark the minimum legible size.' },
    ],
    critique: ['Consistent letter heights and slant', 'Open counters', 'Banner folds make sense'],
  },
  {
    id: 'ws.tattooable', title: '7. Designing to be tattooed',
    lessons: [
      'A tattoo design is a technical drawing for a procedure. Draw it at actual size. Mark the line weights you intend (for example, outline 9RL, details 5RL). Check every gap: will it stay open with the liners you have chosen? Check that every fill area can be packed with a reasonable grouping.',
      'Design for the body part. Measure the client\'s placement area and design to fit and flow with it.',
    ],
    exercises: [
      { id: 'ws.tattooable.1', t: 'Convert a detailed painting into a tattoo-ready design (see technique track tr.flash).' },
      { id: 'ws.tattooable.2', t: 'Draw one design at 5, 10 and 15 cm and choose the minimum size.' },
      { id: 'ws.tattooable.3', t: 'Annotate a design with needle choices for each area.' },
    ],
    critique: ['Drawn at actual size', 'Gaps wide enough for the chosen liners', 'Needle plan is realistic'],
  },
  {
    id: 'ws.flash', title: '8. Flash sheets',
    lessons: [
      'A flash sheet is a set of finished, ready-to-tattoo designs, traditionally painted and displayed in shops. Composition matters: vary the sizes, balance color across the sheet, and include a mix of quick small pieces and larger feature designs.',
    ],
    exercises: [
      { id: 'ws.flash.1', t: 'Plan a sheet of 8–12 designs in thumbnails.' },
      { id: 'ws.flash.2', t: 'Line the full sheet.' },
      { id: 'ws.flash.3', t: 'Paint the full sheet. Have your mentor critique it.' },
    ],
    critique: ['Every design tattooable as painted', 'Balanced sheet composition', 'Consistent quality across designs'],
  },
  {
    id: 'ws.stencil', title: '9. Stencil preparation',
    lessons: [
      'Stencils transfer the line drawing to the skin. Thermal and hectograph stencils are common. Prepare a clean, single-weight line drawing. Shading is usually indicated minimally or not at all. Mirror the image if your method requires it. Mark the orientation and centre lines for placement.',
    ],
    exercises: [
      { id: 'ws.stencil.1', t: 'Make clean stencil line drawings of 5 designs.' },
      { id: 'ws.stencil.2', t: 'Transfer them to practice skin and photograph the transfers for clarity.' },
    ],
    critique: ['Clean, single-weight lines', 'Correct orientation', 'Clear transfer'],
  },
];
