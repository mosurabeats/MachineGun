// Tattooing Resource Research (section 9). Entries marked `verified: true` were
// checked against the source during research (Nov 2026). Others are leads to
// investigate: their scope, cost and current status should be confirmed before
// you rely on them. `kind` drives filtering.

export const RESOURCES = [
  // Regulation & public health
  { id: 'vt-statute', kind: 'regulation', title: 'Vermont statute: Tattooists and Body Piercers (26 V.S.A. ch. 79)', url: 'https://legislature.vermont.gov/statutes/fullchapter/26/079', verified: true,
    note: 'Requires OPR registration/licensure for tattooists, apprentice registration before the apprenticeship begins, and shop registration.' },
  { id: 'vt-rules', kind: 'regulation', title: 'Vermont Administrative Rules for Tattooing and Body Piercing (CVR 04-030-310)', url: 'https://www.law.cornell.edu/regulations/vermont/04-310-Code-Vt-R-04-030-310-X', verified: true,
    note: 'Sets apprenticeship, supervisor (≥3 years practice, no discipline), sanitation and record-keeping rules. The SOS-hosted PDF is dated 2004, so confirm which version is current with OPR.' },
  { id: 'vt-opr', kind: 'regulation', title: 'Vermont OPR: Tattooist & Body Piercer profession page and forms', url: '', verified: false,
    note: 'Find it from sos.vermont.gov > Office of Professional Regulation. Holds application instructions and the supervising statement form (which lists 1,000 hours for a tattooist and requires an active apprentice license).' },
  { id: 'vt-supervise', kind: 'regulation', title: 'OPR supervising statement form (PDF)', url: 'https://outside.vermont.gov/dept/sos/office_professional_regulation/professions/tattooist_body_piercer/tattooist_body_piercer_supervising_statement_form.pdf', verified: true,
    note: 'Must be completed before the apprenticeship starts.' },
  { id: 'osha-bbp', kind: 'safety', title: 'OSHA Bloodborne Pathogens Standard, 29 CFR 1910.1030', url: 'https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.1030', verified: true,
    note: 'Exposure control plans, universal precautions, PPE, sharps and regulated waste. OSHA has issued interpretation letters on its application to tattoo shops.' },
  { id: 'fda-ink', kind: 'safety', title: 'FDA: Tattoos & Permanent Makeup (ink safety, recalls, reporting)', url: 'https://www.fda.gov/cosmetics/cosmetic-products/tattoos-temporary-tattoos-permanent-makeup', verified: false,
    note: 'Ink advisories and recalls, including 2025 contaminated-ink warnings. Report reactions with brand and lot number.' },
  { id: 'cdc-tattoo', kind: 'safety', title: 'CDC MMWR: tattoo-associated nontuberculous mycobacterial infections (2012)', url: 'https://www.cdc.gov/mmwr/preview/mmwrhtml/mm6133a3.htm', verified: true,
    note: 'Outbreaks linked to contaminated ink and dilution with non-sterile water. The CDC recommends artists avoid non-sterile dilution.' },
  { id: 'cdc-hand', kind: 'safety', title: 'CDC: Hand hygiene guidance', url: 'https://www.cdc.gov/clean-hands/', verified: false, note: 'General hand-hygiene evidence base.' },
  { id: 'bbp-courses', kind: 'safety', title: 'Bloodborne pathogen courses for tattooists', url: '', verified: false,
    note: 'Several providers sell tattoo-specific BBP courses. Confirm with OPR which courses satisfy Vermont\'s universal-precautions requirement before buying.' },

  // Professional education
  { id: 'tattooing101', kind: 'education', title: 'Tattooing 101', url: '', verified: false,
    note: 'Long-running online tattoo-education brand with technique videos and courses. Evaluate against your mentor\'s guidance; some content is sales-oriented.' },
  { id: 'fireside', kind: 'education', title: 'Fireside Tattoo Network', url: '', verified: false,
    note: 'Network of artist-led videos and interviews, including technique and business content. Strong for hearing many professionals\' viewpoints.' },
  { id: 'tattoosmart', kind: 'education', title: 'Tattoo Smart', url: '', verified: false,
    note: 'Online tattoo-education platform. Check the instructor credentials and curriculum scope.' },
  { id: 'manufacturers', kind: 'equipment', title: 'Machine & needle manufacturers\' manuals and education pages', url: '', verified: false,
    note: 'The authoritative source for your exact machine\'s stroke, voltage range, cartridge compatibility, cleaning and maintenance. Always prefer these over generic charts.' },
  { id: 'builders', kind: 'equipment', title: 'Coil machine building & tuning resources', url: '', verified: false,
    note: 'Builder-run courses and forums on tuning coils (springs, contact gap, capacitors). Practices differ widely between builders.' },
  { id: 'conventions', kind: 'education', title: 'Tattoo conventions & seminars', url: '', verified: false,
    note: 'Many conventions run technical seminars. Observing working artists in person is valuable observation-assignment material.' },
  { id: 'forums', kind: 'community', title: 'Apprenticeship forums & communities', url: '', verified: false,
    note: 'Useful for perspective. Quality varies widely, and unlicensed "scratcher" advice is common. Never treat forum advice as supervision.' },
  { id: 'videos', kind: 'education', title: 'Experienced artists\' educational videos', url: '', verified: false,
    note: 'Use them for demonstration study. Write down the artist, their style and what they assume about equipment.' },
];

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
  { topic: 'Online-only courses as an apprenticeship', positions: [
    'Some online programs market themselves as apprenticeships.',
    'Professional consensus, and Vermont law, require in-person supervised apprenticeship under a licensed supervisor.',
  ], evidence: 'reg', lineage: 'Online study, LINEAGE included, never authorises tattooing a person.' },
];
