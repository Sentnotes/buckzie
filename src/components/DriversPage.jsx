import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  Car,
  ShieldCheck,
  CalendarCheck,
  DollarSign,
  HeartHandshake,
  Sparkles,
  CheckCircle2,
  Clock,
  Award,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Check,
  Send,
  Users,
  AlertCircle,
  FileText,
  Phone,
  Mail,
  User,
  X
} from 'lucide-react';
import MorphingPillButton from './MorphingPillButton';

const driverBenefits = [
  {
    title: 'Predictable School Hours',
    description: 'Consistent morning drop-offs and afternoon pickups built around weekday school bell schedules, with optional midday or off-hour ride requests as needed.',
    icon: Clock
  },
  {
    title: 'Daily Route Consistency',
    description: 'Commit to the same recurring student routes each academic term. Build comforting familiarity, trust, and predictability for families.',
    icon: CalendarCheck
  },
  {
    title: 'Safe Student Commutes',
    description: 'Transport verified K-12 students under official school district authorization manifests, following established pickup and drop-off protocols.',
    icon: ShieldCheck
  },
  {
    title: 'Competitive Route Pay',
    description: 'Competitive route compensation with clear earnings visibility before you accept a trip.',
    icon: DollarSign
  },
  {
    title: 'Dedicated Local Dispatch',
    description: 'Live coordinators and safety dispatchers actively monitor every ride and are available to assist you at the touch of a button.',
    icon: HeartHandshake
  }
];

const safetyStandards = [
  {
    number: '01',
    title: 'Multi-Jurisdictional Background Check',
    description: 'Thorough background checks, state criminal registry audit, and national sex offender registry checks.',
    tag: 'Federal & State Vetting'
  },
  {
    number: '02',
    title: 'Clean Motor Vehicle Audit',
    description: '7-year driving history verification with zero tolerance for major infractions, DUIs, or reckless driving.',
    tag: 'DMV Cleared'
  },
  {
    number: '03',
    title: 'Child Safety & Incident Protocol Training',
    description: 'Comprehensive student safety orientation, safe seating guidelines, and authorized school handoff protocols.',
    tag: 'Safety Protocol Training'
  },
  {
    number: '04',
    title: 'Sensory & De-escalation Coaching',
    description: 'Specialized coaching on communicating with students with autism, ADHD, trauma, and individual IEP accommodations.',
    tag: 'Trauma-Informed Care'
  },
  {
    number: '05',
    title: '19-Point Vehicle Inspection',
    description: 'Rigorous annual and periodic mechanical audits covering brakes, tires, restraint systems, and pre-installed safety booster seats.',
    tag: 'Vehicle Safety Audit'
  }
];

const onboardingSteps = [
  {
    step: '1',
    title: 'Quick 5-Minute Application',
    desc: 'Fill out our streamlined online application with your basic driving history, vehicle info, and preferred school district areas.'
  },
  {
    step: '2',
    title: 'Background Check & Vehicle Inspection',
    desc: 'Complete digital background screening and schedule a fast 19-point vehicle safety check at a certified local partner shop.'
  },
  {
    step: '3',
    title: 'Safety Orientation & Route Kit',
    desc: 'Attend our child safety orientation, review school district handoff guidelines, and receive your student transit materials and driver badge.'
  },
  {
    step: '4',
    title: 'Receive Routes & Start Earning',
    desc: 'Get matched to your dedicated recurring morning and afternoon routes. Greet your students and earn premium compensation.'
  }
];

const driverTestimonials = [
  {
    quote: "Driving with BuckledIn completely changed my life. I know my exact morning and afternoon hours weeks in advance, and I love seeing the same kids' smiling faces every day. It feels like meaningful community service with great pay.",
    name: 'Marcus Washington',
    location: 'Portland, OR',
    tenure: '3 Years with BuckledIn',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
  },
  {
    quote: "As a retired educator, I missed working with students. BuckledIn lets me earn great income around a steady weekday school schedule. The dispatch team is supportive, attentive, and treats drivers like true partners.",
    name: 'Deborah Miller',
    location: 'Seattle, WA',
    tenure: '2 Years with BuckledIn',
    avatar: '/driverssection/pic1.jpg'
  },
  {
    quote: "Here, my route is set, the schedule is predictable, and school coordinators and parents treat me with respect and trust. Best driving decision I ever made.",
    name: 'Carlos Mendez',
    location: 'Portland, OR',
    tenure: '4 Years with BuckledIn',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'
  }
];

const driverFaqs = [
  {
    q: 'How and when do BuckledIn drivers get paid?',
    a: 'Drivers receive weekly direct deposit every Friday for completed routes during that period, with transparent route pay details shared upfront.'
  },
  {
    q: 'What are the typical working hours?',
    a: 'Primary routes align with weekday school bell schedules, typically running between 6:30 AM – 9:00 AM for morning pick-ups and 2:00 PM – 4:30 PM for afternoon dismissals, with occasional midday or evening ride requests available.'
  },
  {
    q: 'Do I need to buy my own child safety seats?',
    a: 'No. BuckledIn provides all required pre-certified, safety-audited booster seats and child restraint systems at zero cost to you, complete with proper installation guidelines.'
  },
  {
    q: 'What vehicle requirements must be met?',
    a: 'Your vehicle must be a 4-door car, SUV, or minivan, model year 2014 or newer, in excellent mechanical and cosmetic condition with working air conditioning and heating, and seating for at least 4 passengers with working seatbelts.'
  },
  {
    q: 'What happens during summer break or school holidays?',
    a: 'While traditional schools break in summer, BuckledIn services year-round specialized programs, extended school year (ESY) routes, charter academies, and student enrichment transit, giving drivers ample opportunities for summer earnings.'
  },
  {
    q: 'Can I choose which school districts I drive in?',
    a: 'Yes! During onboarding you set your preferred operating radius and districts so all assigned routes are convenient and close to your home base.'
  }
];

const driverRegions = [
  { code: 'PA', name: 'Pennsylvania', markets: ['Harrisburg', 'Allentown', 'Pittsburgh', 'Easton'], image: '/States/Pennslyania.jpg' },
  { code: 'MO', name: 'Missouri', markets: ['Kansas City', 'St. Louis'], image: '/States/Missouri.jpg' },
  { code: 'KS', name: 'Kansas', markets: ['Kansas City'], image: '/States/Kansas.jpg' },
  { code: 'OR', name: 'Oregon', markets: ['Portland', 'Salem'], image: '/States/oregon.jpg' },
  { code: 'WA', name: 'Washington', markets: ['Seattle', 'Tacoma'], image: '/States/Washington.jpg' },
  { code: 'CA', name: 'California', markets: ['Los Angeles', 'San Diego'], image: 'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?auto=format&fit=crop&w=800&q=80' },
  { code: 'AZ', name: 'Arizona', markets: ['Phoenix', 'Tucson'], image: '/States/Arizona.jpg' },
  { code: 'OH', name: 'Ohio', markets: ['Cincinnati', 'Columbus', 'Dayton'], image: '/States/ohio.jpeg' },
  { code: 'KY', name: 'Kentucky', markets: ['Covington'], image: '/States/kentucky.jpg' },
  { code: 'FL', name: 'Florida', markets: ['Palm Beach'], image: '/States/florida.jpg' },
];

