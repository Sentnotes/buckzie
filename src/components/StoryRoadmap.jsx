import React, { useRef, useState, useEffect } from 'react';
import {
  MapPin,
  CheckCircle2,
  Navigation,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

/* ─── Word-by-Word Bolding Component (Homepage ScrollReveal Style) ────────── */
function ScrollRevealWords({
  text,
  progress,
  startP,
  endP,
  isPassed,
  boldWeight = 800,
  unboldWeight = 500,
  className = '',
}) {
  const words = text.split(' ');

  let highlightedCount = 0;
  if (isPassed) {
    highlightedCount = words.length;
  } else if (progress >= startP) {
    const local = Math.min(1, Math.max(0, (progress - startP) / (endP - startP)));
    highlightedCount = Math.round(local * words.length);
  }

  return (
    <span className={className}>
      {words.map((word, i) => {
        const isHighlighted = i < highlightedCount;
        return (
          <span
            key={i}
            className="inline transition-all duration-150"
            style={{
              color: isHighlighted ? '#000000' : '#94a3b8',
              opacity: isHighlighted ? 1 : 0.35,
              fontWeight: isHighlighted ? boldWeight : unboldWeight,
            }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        );
      })}
    </span>
  );
}

export default function StoryRoadmap() {
  const containerRef = useRef(null);
  const pathRef = useRef(null);

  // Scroll progress from 0.0 to 1.0
  const [progress, setProgress] = useState(0);
  const [carPos, setCarPos] = useState({ x: 500, y: 50, angle: 90 });
  const [activeStop, setActiveStop] = useState(1);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current || !pathRef.current) {
            ticking = false;
            return;
          }

          const rect = containerRef.current.getBoundingClientRect();
          const windowH = window.innerHeight;

          // Compute progress so the car tracks comfortably in the middle-upper viewport,
          // staying clear of bottom OS taskbars / nav bars
          const start = windowH * 0.38;
          const end = windowH * 0.68;
          const totalDist = rect.height;
          const currentPos = start - rect.top;

          let rawProgress = currentPos / Math.max(1, totalDist + (start - end));
          rawProgress = Math.max(0, Math.min(1, rawProgress));

          setProgress(rawProgress);

          // Update active stop based on progress
          if (rawProgress < 0.32) {
            setActiveStop(1);
          } else if (rawProgress < 0.62) {
            setActiveStop(2);
          } else {
            setActiveStop(3);
          }

          {/* Move the vehicle along the SVG path */}
          try {
            const path = pathRef.current;
            const pathLength = path.getTotalLength();
            const currentDist = rawProgress * pathLength;
            const p = path.getPointAtLength(currentDist);

            // Compute tangent angle for natural car steering along the curve
            const nextDist = Math.min(pathLength, currentDist + 8);
            const pNext = path.getPointAtLength(nextDist);
            const angle = Math.atan2(pNext.y - p.y, pNext.x - p.x) * (180 / Math.PI);

            setCarPos({ x: p.x, y: p.y, angle });
          } catch (e) {
            // SVG path not ready yet
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial measure

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToMilestone = (index) => {
    if (!containerRef.current) return;
    const targets = containerRef.current.querySelectorAll('[data-milestone]');
    if (targets[index]) {
      targets[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Continuous road path coordinates (graceful S-curve in center channel with clear margin from text)
  const roadPathD = "M 500,20 C 425,150 410,300 480,440 C 575,580 585,730 510,870 C 430,1000 455,1140 500,1260 C 525,1320 530,1380 530,1440";

  // Car opacity: fades in at start, and fades out as it drives forward into the open horizon (journey never ends)
  const carOpacity = progress < 0.04
    ? progress / 0.04
    : (progress > 0.84 ? Math.max(0, 1 - (progress - 0.84) / 0.14) : 1);

  return (
    <section
      id="our-story"
      ref={containerRef}
      className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-28 scroll-mt-28 select-none"
    >
      {/* Road Journey Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-bold text-brand-600 uppercase tracking-wider shadow-xs">
          <Navigation className="w-3.5 h-3.5" />
          <span>Our 29-Year Transit Journey</span>
        </div>
        <h2
          style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
          className="text-3xl sm:text-4xl md:text-5xl font-medium text-black tracking-tight leading-tight"
        >
          From a Single Beaverton Van to a Nationwide Fleet.
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
          Follow the road that shaped alternative student transportation. Scroll down to guide the Buckled In vehicle through three defining eras of safety and growth.
        </p>

        {/* Milestone Quick Jump Buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 0, label: '1997 Beaverton', era: 1 },
            { id: 1, label: '2010s Expansion', era: 2 },
            { id: 2, label: '2025 Buckled In', era: 3 },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => scrollToMilestone(m.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                activeStop === m.era
                  ? 'bg-black text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-black hover:bg-slate-200'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Highway Container (Desktop Center S-Curve / Mobile Left Highway) ── */}
      <div className="relative min-h-[780px] md:min-h-[880px]">

        {/* ── Desktop SVG Highway & Animated Car (Hidden on small mobile) ── */}
        <div className="hidden md:block absolute inset-0 pointer-events-none z-10">
          <svg
            viewBox="0 0 1000 1350"
            fill="none"
            preserveAspectRatio="none"
            className="w-full h-full overflow-visible"
          >
            <defs>
              {/* Infinite Road Vertical Fade Mask (fades softly in at top, fades into open infinity at bottom) */}
              <linearGradient id="roadFadeGradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="1450">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
                <stop offset="5%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="80%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>

              <mask id="infiniteRoadMask" maskUnits="userSpaceOnUse" x="-200" y="-100" width="1400" height="1700">
                <rect x="-200" y="-100" width="1400" height="1700" fill="url(#roadFadeGradient)" />
              </mask>

              {/* 3D Clay / Matte-White Tesla Shading Gradients */}
              <radialGradient id="clayBodyGrad" cx="45%" cy="42%" r="65%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="55%" stopColor="#f4f5f7" />
                <stop offset="85%" stopColor="#e2e5ea" />
                <stop offset="100%" stopColor="#cfd4dc" />
              </radialGradient>

              <linearGradient id="clayRoofGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#f1f3f5" />
                <stop offset="100%" stopColor="#dfe3e8" />
              </linearGradient>

              <linearGradient id="clayGlassGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#262930" />
                <stop offset="50%" stopColor="#353942" />
                <stop offset="100%" stopColor="#23262d" />
              </linearGradient>

              {/* Soft Ground Contact Shadow */}
              <filter id="carShadow" x="-45%" y="-45%" width="190%" height="190%">
                <feDropShadow dx="1" dy="4" stdDeviation="5.5" floodColor="#0f172a" floodOpacity="0.22" />
              </filter>
            </defs>

            {/* ── Translucent Road Surface with Infinite Fade Mask (Light, airy, non-blocky) ── */}
            <g mask="url(#infiniteRoadMask)">
              {/* Outer Subtle Road Bed Glow */}
              <path
                d={roadPathD}
                stroke="rgba(15, 23, 42, 0.03)"
                strokeWidth="56"
                strokeLinecap="round"
              />

              {/* Translucent Highway Surface (Soft frosted ribbon, not pitch black) */}
              <path
                d={roadPathD}
                stroke="rgba(15, 23, 42, 0.08)"
                strokeWidth="44"
                strokeLinecap="round"
              />

              {/* Crisp Inner Road Border Trim Lines */}
              <path
                d={roadPathD}
                stroke="rgba(100, 116, 139, 0.22)"
                strokeWidth="38"
                strokeLinecap="round"
              />
              <path
                d={roadPathD}
                stroke="rgba(248, 250, 252, 0.92)"
                strokeWidth="35"
                strokeLinecap="round"
              />

              {/* Traveled Route Glow Trail */}
              <path
                d={roadPathD}
                stroke="#0ea5e9"
                strokeWidth="2"
                strokeDasharray="6 8"
                opacity="0.3"
              />

              {/* Highway Yellow Center Dashed Line (The Path the Car Tracks) */}
              <path
                ref={pathRef}
                d={roadPathD}
                stroke="#f59e0b"
                strokeWidth="2.5"
                strokeDasharray="12 14"
                strokeLinecap="round"
                opacity="0.85"
              />
            </g>

            {/* ── Animated Car Group (Minimalist 3D Matte-White Clay Tesla) ── */}
            <g
              transform={`translate(${carPos.x}, ${carPos.y}) rotate(${carPos.angle})`}
              filter="url(#carShadow)"
              opacity={carOpacity}
              className="transition-transform duration-75 ease-out"
              style={{ transition: 'opacity 0.2s ease-out' }}
            >
              {/* Soft Ground Ambient Occlusion */}
              <ellipse cx="0" cy="0" rx="26.5" ry="13.5" fill="rgba(15, 23, 42, 0.09)" />

              {/* Wheels (Flush Matte Dark Tires with Subtle Edge) */}
              <rect x="-17.5" y="-13.6" width="8.5" height="2" rx="1" fill="#1e2126" />
              <rect x="9" y="-13.6" width="8.5" height="2" rx="1" fill="#1e2126" />
              <rect x="-17.5" y="11.6" width="8.5" height="2" rx="1" fill="#1e2126" />
              <rect x="9" y="11.6" width="8.5" height="2" rx="1" fill="#1e2126" />

              {/* Sculpted Matte-White Body Shell */}
              <path
                d="M 26,0 C 26,-4.8 23,-10.6 16.5,-12.2 C 5.5,-13.6 -9,-13.6 -19.5,-12 C -23.5,-10.5 -25.5,-6 -25.5,0 C -25.5,6 -23.5,10.5 -19.5,12 C -9,13.6 5.5,13.6 16.5,12.2 C 23,10.6 26,4.8 26,0 Z"
                fill="url(#clayBodyGrad)"
                stroke="rgba(148, 163, 184, 0.38)"
                strokeWidth="0.7"
              />

              {/* Sculpted Aerodynamic Side Mirrors (Matte White) */}
              <path d="M 8,-12.4 C 9,-14.8 11.5,-15.8 12.2,-14.6 C 12.6,-13.8 11.2,-12.6 9.5,-12.3 Z" fill="#f1f3f5" stroke="rgba(148, 163, 184, 0.45)" strokeWidth="0.5" />
              <path d="M 8,12.4 C 9,14.8 11.5,15.8 12.2,14.6 C 12.6,13.8 11.2,12.6 9.5,12.3 Z" fill="#e5e7eb" stroke="rgba(148, 163, 184, 0.45)" strokeWidth="0.5" />

              {/* Subtle Hood Panel & Fender Sculpting */}
              <path d="M 23.5,-3.8 C 19,-5.2 14.5,-7.8 11.5,-9.5" stroke="rgba(148, 163, 184, 0.35)" strokeWidth="0.7" strokeLinecap="round" fill="none" />
              <path d="M 23.5,3.8 C 19,5.2 14.5,7.8 11.5,9.5" stroke="rgba(148, 163, 184, 0.35)" strokeWidth="0.7" strokeLinecap="round" fill="none" />
              <path d="M 21,-5.5 C 21.8,-2.5 21.8,2.5 21,5.5" stroke="rgba(203, 213, 225, 0.55)" strokeWidth="0.6" strokeLinecap="round" fill="none" />

              {/* Tinted Dark Charcoal Windshield & Rear Glass */}
              <path
                d="M 12.5,0 C 12.5,-4.2 10,-8.2 5.2,-8.8 C -3.8,-9.4 -12,-9.2 -17.2,-7.6 C -19.8,-5.6 -20.5,-3 -20.5,0 C -20.5,3 -19.8,5.6 -17.2,7.6 C -12,9.2 -3.8,9.4 5.2,8.8 C 10,8.2 12.5,4.2 12.5,0 Z"
                fill="url(#clayGlassGrad)"
                stroke="rgba(203, 213, 225, 0.4)"
                strokeWidth="0.6"
              />

              {/* Matte-White Sculpted Roof Crown (Matching 3D Clay Model) */}
              <path
                d="M 3.2,0 C 3.2,-3.2 1.8,-6.2 -1.2,-6.8 C -5.5,-7.2 -10.5,-7 -13,-5.8 C -14.2,-4.4 -14.6,-2.2 -14.6,0 C -14.6,2.2 -14.2,4.4 -13,5.8 C -10.5,7 -5.5,7.2 -1.2,6.8 C 1.8,6.2 3.2,3.2 3.2,0 Z"
                fill="url(#clayRoofGrad)"
                stroke="rgba(203, 213, 225, 0.55)"
                strokeWidth="0.5"
              />

              {/* Dark Smoked Headlight Housings (Matching Reference) */}
              <path d="M 21.5,-9.6 C 23.8,-8.2 24.8,-6.2 24.4,-4.8 C 23.2,-5.6 21.6,-7.2 20.5,-8.8 Z" fill="#2c3038" />
              <path d="M 21.5,9.6 C 23.8,8.2 24.8,6.2 24.4,4.8 C 23.2,5.6 21.6,7.2 20.5,8.8 Z" fill="#2c3038" />

              {/* Understated Smoked Rear Taillight Accents */}
              <path d="M -23.5,-7.2 C -24.6,-5.2 -24.8,-3.5 -24.6,-2.5" stroke="#525866" strokeWidth="1.2" strokeLinecap="round" fill="none" />
              <path d="M -23.5,7.2 C -24.6,5.2 -24.8,3.5 -24.6,2.5" stroke="#525866" strokeWidth="1.2" strokeLinecap="round" fill="none" />

              {/* Subtle Front Hood Emblem */}
              <circle cx="22.8" cy="0" r="0.65" fill="#cbd5e1" />
            </g>
          </svg>
        </div>

        {/* ── Mobile Road Strip (Visible only on < md with infinite fade) ── */}
        <div
          className="md:hidden absolute left-5 top-0 bottom-0 w-6 rounded-full bg-slate-900/10 border border-slate-200/80 flex flex-col items-center justify-between py-6 z-10 overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 80%, transparent 100%)',
          }}
        >
          <div className="w-0.5 h-full border-r-2 border-dashed border-amber-400/80" />
          <div
            className="absolute w-7 h-12 flex items-center justify-center transition-all duration-150"
            style={{
              top: `${Math.max(2, Math.min(94, progress * 100))}%`,
              transform: 'translateY(-50%)',
              opacity: carOpacity,
              filter: 'drop-shadow(0 3px 5px rgba(15, 23, 42, 0.24))',
            }}
          >
            {/* Top-down 3D Clay Matte-White Tesla Mini Vector for Mobile */}
            <svg viewBox="0 0 26 42" className="w-6 h-11">
              <defs>
                <radialGradient id="clayBodyMobile" cx="45%" cy="40%" r="65%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="65%" stopColor="#eef0f3" />
                  <stop offset="100%" stopColor="#d1d5db" />
                </radialGradient>
              </defs>
              <rect x="3" y="2" width="20" height="38" rx="8.5" fill="url(#clayBodyMobile)" stroke="rgba(148,163,184,0.45)" strokeWidth="0.7" />
              <rect x="6" y="9.5" width="14" height="23" rx="5" fill="#2c3038" />
              <rect x="7.5" y="15" width="11" height="11" rx="3.5" fill="#f4f5f7" stroke="rgba(203,213,225,0.5)" strokeWidth="0.5" />
              <path d="M 5.5,4.5 Q 7.5,3 9,5.5" stroke="#2c3038" strokeWidth="1.6" strokeLinecap="round" fill="none" />
              <path d="M 20.5,4.5 Q 18.5,3 17,5.5" stroke="#2c3038" strokeWidth="1.6" strokeLinecap="round" fill="none" />
            </svg>
          </div>
        </div>

        {/* ── 3 Journey Milestones: Pure Typography Moved Off The Road (No Cards) ── */}
        <div className="relative z-20 space-y-16 md:space-y-24 pt-4 pb-8">

          {/* ════════════════════════════════════════════════════════════════════
              MILESTONE 1 (1997 — Beaverton, Oregon)
          ════════════════════════════════════════════════════════════════════ */}
          {(() => {
            const isPassed = progress > 0.30;
            const isActive = progress >= 0.02 && progress <= 0.30;
            const blockOpacity = isPassed ? 0.42 : (isActive ? 1 : 0.45);

            return (
              <div
                data-milestone="0"
                className="grid grid-cols-1 md:grid-cols-12 items-center pl-14 sm:pl-16 md:pl-0"
              >
                {/* Desktop Left: Pure Frameless Text (Moved Off Road: md:pr-12 lg:pr-16) */}
                <div className="md:col-span-5 md:text-right md:pr-12 lg:pr-16">
                  <div
                    onClick={() => scrollToMilestone(0)}
                    className="cursor-pointer group select-text transition-opacity duration-300"
                    style={{ opacity: blockOpacity }}
                  >
                    <div className="flex items-center md:justify-end space-x-2.5 mb-2">
                      <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-brand-600 bg-brand-50/90 px-2.5 py-0.5 rounded-full border border-brand-100">
                        Mile 0.0 • 1997 Founding
                      </span>
                      <span className="text-xs font-medium text-slate-400">
                        Beaverton, OR
                      </span>
                    </div>

                    <div
                      style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
                      className={`text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight mb-2 transition-colors duration-300 ${
                        isActive ? 'text-[#fe6c10]' : 'text-slate-900'
                      }`}
                    >
                      1997
                    </div>

                    <h3
                      style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
                      className="text-xl sm:text-2xl font-medium tracking-tight leading-snug mb-3 group-hover:text-brand-600 transition-colors"
                    >
                      <ScrollRevealWords
                        text="A Solution Born Out of Local District Need."
                        progress={progress}
                        startP={0.02}
                        endP={0.14}
                        isPassed={isPassed}
                        boldWeight={700}
                        unboldWeight={500}
                      />
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal max-w-md md:ml-auto">
                      <ScrollRevealWords
                        text="Our company was founded in Beaverton, Oregon in 1997 to help local school districts manage specialized pupil transportation challenges when traditional yellow bus loops could not meet student needs."
                        progress={progress}
                        startP={0.08}
                        endP={0.28}
                        isPassed={isPassed}
                        boldWeight={700}
                        unboldWeight={500}
                      />
                    </p>

                    <div className="mt-4 flex flex-wrap items-center md:justify-end gap-2 text-xs text-slate-500 font-medium">
                      <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-slate-100/80 text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" />
                        <span>Single Local District</span>
                      </span>
                      <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-slate-100/80 text-slate-600">
                        <MapPin className="w-3.5 h-3.5 text-brand-600" />
                        <span>Pacific Northwest Roots</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Desktop Center: Dedicated Clear Highway Corridor (No roadside cards) */}
                <div className="hidden md:block md:col-span-2 pointer-events-none" />

                {/* Desktop Right: Open Landscape Space */}
                <div className="hidden md:block md:col-span-5 pointer-events-none" />
              </div>
            );
          })()}

          {/* ════════════════════════════════════════════════════════════════════
              MILESTONE 2 (Mid-2000s–2010s — Interstate Growth | Assist Services)
          ════════════════════════════════════════════════════════════════════ */}
          {(() => {
            const isPassed = progress > 0.58;
            const isActive = progress >= 0.28 && progress <= 0.58;
            const blockOpacity = isPassed ? 0.42 : (isActive ? 1 : 0.45);

            return (
              <div
                data-milestone="1"
                className="grid grid-cols-1 md:grid-cols-12 items-center pl-14 sm:pl-16 md:pl-0"
              >
                {/* Desktop Left: Open Landscape Space */}
                <div className="hidden md:block md:col-span-5 pointer-events-none" />

                {/* Desktop Center: Dedicated Clear Highway Corridor */}
                <div className="hidden md:block md:col-span-2 pointer-events-none" />

                {/* Desktop Right: Pure Frameless Text (Moved Off Road: md:pl-12 lg:pl-16) */}
                <div className="md:col-span-5 md:text-left md:pl-12 lg:pl-16">
                  <div
                    onClick={() => scrollToMilestone(1)}
                    className="cursor-pointer group select-text transition-opacity duration-300"
                    style={{ opacity: blockOpacity }}
                  >
                    <div className="flex items-center space-x-2.5 mb-2">
                      <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-sky-700 bg-sky-50/90 px-2.5 py-0.5 rounded-full border border-sky-100">
                        Mile 15.4 • Interstate Expansion
                      </span>
                      <span className="text-xs font-medium text-slate-400">
                        Assist Services LLC
                      </span>
                    </div>

                    <div
                      style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
                      className={`text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight mb-2 transition-colors duration-300 ${
                        isActive ? 'text-[#0284c7]' : 'text-slate-900'
                      }`}
                    >
                      2010s
                    </div>

                    <h3
                      style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
                      className="text-xl sm:text-2xl font-medium tracking-tight leading-snug mb-3 group-hover:text-sky-600 transition-colors"
                    >
                      <ScrollRevealWords
                        text="Scaling Across Communities While Keeping People First."
                        progress={progress}
                        startP={0.28}
                        endP={0.40}
                        isPassed={isPassed}
                        boldWeight={700}
                        unboldWeight={500}
                      />
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal max-w-md">
                      <ScrollRevealWords
                        text="As word of alternative student transit spread, the business evolved into Assist Services LLC. We expanded into new markets nationwide, staying true to our core principles: consistent partnerships between families, districts, and vetted drivers."
                        progress={progress}
                        startP={0.34}
                        endP={0.56}
                        isPassed={isPassed}
                        boldWeight={700}
                        unboldWeight={500}
                      />
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium">
                      <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-slate-100/80 text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
                        <span>200+ School Districts</span>
                      </span>
                      <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-slate-100/80 text-slate-600">
                        <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
                        <span>Fingerprint Vetting Standard</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* ════════════════════════════════════════════════════════════════════
              MILESTONE 3 (2025–Present — Buckled In Rebrand)
          ════════════════════════════════════════════════════════════════════ */}
          {(() => {
            const isPassed = progress > 0.86;
            const isActive = progress >= 0.56 && progress <= 0.86;
            const blockOpacity = isPassed ? 0.42 : (isActive ? 1 : 0.45);

            return (
              <div
                data-milestone="2"
                className="grid grid-cols-1 md:grid-cols-12 items-center pl-14 sm:pl-16 md:pl-0"
              >
                {/* Desktop Left: Pure Frameless Text (Moved Off Road: md:pr-12 lg:pr-16) */}
                <div className="md:col-span-5 md:text-right md:pr-12 lg:pr-16">
                  <div
                    onClick={() => scrollToMilestone(2)}
                    className="cursor-pointer group select-text transition-opacity duration-300"
                    style={{ opacity: blockOpacity }}
                  >
                    <div className="flex items-center md:justify-end space-x-2.5 mb-2">
                      <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-emerald-800 bg-emerald-50/90 px-2.5 py-0.5 rounded-full border border-emerald-100">
                        Mile 29.0 • Modern Era
                      </span>
                      <span className="text-xs font-medium text-slate-400">
                        Buckled In Network
                      </span>
                    </div>

                    <div
                      style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
                      className={`text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight mb-2 transition-colors duration-300 ${
                        isActive ? 'text-[#10b981]' : 'text-slate-900'
                      }`}
                    >
                      2025
                    </div>

                    <h3
                      style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
                      className="text-xl sm:text-2xl font-medium tracking-tight leading-snug mb-3 group-hover:text-emerald-600 transition-colors"
                    >
                      <ScrollRevealWords
                        text="A Modern Brand Built on 29 Years of Trust."
                        progress={progress}
                        startP={0.56}
                        endP={0.68}
                        isPassed={isPassed}
                        boldWeight={700}
                        unboldWeight={500}
                      />
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal max-w-md md:ml-auto">
                      <ScrollRevealWords
                        text="In 2025, Assist Services rebranded to Buckled In to directly embody our safety-first mission. Today, backed by 29+ years of proven service, we deliver 2,000+ safe rides daily with Guardian Shield live telematics across 28+ metro regions."
                        progress={progress}
                        startP={0.62}
                        endP={0.82}
                        isPassed={isPassed}
                        boldWeight={700}
                        unboldWeight={500}
                      />
                    </p>

                    <div className="mt-4 flex flex-wrap items-center md:justify-end gap-2 text-xs text-slate-500 font-medium">
                      <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-slate-100/80 text-slate-600">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                        <span>500+ Districts Nationwide</span>
                      </span>
                      <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-slate-100/80 text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>2,000+ Daily Safe Rides</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Desktop Center: Dedicated Clear Highway Corridor */}
                <div className="hidden md:block md:col-span-2 pointer-events-none" />

                {/* Desktop Right: Open Landscape Space */}
                <div className="hidden md:block md:col-span-5 pointer-events-none" />
              </div>
            );
          })()}

          {/* ════════════════════════════════════════════════════════════════════
              CONTINUOUS HORIZON (On the side of the road, subtitle font size)
          ════════════════════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-1 md:grid-cols-12 items-center pl-14 sm:pl-16 md:pl-0 pt-2">
            {/* Desktop Left: Open Landscape Space */}
            <div className="hidden md:block md:col-span-5 pointer-events-none" />

            {/* Desktop Center: Dedicated Clear Highway Horizon Corridor */}
            <div className="hidden md:block md:col-span-2 pointer-events-none" />

            {/* Desktop Right: Journey Continues Subtitle (Off the road) */}
            <div className="md:col-span-5 md:text-left md:pl-12 lg:pl-16">
              <div className="inline-flex items-center space-x-2 mb-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-emerald-700">
                  Open Horizon • Next Mile
                </span>
              </div>
              <h3
                style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
                className="text-xl sm:text-2xl font-medium tracking-tight leading-snug max-w-md"
              >
                <ScrollRevealWords
                  text="The journey continues — expanding safe student routes every single day."
                  progress={progress}
                  startP={0.76}
                  endP={0.90}
                  isPassed={false}
                  boldWeight={700}
                  unboldWeight={500}
                />
              </h3>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
