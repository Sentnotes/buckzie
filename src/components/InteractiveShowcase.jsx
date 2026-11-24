import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
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
import ShelfBook3D from './ui/ShelfBook3D';
import MobileHandbook3D from './ui/MobileHandbook3D';

const PROGRAM_BOOKS = [
  {
    title: 'Specialized & IEP Support',
    shortTitle: 'IEP & Special Ed',
    shortTag: 'IEP / IDEA',
    subtitle: 'IEP & IDEA',
    tag: '[IEP & IDEA]',
    coverColor: '#051D97',
    backCoverColor: '#04146B',
    spineHeight: 336,
    thickness: 44,
    tilt: 0,
    Icon: Sparkles,
    image: '/schools/(IEP).png',
    description:
      'Special education, Individualized Education Plans (IEP), and students requiring additional support with certified, consistent drivers.',
    quote: 'Consistent drivers and calm routines make every school morning predictable.',
  },
  {
    title: 'McKinney-Vento Stability',
    shortTitle: 'McKinney-Vento',
    shortTag: 'Origin',
    subtitle: 'School of Origin',
    tag: '[School of Origin]',
    coverColor: '#14532D',
    backCoverColor: '#0E3B20',
    spineHeight: 356,
    thickness: 44,
    tilt: 1.5,
    Icon: ShieldCheck,
    image: '/librarybooks/Mckinnet-Vento.jpg',
    description:
      'Confidential, dignified transportation for students experiencing housing transitions to remain connected to their district of origin.',
    quote: 'Keeping students anchored to their teachers, friends, and school community.',
  },
  {
    title: 'Foster Care Continuity',
    shortTitle: 'Foster Care',
    shortTag: 'ESSA',
    subtitle: 'ESSA Compliant',
    tag: '[ESSA Compliant]',
    coverColor: '#0267CE',
    backCoverColor: '#034E9B',
    spineHeight: 346,
    thickness: 44,
    tilt: 0,
    Icon: Heart,
    image:
      'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=900&q=80',
    description:
      'Transportation solutions helping students maintain academic and emotional continuity across changing foster care placements.',
    quote: 'Seamless district coordination so placement changes never interrupt learning.',
  },
  {
    title: 'Early Childhood & Pre-K',
    shortTitle: 'Early Childhood',
    shortTag: 'Pre-K',
    subtitle: 'Child Safety',
    tag: '[Child Safety]',
    coverColor: '#B45309',
    backCoverColor: '#8A3F07',
    spineHeight: 326,
    thickness: 44,
    tilt: -1.5,
    Icon: GraduationCap,
    image: '/librarybooks/EarlyChildhood.jpg',
    description:
      'Vehicles equipped with certified child-safety seats and booster devices helping young learners travel safely to Head Start and Pre-K.',
    quote: 'Age-appropriate car seats, booster checks, and gentle handoffs at the door.',
  },
  {
    title: 'Out-of-District Placement',
    shortTitle: 'Out-of-District',
    shortTag: 'County',
    subtitle: 'Cross-County',
    tag: '[Cross-County]',
    coverColor: '#5B21B6',
    backCoverColor: '#431886',
    spineHeight: 362,
    thickness: 42,
    tilt: -2,
    Icon: Compass,
    image: '/librarybooks/out-of-district.jpg',
    description:
      'Cross-district and specialized facility transit when students need access to programs outside standard school bus corridors.',
    quote: 'Reliable regional coverage when specialized schools sit miles across county lines.',
  },
  {
    title: 'Charter & Private Schools',
    shortTitle: 'Charter & Private',
    shortTag: 'Charter',
    subtitle: 'Alternative Hub',
    tag: '[Alternative Hub]',
    coverColor: '#0F766E',
    backCoverColor: '#0B5751',
    spineHeight: 332,
    thickness: 42,
    tilt: 0,
    Icon: Bus,
    image: '/librarybooks/CharterandPrivate.jpg',
    description:
      'Custom transportation corridors connecting families to magnet, charter, and private schools without district transportation fleets.',
    quote: 'Purpose-built corridors tailored to independent bell schedules.',
  },
  {
    title: 'Extracurricular & Athletics',
    shortTitle: 'Extracurricular',
    shortTag: 'Athletics',
    subtitle: 'After School',
    tag: '[After School]',
    coverColor: '#1E1B4B',
    backCoverColor: '#141234',
    spineHeight: 352,
    thickness: 44,
    tilt: 2,
    Icon: Trophy,
    image: '/librarybooks/extracurricular.jpg',
    description:
      'Scheduled rides for field trips, sports teams, clubs, and enrichment programs when traditional district buses are already parked.',
    quote: 'Every student gets to participate—even after the last yellow bus leaves.',
  },
  {
    title: 'Summer School Programs',
    shortTitle: 'Summer School',
    shortTag: 'Summer',
    subtitle: 'Year-Round',
    tag: '[Year-Round]',
    coverColor: '#C2410C',
    backCoverColor: '#913009',
    spineHeight: 328,
    thickness: 44,
    tilt: 0,
    Icon: Sun,
    image: '/librarybooks/Summerschool.jpg',
    description:
      'Continuous year-round coverage for extended school year programs, credit recovery sessions, and specialized therapy commutes.',
    quote: 'Uninterrupted support through ESY, enrichment camps, and summer sessions.',
  },
  {
    title: 'General Student Population',
    shortTitle: 'General Transit',
    shortTag: 'Fleet',
    subtitle: 'Supplemental Fleet',
    tag: '[Supplemental Fleet]',
    coverColor: '#0369A1',
    backCoverColor: '#024E78',
    spineHeight: 344,
    thickness: 44,
    tilt: -1.5,
    Icon: Users,
    image:
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=900&q=80',
    description:
      'Safe overflow and supplemental capacity to relieve severe district yellow bus driver shortages without route cancellations.',
    quote: 'Flexible W-2 driver capacity that keeps every bell-time route running.',
  },
];

