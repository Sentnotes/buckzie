import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Volume2, Search, FileText } from 'lucide-react';

/* ──────────────────────────────────────────────────────────────────────────
   Briefings — one shape, never cut.
   120 BPM · 7 bars · 28 beats · 14.0 s loop. Every pixel is a pure function
   of time computed in seek(t): no CSS transitions, no timers, no carried state.
   ────────────────────────────────────────────────────────────────────────── */

const LOOP = 14;
const STAGE = 720; // logical square canvas
const ACCENT = '#0267CE';
const INK = '#121316';
const CANVAS = '#ECEAE6';
const C_INK = [18, 19, 22];
const C_BLUE = [2, 103, 206];
const C_WHITE = [255, 255, 255];
const FONT = '"Geist", "Neue Haas Grotesk", system-ui, sans-serif';
const MONO = '"Geist Mono", ui-monospace, SFMono-Regular, monospace';

/* ── Springs ─────────────────────────────────────────────────────────────── */

// Closed-form unit step response of a damped spring.
function step(dt, w, z) {
  if (dt <= 0) return 0;
  const x = w * dt;
  if (x > 60) return 1;
  if (z >= 1) return 1 - Math.exp(-x) * (1 + x);
  const wd = Math.sqrt(1 - z * z);
  return 1 - Math.exp(-z * x) * (Math.cos(wd * x) + (z / wd) * Math.sin(wd * x));
}

// Periodic sum of springs: one spring per target change, so value(t) stays a
// pure function of t and value(0) === value(LOOP), velocity included.
// kf: [time, value, omega?, zeta?]
function track(t, kf, w = 17, z = 0.82) {
  const n = kf.length;
  let v = kf[n - 1][1];
  for (let i = 0; i < n; i++) {
    const d = kf[i][1] - kf[(i - 1 + n) % n][1];
    if (d === 0) continue;
    const wi = kf[i][2] ?? w;
    const zi = kf[i][3] ?? z;
    v += d * (step(t - kf[i][0], wi, zi) + step(t - kf[i][0] + LOOP, wi, zi));
  }
  return v;
}

const clamp01 = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);
const smooth = (x) => {
  const c = clamp01(x);
  return c * c * (3 - 2 * c);
};
const mod = (a, n) => ((a % n) + n) % n;

// Content visibility inside a periodic window, with its own enter/exit timing
// so swapped text never overlaps mid-morph.
function layer(t, start, end, delay = 0.08, enter = 0.2, exit = 0.1) {
  const dur = mod(end - start, LOOP) || LOOP;
  const u = mod(t - start, LOOP);
  if (u >= dur + exit) return null;
  const e = smooth((u - delay) / enter);
  const x = u > dur ? smooth((u - dur) / exit) : 0;
  const a = e * (1 - x);
  if (a <= 0.002) return null;
  return { a, blur: (1 - e) * 8 + x * 8 };
}

/* ── Timeline ────────────────────────────────────────────────────────────── */

const SHAPES = [
  { t: 1.0, w: 56, h: 56, r: 28, c: C_INK }, // loader
  { t: 1.5, w: 56, h: 56, r: 28, c: C_BLUE }, // check
  { t: 2.0, w: 300, h: 52, r: 26, c: C_INK }, // dynamic island
  { t: 2.5, w: 340, h: 156, r: 28, c: C_INK }, // player
  { t: 5.5, w: 320, h: 64, r: 32, c: C_WHITE }, // volume slider
  { t: 7.5, w: 128, h: 72, r: 36, c: C_WHITE }, // toggle (off)
  { t: 8.0, w: 128, h: 72, r: 36, c: C_BLUE }, // toggle (on)
  { t: 8.5, w: 380, h: 64, r: 32, c: C_WHITE }, // tabs
  { t: 10.0, w: 440, h: 320, r: 28, c: C_WHITE }, // chart
  { t: 11.5, w: 112, h: 64, r: 22, c: C_INK }, // ⌘K
  { t: 12.0, w: 420, h: 246, r: 22, c: C_WHITE }, // palette (4 results)
  { t: 12.1, w: 420, h: 202, r: 22, c: C_WHITE }, // 3 results
  { t: 12.2, w: 420, h: 158, r: 22, c: C_WHITE }, // 2 results
  { t: 12.5, w: 280, h: 52, r: 26, c: C_INK }, // toast (opening)
  { t: 13.0, w: 320, h: 52, r: 26, c: C_INK }, // toast (saved)
  { t: 13.5, w: 220, h: 56, r: 28, c: C_INK }, // button
];

