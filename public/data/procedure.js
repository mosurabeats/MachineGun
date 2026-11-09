// The complete professional tattoo appointment, 18 steps. `critical` marks
// infection-control or client-safety steps. References point to the Resource
// Library ids in resources.js.

export const PROCEDURE = [
  { n: 1, id: 'consult', title: 'Client consultation', items: [
    'Discuss the idea, size, placement, style, budget and timeline.',
    'Assess whether the design will read well and age well at that size and placement.',
    'Set expectations about pain, session length, healing and touch-ups.',
    'Decline or refer work outside your skill or your supervision scope.',
  ], refs: [] },
  { n: 2, id: 'design', title: 'Design review and approval', items: [
    'Show the final design at actual size.',
    'Confirm spelling, orientation (left/right) and details in writing.',
    'Record the client\'s approval.',
  ], refs: [] },
  { n: 3, id: 'consent', title: 'Health screening and informed consent', critical: true, items: [
    'Verify the client is an adult with government photo ID.',
    'Complete the shop\'s health questionnaire: allergies, skin conditions, keloids, bleeding disorders, anticoagulant medication, pregnancy, conditions affecting healing, and any recent alcohol or drug use.',
    'Do not tattoo anyone who appears intoxicated or impaired.',
    'Explain the risks and the aftercare. Obtain written informed consent, as your shop requires.',
    'Refer medical questions to a health-care provider. Do not give medical advice.',
  ], refs: [] },
  { n: 4, id: 'station', title: 'Workstation preparation', critical: true, items: [
    'Clean and disinfect all work surfaces with an EPA-registered disinfectant, following the label\'s contact time.',
    'Keep the clean field separate from contaminated areas.',
    'Have a sharps container and biohazard waste within reach.',
  ], refs: ['osha-bbp', ] },
  { n: 5, id: 'barrier', title: 'Equipment inspection and barrier protection', critical: true, items: [
    'Inspect the machine, cords and power supply.',
    'Barrier-bag the machine, cord and bottles, and cover everything you will touch.',
    'Open single-use needles and cartridges in front of the client and check packaging integrity and expiry.',
    'Pour ink into single-use caps. Never return unused ink to the bottle.',
  ], refs: ['osha-bbp', 'fda-ink'] },
  { n: 6, id: 'hygiene', title: 'Hand hygiene and PPE', critical: true, items: [
    'Wash hands before gloving.',
    'Wear single-use gloves. Change them whenever they tear and whenever you touch anything outside the clean field.',
    'Use other PPE (apron, eye protection) as your exposure control plan requires.',
  ], refs: ['osha-bbp', 'cdc-hand'] },
  { n: 7, id: 'skin-prep', title: 'Skin assessment and preparation', critical: true, items: [
    'Inspect the area for rash, infection, sunburn, broken skin, moles or lesions. Do not tattoo over them; refer.',
    'Clean the area. If shaving, use a single-use razor.',
    'Apply antiseptic as your shop protocol directs.',
  ], refs: [] },
  { n: 8, id: 'stencil', title: 'Stencil placement and approval', items: [
    'Apply the stencil with the client in a natural posture.',
    'Have the client check it in a mirror and approve the placement.',
    'Remove and reapply as many times as needed. Never start on an unapproved placement.',
  ], refs: [] },
  { n: 9, id: 'position', title: 'Client positioning', items: [
    'Position the client so they can hold still comfortably for the session.',
    'Position yourself sustainably: chair height, lighting, armrest.',
    'Agree on a signal the client can use to ask for a break.',
  ], refs: [] },
  { n: 10, id: 'machine-check', title: 'Machine setup and functional checks', items: [
    'Insert the needle or cartridge and set protrusion.',
    'Run the machine and listen. Check battery or supply output.',
    'Make a test pass on a barrier-covered surface, if that is your shop\'s practice.',
  ], refs: [] },
  { n: 11, id: 'lining', title: 'Professional lining', items: [
    'Use consistent stretch, angle and hand speed.',
    'Pull lines toward you and rotate the work as needed.',
    'Wipe gently. Avoid removing the stencil before lining is complete.',
  ], refs: [] },
  { n: 12, id: 'shading', title: 'Shading and color application', items: [
    'Black first, or follow your mentor\'s order of operations.',
    'Use the fewest effective passes.',
    'Change and rinse cups as your protocol directs.',
  ], refs: [] },
  { n: 13, id: 'monitor', title: 'Monitoring skin response and client condition', critical: true, items: [
    'Watch for overworking, excessive swelling or unusual reactions.',
    'Check in with the client regularly. Watch for pallor, sweating, nausea or faintness.',
    'Severe allergic signs: stop and call 911.',
  ], refs: [] },
  { n: 14, id: 'breaks', title: 'Managing breaks and interruptions safely', critical: true, items: [
    'Before the client moves, set the machine down on a barrier-covered surface.',
    'Remove gloves before touching anything outside the clean field. Wash hands and re-glove before resuming.',
    'Cover the work if the client leaves the station.',
    'Replace any barrier that was touched or contaminated.',
  ], refs: ['osha-bbp'] },
  { n: 15, id: 'complete', title: 'Procedure completion', items: [
    'Do a final check of lines, fill and overall readability.',
    'Clean the tattoo gently.',
    'Photograph the fresh tattoo, with consent.',
  ], refs: [] },
  { n: 16, id: 'aftercare', title: 'Appropriate dressing and aftercare', critical: true, items: [
    'Apply a dressing according to your shop protocol.',
    'Give written aftercare instructions, as your shop requires, and explain them verbally.',
    'Tell the client the signs of infection or reaction and to seek medical care if they occur.',
  ], refs: ['fda-ink'] },
  { n: 17, id: 'breakdown', title: 'Workstation breakdown and waste disposal', critical: true, items: [
    'Put sharps in the sharps container without recapping.',
    'Put contaminated waste in a biohazard container, as required.',
    'Remove barriers, then clean and disinfect all surfaces.',
    'Remove gloves last, then wash hands.',
  ], refs: ['osha-bbp', ] },
  { n: 18, id: 'docs', title: 'Documentation and follow-up', critical: true, items: [
    'Keep the client record and consent form as your shop requires, including ink brands and lot numbers.',
    'Log the session (for an apprentice, in the supervised session log).',
    'Schedule healing check-ins. Record any adverse reaction, and report ink reactions to FDA MedWatch.',
  ], refs: ['fda-ink'] },
];

