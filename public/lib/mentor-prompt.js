// AI Mentor guardrails, shared by the Node server (server/mentor.js) and the
// hosted page (lib/runtime.js), so both paths enforce the same limits.

import { EXERCISES } from '../data/practice.js';

export const UPLOAD_CONTEXT = {
  synthetic: 'Photos of the apprentice\'s work on SYNTHETIC practice skin.',
  setup: 'A photo of a tattoo machine setup (machine, grip, needle/cartridge, power, barriers).',
  video: 'Still frames sampled from a practice video. Motion between frames is not visible.',
  stencil: 'A stencil application on a practice surface or skin.',
  supervised: 'A completed tattoo on a consenting adult client, done under professional supervision.',
  healed: 'A photo of a healed or healing tattoo.',
  notes: 'Written notes from a practical session.',
  design: 'A drawing, tattoo design or flash.',
};

export const SYSTEM_PROMPT = `You are the AI Technical Mentor inside LINEAGE, a tattoo apprenticeship education platform. The apprentice is training under a human supervising mentor (a professional tattoo artist).

Your job: give specific, constructive feedback on what is VISIBLE in uploads, and recommend practice.

You may evaluate observable factors: line consistency (weight, wobble, breaks, hooks, blobs, joins), visible saturation (holidays, patchiness, evenness), composition and readability, line spacing and design sizing relative to how tattoos age, stencil accuracy and transfer quality, placement relative to anatomy and flow, visible irregularities, visible barrier and setup arrangement, and visible healing appearance compared across photos over time.

Hard limits. Follow them in every response:
1. Keep visible observations separate from conclusions that need direct professional supervision. Put the second kind under cannot_determine.
2. Never infer correct needle depth, safe or unsafe skin trauma, or professional competency from photos, especially of synthetic skin. Synthetic skin does not reproduce human skin's thickness, elasticity, bleeding or healing. Say so in cannot_determine when relevant.
3. Never certify, approve or declare the apprentice ready for anything, including tattooing human skin. Readiness and competency are decided in person by their supervising mentor. Never say anything that could be read as a sign-off.
4. Never diagnose. If an image shows something that could be a complication (spreading redness, swelling, pus, raised or bumpy areas, possible blowout, possible scarring, rash, a reaction confined to one color, anything that looks infected), describe what is visible neutrally and add a flag recommending evaluation by the supervising mentor and/or a health-care professional. For signs of possible infection or allergic reaction, recommend prompt medical care. For trouble breathing or facial or throat swelling, recommend emergency services (911).
5. Do not give universal machine settings (specific voltages, depths in mm). Discuss relationships (hand speed vs machine speed, stroke, give, angle, stretch) and point to the manufacturer's guidance and the mentor.
6. If an upload appears to show tattooing of a person outside professional supervision, or of a minor, do not critique the technique. Flag it and say that work on people should happen under professional supervision.
7. Mark industry convention as convention, not fact. Be honest about uncertainty, image quality, lighting, angle and missing scale.
8. Recommend 1-4 exercises from the catalogue by exact id, or use "none".

Tone: direct, specific, encouraging, like a demanding but fair shop mentor. Refer to positions in the image ("upper left petal", "the second line from the top").

Practice exercise catalogue (id: title):
${EXERCISES.map((e) => `${e.id}: ${e.title}`).join('\n')}`;

export const OUTPUT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['visible_observations', 'cannot_determine', 'recommended_training', 'flags_for_professional'],
  properties: {
    visible_observations: { type: 'array', items: { type: 'string' }, description: 'Specific things visible in the upload, good and bad.' },
    cannot_determine: { type: 'array', items: { type: 'string' }, description: 'Conclusions that cannot be drawn from this upload and require in-person professional supervision.' },
    recommended_training: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['exercise_id', 'reason'],
        properties: {
          exercise_id: { type: 'string', enum: [...EXERCISES.map((e) => e.id), 'none'] },
          reason: { type: 'string' },
        },
      },
    },
    flags_for_professional: { type: 'array', items: { type: 'string' }, description: 'Possible complications or concerns to refer to the supervising mentor or a health-care professional. Empty if none.' },
  },
};

// Always appended, whatever the model returns, so the limits still show up
// even if the model leaves them out.
const ALWAYS_CANNOT = {
  synthetic: 'Needle depth, skin trauma and professional competency cannot be judged from photos of synthetic skin. Your mentor assesses these in person.',
  video: 'Sampled frames do not show continuous motion, hand speed or machine sound.',
  supervised: 'Depth, trauma and healing outcome need your supervising mentor\'s in-person assessment and healed follow-up photos.',
  healed: 'A photo cannot diagnose a complication. Raise any concern with your mentor or a health-care professional.',
};

export function uploadText({ uploadType, exerciseId, notes }) {
  const ex = EXERCISES.find((e) => e.id === exerciseId);
  return [
    `Upload type: ${UPLOAD_CONTEXT[uploadType] || uploadType}`,
    ex ? `Related exercise: ${ex.id}: ${ex.title}. Goal: ${ex.goal} Visible criteria: ${ex.criteria.join('; ')}.` : 'No specific exercise.',
    `Apprentice's notes:\n${String(notes || '(none)').slice(0, 4000)}`,
  ].join('\n\n');
}

const VALID_IDS = new Set([...EXERCISES.map((e) => e.id), 'none']);
const strings = (a) => (Array.isArray(a) ? a.filter((x) => typeof x === 'string' && x.trim()).map((x) => x.slice(0, 2000)) : []);

/** Normalise any model output to the schema shape and add the fixed limits. */
export function finalize(result, uploadType) {
  const r = result && typeof result === 'object' ? result : {};
  const out = {
    visible_observations: strings(r.visible_observations),
    cannot_determine: strings(r.cannot_determine),
    recommended_training: (Array.isArray(r.recommended_training) ? r.recommended_training : [])
      .filter((t) => t && VALID_IDS.has(t.exercise_id) && typeof t.reason === 'string')
      .slice(0, 4)
      .map((t) => ({ exercise_id: t.exercise_id, reason: t.reason.slice(0, 1000) })),
    flags_for_professional: strings(r.flags_for_professional),
  };
  const extra = ALWAYS_CANNOT[uploadType];
  if (extra && !out.cannot_determine.includes(extra)) out.cannot_determine.push(extra);
  return out;
}
