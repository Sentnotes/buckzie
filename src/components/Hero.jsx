import React, { useRef, useEffect } from 'react';
import {
  Car,
  Award,
  ArrowRight
} from 'lucide-react';
import ScrollRevealText from './ScrollRevealText';

export default function Hero({ onStartBooking }) {
  const videoRef = useRef(null);
  const videoStageRef = useRef(null);
  const videoCardRef = useRef(null);
  const sectionRef = useRef(null);
  const trackPathRef = useRef(null);
  const arrowRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const updateTrackProgress = () => {
      if (!sectionRef.current || !trackPathRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollDistance = Math.max(1, rect.height * 0.58);
      const raw = Math.max(0, -rect.top) / scrollDistance;
      const progress = Math.min(1, 0.34 + raw * 0.66);
      trackPathRef.current.style.strokeDashoffset = (1 - progress).toFixed(4);
      if (arrowRef.current) {
        arrowRef.current.style.opacity = progress > 0.96 ? '1' : '0';
      }

      if (videoStageRef.current && videoCardRef.current) {
        if (window.innerWidth >= 1024) {
          const vRect = videoStageRef.current.getBoundingClientRect();
          const vh = window.innerHeight || 900;
          const startTop = vh * 0.72;
          const endTop = vh * 0.22;
          const rawTilt = (startTop - vRect.top) / Math.max(1, startTop - endTop);
          const t = Math.min(1, Math.max(0, rawTilt));
          const eased = 1 - Math.pow(1 - t, 2.2);
          const rotateX = (1 - eased) * 14;
          const scale = 0.95 + eased * 0.05;
          videoCardRef.current.style.transform = `perspective(1400px) rotateX(${rotateX.toFixed(2)}deg) scale(${scale.toFixed(4)})`;
        } else {
          videoCardRef.current.style.transform = '';
        }
      }
    };

    updateTrackProgress();
    window.addEventListener('scroll', updateTrackProgress, { passive: true });
    window.addEventListener('resize', updateTrackProgress, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateTrackProgress);
      window.removeEventListener('resize', updateTrackProgress);
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
    <section ref={sectionRef} id="home" className="relative pt-28 sm:pt-36 md:pt-44 pb-20 md:pb-28 bg-white overflow-hidden">
      {/* Subtle Faded Architectural Track Line Running Across the Home Hero */}
      <svg
        viewBox="0 0 1440 1400"
        preserveAspectRatio="xMidYMin slice"
        fill="none"
        aria-hidden="true"
        className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-0"
      >
        <defs>
          <linearGradient id="heroBlueprintFade" x1="0" y1="0" x2="0" y2="1400" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0F172A" stopOpacity="0" />
            <stop offset="8%" stopColor="#0F172A" stopOpacity="0.11" />
            <stop offset="88%" stopColor="#0F172A" stopOpacity="0.11" />
            <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Continuous Rounded-Hairpin Architectural Route Track (Scroll-Revealed) */}
        <path
          ref={trackPathRef}
          d="M 720 0 L 720 140 Q 720 225, 635 225 L 210 225 Q 115 225, 115 320 L 115 435 Q 115 530, 210 530 L 1230 530 Q 1325 530, 1325 625 L 1325 890 Q 1325 985, 1230 985 L 805 985 Q 720 985, 720 1070 L 720 1385"
          stroke="url(#heroBlueprintFade)"
          strokeWidth="1.5"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset="0.66"
        />

        {/* Subtle Hollow Waypoint Nodes + Bottom Arrow */}
        <g opacity="0.32">
          <circle cx="720" cy="78" r="4.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />
          <circle cx="115" cy="378" r="4.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />
          <circle cx="1325" cy="755" r="4.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />
          <circle cx="720" cy="1265" r="4.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />
          <path
            ref={arrowRef}
            d="M 714 1376 L 720 1385 L 726 1376"
            stroke="#0F172A"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ opacity: 0, transition: 'opacity 250ms ease' }}
          />
        </g>
      </svg>

      {/* Hero Headline & Actions Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Hero Headline in Pure Whyte Inktrap with Orange, Green, and Blue Accents */}
        <div className="mb-7 pt-2 sm:pt-4">
          <h1
            style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.4rem] font-medium text-black tracking-tight leading-[1.1] select-none"
          >
            Safely <span className="text-[#fe6c10]">In,</span> Securely <span className="text-[#3da02c]">In,</span>
            <br />
            Buckled <span className="text-[#0063ce]">In.</span>
          </h1>

          <p className="mt-5 sm:mt-7 text-base sm:text-xl md:text-2xl text-slate-700 font-medium leading-relaxed max-w-3xl mx-auto">
            Your trusted source for safe, reliable, and cost effective alternative student transportation
          </p>
        </div>

        {/* Hero Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24 sm:mb-32 md:mb-40">
          <button
            onClick={handleDefaultBooking}
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

      {/* Video Container - Tilts Upright Smoothly on Scroll (Desktop lg+) */}
      <div ref={videoStageRef} className="relative z-10 w-full flex justify-center px-4">
        <div
          ref={videoCardRef}
          style={{
            transformOrigin: '50% 65%',
            transition: 'transform 160ms cubic-bezier(0.22, 1, 0.36, 1)',
            willChange: 'transform',
          }}
          className="relative w-full max-w-5xl rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[2.85rem] p-1.5 sm:p-2 lg:p-2.5 bg-white/95 border border-slate-200/90 shadow-[0_28px_70px_rgba(15,23,42,0.14)]"
        >
          <div className="relative w-full h-full rounded-[1.6rem] sm:rounded-[2rem] md:rounded-[2.3rem] overflow-hidden bg-black aspect-[16/9]">
            {/* HTML5 Video */}
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/hero-video.mp4" type="video/mp4" />
              <source
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>

      {/* Purpose Statement Section directly below Video */}
      <div id="schools" className="relative z-10 w-full flex justify-center px-4 mt-20 md:mt-28 scroll-mt-28">
        <div className="w-full max-w-5xl text-center">
          <h2 style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }} className="font-inktrap text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-black tracking-tight leading-[1.15] mb-8">
            Every student deserves a safe, consistent ride to school.
          </h2>
          <ScrollRevealText
            text="But for those students with high needs or experiencing special circumstances, the ride is often uncertain. Buckled In was created to change that."
            className="text-lg sm:text-xl md:text-2xl font-normal leading-relaxed text-center max-w-3xl mx-auto"
          />
        </div>
      </div>
    </section>
  );
}
