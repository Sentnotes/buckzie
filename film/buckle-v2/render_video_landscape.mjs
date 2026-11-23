import { chromium } from '../node_modules/playwright/index.mjs';
import { execFileSync, spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const ffmpeg = require('../node_modules/ffmpeg-static');

const DIR = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(DIR, 'buckle');
fs.mkdirSync(OUT_DIR, { recursive: true });

const BG_TRACK = path.join(DIR, 'assets', 'bg-track.mp3');
const SFX_WAV = path.join(OUT_DIR, '_sfx_land.wav');
const MIX_WAV = path.join(OUT_DIR, '_mix_land.wav');
const FINAL_MP4 = path.join(OUT_DIR, 'buckle-v2-landscape.mp4');

const FPS_NUM = 60000;
const FPS_DEN = 1001;
const FPS = FPS_NUM / FPS_DEN;
const TOTAL_FRAMES = 1140;
const DURATION = TOTAL_FRAMES / FPS;
const SR = 48000;
const STILLS_ONLY = process.argv.includes('--stills');

function synthesizeSfxWav(outPath) {
  const numSamples = Math.ceil((DURATION + 0.5) * SR);
  const L = new Float32Array(numSamples);
  const R = new Float32Array(numSamples);
  let seed = 133742;
  const rand = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  const SFX_GAIN = 0.82 * 1.25;

  function addFeltKey(tSec, pan = 0) {
    const start = Math.floor(tSec * SR);
    const dur = Math.floor(0.032 * SR);
    const jitter = 0.92 + rand() * 0.16;
    const f0 = 280 * jitter, f1 = 115 * jitter;
    const rc = 1 / (2 * Math.PI * 700), dt = 1 / SR, alpha = dt / (rc + dt);
    let lp = 0, phase = 0;
    const gL = Math.cos((pan + 1) * Math.PI * 0.25), gR = Math.sin((pan + 1) * Math.PI * 0.25);
    for (let i = 0; i < dur; i++) {
      const idx = start + i;
      if (idx < 0 || idx >= numSamples) continue;
      const t = i / SR;
      const freq = f0 * Math.pow(f1 / f0, Math.min(1, t / 0.016));
      phase += (2 * Math.PI * freq) / SR;
      lp += alpha * (Math.sin(phase) - lp);
      const env = t < 0.0025 ? (t / 0.0025) : Math.exp(-(t - 0.0025) / 0.0055);
      const val = lp * env * 0.22 * SFX_GAIN;
      L[idx] += val * gL; R[idx] += val * gR;
    }
  }

  function addSoftClick(tSec) {
    const start = Math.floor(tSec * SR), dur = Math.floor(0.048 * SR);
    let phase = 0;
    for (let i = 0; i < dur; i++) {
      const idx = start + i;
      if (idx < 0 || idx >= numSamples) continue;
      const t = i / SR;
      phase += (2 * Math.PI * 540 * Math.pow(210 / 540, Math.min(1, t / 0.028))) / SR;
      const env = t < 0.003 ? (t / 0.003) : Math.exp(-(t - 0.003) / 0.009);
      const val = Math.sin(phase) * env * 0.28 * SFX_GAIN;
      L[idx] += val; R[idx] += val;
    }
  }

  function addSoftWhoosh(tSec, durSec = 0.42) {
    const start = Math.floor(tSec * SR), dur = Math.floor(durSec * SR);
    let b0 = 0, b1 = 0, b2 = 0, low = 0, band = 0;
    for (let i = 0; i < dur; i++) {
      const idx = start + i;
      if (idx < 0 || idx >= numSamples) continue;
      const p = i / dur, w = rand() * 2 - 1;
      b0 = 0.997 * b0 + w * 0.029; b1 = 0.985 * b1 + w * 0.032; b2 = 0.950 * b2 + w * 0.048;
      const pink = (b0 + b1 + b2) * 0.55;
      const fc = p < 0.45 ? 240 * Math.pow(680 / 240, p / 0.45) : 680 * Math.pow(260 / 680, (p - 0.45) / 0.55);
      const f = 2 * Math.sin(Math.PI * Math.min(fc, 4000) / SR), q = 1 / 1.4;
      const high = pink - low - q * band;
      band += f * high; low += f * band;
      const env = p < 0.4 ? (p / 0.4) : Math.pow(1 - (p - 0.4) / 0.6, 2.2);
      const val = band * env * 0.32 * SFX_GAIN;
      L[idx] += val; R[idx] += val;
    }
  }

  function addSoftChime(tSec, notes) {
    notes.forEach((freq, nIdx) => {
      const start = Math.floor((tSec + nIdx * 0.09) * SR), dur = Math.floor(0.68 * SR);
      for (let i = 0; i < dur; i++) {
        const idx = start + i;
        if (idx < 0 || idx >= numSamples) continue;
        const t = i / SR;
        const env = t < 0.015 ? (t / 0.015) : Math.exp(-(t - 0.015) / 0.16);
        const val = Math.sin(2 * Math.PI * freq * t) * env * 0.15 * SFX_GAIN;
        L[idx] += val; R[idx] += val;
      }
    });
  }

  addSoftWhoosh(0.25, 0.36);
  addSoftWhoosh(3.05, 0.48);
  addSoftClick(5.15);
  for (let i = 0; i < 28; i++) addFeltKey(7.07 + i * 0.066 + rand() * 0.01, (rand() - 0.5) * 0.25);
  addSoftClick(9.48);
  addSoftWhoosh(9.85, 0.45);
  addSoftChime(12.85, [440, 554.37]);
  for (let i = 0; i < 11; i++) addFeltKey(14.95 + i * 0.062, (rand() - 0.5) * 0.2);
  addSoftClick(15.92);
  addSoftWhoosh(16.20, 0.38);
  addSoftChime(17.55, [523.25, 659.25, 783.99]);

  const dataSize = numSamples * 4;
  const buf = Buffer.alloc(44 + dataSize);
  buf.write('RIFF', 0); buf.writeUInt32LE(36 + dataSize, 4); buf.write('WAVE', 8);
  buf.write('fmt ', 12); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20);
  buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28);
  buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34); buf.write('data', 36);
  buf.writeUInt32LE(dataSize, 40);

  let offset = 44;
  for (let i = 0; i < numSamples; i++) {
    buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, Math.tanh(L[i]))) * 32767), offset);
    buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, Math.tanh(R[i]))) * 32767), offset + 2);
    offset += 4;
  }
  fs.writeFileSync(outPath, buf);
}