const KF_W = SHAPES.map((s) => [s.t, s.w]);
const KF_H = SHAPES.map((s) => [s.t, s.h]);
const KF_R = SHAPES.map((s) => [s.t, s.r]);
const KF_C = [0, 1, 2].map((ch) => SHAPES.map((s) => [s.t, s.c[ch]]));
// Camera zooms so every state fills the frame.
const KF_CAM = SHAPES.map((s) => [s.t, Math.min(2, 446 / s.w, 360 / s.h)]);

const STATE_LIST = [
  { t: 13.5, label: 'Button' },
  { t: 1.0, label: 'Loader' },
  { t: 1.5, label: 'Check' },
  { t: 2.0, label: 'Dynamic island' },
  { t: 2.5, label: 'Player' },
  { t: 4.0, label: 'Scrub' },
  { t: 5.5, label: 'Volume' },
  { t: 7.5, label: 'Toggle' },
  { t: 8.5, label: 'Tabs' },
  { t: 10.0, label: 'Chart' },
  { t: 11.5, label: '⌘K search' },
  { t: 12.5, label: 'Toast' },
];

// Cursor path in stage-local coords (origin = canvas centre).
const CURSOR = [
  [0.1, 34, 6], // onto Subscribe
  [0.85, 84, 64],
  [2.55, 130, -36], // play
  [3.45, -82, 34], // progress knob
  [4.05, -20, 34], // scrub…
  [4.5, 70, 34], // …scrub
  [5.1, 96, 74],
  [5.6, 11, 0], // volume knob
  [6.05, 120, 0], // drag…
  [6.5, 200, 2], // …past max
  [7.05, 150, 44],
  [7.55, -24, 6], // toggle
  [8.55, 4, 8], // tab 2
  [9.05, 124, 8], // tab 3
  [10.1, 68, 52], // hover Aug
  [10.65, 168, -4], // hover Oct
  [11.25, 150, 130], // rest
];
const KF_CX = CURSOR.map(([t, x]) => [t, x]);
const KF_CY = CURSOR.map(([t, , y]) => [t, y]);
const KF_PRESS = [
  [0.5, 0.84], [0.62, 1],
  [3.0, 0.84], [3.12, 1],
  [4.0, 0.84], [5.0, 1],
  [6.0, 0.84], [7.0, 1],
  [8.0, 0.84], [8.12, 1],
  [9.0, 0.84], [9.12, 1],
  [9.5, 0.84], [9.62, 1],
];

// Toggle knob → liquid tab indicator. Leading edge rides a fast spring,
// trailing edge a slow one, so the shape stretches ahead of itself.
const FAST = [24, 0.86];
const SLOW = [13, 0.9];
const TAB_L = [-184, -61.33, 61.33];
const TAB_R = [-61.33, 61.33, 184];
const KF_KL = [
  [8.0, -2, ...SLOW],
  [8.5, TAB_L[0], ...FAST],
  [9.0, TAB_L[1], ...SLOW],
  [9.5, TAB_L[2], ...SLOW],
  [13.6, -58],
];
const KF_KR = [
  [8.0, 58, ...FAST],
  [8.5, TAB_R[0], ...SLOW],
  [9.0, TAB_R[1], ...FAST],
  [9.5, TAB_R[2], ...FAST],
  [13.6, 2],
];
const KF_KH = [[8.5, 52], [13.6, 60]];
const KF_ROWY = [[10.0, -128], [13.6, 0]];
const KF_KC = [0, 1, 2].map((ch) => [[8.0, C_WHITE[ch]], [8.5, C_INK[ch]]]);
const TABS = ['Overview', 'Districts', 'Safety'];

// Player
const KF_PLAY = [[3.0, 1, 22, 1], [5.6, 0, 22, 1]];
const KF_PLAYPRESS = [[3.0, 0.88], [3.12, 1]];
const KF_SHAPEPRESS = [[0.5, 0.965], [0.62, 1]];
const TRACK_W = 304;
const TOTAL_SEC = 252;

