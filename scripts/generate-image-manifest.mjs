#!/usr/bin/env node
/**
 * Measures every image under public/images/, emits smaller variants of the large ones, and
 * writes both facts to content/imageSizes.ts.
 *
 * Two problems, one walk of the tree:
 *
 * 1. Browsers cannot reserve space for an image until they know its aspect ratio, so an <img>
 *    with no width/height leaves a hole that collapses once the file arrives. Hand-writing
 *    dimensions for 59 files and keeping them correct as photography is swapped is exactly
 *    the kind of bookkeeping that rots, so components/Img.tsx reads them from here instead.
 *
 * 2. The photography is capped at 1600px so it holds up on a desktop grid, but the same file
 *    is often shown in a card a few hundred pixels wide — and the certificate scans render as
 *    a 96px strip on a phone. This audience is largely on metered mobile data, so each large
 *    image also gets 400px and 800px siblings and Img serves whichever the device needs.
 *
 * A variant is only written when it is meaningfully smaller than the source (see
 * MIN_SHRINK_FACTOR) — a 990px file gains nothing from an 800px copy.
 *
 * Runs as part of `npm run build`; `npm run manifest` regenerates it by hand after adding
 * photos. Safe to re-run — existing variants are left alone.
 */
import { readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const IMAGE_DIR = path.join(ROOT, 'public', 'images');
const OUT = path.join(ROOT, 'content', 'imageSizes.ts');

const MEASURABLE = new Set(['.webp', '.png', '.jpg', '.jpeg', '.avif', '.gif']);

const VARIANT_WIDTHS = [400, 800];
/**
 * Leave small sources alone entirely. Logos and packshots are already well under 100KB, and
 * giving them a srcset means every call site has to describe its rendered width or the
 * browser assumes full-viewport and fetches the *larger* file — a net loss for no gain.
 */
const MIN_SOURCE_WIDTH = 900;
/** Only emit a variant if the source is at least this many times wider — otherwise it is churn. */
const MIN_SHRINK_FACTOR = 1.3;
const QUALITY = 80;

const variantName = (stem, width) => `${stem}-${width}.webp`;
const VARIANT_RE = new RegExp(`-(${VARIANT_WIDTHS.join('|')})$`);

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

async function exists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

const entries = [];
let generated = 0;

for await (const filePath of walk(IMAGE_DIR)) {
  const ext = path.extname(filePath).toLowerCase();
  if (!MEASURABLE.has(ext)) continue;

  // Skip the variants we generate ourselves, or we would recurse into -800-400.
  const stem = path.basename(filePath, ext);
  if (VARIANT_RE.test(stem)) continue;

  const { width, height } = await sharp(filePath).metadata();
  if (!width || !height) {
    console.warn(`skipped (no dimensions): ${path.relative(ROOT, filePath)}`);
    continue;
  }

  const variants =
    width < MIN_SOURCE_WIDTH ? [] : VARIANT_WIDTHS.filter((w) => width >= w * MIN_SHRINK_FACTOR);

  for (const w of variants) {
    const variantPath = path.join(path.dirname(filePath), variantName(stem, w));
    if (await exists(variantPath)) continue;

    await sharp(filePath)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(variantPath);
    generated++;
  }

  // Keys match how the markup references them: 'images/mill/plant_silos.webp'.
  const key = ['images', ...path.relative(IMAGE_DIR, filePath).split(path.sep)].join('/');
  entries.push({ key, width, height, variants });
}

entries.sort((a, b) => a.key.localeCompare(b.key));

const body = entries
  .map(({ key, width, height, variants }) => {
    const v = variants.length ? `, v: [${variants.join(', ')}]` : '';
    return `  '${key}': { w: ${width}, h: ${height}${v} },`;
  })
  .join('\n');

await writeFile(
  OUT,
  `// GENERATED FILE — do not edit by hand.
// Run \`npm run manifest\` (or any \`npm run build\`) to regenerate from public/images/.
// See scripts/generate-image-manifest.mjs for why this exists.

export interface ImageSize {
  /** Intrinsic width in pixels. */
  w: number;
  /** Intrinsic height in pixels. */
  h: number;
  /** Widths of the smaller variants on disk, stored as \`<name>-<width>.webp\`. */
  v?: readonly number[];
}

/** Every image under public/images/, keyed by the path used in \`src\`. */
export const IMAGE_SIZES: Record<string, ImageSize> = {
${body}
};
`,
  'utf8'
);

const withVariants = entries.filter((e) => e.variants.length).length;
console.log(
  `Wrote ${path.relative(ROOT, OUT)} — ${entries.length} image(s) measured, ` +
    `${withVariants} with smaller variants (${generated} newly generated).`
);