export default function InteractiveShowcase({ onOpenFullSchools }) {
  const [phases, setPhases] = useState(() =>
    PROGRAM_BOOKS.map((_, i) => (i === 0 ? 'open' : 'shelved'))
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const timersRef = useRef([]);

  const clearTimers = () => {
    timersRef.current.forEach((id) => clearTimeout(id));
    timersRef.current = [];
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  const setBookPhase = (idx, nextPhase) => {
    setPhases((prev) => prev.map((p, i) => (i === idx ? nextPhase : p)));
  };

  const resetAllExcept = (keepIdx, keepPhase) => {
    setPhases(PROGRAM_BOOKS.map((_, i) => (i === keepIdx ? keepPhase : 'shelved')));
  };

  // Choreographed 3D sequence:
  // Close current (show face) -> Return to shelf while new book pulls out & shows face -> Open new book
  const selectBook = (targetIdx) => {
    clearTimers();

    const currentIdx = activeIndex;

    if (targetIdx === null) {
      if (currentIdx === null) return;
      setActiveIndex(null);
      resetAllExcept(currentIdx, 'facing');
      timersRef.current.push(
        setTimeout(() => {
          setBookPhase(currentIdx, 'shelved');
        }, 300)
      );
      return;
    }

    if (targetIdx === currentIdx) return;

    setActiveIndex(targetIdx);

    if (currentIdx === null) {
      resetAllExcept(targetIdx, 'facing');
      timersRef.current.push(
        setTimeout(() => {
          setBookPhase(targetIdx, 'open');
        }, 380)
      );
      return;
    }

    // Beat 1 (0ms): Close current cover so its front face shows
    resetAllExcept(currentIdx, 'facing');

    // Beat 2 (280ms): Return current to spine on shelf & pull out new book to show its front face
    timersRef.current.push(
      setTimeout(() => {
        setPhases(
          PROGRAM_BOOKS.map((_, i) => (i === targetIdx ? 'facing' : 'shelved'))
        );
      }, 280)
    );

    // Beat 3 (680ms): Swing the new book's front cover open
    timersRef.current.push(
      setTimeout(() => {
        setBookPhase(targetIdx, 'open');
      }, 680)
    );
  };

  const handlePrev = () => {
    const nextIdx =
      activeIndex === null
        ? PROGRAM_BOOKS.length - 1
        : activeIndex === 0
          ? PROGRAM_BOOKS.length - 1
          : activeIndex - 1;
    selectBook(nextIdx);
  };

  const handleNext = () => {
    const nextIdx =
      activeIndex === null
        ? 0
        : activeIndex === PROGRAM_BOOKS.length - 1
          ? 0
          : activeIndex + 1;
    selectBook(nextIdx);
  };

  const mobileActiveIndex = activeIndex !== null ? activeIndex : 0;
  const activeBook = activeIndex !== null ? PROGRAM_BOOKS[activeIndex] : null;

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          {/* Left Title */}
          <div>
            <h2
              style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
              className="font-inktrap text-4xl sm:text-5xl md:text-6xl font-medium text-black tracking-tight leading-[1.05]"
            >
              Tailored<br />Programs
            </h2>
          </div>

          {/* Right side: Editorial text, Shelf All button, and Prev/Next arrows */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between md:justify-end gap-5 max-w-2xl">
            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
              Every student&apos;s path to learning is unique. We provide tailored transportation solutions designed around specialized needs, emotional comfort, and district requirements.
            </p>

            {/* Shelf All + Arrow Navigation Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              {activeIndex !== null && (
                <button
                  type="button"
                  onClick={() => selectBook(null)}
                  className="hidden lg:inline-flex items-center px-3.5 h-10 rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-100 shadow-xs transition-all cursor-pointer active:scale-95"
                >
                  Shelf All
                </button>
              )}
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

      {/* ── BOOKSHELF CONTAINER ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile & Tablet (< lg): Single Interactive 3D Handbook */}
        <div className="lg:hidden overflow-hidden">
          <MobileHandbook3D
            pages={PROGRAM_BOOKS}
            activeIndex={mobileActiveIndex}
            onActiveIndexChange={(idx) => setActiveIndex(idx)}
          />
        </div>

        {/* Desktop (lg+): Single-Line True 3D Interactive Bookshelf */}
        <div className="hidden lg:block relative">
          <div className="overflow-x-auto pb-8 pt-10 px-2 no-scrollbar">
            <div className="flex items-end justify-center gap-1.5 min-w-max mx-auto min-h-[400px]">
              {PROGRAM_BOOKS.map((program, idx) => (
                <ShelfBook3D
                  key={program.title}
                  index={idx}
                  title={program.title}
                  shortTitle={program.shortTitle}
                  subtitle={program.subtitle}
                  coverColor={program.coverColor}
                  backCoverColor={program.backCoverColor}
                  Icon={program.Icon}
                  phase={phases[idx]}
                  bookWidth={210}
                  bookHeight={program.spineHeight}
                  thickness={program.thickness}
                  tilt={program.tilt}
                  onSelect={() => selectBook(idx)}
                  onClose={() => selectBook(null)}
                  pages={[
                    {
                      title: program.title,
                      content: program.description,
                    },
                    {
                      image: program.image,
                      caption: program.subtitle,
                    },
                    {
                      quote: program.quote,
                      author: 'BuckledIn Programs',
                    },
                  ]}
                />
              ))}
            </div>
          </div>

          {/* Minimalist Shelf Ledge */}
          <div className="relative mx-auto max-w-6xl">
            <div className="h-3 rounded-full bg-gradient-to-b from-slate-200 via-slate-300 to-slate-200 shadow-[0_14px_28px_-8px_rgba(15,23,42,0.22)]" />
          </div>

          {/* Subtle Helper Caption */}
          <div className="mt-5 flex items-center justify-between gap-4 max-w-6xl mx-auto text-xs text-slate-500">
            <div>
              {activeBook ? (
                <span>
                  Viewing <strong className="text-slate-900">{activeBook.title}</strong> — click the right page to flip forward, flipped left pages to go back, or the inner left cover to return it to the shelf.
                </span>
              ) : (
                <span>Click any book spine on the shelf to pull it out and open it in 3D.</span>
              )}
            </div>
            <span className="font-mono text-[11px] text-slate-500 shrink-0">
              {activeIndex !== null
                ? `BOOK 0${activeIndex + 1} / 0${PROGRAM_BOOKS.length}`
                : `${PROGRAM_BOOKS.length} BOOKS SHELVED`}
            </span>
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
