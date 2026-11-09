// Mentor-approved practical milestones. These can only be signed in Mentor
// Mode by the registered supervising mentor. The AI Mentor cannot sign them.
// ids beginning with 'ms.' marked `gate: true` are the prerequisites for
// supervised client work (see CLIENT_WORK_PREREQUISITES in lib/logic.js).

export const MILESTONES = [
  // Synthetic / pre-client
  { id: 'ms.bbp-training', phase: 'pre-client', gate: true, title: 'Bloodborne pathogens / universal precautions training verified',
    observe: 'Mentor has seen the certificate and confirmed the course meets the current Vermont OPR requirement.' },
  { id: 'ms.cross-contamination', phase: 'pre-client', gate: true, title: 'Barrier & cross-contamination practice observed',
    observe: 'Mentor watched the apprentice set up, work, take a break and break down without cross-contaminating.' },
  { id: 'ms.procedure-synthetic', phase: 'pre-client', gate: true, title: 'Full procedure performed on synthetic skin, observed in person',
    observe: 'All 18 procedure steps performed in order, in a real station, observed by the mentor.' },
  { id: 'ms.lining-synthetic', phase: 'pre-client', gate: true, title: 'Lining competency on synthetic skin, observed in person',
    observe: 'Consistent lines, curves and circles. Correct angle, stretch and hand speed seen in person.' },
  { id: 'ms.shading-synthetic', phase: 'pre-client', gate: true, title: 'Shading & packing competency on synthetic skin, observed in person',
    observe: 'Smooth gradients, solid black and saturated color with appropriate pass counts.' },
  { id: 'ms.machine-setup', phase: 'pre-client', title: 'Machine setup & troubleshooting demonstrated',
    observe: 'Apprentice set up, tuned and diagnosed a fault on the shop\'s machines.' },
  { id: 'ms.consult', phase: 'pre-client', title: 'Consultation & consent process role-played',
    observe: 'Apprentice ran a consultation, ID check, screening and consent with the mentor or a colleague.' },
  { id: 'ms.readiness-client', phase: 'pre-client', gate: true, title: 'Mentor decision: ready to begin supervised client work',
    observe: 'Mentor\'s professional judgement, made in person, that the apprentice may begin supervised client work on appropriate beginner projects, within the law.' },

  // Supervised client work
  { id: 'ms.client-first', phase: 'supervised', title: 'First supervised client tattoo completed',
    observe: 'Mentor present throughout. Simple, small beginner project.' },
  { id: 'ms.client-lining', phase: 'supervised', title: 'Lining on human skin, mentor-assessed',
    observe: 'Assessed across several healed supervised tattoos.' },
  { id: 'ms.client-shading', phase: 'supervised', title: 'Black & grey shading on human skin, mentor-assessed', observe: 'Assessed on healed work.' },
  { id: 'ms.client-color', phase: 'supervised', title: 'Color saturation on human skin, mentor-assessed', observe: 'Assessed on healed work.' },
  { id: 'ms.client-traditional', phase: 'supervised', title: 'Traditional piece executed and healed well', observe: 'Bold lines, solid black, saturated color, healed cleanly.' },
  { id: 'ms.complications', phase: 'supervised', title: 'Complication recognition & response demonstrated', observe: 'Apprentice correctly recognised and escalated, in a real event or a structured drill.' },
  { id: 'ms.healing-eval', phase: 'supervised', title: 'Healed-work self-evaluation matches mentor\'s', observe: 'Apprentice\'s written critique of healed work agrees with the mentor\'s assessment.' },

  // Toward independence
  { id: 'ms.hours', phase: 'independence', title: 'Required apprenticeship hours completed under active license', observe: 'Hours verified against the Vermont OPR supervising statement requirement in force.' },
  { id: 'ms.portfolio', phase: 'independence', title: 'Professional portfolio reviewed', observe: 'Includes designs, flash, healed tattoos and progress documentation.' },
  { id: 'ms.independent', phase: 'independence', title: 'Mentor recommends pursuing independent licensure', observe: 'Mentor\'s judgement only. Licensure is granted by the regulator, not by LINEAGE or the mentor.' },
];
