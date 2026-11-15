import React, { useRef, useEffect } from 'react';
import {
  Car,
  Award,
  ArrowRight
} from 'lucide-react';
import ScrollRevealText from './ScrollRevealText';

export default function Hero({ onStartBooking }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
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
    <section id="home" className="pt-20 md:pt-24 pb-20 md:pb-28 bg-white">
      {/* Hero Headline & Actions Container */}
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Hero Headline in Pure Whyte Inktrap with Orange, Green, and Blue Accents */}
        <div className="mb-6 pt-2 sm:pt-4">
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
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
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

      {/* Video Container - Strictly contained with relative and matching Navbar width */}
      <div className="w-full flex justify-center px-4">
        <div className="relative w-full max-w-5xl rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-xl border border-slate-200 bg-black aspect-[16/9]">
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

      {/* Purpose Statement Section directly below Video */}
      <div id="schools" className="w-full flex justify-center px-4 mt-20 md:mt-28 scroll-mt-28">
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
