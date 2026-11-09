// Learning resources. `status`:
//   'checked' : found and confirmed during research (Nov 2026)
//   'known'   : long-established, widely cited title or site; not re-checked for this release
//   'lead'    : seen only in secondary listings; confirm it exists and is any good before paying
// `for` lists LINEAGE units/pages the resource supports, so it can be shown in context.
// Links to YouTube searches are used where a channel was found but its exact URL wasn't confirmed.

const yt = (q) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;

export const RESOURCE_KINDS = [
  ['course', 'Courses & platforms'],
  ['video', 'Video channels'],
  ['drawing', 'Drawing, color & lettering'],
  ['flash', 'Flash & tattoo history'],
  ['book', 'Technique books'],
  ['machines', 'Machines & equipment'],
  ['safety', 'Skin, hygiene & safety knowledge'],
  ['community', 'Community'],
];

export const RESOURCES = [
  // ------------------------------------------------------------ courses
  { id: 'tattooing101', kind: 'course', status: 'checked', title: 'Tattooing 101: Artist Accelerator and other courses', url: 'https://elitetattoopro.teachable.com/',
    note: 'Paid, self-paced courses: the Artist Accelerator (history, terminology, sanitation, lining, shading, color), a 30-day flash challenge and a realism course. Structured and beginner-friendly, but marketing-heavy. Best used as a second explanation of what LINEAGE teaches.',
    for: ['trk.lining', 'trk.bng', 'trk.color', 'ws.flash'] },
  { id: 'fireside', kind: 'course', status: 'checked', title: 'Fireside Tattoo Network (Jake Meeks)', url: 'https://tattoonow.com/tattoo-news/inside-fireside-events~30988',
    note: 'Founded by Jake Meeks (about 30 years tattooing). Fireside Foundations covers the design method and drawing for the body. There is also an advanced "Simplify" course, a membership club with live drawing and technique talks, and the long-running Fireside Tattoo Podcast. Strongest for design and for hearing how working artists think.',
    for: ['ws.shape', 'ws.tattooable', 'ws.trad', 'trk.trad'] },
  { id: 'nucleus', kind: 'course', status: 'checked', title: 'Tattoo Nucleus: Tattoo Basics (lining, shading, stipple shading)', url: 'https://tattoonucleus.vhx.tv/products/tattoo-basics-lining-shading-stipple-shading',
    note: 'Paid video lessons from a working artist on the core hand techniques. Pairs with the Lining and Black and Gray tracks.',
    for: ['trk.lining', 'trk.bng'] },
  { id: 'tattoosmart', kind: 'course', status: 'lead', title: 'Tattoo Smart', url: '',
    note: 'No reliable listing was found under this name. Confirm it exists, who teaches it and what it covers before paying.', for: [] },

  // ------------------------------------------------------------ video
  { id: 'yt-t101', kind: 'video', status: 'lead', title: 'Tattooing 101 (YouTube): lining and shading tutorials', url: yt('Tattooing 101 shading tutorial for beginners'),
    note: 'Free tutorials, including a widely watched beginner shading video and lining basics. Good for demonstration study.', for: ['trk.lining', 'trk.bng'] },
  { id: 'yt-meherzi', kind: 'video', status: 'lead', title: 'Fani Meherzi Tattoo: shading and lining guides', url: yt('Fani Meherzi tattoo shading guide for beginners'),
    note: 'Beginner guides covering several shading techniques and solid lines.', for: ['trk.lining', 'trk.bng'] },
  { id: 'yt-bronson', kind: 'video', status: 'lead', title: 'The Real Bronson: beginner lining tutorial', url: yt('The Real Bronson beginner lining tutorial how to tattoo'),
    note: 'A popular, clear lining walkthrough.', for: ['trk.lining'] },
  { id: 'yt-levgen', kind: 'video', status: 'lead', title: 'Levgen Tattoo Tutorials', url: yt('Levgen tattoo tutorials'),
    note: 'Tutorials and pro tips on shading, lining and color from an artist with over 15 years of experience.', for: ['trk.lining', 'trk.bng', 'trk.color'] },
  { id: 'yt-3rl', kind: 'video', status: 'lead', title: '3RL: stipple shading', url: yt('3RL stipple shading tattoo'),
    note: 'Often recommended specifically for stipple and whip-style shading.', for: ['trk.bng'] },
  { id: 'yt-unseen', kind: 'video', status: 'lead', title: 'Unseen Level', url: yt('Unseen Level tattoo'),
    note: 'Demonstrations of design basics, needle choice and shading.', for: ['trk.bng', 'ws.tattooable'] },
  { id: 'yt-proko', kind: 'video', status: 'known', title: 'Proko: drawing fundamentals and anatomy', url: 'https://www.youtube.com/@ProkoTV',
    note: 'Free, high-quality lessons on figure drawing, anatomy, form and shading. Very useful for placement and for drawing animals and figures in traditional work.', for: ['ws.form', 'ws.shape', 'tr.anatomy'] },

  // ------------------------------------------------------------ drawing
  { id: 'drawabox', kind: 'drawing', status: 'known', title: 'Drawabox (free drawing course)', url: 'https://drawabox.com/',
    note: 'Free structured course built on confident, ghosted lines, ellipses and 3D form: exactly the habits tattoo lines need. Start with Lesson 0 and Lesson 1 alongside Workshop unit 1.', for: ['ws.line', 'ws.form'] },
  { id: 'loomis', kind: 'drawing', status: 'known', title: 'Andrew Loomis: Fun with a Pencil; Figure Drawing for All It\'s Worth', url: '',
    note: 'Classic drawing instruction books on construction, form and the figure.', for: ['ws.form', 'ws.shape'] },
  { id: 'edwards', kind: 'drawing', status: 'known', title: 'Betty Edwards: Drawing on the Right Side of the Brain', url: '',
    note: 'A widely used book for learning to see and draw accurately. Useful if you are early in drawing.', for: ['ws.line', 'ws.shape'] },
  { id: 'gurney', kind: 'drawing', status: 'known', title: 'James Gurney: Color and Light', url: '',
    note: 'A clear guide to value, color and light for painters. Read it with Workshop unit 5 and the color track.', for: ['ws.color', 'ws.form', 'trk.color'] },
  { id: 'speedball', kind: 'drawing', status: 'known', title: 'The Speedball Textbook (lettering)', url: '',
    note: 'A long-running lettering reference with many alphabets. Good for building script and block hands.', for: ['ws.lettering'] },
  { id: 'stevens', kind: 'drawing', status: 'known', title: 'Mike Stevens: Mastering Layout (sign painting)', url: '',
    note: 'Sign-painting layout and lettering principles. Tattoo lettering comes from the same tradition.', for: ['ws.lettering'] },

  // ------------------------------------------------------------ flash & history
  { id: 'sj-flash', kind: 'flash', status: 'checked', title: 'Sailor Jerry Tattoo Flash, Volumes One and Two (Hardy Marks)', url: 'https://hardymarks.com/products/sailor-jerry-tattoo-flash-volume-two',
    note: 'Full-color flash sheets by Norman "Sailor Jerry" Collins (Volume Two: 50 sheets from 1940 to 1973), with an introduction by Don Ed Hardy. The best single study source for traditional line, black placement and palette.', for: ['ws.trad', 'ws.flash', 'trk.trad', 'tr.black', 'cl.palette'] },
  { id: 'flash-past', kind: 'flash', status: 'checked', title: 'Flash from the Past: Classic American Tattoo Designs 1890–1965', url: 'https://docarts.com/flash_from_the_past.html',
    note: 'Flash by Sailor Jerry, Gus Wagner, Bert Grimm, Owen Jensen, Ben Corday and others. Shows how the traditional vocabulary developed.', for: ['ws.trad', 'ar.traditional', 'ar.western'] },
  { id: 'tattootime', kind: 'flash', status: 'lead', title: 'Tattootime (Don Ed Hardy\'s publication series)', url: '',
    note: 'Influential 1980s–90s series on tattoo art and history. Look for reissues from Hardy Marks.', for: ['ar.traditional', 'ar.japan'] },
  { id: 'gilbert', kind: 'flash', status: 'known', title: 'Steve Gilbert: Tattoo History: A Source Book', url: '',
    note: 'An anthology of historical writing about tattooing across cultures. Background reading for The Archive.', for: ['ar.ancient', 'ar.western'] },

  // ------------------------------------------------------------ technique books
  { id: 'jordan', kind: 'book', status: 'lead', title: 'C.R. Jordan & Yolanda Jordan: Basic Fundamentals of Modern Tattoo', url: '',
    note: 'Reported to cover machine building and which needle configurations suit which tasks. Check reviews and the edition date before buying.', for: ['mach.coil', 'ndl.selection'] },

  // ------------------------------------------------------------ machines
  { id: 'manufacturers', kind: 'machines', status: 'known', title: 'Your machine and needle makers\' manuals and education pages', url: '',
    note: 'The authority on your exact machine\'s stroke, voltage range, cartridge compatibility, cleaning and maintenance. Read them before any generic chart.', for: ['mach.rotary', 'mach.voltage', 'mach.maintenance', 'ndl.cartridge-vs-bar'] },
  { id: 'alison-machine', kind: 'machines', status: 'checked', title: 'Alison: Fundamentals of Tattoo Machine Optimization (free)', url: 'https://alison.com/course/fundamentals-of-tattoo-machine-optimization',
    note: 'A free 4–5 hour online course on coil machine parts: frame, springs, contact screw and tuning. Pairs with the coil machine lesson.', for: ['mach.coil'] },
  { id: 'udemy-machine', kind: 'machines', status: 'checked', title: 'Udemy: Tattoo Machine Building / rebuild and tuning', url: 'https://www.udemy.com/course/tattoo-machine-building/',
    note: 'A low-cost course on rebuilding and tuning coil machines.', for: ['mach.coil'] },

  // ------------------------------------------------------------ skin & safety knowledge
  { id: 'osha-bbp', kind: 'safety', status: 'checked', title: 'OSHA Bloodborne Pathogens Standard (29 CFR 1910.1030)', url: 'https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.1030',
    note: 'The source text behind universal precautions, PPE, sharps and waste handling. Read it as a study text with the Safety Training page.', for: ['safety'] },
  { id: 'bbp-courses', kind: 'safety', status: 'known', title: 'Bloodborne pathogens courses for tattoo artists', url: '',
    note: 'Many providers offer short tattoo-specific courses. Take one early in your apprenticeship. Your mentor can recommend one.', for: ['safety'] },
  { id: 'cdc-tattoo', kind: 'safety', status: 'checked', title: 'CDC MMWR: tattoo-associated infections from contaminated ink (2012)', url: 'https://www.cdc.gov/mmwr/preview/mmwrhtml/mm6133a3.htm',
    note: 'A case study of why ink handling matters: outbreaks traced to contaminated ink and dilution with non-sterile water.', for: ['safety', 'cl.pigment'] },
  { id: 'fda-ink', kind: 'safety', status: 'known', title: 'FDA: tattoo ink safety, advisories and reporting', url: 'https://www.fda.gov/cosmetics/cosmetic-products/tattoos-temporary-tattoos-permanent-makeup',
    note: 'Ink recalls and warnings, including 2025 contaminated-ink alerts.', for: ['safety', 'cl.pigment'] },
  { id: 'cdc-hand', kind: 'safety', status: 'known', title: 'CDC: hand hygiene guidance', url: 'https://www.cdc.gov/clean-hands/',
    note: 'When and how to wash hands and use sanitiser. The basis of every glove change.', for: ['safety'] },
  { id: 'dermnet', kind: 'safety', status: 'known', title: 'DermNet: tattoo complications (dermatology reference)', url: 'https://dermnetnz.org/topics/tattoo',
    note: 'Dermatologist-written pages on tattoo reactions, infection and other complications. Helps you recognise problems and refer them.', for: ['skin.healing', 'skin.retention', 'skin.stop'] },

  // ------------------------------------------------------------ community
  { id: 'conventions', kind: 'community', status: 'known', title: 'Tattoo conventions and seminars', url: '',
    note: 'Watch working artists up close and attend technique seminars. Excellent material for observation assignments.', for: ['observe'] },
  { id: 'forums', kind: 'community', status: 'known', title: 'Apprentice forums and communities', url: '',
    note: 'Good for perspective. Quality varies a lot, so check advice against your mentor and this curriculum.', for: [] },
];

