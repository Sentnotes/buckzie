import React from 'react';
import MorphingPillButton from './MorphingPillButton';

export default function DriversSection({ onOpenFullDrivers }) {
  return (
    <section
      id="drivers"
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ backgroundColor: '#F6F6EC' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Main Title Centered */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <h2 style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }} className="font-inktrap text-4xl sm:text-5xl md:text-6xl font-medium text-black tracking-tight">
            Our Drivers
          </h2>
          <p className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
            Empowering Safe &amp; Predictable Student Commutes
          </p>
        </div>

        {/* Grid: Story Text Left, Artwork Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Left Column: Narrative Copy */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <p className="text-lg sm:text-xl text-slate-800 font-semibold leading-relaxed">
              Every child deserves a ride they can look forward to. Our dedicated drivers provide the consistency, compassion, and vigilance needed to make daily school transportation calming, reliable, and secure.
            </p>
            <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed">
              By matching consistent drivers to recurring routes, students build comforting familiarity with the trusted driver who greets them at their doorstep every morning and afternoon.
            </p>
            <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed">
              From thorough background audits to hand-to-hand school handoffs, our drivers are passionate partners in every student's educational journey.
            </p>
          </div>

          {/* Right Column: Driver Home Artwork Image (Seamlessly blends into #F6F6EC) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="w-full max-w-lg lg:max-w-xl">
              <img
                src="/driverhomenologo.jpg"
                alt="Our Drivers - Empowering Safe & Predictable Student Commutes"
                className="w-full h-auto object-contain rounded-3xl block select-none pointer-events-none"
              />
            </div>
          </div>

        </div>

        {/* Morphing Pill Button: View More */}
        <div className="mt-12 md:mt-16 flex justify-center">
          <MorphingPillButton
            label="View More"
            onClick={onOpenFullDrivers}
          />
        </div>

      </div>
    </section>
  );
}
