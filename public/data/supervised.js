// Supervised Human-Skin Tattooing curriculum (section 6). Lessons are readable
// at any time; *logging* client sessions is locked behind clientWorkGate().

export const SUPERVISED_MODULES = [
  { id: 'sup.readiness', title: 'Determining readiness for supervised client work', tag: 'ind', body: [
    'Readiness is not a course score. It is a professional judgement made in person by your supervising mentor, based on consistent synthetic-skin work, observed infection-control practice, procedural fluency and temperament.',
    'LINEAGE shows the evidence you have gathered, but neither the app nor its AI Mentor can decide you are ready. The milestone "Mentor decision: ready to begin supervised client work" can only be signed by your registered mentor.',
  ]},
  { id: 'sup.legal', title: 'Legal and licensing requirements (Vermont)', tag: 'reg', body: [
    'Vermont regulates tattooists through the Office of Professional Regulation (OPR) under 26 V.S.A. chapter 79 and the Administrative Rules for Tattooing and Body Piercing. Apprentices must hold an apprentice license from OPR before the apprenticeship begins.',
    'OPR\'s supervising statement form lists 1,000 apprenticeship hours for a tattooist license. It also states that hours only count while an apprentice license is ACTIVE, and that the supervising statement must be filed before the apprenticeship starts. The rules require an apprentice supervisor to have practised for at least three years with no disciplinary record. The shop must be registered.',
    'A universal precautions / infectious disease course is required. Secondary sources describe a three-hour course with periodic renewal. Confirm the current requirement with OPR.',
    'Requirements change. Before relying on anything here, read the current statute, rules and OPR forms. LINEAGE records your license details but cannot verify them with the state.',
  ]},
  { id: 'sup.eligibility', title: 'Client eligibility and informed consent', tag: 'reg', body: [
    'Clients must be adults (18+, verified with government photo ID), sober and unimpaired, and able to give informed consent. They must also be appropriate for a beginner\'s scope: healthy skin at the site, no screening flags your mentor has not cleared, and realistic expectations.',
    'Clients must know they are being tattooed by an apprentice under supervision, and must agree to it in writing. Consent can be withdrawn at any time.',
  ]},
  { id: 'sup.mentor', title: 'Working under a qualified professional mentor', tag: 'ind', body: [
    'Your mentor is present and directly supervising for every client procedure, as Vermont rules and your shop require. Agree in advance on signals for "pause", "take over" and "stop". The mentor can take over at any point.',
    'After each session, debrief: what went well, what to fix, and what to practise on synthetic skin before the next client.',
  ]},
  { id: 'sup.projects', title: 'Selecting appropriate beginner projects', tag: 'ind', body: [
    'Common first projects: small, simple linework or traditional designs with bold lines, on forgiving, easily stretched areas (outer forearm, outer thigh, calf), chosen with your mentor. Avoid hands, fingers, feet, neck, face, ribs, cover-ups, script with tight spacing, and fine-line or photorealistic work.',
  ]},
  { id: 'sup.facility', title: 'Professional equipment and facility standards', tag: 'reg', body: [
    'Work only in a registered shop that meets the Vermont rules: an appropriate work area, hand-washing facilities, sharps and biohazard disposal, an exposure control plan, and single-use or sterilised equipment as required.',
  ]},
  { id: 'sup.comfort', title: 'Managing client comfort and communication', tag: 'ind', body: [
    'Explain what you are about to do. Check in regularly and offer breaks. Watch for the non-verbal signs of distress or faintness. Keep the conversation professional.',
  ]},
  { id: 'sup.complications', title: 'Recognising complications', tag: 'med', body: [
    'During the procedure: fainting, allergic reaction, unusual bleeding, overworking. After the procedure: infection signs (spreading redness, heat, pus, streaks, fever), allergic reactions (often confined to one color), and raised scarring.',
    'Your role is to recognise, stop, escalate to your mentor and refer to medical care. It is not to diagnose or treat.',
  ]},
  { id: 'sup.documentation', title: 'Documenting completed tattoos', tag: 'reg', body: [
    'Keep the shop\'s client record, as the rules require: consent, ID verification, design, placement, ink brands, colors and lot numbers, needle configurations, date and the supervising artist. LINEAGE\'s session log is your learning record. It does not replace the shop\'s legal records.',
    'Store only what you need in LINEAGE: client initials or a shop reference number, not full names or contact details.',
  ]},
  { id: 'sup.healing', title: 'Healing evaluations', tag: 'ind', body: [
    'With client consent, photograph the tattoo fresh and at about 3 days, 2 weeks, 4–6 weeks and 3 months. Compare against the fresh photo for line spread, patchiness, scarring and color retention. Review each set with your mentor.',
  ]},
  { id: 'sup.feedback', title: 'Post-procedure feedback', tag: 'ind', body: [
    'Collect the client\'s experience (comfort, communication, aftercare clarity) and your mentor\'s technical notes. Turn both into specific practice assignments.',
  ]},
  { id: 'sup.assessment', title: 'Mentor-verified competency assessments', tag: 'ind', body: [
    'Competency on human skin is assessed by your mentor across multiple healed tattoos, not from a single session. Assessments are recorded as milestones in Mentor Mode with observations and the skills that still need training.',
  ]},
];
