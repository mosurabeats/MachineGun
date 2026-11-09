// AI Technical Tattoo Mentor. The system prompt and output schema force a
// separation between what is visible in an upload and conclusions that need
// in-person professional supervision. The model has no way to sign
// milestones, unlock client work or certify anyone: it only returns text.

import Anthropic from '@anthropic-ai/sdk';
import { SYSTEM_PROMPT, OUTPUT_SCHEMA, uploadText, finalize } from '../public/lib/mentor-prompt.js';

export { SYSTEM_PROMPT, OUTPUT_SCHEMA, finalize };

export const MODEL = 'claude-opus-5-5';

export function buildMessages({ uploadType, exerciseId, notes, images }) {
  const content = [];
  (images || []).slice(0, 6).forEach((img, i) => {
    content.push({ type: 'text', text: `Image ${i + 1}${img.label ? ` (${String(img.label).slice(0, 120)})` : ''}:` });
    content.push({ type: 'image', source: { type: 'base64', media_type: img.media_type, data: img.data } });
  });
  content.push({ type: 'text', text: uploadText({ uploadType, exerciseId, notes }) });
  return [{ role: 'user', content }];
}

let client = null;
export function aiAvailable() { return Boolean(process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN); }

export async function reviewUpload(input, c = (client ??= new Anthropic())) {
  const response = await c.beta.messages.create({
    model: MODEL,
    max_tokens: 16000,
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    thinking: { type: 'adaptive' },
    output_config: { effort: 'high', format: { type: 'json_schema', schema: OUTPUT_SCHEMA } },
    system: SYSTEM_PROMPT,
    messages: buildMessages(input),
  });
  if (response.stop_reason === 'refusal') {
    const err = new Error('The AI Mentor declined to review this upload.');
    err.status = 422;
    throw err;
  }
  if (response.stop_reason === 'max_tokens') {
    const err = new Error('The review was cut off. Try fewer images.');
    err.status = 502;
    throw err;
  }
  const text = response.content.filter((b) => b.type === 'text').map((b) => b.text).join('');
  let parsed;
  try { parsed = JSON.parse(text); } catch {
    const err = new Error('The AI Mentor returned an unreadable response.');
    err.status = 502;
    throw err;
  }
  return finalize(parsed, input.uploadType);
}
