// Top-level structure: the seven primary sections, the success criteria, and
// the lighter content for the non-Station sections.

export const SECTIONS = [
  { id: 'path', name: 'The Path', blurb: 'Your apprenticeship plan: curriculum balance, next steps, success criteria.' },
  { id: 'workshop', name: 'The Workshop', blurb: 'Drawing, design and traditional tattoo art.' },
  { id: 'station', name: 'The Station', blurb: 'Practical tattooing: machines, needles, skin, procedure, safety, supervised work.', primary: true },
  { id: 'archive', name: 'The Archive', blurb: 'Tattoo history, technical theory and the research library.' },
  { id: 'mentor', name: 'The Mentor', blurb: 'AI technical mentor: feedback on uploads, never certification.' },
  { id: 'ledger', name: 'The Ledger', blurb: 'Milestones, mentor sign-offs, apprenticeship hours, assessments.' },
  { id: 'portfolio', name: 'The Portfolio', blurb: 'Your best designs, practice pieces and healed work.' },
];

export const SUCCESS_CRITERIA = [
  { id: 'sc1', text: 'Strong drawing and design fundamentals', evidence: ['workshop'] },
  { id: 'sc2', text: 'Knowledge of traditional tattoo history and composition', evidence: ['archive'] },
  { id: 'sc3', text: 'Understanding of tattoo machines and equipment', evidence: ['quiz:mach', 'quiz:ndl', 'ms.machine-setup'] },
  { id: 'sc4', text: 'Safe professional hygiene and infection-control practice', evidence: ['ms.bbp-training', 'ms.cross-contamination'] },
  { id: 'sc5', text: 'Consistent technical performance on synthetic practice surfaces', evidence: ['ms.lining-synthetic', 'ms.shading-synthetic'] },
  { id: 'sc6', text: 'Understanding of how tattooing affects human skin', evidence: ['quiz:skin'] },
  { id: 'sc7', text: 'Competence in supervised client tattooing, assessed by a qualified mentor', evidence: ['ms.client-lining', 'ms.client-shading', 'ms.client-color'] },
  { id: 'sc8', text: 'Ability to evaluate healed work and identify improvements', evidence: ['ms.healing-eval'] },
  { id: 'sc9', text: 'A professional-quality portfolio', evidence: ['ms.portfolio'] },
  { id: 'sc10', text: 'Knowledge and competencies to pursue lawful independent practice', evidence: ['ms.hours', 'ms.independent'] },
];

// Workshop and Archive content live in workshop.js and archive.js.
