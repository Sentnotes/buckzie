import React, { useState } from 'react';
import {
  Sparkles,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Calendar,
  MapPin,
  ShieldCheck
} from 'lucide-react';
import PlacesWeOperate from './PlacesWeOperate';
import ScrollRevealText from './ScrollRevealText';
import MorphingPillButton from './MorphingPillButton';

export default function AboutSection({ onOpenFullAbout }) {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: 'How does Buckled In differ from standard rideshare and traditional school buses?',
      a: 'Buckled In bridges the critical gap between yellow buses and private rides. We provide dedicated, recurring vetted chauffeurs with pre-installed sanitized child seats, live telematics for parents and district supervisors, and McKinney-Vento / IDEA compliant routing.',
    },
    {
      q: 'Are all Buckled In drivers background checked and certified?',
      a: 'Yes. Every driver undergoes a rigorous multi-jurisdiction criminal background check, motor vehicle history audit, and regular vehicle inspections. Drivers also complete child safety and authorized student escort certifications.',
    },
    {
      q: 'Can school districts track student rides in real time?',
      a: 'Absolutely. District administrators receive direct access to our telematics dashboard with automated student manifest check-ins, live GPS coordinates, and real-time arrival timestamps.',
    },
    {
      q: 'How are recurring school carpools and IEP transit schedules handled?',
      a: 'With Buckled In, consistent drivers are matched to each route so students see the same familiar face every morning and afternoon, establishing calming predictability for students with IEPs or specialized needs.',
    },
    {
      q: 'What happens if there is unexpected traffic or weather delays?',
      a: 'Our 24/7 telematics operations center monitors all active routes continuously. Parents and school liaisons receive automatic arrival time adjustments and proactive notifications well before scheduled drop-offs.',
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Our Ride (Teaser / 1/3 Story) */}
        <div className="text-center max-w-5xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-bold text-brand-600 uppercase tracking-wider mb-6 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Heritage &amp; Purpose</span>
          </div>
          <h2 style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }} className="font-inktrap text-4xl sm:text-6xl md:text-7xl font-medium text-black tracking-tight">
            Our Ride
          </h2>
          <ScrollRevealText
            text="Our company was founded in Beaverton, Oregon in 1997 to help local school districts manage their transportation challenges. As news of a new alternative option in student transportation expanded, so did the size of the business. After years of successful growth locally, the business was acquired and evolved into Assist Services LLC."
            className="mt-8 text-lg sm:text-xl md:text-2xl font-normal leading-relaxed text-center max-w-4xl mx-auto"
          />

          {/* Quick Highlight Badges */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3.5">
            <span className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-100 text-slate-800 text-xs sm:text-sm font-bold border border-slate-200">
              <Calendar className="w-4 h-4 text-brand-600" />
              <span>Founded in 1997</span>
            </span>
            <span className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-100 text-slate-800 text-xs sm:text-sm font-bold border border-slate-200">
              <MapPin className="w-4 h-4 text-brand-600" />
              <span>Beaverton, Oregon</span>
            </span>
            <span className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-100 text-slate-800 text-xs sm:text-sm font-bold border border-slate-200">
              <ShieldCheck className="w-4 h-4 text-brand-600" />
              <span>29+ Years of Safe Miles</span>
            </span>
          </div>

          {/* Morphing Pill Button: Read More */}
          <div className="mt-10 flex justify-center">
            <MorphingPillButton
              label="Read More"
              onClick={onOpenFullAbout}
            />
          </div>
        </div>

        {/* Places We Operate Interactive Map (Right below Read Our Full Story) */}
        <PlacesWeOperate />

        {/* Frequently Asked Questions (Common Questions Part Kept Clean & Intact) */}
        <div className="max-w-3xl mx-auto pt-10 border-t border-slate-200">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight">
              Common Questions
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
              Everything you need to know about district partnerships, safety standards, and student rides.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs hover:border-slate-300 transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span className="font-bold text-black text-sm sm:text-base leading-snug">
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-brand-600 flex-shrink-0 ml-2" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0 ml-2" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-slate-700 font-medium bg-white leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
