import { chromium } from '../node_modules/playwright/index.mjs';
import path from 'node:path';
import fs from 'node:fs';
import { pathToFileURL, fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.join(__dirname, 'index.html');
const outDir = path.join(__dirname, 'stills');
fs.mkdirSync(outDir, { recursive: true });

// Complete 12-still review sequence covering F1 through F13 of Version 2!
const FRAMES = [
  { f: 38,  tag: '01_f38_hi_buckle' },
  { f: 84,  tag: '02_f84_icons_orbit' },
  { f: 100, tag: '03_f100_icons_sucked_in' },
  { f: 134, tag: '04_f134_line_draws_pill' },
  { f: 162, tag: '05_f162_send_drops_in' },
  { f: 196, tag: '06_f196_hi_maya_greeting' },
  { f: 282, tag: '07_f282_question_send_click' },
  { f: 336, tag: '08_f336_chat_ui_reveal' },
  { f: 366, tag: '09_f366_buckle_thinks' },
  { f: 430, tag: '10_f430_three_districts_answer' },
  { f: 476, tag: '11_f476_yes_buckle_zoom_send' },
  { f: 504, tag: '12_f504_work_buddy' },
  { f: 548, tag: '13_f548_buckledin_logo' },
];

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({
    viewport: { width: 1080, height: 1080 },
    deviceScaleFactor: 1,
  });
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'load' });
  await page.evaluate(async () => {
    await document.fonts.ready;
    const imgs = Array.from(document.querySelectorAll('img'));
    await Promise.all(imgs.map((img) => img.complete ? Promise.resolve() : new Promise((r) => { img.onload = r; img.onerror = r; })));
  });

  for (const { f, tag } of FRAMES) {
    await page.evaluate((frame) => window.seek(frame), f);
    await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
    const outPath = path.join(outDir, `${tag}.png`);
    await page.screenshot({ path: outPath, type: 'png' });
    console.log(`rendered ${tag}.png`);
  }
} finally {
  await browser.close();
}