export const resourcesFor = (id) => RESOURCES.filter((r) => r.for?.includes(id));

// Where professional educators disagree. Each entry presents positions, the
// evidence status, and what LINEAGE does about it.
export const DISAGREEMENTS = [
  { topic: 'Coil vs rotary vs pen for learning', positions: [
    'Some traditional educators insist on learning coils first, because tuning teaches how machines work.',
    'Others start apprentices on rotaries or pens for consistency and a lighter learning load.',
  ], evidence: 'anec', lineage: 'Learn the theory of all three. Practise on what your mentor\'s shop uses.' },
  { topic: 'Practice on synthetic skin vs fruit vs pig skin', positions: [
    'Synthetic skin is clean, consistent and widely used.',
    'Some argue pig skin is closer to human skin. It raises hygiene and disposal concerns, and it is still not human skin.',
    'Many argue none of these substitutes teaches true depth.',
  ], evidence: 'anec', lineage: 'Synthetic skin is the default. No practice surface substitutes for supervised work on human skin.' },
  { topic: 'Aftercare: ointment vs "dry heal" vs adhesive film', positions: [
    'Thin ointment application for several days.',
    'Dry healing with only washing.',
    'Medical-grade adhesive films (e.g. polyurethane) worn for days.',
  ], evidence: 'anec', lineage: 'Wound-care science supports keeping wounds clean and protected. Follow your shop\'s protocol and the product directions; the best regimen is not settled.' },
  { topic: 'Specific depth numbers ("1/16 inch", "1–2 mm")', positions: [
    'Some educators teach a fixed depth as a rule of thumb.',
    'Others refuse to give a number, because skin thickness varies and the needle\'s effective depth depends on hand, angle and setup.',
  ], evidence: 'med', lineage: 'Anatomy shows thickness varies by site and person, so LINEAGE teaches the target layer, not a number.' },
  { topic: 'Voltage "recipes" for lining and shading', positions: [
    'Charts of "lining at X volts, shading at Y".',
    'The view that voltage numbers are meaningless across machines and power supplies.',
  ], evidence: 'ind', lineage: 'Tune to the result on your own machine, using the manufacturer\'s guidance.' },
  { topic: 'Online courses vs in-person learning', positions: [
    'Online courses make good instruction widely available and let you replay demonstrations.',
    'Many artists hold that hand skills, depth and skin-reading only develop with in-person feedback.',
  ], evidence: 'ind', lineage: 'Use courses and videos for theory and demonstration study. Build hand skills on synthetic skin with feedback, and learn skin work with your mentor.' },
];
