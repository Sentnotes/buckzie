import React, { useState, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Heart,
  GraduationCap,
  Compass,
  Bus,
  Trophy,
  Sun,
  Users,
} from 'lucide-react';
import MorphingPillButton from './MorphingPillButton';

const BOOK_STYLES = [
  { bg: '#F472B6', text: '#FFFFFF', heightClass: 'h-[320px] sm:h-[360px]', basisClass: 'basis-[32px] sm:basis-[36px]', tilt: '0deg', labelPos: 'top', Icon: Sparkles },
  { bg: '#14532D', text: '#F8FAFC', heightClass: 'h-[370px] sm:h-[420px]', basisClass: 'basis-[56px] sm:basis-[66px]', tilt: '3deg', labelPos: 'bottom', Icon: ShieldCheck },
  { bg: '#2563EB', text: '#FFFFFF', heightClass: 'h-[390px] sm:h-[445px]', basisClass: 'basis-[58px] sm:basis-[68px]', tilt: '0deg', labelPos: 'top', Icon: Heart },
  { bg: '#FDE047', text: '#111827', heightClass: 'h-[395px] sm:h-[450px]', basisClass: 'basis-[64px] sm:basis-[76px]', tilt: '0deg', labelPos: 'bottom', Icon: GraduationCap },
  { bg: '#8B5CF6', text: '#FFFFFF', heightClass: 'h-[405px] sm:h-[465px]', basisClass: 'basis-[42px] sm:basis-[48px]', tilt: '-6deg', labelPos: 'top', Icon: Compass },
  { bg: '#A3E635', text: '#111827', heightClass: 'h-[330px] sm:h-[370px]', basisClass: 'basis-[30px] sm:basis-[34px]', tilt: '-2deg', labelPos: 'top', Icon: Bus },
  { bg: '#1E1B4B', text: '#E0E7FF', heightClass: 'h-[385px] sm:h-[440px]', basisClass: 'basis-[58px] sm:basis-[68px]', tilt: '7deg', labelPos: 'top', Icon: Trophy },
  { bg: '#FB923C', text: '#111827', heightClass: 'h-[355px] sm:h-[405px]', basisClass: 'basis-[44px] sm:basis-[52px]', tilt: '0deg', labelPos: 'bottom', Icon: Sun },
  { bg: '#0EA5E9', text: '#FFFFFF', heightClass: 'h-[375px] sm:h-[425px]', basisClass: 'basis-[50px] sm:basis-[58px]', tilt: '-3deg', labelPos: 'top', Icon: Users },
];

const programs = [
  {
    title: 'Specialized & IEP Support',
    shortTag: 'IEP / IDEA',
    tag: '[IEP & IDEA]',
    image: '/schools/(IEP).png',
    description: 'Special education, Individualized Education Plans (IEP), and students requiring additional support with certified, consistent chauffeurs.',
  },
  {
    title: 'McKinney-Vento Stability',
    shortTag: 'Origin',
    tag: '[School of Origin]',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80',
    description: 'Confidential, dignified transportation for students experiencing housing transitions to remain connected to their district of origin.',
  },
  {
    title: 'Foster Care Continuity',
    shortTag: 'ESSA',
    tag: '[ESSA Compliant]',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=900&q=80',
    description: 'Transportation solutions helping students maintain academic and emotional continuity across changing foster care placements.',
  },
  {
    title: 'Early Childhood & Pre-K',
    shortTag: 'Pre-K',
    tag: '[Child Safety]',
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?auto=format&fit=crop&w=900&q=80',
    description: 'Vehicles equipped with certified child-safety seats and booster devices helping young learners travel safely to Head Start and Pre-K.',
  },
  {
    title: 'Out-of-District Placement',
    shortTag: 'County',
    tag: '[Cross-County]',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=900&q=80',
    description: 'Cross-district and specialized facility transit when students need access to programs outside standard school bus corridors.',
  },
  {
    title: 'Charter & Private Schools',
    shortTag: 'Charter',
    tag: '[Alternative Hub]',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=900&q=80',
    description: 'Custom transportation corridors connecting families to magnet, charter, and private schools without district transportation fleets.',
  },
  {
    title: 'Extracurricular & Athletics',
    shortTag: 'Athletics',
    tag: '[After School]',
    image: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=900&q=80',
    description: 'Scheduled rides for field trips, sports teams, clubs, and enrichment programs when traditional district buses are already parked.',
  },
  {
    title: 'Summer School Programs',
    shortTag: 'Summer',
    tag: '[Year-Round]',
    image: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=900&q=80',
    description: 'Continuous year-round coverage for extended school year programs, credit recovery sessions, and specialized therapy commutes.',
  },
  {
    title: 'General Student Population',
    shortTag: 'Fleet',
    tag: '[Supplemental Fleet]',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=900&q=80',
    description: 'Safe overflow and supplemental capacity to relieve severe district yellow bus driver shortages without route cancellations.',
  },
];