export const CASE_STUDIES = [
  {
    id: 'case.faint',
    title: 'The client who went pale',
    scenario: 'Forty minutes into a forearm piece, your client goes quiet. Their skin is pale and sweaty, and they say they feel "a bit off". They skipped lunch.',
    question: 'What do you do, in order?',
    answer: 'Stop and lift the machine away, setting it on a barrier-covered surface. Talk to the client. Recline them or have them lower their head, and offer water and sugar per shop protocol. Remove gloves before touching anything outside the field. Tell your supervising mentor immediately. Do not resume until the client has fully recovered and your mentor agrees. Call 911 if they lose consciousness and do not quickly recover, or if other concerning symptoms appear. Document the incident.',
  },
  {
    id: 'case.mole',
    title: 'The stencil over a mole',
    scenario: 'The client\'s chosen placement puts a line straight through a raised, dark mole.',
    question: 'How do you handle it?',
    answer: 'Do not tattoo over the mole. Tattooing over a lesion can hide changes a dermatologist would need to see. Adjust the placement or design to work around it with clearance, or refer the client to a dermatologist before proceeding. Discuss it with your mentor.',
  },
  {
    id: 'case.glove',
    title: 'The phone rings',
    scenario: 'Mid-session, your phone buzzes on the counter. Your gloves are contaminated.',
    question: 'What is the correct sequence?',
    answer: 'Ignore it, or set the machine down on a barrier-covered surface and remove your gloves before touching anything outside the clean field. Wash your hands and put on new gloves before resuming. Anything you touch with contaminated gloves becomes contaminated and must be disinfected or replaced.',
  },
  {
    id: 'case.rash',
    title: 'Day-5 message',
    scenario: 'Five days after a session, the client sends a photo showing redness spreading well beyond the tattoo. They say it is hot and they feel feverish.',
    question: 'How should you respond?',
    answer: 'Advise the client to seek medical care promptly. Do not diagnose or recommend treatment. Tell your mentor, document the report, and keep the ink lot numbers available. If an ink reaction or infection is confirmed, a report to FDA MedWatch may be appropriate.',
  },
];
