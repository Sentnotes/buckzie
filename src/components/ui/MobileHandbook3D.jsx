import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

const NOISE_DATA_URL =
  "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.35'/%3E%3C/svg%3E";

const EASE = [0.22, 1, 0.36, 1];

export default function MobileHandbook3D({
  pages = [],
  activeIndex,
  onActiveIndexChange,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [dims, setDims] = useState({ width: 170, height: 265 });
  const containerRef = useRef(null);

  // Responsive book dimensions so the open 2-page spread always fits cleanly inside the viewport
  useEffect(() => {
    const updateDims = () => {
      const vw = window.innerWidth;
      if (vw >= 640) {
        setDims({ width: 225, height: 340 });
      } else if (vw >= 410) {
        setDims({ width: 176, height: 274 });
      } else {
        setDims({ width: 156, height: 248 });
      }
    };
    updateDims();
    window.addEventListener('resize', updateDims);
    return () => window.removeEventListener('resize', updateDims);
  }, []);

  const prevExternalIndex = useRef(activeIndex);

  // Sync external prev/next header arrow clicks into the mobile handbook
  useEffect(() => {
    if (
      typeof activeIndex === 'number' &&
      activeIndex >= 0 &&
      activeIndex < pages.length &&
      activeIndex !== prevExternalIndex.current
    ) {
      prevExternalIndex.current = activeIndex;
      setIsOpen(true);
      setPageIndex(activeIndex);
    }
  }, [activeIndex, pages.length]);

  // Close when tapping outside the book
  useEffect(() => {
    if (!isOpen) return;
    const handleOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('touchstart', handleOutside);
    document.addEventListener('mousedown', handleOutside);
    return () => {
      document.removeEventListener('touchstart', handleOutside);
      document.removeEventListener('mousedown', handleOutside);
    };
  }, [isOpen]);

  // Reset pages when closing
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setPageIndex(0);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handlePageClick = (index) => {
    if (!isOpen || isFlipping) return;
    if (pageIndex === index && index < pages.length - 1) {
      setIsFlipping(true);
      const next = index + 1;
      setPageIndex(next);
      if (onActiveIndexChange) onActiveIndexChange(next);
      setTimeout(() => setIsFlipping(false), 260);
    }
  };

  const handleBackClick = (e, index) => {
    e.stopPropagation();
    if (isFlipping) return;
    setIsFlipping(true);
    setPageIndex(index);
    if (onActiveIndexChange) onActiveIndexChange(index);
    setTimeout(() => setIsFlipping(false), 260);
  };

  const { width, height } = dims;

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <div
        ref={containerRef}
        className="relative flex items-center justify-center cursor-pointer"
        style={{
          perspective: '1500px',
          width: width * 2 + 16,
          height: height + 36,
        }}
        onClick={() => {
          if (!isOpen) setIsOpen(true);
        }}
      >
        <motion.div
          className="relative"
          style={{
            width,
            height,
            transformStyle: 'preserve-3d',
          }}
          animate={{
            x: isOpen ? width / 2 : 0,
            rotateY: isOpen ? -14 : 0,
            rotateX: isOpen ? 8 : 0,
            z: isOpen ? 30 : 0,
          }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          {/* Back Cover - Tactile Royal Blue Cloth */}
          <div
            className="absolute inset-0 rounded-l-sm rounded-r-md shadow-2xl"
            style={{
              transform: 'translateZ(-18px)',
              boxShadow: '16px 20px 44px rgba(15,23,42,0.38)',
              backgroundColor: '#051D97',
              backgroundImage: `url("${NOISE_DATA_URL}")`,
            }}
          />

          {/* PAGES STACK */}
          {Array.from({ length: pages.length })
            .map((_, i) => pages.length - 1 - i)
            .map((index) => {
              const isFlipped = index < pageIndex;
              const activeZIndex = isFlipped ? index + 1 : 20 - index;
              const page = pages[index];

              return (
                <motion.div
                  key={index}
                  className="absolute inset-y-[2px] right-[2px] left-[4px] origin-left cursor-pointer rounded-l-sm rounded-r-md border border-neutral-100/60 bg-[#fffcf5]"
                  style={{
                    transformStyle: 'preserve-3d',
                    zIndex: activeZIndex,
                  }}
                  animate={{
                    rotateY: isFlipped ? -176 : 0,
                    z: isFlipped ? 0 : pages.length - 1 - index,
                  }}
                  transition={{
                    duration: 0.55,
                    ease: EASE,
                    delay: isFlipped ? 0 : index * 0.03,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isOpen) {
                      setIsOpen(true);
                      return;
                    }
                    if (isFlipped) {
                      handleBackClick(e, index);
                    } else {
                      handlePageClick(index);
                    }
                  }}
                >
                  {/* FRONT FACE (Right side content) */}
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-[#fffdf9] p-3.5 sm:p-5 text-center"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div className="pointer-events-none absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-black/15 via-black/5 to-transparent" />
                    <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-2 bg-gradient-to-r from-black/10 to-transparent" />

                    <div className="relative z-10 w-full font-serif text-neutral-800 select-none">
                      {page.image && (
                        <div className="mb-2 sm:mb-3 overflow-hidden rounded-sm border border-neutral-200 shadow-inner">
                          <img
                            src={page.image}
                            alt={page.title || 'Program'}
                            loading="lazy"
                            decoding="async"
                            className="h-20 sm:h-28 w-full object-cover"
                          />
                        </div>
                      )}
                      {page.subtitle && (
                        <p className="mb-1 font-sans text-[8px] sm:text-[9px] font-semibold tracking-widest text-brand-600 uppercase">
                          {page.subtitle}
                        </p>
                      )}
                      {page.title && (
                        <h3 className="mb-1 sm:mb-1.5 font-sans text-[10px] sm:text-[11px] font-bold tracking-wide text-neutral-900 uppercase leading-tight">
                          {page.title}
                        </h3>
                      )}
                      {page.description && (
                        <p className="text-[9.5px] sm:text-[10.5px] leading-snug sm:leading-relaxed text-neutral-600 line-clamp-4">
                          {page.description}
                        </p>
                      )}
                    </div>
                    <span className="absolute right-3 bottom-2 text-[8px] text-neutral-400 select-none">
                      {index + 1} / {pages.length}
                    </span>
                  </div>

                  {/* BACK FACE (Left side when flipped) */}
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-[#f6f2e9]"
                    style={{
                      transform: 'rotateY(180deg)',
                      backfaceVisibility: 'hidden',
                    }}
                  >
                    <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-black/15 via-black/5 to-transparent" />
                    <div className="rotate-90 transform font-sans text-[8.5px] tracking-widest text-neutral-400 uppercase opacity-50 select-none">
                      Tap to go back
                    </div>
                  </div>
                </motion.div>
              );
            })}

          {/* Front Cover */}
          <motion.div
            className="absolute inset-0 z-50 origin-left cursor-pointer"
            onClick={(e) => {
              if (isOpen) {
                e.stopPropagation();
                setIsOpen(false);
              }
            }}
            style={{
              transformStyle: 'preserve-3d',
            }}
            initial={false}
            animate={{
              rotateY: isOpen ? -178 : 0,
              z: isOpen ? 0 : 12,
            }}
            transition={{
              duration: 0.7,
              ease: EASE,
              delay: isOpen ? 0 : 0.25,
            }}
          >
            {/* Outer Cover */}
            <div
              className="absolute inset-0 overflow-hidden rounded-l-sm rounded-r-md border-l border-white/20 shadow-md"
              style={{
                backgroundImage:
                  'linear-gradient(135deg, #0e85ee 0%, #0267ce 50%, #051D97 100%)',
                backfaceVisibility: 'hidden',
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-30"
                style={{
                  backgroundImage: `url("${NOISE_DATA_URL}")`,
                  backgroundRepeat: 'repeat',
                }}
              />
              <div
                className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-20"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 2.5px),
                    repeating-linear-gradient(90deg, #000 0px, #000 1px, transparent 1px, transparent 2.5px)
                  `,
                  backgroundSize: '2.5px 2.5px',
                }}
              />
              <div
                className="pointer-events-none absolute inset-0 opacity-25"
                style={{
                  background:
                    'radial-gradient(ellipse at 35% 25%, rgba(255,255,255,0.6) 0%, transparent 65%), linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.2) 100%)',
                }}
              />
              <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-6 bg-gradient-to-r from-black/40 via-white/10 to-transparent z-20" />
              <div className="pointer-events-none absolute top-0 bottom-0 left-2.5 w-px bg-black/25 z-20" />
              <div className="pointer-events-none absolute top-0 bottom-0 right-0 w-2.5 bg-gradient-to-l from-black/20 to-transparent z-20" />

              {/* Cover Content */}
              <div className="absolute inset-0 z-10 flex flex-col justify-between p-5 sm:p-6 text-white select-none">
                <div className="flex items-center justify-between border-b border-white/20 pb-2">
                  <span className="font-mono text-[8px] sm:text-[9px] font-semibold tracking-[0.22em] text-white/90 uppercase">
                    BUCKLEDIN
                  </span>
                  <span className="font-mono text-[7.5px] sm:text-[8px] tracking-[0.2em] text-white/75 uppercase">
                    VOL. 01
                  </span>
                </div>

                <div className="my-auto flex flex-col items-center justify-center py-2 text-center">
                  <h3 className="font-serif text-[26px] sm:text-[34px] font-bold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)] leading-none">
                    Programs
                  </h3>
                  <div className="mt-3 h-0.5 w-7 rounded-full bg-white/70" />
                  <p className="mt-3 text-[8.5px] sm:text-[10px] font-sans font-medium tracking-[0.2em] text-white/90 uppercase">
                    9 Tailored Services
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-white/20 pt-2 font-mono text-[7.5px] sm:text-[8.5px] tracking-widest text-white/75 uppercase">
                  <span>TAP TO OPEN</span>
                  <span>K–12</span>
                </div>
              </div>
            </div>

            {/* Inner Cover */}
            <div
              className="absolute inset-0 overflow-hidden rounded-l-md rounded-r-sm border-r border-neutral-200 bg-[#f5f1e8]"
              style={{
                transform: 'rotateY(180deg)',
                backfaceVisibility: 'hidden',
              }}
            >
              <div className="flex h-full w-full flex-col justify-between p-4 sm:p-6 select-none">
                <span className="font-mono text-[8px] uppercase tracking-widest text-neutral-400 text-center">
                  Tap here to close
                </span>
                <div className="text-center">
                  <p className="font-serif text-xs sm:text-sm font-semibold text-neutral-700">
                    Tailored Programs
                  </p>
                  <p className="mt-1 font-sans text-[9px] uppercase tracking-wider text-neutral-400">
                    {pages.length} Chapters
                  </p>
                </div>
                <p className="text-center font-serif text-[10px] sm:text-xs text-neutral-500 italic">
                  BuckledIn Handbook
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Floor Shadow */}
        <div
          className={`pointer-events-none absolute bottom-1 h-8 rounded-[100%] bg-black/35 blur-xl transition-all duration-500 ${
            isOpen ? 'w-[85%] opacity-70' : 'w-[50%] opacity-40'
          }`}
        />
      </div>

      {/* Tap Hint */}
      <p className="mt-3 text-center text-xs text-slate-500">
        {isOpen
          ? `Page ${pageIndex + 1} of ${pages.length} — tap right page for next, left side to go back`
          : 'Tap the handbook to open and flip through all 9 programs'}
      </p>
    </div>
  );
}