function mixAudio() {
  synthesizeSfxWav(SFX_WAV);
  const volExpr = `0.42*if(between(t,6.95,9.15)+between(t,14.80,15.80),0.58,1.0)`;
  const filterComplex = [
    `[0:a]atrim=start=108.2:duration=19.05,asetpts=PTS-STARTPTS,apad=whole_dur=19.05,afade=t=in:st=0:d=0.55,afade=t=out:st=18.1:d=0.95,volume='${volExpr}':eval=frame[bg]`,
    `[1:a]atrim=duration=19.05,asetpts=PTS-STARTPTS[sfx]`,
    `[bg][sfx]amix=inputs=2:duration=longest:normalize=0,alimiter=limit=0.95[out]`
  ].join(';');

  execFileSync(ffmpeg, [
    '-y', '-i', BG_TRACK, '-i', SFX_WAV,
    '-filter_complex', filterComplex, '-map', '[out]',
    '-ar', '48000', '-ac', '2', MIX_WAV
  ], { stdio: 'inherit' });
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
  });

  const url = 'file:///' + path.join(DIR, 'index-landscape.html').replace(/\\/g, '/');
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);

  if (STILLS_ONLY) {
    const checkDir = path.join(DIR, 'stills-landscape');
    fs.mkdirSync(checkDir, { recursive: true });
    for (const [name, f] of [['f38_hi.png', 38], ['f282_send.png', 282], ['f430_answer.png', 430], ['f476_zoom.png', 476]]) {
      await page.evaluate(frame => window.seek(frame), f);
      await page.screenshot({ path: path.join(checkDir, name) });
      console.log('Saved verification still:', name);
    }
    await browser.close();
    return;
  }

  mixAudio();

  const ff = spawn(ffmpeg, [
    '-y', '-f', 'image2pipe', '-vcodec', 'png', '-framerate', '60000/1001', '-i', 'pipe:0',
    '-i', MIX_WAV,
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '17', '-preset', 'medium', '-r', '60000/1001',
    '-c:a', 'aac', '-b:a', '192k', '-ar', '48000',
    '-shortest', '-movflags', '+faststart',
    FINAL_MP4,
  ], { stdio: ['pipe', 'inherit', 'inherit'] });

  const ffDone = new Promise((resolve, reject) => {
    ff.on('close', code => (code === 0 ? resolve() : reject(new Error(`ffmpeg exited ${code}`))));
    ff.on('error', reject);
  });

  const tStart = Date.now();
  for (let i = 0; i < TOTAL_FRAMES; i++) {
    await page.evaluate(frame => window.seek(frame), i * 0.5);
    const png = await page.screenshot({ type: 'png' });
    if (!ff.stdin.write(png)) await new Promise(res => ff.stdin.once('drain', res));
    if ((i + 1) % 190 === 0 || i === TOTAL_FRAMES - 1) {
      console.log(`Captured ${i + 1}/${TOTAL_FRAMES} (${Math.round(((i + 1) / TOTAL_FRAMES) * 100)}%) in ${((Date.now() - tStart) / 1000).toFixed(1)}s`);
    }
  }

  ff.stdin.end();
  await ffDone;
  await browser.close();

  try { fs.unlinkSync(SFX_WAV); } catch {}
  try { fs.unlinkSync(MIX_WAV); } catch {}

  const stats = fs.statSync(FINAL_MP4);
  console.log(`\nDONE! Saved ${FINAL_MP4} (${(stats.size / (1024 * 1024)).toFixed(2)} MB)`);
}

main().catch(err => { console.error(err); process.exit(1); });
