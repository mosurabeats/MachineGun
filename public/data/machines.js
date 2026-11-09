// Machine Laboratory curriculum. Settings are described as relationships and
// ranges people commonly report, never as universal values: the right setup
// depends on the specific machine, needle, ink, skin and the artist's hand.

export const MACHINE_LESSONS = [
  {
    id: 'mach.coil',
    title: 'Traditional coil machines',
    summary: 'Electromagnetic machines whose armature bar is pulled down by two coils and returned by springs, breaking and remaking the circuit every cycle.',
    sections: [
      { h: 'How the circuit works', tag: 'med', p: [
        'Current flows through the front spring and contact screw into the coils. The energised coils become an electromagnet and pull the armature bar down, which drives the needle out of the tube. When the armature drops, the front spring separates from the contact screw, the circuit opens, the magnetic field collapses and the springs return the bar. Contact is remade and the cycle repeats, many times per second.',
        'The capacitor across the coils smooths the collapse of the magnetic field, which reduces arcing at the contact point and affects how crisply the machine runs.',
      ]},
      { h: 'Liner and shader builds', tag: 'ind', p: [
        'Liners are commonly built with a shorter stroke, a tighter contact gap and a lighter armature so the machine runs fast and hits crisply. Shaders are commonly built with a longer stroke and a softer, more forgiving hit. These are tendencies people tune toward. Individual builders disagree on the details.',
      ]},
      { h: 'What changes the behaviour', tag: 'ind', p: [
        'Contact-screw gap (related to stroke), spring gauge and tension, armature-bar weight, coil wraps, capacitor value, frame geometry and the rubber bands or grommets that hold the needle all interact. Change one thing at a time and record the result.',
      ]},
    ],
    keyPoints: [
      'A coil machine is a self-interrupting electromagnetic circuit.',
      'The contact point wears and needs inspection.',
      'Liner and shader builds are conventions that differ between builders, not standards.',
    ],
    quiz: [
      { q: 'What opens the circuit in a coil machine during each cycle?', options: ['The footswitch', 'The front spring leaving the contact screw as the armature is pulled down', 'The capacitor discharging', 'The needle reaching the skin'], answer: 1, explain: 'When the armature is pulled down, the front spring separates from the contact screw and the circuit opens.' },
      { q: 'Which claim is an industry convention rather than a fixed rule?', options: ['Coils form an electromagnet when energised', 'Liners are usually built with a shorter stroke than shaders', 'The circuit opens and closes every cycle', 'Current flows through the coils'], answer: 1, explain: 'Stroke choices for liners and shaders are common practice that builders vary; the electrical behaviour is physics.' },
    ],
  },
  {
    id: 'mach.rotary',
    title: 'Rotary, direct-drive and cam-driven systems',
    summary: 'Electric-motor machines that turn rotation into reciprocating needle motion through a cam, an eccentric bearing or a linkage.',
    sections: [
      { h: 'Converting rotation to stroke', tag: 'med', p: [
        'A DC motor spins an eccentric cam or offset bearing. The offset converts rotation into up-and-down motion. The offset distance sets the stroke length: how far the needle travels per revolution.',
      ]},
      { h: 'Direct drive and slider/linkage designs', tag: 'ind', p: [
        'In a direct-drive machine the needle bar or cartridge drive pin is coupled directly to the cam, so the needle follows the cam almost exactly. That gives a consistent, firm hit with very little give. Slider and linkage designs put a mechanism between the cam and the needle. Some designs add springs or suspension that let the needle yield a little against resistance.',
        'Many pen-style and rotary machines offer interchangeable cams or adjustable stroke. Manufacturers publish the stroke values for their own machines; use those, not a generic chart.',
      ]},
      { h: 'Torque and speed', tag: 'ind', p: [
        'Motor quality affects whether the machine keeps its speed under load when the needle meets skin resistance. A machine that bogs down under load runs inconsistently. Machine reviews frequently cite torque as the difference between a machine that "pushes" ink and one that struggles. That is a widely shared observation, but nobody has measured it in controlled tests.',
      ]},
    ],
    keyPoints: [
      'The cam offset determines stroke length.',
      'Direct drive gives little give; suspended designs give more.',
      'Use the manufacturer\'s published stroke and voltage guidance for your exact machine.',
    ],
    quiz: [
      { q: 'In a rotary machine, what primarily determines stroke length?', options: ['Voltage', 'The cam or eccentric offset', 'The needle diameter', 'Grip size'], answer: 1, explain: 'Stroke is a geometric property of the cam offset; voltage changes speed, not stroke.' },
    ],
  },
  {
    id: 'mach.pen',
    title: 'Pen-style machines',
    summary: 'Cylindrical rotary machines designed for cartridges. They are held like a pen and are often available as wireless units.',
    sections: [
      { h: 'Design', tag: 'ind', p: [
        'A pen machine is a rotary machine in a cylindrical body. Its ergonomics suit artists who hold the machine like a writing instrument. Most pen machines take cartridges only. Some have adjustable stroke or give, and many have an integrated or attachable battery.',
      ]},
      { h: 'Handling considerations', tag: 'anec', p: [
        'Some educators believe pens make it harder for beginners to develop hand-angle awareness because the body gives less visual feedback about the needle angle. Others say pens are easier to learn on. No evidence settles this. Practise with whatever your mentor\'s shop uses and learn the handling of each machine style you encounter.',
      ]},
    ],
    keyPoints: ['Pen machines are rotaries with a cylindrical body.', 'Whether pens suit beginners is disputed among educators.'],
    quiz: [],
  },
  {
    id: 'mach.stroke-give',
    title: 'Stroke length, give and machine response',
    summary: 'How far the needle travels, how much it yields under resistance, and what you see and feel as a result.',
    interactive: 'stroke-sim',
    sections: [
      { h: 'Stroke', tag: 'ind', p: [
        'A longer stroke moves the needle farther each cycle. Educators commonly associate a longer stroke with more force per hit and easier pigment delivery, at the cost of being less forgiving. A shorter stroke is commonly associated with softer, more controllable passes for soft shading. Many artists line and pack with a mid-range stroke. Published rotary strokes typically fall somewhere around 2.5 to 4.5 mm, but the meaningful comparison is between settings on your own machine.',
      ]},
      { h: 'Give', tag: 'ind', p: [
        'Give is how much the needle yields when it meets resistance. A lot of give is often described as softer and more forgiving on delicate skin or for soft shading. Little give is described as crisp and consistent. Too much give can make pigment delivery inconsistent.',
      ]},
      { h: 'Machine response', tag: 'ind', p: [
        'Response is how quickly the machine reaches and holds speed when it starts and when it meets load. Listen for changes in pitch when the needle enters the skin. A pitch that drops sharply suggests the machine is struggling under load.',
      ]},
    ],
    keyPoints: [
      'Stroke, give, voltage, needle and hand speed act together. No single number is "correct".',
      'Learn what your machine sounds and feels like when it runs consistently.',
    ],
    quiz: [
      { q: 'Which statement best reflects how LINEAGE teaches machine setup?', options: ['Use 8 volts for lining on every machine', 'Settings are relationships to learn on your own machine, using manufacturer guidance and mentor feedback', 'Always use the longest stroke available', 'Give does not matter on rotaries'], answer: 1, explain: 'Universal settings ignore differences between machines, needles and skin.' },
    ],
  },
  {
    id: 'mach.voltage',
    title: 'Operating voltage and motor behaviour',
    summary: 'What voltage changes, what it does not change, and why the number on the power supply is not a recipe.',
    sections: [
      { h: 'What voltage does', tag: 'med', p: [
        'On a rotary, higher voltage spins the motor faster, so the needle cycles more times per second. It does not change stroke length. On a coil machine, voltage affects both speed and how hard the armature is pulled. Coil machines are also tuned mechanically, so the same voltage can behave very differently from one coil machine to another.',
      ]},
      { h: 'Why numbers do not transfer', tag: 'ind', p: [
        'Power supplies differ in accuracy, and the voltage you read idle differs from the voltage under load. Motors and builds differ too. Two machines at the same displayed voltage can run at very different speeds. Tune to the result: line quality, pigment delivery and how the skin responds.',
      ]},
    ],
    keyPoints: ['On a rotary, voltage changes speed, not stroke.', 'A displayed voltage is not a transferable setting.'],
    quiz: [
      { q: 'Raising voltage on a direct-drive rotary mainly changes…', options: ['Stroke length', 'Needles per second (speed)', 'Needle diameter', 'Needle depth'], answer: 1, explain: 'On a rotary, voltage drives motor speed.' },
    ],
  },
  {
    id: 'mach.depth',
    title: 'Needle depth, needle protrusion and the target layer',
    summary: 'Why depth is controlled by hand and setup together, and why it can never be judged from a photo of synthetic skin.',
    sections: [
      { h: 'The target', tag: 'med', p: [
        'Permanent pigment must be deposited in the dermis, beneath the epidermis, which renews itself. Epidermis thickness varies across the body, from roughly 0.05 mm on the eyelids to about 1.5 mm on the palms and soles, and dermis thickness varies too. A single fixed depth therefore cannot be right everywhere.',
      ]},
      { h: 'Protrusion (needle hang)', tag: 'ind', p: [
        'Protrusion is how far the needle extends beyond the tip or cartridge mouth. Artists commonly set less hang for lining, so the tip can rest on the skin as a guide, and more for shading and packing, when working off the tip. Cartridge grips adjust protrusion by twisting. Treat any stated millimetre value as a starting point to check with your mentor, not a rule.',
      ]},
      { h: 'Why depth is learned under supervision', tag: 'ind', p: [
        'Synthetic skin does not reproduce human skin\'s variable thickness, elasticity, bleeding or healing. Correct depth on a client is confirmed by how the skin responds during the procedure and how the tattoo heals. A mentor needs to see both in person. LINEAGE and its AI Mentor do not judge depth from images.',
      ]},
    ],
    keyPoints: [
      'Pigment belongs in the dermis, and the depth needed to reach it varies by body area.',
      'Protrusion is a setup choice. Effective depth also depends on your hand, the angle and the machine.',
      'Synthetic-skin photos cannot verify depth.',
    ],
    quiz: [
      { q: 'Why can\'t correct needle depth be verified from a photo of synthetic practice skin?', options: ['Photos are too small', 'Synthetic skin does not reproduce human layer thickness, elasticity, bleeding or healing', 'Depth is always the same', 'It can if the lighting is good'], answer: 1, explain: 'Depth on human skin is confirmed by tissue response and healing, which a mentor needs to observe directly.' },
    ],
  },
  {
    id: 'mach.angle-speed',
    title: 'Machine angle, positioning and hand-speed relationships',
    summary: 'How the angle of the needle to the skin and the speed of your hand relative to the machine determine what lands in the skin.',
    interactive: 'hand-speed',
    sections: [
      { h: 'Angle', tag: 'ind', p: [
        'Lining is commonly taught with the machine held at a consistent angle, pulled toward you so the tip can ride the skin, often described as around 45 to 60 degrees. Packing and shading techniques use a range of angles. A changing angle partway through a line changes the effective depth and the line weight.',
      ]},
      { h: 'Hand speed and machine speed', tag: 'med', p: [
        'The number of punctures per millimetre of travel equals machine cycles per second divided by hand speed. Move too fast for the machine speed and the punctures spread apart, giving skipped or dotted lines. Move too slowly and the punctures pile up, giving more trauma in one place. That trauma can show up as overworked skin or a blown line. Simple arithmetic links the two; how much trauma a given skin tolerates is learned under supervision.',
      ]},
      { h: 'Body positioning', tag: 'ind', p: [
        'Brace your hand, wrist or pinky on the client (or the practice surface) to stabilise. Pull lines toward you when you can. Rotate the work, or move yourself, rather than contorting your wrist. Keep yourself in a sustainable posture for long sessions.',
      ]},
    ],
    keyPoints: [
      'Hand speed and machine speed together determine how many punctures land per millimetre.',
      'A consistent angle gives consistent lines.',
    ],
    quiz: [
      { q: 'A line comes out dotted and skippy. Which relationship is the most likely first suspect?', options: ['Hand speed too fast for the machine speed', 'Ink too dark', 'Stencil too dark', 'Grip too large'], answer: 0, explain: 'Too few punctures per mm of travel leaves gaps. Check hand speed, machine speed and consistent contact.' },
    ],
  },
  {
    id: 'mach.power',
    title: 'Power supplies, cords and wireless batteries',
    summary: 'Regulated supplies, footswitches, clip cords and RCA connections, battery packs, and how each fails.',
    sections: [
      { h: 'Wired systems', tag: 'ind', p: [
        'A regulated DC power supply feeds the machine through a clip cord (common on coils) or an RCA cord (common on rotaries). A footswitch or the unit\'s own start button switches it on. Inspect cords for damage, keep connections clean and barrier-protect anything you touch during a procedure.',
      ]},
      { h: 'Wireless batteries', tag: 'ind', p: [
        'Battery packs eliminate cords but add charge management. Voltage can sag as a pack depletes or under heavy load. Check the charge before every session, keep a spare charged, and follow the manufacturer\'s charging and storage instructions. Lithium cells can be a fire hazard if damaged.',
      ]},
    ],
    keyPoints: ['Start each session with a charged pack and a spare.', 'Barrier-protect anything you touch during work.'],
    quiz: [],
  },
  {
    id: 'mach.maintenance',
    title: 'Machine setup, cleaning and maintenance',
    summary: 'Inspection, barrier protection, disinfection and routine maintenance, following the manufacturer\'s instructions.',
    sections: [
      { h: 'Before every procedure', tag: 'reg', p: [
        'Inspect the machine, cords and grip. Most machine bodies cannot be sterilised. They are cleaned and disinfected according to the manufacturer\'s instructions and covered with barrier bags. Single-use items (cartridges, needles, disposable grips and tubes) are opened in front of the client and are not reused. OSHA\'s Bloodborne Pathogens Standard (29 CFR 1910.1030) is a good reference for the infection-control practices behind every shop routine.',
      ]},
      { h: 'Routine maintenance', tag: 'ind', p: [
        'Coil machines: inspect contact points for pitting, check springs for fatigue, replace O-rings and grommets. Rotaries and pens: many are sealed units that need manufacturer service. Do not oil a machine unless its manufacturer tells you to. Keep a maintenance log for each machine.',
      ]},
    ],
    keyPoints: ['Follow the manufacturer\'s cleaning and maintenance instructions.', 'Single-use items are never reused.'],
    quiz: [
      { q: 'Most tattoo machine bodies are…', options: ['Autoclaved after each client', 'Cleaned and disinfected per manufacturer instructions and covered with barriers', 'Reused without cleaning if bagged', 'Single-use'], answer: 1, explain: 'Machine bodies are generally not sterilisable. Barriers and disinfection protect them.' },
    ],
  },
  {
    id: 'mach.grouping',
    title: 'Needle grouping selection for the machine',
    summary: 'How the needle configuration interacts with the machine\'s power, stroke and give.',
    sections: [
      { h: 'Load and configuration', tag: 'ind', p: [
        'Larger groupings put more points into the skin, which adds resistance. A machine with marginal torque, or one set with a very soft give, may deliver pigment inconsistently with a large magnum. Match the grouping to what the machine can drive consistently. See the Needle Library for the configurations themselves.',
      ]},
    ],
    keyPoints: ['Large groupings need a machine that keeps its speed under load.'],
    quiz: [],
  },
];