function RegionCarousel({ onApply }) {
  const carouselRef = useRef(null);
  const scrollPosRef = useRef(0);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate list to create a seamless continuous forward loop
  const loopedRegions = [...driverRegions, ...driverRegions];

  const getSingleSetWidth = () => {
    const el = carouselRef.current;
    if (!el || el.children.length <= driverRegions.length) return 0;
    return el.children[driverRegions.length].offsetLeft - el.children[0].offsetLeft;
  };

  // Continuous seamless infinite forward loop (pauses off-screen, on hover/touch, or reduced motion)
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationFrameId = 0;
    let isVisible = true;
    let cachedSetWidth = getSingleSetWidth();

    const handleResize = () => {
      cachedSetWidth = getSingleSetWidth();
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const observer =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            ([entry]) => {
              isVisible = entry.isIntersecting;
            },
            { threshold: 0.05 }
          )
        : null;
    observer?.observe(el);

    const step = () => {
      if (isVisible && !isPaused) {
        if (!cachedSetWidth) cachedSetWidth = getSingleSetWidth();
        if (cachedSetWidth > 0) {
          scrollPosRef.current += 0.35;
          if (scrollPosRef.current >= cachedSetWidth) {
            scrollPosRef.current -= cachedSetWidth;
          }
          el.scrollLeft = scrollPosRef.current;
        }
      }
      animationFrameId = window.requestAnimationFrame(step);
    };

    animationFrameId = window.requestAnimationFrame(step);
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      observer?.disconnect();
    };
  }, [isPaused]);

  const scroll = (direction) => {
    const el = carouselRef.current;
    if (!el) return;
    const singleSetWidth = getSingleSetWidth();
    if (singleSetWidth > 0) {
      if (direction === 'left' && el.scrollLeft < 290) {
        el.scrollLeft += singleSetWidth;
      } else if (direction === 'right' && el.scrollLeft >= singleSetWidth) {
        el.scrollLeft -= singleSetWidth;
      }
    }
    const scrollAmount = direction === 'left' ? -290 : 290;
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    setTimeout(() => {
      if (carouselRef.current) {
        scrollPosRef.current = carouselRef.current.scrollLeft;
      }
    }, 450);
  };

  const pauseCarousel = () => {
    if (carouselRef.current) {
      scrollPosRef.current = carouselRef.current.scrollLeft;
    }
    setIsPaused(true);
  };

  const resumeCarousel = () => {
    if (carouselRef.current) {
      scrollPosRef.current = carouselRef.current.scrollLeft;
    }
    setIsPaused(false);
  };

  return (
    <div className="w-full overflow-hidden">
      {/* Header with Title and Left/Right Buttons (Aligned to max-w-7xl) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white border border-slate-200/80 text-xs font-bold text-brand-600 uppercase tracking-wider mb-3 shadow-2xs">
              <MapPin className="w-3.5 h-3.5" />
              <span>Now Hiring Drivers</span>
            </div>
            <h2
              style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
              className="font-inktrap text-3xl sm:text-4xl md:text-5xl font-medium text-black tracking-tight"
            >
              Become a Driver in Your Region.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
              We&apos;re actively onboarding drivers across these markets. Pick your region and start earning on consistent school-year routes.
            </p>
          </div>

          {/* Carousel Navigation Buttons */}
          <div className="flex items-center gap-2 self-start md:self-end shrink-0">
            <button
              onClick={() => scroll('left')}
              aria-label="Previous operating regions"
              className="w-11 h-11 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-black shadow-xs active:scale-95 flex items-center justify-center transition-all duration-200 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Next operating regions"
              className="w-11 h-11 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-black shadow-xs active:scale-95 flex items-center justify-center transition-all duration-200 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── End-to-End Full-Bleed Continuous Loop Carousel Track ── */}
      <div className="w-full relative">
        <div
          ref={carouselRef}
          className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar pt-2 pb-6"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            paddingLeft: 'max(1rem, calc((100vw - 80rem) / 2 + 1.5rem))',
            paddingRight: 'max(1rem, calc((100vw - 80rem) / 2 + 1.5rem))',
          }}
        >
          {loopedRegions.map((region, i) => (
            <div
              key={`${region.code}-${i}`}
              role="button"
              tabIndex={0}
              onClick={onApply}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onApply();
                }
              }}
              onMouseEnter={pauseCarousel}
              onMouseLeave={resumeCarousel}
              onTouchStart={pauseCarousel}
              onTouchEnd={resumeCarousel}
              className="w-[235px] sm:w-[260px] md:w-[275px] shrink-0 h-[350px] sm:h-[380px] md:h-[395px] rounded-[26px] overflow-hidden relative shadow-md hover:shadow-xl transition-all duration-500 group snap-start border border-slate-200/80 flex flex-col justify-end cursor-pointer focus-visible:outline-2 focus-visible:outline-brand-600 focus-visible:outline-offset-2"
            >
              {/* Full-bleed State Background Image */}
              <img
                src={region.image}
                alt={region.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* ── Smooth Progressive Blur & Gradient Fade Layer (Matches Team Members) ── */}
              <div
                className="absolute inset-x-0 bottom-0 h-[58%] pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.38) 55%, rgba(0,0,0,0) 100%)',
                  backdropFilter: 'blur(20px) saturate(160%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(160%)',
                  maskImage: 'linear-gradient(to top, black 0%, black 48%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to top, black 0%, black 48%, transparent 100%)',
                }}
              />

              {/* ── Card Details Content (Unmasked, Crisp Typography) ── */}
              <div className="relative z-10 p-4 sm:p-5 text-white flex flex-col justify-end">
                {/* State Name + Verified Check Badge */}
                <div className="flex items-center space-x-1.5">
                  <h3 className="text-base sm:text-lg font-medium text-white tracking-normal leading-snug truncate">
                    {region.name}
                  </h3>
                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-white text-black shadow-xs shrink-0">
                    <Check className="w-2.5 h-2.5 text-brand-600 stroke-[2.5]" />
                  </span>
                </div>

                {/* Markets Summary (Matches Team Member Role + Statement styling) */}
                <p className="mt-1.5 text-xs text-white/80 font-normal leading-relaxed">
                  <span className="font-medium text-white">
                    {region.markets.length} {region.markets.length === 1 ? 'Active Market' : 'Active Markets'}
                  </span>{' '}
                  &mdash; Active student routes in {region.markets.join(', ')}.
                </p>

                {/* Bottom Action Row: State Code Pill + White Apply Pill */}
                <div className="mt-3.5 pt-2.5 border-t border-white/15 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center space-x-1 text-xs font-medium text-white/85">
                    <MapPin className="w-3.5 h-3.5 text-white/80 shrink-0" />
                    <span>{region.code}</span>
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onApply();
                    }}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-100 text-black text-xs font-semibold shadow-sm transition-all duration-200 active:scale-95 cursor-pointer"
                  >
                    <span>Apply</span>
                    <span className="text-sm leading-none font-normal">+</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DriversPage({ onBackToHome }) {
  const [openFaq, setOpenFaq] = useState(null);
  const [activeOnboardingStep, setActiveOnboardingStep] = useState(0);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    vehicleYear: '',
    vehicleModel: '',
    experience: '3-5 years'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  useEffect(() => {
    if (!isApplyModalOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setFormSubmitted(false);
        setIsApplyModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isApplyModalOpen]);

  const resetForm = () => {
    setFormSubmitted(false);
    setIsApplyModalOpen(false);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      city: '',
      state: '',
      vehicleYear: '',
      vehicleModel: '',
      experience: '3-5 years'
    });
  };

  return (
    <div className="min-h-screen bg-white text-black pb-20 selection:bg-brand-500 selection:text-white">

      {/* Hero Header */}
      <section className="w-full home-dot-grid pt-40 pb-16 mb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Hero Text */}
          <div className="lg:col-span-7 space-y-6">
            <h1
              style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
              className="text-4xl sm:text-5xl md:text-6xl font-medium text-black tracking-tight leading-[1.1]"
            >
              Drive With Purpose. Earn With Predictability.
            </h1>

            <p className="text-lg sm:text-xl text-slate-700 font-medium leading-relaxed max-w-2xl">
              Join our certified student transit network. Enjoy consistent weekday schedules, competitive and predictable earnings, and the fulfillment of providing calming, consistent rides to students who need them most.
            </p>

            {/* ── Tactile Pastel Bento Cards: Competitive, Mon–Fri, Dedicated & Action Buttons ── */}
            <div className="pt-2 space-y-3.5">
              {/* Top Row: 3 Cards (Competitive, Mon–Fri, Dedicated) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {/* Card 1: Competitive Route Pay (Soft Slate Blue) */}
                <div
                  className="relative rounded-[24px] p-4 sm:p-5 overflow-hidden flex flex-col justify-between min-h-[215px] text-[#102A43] shadow-xs"
                  style={{
                    backgroundColor: '#B5CDDF',
                    backgroundImage: 'radial-gradient(rgba(16, 42, 67, 0.09) 1px, transparent 1px)',
                    backgroundSize: '11px 11px',
                  }}
                >
                  <div>
                    <div className="text-lg sm:text-xl font-normal leading-tight">
                      <span className="font-bold">Competitive</span>
                      <br />
                      route pay
                    </div>
                  </div>

                  {/* Angled Driver Pay Card Graphic */}
                  <div className="mt-4 -mb-6 mx-auto w-[132px] rounded-xl bg-white shadow-md border border-black/5 overflow-hidden transform -rotate-6">
                    <div className="h-9 bg-[#102A43] px-2.5 flex items-center justify-between">
                      <span className="text-[8px] font-mono uppercase tracking-wider text-white/80">
                        Friday Pay
                      </span>
                      <DollarSign className="w-3 h-3 text-[#FFCC00]" />
                    </div>
                    <div className="p-2.5 text-left">
                      <div className="text-[9px] font-mono text-slate-400">DIRECT DEPOSIT</div>
                      <div className="text-[11px] font-bold text-[#102A43] leading-tight mt-0.5">
                        Protected
                        <br />
                        Minimums
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 2: Mon–Fri School Hours (Soft Lilac) */}
                <div
                  className="relative rounded-[24px] p-4 sm:p-5 overflow-hidden flex flex-col justify-between min-h-[215px] text-[#2E1A47] shadow-xs"
                  style={{
                    backgroundColor: '#CBBBE8',
                    backgroundImage: 'radial-gradient(rgba(46, 26, 71, 0.08) 1px, transparent 1px)',
                    backgroundSize: '11px 11px',
                  }}
                >
                  <div className="flex justify-center pt-0.5">
                    <div className="w-24 h-14 rounded-full overflow-hidden border-2 border-white/75 shadow-xs bg-white/40">
                      <img
                        src="/driverssection/pic1.jpg"
                        alt="BuckledIn Driver"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="pt-3">
                    <Sparkles className="w-4 h-4 text-white/90 mb-1.5" />
                    <div className="text-lg sm:text-xl font-bold leading-tight">Mon–Fri</div>
                    <p className="text-xs font-medium text-[#2E1A47]/80 leading-snug mt-1">
                      Weekday school bell schedules.
                    </p>
                  </div>
                </div>

                {/* Card 3: Dedicated Daily Routes (Soft Sage Green) */}
                <div
                  className="relative rounded-[24px] p-4 sm:p-5 overflow-hidden flex flex-col justify-between min-h-[215px] text-[#1E3511] shadow-xs"
                  style={{
                    backgroundColor: '#BDD596',
                    backgroundImage: 'radial-gradient(rgba(30, 53, 17, 0.08) 1px, transparent 1px)',
                    backgroundSize: '11px 11px',
                  }}
                >
                  <div className="flex items-center -space-x-2">
                    <img
                      src="/driverpage.jpg"
                      alt=""
                      className="w-7 h-7 rounded-full object-cover border-2 border-white shadow-2xs"
                    />
                    <img
                      src="/driverssection/pic1.jpg"
                      alt=""
                      className="w-7 h-7 rounded-full object-cover border-2 border-white shadow-2xs"
                    />
                    <img
                      src="/drivershome.png"
                      alt=""
                      className="w-7 h-7 rounded-full object-cover border-2 border-white shadow-2xs"
                    />
                  </div>

                  <div className="space-y-2 pt-3">
                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/65 text-[10px] font-semibold">
                        Same Route
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/65 text-[10px] font-semibold">
                        Daily
                      </span>
                    </div>
                    <div>
                      <div className="text-lg sm:text-xl font-bold leading-tight">Dedicated</div>
                      <p className="text-xs font-medium text-[#1E3511]/80 leading-snug mt-0.5">
                        Consistent daily student manifests.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Row: Floating Pill Tags + Action Buttons & Trust Card */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
                {/* Card 4: Floating Route Perks (Warm Peach) */}
                <div
                  className="sm:col-span-5 relative rounded-[24px] p-4 overflow-hidden flex flex-col items-center justify-center gap-2 min-h-[168px] text-[#3F1908] shadow-xs"
                  style={{
                    backgroundColor: '#F1A078',
                    backgroundImage: 'radial-gradient(rgba(63, 25, 8, 0.09) 1px, transparent 1px)',
                    backgroundSize: '11px 11px',
                  }}
                >
                  <div className="flex flex-wrap items-center justify-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-white text-[10px] font-semibold shadow-2xs -rotate-3">
                      Morning Bell • 7:15 AM
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white text-[10px] font-semibold shadow-2xs rotate-3">
                      W-2 Steady Pay
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white text-[10px] font-semibold shadow-2xs -rotate-1">
                      Weekly Deposit
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white text-[10px] font-semibold shadow-2xs rotate-2">
                      Free Boosters
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white text-[10px] font-semibold shadow-2xs -rotate-2">
                      Weekday Routes
                    </span>
                  </div>
                </div>

                {/* Card 5: Action Buttons + Inset Quote Card (Soft Sky Blue) */}
                <div
                  className="sm:col-span-7 relative rounded-[24px] p-4 sm:p-5 overflow-hidden flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 min-h-[168px] text-[#102A43] shadow-xs"
                  style={{
                    backgroundColor: '#B7CEE1',
                    backgroundImage: 'radial-gradient(rgba(16, 42, 67, 0.08) 1px, transparent 1px)',
                    backgroundSize: '11px 11px',
                  }}
                >
                  <div className="flex flex-col justify-between space-y-3 flex-1">
                    <div>
                      <Sparkles className="w-4 h-4 text-[#102A43] mb-1.5" />
                      <div className="text-base sm:text-lg font-medium leading-snug">
                        Ready to drive with <span className="font-bold">BuckledIn</span>?
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => setIsApplyModalOpen(true)}
                        className="inline-flex items-center space-x-2 bg-[#102A43] hover:bg-brand-600 text-white font-medium px-4 py-2.5 rounded-full shadow-sm transition-all duration-200 cursor-pointer active:scale-95 text-xs sm:text-sm"
                      >
                        <span>Apply to Drive Today</span>
                        <Send className="w-3.5 h-3.5" />
                      </button>

                      <a
                        href="#requirements"
                        className="text-xs sm:text-sm font-semibold text-[#102A43] underline underline-offset-4 hover:text-brand-700 transition-colors cursor-pointer"
                      >
                        View Requirements
                      </a>
                    </div>
                  </div>

                  {/* Floating White Trust Inset Card */}
                  <div className="sm:w-[156px] shrink-0 rounded-2xl bg-white p-3 shadow-md border border-black/5 flex flex-col items-center text-center justify-between">
                    <span className="text-sm font-serif font-bold text-[#102A43] leading-none">
                      &ldquo;
                    </span>
                    <p className="text-[10px] text-slate-600 leading-snug mt-1">
                      Best weekday routine. Same students, zero dispatch chaos.
                    </p>
                    <div className="flex items-center -space-x-1.5 my-2">
                      <img
                        src="/driverssection/pic1.jpg"
                        alt=""
                        className="w-5 h-5 rounded-full object-cover border border-white"
                      />
                      <img
                        src="/driverpage.jpg"
                        alt=""
                        className="w-6 h-6 rounded-full object-cover border border-white z-10"
                      />
                      <img
                        src="/drivershome.png"
                        alt=""
                        className="w-5 h-5 rounded-full object-cover border border-white"
                      />
                    </div>
                    <div className="text-[10px] font-bold text-[#102A43]">Marcus T.</div>
                    <div className="text-[8px] text-slate-400">3-Year Driver Partner</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Artwork (Driver Photo with Bold Amber Swiss Traffic Arrows Rising Above & Fading Below) */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <div className="relative w-full max-w-[500px] mx-auto pt-44 sm:pt-52 pb-16 sm:pb-20 px-6 sm:px-10 flex items-center justify-center select-none">
              
              {/* Color-Coded Thick Amber Traffic Arrows (Emerging Long Above Image, Fading in Below, No Card) */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0"
                viewBox="0 0 640 820"
                fill="none"
              >
                <defs>
                  {/* Gradual fade-in gradient for lanes coming in from below the photo */}
                  <linearGradient id="amberLaneFade" x1="0" y1="820" x2="0" y2="460" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity="0" />
                    <stop offset="20%" stopColor="#F59E0B" stopOpacity="0.1" />
                    <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.65" />
                    <stop offset="75%" stopColor="#F59E0B" stopOpacity="1" />
                    <stop offset="100%" stopColor="#F59E0B" stopOpacity="1" />
                  </linearGradient>

                  {/* Gradual fade-in gradient for white dashed centerlines */}
                  <linearGradient id="whiteCenterlineFade" x1="0" y1="820" x2="0" y2="460" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                    <stop offset="25%" stopColor="#FFFFFF" stopOpacity="0.1" />
                    <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0.7" />
                    <stop offset="80%" stopColor="#FFFFFF" stopOpacity="1" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
                  </linearGradient>
                </defs>

                {/* ── Left Amber Arrow Lane (Thick 64px, Tight Parallel Spacing, Sweeps Left Above Photo) ── */}
                <path
                  d="M 240 820 L 240 240 C 240 150, 180 150, 80 150 L 50 150"
                  stroke="url(#amberLaneFade)"
                  strokeWidth="64"
                  strokeLinecap="butt"
                  strokeLinejoin="round"
                />
                {/* Left Lane White Dashed Centerline */}
                <path
                  d="M 240 820 L 240 240 C 240 150, 180 150, 80 150 L 50 150"
                  stroke="url(#whiteCenterlineFade)"
                  strokeWidth="4"
                  strokeDasharray="8 8"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Left Large Arrowhead (Exiting to the Left Above Photo) */}
                <polygon points="0,150 76,74 76,226" fill="#F59E0B" />

                {/* ── Center Amber Arrow Lane (Thick 64px, Shoots High Above Photo with Long Run) ── */}
                <path
                  d="M 320 820 L 320 78"
                  stroke="url(#amberLaneFade)"
                  strokeWidth="64"
                  strokeLinecap="butt"
                />
                {/* Center Lane White Dashed Centerline */}
                <path
                  d="M 320 820 L 320 86"
                  stroke="url(#whiteCenterlineFade)"
                  strokeWidth="4"
                  strokeDasharray="8 8"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Center Large Arrowhead (Shooting High Above Photo) */}
                <polygon points="320,10 244,86 396,86" fill="#F59E0B" />

                {/* ── Right Amber Arrow Lane (Thick 64px, Tight Parallel Spacing, Sweeps Right Above Photo) ── */}
                <path
                  d="M 400 820 L 400 280 C 400 190, 460 190, 560 190 L 590 190"
                  stroke="url(#amberLaneFade)"
                  strokeWidth="64"
                  strokeLinecap="butt"
                  strokeLinejoin="round"
                />
                {/* Right Lane White Dashed Centerline */}
                <path
                  d="M 400 820 L 400 280 C 400 190, 460 190, 560 190 L 590 190"
                  stroke="url(#whiteCenterlineFade)"
                  strokeWidth="4"
                  strokeDasharray="8 8"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Right Large Arrowhead (Exiting to the Right Above Photo) */}
                <polygon points="640,190 564,114 564,266" fill="#F59E0B" />
              </svg>

              {/* Foreground Driver & Student Hero Photo */}
              <div className="relative z-10 w-full">
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-white/90 bg-slate-900">
                  <img
                    src="/driverssection/487b66e0-ec6c-44da-8394-7fc9e3e62d12.png"
                    alt="BuckledIn Driver with safe student transit"
                    className="w-full h-auto object-cover block select-none"
                    loading="eager"
                  />
                </div>
              </div>

            </div>
          </div>

        </div>
        </div>
      </section>

      {/* Section 1: Why Drive for BuckledIn (Full-Bleed Node Circuit Network — Homepage Driver Cream #F6F6EC) */}
      <section id="why-drive" className="relative w-full bg-[#F6F6EC] text-black border-y border-stone-200/80 overflow-hidden py-20 lg:py-24">
        
        {/* Standard Section Header (Matches Rest of Page Rhythm) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 lg:mb-6">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-200 text-xs font-bold text-slate-800 uppercase tracking-wider mb-4 shadow-2xs">
              <Award className="w-3.5 h-3.5 text-brand-600" />
              <span>The BuckledIn Advantage</span>
            </div>
            <h2
              style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
              className="text-3xl sm:text-4xl md:text-5xl font-medium text-black tracking-tight"
            >
              Why Drive with BuckledIn
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
              Experience the peace of mind that comes from structured school partnerships, consistent weekday schedules, and supportive local dispatch.
            </p>
          </div>
        </div>

        {/* ── DESKTOP & LARGE SCREENS: Exact 1:1 Proportional Node Circuit Canvas ── */}
        <div className="hidden lg:block relative w-full max-w-[1200px] mx-auto aspect-[1200/760]">
          
          {/* True Orthogonal Circuit SVG (Uniform 90° Rounded Corners, Dots at Both Ends) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1200 760"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Subtle Edge-Bleed Framing Traces (Inspired by Editorial Poster) */}
            <path
              d="M 0 58 L 62 58 A 28 28 0 0 0 90 30 L 90 0"
              stroke="#0267CE"
              strokeWidth="1.5"
              opacity="0.45"
            />
            <path
              d="M 860 0 L 860 28 A 30 30 0 0 0 890 58 L 1200 58"
              stroke="#0267CE"
              strokeWidth="1.5"
              opacity="0.45"
            />
            <path
              d="M 0 330 L 68 330 A 28 28 0 0 1 96 358 L 96 382 A 28 28 0 0 0 124 410 L 250 410"
              stroke="#0267CE"
              strokeWidth="1.5"
              opacity="0.55"
            />
            <circle cx="250" cy="410" r="4" fill="#0267CE" opacity="0.65" />

            {/* 1. Route to Node 1 (Top: Predictable School Hours) */}
            <circle cx="490" cy="312" r="4.5" fill="#0267CE" />
            <path
              d="M 490 312 L 490 284 A 28 28 0 0 0 462 256 L 178 256 A 28 28 0 0 1 150 228 L 150 116 A 28 28 0 0 1 178 88 L 440 88"
              stroke="#0267CE"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
            <circle cx="440" cy="88" r="4.5" fill="#0267CE" />

            {/* 2. Route to Node 2 (Upper Loop: Daily Route Consistency) */}
            <circle cx="565" cy="312" r="4.5" fill="#0267CE" />
            <path
              d="M 565 312 L 565 286 A 24 24 0 0 1 589 262 L 872 262 A 28 28 0 0 0 900 234 L 900 168 A 28 28 0 0 0 872 140 L 469 140 A 24 24 0 0 0 445 164 L 445 192"
              stroke="#0267CE"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
            <circle cx="445" cy="192" r="4.5" fill="#0267CE" />

            {/* 3. Route to Node 3 (Bottom Left: Safe Student Commutes) */}
            <circle cx="420" cy="436" r="4.5" fill="#0267CE" />
            <path
              d="M 420 436 L 420 465 A 28 28 0 0 1 392 493 L 168 493 A 28 28 0 0 0 140 521 L 140 568"
              stroke="#0267CE"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
            <circle cx="140" cy="568" r="4.5" fill="#0267CE" />

            {/* 4. Route to Node 4 (Bottom Switchback: Competitive Route Pay) */}
            <circle cx="635" cy="436" r="4.5" fill="#0267CE" />
            <path
              d="M 635 436 L 635 466 A 24 24 0 0 1 611 490 L 504 490 A 24 24 0 0 0 480 514 L 480 521 A 24 24 0 0 0 504 545 L 836 545 A 24 24 0 0 1 860 569 L 860 591 A 24 24 0 0 1 836 615 L 460 615 A 20 20 0 0 0 440 635 L 440 656"
              stroke="#0267CE"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
            <circle cx="440" cy="656" r="4.5" fill="#0267CE" />

            {/* 5. Route to Node 5 (Mid Right: Dedicated Local Dispatch) */}
            <circle cx="852" cy="368" r="4.5" fill="#0267CE" />
            <path
              d="M 852 368 L 885 368 A 20 20 0 0 0 905 348 L 905 316"
              stroke="#0267CE"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
            <circle cx="905" cy="316" r="4.5" fill="#0267CE" />

            {/* 6. Route Exit to Call to Action (Bottom Right) */}
            <circle cx="785" cy="436" r="4.5" fill="#0267CE" />
            <path
              d="M 785 436 L 785 470 A 28 28 0 0 0 813 498 L 1012 498 A 28 28 0 0 1 1040 526 L 1040 622"
              stroke="#0267CE"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
            <circle cx="1040" cy="622" r="4.5" fill="#0267CE" />
            {/* Exit Tail out to Right Edge */}
            <path
              d="M 1140 682 L 1200 682"
              stroke="#0267CE"
              strokeWidth="1.75"
              opacity="0.55"
            />
          </svg>

          {/* Center Brand Hub */}
          <div className="absolute left-1/2 top-[49%] -translate-x-1/2 -translate-y-1/2 w-[480px] text-center pointer-events-none">
            <div
              style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
              className="text-5xl xl:text-6xl font-bold tracking-tight text-brand-600 leading-[1.05]"
            >
              BuckledIn.
            </div>
          </div>

          {/* Node 1 Label */}
          <div className="absolute left-[38%] top-[8.2%] max-w-[300px]">
            <h4 className="text-base font-bold text-black tracking-tight">Predictable School Hours</h4>
            <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
              Centered on weekday morning & afternoon bell schedules, with optional midday or evening requests.
            </p>
          </div>

          {/* Node 2 Label */}
          <div className="absolute left-[39.2%] top-[21.8%] max-w-[300px]">
            <h4 className="text-base font-bold text-black tracking-tight">Daily Route Consistency</h4>
            <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
              Commit to the same recurring student manifests each term. Zero random dispatch chaos.
            </p>
          </div>

          {/* Node 3 Label */}
          <div className="absolute left-[13.2%] top-[72.5%] max-w-[260px]">
            <h4 className="text-base font-bold text-black tracking-tight">Safe Student Commutes</h4>
            <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
              Verified K-12 students under district-authorized manifests, following clear pickup and drop-off protocols.
            </p>
          </div>

          {/* Node 4 Label */}
          <div className="absolute left-[38%] top-[84%] max-w-[320px]">
            <h4 className="text-base font-bold text-black tracking-tight">Competitive Route Pay</h4>
            <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
              Competitive, transparent route compensation with weekly direct deposit.
            </p>
          </div>

          {/* Node 5 Label */}
          <div className="absolute left-[76.8%] top-[39%] max-w-[240px]">
            <h4 className="text-base font-bold text-black tracking-tight">Dedicated Local Dispatch</h4>
            <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
              Live human safety coordinators actively monitoring every mile at a single touch.
            </p>
          </div>

          {/* Exit CTA Button (Bottom Right) */}
          <div className="absolute right-[4.5%] bottom-[6%]">
            <button
              onClick={() => setIsApplyModalOpen(true)}
              className="inline-flex items-center space-x-2.5 bg-black hover:bg-neutral-900 text-white font-medium px-7 py-3.5 rounded-full shadow-lg transition-all cursor-pointer active:scale-95 text-sm group"
            >
              <span>Complete Application</span>
              <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* ── MOBILE & TABLET: Clean Vertical Node Circuit Layout ── */}
        <div className="lg:hidden max-w-2xl mx-auto px-6 sm:px-8 mt-6">
          <div className="relative pl-6 border-l-[1.5px] border-brand-600/70 space-y-8">
            <div className="relative">
              <span className="absolute -left-[29px] top-1.5 w-2.5 h-2.5 rounded-full bg-brand-600" />
              <h4 className="text-lg font-bold text-black">Predictable School Hours</h4>
              <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                Centered on weekday morning & afternoon bell schedules, with optional midday or evening requests.
              </p>
            </div>
            <div className="relative">
              <span className="absolute -left-[29px] top-1.5 w-2.5 h-2.5 rounded-full bg-brand-600" />
              <h4 className="text-lg font-bold text-black">Daily Route Consistency</h4>
              <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                Commit to the same recurring student manifests each term. Zero random dispatch chaos.
              </p>
            </div>
            <div className="relative">
              <span className="absolute -left-[29px] top-1.5 w-2.5 h-2.5 rounded-full bg-brand-600" />
              <h4 className="text-lg font-bold text-black">Safe Student Commutes</h4>
              <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                Verified K-12 students under district-authorized manifests, following clear pickup and drop-off protocols.
              </p>
            </div>
            <div className="relative">
              <span className="absolute -left-[29px] top-1.5 w-2.5 h-2.5 rounded-full bg-brand-600" />
              <h4 className="text-lg font-bold text-black">Competitive Route Pay</h4>
              <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                Competitive, transparent route compensation with weekly direct deposit.
              </p>
            </div>
            <div className="relative">
              <span className="absolute -left-[29px] top-1.5 w-2.5 h-2.5 rounded-full bg-brand-600" />
              <h4 className="text-lg font-bold text-black">Dedicated Local Dispatch</h4>
              <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                Live human safety coordinators actively monitoring every mile at a single touch.
              </p>
            </div>
          </div>

          <div className="mt-10 flex justify-end">
            <button
              onClick={() => setIsApplyModalOpen(true)}
              className="inline-flex items-center space-x-2.5 bg-black hover:bg-neutral-900 text-white font-medium px-7 py-3.5 rounded-full shadow-lg transition-all cursor-pointer active:scale-95 text-sm group"
            >
              <span>Complete Application</span>
              <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </section>

      {/* Section 2: Safety & Vetting Standards */}
      <section id="standards" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 uppercase tracking-wider mb-4 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
              <span>Highest Standards in Student Transit</span>
            </div>
            <h2
              style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
              className="text-3xl sm:text-4xl md:text-5xl font-medium text-black tracking-tight"
            >
              The 5-Tier Vetting Process
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
              We take safety seriously. School districts and families trust us because every BuckledIn driver meets the most rigorous certifications in the industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {safetyStandards.map((std, i) => (
              <div
                key={i}
                className="border border-slate-200 rounded-3xl p-7 bg-white hover:border-slate-300 transition-colors shadow-xs"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    {std.tag}
                  </span>
                  <span className="text-2xl font-black text-slate-200">
                    {std.number}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-black tracking-tight mb-2">
                  {std.title}
                </h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  {std.description}
                </p>
              </div>
            ))}

            <div className="border border-dashed border-brand-300 bg-brand-50/50 rounded-3xl p-7 flex flex-col justify-center items-center text-center">
              <div className="w-12 h-12 rounded-full bg-brand-600 text-white flex items-center justify-center mb-4 shadow-md">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-black tracking-tight mb-2">
                Company-Provided Safety Orientation &amp; Gear
              </h3>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                BuckledIn provides comprehensive driver safety orientation and supplied booster seats at zero cost to you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Driver Requirements Checklist */}
      <section id="requirements" className="py-20 bg-slate-50 border-t border-slate-200 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-md p-8 sm:p-12">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2
                style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
                className="text-3xl sm:text-4xl font-medium text-black tracking-tight"
              >
                Driver &amp; Vehicle Requirements
              </h2>
              <p className="mt-3 text-slate-600 text-sm sm:text-base font-medium">
                Review what you need to qualify before submitting your application.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Driver Requirements */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-sm font-extrabold uppercase tracking-wider text-black pb-2 border-b border-slate-200">
                  <User className="w-4 h-4 text-brand-600" />
                  <span>Driver Qualifications</span>
                </div>

                <ul className="space-y-3">
                  {[
                    'At least 21 years of age',
                    'Valid driver’s license with 3+ years of US driving experience',
                    'Clean 7-year driving record (no reckless driving or DUIs)',
                    'Pass criminal background checks',
                    'Pass pre-employment 10-panel drug screening',
                    'Warm, empathetic demeanor and patience with children'
                  ].map((req, idx) => (
                    <li key={idx} className="flex items-start space-x-3 text-sm text-slate-700 font-medium">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Vehicle Requirements */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-sm font-extrabold uppercase tracking-wider text-black pb-2 border-b border-slate-200">
                  <Car className="w-4 h-4 text-brand-600" />
                  <span>Vehicle Standards</span>
                </div>

                <ul className="space-y-3">
                  {[
                    '4-door vehicle (sedan, SUV, crossover, or minivan)',
                    'Model year 2014 or newer',
                    'Minimum 4 passenger seating positions with working seatbelts',
                    'Fully functional heating and air conditioning',
                    'Clean interior and pristine mechanical maintenance condition',
                    'Valid personal auto registration and insurance coverage'
                  ].map((req, idx) => (
                    <li key={idx} className="flex items-start space-x-3 text-sm text-slate-700 font-medium">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Apply CTA */}
            <div className="mt-10 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-base font-bold text-black">Meet all the criteria above?</div>
                <div className="text-xs text-slate-500">Your route matching process begins the moment you apply.</div>
              </div>
              <button
                onClick={() => setIsApplyModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-brand-600 hover:bg-brand-700 text-white font-normal px-6 py-2.5 rounded-full shadow-md transition-all cursor-pointer active:scale-95 text-sm"
              >
                <span>Apply in 5 Minutes</span>
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: How Onboarding Works (Frosted Step Cards + Sweeping Yellow Road Ribbon) */}
      <section id="onboarding" className="relative pt-24 sm:pt-28 pb-28 sm:pb-36 bg-[#F4F4F4] overflow-hidden">
        {/* Background Sweeping Yellow Road Ribbon with Dashed Centerline & Minimalist Car */}
        <svg
          className="absolute inset-x-0 bottom-0 w-full h-[320px] sm:h-[360px] pointer-events-none z-0"
          viewBox="0 0 1440 360"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* Yellow Road Band */}
          <path
            d="M -60 280 C 140 130, 420 110, 740 248 S 1260 365, 1500 175"
            stroke="#FFCC00"
            strokeWidth="44"
            strokeLinecap="round"
          />
          {/* Dashed Centerline */}
          <path
            d="M -60 280 C 140 130, 420 110, 740 248 S 1260 365, 1500 175"
            stroke="#1E293B"
            strokeWidth="1.75"
            strokeDasharray="5 5"
            opacity="0.7"
          />
          {/* Minimalist Top-Down Car on Road */}
          <g transform="translate(740, 248) rotate(23)">
            <rect x="-15" y="-8.5" width="30" height="17" rx="5" fill="#111827" />
            <rect x="-8" y="-6.5" width="14" height="13" rx="3" fill="#FFCC00" opacity="0.85" />
            <rect x="-4" y="-5" width="7" height="10" rx="1.5" fill="#111827" />
          </g>
        </svg>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Editorial Asymmetric Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-12 sm:mb-14">
            <div className="lg:col-span-3">
              <span className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-black">
                <span className="w-2 h-2 rounded-full bg-[#FFCC00] ring-1 ring-black/15 shrink-0" aria-hidden="true" />
                <span>(Onboarding)</span>
              </span>
            </div>
            <div className="lg:col-span-9 max-w-2xl">
              <h2
                style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
                className="text-3xl sm:text-4xl md:text-5xl font-medium text-black tracking-tight leading-tight"
              >
                How Onboarding Works
              </h2>
              <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
                We guide you every step of the way, from quick online verification to your first morning student route.
              </p>
            </div>
          </div>

          {/* Pill Arrow Controls */}
          <div className="flex items-center space-x-2 mb-6">
            <button
              type="button"
              onClick={() => setActiveOnboardingStep((prev) => (prev === 0 ? onboardingSteps.length - 1 : prev - 1))}
              aria-label="Previous onboarding step"
              className="w-11 h-11 rounded-full bg-white hover:bg-neutral-50 border border-black/10 shadow-sm flex items-center justify-center text-black focus-visible:outline-2 focus-visible:outline-black transition-all cursor-pointer active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setActiveOnboardingStep((prev) => (prev === onboardingSteps.length - 1 ? 0 : prev + 1))}
              aria-label="Next onboarding step"
              className="w-11 h-11 rounded-full bg-black hover:bg-neutral-900 shadow-sm flex items-center justify-center text-[#FFCC00] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 transition-all cursor-pointer active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </button>
          </div>

          {/* 4 Frosted / Highlighted Step Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {onboardingSteps.map((s, idx) => {
              const isActive = idx === activeOnboardingStep;
              return (
                <div
                  key={idx}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isActive}
                  onClick={() => setActiveOnboardingStep(idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveOnboardingStep(idx);
                    }
                  }}
                  className={`min-h-[260px] sm:min-h-[280px] rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                    isActive
                      ? 'bg-[#FFCC00] border border-[#F0C000] shadow-md text-black'
                      : 'bg-white/80 backdrop-blur-md border border-white/90 hover:bg-white/90 shadow-sm text-black'
                  }`}
                >
                  <div>
                    <h3 className="text-base sm:text-lg font-medium uppercase tracking-tight leading-snug text-black">
                      {s.title}
                    </h3>
                    <p className={`mt-3 text-xs sm:text-sm leading-relaxed ${isActive ? 'text-black/80' : 'text-slate-600'}`}>
                      {s.desc}
                    </p>
                  </div>

                  <div className="pt-6 flex items-center space-x-2 text-[11px] font-bold uppercase tracking-wider text-black/80">
                    <span>Step 0{s.step}</span>
                    <span>+</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 5: Driver Voices / Testimonials */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2
              style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
              className="text-3xl sm:text-4xl md:text-5xl font-medium text-black tracking-tight"
            >
              Hear From Our Drivers
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
              Read how everyday drivers found meaningful work, stable schedules, and strong community connections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {driverTestimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 border border-slate-200 shadow-xs flex flex-col justify-between"
              >
                <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>

                <div className="flex items-center space-x-3.5 pt-4 border-t border-slate-100">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <div className="text-sm font-bold text-black">{t.name}</div>
                    <div className="text-xs text-slate-500 font-medium">{t.location} • {t.tenure}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Frequently Asked Questions */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
              className="text-3xl sm:text-4xl font-medium text-black tracking-tight"
            >
              Driver Questions &amp; Answers
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 font-medium">
              Everything you need to know about routes, pay, vehicle standards, and support.
            </p>
          </div>

          <div className="space-y-3">
            {driverFaqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs hover:border-slate-300 transition-colors"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
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
      </section>

      {/* Section 7: Drive in These Regions */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <RegionCarousel onApply={() => setIsApplyModalOpen(true)} />
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="bg-black text-white rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-500/20 text-brand-400 text-xs font-bold uppercase tracking-wider border border-brand-500/30">
              Applications Open for 2026–2027 Academic Year
            </span>
            <h2
              style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
              className="text-3xl sm:text-5xl font-medium text-white tracking-tight"
            >
              Ready to Make Every School Ride Inspiring?
            </h2>
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              Earn predictable pay, drive respectful students, and take pride in knowing your daily commute empowers children's educational journeys.
            </p>
            <div className="pt-2 flex justify-center">
              <button
                onClick={() => setIsApplyModalOpen(true)}
                className="inline-flex items-center space-x-3 bg-brand-600 hover:bg-brand-500 text-white font-normal px-8 py-3.5 rounded-full shadow-lg transition-all cursor-pointer active:scale-95 text-sm sm:text-base"
              >
                <span>Apply to Drive Now</span>
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {isApplyModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="driver-apply-modal-title"
          onClick={resetForm}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-[28px] max-w-4xl w-full shadow-2xl border border-slate-200 relative max-h-[92vh] overflow-y-auto no-scrollbar grid grid-cols-1 md:grid-cols-12"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={resetForm}
              aria-label="Close application modal"
              className="absolute top-3.5 right-3.5 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 md:bg-transparent text-slate-600 hover:text-black hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-brand-600 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Trust Anchor (#051D97 Official Logo Royal Blue) */}
            <div className="md:col-span-5 bg-[#051D97] text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
              <div className="space-y-4 sm:space-y-5 relative z-10 pr-8 md:pr-0">
                <div className="inline-flex items-center gap-2 text-xs font-medium text-sky-200">
                  <span className="w-2 h-2 rounded-full bg-[#FFCC00]" aria-hidden="true" />
                  <span>W-2 Driver Careers</span>
                </div>
                <h3 id="driver-apply-modal-title" className="font-inktrap text-2xl sm:text-[1.75rem] font-medium tracking-tight leading-tight text-white">
                  Drive a steady, meaningful school-day route.
                </h3>
                <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
                  Complete this 5-minute application to connect with your local district driver coordinator and start route matching.
                </p>
                <ul className="space-y-2.5 pt-1 text-xs text-white/95">
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-white/15 inline-flex items-center justify-center text-[#16C3FF] shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[2.8]" aria-hidden="true" />
                    </span>
                    <span>Steady W-2 hourly pay &amp; paid training</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-white/15 inline-flex items-center justify-center text-[#16C3FF] shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[2.8]" aria-hidden="true" />
                    </span>
                    <span>Predictable weekday school bell hours</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-white/15 inline-flex items-center justify-center text-[#16C3FF] shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[2.8]" aria-hidden="true" />
                    </span>
                    <span>Coordinator review within 24 business hours</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-white/15 text-xs text-blue-100/90 space-y-1 relative z-10">
                <div className="font-semibold text-white">(458) 227-9468 · info@buckledin.com</div>
                <div className="text-blue-200/80">19-Point Vehicle Safety Standard</div>
              </div>
            </div>

            {/* Right Clean Daylight Form */}
            <div className="md:col-span-7 p-6 sm:p-8 bg-white flex flex-col justify-center">
              {formSubmitted ? (
                <div role="status" aria-live="polite" className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-inktrap text-2xl font-medium text-black tracking-tight">
                    Application Received!
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
                    Thank you, <span className="font-semibold text-black">{formData.firstName}</span>. Our local district driver coordinator will review your information and reach out within 24 business hours.
                  </p>
                  <div className="pt-3">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="bg-black hover:bg-neutral-800 text-white font-medium px-7 py-2.5 rounded-full text-sm transition-colors cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="driver-first-name" className="block text-[11px] font-semibold uppercase tracking-wider text-slate-600 mb-1">First Name *</label>
                      <input
                        id="driver-first-name"
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Sarah"
                        className="w-full pb-2 pt-1 bg-transparent border-b-2 border-slate-200 text-sm text-black placeholder-slate-400 focus:outline-none focus:border-brand-600 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="driver-last-name" className="block text-[11px] font-semibold uppercase tracking-wider text-slate-600 mb-1">Last Name *</label>
                      <input
                        id="driver-last-name"
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Jenkins"
                        className="w-full pb-2 pt-1 bg-transparent border-b-2 border-slate-200 text-sm text-black placeholder-slate-400 focus:outline-none focus:border-brand-600 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="driver-email" className="block text-[11px] font-semibold uppercase tracking-wider text-slate-600 mb-1">Email *</label>
                      <input
                        id="driver-email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="sarah@example.com"
                        className="w-full pb-2 pt-1 bg-transparent border-b-2 border-slate-200 text-sm text-black placeholder-slate-400 focus:outline-none focus:border-brand-600 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="driver-phone" className="block text-[11px] font-semibold uppercase tracking-wider text-slate-600 mb-1">Phone Number *</label>
                      <input
                        id="driver-phone"
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(503) 555-0192"
                        className="w-full pb-2 pt-1 bg-transparent border-b-2 border-slate-200 text-sm text-black placeholder-slate-400 focus:outline-none focus:border-brand-600 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="driver-city" className="block text-[11px] font-semibold uppercase tracking-wider text-slate-600 mb-1">City *</label>
                      <input
                        id="driver-city"
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Portland"
                        className="w-full pb-2 pt-1 bg-transparent border-b-2 border-slate-200 text-sm text-black placeholder-slate-400 focus:outline-none focus:border-brand-600 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="driver-state" className="block text-[11px] font-semibold uppercase tracking-wider text-slate-600 mb-1">State *</label>
                      <input
                        id="driver-state"
                        type="text"
                        name="state"
                        required
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="Oregon"
                        className="w-full pb-2 pt-1 bg-transparent border-b-2 border-slate-200 text-sm text-black placeholder-slate-400 focus:outline-none focus:border-brand-600 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="driver-vehicle" className="block text-[11px] font-semibold uppercase tracking-wider text-slate-600 mb-1">Vehicle Year &amp; Model *</label>
                      <input
                        id="driver-vehicle"
                        type="text"
                        name="vehicleModel"
                        required
                        value={formData.vehicleModel}
                        onChange={handleInputChange}
                        placeholder="2020 Toyota RAV4"
                        className="w-full pb-2 pt-1 bg-transparent border-b-2 border-slate-200 text-sm text-black placeholder-slate-400 focus:outline-none focus:border-brand-600 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="driver-experience" className="block text-[11px] font-semibold uppercase tracking-wider text-slate-600 mb-1">Driving Experience</label>
                      <select
                        id="driver-experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="w-full pb-2 pt-1 bg-transparent border-b-2 border-slate-200 text-sm text-black focus:outline-none focus:border-brand-600 transition-colors"
                      >
                        <option value="3-5 years">3–5 Years</option>
                        <option value="5-10 years">5–10 Years</option>
                        <option value="10+ years">10+ Years</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2 space-y-2.5">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-[#0e85ee] hover:-translate-y-0.5 text-white font-medium py-3 px-6 rounded-full shadow-[0_8px_20px_-4px_rgba(2,103,206,0.32)] hover:shadow-[0_12px_26px_-4px_rgba(2,103,206,0.4)] active:translate-y-0 active:scale-[0.97] transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer text-sm focus-visible:outline-2 focus-visible:outline-brand-600 focus-visible:outline-offset-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Driver Application</span>
                    </button>
                    <p className="text-[11px] text-slate-500 text-center">
                      By submitting, you agree to allow BuckledIn to contact you regarding route openings.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
