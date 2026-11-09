// Chapter-depth expansions for the Needle Library and Skin Anatomy lessons.

export const NEEDLES_DEEP = {
  'ndl.anatomy': {
    diagram: 'needle',
    sections: [
      { h: 'Reading a needle label', tag: 'ind', p: [
        'A common format is gauge, count, configuration and taper, for example "1207RLLT": #12 (0.35 mm), 7 needles, round liner, long taper. Cartridge boxes often add "M" for membrane or "SE" for safety-equipped. Manufacturers differ, so check the legend on the box.',
        'Common abbreviations: RL round liner. RS round shader. F flat. M1 or WM weaved magnum. M2 or SM stacked magnum (two tight rows). CM, RM or SEM curved or round magnum (soft edge). TX textured (looser spacing). B or BP bugpin (thin gauge).',
      ]},
      { h: 'How the three dimensions interact', tag: 'ind', p: [
        'A 7RL in #12 short taper makes a bold line and carries a lot of ink. A 7RL in #8 long taper makes a finer, crisper line that carries less ink. When a line does not look right, check whether the needle choice matches the line you want before changing your technique.',
        'For shading, thinner gauges and longer tapers are often chosen for very soft gradients, and thicker gauges for faster black and color fill. These are tendencies that vary by artist.',
      ]},
      { h: 'Inspecting needles', tag: 'ind', p: [
        'Under magnification, a damaged needle shows bent points, uneven solder, misaligned points in a liner, or barbs (hooked tips). Damaged needles chew skin and make inconsistent lines. Open each needle in front of the client, inspect it, and replace any that look damaged.',
      ]},
    ],
    examples: [{ t: 'Worked example: decoding labels', p: '"1011CMLT": #10 (0.30 mm), 11 needles, curved magnum, long taper. A soft-edge shader for smooth blending. "1209RS": #12, 9 needles, round shader. Small fills and soft lines.' }],
    mistakes: [{ m: 'Comparing tapers across brands', why: 'One brand\'s "long taper" may be another\'s "extra long".', fix: 'Compare within one brand. Note the brand in your setup records.' }],
    drills: ['Decode 10 needle labels from your shop\'s stock.', 'Use the comparison tool: compare 7RL at #12 and #8 and describe the visible difference in group width.'],
  },
  'ndl.cartridge-vs-bar': {
    sections: [
      { h: 'Membranes and backflow', tag: 'ind', p: [
        'Membrane cartridges have a flexible seal between the needle and the drive. They are designed to keep fluid from flowing back into the grip or machine. Manufacturers make different claims about how well they work. If you ever see ink or fluid inside the grip area, treat the machine as contaminated and follow your exposure-control plan.',
      ]},
      { h: 'Compatibility', tag: 'ind', p: [
        'Most cartridges follow a near-universal standard, but drive-pin lengths and seating differ. A cartridge that rattles, does not seat, or shows inconsistent protrusion is incompatible or defective.',
      ]},
    ],
    drills: ['Check 5 cartridge brands against your machine maker\'s compatibility list.'],
  },
  'ndl.selection': {
    sections: [
      { h: 'A selection table (starting points)', tag: 'ind', p: [
        'Fine detail and small script: 1RL–3RL, often #8–#10.',
        'Medium linework: 5RL–7RL, #10–#12.',
        'Bold traditional outlines: 9RL–14RL, #12, often short taper.',
        'Small fills and thick soft lines: 5RS–9RS.',
        'Black packing: 7M1–15M1. For tiny areas, a large RL or RS.',
        'Color packing: M1 or CM sized to the area.',
        'Smooth grey gradients: CM, often #10 or #8, long taper.',
        'Geometric fills: F (flat).',
        'These are common starting points from professional teaching and will vary by shop and style.',
      ]},
      { h: 'Size the needle to the area', tag: 'ind', p: [
        'A grouping much larger than the area you are filling cannot reach into corners, so you overwork the edges. A grouping much smaller than the area takes too many passes and leaves patchy coverage. Choose the largest grouping that fits the tightest part of the shape, or switch groupings for different parts.',
      ]},
    ],
    examples: [{ t: 'Worked example: needles for a traditional rose', p: 'Outline: 9RL #12. Small black accents: 7RL or 7RS. Whip-shaded leaf: 7M1 or 9M1. Red petals: 9CM or 11M1, with a 5RS for tight gaps between petals. Yellow highlights: 7M1. The artist changes needles three or four times for one small piece.' }],
    drills: ['Pick needles for 3 flash designs (swallow, dagger, panther) and have your mentor critique your choices.'],
  },
};

