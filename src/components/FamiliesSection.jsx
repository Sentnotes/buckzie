import React from 'react';
import {
  Heart,
  Star
} from 'lucide-react';
import MorphingPillButton from './MorphingPillButton';
import FamilyBrandBento from './FamilyBrandBento';

export default function FamiliesSection({ onBookFamilyRide, onOpenFullProgram }) {
  return (
    <section id="families" className="py-20 md:py-28 bg-slate-50 relative overflow-hidden">
      {/* Background Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />

      {/* Top Part: Header and App Download Badges (Centered) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white text-black border border-slate-200 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>BuckledIn for Families</span>
          </div>
          <h2 style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }} className="font-inktrap text-3xl sm:text-4xl md:text-5xl font-medium text-black tracking-tight leading-tight">
            At Buckled In, every seatbelt clicks into place <span className="text-brand-600">with purpose.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-700 font-medium leading-relaxed">
            Download our Guardian App to see real time transportation updates.
          </p>

          {/* App Store and Google Play Download Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {/* Apple App Store Button */}
            <a
              href="#download-ios"
              onClick={(e) => {
                e.preventDefault();
                alert('BuckledIn Family iOS App download link will be available upon launch!');
              }}
              className="inline-flex items-center space-x-3 bg-black hover:bg-neutral-800 text-white px-7 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border border-neutral-800 active:scale-95 group cursor-pointer"
            >
              <svg className="w-7 h-7 fill-current group-hover:scale-105 transition-transform" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.77 1.06-1.85.94-2.93-1 .04-2.18.66-2.88 1.48-.56.63-1.06 1.73-.93 2.79 1.12.09 2.24-.57 2.87-1.34z"/>
              </svg>
              <div className="text-left font-sans">
                <div className="text-[10px] uppercase tracking-wider text-neutral-400 font-normal leading-none mb-0.5">Download on the</div>
                <div className="text-sm font-medium tracking-normal text-white leading-tight">App Store</div>
              </div>
            </a>

            {/* Google Play Store Button */}
            <a
              href="#download-android"
              onClick={(e) => {
                e.preventDefault();
                alert('BuckledIn Family Android App download link will be available upon launch!');
              }}
              className="inline-flex items-center space-x-3 bg-black hover:bg-neutral-800 text-white px-7 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border border-neutral-800 active:scale-95 group cursor-pointer"
            >
              <svg className="w-7 h-7 group-hover:scale-105 transition-transform" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M3.6 2.3c-.3.3-.5.8-.5 1.4v16.6c0 .6.2 1.1.5 1.4l.1.1 9.3-9.3v-.2L3.6 2.3z" />
                <path fill="#FBBC04" d="M16.1 14.8l-3.1-3.1v-.2l3.1-3.1.1.1 3.7 2.1c1.1.6 1.1 1.6 0 2.2l-3.8 2z" />
                <path fill="#EA4335" d="M16.2 14.7L13 11.6 3.6 21c.4.4 1 .4 1.6.1l11-6.4" />
                <path fill="#34A853" d="M16.2 8.5L5.2 2.2C4.6 1.8 4 1.9 3.6 2.3l9.4 9.4 3.2-3.2z" />
              </svg>
              <div className="text-left font-sans">
                <div className="text-[10px] uppercase tracking-wider text-neutral-400 font-normal leading-none mb-0.5">GET IT ON</div>
                <div className="text-sm font-medium tracking-normal text-white leading-tight">Google Play</div>
              </div>
            </a>
          </div>

          {/* Trust rating badge */}
          <div className="mt-4 flex items-center justify-center space-x-2 text-xs font-semibold text-slate-600">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span>4.9 / 5 Rating • Trusted by 10,000+ Happy Families</span>
          </div>
        </div>
      </div>

      {/* Modernist 3x3 Brand Identity Graphic Matrix */}
      <FamilyBrandBento onExplore={onOpenFullProgram} />

      {/* View More Pill Button */}
      <div className="mt-8 flex justify-center">
        <MorphingPillButton
          label="View More"
          onClick={onOpenFullProgram}
        />
      </div>
    </section>
  );
}
