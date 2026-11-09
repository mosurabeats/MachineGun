// Every substantive claim in LINEAGE carries one of these tags so the apprentice
// can always tell established knowledge from shop convention and opinion.
export const EVIDENCE = {
  med: {
    label: 'Established science',
    desc: 'Supported by dermatology, wound-healing or infection-control literature, or by public-health agencies.',
  },
  reg: {
    label: 'Safety standard',
    desc: 'Infection-control or professional safety practice (OSHA, CDC, manufacturer instructions). Follow it every time.',
  },
  ind: {
    label: 'Industry convention',
    desc: 'Widely taught by professional tattooers but not formally studied. Reasonable starting point; expect variation.',
  },
  anec: {
    label: 'Anecdotal / contested',
    desc: 'Personal preference or disputed practice. Educators disagree; treat as one view among several.',
  },
};
