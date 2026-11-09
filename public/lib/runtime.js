// Host detection. LINEAGE runs two ways:
//  - locally via `npm start`: the AI Mentor goes through /api/mentor (server holds the API key)
//  - as a hosted claude.ai page: the AI Mentor uses the page's `sample` capability on the
//    viewer's own Claude account, and backups save through the `downloads` capability.

import { SYSTEM_PROMPT, OUTPUT_SCHEMA, uploadText, finalize } from './mentor-prompt.js';

export const hosted = () => typeof window !== 'undefined' && !!window.claude?.use;

let samplePromise = null;
const getSample = () => (samplePromise ??= hosted() ? window.claude.use('sample') : Promise.resolve(null));

/** 'hosted' | 'server' | null (unavailable) */
export async function mentorMode() {
  if (hosted()) return (await getSample()) ? 'hosted' : null;
  try {
    const h = await (await fetch('/api/health')).json();
    return h.ai ? 'server' : null;
  } catch {
    return null;
  }
}

const SAMPLE_ERRORS = {
  not_granted: 'You declined to let this page use Claude. Reload the page to be asked again.',
  sampling_disabled: 'Claude is not available on this account.',
  rate_limited: 'Too many requests right now. Try again in a few minutes.',
  refused: 'Claude declined to review this upload.',
  image_rejected: 'One of the images could not be used. Try a JPEG or PNG under 20 MB.',
  images_unavailable: 'This view cannot send images. Try notes only, or open the page in claude.ai.',
  invalid_json: 'The review came back in an unreadable form. Try again.',
  session_expired: 'Sign in to Claude again, then retry.',
};

/**
 * Ask the AI Mentor. `images` are {media_type, data(base64), label} for the
 * server path; `blobs` are image Blobs for the hosted path.
 */
export async function askMentor({ uploadType, exerciseId, notes, images, blobs }) {
  const mode = await mentorMode();
  if (mode === 'server') {
    const res = await fetch('/api/mentor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uploadType, exerciseId, notes, images }),
    });
    const body = await res.json();
    if (!res.ok) throw new Error(body.error || res.statusText);
    return body.result;
  }
  if (mode === 'hosted') {
    const sample = await getSample();
    const prompt = `${SYSTEM_PROMPT}

${blobs?.length ? `${blobs.length} image(s) are attached, in this order: ${blobs.map((b, i) => `${i + 1}. ${b.name || 'image'}`).join('; ')}.` : 'No images are attached.'}

${uploadText({ uploadType, exerciseId, notes })}

Reply with only one JSON object matching this JSON Schema, and no other text:
${JSON.stringify(OUTPUT_SCHEMA)}`;
    try {
      const raw = await sample.json(prompt, { images: blobs?.length ? blobs : undefined, cache: false });
      return finalize(raw, uploadType);
    } catch (e) {
      throw new Error(SAMPLE_ERRORS[e?.code] || 'The AI Mentor could not be reached. Try again.');
    }
  }
  throw new Error('The AI Mentor is offline.');
}

/** Save a text file: the hosted `downloads` capability, or a normal download locally. */
export async function saveText(filename, text) {
  if (hosted()) {
    const dl = await window.claude.use('downloads');
    if (!dl) throw new Error('Saving files is not available in this view.');
    try { await dl.save({ filename, data: text }); return; } catch (e) {
      if (e?.code === 'declined') return;
      throw new Error('The file could not be saved here.');
    }
  }
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
  a.download = filename;
  a.click();
}
