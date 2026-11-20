import React, { useRef, useEffect } from 'react';
import {
  Car,
  Award,
  ArrowRight
} from 'lucide-react';
import ScrollRevealText from './ScrollRevealText';

export default function Hero({ onStartBooking }) {
  const videoRef = useRef(null);
  const scrubStageRef = useRef(null);
  const heroCopyRef = useRef(null);
  const videoStageRef = useRef(null);
  const videoCardRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    let rafId = 0;

    const updateHeroScrub = () => {
      rafId = 0;
      const stage = scrubStageRef.current;
      const copy = heroCopyRef.current;
      const videoStage = videoStageRef.current;
      const videoCard = videoCardRef.current;
      if (!stage || !copy || !videoStage || !videoCard) return;

      if (window.innerWidth < 1024) {
        copy.style.opacity = '';
        copy.style.transform = '';
        copy.style.pointerEvents = '';
        videoCard.style.transform = '';
        return;
      }

      const stageRect = stage.getBoundingClientRect();
      const vh = window.innerHeight || 900;
      const scrubDistance = Math.max(1, stageRect.height - vh);
      const raw = Math.min(1, Math.max(0, -stageRect.top / scrubDistance));
      const eased = 1 - Math.pow(1 - raw, 1.8);

      // Headline + CTAs recede into depth (shrink & fade) using pure GPU-composited properties
      const copyOpacity = Math.max(0, 1 - raw * 1.45);
      const copyScale = 1 - eased * 0.14;
      const copyShiftY = -eased * 22;

      copy.style.opacity = copyOpacity.toFixed(3);
      copy.style.transform = `translate3d(0, ${copyShiftY.toFixed(1)}px, 0) scale(${copyScale.toFixed(4)})`;
      copy.style.pointerEvents = copyOpacity < 0.2 ? 'none' : 'auto';

      // Use offsetTop/offsetHeight inside the sticky container so liftDistance stays constant across pin/unpin
      const videoH = videoStage.offsetHeight;
      const restCenterY = videoStage.offsetTop + videoH / 2;
      const minSafeCenterY = 92 + videoH / 2;
      const targetCenterY = Math.max(minSafeCenterY, vh * 0.5);
      const liftDistance = Math.min(0, targetCenterY - restCenterY);

      const videoTranslateY = eased * liftDistance;
      const rotateX = (1 - eased) * 14;
      const videoScale = 0.9 + eased * 0.1;

      videoCard.style.transform = `translate3d(0, ${videoTranslateY.toFixed(1)}px, 0) perspective(1400px) rotateX(${rotateX.toFixed(2)}deg) scale(${videoScale.toFixed(4)})`;
    };

    const scheduleUpdate = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateHeroScrub);
      }
    };

    updateHeroScrub();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, []);

  const handleDefaultBooking = () => {
    onStartBooking({
      pickup: 'Current Location (742 Evergreen Terr.)',
      destination: 'Metropolitan Arts Center',
      rideType: {
        id: 'comfort',
        name: 'BuckledIn Comfort',
        desc: 'Spacious legroom, top-rated drivers & quiet mode',
        seats: '1-4',
        eta: '4 min',
        price: '$24.50',
      },
      scheduled: 'now',
      childSeat: null,
    });
  };

  const handleScrollToDrivers = () => {
    const el = document.getElementById('drivers');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative bg-white home-dot-grid overflow-x-clip">
      {/* Scroll-Scrubbed Sticky Hero Stage (Desktop lg+) */}
      <div ref={scrubStageRef} className="relative lg:h-[155vh]">
        <div className="lg:sticky lg:top-0 lg:h-screen lg:flex lg:flex-col lg:items-center lg:justify-start pt-28 sm:pt-36 lg:pt-32 pb-12 lg:pb-8">
          {/* Hero Headline & Actions Container (Recedes into depth on scroll) */}
          <div
            ref={heroCopyRef}
            style={{
              transformOrigin: '50% 45%',
              willChange: 'transform, opacity',
            }}
            className="relative z-10 max-w-4xl mx-auto px-4 text-center"
          >
            {/* Hero Headline in Pure Whyte Inktrap with Orange, Green, and Blue Accents */}
            <div className="mb-7 pt-2 sm:pt-4">
              <h1
                style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
                className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] font-medium text-black tracking-tight leading-[1.08] select-none"
              >
                Safely <span className="text-[#fe6c10]">In,</span> Securely <span className="text-[#3da02c]">In,</span>
                <br />
                Buckled <span className="text-[#0063ce]">In.</span>
              </h1>

              <p className="mt-5 sm:mt-6 text-base sm:text-xl md:text-2xl text-slate-700 font-medium leading-relaxed max-w-3xl mx-auto">
                Your trusted source for safe, reliable, and cost effective alternative student transportation
              </p>
            </div>

            {/* Hero Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 sm:mb-20 lg:mb-10">
              <button
                type="button"
                onClick={() => {}}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full font-normal text-base text-white bg-brand-600 hover:bg-brand-700 shadow-md active:scale-[0.98] transition-all flex items-center justify-center space-x-3 cursor-pointer"
              >
                <Car className="w-5 h-5" />
                <span>Book a Ride Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={handleScrollToDrivers}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full font-normal text-base text-black bg-white hover:bg-slate-50 border border-slate-200 shadow-sm active:scale-[0.98] transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Drive with BuckledIn</span>
                <Award className="w-5 h-5 text-brand-600" />
              </button>
            </div>
          </div>

          {/* Video Container - Rises & Flattens to Replace Copy on Scroll (Desktop lg+) */}
          <div ref={videoStageRef} className="relative z-20 w-full flex justify-center px-4">
            <div
              ref={videoCardRef}
              style={{
                transformOrigin: '50% 50%',
                willChange: 'transform',
              }}
              className="relative w-full max-w-5xl rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[2.85rem] p-1.5 sm:p-2 lg:p-2.5 bg-white/95 border border-slate-200/90 shadow-[0_28px_70px_rgba(15,23,42,0.14)]"
            >
              <div
                className="relative w-full h-full rounded-[1.6rem] sm:rounded-[2rem] md:rounded-[2.3rem] overflow-hidden bg-[#F1F3F6] aspect-[16/9]"
                style={{
                  backgroundImage: 'url("/hero-video-poster.jpg")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {/* HTML5 Video with instant high-priority poster frame */}
                <video
                  ref={videoRef}
                  poster="/hero-video-poster.jpg"
                  preload="metadata"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="/kid-on-board-gps-navigation-rev26-1920x1080-30fps.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Purpose Statement Section directly below Video */}
      <div id="schools" className="relative z-10 w-full flex justify-center px-4 pt-20 sm:pt-24 lg:pt-36 pb-20 md:pb-28 scroll-mt-28">
        <div className="w-full max-w-5xl text-center">
          <h2 style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }} className="font-inktrap text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-black tracking-tight leading-[1.15] mb-8">
            Every student deserves a safe, consistent ride to school.
          </h2>
          <ScrollRevealText
            text="But for those students with high needs or experiencing special circumstances, the ride is often uncertain. BuckledIn was created to change that."
            className="text-lg sm:text-xl md:text-2xl font-normal leading-relaxed text-center max-w-3xl mx-auto"
          />
        </div>
      </div>
    </section>
  );
}
