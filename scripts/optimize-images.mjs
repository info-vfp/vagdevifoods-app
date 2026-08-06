#!/usr/bin/env node
/**
 * Converts every raster image under public/images/ to WebP and caps its dimensions.
 *
 * Most visitors are on mobile data, so payload is the single biggest lever we have:
 * the source photography came off a DSLR at 4000px+ and several megabytes each, which
 * is far more than any layout on this site can display.
 *
 * Safe to re-run. Images already converted are skipped, so after dropping new photos
 * into public/images/ you can just run `npm run images` again.
 *
 *   npm run images            convert, then delete the original png/jpg
 *   npm run images -- --keep  convert but leave the originals on disk
 *   npm run images -- --dry   report what would happen, change nothing
 */
import { readdir, rename, stat, unlink } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const IMAGE_DIR = path.join(ROOT, 'public', 'images');

const QUALITY = 80;
const DEFAULT_MAX_EDGE = 1600;

// Packshots and logos are rendered small and sit on flat backgrounds, so they can be
// capped tighter than the photography without any visible loss.
const MAX_EDGE_BY_DIR = {
  logos: 600,
  ui: 600,
  illustrations: 1200,
  products: 1200,
  certs: 1400,
};

const CONVERTIBLE = new Set(['.png', '.jpg', '.jpeg']);
const RESIZABLE = new Set([...CONVERTIBLE, '.webp']);

const keepOriginals = process.argv.includes('--keep');
const dryRun = process.argv.includes('--dry');

const kb = (bytes) => `${Math.round(bytes / 1024)}KB`;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

function maxEdgeFor(filePath) {
  const relative = path.relative(IMAGE_DIR, filePath);
  const topLevelDir = relative.split(path.sep)[0];
  return MAX_EDGE_BY_DIR[topLevelDir] ?? DEFAULT_MAX_EDGE;
}

async function exists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

const results = { converted: 0, shrunk: 0, skipped: 0, bytesBefore: 0, bytesAfter: 0 };

for await (const filePath of walk(IMAGE_DIR)) {
  const ext = path.extname(filePath).toLowerCase();
  if (!RESIZABLE.has(ext)) continue;

  const maxEdge = maxEdgeFor(filePath);
  const label = path.relative(IMAGE_DIR, filePath);

  // Files that are already WebP still get re-encoded if they exceed the cap for their
  // folder — several were exported far larger than they are ever displayed.
  if (ext === '.webp') {
    const { width = 0, height = 0 } = await sharp(filePath).metadata();
    if (width <= maxEdge && height <= maxEdge) {
      results.skipped++;
      continue;
    }

    const before = (await stat(filePath)).size;
    if (dryRun) {
      console.log(`would shrink   ${label}  (${width}x${height}, ${kb(before)})`);
      results.shrunk++;
      results.bytesBefore += before;
      continue;
    }

    // sharp cannot read and write the same path in one pass, so stage via a temp file.
    const temp = filePath + '.tmp';
    await sharp(filePath)
      .resize({ width: maxEdge, height: maxEdge, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(temp);
    await rename(temp, filePath);

    const after = (await stat(filePath)).size;
    console.log(
      `${label.padEnd(46)} ${kb(before).padStart(8)} -> ${kb(after).padStart(7)}  (-${Math.round((1 - after / before) * 100)}%, resized)`
    );
    results.shrunk++;
    results.bytesBefore += before;
    results.bytesAfter += after;
    continue;
  }

  const target = filePath.slice(0, -ext.length) + '.webp';
  if (await exists(target)) {
    results.skipped++;
    continue;
  }

  const before = (await stat(filePath)).size;

  if (dryRun) {
    console.log(`would convert  ${label}  (${kb(before)})`);
    results.converted++;
    results.bytesBefore += before;
    continue;
  }

  // withoutEnlargement keeps already-small assets (logos, icons) at their native size.
  await sharp(filePath)
    .rotate()
    .resize({
      width: maxEdgeFor(filePath),
      height: maxEdgeFor(filePath),
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality: QUALITY, effort: 5 })
    .toFile(target);

  const after = (await stat(target)).size;
  if (!keepOriginals) await unlink(filePath);

  const saved = Math.round((1 - after / before) * 100);
  console.log(`${label.padEnd(46)} ${kb(before).padStart(8)} -> ${kb(after).padStart(7)}  (-${saved}%)`);

  results.converted++;
  results.bytesBefore += before;
  results.bytesAfter += after;
}

const touched = results.converted + results.shrunk;

console.log('\n' + '-'.repeat(70));
if (results.skipped) console.log(`${results.skipped} file(s) already optimized, skipped.`);
if (touched === 0) {
  console.log('Nothing to do — every image is already WebP and within size limits.');
} else if (dryRun) {
  console.log(
    `${results.converted} to convert, ${results.shrunk} to shrink (${kb(results.bytesBefore)} of source).`
  );
} else {
  const saved = Math.round((1 - results.bytesAfter / results.bytesBefore) * 100);
  console.log(
    `Optimized ${touched} file(s) — ${results.converted} converted, ${results.shrunk} resized: ` +
      `${kb(results.bytesBefore)} -> ${kb(results.bytesAfter)} (-${saved}%)`
  );
  if (keepOriginals) console.log('Originals kept (--keep).');
}