// Symptom → possible causes → checks. Ordered from safest/simplest checks to
// more involved ones. `stop` items mean: stop work and get help.
export const TROUBLESHOOTING = [
  {
    id: 'ts.skippy',
    symptom: 'Skipped, dotted or broken lines',
    causes: [
      { c: 'Hand speed too fast for the machine speed', check: 'Slow your pass, or check that the machine is running at its normal speed. Compare a test line on synthetic skin.' },
      { c: 'Inconsistent angle or contact', check: 'Film your hand. Watch for the tip lifting or the angle drifting mid-line.' },
      { c: 'Needle protrusion too short for the technique', check: 'Check hang against your usual setup for lining. Adjust in small steps with mentor guidance.' },
      { c: 'Not enough ink in the needle / ink flow', check: 'Dip more frequently and check that the ink consistency matches what your mentor uses.' },
      { c: 'Machine losing speed under load (low battery, weak motor, poorly tuned coil)', check: 'Listen for a pitch drop on contact. Check battery charge or supply output and the machine\'s condition.' },
      { c: 'Damaged or barbed needle', check: 'Replace the cartridge or needle and inspect the old one under magnification.' },
    ],
  },
  {
    id: 'ts.blurry',
    symptom: 'Lines look fuzzy, spread or "blown" (on a healed tattoo or during work)',
    causes: [
      { c: 'Pigment placed too deep or at too steep an angle', check: 'This is a supervised-skill issue. Have your mentor observe your technique in person.' },
      { c: 'Too many passes / overworking', check: 'Count your passes. Aim for fewer, cleaner passes.' },
      { c: 'Working over thin or very stretchy skin with excessive stretch', check: 'Review the Skin Tension lesson and ask your mentor to show proper stretch for that area.' },
      { c: 'Healed spread over time (normal ageing of fine detail)', check: 'Compare with the design. Lines placed too close together merge with age. See Readability Over Time.' },
    ],
    note: 'A healed blowout cannot be diagnosed from a photo alone. Show the healed tattoo to your mentor.',
  },
  {
    id: 'ts.patchy',
    symptom: 'Patchy black or color saturation',
    causes: [
      { c: 'Hand speed and motion too fast or inconsistent', check: 'Practise small, overlapping circles or tight passes at a steady speed on synthetic skin.' },
      { c: 'Grouping too small or too loose for the area', check: 'Compare magnum options in the Needle Library.' },
      { c: 'Not enough pigment load', check: 'Dip more frequently and keep the needle wet.' },
      { c: 'Machine running inconsistently under load', check: 'Check torque, battery, voltage under load and give settings.' },
    ],
  },
  {
    id: 'ts.trauma',
    symptom: 'Excessive redness, swelling or plasma during the procedure',
    causes: [
      { c: 'Overworking the same area', check: 'Stop working that area. Your mentor decides whether to continue.' },
      { c: 'Client condition (fatigue, low blood sugar, medication, alcohol)', check: 'Pause and check on the client. Revisit the screening answers with your mentor.' },
      { c: 'Possible allergic reaction', check: 'Stop. Hives, rapidly spreading swelling, wheezing or trouble breathing are an emergency: call 911.', stop: true },
    ],
    note: 'On human skin, these are judgement calls made by the supervising professional on site. LINEAGE does not decide whether to continue.',
  },
  {
    id: 'ts.machine-noise',
    symptom: 'Machine runs rough, stalls, gets hot or changes sound',
    causes: [
      { c: 'Low battery or failing power supply', check: 'Swap to a charged battery or a known-good supply and cord.' },
      { c: 'Loose or damaged cord or connection', check: 'Inspect and replace the clip cord or RCA cord.' },
      { c: 'Coil: worn contact point, fatigued spring, wrong gap', check: 'Inspect the contact and springs. Re-tune with mentor guidance.' },
      { c: 'Rotary/pen: internal wear or debris', check: 'Stop using it. Contact the manufacturer for service. Do not open sealed units.' },
      { c: 'Cartridge not seated correctly or incompatible', check: 'Re-seat it. Check the manufacturer\'s compatibility list.' },
    ],
  },
  {
    id: 'ts.backflow',
    symptom: 'Ink or fluid backflowing into the grip or machine',
    causes: [
      { c: 'Cartridge without an effective membrane, or a damaged one', check: 'Replace it with a membrane cartridge from a reputable maker.', stop: true },
      { c: 'Incompatible cartridge and machine', check: 'Check compatibility. Treat any machine contaminated by backflow as contaminated and follow the decontamination steps in your exposure-control plan.' },
    ],
  },
];
