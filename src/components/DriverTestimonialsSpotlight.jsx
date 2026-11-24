import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const EASE = [0.22, 1, 0.36, 1];

const BACKDROP_TESTIMONIALS = [
  {
    quote:
      "Driving with BuckledIn completely changed my life. I know my exact morning and afternoon hours weeks in advance, and I love seeing the same kids' smiling faces every day.",
    name: 'Marcus Washington',
    role: 'Portland, OR · 3 Years',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
  },
  {
    quote:
      'Every morning route is organized down to the minute. Dispatch checks in whenever traffic shifts so I never feel on my own.',
    name: 'Denise Carter',
    role: 'Harrisburg, PA · 2 Years',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80',
  },
  {
    quote:
      'The weekday school schedule lets me be home for dinner with my own grandkids while earning dependable weekly pay.',
    name: 'Robert Hayes',
    role: 'Kansas City, MO · 3 Years',
    avatar:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80',
  },
  {
    quote:
      'Parents know me by name and trust me with their kids every morning. That kind of respect is rare in driving jobs.',
    name: 'Elena Morales',
    role: 'Phoenix, AZ · 2 Years',
    avatar:
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=160&q=80',
  },
  {
    quote:
      'As a retired educator, I missed working with students. BuckledIn lets me earn great income around a steady weekday school schedule.',
    name: 'Deborah Miller',
    role: 'Seattle, WA · 2 Years',
    avatar: '/driverssection/pic1.jpg',
  },
  {
    quote:
      'No chasing late-night rides or unpredictable surge hours. My bell-time routes are steady all semester long.',
    name: 'Trevor Brooks',
    role: 'Columbus, OH · 1 Year',
    avatar:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=160&q=80',
  },
  {
    quote:
      'The child safety orientation and pre-installed booster seats made onboarding effortless from day one.',
    name: 'Sandra Patel',
    role: 'Tacoma, WA · 2 Years',
    avatar:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&q=80',
  },
  {
    quote:
      'Weekly direct deposit every Friday and clear route pay upfront—I always know exactly what I am earning.',
    name: 'Andre Jenkins',
    role: 'Pittsburgh, PA · 3 Years',
    avatar:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=160&q=80',
  },
  {
    quote:
      'Here, my route is set, the schedule is predictable, and school coordinators and parents treat me with respect and trust.',
    name: 'Carlos Mendez',
    role: 'Portland, OR · 4 Years',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80',
  },
  {
    quote:
      'Knowing I help IEP students start their school day calm and ready to learn is the most rewarding part of my week.',
    name: 'Linda Nguyen',
    role: 'San Diego, CA · 2 Years',
    avatar:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=160&q=80',
  },
  {
    quote:
      'Summer ESY routes kept my schedule full even after the regular school year wrapped up.',
    name: 'Greg Holloway',
    role: 'Cincinnati, OH · 3 Years',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80',
  },
  {
    quote:
      'Local dispatchers actually answer the phone in seconds. It feels like a real team, not an automated app.',
    name: 'Maya Collins',
    role: 'Palm Beach, FL · 2 Years',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
  },
];

export default function DriverTestimonialsSpotlight({ testimonials = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || testimonials.length <= 1) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(id);
  }, [isPaused, testimonials.length]);

  if (!testimonials.length) return null;
  const active = testimonials[activeIndex];

  return (
    <section
      className="relative py-20 sm:py-24 bg-white border-y border-slate-100 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 relative z-20">
          <h2
            style={{
              fontFamily:
                '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif',
            }}
            className="text-3xl sm:text-4xl md:text-5xl font-medium text-black tracking-tight"
          >
            Hear From Our Drivers
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            Read how everyday drivers found meaningful work, stable schedules, and strong community connections.
          </p>
        </div>

        {/* Spotlight Stage (fixed height so switching quotes never resizes the layout) */}
        <div className="relative h-[490px] sm:h-[560px] flex items-center justify-center">
          {/* 1. Faded 4x3 Background Testimonial Grid */}
          <div
            aria-hidden="true"
            className="pointer-events-none select-none absolute inset-0 hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-hidden"
          >
            {BACKDROP_TESTIMONIALS.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-slate-50/75 border border-slate-100/90 p-5 flex flex-col justify-between opacity-55"
              >
                <p className="text-[12.5px] leading-relaxed text-slate-400 font-medium line-clamp-4">
                  {item.quote}
                </p>
                <div className="flex items-center gap-2.5 mt-4">
                  <img
                    src={item.avatar}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="w-8 h-8 rounded-full object-cover grayscale opacity-60 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-[11px] font-semibold text-slate-400 truncate">
                      {item.name}
                    </div>
                    <div className="text-[10px] text-slate-300 truncate">{item.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 2. Soft Radial White Fade Mask Around Center Spotlight */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 hidden sm:block"
            style={{
              background:
                'radial-gradient(ellipse 62% 60% at 50% 52%, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.88) 46%, rgba(255,255,255,0.22) 100%)',
            }}
          />

          {/* 3. Center Spotlight Foreground (Full-Width Arch + Avatar + Bold Quote + Dark Name Pills) */}
          <div className="relative z-20 flex flex-col items-center text-center w-full max-w-2xl mx-auto px-2 sm:px-4">
            {/* True 180-degree Semi-Circle Arc + Active Driver Portrait */}
            <div className="relative flex flex-col items-center justify-end w-[300px] sm:w-[420px] h-[150px] sm:h-[210px] -mb-3 shrink-0">
              <svg
                aria-hidden="true"
                viewBox="0 0 420 210"
                className="pointer-events-none absolute inset-0 w-full h-full overflow-visible"
              >
                <defs>
                  {/* Soft dome fill: completely transparent at base -> soft slate mist at crest */}
                  <linearGradient id="driverArcFill" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0" />
                    <stop offset="32%" stopColor="#e2e8f0" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.58" />
                  </linearGradient>
                </defs>

                {/* Filled true semi-circle dome fading smoothly from its base */}
                <path
                  d="M 12 210 A 198 198 0 0 1 408 210 Z"
                  fill="url(#driverArcFill)"
                />
              </svg>

              {/* Centered Active Avatar */}
              <div className="relative z-10 mb-9 sm:mb-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.name}
                    initial={{ opacity: 0, scale: 0.88, y: 6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.88, y: -6 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden ring-4 ring-white shadow-md bg-slate-100"
                  >
                    <img
                      src={active.avatar}
                      alt={active.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Active Bold Quote (fixed height so switching quotes never shifts size or position) */}
            <div className="relative z-10 w-full h-[180px] sm:h-[168px] flex flex-col items-center justify-center px-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="w-full"
                >
                  <blockquote className="text-lg sm:text-2xl md:text-[24px] font-semibold text-slate-950 tracking-tight leading-[1.35]">
                    {active.quote}
                  </blockquote>
                  <p className="mt-3 text-xs sm:text-sm font-medium text-slate-500">
                    {active.location} &bull; {active.tenure}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dark Pill Selector Buttons */}
            <div
              className="relative z-10 mt-6 flex flex-wrap items-center justify-center gap-2.5"
              role="tablist"
              aria-label="Select driver testimonial"
            >
              {testimonials.map((t, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={t.name}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => {
                      setActiveIndex(idx);
                      setIsPaused(true);
                    }}
                    className={`px-4 py-1.5 rounded-full text-xs sm:text-[13px] font-medium transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-neutral-950 text-white shadow-sm scale-[1.03]'
                        : 'bg-neutral-600/80 text-white/95 hover:bg-neutral-800'
                    }`}
                  >
                    {t.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
