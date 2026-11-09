// Skin anatomy & tattoo technique. Medical facts are tagged 'med'; tattoo-shop
// conventions 'ind'; disputed practices 'anec'. This is education, not medical
// advice; abnormal responses are referred to a health-care professional.

export const SKIN_LAYERS = [
  { id: 'epi', name: 'Epidermis', range: '≈0.05 mm (eyelid) to ≈1.5 mm (palms/soles)', desc: 'Outer layer. It constantly renews, so pigment left here sheds during healing.' },
  { id: 'derm', name: 'Dermis', range: 'About 1 to 4 mm, varying by site', desc: 'Connective tissue with collagen, blood vessels and nerves. Tattoo pigment is retained here, largely inside immune cells (macrophages) and fibroblasts.' },
  { id: 'sub', name: 'Hypodermis (subcutaneous fat)', range: 'Varies widely', desc: 'Fat and connective tissue. Pigment pushed into or spread toward this layer can migrate and blur (blowout).' },
];

export const SKIN_LESSONS = [
  {
    id: 'skin.layers',
    title: 'Epidermis, dermis and pigment placement',
    summary: 'Where pigment must go and why it stays there.',
    interactive: 'skin-diagram',
    sections: [
      { h: 'Layers', tag: 'med', p: [
        'The epidermis is the outer, self-renewing layer. Beneath it, the dermis holds collagen, elastin, blood vessels and nerve endings. Below that is subcutaneous fat.',
      ]},
      { h: 'Why tattoos persist', tag: 'med', p: [
        'Pigment particles in the dermis are taken up by macrophages and other dermal cells. Research in mice has shown macrophages capturing, releasing and recapturing pigment over time, which helps explain why tattoos persist and slowly soften. Pigment in the epidermis is lost as the epidermis renews.',
      ]},
      { h: 'Thickness varies', tag: 'med', p: [
        'Skin thickness varies by body site, age, sun exposure and individual. Thin areas (inner arm, ribs, top of foot, neck) and thick areas (back, outer thigh) respond differently to the same technique.',
      ]},
    ],
    keyPoints: ['Pigment is retained in the dermis.', 'Thickness varies by site and person, so there is no universal depth.'],
    quiz: [
      { q: 'Why does pigment placed only in the epidermis not last?', options: ['It is too dark', 'The epidermis continually renews and sheds', 'It sinks to the fat', 'It reacts with the stencil'], answer: 1, explain: 'Epidermal cells turn over, carrying the pigment away.' },
    ],
  },
  {
    id: 'skin.elasticity',
    title: 'Elasticity, tension and stretch',
    summary: 'How to hold skin taut enough for clean work without distorting the design.',
    sections: [
      { h: 'Elasticity', tag: 'med', p: [
        'Skin elasticity comes from elastin and collagen, and decreases with age and sun damage. Loose skin moves under the needle. Very taut skin can make it easier to go too deep.',
      ]},
      { h: 'Stretch technique', tag: 'ind', p: [
        'The non-dominant hand (and sometimes a client\'s cooperation or a helper) stretches the skin flat in front of the needle. Stretch in a way that does not distort the stencil while you work. Re-check line placement whenever you release the stretch.',
      ]},
    ],
    keyPoints: ['Consistent stretch gives consistent lines.', 'Over-stretching distorts the design and can encourage going too deep.'],
    quiz: [],
  },
  {
    id: 'skin.healing',
    title: 'Inflammation, trauma and the healing process',
    summary: 'What normal healing looks like, and what does not.',
    sections: [
      { h: 'Wound-healing phases', tag: 'med', p: [
        'A fresh tattoo is a wound. It heals through overlapping phases: inflammation (redness, warmth, swelling and plasma in the first days), proliferation (new tissue, flaking and peeling over roughly the first weeks) and remodelling (maturing over months). The surface often looks healed within a few weeks, while deeper healing continues longer.',
      ]},
      { h: 'Normal versus concerning', tag: 'med', p: [
        'Expected: mild redness, tenderness, swelling and some oozing of plasma and ink early on, followed by itching and flaking. Concerning: redness that spreads or worsens after the first few days, increasing pain or heat, pus, red streaks, fever or chills, or a rash or raised bumps confined to one color. These call for medical evaluation.',
      ]},
    ],
    keyPoints: ['A tattoo is a wound and heals in phases.', 'Spreading redness, pus, streaks or fever need medical care.'],
    quiz: [
      { q: 'Which finding should be referred for medical evaluation?', options: ['Flaking at week 2', 'Mild itching', 'Spreading redness with fever on day 5', 'Slight shine on day 1'], answer: 2, explain: 'Worsening, spreading redness with systemic symptoms may indicate infection.' },
    ],
  },
  {
    id: 'skin.overwork',
    title: 'Scarring, blowouts and overworking',
    summary: 'The three most common avoidable technical injuries in tattooing.',
    sections: [
      { h: 'Blowouts', tag: 'med', p: [
        'A blowout happens when pigment spreads beyond the intended line, often seen as a blue-grey halo. It is generally attributed to pigment deposited too deep or at too steep an angle, into or near subcutaneous tissue, where it disperses. Thin, loose skin is more vulnerable.',
      ]},
      { h: 'Overworking', tag: 'ind', p: [
        'Overworking is repeated passes over the same skin beyond what is needed to place pigment. It increases trauma, healing time, scabbing, pigment loss and scarring risk. Tattooers commonly describe overworked skin as spongy, shiny or swollen, with excessive plasma. Fewer, effective passes are the goal.',
      ]},
      { h: 'Scarring', tag: 'med', p: [
        'Excessive trauma can cause raised scar tissue. Some people are prone to hypertrophic scars or keloids, which should come up at health screening. Raised scarring on a healed tattoo needs evaluation by a professional, not a guess from a photo.',
      ]},
    ],
    keyPoints: ['Blowouts mean pigment spread beyond the line, often from depth or angle.', 'Overworking increases trauma and scarring risk.', 'Ask about keloid history at screening.'],
    quiz: [
      { q: 'Which client history should come up at screening because it affects scarring risk?', options: ['Favourite color', 'History of keloids', 'Shoe size', 'Prior piercings'], answer: 1, explain: 'Keloid-prone skin is at higher risk of raised scarring.' },
    ],
  },
  {
    id: 'skin.retention',
    title: 'Factors affecting pigment retention',
    summary: 'Why two tattoos done the same way can heal differently.',
    sections: [
      { h: 'Established factors', tag: 'med', p: [
        'Placement depth and consistency, the client\'s own healing response, body site, scabbing and picking, infection, and sun (UV) exposure all affect how pigment settles and fades over time.',
      ]},
      { h: 'Contested factors', tag: 'anec', p: [
        'Aftercare method (ointment versus "dry heal", wrap type and how long to wear it), the claimed benefits of particular brands, and alcohol or caffeine before a session are all debated among artists. Follow your shop\'s and mentor\'s protocol, and the instructions on approved dressing products.',
      ]},
    ],
    keyPoints: ['Technique, biology, aftercare and sun all matter.', 'Many aftercare preferences are debated, not settled.'],
    quiz: [],
  },
  {
    id: 'skin.stop',
    title: 'Recognising abnormal responses: when to stop',
    summary: 'Clear stop criteria, and who to call.',
    sections: [
      { h: 'Stop immediately and get emergency help (911)', tag: 'med', p: [
        'Signs of a severe allergic reaction: hives spreading beyond the area, swelling of the face, lips or throat, wheezing, trouble breathing, dizziness or collapse. Loss of consciousness that does not resolve quickly, or chest pain.',
      ]},
      { h: 'Stop and reassess with your mentor', tag: 'ind', p: [
        'The client feels faint, nauseous or pale. Bleeding is heavier than expected. The skin is responding unusually (rapid welting, blistering). The client withdraws consent or asks to stop, which ends the session immediately whatever its state.',
      ]},
      { h: 'Do not tattoo; refer', tag: 'med', p: [
        'Over active rashes, infection, sunburn, open wounds or broken skin. Over moles, birthmarks or skin lesions that a dermatologist has not cleared, since tattooing over a mole can hide changes. Whenever a screening answer raises a medical question you or your mentor cannot answer.',
      ]},
    ],
    keyPoints: ['Severe allergic signs: call 911.', 'Consent can be withdrawn at any time.', 'Do not tattoo over lesions or broken skin.'],
    quiz: [
      { q: 'A client asks to stop halfway through. What happens?', options: ['Finish the line first, then stop', 'Stop immediately', 'Ask them to wait 10 minutes', 'Continue if the design is half done'], answer: 1, explain: 'Consent can be withdrawn at any time.' },
    ],
  },
];