export default function InteractiveShowcase({ onOpenFullSchools }) {
  // First book starts open by default; tapping any spine opens that book
  const [activeIndex, setActiveIndex] = useState(0);
  const bookRefs = useRef([]);

  const selectBook = (idx) => {
    setActiveIndex(idx);
    const el = bookRefs.current[idx];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
    }
  };

  const handlePrev = () => {
    selectBook(activeIndex === 0 ? programs.length - 1 : activeIndex - 1);
  };

  const handleNext = () => {
    selectBook(activeIndex === programs.length - 1 ? 0 : activeIndex + 1);
  };

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          {/* Left Title: 2-line big bold title */}
          <div>
            <h2
              style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
              className="font-inktrap text-4xl sm:text-5xl md:text-6xl font-medium text-black tracking-tight leading-[1.05]"
            >
              Tailored<br />Programs
            </h2>
          </div>

          {/* Right side: Editorial text and book switcher arrows */}
          <div className="flex items-end justify-between md:justify-end gap-6 max-w-xl">
            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
              Every student's path to learning is unique. We provide tailored transportation solutions designed around specialized needs, emotional comfort, and district requirements.
            </p>

            {/* Book navigation buttons */}
            <div className="flex items-center space-x-2 shrink-0">
              <button
                type="button"
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 flex items-center justify-center shadow-xs cursor-pointer active:scale-95 transition-all"
                aria-label="Previous program"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 flex items-center justify-center shadow-xs cursor-pointer active:scale-95 transition-all"
                aria-label="Next program"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── UNIFIED ILLUSTRATED BOOKSHELF (Open Directly on Section Background) ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="overflow-x-auto lg:overflow-visible no-scrollbar pt-12 pb-10">
          <div className="min-w-[820px] sm:min-w-[940px] lg:min-w-0">
            <div className="flex items-end gap-2 sm:gap-2.5">
              {programs.map((item, idx) => {
                const isOpen = idx === activeIndex;
                const bookNum = String(idx + 1).padStart(2, '0');
                const spec = BOOK_STYLES[idx % BOOK_STYLES.length];
                const MotifIcon = spec.Icon;

                return (
                  <div
                    key={item.title}
                    ref={(el) => {
                      bookRefs.current[idx] = el;
                    }}
                    role="button"
                    tabIndex={0}
                    onClick={() => selectBook(idx)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        selectBook(idx);
                      }
                    }}
                    aria-expanded={isOpen}
                    style={{
                      flexGrow: isOpen ? 1 : 0,
                      flexShrink: 0,
                      backgroundColor: isOpen ? '#FCFBF7' : spec.bg,
                      transformOrigin: 'bottom center',
                      transform: isOpen ? 'rotate(0deg)' : `rotate(${spec.tilt})`,
                      transition:
                        'flex-grow 600ms cubic-bezier(0.22, 1, 0.36, 1), transform 400ms ease, box-shadow 450ms ease, background-color 400ms ease, filter 250ms ease',
                    }}
                    className={`relative ${spec.basisClass} ${
                      isOpen ? 'h-[390px] sm:h-[450px]' : spec.heightClass
                    } rounded-[2px] cursor-pointer select-none ${
                      isOpen
                        ? 'border border-slate-200 shadow-[0_18px_40px_-14px_rgba(15,23,42,0.14)] overflow-hidden'
                        : 'hover:brightness-95 mx-0.5'
                    }`}
                  >
                    {/* Floating Micro-Tag Outside Top or Bottom (When Closed) */}
                    {!isOpen && (
                      <span
                        className={`pointer-events-none absolute left-1/2 -translate-x-1/2 text-[10px] font-mono font-medium text-slate-500 whitespace-nowrap ${
                          spec.labelPos === 'top' ? '-top-6' : '-bottom-6'
                        }`}
                      >
                        {item.shortTag}
                      </span>
                    )}

                    {/* Top Bookmark Accent Band (Visible when open) */}
                    <div
                      style={{ backgroundColor: spec.bg }}
                      className={`absolute top-0 inset-x-0 h-1.5 z-20 transition-opacity duration-300 ${
                        isOpen ? 'opacity-100' : 'opacity-0'
                      }`}
                    />

                    {/* ── Open Two-Page Textbook Spread (3D Hinge Opening) ── */}
                    <div
                      className={`absolute inset-0 min-w-[350px] sm:min-w-[460px] lg:min-w-[540px] grid grid-cols-2 bg-[#FCFBF7] transition-opacity duration-300 ${
                        isOpen
                          ? 'opacity-100 delay-100 pointer-events-auto'
                          : 'opacity-0 pointer-events-none'
                      }`}
                    >
                      {/* Center Textbook Spine Gutter Shadow */}
                      <div
                        className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-6 sm:w-8 z-10"
                        style={{
                          background:
                            'linear-gradient(90deg, rgba(15,23,42,0) 0%, rgba(15,23,42,0.07) 48%, rgba(15,23,42,0.11) 50%, rgba(15,23,42,0.04) 55%, rgba(15,23,42,0) 100%)',
                        }}
                      />

                      {/* Left Page: Centered Chapter Heading & Editorial Copy */}
                      <div
                        style={{
                          transformOrigin: 'right center',
                          transform: isOpen
                            ? 'perspective(1100px) rotateY(0deg)'
                            : 'perspective(1100px) rotateY(35deg)',
                          transition: 'transform 800ms cubic-bezier(0.22, 1, 0.36, 1)',
                        }}
                        className="flex flex-col justify-between p-3.5 sm:p-5 lg:p-6 pt-5 sm:pt-7 pr-4 sm:pr-6 lg:pr-7 border-r border-slate-200/70 bg-[#FCFBF7]"
                      >
                        <div className="flex items-center justify-between gap-1.5 sm:gap-2">
                          <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                            Ch. {bookNum}
                          </span>
                          <span className="text-[9px] sm:text-[10px] font-mono text-brand-600 font-bold bg-brand-50 px-1.5 sm:px-2 py-0.5 rounded-full truncate">
                            {item.tag}
                          </span>
                        </div>

                        <div className="flex-1 flex flex-col items-center justify-center text-center px-0.5 sm:px-1 my-2 sm:my-3">
                          <h3
                            style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
                            className="font-inktrap text-sm sm:text-lg lg:text-xl font-medium text-black tracking-tight leading-snug mb-2 sm:mb-3"
                          >
                            {item.title}
                          </h3>
                          <p className="text-[11px] sm:text-xs lg:text-[13px] text-slate-600 font-medium leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-2.5 sm:pt-3 border-t border-slate-200/70">
                          <span className="text-[9px] sm:text-[10px] font-mono text-slate-400">
                            p. {idx * 2 + 1}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onOpenFullSchools) onOpenFullSchools();
                            }}
                            className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-black hover:text-brand-600 transition-colors cursor-pointer"
                          >
                            <span>Details</span>
                            <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Right Page: Framed Photo Plate & Figure Caption */}
                      <div
                        style={{
                          transformOrigin: 'left center',
                          transform: isOpen
                            ? 'perspective(1100px) rotateY(0deg)'
                            : 'perspective(1100px) rotateY(-115deg)',
                          transition: 'transform 850ms cubic-bezier(0.22, 1, 0.36, 1)',
                          backfaceVisibility: 'hidden',
                        }}
                        className="relative flex flex-col justify-between p-3.5 sm:p-5 lg:p-6 pt-5 sm:pt-7 pl-4 sm:pl-6 lg:pl-7 bg-[#FCFBF7]"
                      >
                        <div
                          className={`pointer-events-none absolute inset-0 z-20 transition-opacity duration-700 ${
                            isOpen ? 'opacity-0' : 'opacity-100'
                          }`}
                          style={{
                            background:
                              'linear-gradient(90deg, rgba(15,23,42,0.22) 0%, rgba(15,23,42,0.08) 45%, rgba(15,23,42,0) 100%)',
                          }}
                        />

                        <div className="w-full flex-1 min-h-0 rounded-lg sm:rounded-xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-xs">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                          />
                        </div>

                        <div className="flex items-center justify-between pt-2.5 sm:pt-3 mt-2.5 sm:mt-3 border-t border-slate-200/70">
                          <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 truncate pr-2">
                            FIG. {bookNum} — {item.title}
                          </span>
                          <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 shrink-0">
                            p. {idx * 2 + 2}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* ── Closed Expressive Illustrated Spine ── */}
                    <div
                      style={{
                        transformOrigin: 'left center',
                        transform: isOpen
                          ? 'perspective(1000px) rotateY(-110deg)'
                          : 'perspective(1000px) rotateY(0deg)',
                        backfaceVisibility: 'hidden',
                        color: spec.text,
                        transition:
                          'transform 650ms cubic-bezier(0.22, 1, 0.36, 1), opacity 320ms ease',
                      }}
                      className={`absolute inset-0 z-20 flex flex-col items-center justify-between py-4 px-1 ${
                        isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100 delay-150'
                      }`}
                    >
                      <span
                        className="text-[9px] sm:text-[10px] font-medium opacity-75 whitespace-nowrap"
                        style={{
                          writingMode: 'vertical-rl',
                          transform: 'rotate(180deg)',
                        }}
                      >
                        BuckledIn
                      </span>

                      <div className="flex flex-col items-center justify-center gap-3 my-auto">
                        <MotifIcon className="w-4 h-4 sm:w-5 sm:h-5 opacity-85 stroke-[1.75]" />
                        <span
                          className="font-inktrap text-[12px] sm:text-[13px] lg:text-[14px] font-medium tracking-tight whitespace-nowrap"
                          style={{
                            fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif',
                            writingMode: 'vertical-rl',
                            transform: 'rotate(180deg)',
                          }}
                        >
                          {item.title}
                        </span>
                      </div>

                      <span className="text-[10px] font-mono font-bold opacity-75">
                        {idx + 1}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Read More Pill Button (Navigates to Dedicated Schools Page) */}
      <div className="mt-10 flex justify-center">
        <MorphingPillButton
          label="Read More"
          onClick={onOpenFullSchools}
        />
      </div>
    </section>
  );
}
