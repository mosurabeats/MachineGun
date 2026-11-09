// Chapter-depth expansions for the Machine Laboratory. Merged into the
// matching lesson in MACHINE_LESSONS by id. Fields: diagram, sections,
// examples (worked examples), mistakes, drills.

export const MACHINES_DEEP = {
  'mach.coil': {
    diagram: 'coil',
    sections: [
      { h: 'The parts, one by one', tag: 'med', p: [
        'Frame: holds everything in alignment. Its geometry fixes how the armature, coils and tube relate to one another. A frame that is out of square makes the needle wander in the tube.',
        'Coils: two wire-wound electromagnets on iron cores, usually 8 or 10 wraps (layers) or a similar count stated by the builder. More wraps make a stronger field with slower response. Fewer wraps make a faster, lighter hit. This trade-off is physics. How much it matters in practice is builder opinion.',
        'Armature bar: the steel bar the coils pull down. Heavier bars carry more momentum (often preferred for shaders). Lighter bars respond faster (often preferred for liners).',
        'Springs: the rear spring holds the armature to the frame and acts as the hinge. The front spring carries the contact point and returns the bar. Spring gauge (thickness) and length change how stiff the return is.',
        'Contact screw and contact point: they make and break the circuit. The gap between them, with the armature resting up, is a main control over stroke and timing on a coil machine.',
        'Capacitor: wired across the coils. It stores and releases charge as the field collapses, which affects how smoothly the machine runs and reduces sparking at the contact. Builders choose values by ear and feel.',
        'Binding posts, tube vise, nipple and rubber bands or grommets: hold the needle bar in line and add a small damping force on it.',
      ]},
      { h: 'Tuning concepts (concepts, not recipes)', tag: 'ind', p: [
        'Gap: a larger contact gap generally gives a longer stroke and a harder, slower hit. A smaller gap gives a shorter, faster stroke. Change the gap in small increments, run the machine and listen after each change.',
        'Spring tension and length: a stiffer front spring returns the bar faster and can make the hit feel crisper. A softer spring gives more give. Spring changes interact with the gap, so change one at a time.',
        'Armature-to-coil air gap: how far the armature sits above the cores at rest. Too close and the machine chokes. Too far and it struggles to pull.',
        'Alignment: the needle bar must run straight through the tube without rubbing. Rubbing heats the needle, adds noise and causes inconsistent hits.',
        'Coil machine tuning is a learned craft. Builders and teachers disagree on almost every target value. Learn the cause-and-effect relationships on your mentor\'s machines and keep a tuning log.',
      ]},
      { h: 'Listening to a coil machine', tag: 'ind', p: [
        'A well-tuned coil machine usually has a steady, even buzz. A rattling, uneven sound suggests loose parts, a worn contact or misalignment. A sharp drop in pitch when the needle enters the skin suggests the machine is underpowered or out of tune for the load. Artists describe the ideal sound differently for liners and shaders. Record your mentor\'s machines and compare.',
      ]},
    ],
    examples: [
      { t: 'Worked example: the "choking" liner', p: 'A liner buzzes loudly with no needle, but stutters as soon as it touches the practice skin. Check in this order: (1) the contact point for pitting, (2) the rubber band or grommet tension, which may be dragging the needle bar, (3) needle-bar alignment in the tube, (4) only then the gap. In this example a pitted contact was replaced and the machine ran evenly again. One change, then retest.' },
      { t: 'Worked example: liner vs shader on the same frame', p: 'Same frame, same coils. The builder makes a shader by widening the contact gap a little, using a softer front spring and a heavier armature bar. The result is a longer stroke with more give. Lining with it gives softer, slightly less crisp lines, which is why many artists keep separate machines.' },
    ],
    mistakes: [
      { m: 'Changing several settings at once', why: 'You cannot tell which change caused the result.', fix: 'One adjustment, one test line, one note in the tuning log.' },
      { m: 'Over-tightening the contact screw', why: 'It strips threads and fixes the gap where you did not intend.', fix: 'Snug only. Use a lock nut or set screw as designed.' },
      { m: 'Ignoring a worn contact point', why: 'Pitting gives erratic make/break and an inconsistent hit.', fix: 'Inspect it regularly, and clean or replace it as the builder recommends.' },
      { m: 'Copying voltage settings from the internet', why: 'Coil builds differ enormously.', fix: 'Tune to the result and the sound on your machine.' },
    ],
    drills: [
      'Under your mentor\'s supervision, take one coil machine through three gap settings. Pull a 5 cm line at each on synthetic skin and photograph the lines side by side.',
      'Record 10 s of audio of each of your mentor\'s machines idle and under light load. Label each one liner or shader.',
      'Name every part on the diagram from memory. Repeat until you get them all right on two consecutive days.',
    ],
  },

  'mach.rotary': {
    diagram: 'rotary',
    sections: [
      { h: 'Geometry: offset and stroke', tag: 'med', p: [
        'The cam is offset from the motor shaft. In one revolution the drive pin moves up by the offset and down by the offset, so the total stroke is twice the offset. A 1.75 mm offset gives about a 3.5 mm stroke. This is exact geometry. The needle\'s actual travel at the tip can differ slightly with linkage design and give.',
        'Stroke shape: a simple eccentric gives roughly sinusoidal motion. The needle slows at the top and bottom of the stroke and moves fastest in the middle. Some designs alter this profile, and manufacturers describe their own stroke characteristics.',
      ]},
      { h: 'Direct drive vs suspended designs', tag: 'ind', p: [
        'Direct drive: the needle follows the cam with little slack. The hit is consistent and firm, and the machine is often praised for lining and packing consistency. Critics say it is less forgiving on delicate skin.',
        'Slider, linkage or swing-arm: a mechanism between the cam and the needle can add some give, especially when combined with springs or rubber dampers. Supporters describe a coil-like feel.',
        'Adjustable give: some machines have dials or interchangeable springs. Learn what "more give" does on your specific machine by testing. The labels on dials are not standardised.',
      ]},
      { h: 'Motor and torque', tag: 'ind', p: [
        'Higher-quality motors tend to hold their speed better under load. Signs that a machine struggles: the sound drops noticeably when the needle enters the skin, and saturation is inconsistent with large groupings. Torque matters more with larger magnums.',
      ]},
    ],
    examples: [
      { t: 'Worked example: choosing a stroke', p: 'A machine ships with 3.0, 3.5 and 4.0 mm cams. The artist uses 3.5 mm as a general setting, tries 4.0 mm for bold traditional lining and black packing, and 3.0 mm for soft grey washes. They test each on synthetic skin with the same needle and voltage and compare the photos. The decision comes from the result, not from a forum chart.' },
    ],
    mistakes: [
      { m: 'Assuming the voltage changes stroke', why: 'Stroke is geometric. Voltage changes speed.', fix: 'Change the cam or the stroke setting to change stroke.' },
      { m: 'Opening sealed rotary units', why: 'This voids the warranty and can misalign the mechanism.', fix: 'Send it to the manufacturer for service.' },
    ],
    drills: [
      'Calculate the stroke for offsets of 1.5, 1.75 and 2.0 mm (answers: 3.0, 3.5, 4.0 mm).',
      'If your machine has interchangeable cams or a stroke adjustment, line the same 5 cm line at each setting and photograph the results.',
    ],
  },

  'mach.pen': {
    sections: [
      { h: 'Ergonomics', tag: 'ind', p: [
        'The pen grip puts your fingers close to the needle, which many artists find gives precise control. Grip diameter matters: too thin causes cramping in long sessions. Many manufacturers offer grips in several diameters. Try them before settling on one.',
        'Weight and balance: a heavier pen is more stable in some hands and more tiring in others. Wireless pens add battery weight at the rear or the top.',
      ]},
      { h: 'Cartridge interface', tag: 'ind', p: [
        'Pens drive cartridges through a drive pin. A cartridge that seats loosely or protrudes inconsistently causes inconsistent depth. Check that each cartridge clicks home and that protrusion is set the same way every time.',
      ]},
      { h: 'Learning on a pen: the debate', tag: 'anec', p: [
        'Those in favour: lower learning curve, fewer tuning variables, consistent behaviour. Those against: less visual angle feedback, and the apprentice may not learn mechanical fundamentals. A balanced view: learn the theory of all machine types, and develop hand skills on whatever your shop uses.',
      ]},
    ],
    mistakes: [
      { m: 'Changing pen protrusion between cartridges without noticing', why: 'Depth changes unpredictably.', fix: 'Set protrusion deliberately and the same way for each new cartridge.' },
    ],
    drills: ['Hold your pen at three different points along the grip and pull 5 lines with each. Note which gives the steadiest angle.'],
  },

  'mach.stroke-give': {
    sections: [
      { h: 'How stroke, give and speed combine', tag: 'ind', p: [
        'Think of each puncture as a combination of three things: how far the needle travels (stroke), how much it yields to resistance (give), and how often it cycles (speed). With a long stroke and little give, each hit drives firmly. With a short stroke and plenty of give, each hit yields. Machine speed and hand speed then decide how many of those hits land per millimetre.',
        'There is no universally "best" combination. Many artists keep one machine set up for lining and packing (mid-to-long stroke, firmer) and another for soft shading (shorter stroke, softer). Others use one adjustable machine for everything.',
      ]},
      { h: 'Reading the result', tag: 'ind', p: [
        'Signs (on synthetic skin) that the setup is too soft for the task: lines are faint even with slow, careful passes, and saturation stays patchy despite consistent motion. Signs that it is too aggressive: the surface tears or chews, lines spread, and the practice skin is gouged. On human skin, judging trauma is a supervised skill. Never "turn it up" on a client to compensate for technique.',
      ]},
    ],
    examples: [
      { t: 'Worked example: same needle, two setups', p: 'A 9RL at 3.5 mm with little give gives clean, solid lines in one pass. At 2.5 mm with high give, the same artist needs a second pass to get a solid line. The second pass doubles the trauma at that spot on human skin. The lesson: match the setup to the task so you need fewer passes.' },
    ],
    mistakes: [
      { m: 'Compensating for poor hand technique with machine settings', why: 'It hides the real problem and adds trauma.', fix: 'Diagnose technique first (see Troubleshooting).' },
    ],
    drills: ['Use the simulator above: predict the at-rest needle position for 3 combinations, then check them.', 'Run a fixed-design test at two stroke/give combinations and compare the pass count needed for a solid line.'],
  },

  'mach.voltage': {
    sections: [
      { h: 'Voltage, current and load', tag: 'med', p: [
        'The power supply sets voltage. The machine draws current according to its electrical characteristics and its mechanical load. When the needle enters skin, load increases. A good power system keeps the voltage, and therefore the speed, stable. Cheap supplies or depleted batteries may sag.',
        'Readouts: many supplies show a set voltage and some show live voltage. A difference between idle and working readings tells you something about the machine and the supply. Some rotary systems display speed directly (cycles per second, Hz, or strokes per minute), which is more meaningful than voltage when comparing setups.',
      ]},
      { h: 'Speed in context', tag: 'ind', p: [
        'Faster machine speeds deposit more punctures per millimetre at a given hand speed. That can help with smooth lines and solid fills, but also makes it easier to overwork skin if you move slowly. Slower speeds are often used for soft shading and whip shading techniques where the gaps between punctures are part of the look.',
      ]},
    ],
    examples: [
      { t: 'Worked example: same voltage, different speed', p: 'Two rotaries set to 8.0 V on the same supply run at clearly different speeds. Their motors, bearings and cams differ. The artist matches them by ear, by the result on synthetic skin, or by a displayed Hz reading, not by the voltage number.' },
    ],
    mistakes: [{ m: 'Treating a voltage number as a technique', why: 'It is meaningless across machines.', fix: 'Learn to recognise the result you want.' }],
    drills: ['At three voltages (or speed settings), keep your hand speed steady and pull a line at each. Photograph and compare how solid the lines are.'],
  },

  'mach.depth': {
    sections: [
      { h: 'What "depth" is made of', tag: 'ind', p: [
        'The depth the needle actually reaches comes from: protrusion (setup), how far your hand presses the tip into the skin, the machine angle, the stroke and give, the stretch you apply, and the skin\'s own thickness and resistance at that site. Change any one and the depth changes. This is why depth is described as a feel learned under supervision rather than a number.',
      ]},
      { h: 'Signs taught for human skin', tag: 'ind', p: [
        'Educators commonly describe these signs, which a supervising artist confirms in person. Too shallow: pigment wipes away easily, lines look faint or patchy, and the tattoo heals light or patchy. Too deep: excessive bleeding, the line looks blurred or haloed, the needle "drags" or gets a pulling sensation, and the tattoo heals with blowouts. Well placed: pigment stays in the line when wiped, and the skin responds with moderate redness rather than excessive trauma.',
        'These signs are only meaningful on living human skin and must be confirmed by your mentor during supervised work. They are listed here so you know what your mentor will be teaching you to recognise.',
      ]},
      { h: 'Why synthetic skin misleads', tag: 'med', p: [
        'Synthetic skin has uniform thickness, no blood supply, no inflammation and no healing. Pigment that looks solid on synthetic skin may heal patchy, or blow out, on a person. Use synthetic skin for hand control, consistency and procedure practice, not for calibrating depth.',
      ]},
    ],
    examples: [
      { t: 'Worked example: the same line, two body sites', p: 'An artist pulls a 7RL line with the same setup and pressure on the outer forearm and on the inner bicep. The inner arm skin is thinner and looser. Without adjusting stretch and pressure, the inner arm line is at higher risk of blowout. A supervising mentor would have the apprentice increase stretch, reduce pressure and possibly adjust the angle.' },
    ],
    mistakes: [
      { m: 'Setting hang very long to "make it go in"', why: 'Depth control becomes harder and blowouts become more likely.', fix: 'Fix ink load, hand speed and setup first, under your mentor\'s guidance.' },
      { m: 'Judging depth from synthetic-skin photos', why: 'The material does not behave like skin.', fix: 'Leave depth assessment to your mentor, on supervised human-skin work.' },
    ],
    drills: ['List every factor that changes effective depth, from memory (there are 6).', 'Use the stroke simulator: show how increasing the tip-to-skin distance changes reach.'],
  },

  'mach.angle-speed': {
    diagram: 'angle',
    sections: [
      { h: 'The arithmetic', tag: 'med', p: [
        'Punctures per millimetre = machine cycles per second ÷ hand speed in mm/s. At 100 cycles/s and 10 mm/s, there are 10 punctures per mm (0.1 mm apart). At 30 mm/s, 3.3 punctures per mm (0.3 mm apart). A 0.35 mm needle would barely close the gaps between 0.3 mm punctures, so the line is borderline. A small group, such as a 3RL about 0.75 mm wide, has more room. Use the visualizer above to explore this.',
      ]},
      { h: 'Rhythm and consistency', tag: 'ind', p: [
        'Consistent lines come from a consistent hand speed more than a particular speed. Many educators teach a slow, steady pull for lining. Whip shading uses varying speed on purpose. Packing uses small, controlled, overlapping motions. Film your hand from the side to check your consistency.',
      ]},
      { h: 'Posture and positioning', tag: 'ind', p: [
        'Set your chair and the client\'s height so your forearm can rest and your wrist is neutral. Rotate the work or yourself to keep pulling toward you. Avoid locking your shoulders. Long-session fatigue shows up first in the consistency of your lines.',
      ]},
    ],
    examples: [
      { t: 'Worked example: diagnosing a dotted line', p: 'A line shows evenly spaced gaps. Calculate: the machine is about 80 cycles/s, the hand moved about 40 mm/s, so the spacing is 0.5 mm, larger than a 3RL\'s width at #10. Slowing to about 15 mm/s closes the gaps. Evenly spaced gaps point to the speed ratio. Irregular gaps point to inconsistent contact or angle.' },
    ],
    mistakes: [
      { m: 'Dragging the machine on its side', why: 'Needles cut sideways and lines widen.', fix: 'Keep the needle grouping aligned with the direction of travel.' },
      { m: 'Pushing lines away from you', why: 'You lose sight of the line and control.', fix: 'Rotate the work so you can pull.' },
    ],
    drills: ['Hand-speed ladder (practice exercise ex.dots).', 'Film 1 minute of lining from the side. Measure the angle in 5 frames and note how much it varies.'],
  },

  'mach.power': {
    sections: [
      { h: 'Connections and failure points', tag: 'ind', p: [
        'Clip cords break at the clips and plugs. RCA connectors loosen and corrode. Footswitch cables get trampled. Intermittent cutouts during work are often a cord problem: swap to a known-good cord before blaming the machine. Keep spares.',
        'Battery packs: check whether yours maintains a set voltage as it discharges or gradually sags. Manufacturers state how their packs behave. Charge before every session. Swap packs during a break, never with contaminated gloves.',
      ]},
      { h: 'Barriers on power equipment', tag: 'reg', p: [
        'Anything you might touch during a procedure (power supply buttons, footswitch, cord, battery) is either barrier-covered or untouched with gloved hands. Plan your layout so adjustments are possible without crossing contaminated and clean zones.',
      ]},
    ],
    mistakes: [{ m: 'Adjusting the power supply with a contaminated glove', why: 'Cross-contamination.', fix: 'Barrier-cover the supply, or remove gloves first.' }],
    drills: ['Lay out your station and mark every point you might touch mid-procedure. Decide how each will be barriered.'],
  },

  'mach.maintenance': {
    diagram: 'field',
    sections: [
      { h: 'Cleaning vs disinfection vs sterilisation', tag: 'med', p: [
        'Cleaning removes visible soil and must come first. Disinfection kills most pathogens on surfaces and requires the product\'s full label contact time. Sterilisation (such as a monitored autoclave cycle) kills all microbial life and is required for reusable items that penetrate skin or contact sterile items. Machine bodies are generally cleaned, disinfected and barriered, not sterilised.',
      ]},
      { h: 'A maintenance log', tag: 'ind', p: [
        'For each machine record: date, what you did (cleaned, replaced contact point, new O-ring, sent for service), and any behaviour change. Patterns show when a part is failing. Your mentor or shop may already keep one. Ask to see it.',
      ]},
    ],
    mistakes: [
      { m: 'Spraying disinfectant into motor housings', why: 'It damages internals.', fix: 'Follow the manufacturer\'s cleaning method, and wipe rather than soak.' },
      { m: 'Not waiting the full contact time', why: 'The disinfectant has not done its job.', fix: 'Read the label and time it.' },
    ],
    drills: ['Write your station\'s full setup and breakdown sequence. Have your mentor check it.'],
  },

  'mach.grouping': {
    sections: [
      { h: 'Resistance scales with groupings', tag: 'ind', p: [
        'Each additional needle point adds resistance on entry. A 3RL and a 31CM place very different demands on a machine. If saturation or speed drops off with large magnums, try a machine with more torque, a firmer give setting, or a slightly smaller grouping, and confirm your technique first.',
      ]},
    ],
    drills: ['Pack the same 2 × 2 cm square with a 7M1 and a 15M1 on synthetic skin. Compare time, passes and evenness.'],
  },
};
