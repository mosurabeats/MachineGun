// Bundle LINEAGE into one self-contained HTML fragment for hosting as a
// claude.ai Artifact (open on any device). Output: dist/lineage.html
//
// The hosted page has no server: the AI Mentor uses the page's `sample`
// capability and backups use `downloads` (see public/lib/runtime.js).

import { build } from 'esbuild';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'dist', 'lineage.html');

const js = await build({
  entryPoints: [path.join(root, 'public', 'app.js')],
  bundle: true,
  format: 'iife',
  minify: true,
  target: 'es2020',
  write: false,
});
const script = js.outputFiles[0].text.replace(/<\/script/gi, '<\\/script');
const css = await readFile(path.join(root, 'public', 'styles.css'), 'utf8');
const index = await readFile(path.join(root, 'public', 'index.html'), 'utf8');
const bodyMarkup = index.slice(index.indexOf('<body>') + 6, index.indexOf('<script')).trim();

const html = `<title>LINEAGE</title>
<meta name="claude:viewport-fit-sides" content="cover">
<style>
${css}
</style>
${bodyMarkup}
<script>
${script}
</script>
`;

await mkdir(path.dirname(out), { recursive: true });
await writeFile(out, html);
console.log(`Wrote ${path.relative(root, out)} (${(html.length / 1024).toFixed(0)} KB)`);