// Chart
const MONTHS = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
const VALUES = [94.1, 95.0, 94.6, 96.2, 97.1, 96.8, 98.6, 99.4];
const PTS = VALUES.map((v, i) => [-186 + i * 50, 128 - ((v - 93) / 7) * 150]);
const KF_TX = [[10.0, PTS[5][0]], [11.0, PTS[7][0]]];
const KF_TY = [[10.0, PTS[5][1]], [11.0, PTS[7][1]]];
const CHART_PATH = (() => {
  const f = (n) => n.toFixed(1);
  let d = `M ${f(PTS[0][0])} ${f(PTS[0][1])}`;
  for (let i = 0; i < PTS.length - 1; i++) {
    const p0 = PTS[i - 1] || PTS[i];
    const p1 = PTS[i];
    const p2 = PTS[i + 1];
    const p3 = PTS[i + 2] || p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${f(c1[0])} ${f(c1[1])}, ${f(c2[0])} ${f(c2[1])}, ${f(p2[0])} ${f(p2[1])}`;
  }
  return d;
})();

// ⌘K palette
const ITEMS = [
  { title: 'Safety: Guardian Shield 3.0', meta: '#27' },
  { title: 'District partnerships, Q3', meta: '#28' },
  { title: 'Safety: 19-point vetting', meta: '#26' },
  { title: 'Family intake guide', meta: '#24' },
];
const KEYS = [[12.1, 's'], [12.2, 'sa'], [12.3, 'saf'], [12.4, 'safe']];
const ITEM_META = ITEMS.map((it, i) => {
  let removeAt = null;
  const idxKf = [[11.6, i]];
  KEYS.forEach(([kt, q]) => {
    const visible = ITEMS.filter((x) => x.title.toLowerCase().includes(q));
    const j = visible.indexOf(it);
    if (j < 0) {
      if (removeAt === null) removeAt = kt;
    } else {
      idxKf.push([kt, j]);
    }
  });
  return { removeAt, idxKf };
});

/* ── seek(t): the whole frame as a pure function of time ─────────────────── */

function seek(t) {
  const f = { t };

  // Cursor
  f.cx = track(t, KF_CX, 16, 1);
  f.cy = track(t, KF_CY, 16, 1);
  f.press = track(t, KF_PRESS, 30, 1);

  // Progress scrub (direct manipulation while held, then continues playing)
  const pAt = (cx) => clamp01((cx + 152) / TRACK_W);
  if (t < 3.0) f.progress = 0.18;
  else if (t < 4.0) f.progress = 0.18 + 0.05 * (t - 3.0);
  else if (t < 5.0) f.progress = pAt(f.cx);
  else f.progress = pAt(track(5.0, KF_CX, 16, 1)) + 0.05 * (t - 5.0);
  f.knobSize = t >= 4.0 && t < 5.0 ? 18 : 14;

  // Volume: drag past max stretches the shape; on release it springs back
  // from wherever it was.
  const MAXS = 56;
  const stretchAt = (cx) => MAXS * (1 - Math.exp(-Math.max(0, cx - 110) / 70));
  f.volume = 0.55;
  f.stretch = 0;
  if (t >= 6.0 && t < 7.0) {
    f.volume = clamp01((f.cx + 110) / 220);
    f.stretch = stretchAt(f.cx);
  } else if (t >= 7.0 && t < 7.9) {
    f.volume = 1;
    f.stretch = stretchAt(track(7.0, KF_CX, 16, 1)) * (1 - step(t - 7.0, 20, 0.74));
  }

  // The one shape
  f.w = track(t, KF_W) + f.stretch;
  f.h = track(t, KF_H);
  f.r = Math.max(0, track(t, KF_R));
  f.offX = f.stretch / 2; // left edge stays pinned while stretching
  f.color = KF_C.map((kf) => Math.max(0, Math.min(255, track(t, kf, 22, 1))));
  f.lum = (f.color[0] + f.color[1] + f.color[2]) / 765;
  f.shapeScale = track(t, KF_SHAPEPRESS, 28, 0.9);
  f.cam = track(t, KF_CAM, 9, 1);

  // Knob / tab indicator
  f.kl = track(t, KF_KL);
  f.kr = track(t, KF_KR);
  f.kh = track(t, KF_KH, 18, 0.9);
  f.rowY = track(t, KF_ROWY, 15, 0.88);
  f.kc = KF_KC.map((kf) => Math.max(0, Math.min(255, track(t, kf, 22, 1))));

  // Player
  f.play = clamp01(track(t, KF_PLAY));
  f.playPress = track(t, KF_PLAYPRESS, 30, 0.9);

  // Chart
  f.draw = step(t - 10.05, 7.5, 1);
  f.tx = track(t, KF_TX, 15, 0.9);
  f.ty = track(t, KF_TY, 15, 0.9);
  f.tipA = smooth((t - 10.5) / 0.15);
  f.tipSwap = smooth((t - 11.02) / 0.14);

  // Palette
  f.query = '';
  KEYS.forEach(([kt, q]) => {
    if (t >= kt && t < 12.6) f.query = q;
  });
  f.items = ITEM_META.map((m) => ({
    y: track(t, m.idxKf, 20, 0.86),
    a: m.removeAt !== null && t >= m.removeAt ? 1 - smooth((t - m.removeAt) / 0.12) : 1,
  }));
  f.invert = smooth((t - 12.42) / 0.07);

  // Layers (each with its own enter/exit)
  f.L = {
    button: layer(t, 13.5, 1.0),
    loader: layer(t, 1.0, 1.5, 0.06, 0.14),
    check: layer(t, 1.5, 2.0, 0.04, 0.12),
    island: layer(t, 2.0, 2.5),
    player: layer(t, 2.5, 5.5),
    slider: layer(t, 5.5, 7.5),
    knob: layer(t, 7.5, 11.5),
    tabs: layer(t, 8.5, 11.5),
    chart: layer(t, 10.0, 11.5, 0.12, 0.24),
    chip: layer(t, 11.5, 12.0),
    palette: layer(t, 12.0, 12.5, 0.08, 0.16),
    toastA: layer(t, 12.5, 13.0),
    toastB: layer(t, 13.0, 13.5),
  };
  return f;
}

/* ── Small helpers ───────────────────────────────────────────────────────── */

const rgb = (c) => `rgb(${c[0] | 0}, ${c[1] | 0}, ${c[2] | 0})`;
const fmt = (sec) => `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, '0')}`;
const lerp = (a, b, m) => a + (b - a) * m;

function Content({ lay, w, h, W, H, anchor = 'center', className = '', style, children }) {
  if (!lay) return null;
  const left = anchor === 'left' ? 0 : (w - W) / 2;
  const top = anchor === 'top' ? 0 : (h - H) / 2;
  return (
    <div
      className={`absolute ${className}`}
      style={{
        left,
        top,
        width: W,
        height: H,
        opacity: lay.a,
        filter: lay.blur > 0.05 ? `blur(${lay.blur.toFixed(2)}px)` : 'none',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function PlayPauseIcon({ m }) {
  const P = (a, b) => `${lerp(a[0], b[0], m).toFixed(2)},${lerp(a[1], b[1], m).toFixed(2)}`;
  const left = [[3, 1], [9, 4.5], [9, 11.5], [3, 15]];
  const leftP = [[3, 1], [7, 1], [7, 15], [3, 15]];
  const right = [[9, 4.5], [15, 8], [15, 8], [9, 11.5]];
  const rightP = [[10, 1], [14, 1], [14, 15], [10, 15]];
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <polygon points={left.map((p, i) => P(p, leftP[i])).join(' ')} fill={INK} strokeLinejoin="round" />
      <polygon points={right.map((p, i) => P(p, rightP[i])).join(' ')} fill={INK} strokeLinejoin="round" />
    </svg>
  );
}

function Spinner({ t, color = '#FFFFFF', size = 22 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ transform: `rotate(${(t * 720) % 360}deg)` }}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" stroke={color} strokeOpacity="0.22" strokeWidth="2" />
      <path d="M12 3a9 9 0 0 1 9 9" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function DrawnCheck({ p, size = 24, color = '#FFFFFF' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12.5l4.5 4.5L19 7.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset={(1 - p).toFixed(3)}
      />
    </svg>
  );
}

function highlight(title, q) {
  if (!q) return title;
  const i = title.toLowerCase().indexOf(q);
  if (i < 0) return title;
  return (
    <>
      {title.slice(0, i)}
      <span style={{ color: ACCENT }}>{title.slice(i, i + q.length)}</span>
      {title.slice(i + q.length)}
    </>
  );
}

/* ── Component ───────────────────────────────────────────────────────────── */

export default function BriefingsMorphShowcase() {
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(true);
  const [fit, setFit] = useState(0.8);
  const tRef = useRef(0);
  const stageRef = useRef(null);

  // Respect reduced motion: start paused on a readable frame.
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      tRef.current = 3.4;
      setT(3.4);
      setPlaying(false);
    }
  }, []);

  // Fit the 720×720 logical stage into its container.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return undefined;
    const update = () => setFit(el.clientWidth / STAGE);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.05,
    });
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  // Clock: the only thing that advances is t.
  useEffect(() => {
    if (!playing || !inView) return undefined;
    const start = performance.now();
    const base = tRef.current;
    let id;
    const loop = (now) => {
      const nt = mod(base + (now - start) / 1000, LOOP);
      tRef.current = nt;
      setT(nt);
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, [playing, inView]);

  const seekTo = (v) => {
    const nt = mod(v, LOOP);
    tRef.current = nt;
    setT(nt);
    setPlaying(false);
  };

  const f = seek(t);
  const { L, w, h } = f;
  const beatIdx = Math.floor(t / 0.5);
  const activeState = STATE_LIST.reduce((best, s) =>
    mod(t - s.t, LOOP) < mod(t - best.t, LOOP) ? s : best
  );

  const shapeLeft = STAGE / 2 - w / 2 + f.offX;
  const shapeTop = STAGE / 2 - h / 2;
  const dark = f.lum < 0.6;

  // Toggle knob / indicator in shape coords
  const knobW = Math.max(8, f.kr - f.kl);
  const knobLeft = f.kl + w / 2;
  const knobTop = f.rowY + h / 2 - f.kh / 2;
  const rowLeft = -184 + w / 2;
  const rowTop = f.rowY + h / 2 - 26;
  const clipL = Math.max(0, f.kl + 184);
  const clipR = Math.max(0, 368 - (f.kr + 184));

  // Volume geometry (slider is anchored to its left edge)
  const trackLen = 220 + f.stretch;
  const fill = f.volume < 1 ? f.volume * 220 : trackLen;

  // Palette
  const inv = f.invert;

  return (
    <div
      ref={stageRef}
      className="relative w-full aspect-square rounded-[28px] overflow-hidden select-none"
      style={{ backgroundColor: CANVAS }}
      aria-label="Animated briefing interface demo"
      role="img"
    >
      <div
        className="absolute left-0 top-0"
        style={{
          width: STAGE,
          height: STAGE,
          transform: `scale(${fit})`,
          transformOrigin: '0 0',
          fontFamily: FONT,
        }}
      >
                {/* Camera */}
                <div
                  className="absolute inset-0"
                  style={{ transform: `scale(${f.cam.toFixed(4)})`, transformOrigin: '50% 50%' }}
                >
                  {/* THE shape */}
                  <div
                    className="absolute overflow-hidden"
                    style={{
                      left: shapeLeft,
                      top: shapeTop,
                      width: w,
                      height: h,
                      borderRadius: Math.min(f.r, h / 2, w / 2),
                      backgroundColor: rgb(f.color),
                      transform: `scale(${f.shapeScale.toFixed(4)})`,
                      boxShadow: `0 0 0 1px rgba(18,19,22,${(0.08 * f.lum).toFixed(3)}), 0 14px 34px -14px rgba(18,19,22,${(
                        0.22 + 0.14 * (1 - f.lum)
                      ).toFixed(3)})`,
                    }}
                  >
                    {/* 1 · Button */}
                    <Content lay={L.button} w={w} h={h} W={220} H={56} className="flex items-center justify-center gap-2 text-white">
                      <span className="text-[15px] font-medium tracking-[-0.01em] whitespace-nowrap">Subscribe to briefings</span>
                      <ArrowRight size={16} strokeWidth={2} />
                    </Content>

                    {/* 2 · Loader */}
                    <Content lay={L.loader} w={w} h={h} W={56} H={56} className="flex items-center justify-center">
                      <Spinner t={t} />
                    </Content>

                    {/* 3 · Check */}
                    <Content lay={L.check} w={w} h={h} W={56} H={56} className="flex items-center justify-center">
                      <DrawnCheck p={step(t - 1.56, 14, 1)} size={26} />
                    </Content>

                    {/* 4 · Dynamic island */}
                    <Content lay={L.island} w={w} h={h} W={300} H={52} className="flex items-center justify-between pl-[10px] pr-4 text-white">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0" style={{ backgroundColor: ACCENT }}>
                          28
                        </span>
                        <div className="leading-tight min-w-0">
                          <div className="text-[13px] font-medium whitespace-nowrap">Issue #28 is ready</div>
                          <div className="text-[11px] text-white/55 whitespace-nowrap">Audio brief · 4 min</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-[3px] h-5">
                        {[0.45, 0.85, 1, 0.7, 0.4].map((amp, i) => {
                          const pulse = Math.exp(-mod(t + i * 0.04, 0.5) * 7);
                          return (
                            <span
                              key={i}
                              className="w-[3px] rounded-full bg-white"
                              style={{ height: (5 + 14 * amp * (0.35 + 0.65 * pulse)).toFixed(1) + 'px' }}
                            />
                          );
                        })}
                      </div>
                    </Content>

                    {/* 5/6 · Player + scrub */}
                    <Content lay={L.player} w={w} h={h} W={340} H={156} className="text-white">
                      <div className="absolute left-[18px] top-[18px] flex items-center gap-3">
                        <div className="w-12 h-12 rounded-[12px] flex items-center justify-center text-[15px] font-semibold" style={{ backgroundColor: ACCENT }}>
                          28
                        </div>
                        <div className="leading-tight">
                          <div className="text-[14px] font-medium whitespace-nowrap">Transit bottlenecks, solved</div>
                          <div className="text-[12px] text-white/55 mt-0.5 whitespace-nowrap">Issue #28 · Audio brief</div>
                        </div>
                      </div>
                      <div
                        className="absolute right-[18px] top-[20px] w-11 h-11 rounded-full bg-white flex items-center justify-center"
                        style={{ transform: `scale(${f.playPress.toFixed(4)})` }}
                      >
                        <PlayPauseIcon m={f.play} />
                      </div>
                      <div className="absolute left-[18px] right-[18px] top-[112px] h-1 rounded-full bg-white/20">
                        <div className="absolute left-0 top-0 h-full rounded-full bg-white" style={{ width: f.progress * TRACK_W }} />
                        <div
                          className="absolute rounded-full bg-white"
                          style={{
                            width: f.knobSize,
                            height: f.knobSize,
                            left: f.progress * TRACK_W - f.knobSize / 2,
                            top: 2 - f.knobSize / 2,
                          }}
                        />
                      </div>
                      <div className="absolute left-[18px] right-[18px] top-[124px] flex justify-between text-[11px] text-white/55 tabular-nums" style={{ fontFamily: MONO }}>
                        <span>{fmt(f.progress * TOTAL_SEC)}</span>
                        <span>{fmt(TOTAL_SEC)}</span>
                      </div>
                    </Content>

                    {/* 7 · Volume slider (stretches past max) */}
                    <Content lay={L.slider} w={w} h={h} W={320 + f.stretch} H={64} anchor="left" style={{ color: INK }}>
                      <Volume2 size={18} strokeWidth={2} className="absolute left-4 top-[23px]" />
                      <div className="absolute top-[29px] h-1.5 rounded-full" style={{ left: 50, width: trackLen, backgroundColor: '#E6E4E0' }}>
                        <div className="absolute left-0 top-0 h-full rounded-full" style={{ width: fill, backgroundColor: INK }} />
                      </div>
                      <div
                        className="absolute w-6 h-6 rounded-full bg-white"
                        style={{
                          left: 50 + fill - 12,
                          top: 20,
                          boxShadow: '0 0 0 1px rgba(18,19,22,0.10), 0 2px 6px rgba(18,19,22,0.18)',
                        }}
                      />
                      <div
                        className="absolute top-0 h-16 flex items-center text-[12px] tabular-nums text-[#121316]/55"
                        style={{ left: 50 + trackLen + 14, fontFamily: MONO }}
                      >
                        {Math.round(f.volume * 100)}
                      </div>
                    </Content>

                    {/* 8/9 · Toggle knob → liquid tab indicator */}
                    {L.knob && (
                      <div
                        className="absolute"
                        style={{
                          left: knobLeft,
                          top: knobTop,
                          width: knobW,
                          height: f.kh,
                          borderRadius: f.kh / 2,
                          backgroundColor: rgb(f.kc),
                          opacity: L.knob.a,
                          boxShadow: '0 1px 3px rgba(18,19,22,0.14)',
                        }}
                      />
                    )}

                    {/* 9 · Tab labels (inverted where the indicator sits) */}
                    {L.tabs && (
                      <div
                        className="absolute"
                        style={{
                          left: rowLeft,
                          top: rowTop,
                          width: 368,
                          height: 52,
                          opacity: L.tabs.a,
                          filter: L.tabs.blur > 0.05 ? `blur(${L.tabs.blur.toFixed(2)}px)` : 'none',
                        }}
                      >
                        <div className="absolute inset-0 flex text-[14px] font-medium text-[#121316]/45">
                          {TABS.map((tab) => (
                            <span key={tab} className="flex-1 flex items-center justify-center">{tab}</span>
                          ))}
                        </div>
                        <div
                          className="absolute inset-0 flex text-[14px] font-medium text-white"
                          style={{ clipPath: `inset(0 ${clipR.toFixed(1)}px 0 ${clipL.toFixed(1)}px round 26px)` }}
                        >
                          {TABS.map((tab) => (
                            <span key={tab} className="flex-1 flex items-center justify-center">{tab}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 10 · Chart that draws itself */}
                    <Content lay={L.chart} w={w} h={h} W={440} H={320} style={{ color: INK }}>
                      <div className="absolute left-6 top-[74px]">
                        <div className="text-[12px] text-[#121316]/50">On-time arrival · Safety</div>
                        <div className="text-[34px] font-semibold tracking-[-0.03em] leading-none mt-1 tabular-nums">
                          {(93 + 6.4 * f.draw).toFixed(1)}%
                        </div>
                      </div>
                      <div className="absolute right-6 top-[96px] text-[12px] font-medium" style={{ color: ACCENT }}>
                        +5.3 pts
                      </div>
                      <svg className="absolute inset-0" width="440" height="320" viewBox="-220 -160 440 320" fill="none" aria-hidden="true">
                        {[128, 78, 28].map((y) => (
                          <line key={y} x1="-196" x2="196" y1={y} y2={y} stroke={INK} strokeOpacity="0.06" />
                        ))}
                        <path
                          d={CHART_PATH}
                          stroke={ACCENT}
                          strokeWidth="2.25"
                          strokeLinecap="round"
                          pathLength="1"
                          strokeDasharray="1"
                          strokeDashoffset={(1 - f.draw).toFixed(4)}
                        />
                        {MONTHS.map((m, i) => (
                          <text key={m} x={PTS[i][0]} y="148" textAnchor="middle" fontSize="10" fill={INK} fillOpacity="0.4" style={{ fontFamily: MONO }}>
                            {m}
                          </text>
                        ))}
                        {f.tipA > 0.01 && (
                          <g opacity={f.tipA}>
                            <line x1={f.tx} x2={f.tx} y1={f.ty} y2="128" stroke={INK} strokeOpacity="0.14" />
                            <circle cx={f.tx} cy={f.ty} r="5" fill="#FFFFFF" stroke={ACCENT} strokeWidth="2.25" />
                          </g>
                        )}
                      </svg>
                      {f.tipA > 0.01 && (
                        <div
                          className="absolute h-[30px] w-[76px] rounded-[9px] text-white overflow-hidden"
                          style={{
                            left: f.tx + 220 - 38,
                            top: f.ty + 160 - 44,
                            backgroundColor: INK,
                            opacity: f.tipA,
                          }}
                        >
                          {[
                            { v: '96.8%', m: 'Aug', a: 1 - f.tipSwap, b: f.tipSwap * 6 },
                            { v: '99.4%', m: 'Oct', a: smooth((t - 11.06) / 0.14), b: (1 - smooth((t - 11.06) / 0.14)) * 6 },
                          ].map((tip) =>
                            tip.a > 0.01 ? (
                              <div
                                key={tip.m}
                                className="absolute inset-0 flex items-center justify-center gap-1.5"
                                style={{ opacity: tip.a, filter: tip.b > 0.05 ? `blur(${tip.b.toFixed(2)}px)` : 'none' }}
                              >
                                <span className="text-[12px] font-medium tabular-nums">{tip.v}</span>
                                <span className="text-[10px] text-white/55">{tip.m}</span>
                              </div>
                            ) : null
                          )}
                        </div>
                      )}
                    </Content>

                    {/* 11 · ⌘K */}
                    <Content lay={L.chip} w={w} h={h} W={112} H={64} className="flex items-center justify-center text-white">
                      <span className="text-[24px] font-medium tracking-[0.02em]">⌘K</span>
                    </Content>

                    {/* 11 · Palette: type to filter → enter */}
                    <Content lay={L.palette} w={w} h={h} W={420} H={246} anchor="top" style={{ color: INK }}>
                      <Search size={18} strokeWidth={2} className="absolute left-[18px] top-[19px] text-[#121316]/45" />
                      <div className="absolute left-12 top-0 h-14 flex items-center text-[15px]">
                        {f.query ? (
                          <span className="font-medium">{f.query}</span>
                        ) : (
                          <span className="text-[#121316]/35">Search briefings</span>
                        )}
                        <span
                          className="inline-block w-[2px] h-[18px] ml-[2px] rounded-full"
                          style={{ backgroundColor: ACCENT, opacity: mod(t, 0.5) < 0.3 ? 1 : 0.2 }}
                        />
                      </div>
                      <span
                        className="absolute right-4 top-[17px] px-1.5 py-0.5 rounded-[6px] text-[11px] text-[#121316]/50"
                        style={{ backgroundColor: '#F1F0ED', fontFamily: MONO }}
                      >
                        esc
                      </span>
                      <div className="absolute left-0 right-0 top-14 h-px bg-[#121316]/[0.07]" />
                      <div
                        className="absolute left-1.5 right-1.5 top-[62px] h-11 rounded-[12px]"
                        style={{ backgroundColor: rgb([lerp(243, 18, inv), lerp(242, 19, inv), lerp(239, 22, inv)]) }}
                      />
                      {ITEMS.map((it, i) => {
                        const st = f.items[i];
                        if (st.a <= 0.01) return null;
                        const isTop = i === 0;
                        const light = isTop && inv > 0.5;
                        return (
                          <div
                            key={it.title}
                            className="absolute left-1.5 right-1.5 h-11 flex items-center gap-3 px-3"
                            style={{
                              top: 62 + st.y * 44,
                              opacity: st.a,
                              filter: st.a < 1 ? `blur(${((1 - st.a) * 6).toFixed(2)}px)` : 'none',
                            }}
                          >
                            <span
                              className="w-7 h-7 rounded-[8px] flex items-center justify-center shrink-0"
                              style={{ backgroundColor: light ? 'rgba(255,255,255,0.14)' : isTop ? '#FFFFFF' : '#F1F0ED' }}
                            >
                              <FileText size={15} strokeWidth={2} className={light ? 'text-white' : 'text-[#121316]/70'} />
                            </span>
                            <span className={`flex-1 text-[14px] whitespace-nowrap ${light ? 'text-white' : 'text-[#121316]'}`}>
                              {light ? it.title : highlight(it.title, f.query)}
                            </span>
                            <span
                              className={`text-[12px] tabular-nums ${light ? 'text-white/60' : 'text-[#121316]/40'}`}
                              style={{ fontFamily: MONO }}
                            >
                              {isTop && f.query ? '↵' : it.meta}
                            </span>
                          </div>
                        );
                      })}
                    </Content>

                    {/* 12 · Toast */}
                    <Content lay={L.toastA} w={w} h={h} W={280} H={52} className="flex items-center gap-2.5 pl-4 text-white">
                      <Spinner t={t} size={18} />
                      <span className="text-[14px] font-medium whitespace-nowrap">Opening briefing</span>
                    </Content>
                    <Content lay={L.toastB} w={w} h={h} W={320} H={52} className="flex items-center justify-between pl-3 pr-5 text-white">
                      <span className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: ACCENT }}>
                          <DrawnCheck p={step(t - 13.06, 14, 1)} size={18} />
                        </span>
                        <span className="text-[14px] font-medium whitespace-nowrap">Saved to your briefings</span>
                      </span>
                      <span className="text-[13px] text-white/55">View</span>
                    </Content>
                  </div>
                </div>

                {/* Cursor (outside the camera so its size stays constant) */}
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  className="absolute pointer-events-none"
                  style={{
                    left: STAGE / 2 + f.cx * f.cam,
                    top: STAGE / 2 + f.cy * f.cam,
                    transform: `translate(-6.4px, -3.7px) scale(${f.press.toFixed(4)})`,
                    transformOrigin: '6.4px 3.7px',
                    filter: 'drop-shadow(0 2px 3px rgba(18,19,22,0.25))',
                  }}
                  aria-hidden="true"
                >
                  <path
                    d="M5.5 3.2v15.6c0 .5.6.8 1 .4l3.6-3.4 2.4 5.3c.2.4.6.5 1 .4l1.6-.7c.4-.2.5-.6.4-1l-2.4-5.2h5c.5 0 .8-.6.4-1L6.5 2.8c-.4-.4-1-.1-1 .4z"
                    fill={INK}
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
      </div>
    </div>
  );
}