export const SKIN_DEEP = {
  'skin.layers': {
    diagram: 'skinSites',
    sections: [
      { h: 'The epidermis in more detail', tag: 'med', p: [
        'The epidermis is a stratified layer of cells (mostly keratinocytes) that are produced at its base and migrate up to be shed. Turnover takes weeks. Pigment placed only here is shed during healing and over the following weeks. The epidermis has no blood vessels, so a puncture that does not reach below it does not bleed.',
      ]},
      { h: 'The dermis', tag: 'med', p: [
        'The dermis has an upper papillary layer (loose connective tissue with capillary loops) and a deeper reticular layer (dense collagen). Pigment is retained in the dermis, where it is taken up by macrophages and also found in fibroblasts. Pinpoint bleeding during tattooing reflects punctures reaching the vascular dermis.',
      ]},
      { h: 'Pigment over time', tag: 'med', p: [
        'In mouse research (Baranska et al., Journal of Experimental Medicine, 2018), dermal macrophages captured pigment. When those cells died, the pigment was released and recaptured by new macrophages, which helps explain why tattoos persist. Some pigment also drains to the lymph nodes over time, which has been observed in human tissue. Gradual softening and spreading of lines over years is normal.',
      ]},
    ],
    mistakes: [{ m: 'Assuming one depth fits all sites', why: 'Skin thickness varies widely.', fix: 'Learn site-specific technique under supervision.' }],
    drills: ['Sketch the skin cross-section from memory, labelling the epidermis, the papillary and reticular dermis, the subcutis and where pigment is retained.'],
  },
  'skin.elasticity': {
    diagram: 'stretch',
    sections: [
      { h: 'Site-specific stretch', tag: 'ind', p: [
        'Inner arm, ribs, stomach and neck: loose and thin. They need firm, even stretch and a light hand, and are more prone to blowouts. Outer forearm, calf and outer thigh: firmer and generally more forgiving, which is why they are often chosen for beginner projects. Joints such as elbows and knees: skin folds and moves, and the client\'s position changes how the stencil reads.',
        'Ageing and sun-damaged skin is often thinner and less elastic, so it needs gentler technique.',
      ]},
      { h: 'Distortion', tag: 'ind', p: [
        'Stretching can distort the stencil while you work. A circle on stretched skin can heal as an oval. Stretch evenly in the direction perpendicular to the line you are pulling, release it, and check the design regularly.',
      ]},
    ],
    drills: ['On a 3D practice arm, line a circle using stretch in only one direction, then in alternating directions. Compare the shapes.'],
  },
  'skin.healing': {
    diagram: 'healing',
    sections: [
      { h: 'Phase by phase', tag: 'med', p: [
        'Haemostasis and inflammation (hours to the first few days): bleeding stops, immune cells arrive, and the area is red, warm, swollen and may weep plasma and excess ink.',
        'Proliferation (days to weeks): new epidermis covers the wound and the surface forms a thin layer that flakes or peels. Itching is common. Picking or scratching can pull out pigment and cause scarring.',
        'Remodelling (weeks to months): collagen reorganises. The tattoo may look cloudy or milky while the epidermis matures, then clears.',
      ]},
      { h: 'Factors that impair healing', tag: 'med', p: [
        'Diabetes, immune suppression, some medications, smoking, poor nutrition, infection, repeated trauma, and friction from clothing. These come up at health screening. Whether to proceed is a decision for the client\'s health-care provider and your supervising artist, not for you or the AI.',
      ]},
    ],
    mistakes: [{ m: 'Telling a client "it\'s normal" about worsening symptoms', why: 'It may delay care.', fix: 'Advise medical evaluation for anything spreading or worsening, or for fever.' }],
    drills: ['From memory, list 5 normal and 6 concerning healing signs. Check your list against this lesson.'],
  },
  'skin.overwork': {
    sections: [
      { h: 'Recognising overworking (as taught)', tag: 'ind', p: [
        'Educators commonly describe overworked skin as swollen, shiny, spongy, weeping heavily, sometimes with a raised texture, and failing to take more pigment. The response is to stop working that area. Heavy scabbing often follows, and with it a risk of patchy healing and scarring.',
        'Prevention: plan the fill so each area gets the passes it needs and no more. Use the right needle size. Keep a steady speed. Do not chase perfection on fresh skin, because touch-ups after healing exist for this reason.',
      ]},
      { h: 'Blowout risk factors', tag: 'ind', p: [
        'Thin and loose skin, excessive depth, steep angles, poor stretch, and pulling sideways across the needle grouping. Blowouts generally cannot be removed by re-tattooing. Management (cover-up, laser) is a later conversation with the client and, where appropriate, a medical provider.',
      ]},
    ],
    drills: ['Count your passes on every pack exercise and write the count in your submission notes.'],
  },
  'skin.retention': {
    sections: [
      { h: 'Sun and fading', tag: 'med', p: [
        'Ultraviolet light breaks down pigment over time and is a leading cause of long-term fading. Recommend sun protection on healed tattoos. Fresh tattoos should be kept out of the sun.',
      ]},
      { h: 'Allergic and sensitivity reactions', tag: 'med', p: [
        'Reactions confined to one color, most often reported with red pigments, can appear soon after tattooing or much later. They may look raised, itchy or bumpy. These need medical evaluation. Keep a record of ink brands and lot numbers.',
      ]},
    ],
    drills: ['Photograph a long-healed tattoo of your own or a consenting person, and annotate where it has faded and why that might have happened.'],
  },
  'skin.stop': {
    sections: [
      { h: 'Vasovagal fainting', tag: 'med', p: [
        'Fainting from pain, anxiety, standing, heat or low blood sugar is common in tattooing. Warning signs are pallor, sweating, nausea, yawning, feeling hot, and tunnel vision. Stop, lie the client down or recline them, and raise their legs if trained to do so. Do not leave them alone. Most recover quickly. If they do not, or they seem confused or injured, call 911.',
      ]},
      { h: 'Documentation', tag: 'reg', p: [
        'Record any incident: time, what happened, what was done, who was informed. Follow the shop\'s reporting requirements.',
      ]},
    ],
    drills: ['Role-play a fainting response with your mentor, including glove removal and barrier protocol.'],
  },
};
