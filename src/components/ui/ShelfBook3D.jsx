import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const NOISE_DATA_URL =
  "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.35'/%3E%3C/svg%3E";

const EASE = [0.22, 1, 0.36, 1];

/**
 * True continuous 3D hardcover book for a single-line bookshelf.
 * phase: 'shelved' | 'facing' | 'open'
 *  - 'shelved': Standing edge-on showing its real 3D cloth spine; hover gives a 3D pull-out peek of the cover.
 *  - 'facing':  Pulled forward and rotated to show the full front cover face (cover closed).
 *  - 'open':    Front cover swung open -176deg with clickable flippable pages inside.
 */
export default function ShelfBook3D({
  index,
  title,
  shortTitle,
  subtitle,
  coverColor = '#0267CE',
  backCoverColor = '#034E9B',
  src,
  Icon,
  pages = [],
  phase = 'shelved', // 'shelved' | 'facing' | 'open'
  bookWidth = 220,
  bookHeight = 340,
  thickness = 46,
  tilt = 0,
  onSelect,
  onClose,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  const isOpen = phase === 'open';
  const isFacing = phase === 'facing';
  const isShelved = phase === 'shelved';

  // Reset flipped pages whenever the book leaves the open state
  useEffect(() => {
    if (!isOpen && pageIndex !== 0) {
      setPageIndex(0);
    }
  }, [isOpen, pageIndex]);

  const handlePageClick = (idx) => {
    if (!isOpen || isFlipping) return;
    if (pageIndex === idx) {
      setIsFlipping(true);
      setPageIndex((prev) => prev + 1);
      setTimeout(() => setIsFlipping(false), 260);
    }
  };

  const handleBackClick = (e, idx) => {
    e.stopPropagation();
    if (!isOpen || isFlipping) return;
    setIsFlipping(true);
    setPageIndex(idx);
    setTimeout(() => setIsFlipping(false), 260);
  };

  // Slot width & spine-axis horizontal offset for each phase
  const halfT = thickness / 2;
  const slotWidth = isOpen ? bookWidth * 2 + 22 : isFacing ? bookWidth + 28 : thickness + 6;
  const spineLeft = isOpen ? bookWidth + 11 : isFacing ? 14 : (thickness + 6) / 2;

  // 3D pose of the entire book body (pivoting around its spine axis x = 0)
  // Shelved hover lifts the book smoothly without swinging its cover across neighboring books
  const bookRotateY = isOpen
    ? -10
    : isFacing
      ? 0
      : isHovered
        ? 85
        : 90;

  const bookRotateX = isOpen ? 6 : isFacing ? 3 : isHovered ? 2 : 0;
  const bookRotateZ = isShelved ? (isHovered ? 0 : tilt) : 0;
  const bookY = isOpen ? -6 : isFacing ? -10 : isHovered ? -14 : 0;
  const bookZ = isOpen ? 42 : isFacing ? 36 : isHovered ? 16 : 0;

  const frontCoverBg = src
    ? `url(${src})`
    : `linear-gradient(135deg, ${coverColor} 0%, ${backCoverColor} 100%)`;

  return (
    <motion.div
      initial={false}
      animate={{
        width: slotWidth,
        marginLeft: isOpen ? 10 : isFacing ? 6 : 0,
        marginRight: isOpen ? 10 : isFacing ? 6 : 0,
      }}
      transition={{ duration: 0.48, ease: EASE }}
      className={`relative shrink-0 h-[390px] ${
        isOpen ? 'z-40' : isFacing ? 'z-30' : isHovered ? 'z-20' : 'z-10'
      }`}
      style={{ perspective: '1600px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        if (isShelved && onSelect) {
          onSelect();
        }
      }}
    >
      {/* Animated spine-axis anchor inside the slot */}
      <motion.div
        initial={false}
        animate={{
          left: spineLeft,
          y: bookY,
          z: bookZ,
          rotateY: bookRotateY,
          rotateX: bookRotateX,
          rotateZ: bookRotateZ,
        }}
        transition={{ duration: 0.48, ease: EASE }}
        style={{
          position: 'absolute',
          bottom: 10,
          width: bookWidth,
          height: bookHeight,
          transformOrigin: '0px 50% 0px',
          transformStyle: 'preserve-3d',
        }}
        className={isShelved ? 'cursor-pointer' : ''}
      >
        {/* 1. REAL 3D SPINE (Left face of the book, outward normal = -X) */}
        <div
          className="absolute top-0 bottom-0 left-0 overflow-hidden rounded-[3px] flex flex-col items-center justify-between py-4 px-1 text-white select-none border border-black/15"
          style={{
            width: thickness,
            backgroundColor: coverColor,
            transformOrigin: 'left center',
            transform: `translateZ(${-halfT}px) rotateY(-90deg)`,
            backfaceVisibility: 'hidden',
          }}
        >
          {/* Cloth noise + linen weave */}
          <div
            className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-35"
            style={{ backgroundImage: `url("${NOISE_DATA_URL}")`, backgroundRepeat: 'repeat' }}
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
          {/* Rounded cylinder spine lighting */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/35 via-white/15 to-black/30" />
          <div className="pointer-events-none absolute top-9 inset-x-0 h-px bg-white/30" />
          <div className="pointer-events-none absolute bottom-9 inset-x-0 h-px bg-white/30" />

          {Icon && <Icon className="relative z-10 w-4 h-4 text-white/90 shrink-0" />}

          <span
            className="relative z-10 font-serif text-[12.5px] font-semibold tracking-wide text-white/95 whitespace-nowrap"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            {shortTitle || title}
          </span>

          <span className="relative z-10 font-mono text-[10px] font-bold text-white/80">
            0{index + 1}
          </span>
        </div>

        {/* 2. RIGHT PAGE-BLOCK EDGE (visible paper thickness when turning) */}
        <div
          className="pointer-events-none absolute top-[4px] bottom-[4px] right-[2px]"
          style={{
            width: thickness - 8,
            transformOrigin: 'right center',
            transform: `translateZ(${-halfT + 4}px) rotateY(90deg)`,
            background:
              'repeating-linear-gradient(90deg, #f5f0e4 0px, #f5f0e4 2px, #e4dccb 2px, #e4dccb 3px)',
            boxShadow: 'inset 0 0 8px rgba(0,0,0,0.12)',
          }}
        />

        {/* 3. TOP PAGE-BLOCK EDGE */}
        <div
          className="pointer-events-none absolute top-[3px] left-[2px] right-[3px]"
          style={{
            height: thickness - 8,
            transformOrigin: 'top center',
            transform: `translateZ(${-halfT + 4}px) rotateX(90deg)`,
            background:
              'repeating-linear-gradient(0deg, #f7f3e8 0px, #f7f3e8 2px, #e6dfd0 2px, #e6dfd0 3px)',
          }}
        />

        {/* 4. BACK COVER */}
        <div
          className="absolute inset-0 rounded-l-sm rounded-r-md"
          style={{
            transform: `translateZ(${-halfT}px)`,
            boxShadow: isOpen || isFacing ? '0 10px 24px rgba(15,23,42,0.10)' : '0 4px 10px rgba(15,23,42,0.08)',
            backgroundColor: backCoverColor,
            backgroundImage: `url("${NOISE_DATA_URL}")`,
          }}
        />

        {/* 5. CLICKABLE PAGES STACK */}
        {Array.from({ length: pages.length })
          .map((_, i) => pages.length - 1 - i)
          .map((idx) => {
            const isFlipped = idx < pageIndex;
            const activeZIndex = isFlipped ? idx + 1 : 20 - idx;
            const restingZ = -halfT + 5 + (pages.length - 1 - idx) * 2.5;

            return (
              <motion.div
                key={idx}
                className="absolute inset-y-[3px] right-[3px] left-[3px] origin-left cursor-pointer rounded-l-sm rounded-r-md border border-neutral-200/60 bg-[#fffcf5]"
                style={{
                  transformStyle: 'preserve-3d',
                  zIndex: activeZIndex,
                }}
                animate={{
                  rotateY: isFlipped ? -174 : 0,
                  z: isFlipped ? halfT - 6 : restingZ,
                }}
                transition={{
                  duration: 0.55,
                  ease: EASE,
                  delay: isFlipped ? 0 : idx * 0.04,
                }}
                onClick={(e) => {
                  if (!isOpen) return;
                  e.stopPropagation();
                  if (isFlipped) {
                    handleBackClick(e, idx);
                  } else {
                    handlePageClick(idx);
                  }
                }}
              >
                {/* Front Face (Right-hand page) */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-[#fffdf9] p-5 text-center"
                  style={{
                    transform: 'translateZ(0.5px)',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-2.5 bg-gradient-to-r from-slate-900/[0.06] to-transparent" />

                  <div className="relative z-10 w-full font-serif text-neutral-800 select-none">
                    {pages[idx].image && (
                      <div className="mb-3 overflow-hidden rounded-sm border border-neutral-200 shadow-inner">
                        <img
                          src={pages[idx].image}
                          alt={pages[idx].caption || pages[idx].title || 'Program'}
                          loading="lazy"
                          decoding="async"
                          className="h-32 w-full object-cover"
                        />
                      </div>
                    )}
                    {pages[idx].caption && (
                      <p className="mb-1.5 font-sans text-[9px] font-semibold tracking-widest text-neutral-500 uppercase">
                        {pages[idx].caption}
                      </p>
                    )}
                    {pages[idx].title && (
                      <h3 className="mb-2 font-sans text-[11px] font-bold tracking-widest text-neutral-900 uppercase">
                        {pages[idx].title}
                      </h3>
                    )}
                    {pages[idx].content && (
                      <p className="text-[11px] leading-relaxed text-neutral-600">
                        {pages[idx].content}
                      </p>
                    )}
                    {pages[idx].quote && (
                      <blockquote className="border-l-2 border-neutral-300 pl-3 text-left text-xs text-neutral-600 italic">
                        &ldquo;{pages[idx].quote}&rdquo;
                        {pages[idx].author && (
                          <footer className="mt-2 font-sans text-[9px] text-neutral-500 not-italic">
                            — {pages[idx].author}
                          </footer>
                        )}
                      </blockquote>
                    )}
                  </div>
                  <span className="absolute right-3.5 bottom-2.5 text-[9px] text-neutral-400 select-none">
                    {idx + 1} / {pages.length}
                  </span>
                </div>

                {/* Back Face (Left-hand page once flipped) */}
                <div
                  className="absolute inset-0 flex items-center justify-center bg-[#f6f2e9]"
                  style={{
                    transform: 'rotateY(180deg) translateZ(0.5px)',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-6 bg-gradient-to-r from-slate-900/[0.05] to-transparent" />
                  <div className="rotate-90 transform font-sans text-[9px] tracking-widest text-neutral-400 uppercase opacity-50 select-none">
                    Flip back
                  </div>
                </div>
              </motion.div>
            );
          })}

        {/* 6. FRONT COVER (Swings open -176deg when phase === 'open') */}
        <motion.div
          className="absolute inset-0 z-50 origin-left cursor-pointer"
          style={{
            transformStyle: 'preserve-3d',
          }}
          initial={false}
          animate={{
            rotateY: isOpen ? -176 : 0,
            z: halfT,
          }}
          transition={{
            duration: isOpen ? 0.6 : 0.34,
            ease: EASE,
          }}
          onClick={(e) => {
            if (isOpen && onClose) {
              e.stopPropagation();
              onClose();
            } else if (isShelved && onSelect) {
              e.stopPropagation();
              onSelect();
            }
          }}
        >
          {/* Outer Front Cover Face */}
          <div
            className="absolute inset-0 overflow-hidden rounded-l-sm rounded-r-md border-l border-white/20 shadow-md"
            style={{
              backgroundColor: coverColor,
              backgroundImage: frontCoverBg,
              backgroundSize: src ? 'cover' : undefined,
              backgroundPosition: src ? 'center' : undefined,
              backfaceVisibility: 'hidden',
            }}
          >
            {src ? (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/15 to-black/65" />
                <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-5 bg-gradient-to-r from-black/45 via-white/10 to-transparent z-20" />
              </>
            ) : (
              <>
                <div
                  className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-30"
                  style={{ backgroundImage: `url("${NOISE_DATA_URL}")`, backgroundRepeat: 'repeat' }}
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
                      'radial-gradient(ellipse at 35% 25%, rgba(255,255,255,0.55) 0%, transparent 65%), linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(0,0,0,0.2) 100%)',
                  }}
                />
                <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-7 bg-gradient-to-r from-black/40 via-white/10 to-transparent z-20" />
                <div className="pointer-events-none absolute top-0 bottom-0 left-3 w-px bg-black/25 z-20" />
                <div className="pointer-events-none absolute top-0 bottom-0 right-0 w-3 bg-gradient-to-l from-black/20 to-transparent z-20" />
              </>
            )}

            {/* Front Cover Typography */}
            <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 text-white select-none">
              <div className="flex items-center justify-between border-b border-white/20 pb-2.5">
                <span className="font-mono text-[8.5px] font-semibold tracking-[0.22em] text-white/85 uppercase">
                  BUCKLEDIN
                </span>
                <span className="font-mono text-[8.5px] tracking-[0.2em] text-white/75 uppercase">
                  CH. 0{index + 1}
                </span>
              </div>

              <div className="my-auto text-center px-1">
                <div className="mx-auto mb-3.5 h-px w-10 bg-white/50" />
                <h3 className="font-serif text-[21px] font-bold tracking-tight leading-snug drop-shadow-md">
                  {title}
                </h3>
                <div className="mx-auto mt-3.5 h-px w-10 bg-white/50" />
                <p className="mt-3 text-[9.5px] font-sans font-semibold tracking-[0.2em] uppercase text-white/90">
                  {subtitle}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-white/20 pt-2.5 font-mono text-[8px] tracking-widest text-white/75 uppercase">
                <span>TAILORED PROGRAM</span>
                <span>K–12</span>
              </div>
            </div>
          </div>

          {/* Inner Front Cover Face (Visible on the left when open) */}
          <div
            className="absolute inset-0 overflow-hidden rounded-l-md rounded-r-sm border-r border-neutral-200 bg-[#f5f1e8]"
            style={{
              transform: 'rotateY(180deg)',
              backfaceVisibility: 'hidden',
            }}
          >
            <div className="flex h-full w-full flex-col justify-between p-6 select-none">
              <div className="flex items-center justify-between text-[9px] font-mono uppercase tracking-widest text-neutral-400">
                <span>Ch. 0{index + 1}</span>
                <span>Click to close</span>
              </div>
              <div className="text-center">
                {Icon && <Icon className="w-6 h-6 mx-auto mb-3 text-neutral-400" />}
                <p className="font-serif text-sm font-semibold text-neutral-700">{title}</p>
                <p className="mt-1 font-sans text-[10px] tracking-wider uppercase text-neutral-400">
                  {subtitle}
                </p>
              </div>
              <p className="text-center font-serif text-[11px] text-neutral-500 italic">
                BuckledIn Library
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
