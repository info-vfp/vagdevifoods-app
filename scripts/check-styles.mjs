#!/usr/bin/env node
/**
 * Fails on the two Tailwind mistakes that look fine in review and break the site quietly.
 * These used to be grep one-liners in the README that someone had to remember to run; they
 * now run on every pull request and every deploy (`npm run lint:styles`).
 *
 * 1. Opacity steps that are not multiples of five. Tailwind's scale only has /5, /10, …, so
 *    `text-white/82` generates no CSS at all and the element silently inherits its parent's
 *    colour — on a dark panel that is invisible text. Use `/80`, or brackets: `/[0.82]`.
 *
 * 2. Physical direction utilities (ml-, pr-, text-left, border-r, left-[…]). They do not flip
 *    under dir="rtl", so they break the Urdu layout while looking right in English. Use the
 *    logical ones: ms-/me-, ps-/pe-, text-start/end, border-s/e, start-[…]/end-[…].
 *
 * Output uses GitHub's annotation format, so findings show up on the right line of the diff.
 */
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIRS = ['pages', 'components'];

const OPACITY = /\b[a-z-]+-(?:white|black|brand-[a-z-]+|gray-\d+)\/(\d+)\b/g;
const PHYSICAL =
  /(?<![-\w])(?:ml|mr|pl|pr)-[0-9.]+|(?<![-\w])text-(?:left|right)\b|(?<![-\w])border-(?:l|r)(?![-\w])|(?<![-\w])-?(?:left|right)-\[/g;

const findings = [];

for (const dir of DIRS) {
  for (const name of await readdir(path.join(ROOT, dir))) {
    if (!/\.(tsx?|jsx?)$/.test(name)) continue;
    const file = path.join(dir, name);
    const lines = (await readFile(path.join(ROOT, file), 'utf8')).split('\n');
    lines.forEach((line, i) => {
      for (const m of line.matchAll(OPACITY)) {
        if (Number(m[1]) % 5 !== 0) {
          findings.push({ file, line: i + 1, msg: `"${m[0]}" is not on Tailwind's opacity scale and generates no CSS — use a multiple of 5 or bracket syntax` });
        }
      }
      for (const m of line.matchAll(PHYSICAL)) {
        findings.push({ file, line: i + 1, msg: `"${m[0]}" is a physical direction and will not flip for Urdu — use the logical equivalent (ms/me, ps/pe, text-start/end, border-s/e, start/end)` });
      }
    });
  }
}

for (const f of findings) console.log(`::error file=${f.file},line=${f.line}::${f.msg}`);

if (findings.length) {
  console.error(`\n${findings.length} style problem(s). See the Accessibility section of the README.`);
  process.exit(1);
}
console.log(`Styles OK — no off-scale opacity or physical direction utilities in ${DIRS.join('/, ')}/.`);
