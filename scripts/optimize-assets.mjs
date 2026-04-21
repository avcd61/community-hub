#!/usr/bin/env node
/* eslint-disable */
// Converts src/assets/*.{png,jpg,jpeg,gif} to optimized formats:
//  - PNG/JPG -> WebP (q82)
//  - GIF     -> WebM (VP9) + MP4 (H.264) + thumbnail WebP
// Only touches top-level files in src/assets (leaves /music and /sada alone).
// Files are written alongside originals. Originals are NOT deleted;
// callers decide when to remove them after imports are updated.

import { readdir, stat, mkdir } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const ASSETS = path.join(ROOT, 'src/assets');

const IMG_EXT = new Set(['.png', '.jpg', '.jpeg']);
const GIF_EXT = new Set(['.gif']);

async function main() {
  const entries = await readdir(ASSETS, { withFileTypes: true });
  const tasks = [];
  for (const e of entries) {
    if (!e.isFile()) continue;
    const full = path.join(ASSETS, e.name);
    const ext = path.extname(e.name).toLowerCase();
    if (IMG_EXT.has(ext)) tasks.push(convertImage(full));
    else if (GIF_EXT.has(ext)) tasks.push(convertGif(full));
  }
  await Promise.all(tasks);
  console.log('Done.');
}

async function convertImage(filePath) {
  const outWebp = filePath.replace(/\.(png|jpe?g)$/i, '.webp');
  const inSize = (await stat(filePath)).size;
  try {
    await sharp(filePath)
      .webp({ quality: 82, effort: 5 })
      .toFile(outWebp);
    const outSize = (await stat(outWebp)).size;
    console.log(
      `[webp] ${path.basename(filePath)} ${fmt(inSize)} -> ${path.basename(outWebp)} ${fmt(outSize)} (${pct(inSize, outSize)})`
    );
  } catch (err) {
    console.error(`[webp] FAILED ${filePath}: ${err.message}`);
  }
}

async function convertGif(filePath) {
  const base = filePath.replace(/\.gif$/i, '');
  const outMp4 = `${base}.mp4`;
  const outWebm = `${base}.webm`;
  const outPoster = `${base}.webp`;
  const inSize = (await stat(filePath)).size;

  // MP4 (H.264) — pad to even dims
  const ffMp4 = spawnSync(
    'ffmpeg',
    [
      '-y',
      '-i',
      filePath,
      '-movflags',
      '+faststart',
      '-pix_fmt',
      'yuv420p',
      '-vf',
      "scale=trunc(iw/2)*2:trunc(ih/2)*2",
      '-an',
      '-vcodec',
      'libx264',
      '-crf',
      '23',
      '-preset',
      'veryslow',
      outMp4,
    ],
    { encoding: 'utf8' }
  );
  if (ffMp4.status !== 0) {
    console.error(`[mp4] FAILED ${filePath}:`, ffMp4.stderr?.slice(-400));
  } else {
    const s = (await stat(outMp4)).size;
    console.log(
      `[mp4]  ${path.basename(filePath)} ${fmt(inSize)} -> ${path.basename(outMp4)} ${fmt(s)} (${pct(inSize, s)})`
    );
  }

  // WebM (VP9) for better quality at small size
  const ffWebm = spawnSync(
    'ffmpeg',
    [
      '-y',
      '-i',
      filePath,
      '-c:v',
      'libvpx-vp9',
      '-b:v',
      '0',
      '-crf',
      '34',
      '-pix_fmt',
      'yuv420p',
      '-vf',
      "scale=trunc(iw/2)*2:trunc(ih/2)*2",
      '-an',
      '-row-mt',
      '1',
      outWebm,
    ],
    { encoding: 'utf8' }
  );
  if (ffWebm.status !== 0) {
    console.error(`[webm] FAILED ${filePath}:`, ffWebm.stderr?.slice(-400));
  } else {
    const s = (await stat(outWebm)).size;
    console.log(
      `[webm] ${path.basename(filePath)} ${fmt(inSize)} -> ${path.basename(outWebm)} ${fmt(s)} (${pct(inSize, s)})`
    );
  }

  // Poster: first-frame webp
  try {
    await sharp(filePath, { animated: false })
      .webp({ quality: 80 })
      .toFile(outPoster);
  } catch {
    // Some gifs are tricky in sharp; fallback to ffmpeg
    spawnSync('ffmpeg', ['-y', '-i', filePath, '-vframes', '1', outPoster]);
  }
}

function fmt(b) {
  if (b > 1024 * 1024) return `${(b / (1024 * 1024)).toFixed(1)}MB`;
  return `${(b / 1024).toFixed(0)}KB`;
}
function pct(a, b) {
  if (a === 0) return '0%';
  return `${(((a - b) / a) * 100).toFixed(0)}% smaller`;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
