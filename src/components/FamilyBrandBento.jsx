import React from 'react';

/**
 * High-design modernist 3x3 graphic matrix inspired by modern brand identity showcases (Uber / Pentagram / Wolff Olins).
 * Translates the family transit & student safety mission into a bold, Swiss-style graphic design system.
 */
export default function FamilyBrandBento({ onExplore }) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8 md:my-10 select-none">
      {/* 3x3 Modular Grid Frame */}
      <div className="grid grid-cols-1 md:grid-cols-3 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border border-black/10 shadow-2xl bg-black">
        
        {/* ─── ROW 1, COL 1: Black Card - Minimalist GPS Route Map ─── */}
        <div className="relative bg-[#0a0a0a] min-h-[200px] sm:min-h-[230px] p-5 sm:p-6 flex flex-col justify-between overflow-hidden border-b md:border-b-0 md:border-r border-neutral-800">
          {/* Authentic Detailed Urban Street Map (SVG) */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" fill="none">
              {/* City Block Outlines & Street Network */}
              {/* Horizontal Streets */}
              <line x1="0" y1="20" x2="400" y2="20" stroke="#1f1f1f" strokeWidth="1" />
              <line x1="0" y1="42" x2="400" y2="42" stroke="#2a2a2a" strokeWidth="1.5" />
              <line x1="0" y1="68" x2="400" y2="68" stroke="#1c1c1c" strokeWidth="1" />
              <line x1="0" y1="92" x2="400" y2="92" stroke="#282828" strokeWidth="1.5" />
              <line x1="0" y1="116" x2="400" y2="116" stroke="#1c1c1c" strokeWidth="1" />
              <line x1="0" y1="140" x2="400" y2="140" stroke="#282828" strokeWidth="1.5" />
              <line x1="0" y1="164" x2="400" y2="164" stroke="#1a1a1a" strokeWidth="1" />
              <line x1="0" y1="190" x2="400" y2="190" stroke="#222222" strokeWidth="1.2" />
              <line x1="0" y1="218" x2="400" y2="218" stroke="#1c1c1c" strokeWidth="1" />

              {/* Vertical Streets / Avenues */}
              <line x1="28" y1="0" x2="28" y2="240" stroke="#1c1c1c" strokeWidth="1" />
              <line x1="62" y1="0" x2="62" y2="240" stroke="#282828" strokeWidth="1.5" />
              <line x1="98" y1="0" x2="98" y2="240" stroke="#1c1c1c" strokeWidth="1" />
              <line x1="134" y1="0" x2="134" y2="240" stroke="#2a2a2a" strokeWidth="1.5" />
              <line x1="172" y1="0" x2="172" y2="240" stroke="#1c1c1c" strokeWidth="1" />
              <line x1="208" y1="0" x2="208" y2="240" stroke="#262626" strokeWidth="1.5" />
              <line x1="244" y1="0" x2="244" y2="240" stroke="#1c1c1c" strokeWidth="1" />
              <line x1="280" y1="0" x2="280" y2="240" stroke="#282828" strokeWidth="1.5" />
              <line x1="316" y1="0" x2="316" y2="240" stroke="#1c1c1c" strokeWidth="1" />
              <line x1="352" y1="0" x2="352" y2="240" stroke="#222222" strokeWidth="1.2" />
              <line x1="384" y1="0" x2="384" y2="240" stroke="#1a1a1a" strokeWidth="1" />

              {/* Angled Avenues (Diagonal Thoroughfares) */}
              <line x1="0" y1="210" x2="340" y2="10" stroke="#333333" strokeWidth="2" />
              <line x1="40" y1="240" x2="380" y2="40" stroke="#222222" strokeWidth="1.2" />
              <line x1="110" y1="0" x2="260" y2="240" stroke="#202020" strokeWidth="1" />

              {/* Subtle City Blocks */}
              <rect x="34" y="24" width="22" height="14" fill="#141414" rx="1" />
              <rect x="68" y="24" width="24" height="14" fill="#141414" rx="1" />
              <rect x="104" y="46" width="24" height="18" fill="#141414" rx="1" />
              <rect x="140" y="46" width="26" height="18" fill="#141414" rx="1" />
              <rect x="140" y="72" width="26" height="16" fill="#141414" rx="1" />
              <rect x="178" y="72" width="24" height="16" fill="#141414" rx="1" />
              <rect x="214" y="96" width="24" height="16" fill="#141414" rx="1" />
              <rect x="250" y="96" width="24" height="16" fill="#141414" rx="1" />
              <rect x="286" y="120" width="24" height="16" fill="#141414" rx="1" />
              <rect x="68" y="96" width="24" height="16" fill="#141414" rx="1" />
              <rect x="104" y="120" width="24" height="16" fill="#141414" rx="1" />
              <rect x="178" y="144" width="24" height="16" fill="#141414" rx="1" />
              <rect x="250" y="168" width="24" height="18" fill="#141414" rx="1" />

              {/* Bold Solid White Route Path (GPS Navigation Trace) */}
              <path
                d="M 50 42 L 50 92 L 208 92 L 208 140 L 280 140 L 280 164 L 320 164"
                stroke="#FFFFFF"
                strokeWidth="3.5"
                strokeLinecap="square"
                strokeLinejoin="miter"
              />

              {/* Origin Point: Static Solid White Square ◼ (Home Pickup) */}
              <rect x="42" y="34" width="16" height="16" fill="#FFFFFF" rx="2" />

              {/* Destination Point: Static Solid White Circle ● (School Drop-off - NO ANIMATION) */}
              <circle cx="320" cy="164" r="8" fill="#FFFFFF" />
            </svg>
          </div>

          {/* Micro Telematics Status Tag */}
          <div className="relative z-10 mt-auto flex items-center justify-between text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
            <span>● Live Route Telematics</span>
            <span>ETA 08:14 AM</span>
          </div>
        </div>

        {/* ─── ROW 1, COL 2: White Card - Brand Manifesto Statement ─── */}
        <div className="relative bg-white min-h-[200px] sm:min-h-[230px] p-6 sm:p-7 flex flex-col justify-center border-b md:border-b-0 md:border-r border-neutral-200">
          <div className="max-w-md">
            <p className="text-lg sm:text-xl md:text-2xl font-medium text-black leading-[1.35] tracking-tight">
              <span className="inline-block mr-2 text-black text-base">●</span>
              Everyone has the right to move freely. And the right to move with pride
              <span className="inline-block ml-2 text-black text-xs">■</span>
            </p>
          </div>
        </div>

        {/* ─── ROW 1, COL 3: Transit Gold Card - Kinetic Repeated Headline ─── */}
        <div className="relative bg-[#FFB800] min-h-[200px] sm:min-h-[230px] p-5 sm:p-6 flex flex-col justify-between border-b md:border-b-0 border-black/10">
          {/* Zigzag Typography: 1 word per line */}
          <div className="my-auto flex flex-col justify-center space-y-1 sm:space-y-1.5">
            <div className="text-left">
              <span
                style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
                className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-black tracking-tight uppercase leading-none inline-block"
              >
                ON-TIME
              </span>
            </div>
            <div className="text-right">
              <span
                style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
                className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-black tracking-tight uppercase leading-none inline-block"
              >
                PREDICTABLE
              </span>
            </div>
            <div className="text-left">
              <span
                style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
                className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-black tracking-tight uppercase leading-none inline-block"
              >
                FRIENDLY
              </span>
            </div>
          </div>

          {/* Bottom Brand Markings */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-[10px] font-medium text-black/80 tracking-tight">
              daily school transit
            </span>
            <span
              style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", sans-serif' }}
              className="text-base sm:text-lg font-bold text-black tracking-tight"
            >
              BuckledIn
            </span>
          </div>
        </div>

        {/* ─── ROW 2, COL 1: Black Card - Playful "Skip the line" + Arrow ─── */}
        <div className="relative bg-black min-h-[200px] sm:min-h-[230px] p-5 sm:p-6 flex flex-col justify-between overflow-hidden border-b md:border-b-0 md:border-r border-neutral-800">
          {/* Top Right: "line" */}
          <div className="flex justify-end">
            <span
              style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", sans-serif' }}
              className="text-2xl sm:text-3xl md:text-4xl font-normal text-white tracking-tight"
            >
              line
            </span>
          </div>

          {/* Center Graphic: Curved Doodle Loop Arrow */}
          <div className="relative w-full h-16 my-0.5">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 280 80" fill="none">
              {/* Whimsical swooping curved arrow from bottom towards top-right */}
              <path
                d="M 65 28 C 130 14, 160 75, 195 70 C 225 65, 230 32, 255 14"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Arrow Head */}
              <polyline
                points="245 18, 256 12, 257 24"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Bottom Left: "Skip" & "the" */}
          <div className="flex items-baseline justify-between">
            <span
              style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", sans-serif' }}
              className="text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight"
            >
              Skip
            </span>
            <span
              style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", sans-serif' }}
              className="text-2xl sm:text-3xl md:text-4xl font-normal text-white tracking-tight mr-8"
            >
              the
            </span>
          </div>
        </div>

        {/* ─── ROW 2, COL 2: Black Outer Cell with White Inner Box - Minimalist Transit Geometry ─── */}
        <div className="relative bg-black min-h-[200px] sm:min-h-[230px] p-2.5 sm:p-3.5 flex items-center justify-center border-b md:border-b-0 md:border-r border-neutral-800">
          <div className="w-full h-full bg-white flex items-center justify-center p-3 sm:p-5">
            <div className="w-full max-w-[270px] sm:max-w-[320px] h-12 sm:h-16 flex items-center justify-center">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 240 50" fill="none">
                {/* Left Origin: Solid Black Circle ● */}
                <circle cx="20" cy="25" r="18" fill="#000000" />

                {/* Left Webbing Strap (seamlessly connects Circle to Latch) */}
                <rect x="20" y="17" width="62" height="16" fill="#000000" />
                <line x1="24" y1="21" x2="78" y2="21" stroke="#333333" strokeWidth="1" strokeDasharray="3 2" />
                <line x1="24" y1="29" x2="78" y2="29" stroke="#333333" strokeWidth="1" strokeDasharray="3 2" />

                {/* Metal Latch Tongue (clicking into buckle) */}
                <path
                  d="M 78 18 L 106 18 C 108 18, 109 19, 109 21 L 109 29 C 109 31, 108 32, 106 32 L 78 32 Z"
                  fill="#E2E8F0"
                  stroke="#000000"
                  strokeWidth="2"
                />
                {/* Metal Tongue Cutout Window */}
                <rect x="87" y="21" width="10" height="8" rx="1.5" fill="#FFFFFF" stroke="#000000" strokeWidth="1.5" />

                {/* Buckle Receiver Housing */}
                <rect x="103" y="10" width="55" height="30" rx="5" fill="#000000" />
                
                {/* Red Release Push Button ("PRESS") */}
                <rect x="107" y="14" width="14" height="22" rx="2.5" fill="#EF4444" />
                <line x1="114" y1="18" x2="114" y2="32" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.85" />

                {/* Buckle Body Accent Chamber */}
                <rect x="126" y="16" width="24" height="18" rx="2" fill="#1E293B" />

                {/* Right Webbing Strap (seamlessly connects Buckle to Square) */}
                <rect x="158" y="17" width="50" height="16" fill="#000000" />
                <line x1="160" y1="21" x2="204" y2="21" stroke="#333333" strokeWidth="1" strokeDasharray="3 2" />
                <line x1="160" y1="29" x2="204" y2="29" stroke="#333333" strokeWidth="1" strokeDasharray="3 2" />

                {/* Right Destination: Solid Black Square ■ */}
                <rect x="204" y="7" width="36" height="36" rx="2" fill="#000000" />
              </svg>
            </div>
          </div>
        </div>

        {/* ─── ROW 2, COL 3: Black Card - Modular Geometric Transit Rhythm ─── */}
        <div className="relative bg-black min-h-[200px] sm:min-h-[230px] p-5 sm:p-6 flex flex-col justify-center border-b md:border-b-0 border-neutral-800">
          <div className="w-full space-y-4 sm:space-y-5">
            {/* Track Line 1 */}
            <div className="relative flex items-center justify-between">
              <div className="absolute inset-x-0 h-0.5 border-t-2 border-dashed border-white/60 pointer-events-none" />
              <div className="relative z-10 w-7 h-7 sm:w-9 sm:h-9 bg-white rounded-l-full" />
              <div className="relative z-10 w-7 h-7 sm:w-9 sm:h-9 bg-[#FDE047] rounded-md" />
              <div className="relative z-10 w-7 h-7 sm:w-9 sm:h-9 bg-[#FFB800] rounded-full" />
            </div>

            {/* Track Line 2 */}
            <div className="relative flex items-center justify-between">
              <div className="absolute inset-x-0 h-0.5 border-t-2 border-dashed border-white/60 pointer-events-none" />
              <div className="relative z-10 w-7 h-7 sm:w-9 sm:h-9 bg-[#F59E0B] rounded-full" />
              <div className="relative z-10 w-7 h-7 sm:w-9 sm:h-9 bg-[#FEF08A] rounded-md" />
              <div className="relative z-10 w-7 h-7 sm:w-9 sm:h-9 bg-[#FFB800] rounded-full" />
              <div className="relative z-10 w-7 h-7 sm:w-9 sm:h-9 bg-[#FFFFFF] rounded-md" />
            </div>

            {/* Track Line 3 */}
            <div className="relative flex items-center justify-between">
              <div className="absolute inset-x-0 h-0.5 border-t-2 border-dashed border-white/60 pointer-events-none" />
              <div className="relative z-10 w-7 h-7 sm:w-9 sm:h-9 bg-[#FEF08A] rounded-l-full" />
              <div className="relative z-10 w-7 h-7 sm:w-9 sm:h-9 bg-white rounded-md" />
              <div className="relative z-10 w-7 h-7 sm:w-9 sm:h-9 bg-[#FFB800] rounded-full" />
              <div className="relative z-10 w-7 h-7 sm:w-9 sm:h-9 bg-[#FDE047] rounded-md" />
            </div>
          </div>
        </div>

        {/* ─── ROW 3, COL 1: 3x3 Photo Swatch Palette with Floating Pill ─── */}
        <div className="relative bg-black min-h-[200px] sm:min-h-[230px] overflow-hidden border-t md:border-t-0 md:border-r border-neutral-800">
          {/* 3x3 Photo & Color Swatches */}
          <div className="grid grid-cols-3 grid-rows-3 h-full w-full gap-[1px] bg-neutral-900">
            {/* Swatch 1: Strawberry Red */}
            <div className="relative bg-[#E63946] overflow-hidden flex flex-col justify-between p-1">
              <span className="text-[8px] font-medium text-white/90">Strawberry</span>
              <img
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80"
                alt="Student"
                className="w-full h-9 sm:h-10 object-cover rounded-sm mt-0.5 mix-blend-luminosity opacity-85"
              />
            </div>

            {/* Swatch 2: Sunlight Amber */}
            <div className="relative bg-[#FFB703] overflow-hidden flex flex-col justify-between p-1">
              <span className="text-[8px] font-medium text-black/80 font-bold">Sunlight</span>
              <img
                src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=300&q=80"
                alt="Smiling child"
                className="w-full h-9 sm:h-10 object-cover rounded-sm mt-0.5 mix-blend-luminosity opacity-85"
              />
            </div>

            {/* Swatch 3: Blueberry Royal */}
            <div className="relative bg-[#1D4ED8] overflow-hidden flex flex-col justify-between p-1">
              <span className="text-[8px] font-medium text-white/90">Blueberry</span>
              <img
                src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=300&q=80"
                alt="Child"
                className="w-full h-9 sm:h-10 object-cover rounded-sm mt-0.5 mix-blend-luminosity opacity-85"
              />
            </div>

            {/* Swatch 4: Sky Cyan */}
            <div className="relative bg-[#38BDF8] overflow-hidden flex flex-col justify-between p-1">
              <span className="text-[8px] font-medium text-black/80 font-bold">Sky</span>
              <img
                src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=300&q=80"
                alt="Parent and child"
                className="w-full h-9 sm:h-10 object-cover rounded-sm mt-0.5 mix-blend-luminosity opacity-85"
              />
            </div>

            {/* Swatch 5: Latte Warm */}
            <div className="relative bg-[#D4A373] overflow-hidden flex flex-col justify-between p-1">
              <span className="text-[8px] font-medium text-black/80 font-bold">Latte</span>
              <img
                src="https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?auto=format&fit=crop&w=300&q=80"
                alt="Child secured"
                className="w-full h-9 sm:h-10 object-cover rounded-sm mt-0.5 mix-blend-luminosity opacity-85"
              />
            </div>

            {/* Swatch 6: Leaf Green */}
            <div className="relative bg-[#00D563] overflow-hidden flex flex-col justify-between p-1">
              <span className="text-[8px] font-medium text-black/90 font-bold">Leaf</span>
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
                alt="Driver"
                className="w-full h-9 sm:h-10 object-cover rounded-sm mt-0.5 mix-blend-luminosity opacity-85"
              />
            </div>

            {/* Swatch 7: Perfume Violet */}
            <div className="relative bg-[#9333EA] overflow-hidden flex flex-col justify-between p-1">
              <span className="text-[8px] font-medium text-white/90">Perfume</span>
              <img
                src="https://images.unsplash.com/photo-1596464716127-f2a829822301?auto=format&fit=crop&w=300&q=80"
                alt="Happy student"
                className="w-full h-9 sm:h-10 object-cover rounded-sm mt-0.5 mix-blend-luminosity opacity-85"
              />
            </div>

            {/* Swatch 8: Tangerine Coral */}
            <div className="relative bg-[#F97316] overflow-hidden flex flex-col justify-between p-1">
              <span className="text-[8px] font-medium text-white/90">Tangerine</span>
              <img
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=300&q=80"
                alt="Student smiling"
                className="w-full h-9 sm:h-10 object-cover rounded-sm mt-0.5 mix-blend-luminosity opacity-85"
              />
            </div>

            {/* Swatch 9: Gumball Mint */}
            <div className="relative bg-[#2DD4BF] overflow-hidden flex flex-col justify-between p-1">
              <span className="text-[8px] font-medium text-black/80 font-bold">Gumball</span>
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=300&q=80"
                alt="Friends"
                className="w-full h-9 sm:h-10 object-cover rounded-sm mt-0.5 mix-blend-luminosity opacity-85"
              />
            </div>
          </div>

          {/* Floating Pill Button (like "↗ Visit site" in reference) */}
          <div className="absolute bottom-2.5 left-2.5 z-20">
            <button
              onClick={onExplore}
              className="inline-flex items-center space-x-1 bg-[#FF6B50] hover:bg-[#FF5533] text-black font-semibold text-[11px] px-3 py-1 rounded-full shadow-lg transition-transform active:scale-95 cursor-pointer"
            >
              <svg className="w-3 h-3 stroke-current stroke-2 fill-none" viewBox="0 0 24 24">
                <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Guardian App</span>
            </button>
          </div>
        </div>

        {/* ─── ROW 3, COL 2: White Card - Brutalist Safety Handbook Grid ─── */}
        <div className="relative bg-white min-h-[200px] sm:min-h-[230px] p-3.5 sm:p-4 flex flex-col justify-between border-t md:border-t-0 md:border-r border-neutral-200">
          <div className="w-full h-full border border-black flex flex-col">
            {/* Row A: S-A-F-E | DRIVER HANDBOOK */}
            <div className="flex border-b border-black">
              <div className="w-1/2 p-1.5 border-r border-black flex items-center">
                <span
                  style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", sans-serif' }}
                  className="text-xl sm:text-2xl font-bold tracking-widest text-black"
                >
                  S-A-F-E
                </span>
              </div>
              <div className="w-1/2 p-1.5 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[9px] font-mono uppercase tracking-wider text-black">
                  <span>GUARDIAN</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono uppercase text-black font-semibold">HANDBOOK</span>
                  {/* Small route wire leading down */}
                  <svg className="w-10 h-4" viewBox="0 0 50 20" fill="none">
                    <path d="M 0 5 L 35 5 C 45 5, 45 15, 45 20" stroke="#000000" strokeWidth="1" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Row B: TRUS-TED | 100% | 2025 */}
            <div className="flex border-b border-black">
              <div className="w-1/2 p-1.5 border-r border-black flex items-center">
                <span
                  style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", sans-serif' }}
                  className="text-lg sm:text-xl font-bold text-black tracking-tight"
                >
                  TRUS—TED
                </span>
              </div>
              <div className="w-1/4 p-1.5 border-r border-black flex items-center justify-center">
                <span className="text-xs font-mono font-bold text-black">100%</span>
              </div>
              <div className="w-1/4 p-1.5 flex items-center justify-center">
                <span className="text-sm sm:text-base font-mono font-bold text-black">2025</span>
              </div>
            </div>

            {/* Row C: ZERO | Standard Audits | PLAN */}
            <div className="flex flex-1">
              <div className="w-1/2 p-1.5 border-r border-black flex flex-col justify-between">
                <span
                  style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", sans-serif' }}
                  className="text-xl sm:text-2xl font-bold text-black leading-none"
                >
                  ZERO
                </span>
                <span className="text-[8px] uppercase font-mono tracking-widest text-black mt-1">
                  COMPLIANCE AUDITS
                </span>
              </div>
              <div className="w-1/4 p-1.5 border-r border-black flex flex-col justify-between text-[8px] font-mono leading-tight text-neutral-800">
                <span>To</span>
                <span className="font-bold">Protect</span>
                <span>Students</span>
              </div>
              <div className="w-1/4 p-1.5 flex items-end justify-center">
                <span
                  style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", sans-serif' }}
                  className="text-xs font-bold tracking-wider text-black"
                >
                  STANDARD
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── ROW 3, COL 3: Transit Gold Card - Continuous Line Art ─── */}
        <div className="relative bg-[#FFB800] min-h-[200px] sm:min-h-[230px] p-5 sm:p-6 flex flex-col justify-between border-t md:border-t-0 border-black/10">
          {/* Continuous Line Art Vector (Cheering Clinking Glasses / Celebration) */}
          <div className="relative w-full h-32 sm:h-36 flex items-center justify-center my-auto">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 280 160" fill="none">
              {/* Starting Dot */}
              <circle cx="28" cy="35" r="3.5" fill="#000000" />
              
              {/* Continuous Line Drawing of Clinking Glasses */}
              <path
                d="M 28 35
                   C 45 35, 60 75, 75 95
                   C 85 110, 105 120, 115 100
                   C 125 80, 120 52, 95 48
                   C 75 42, 70 70, 85 85
                   C 95 95, 105 122, 90 140
                   C 80 152, 70 152, 65 152
                   L 100 152
                   M 90 140
                   C 115 135, 140 90, 155 72
                   C 170 54, 195 50, 210 68
                   C 225 85, 215 112, 190 118
                   C 170 122, 160 95, 175 80
                   C 185 72, 200 102, 195 125
                   C 190 148, 175 152, 170 152
                   L 210 152
                   M 195 125
                   C 215 120, 245 138, 255 152"
                stroke="#000000"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Celebration Sparkle Accents */}
              <circle cx="145" cy="48" r="2" fill="#000000" />
              <circle cx="135" cy="36" r="1.75" fill="#000000" />
            </svg>
          </div>

          {/* Location & Brand Stamp */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-black" />
              <span className="text-[10px] font-mono font-medium text-black tracking-tight">
                Smiles on Every Mile
              </span>
            </div>
            <span className="text-[9px] font-mono text-black/75">
              BuckledIn • Nationwide
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
