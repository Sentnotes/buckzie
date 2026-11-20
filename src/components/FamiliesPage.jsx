import React, { useRef, useState, useLayoutEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  School,
  UserCheck,
  CalendarCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Plus,
  MapPin,
  BellRing,
  Download,
  AlertCircle,
  Navigation,
  Phone,
  Share2,
  Radio,
  Wifi,
  Battery,
  Home,
  ArrowUpRight,
  Star,
  Check,
  Route
} from 'lucide-react';

const programSteps = [
  {
    step: '1',
    category: 'District Onboarding',
    title: 'School & District Partnership',
    description:
      "We partner with your child's school/district, and they send us everything we need to schedule your transportation.",
    tag: 'Seamless Integration',
    image: '/howweworkFamilies/partnership.jpg',
    imageBadge: 'School & District Direct Sync',
    imageBadgeIcon: School,
    details:
      'Zero paperwork for parents — your school district initiates the roster, and we handle complete routing logistics.'
  },
  {
    step: '2',
    category: 'Personalized Care',
    title: 'Consistent Driver Match',
    description:
      'Our routing team works to match your child with a safe, reliable driver who can meet their unique needs and that will commit to their ride for as long as they ride with us.',
    tag: 'Same Familiar Face',
    image: '/howweworkFamilies/Drivermatch.jpg',
    imageBadge: 'Dedicated Driver • Safety Certified',
    imageBadgeIcon: UserCheck,
    details:
      'Consistency is critical. We prioritize driver continuity so your child always sees a warm, familiar driver.'
  },
  {
    step: '3',
    category: 'Live Parent App',
    title: 'Guardian Portal Access',
    description:
      "Once your child is matched with a driver, our team will reach out to you and your child's school/district with the details about the driver and vehicle and how to access our parent portal, so you can watch your family's rides in real-time.",
    tag: 'Live Telematics',
    image: '/howweworkFamilies/GuardianPortalAccess.jpg',
    imageBadge: 'Live GPS • Real-Time ETA',
    imageBadgeIcon: Smartphone,
    details:
      'Follow live vehicle tracking, route progress, and stay updated on your assigned driver or substitute driver details in real time.'
  },
  {
    step: '4',
    category: 'Daily Commute',
    title: 'Reliable Pickups & Drop-offs',
    description:
      "Your child's assigned driver will pick up and drop off your child according to the schedule that is communicated to you, providing you with safe and reliable transportation for your family.",
    tag: 'On-Time Commitment',
    image: '/howweworkFamilies/ReliablePickDrop-offs.jpg',
    imageBadge: 'Verified Pickup & Drop-Off',
    imageBadgeIcon: ShieldCheck,
    details:
      'Drivers wait until the student is safely inside school doors or handed over to a designated guardian.'
  }
];

const familyFaqs = [
  {
    q: 'How does my family get enrolled in the BuckledIn program?',
    a: 'Enrollment is initiated directly through your school district’s transportation or special education department. If your child qualifies for alternative transportation (e.g. IEP accommodations, McKinney-Vento, out-of-district placement), the district requests services with BuckledIn and we will reach out to you directly with driver details and app access.'
  },
  {
    q: 'Will my child have the same driver every day?',
    a: 'Yes. Consistency is a foundational core of our model. We match dedicated drivers to specific recurring routes so your child sees the same trusted, vetted person every morning and afternoon.'
  },
  {
    q: 'What safety measures and certifications do drivers have?',
    a: 'Every driver completes comprehensive multi-state background checks, motor vehicle audits, drug screenings, and child safety certifications. Drivers also receive trauma-informed training and regular vehicle inspections.'
  },
  {
    q: 'Are child safety seats, boosters, or harnesses provided?',
    a: 'Yes. All BuckledIn vehicles come equipped with properly rated, certified child safety seats and boosters matched to your student’s age, height, and weight as specified by safety regulations and district requirements.'
  },
  {
    q: 'What if I need to cancel or modify a ride due to an appointment or illness?',
    a: 'You can easily notify dispatch and update your schedule directly within the BuckledIn Guardian App or by calling our Family Dispatch line during school hours (6 AM – 6 PM).'
  }
];

const heroPillars = [
  {
    id: 'doorstep',
    label: 'DOORSTEP',
    description:
      'Consistent morning pickups and verified afternoon drop-offs so every child starts and ends the school day safely.',
    image: '/family/Mother-Son.png',
  },
  {
    id: 'dedicated',
    label: 'DEDICATED',
    description:
      'Consistent, background-checked drivers matched to your child’s recurring school route—never random rideshare strangers.',
    image: '/family/tripfamilyview.png',
  },
  {
    id: 'gps',
    label: 'LIVE GPS',
    description:
      'Real-time guardian tracking, instant pickup alerts, and direct local dispatch oversight for every mile on the road.',
    image: '/family/dispatch.png',
  },
];

export default function FamiliesPage({ onBackToHome }) {
  const [openFaq, setOpenFaq] = useState(null);
  const [activeHeroPillar, setActiveHeroPillar] = useState(0);
  const [activeProgramStep, setActiveProgramStep] = useState(0);
  const showcaseContainerRef = useRef(null);
  const [showcaseScale, setShowcaseScale] = useState(1);

  useLayoutEffect(() => {
    const el = showcaseContainerRef.current;
    if (!el) return;

    const updateScale = () => {
      const width = el.clientWidth;
      if (width > 0) {
        setShowcaseScale(Math.min(1, width / 980));
      }
    };

    updateScale();

    let ro;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => updateScale());
      ro.observe(el);
    } else {
      window.addEventListener('resize', updateScale);
    }

    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener('resize', updateScale);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-black pb-24">
      {/* ── Architectural Geometric Hero Header (Light Editorial Palette) ── */}
      <section className="w-full home-dot-grid pt-36 sm:pt-40 pb-12 lg:pb-16 mb-12 lg:mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative min-h-[540px] lg:min-h-[580px] flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-0 py-6 lg:py-10 overflow-hidden">
          {/* Top-Left / Top-Right Micro Architectural Labels */}
          <div className="hidden lg:flex absolute top-2 left-0 right-0 justify-between items-center text-[11px] uppercase tracking-[0.2em] text-slate-500 pointer-events-none">
            <span>FOR ALL KIDS</span>
            <div className="flex items-center gap-8">
              <span className="text-[#0267CE] font-semibold">DEDICATED DRIVERS</span>
              <span>GUARDIAN APP</span>
            </div>
          </div>

          {/* Left Typography Overlapping the Circle */}
          <div className="relative z-20 w-full lg:w-[42%] text-left lg:pr-6">
            <h1
              style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
              className="font-inktrap text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-medium text-[#121316] tracking-tight leading-[1.02]"
            >
              Smiles on
              <br />
              Every Mile.
            </h1>
            <p className="mt-4 text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-md">
              Every school day starts with peace of mind. From coordinated morning pickups to verified afternoon drop-offs, our background-checked drivers help give your child a safe, supportive, and predictable ride to school.
            </p>
          </div>

          {/* Center Architectural Circle + Blueprint Grid + Curved Photo Window */}
          <div className="relative z-10 flex items-center justify-center shrink-0">
            <div className="relative w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] lg:w-[460px] lg:h-[460px] rounded-full border-[1.5px] border-[#121316]/85 ring-[10px] ring-white shadow-[0_0_52px_22px_rgba(255,255,255,0.96)] overflow-hidden bg-white">
              {/* Orthogonal Architectural Grid Lines + Template Color Blocks */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Two Template Color Grid Cells (Brand Blue & Safety Amber) */}
                <div className="absolute top-[23%] left-[24%] w-[25.5%] h-[24%] bg-[#0267CE] flex items-center justify-center p-2">
                  <span className="text-white font-bold uppercase tracking-tighter leading-[0.86] text-[22px] sm:text-[32px] lg:text-[36px] text-center select-none">
                    SCH
                    <br />
                    OOL
                  </span>
                </div>

                {/* Adjacent Left Grid Cell: Full-Bleed Architectural Mon-Fri School Calendar */}
                <div className="absolute top-[47%] left-0 w-[24%] h-[27%] bg-slate-50 flex flex-col justify-between overflow-hidden select-none">
                  {/* Full-Bleed Calendar Header */}
                  <div className="bg-[#121316] text-white pl-4 sm:pl-5 pr-2 sm:pr-2.5 py-1.5 flex items-center justify-between">
                    <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider">
                      MON–FRI
                    </span>
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#FFCC00]" />
                  </div>

                  {/* Mini Week Grid Filling the Cell */}
                  <div className="flex-1 flex flex-col justify-center pl-3.5 sm:pl-5 pr-1.5 sm:pr-2.5 py-1.5 gap-1">
                    <div className="grid grid-cols-5 gap-0.5 sm:gap-1 text-center text-[7px] sm:text-[9px] font-semibold text-slate-400">
                      <span>M</span>
                      <span>T</span>
                      <span>W</span>
                      <span>T</span>
                      <span>F</span>
                    </div>
                    <div className="grid grid-cols-5 gap-0.5 sm:gap-1 text-center text-[8px] sm:text-[10px] font-bold">
                      <span className="rounded bg-white border border-slate-200 text-[#121316] py-0.5 sm:py-1">12</span>
                      <span className="rounded bg-[#0267CE] text-white py-0.5 sm:py-1">13</span>
                      <span className="rounded bg-white border border-slate-200 text-[#121316] py-0.5 sm:py-1">14</span>
                      <span className="rounded bg-[#FFCC00] text-[#121316] py-0.5 sm:py-1">15</span>
                      <span className="rounded bg-white border border-slate-200 text-[#121316] py-0.5 sm:py-1">16</span>
                    </div>
                  </div>

                  {/* Footer Strip */}
                  <div className="pl-4 sm:pl-5 pr-2 sm:pr-2.5 py-1 border-t border-slate-200/80 bg-white/80 flex items-center justify-between">
                    <span className="text-[7px] sm:text-[9px] font-medium text-slate-500 uppercase">
                      AM / PM
                    </span>
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#0267CE]" />
                  </div>
                </div>

                <div className="absolute top-[74%] left-[24%] w-[25.5%] h-[26%] bg-[#FFCC00] flex items-start justify-end pt-2 sm:pt-3 pr-2 sm:pr-3 pl-2.5">
                  <div className="flex items-center gap-1 sm:gap-1.5 text-[#121316]">
                    <span className="font-bold uppercase tracking-tighter text-[17px] sm:text-[23px] lg:text-[26px] leading-[0.86] text-right select-none">
                      KIDS
                      <br />
                      ZONE
                    </span>
                    <svg
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 sm:w-8 sm:h-8 lg:w-9 lg:h-9 shrink-0"
                      aria-hidden="true"
                    >
                      {/* Main Bold Horizontal + Diagonal Arrow Stem */}
                      <path
                        d="M 5 4 H 30 C 31.1 4 32 4.9 32 6 V 11.5 C 32 12.6 31.5 13.7 30.7 14.5 L 13.2 32 C 12.4 32.8 11.1 32.8 10.3 32 L 5.6 27.3 C 4.8 26.5 4.8 25.2 5.6 24.4 L 14.5 15.5 H 5 C 3.9 15.5 3 14.6 3 13.5 V 6 C 3 4.9 3.9 4 5 4 Z"
                        fill="currentColor"
                      />
                      {/* Split Bottom-Right Rounded Wedge */}
                      <path
                        d="M 32 17.5 V 26.5 C 32 29.8 29.3 32.5 26 32.5 C 22.7 32.5 20 29.8 20 26.5 C 20 25 20.6 23.6 21.6 22.5 L 29.8 14.3 C 30.8 13.3 32 14.1 32 15.5 V 17.5 Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>

                {/* Vertical Grid Lines */}
                <div className="absolute inset-y-0 left-[24%] w-px bg-slate-300/80" />
                <div className="absolute inset-y-0 left-[49.5%] w-[1.5px] bg-[#121316]/85" />
                <div className="absolute inset-y-0 left-[75%] w-px bg-slate-300/80" />
                {/* Horizontal Grid Lines */}
                <div className="absolute inset-x-0 top-[23%] h-px bg-slate-300/80" />
                <div className="absolute inset-x-0 top-[47%] h-px bg-slate-300/80" />
                <div className="absolute inset-x-0 top-[74%] h-px bg-slate-300/80" />
              </div>

              {/* Small Stacked Editorial Note Inside Top-Center Grid Cell */}
              <div className="absolute top-[7%] left-[52%] text-[10px] sm:text-xs leading-tight text-[#121316]/85">
                dedicated
                <br />
                student
                <br />
                transit
              </div>

              {/* Curved Quarter-Circle Photo Window (Bottom-Right Quadrant) */}
              <div className="absolute right-0 bottom-0 w-[50.5%] h-[68%] rounded-tl-[160px] sm:rounded-tl-[220px] border-t-[1.5px] border-l-[1.5px] border-[#121316]/85 overflow-hidden bg-slate-100 z-10">
                <img
                  src="/family/Mother-Son.png"
                  alt="Mother and son smiling for school commute"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Horizontal Extension Line Sweeping Right From Photo Window Top + Unique Traffic Signal */}
            <div className="hidden lg:block absolute left-1/2 top-[32%] lg:right-[-255px] xl:right-[-315px] h-[1.5px] bg-[#121316]/85 pointer-events-none">
              {/* Unique Architectural Traffic Signal Terminating the Line Behind the Tesla */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2">
                <svg
                  width="54"
                  height="112"
                  viewBox="0 0 54 112"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="drop-shadow-[0_10px_18px_rgba(18,19,22,0.12)]"
                  aria-label="BuckledIn Architectural Traffic Signal"
                >
                  <defs>
                    <linearGradient id="trafficHousing" x1="12" y1="10" x2="42" y2="96" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#262A32" />
                      <stop offset="100%" stopColor="#121316" />
                    </linearGradient>
                    <radialGradient id="redGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FF6B6B" />
                      <stop offset="65%" stopColor="#EF4444" />
                      <stop offset="100%" stopColor="#B91C1C" />
                    </radialGradient>
                    <radialGradient id="amberGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FFE566" />
                      <stop offset="65%" stopColor="#FFCC00" />
                      <stop offset="100%" stopColor="#D97706" />
                    </radialGradient>
                    <radialGradient id="goGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#6EE7B7" />
                      <stop offset="65%" stopColor="#22C55E" />
                      <stop offset="100%" stopColor="#15803D" />
                    </radialGradient>
                  </defs>

                  {/* Cantilever Mount Connecting Into the Horizontal Line */}
                  <path d="M 0 56 L 12 56" stroke="#121316" strokeWidth="1.8" />
                  <circle cx="12" cy="56" r="2.5" fill="#121316" />

                  {/* Subtle Architectural Backplate Halo */}
                  <rect
                    x="13"
                    y="12"
                    width="28"
                    height="88"
                    rx="14"
                    fill="#FFFFFF"
                    stroke="#121316"
                    strokeWidth="1.5"
                  />

                  {/* Sculpted Matte-Charcoal Signal Pod */}
                  <rect
                    x="16.5"
                    y="15.5"
                    width="21"
                    height="81"
                    rx="10.5"
                    fill="url(#trafficHousing)"
                  />

                  {/* Top Signal Visor + Red Lens (Stop) */}
                  <path d="M 19 25 C 22 20.5, 32 20.5, 35 25" stroke="#4B5563" strokeWidth="1.2" strokeLinecap="round" />
                  <circle cx="27" cy="31" r="6.8" fill="url(#redGlow)" opacity={activeHeroPillar === 0 ? 1 : 0.72} />
                  <path d="M 24 28.2 A 4.2 4.2 0 0 1 29.5 27.6" stroke="#FFFFFF" strokeWidth="1.1" strokeLinecap="round" opacity="0.7" />

                  {/* Middle Signal Visor + Amber Lens (Ready) */}
                  <path d="M 19 50 C 22 45.5, 32 45.5, 35 50" stroke="#4B5563" strokeWidth="1.2" strokeLinecap="round" />
                  <circle cx="27" cy="56" r="6.8" fill="url(#amberGlow)" opacity={activeHeroPillar === 1 ? 1 : 0.78} />
                  <path d="M 24 53.2 A 4.2 4.2 0 0 1 29.5 52.6" stroke="#FFFFFF" strokeWidth="1.1" strokeLinecap="round" opacity="0.75" />

                  {/* Bottom Signal Visor + Green Lens (Go) */}
                  <path d="M 19 75 C 22 70.5, 32 70.5, 35 75" stroke="#4B5563" strokeWidth="1.2" strokeLinecap="round" />
                  <circle cx="27" cy="81" r="6.8" fill="url(#goGlow)" opacity={activeHeroPillar === 2 ? 1 : 0.85} />
                  <path d="M 24 78.2 A 4.2 4.2 0 0 1 29.5 77.6" stroke="#FFFFFF" strokeWidth="1.1" strokeLinecap="round" opacity="0.7" />

                  {/* Active Go Halo Ring */}
                  <circle
                    cx="27"
                    cy={activeHeroPillar === 0 ? 31 : activeHeroPillar === 1 ? 56 : 81}
                    r="8.8"
                    stroke={activeHeroPillar === 0 ? '#EF4444' : activeHeroPillar === 1 ? '#FFCC00' : '#22C55E'}
                    strokeWidth="1.2"
                    strokeDasharray="2.5 2.5"
                    opacity="0.85"
                  />

                  {/* Minimalist Bottom Stem Terminal */}
                  <line x1="27" y1="100" x2="27" y2="109" stroke="#121316" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="27" cy="109" r="2" fill="#0267CE" />
                </svg>
              </div>
            </div>
          </div>

          {/* Right Interactive Pillar Switcher & Description (Next to Traffic Signal) */}
          <div className="relative z-20 w-full lg:w-[30%] lg:pl-8 lg:pr-16 lg:pt-16 flex flex-col justify-center space-y-5">
            {/* Tab Labels (DOORSTEP | DEDICATED | LIVE GPS) */}
            <div className="flex items-center gap-4 text-xs sm:text-sm tracking-wider uppercase">
              {heroPillars.map((pillar, idx) => {
                const isActive = idx === activeHeroPillar;
                return (
                  <button
                    key={pillar.id}
                    type="button"
                    onClick={() => setActiveHeroPillar(idx)}
                    className={`transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-brand-600 focus-visible:outline-offset-2 rounded ${
                      isActive
                        ? 'text-[#0267CE] font-bold'
                        : 'text-slate-600 hover:text-black font-medium'
                    }`}
                  >
                    {pillar.label}
                  </button>
                );
              })}
            </div>

            {/* Active Pillar Copy */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed min-h-[72px]">
              {heroPillars[activeHeroPillar].description}
            </p>

            {/* Minimalist Architectural Arrow Control (← ——— (→)) */}
            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() =>
                  setActiveHeroPillar((prev) =>
                    prev === 0 ? heroPillars.length - 1 : prev - 1
                  )
                }
                aria-label="Previous family highlight"
                className="w-11 h-11 rounded-full flex items-center justify-center text-slate-600 hover:text-[#121316] hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-brand-600 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="w-12 h-px bg-slate-300" />

              <button
                type="button"
                onClick={() =>
                  setActiveHeroPillar((prev) =>
                    prev === heroPillars.length - 1 ? 0 : prev + 1
                  )
                }
                aria-label="Next family highlight"
                className="w-11 h-11 rounded-full bg-[#0267CE]/10 hover:bg-[#0267CE] text-[#0267CE] hover:text-white flex items-center justify-center focus-visible:outline-2 focus-visible:outline-brand-600 focus-visible:outline-offset-2 transition-all cursor-pointer active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Horizontal Transit Route Stepper + Single Feature Stage: "How Our Program Works" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 lg:mb-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-600 mb-2">
              Simple, Reliable, Transparent
            </p>
            <h2
              style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
              className="text-3xl sm:text-4xl md:text-5xl font-medium text-black tracking-tight"
            >
              How Our Program Works
            </h2>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-end">
            <span className="text-xs font-semibold text-slate-500 mr-1">
              STEP 0{activeProgramStep + 1} / 0{programSteps.length}
            </span>
            <button
              type="button"
              onClick={() =>
                setActiveProgramStep((prev) =>
                  prev === 0 ? programSteps.length - 1 : prev - 1
                )
              }
              aria-label="Previous step"
              className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-black hover:text-white hover:border-black flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() =>
                setActiveProgramStep((prev) =>
                  prev === programSteps.length - 1 ? 0 : prev + 1
                )
              }
              aria-label="Next step"
              className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-black hover:text-white hover:border-black flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal 4-Stop Transit Route Bar */}
        <div className="relative mb-8">
          {/* Desktop Route Progress Track */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute left-[12.5%] right-[12.5%] top-5 h-[2px] bg-slate-200"
          >
            <div
              className="h-full bg-[#0267CE] transition-all duration-500 ease-out"
              style={{ width: `${(activeProgramStep / (programSteps.length - 1)) * 100}%` }}
            />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 relative z-10">
            {programSteps.map((stepItem, index) => {
              const isActive = activeProgramStep === index;
              const isPassed = index < activeProgramStep;

              return (
                <button
                  key={stepItem.step}
                  type="button"
                  onClick={() => setActiveProgramStep(index)}
                  className={`group flex flex-col items-start lg:items-center text-left lg:text-center p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-white border-slate-300 shadow-[0_8px_24px_rgba(2,103,206,0.08)] lg:bg-transparent lg:border-transparent lg:shadow-none'
                      : 'bg-slate-50/70 border-slate-200/60 hover:bg-white lg:bg-transparent lg:border-transparent lg:hover:bg-transparent'
                  }`}
                >
                  {/* Route Stop Node */}
                  <span
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 mb-3 ${
                      isActive
                        ? 'bg-[#0267CE] text-white border-[#0267CE] shadow-md scale-110'
                        : isPassed
                          ? 'bg-white text-[#0267CE] border-[#0267CE]'
                          : 'bg-white text-slate-400 border-slate-200 group-hover:border-slate-400 group-hover:text-slate-700'
                    }`}
                  >
                    0{stepItem.step}
                  </span>

                  <span
                    className={`text-[11px] font-semibold uppercase tracking-wider mb-1 transition-colors ${
                      isActive ? 'text-[#0267CE]' : 'text-slate-400'
                    }`}
                  >
                    {stepItem.category}
                  </span>

                  <span
                    className={`text-sm sm:text-base font-bold tracking-tight leading-snug transition-colors ${
                      isActive ? 'text-black' : 'text-slate-600 group-hover:text-black'
                    }`}
                  >
                    {stepItem.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Single Featured Stage Card */}
        {(() => {
          const current = programSteps[activeProgramStep] || programSteps[0];
          const ActiveBadgeIcon = current.imageBadgeIcon;

          return (
            <div className="rounded-[2rem] bg-[#F8FAFC] border border-slate-200/80 p-5 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left: Step Copy + Key Safeguard */}
                <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold text-[#121316]">
                        STEP 0{current.step}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-xs font-semibold text-brand-600">
                        {current.tag}
                      </span>
                    </div>

                    <h3
                      style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
                      className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black tracking-tight leading-tight"
                    >
                      {current.title}
                    </h3>

                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                      {current.description}
                    </p>
                  </div>

                  {/* Highlighted Key Safeguard Callout */}
                  <div className="rounded-2xl bg-white border border-slate-200/80 p-4 sm:p-5 shadow-xs">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-600 mb-1.5">
                      <ShieldCheck className="w-4 h-4 shrink-0" />
                      <span>Key Safeguard</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                      {current.details}
                    </p>
                  </div>
                </div>

                {/* Right: Featured Photo + Floating Badge */}
                <div className="lg:col-span-6">
                  <div className="relative h-64 sm:h-80 lg:h-[380px] w-full rounded-[1.5rem] overflow-hidden border border-slate-200/80 bg-slate-100 shadow-sm">
                    <img
                      key={current.step}
                      src={current.image}
                      alt={current.title}
                      className="w-full h-full object-cover transition-opacity duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/95 backdrop-blur-md text-[#121316] text-xs font-bold shadow-md">
                        <ActiveBadgeIcon className="w-4 h-4 text-brand-600 shrink-0" />
                        <span>{current.imageBadge}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* Guardian App Spotlight & iPhone 16 Live GPS Tracking Experience */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 py-12 md:py-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-50 text-brand-600 text-xs font-bold uppercase tracking-wider border border-brand-200 shadow-xs mb-4">
            <Smartphone className="w-4 h-4 text-brand-500" />
            <span>The Guardian App Experience</span>
          </span>

          <h2
            style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
            className="text-3xl sm:text-4xl md:text-5xl font-medium text-black tracking-tight leading-tight"
          >
            Real-Time Oversight In The Palm Of Your Hand.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            Designed specifically for busy parents and guardians. Track every leg of your student&apos;s trip from school dismissal to your front doorstep with live telematics, turn-by-turn route tracking, and instant milestone alerts.
          </p>
        </div>

        {/* ── Mobile Stacked 3-Party Connected Ecosystem (< md) ── */}
        <div className="md:hidden space-y-5 mb-14">
          <div className="flex justify-center">
            <img
              src="/family/tripfamilyview.png"
              alt="BuckledIn Guardian App Live GPS Tracking on iPhone 16"
              className="w-[210px] h-auto drop-shadow-[0_16px_36px_rgba(0,0,0,0.16)] block select-none"
              loading="lazy"
            />
          </div>

          <div className="grid grid-cols-1 gap-3">
            {[
              {
                title: 'Live Dispatch',
                flow: 'transport coordination',
                badgeClass: 'bg-sky-50 text-sky-700 border-sky-200',
                dotClass: 'bg-sky-600',
                img: '/family/dispatch.png',
                alt: 'Dispatch staffer monitoring commute on console',
              },
              {
                title: 'Parent / Guardian',
                flow: 'parent tracking',
                badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                dotClass: 'bg-emerald-600',
                img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
                alt: 'Parent Guardian viewing live ride update on smartphone',
              },
              {
                title: 'Marcus Ramirez',
                flow: 'driver direction',
                badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
                dotClass: 'bg-amber-500',
                img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
                alt: 'Certified Driver navigating dedicated route',
              },
            ].map((party) => (
              <div
                key={party.title}
                className="flex items-center gap-4 bg-white rounded-2xl p-3 border border-slate-200 shadow-sm"
              >
                <img
                  src={party.img}
                  alt={party.alt}
                  loading="lazy"
                  className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200/80"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-semibold text-black truncate">{party.title}</h3>
                    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-brand-50 text-brand-600 shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                    </span>
                  </div>
                  <span className={`mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${party.badgeClass}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${party.dotClass}`} aria-hidden="true" />
                    {party.flow}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 3-Party Connected Ecosystem Showcase (Desktop md+: Phone Center, Clean Team Cards, Path-Written Data Flows) ── */}
        <div
          ref={showcaseContainerRef}
          className="hidden md:flex relative w-full max-w-[980px] mx-auto mb-16 sm:mb-20 select-none overflow-hidden justify-center items-start"
          style={{
            height: showcaseScale < 1 ? `${showcaseScale * 520}px` : '520px',
          }}
        >
          <div
            className="w-[980px] h-[520px] shrink-0 flex flex-row items-center justify-center select-none"
            style={{
              transform: `scale(${showcaseScale})`,
              transformOrigin: 'top center',
              willChange: 'transform',
            }}
          >

            {/* Left Column: Staffer & Parent Cards (Clean Team Cards, No Dense Text) */}
            <div className="w-[220px] h-[520px] flex flex-col justify-between shrink-0">
              
              {/* Card 1: Live Dispatch */}
              <div className="w-full h-[230px] rounded-[22px] overflow-hidden relative shadow-[0_8px_26px_rgba(0,0,0,0.08)] border border-slate-200/80 flex flex-col justify-end bg-slate-900">
                <img
                  src="/family/dispatch.png"
                  alt="Dispatch staffer monitoring commute on console"
                  className="absolute inset-0 w-full h-full object-cover object-[62%_center]"
                  loading="lazy"
                />
                
                {/* Smooth Progressive Blur & Gradient Fade Layer (Reduced Height) */}
                <div
                  className="absolute inset-x-0 bottom-0 h-[38%] pointer-events-none"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.40) 55%, rgba(0,0,0,0) 100%)',
                    backdropFilter: 'blur(16px) saturate(160%)',
                    WebkitBackdropFilter: 'blur(16px) saturate(160%)',
                    maskImage: 'linear-gradient(to top, black 0%, black 48%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to top, black 0%, black 48%, transparent 100%)',
                  }}
                />

                {/* Card Details: Clean Title + Verified Badge Only */}
                <div className="relative z-10 p-3 sm:p-3.5 text-white flex flex-col justify-end">
                  <div className="flex items-center space-x-1.5">
                    <h3 className="text-sm sm:text-base font-medium text-white tracking-normal leading-snug truncate">
                      Live Dispatch
                    </h3>
                    <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-white text-black shadow-xs shrink-0">
                      <Check className="w-2 h-2 text-brand-600 stroke-[2.5]" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 2: Parent / Guardian */}
              <div className="w-full h-[230px] rounded-[22px] overflow-hidden relative shadow-[0_8px_26px_rgba(0,0,0,0.08)] border border-slate-200/80 flex flex-col justify-end bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80"
                  alt="Parent Guardian viewing live ride update on smartphone"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                
                {/* Smooth Progressive Blur & Gradient Fade Layer (Reduced Height) */}
                <div
                  className="absolute inset-x-0 bottom-0 h-[38%] pointer-events-none"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.40) 55%, rgba(0,0,0,0) 100%)',
                    backdropFilter: 'blur(16px) saturate(160%)',
                    WebkitBackdropFilter: 'blur(16px) saturate(160%)',
                    maskImage: 'linear-gradient(to top, black 0%, black 48%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to top, black 0%, black 48%, transparent 100%)',
                  }}
                />

                {/* Card Details: Clean Title + Verified Badge Only */}
                <div className="relative z-10 p-3 sm:p-3.5 text-white flex flex-col justify-end">
                  <div className="flex items-center space-x-1.5">
                    <h3 className="text-sm sm:text-base font-medium text-white tracking-normal leading-snug truncate">
                      Parent / Guardian
                    </h3>
                    <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-white text-black shadow-xs shrink-0">
                      <Check className="w-2 h-2 text-brand-600 stroke-[2.5]" />
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Left Connector Block: Exact 150px Width, Touching Card and Phone with textPath Curving With Path */}
            <div className="w-[150px] h-[520px] relative pointer-events-none shrink-0">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 150 520" fill="none">
                <defs>
                  {/* Wave contour for Transport Coordination */}
                  <path id="flow-transport" d="M 0 115 C 45 142, 105 142, 150 115" />
                  {/* Wave contour for Parent Tracking */}
                  <path id="flow-parent" d="M 0 405 C 45 378, 105 378, 150 405" />
                </defs>

                {/* Top Dotted Transit Path: Card 1 (X=0, Y=115) -> Phone Top Nav (X=150, Y=115) */}
                <path
                  d="M 0 115 C 45 142, 105 142, 150 115"
                  stroke="#0284C7"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  strokeLinecap="round"
                />
                <circle cx="0" cy="115" r="4" fill="#0284C7" />
                <circle cx="150" cy="115" r="4" fill="#0284C7" />

                {/* Text Following Exact Flow of Top Path */}
                <text dy="-7" fill="#0284C7" style={{ fontFamily: '"Caveat", cursive', fontSize: '18px', fontWeight: 400 }}>
                  <textPath href="#flow-transport" startOffset="50%" textAnchor="middle">
                    transport coordination
                  </textPath>
                </text>

                {/* Bottom Dotted Transit Path: Card 2 (X=0, Y=405) -> Phone Arrival Sheet (X=150, Y=405) */}
                <path
                  d="M 0 405 C 45 378, 105 378, 150 405"
                  stroke="#10B981"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  strokeLinecap="round"
                />
                <circle cx="0" cy="405" r="4" fill="#10B981" />
                <circle cx="150" cy="405" r="4" fill="#10B981" />

                {/* Text Following Exact Flow of Bottom Path */}
                <text dy="-7" fill="#059669" style={{ fontFamily: '"Caveat", cursive', fontSize: '18px', fontWeight: 400 }}>
                  <textPath href="#flow-parent" startOffset="50%" textAnchor="middle">
                    parent tracking
                  </textPath>
                </text>
              </svg>
            </div>

            {/* Center: iPhone 16 Pro Mockup (Exact 240px Width directly touching connectors) */}
            <div className="w-[240px] shrink-0 relative z-10 flex items-center justify-center">
              <img
                src="/family/tripfamilyview.png"
                alt="BuckledIn Guardian App Live GPS Tracking on iPhone 16"
                className="w-[240px] h-auto drop-shadow-[0_20px_45px_rgba(0,0,0,0.18)] block select-none"
                loading="lazy"
              />
            </div>

            {/* Right Connector Block: Exact 150px Width, Touching Phone and Driver Card with textPath Curving With Path */}
            <div className="w-[150px] h-[520px] relative pointer-events-none shrink-0">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 150 520" fill="none">
                <defs>
                  {/* Wave contour for Driver Direction */}
                  <path id="flow-driver" d="M 0 260 C 45 288, 105 288, 150 260" />
                </defs>

                {/* Driver Dotted Transit Path: Phone Vehicle (X=0, Y=260) -> Driver Card (X=150, Y=260) */}
                <path
                  d="M 0 260 C 45 288, 105 288, 150 260"
                  stroke="#F59E0B"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  strokeLinecap="round"
                />
                <circle cx="0" cy="260" r="4" fill="#F59E0B" />
                <circle cx="150" cy="260" r="4" fill="#F59E0B" />

                {/* Text Following Exact Flow of Driver Path */}
                <text dy="-7" fill="#D97706" style={{ fontFamily: '"Caveat", cursive', fontSize: '18px', fontWeight: 400 }}>
                  <textPath href="#flow-driver" startOffset="50%" textAnchor="middle">
                    driver direction
                  </textPath>
                </text>
              </svg>
            </div>

            {/* Right Column: Driver Card Only (Clean Team Card, Vertically Centered) */}
            <div className="w-[220px] h-[520px] flex items-center justify-center shrink-0">
              
              {/* Card 3: Certified Driver */}
              <div className="w-full h-[230px] rounded-[22px] overflow-hidden relative shadow-[0_8px_26px_rgba(0,0,0,0.08)] border border-slate-200/80 flex flex-col justify-end bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
                  alt="Certified Driver navigating dedicated route"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                
                {/* Smooth Progressive Blur & Gradient Fade Layer (Reduced Height) */}
                <div
                  className="absolute inset-x-0 bottom-0 h-[38%] pointer-events-none"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.40) 55%, rgba(0,0,0,0) 100%)',
                    backdropFilter: 'blur(16px) saturate(160%)',
                    WebkitBackdropFilter: 'blur(16px) saturate(160%)',
                    maskImage: 'linear-gradient(to top, black 0%, black 48%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to top, black 0%, black 48%, transparent 100%)',
                  }}
                />

                {/* Card Details: Clean Title + Verified Badge Only */}
                <div className="relative z-10 p-3 sm:p-3.5 text-white flex flex-col justify-end">
                  <div className="flex items-center space-x-1.5">
                    <h3 className="text-sm sm:text-base font-medium text-white tracking-normal leading-snug truncate">
                      Marcus Ramirez
                    </h3>
                    <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-white text-black shadow-xs shrink-0">
                      <Check className="w-2 h-2 text-brand-600 stroke-[2.5]" />
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* ── 4 Feature Highlights Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-brand-400 hover:shadow-md transition-all">
            <div className="text-slate-900 font-bold text-base flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-brand-600 shrink-0" />
              <span>Live GPS Telematics</span>
            </div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Live real-time route path on the map with estimated arrival times continuously updated for traffic.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-brand-400 hover:shadow-md transition-all">
            <div className="text-slate-900 font-bold text-base flex items-center space-x-2">
              <UserCheck className="w-4 h-4 text-brand-600 shrink-0" />
              <span>Driver &amp; Vehicle ID</span>
            </div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              View assigned driver, vehicle make, model, and license plate.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-brand-400 hover:shadow-md transition-all">
            <div className="text-slate-900 font-bold text-base flex items-center space-x-2">
              <BellRing className="w-4 h-4 text-brand-600 shrink-0" />
              <span>Doorstep Alerts</span>
            </div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Automated push notifications when the vehicle departs campus, reaches your street, and safely arrives at the curb.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-brand-400 hover:shadow-md transition-all">
            <div className="text-slate-900 font-bold text-base flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-brand-600 shrink-0" />
              <span>Dedicated Dispatch</span>
            </div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Live local support specialists watching over every route for total family peace of mind.
            </p>
          </div>
        </div>

        {/* ── App Store and Google Play Download Buttons ── */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {/* Apple App Store Button */}
          <a
            href="https://apps.apple.com/us/app/buckled-in-guardian/id6749759409"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download BuckledIn Guardian on the Apple App Store"
            className="inline-flex items-center space-x-3 bg-black hover:bg-neutral-800 hover:-translate-y-0.5 text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] border border-neutral-800 active:translate-y-0 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-brand-600 focus-visible:outline-offset-2 group cursor-pointer"
          >
            <svg className="w-6 h-6 fill-current group-hover:scale-105 transition-transform" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.77 1.06-1.85.94-2.93-1 .04-2.18.66-2.88 1.48-.56.63-1.06 1.73-.93 2.79 1.12.09 2.24-.57 2.87-1.34z"/>
            </svg>
            <div className="text-left font-sans">
              <div className="text-[10px] uppercase tracking-wider text-neutral-400 font-normal leading-none mb-0.5">Download on the</div>
              <div className="text-sm font-medium tracking-normal text-white leading-tight">App Store</div>
            </div>
          </a>

          {/* Google Play Store Button */}
          <a
            href="https://play.google.com/store/apps/details?id=com.buckledin.caregiver&pcampaignid=web_share"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get BuckledIn Guardian on Google Play"
            className="inline-flex items-center space-x-3 bg-black hover:bg-neutral-800 hover:-translate-y-0.5 text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] border border-neutral-800 active:translate-y-0 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-brand-600 focus-visible:outline-offset-2 group cursor-pointer"
          >
            <svg className="w-6 h-6 group-hover:scale-105 transition-transform" viewBox="0 0 24 24" aria-hidden="true">
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

      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-12">
          <h2
            style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
            className="text-3xl sm:text-4xl font-medium text-black tracking-tight"
          >
            Family &amp; Guardian FAQs
          </h2>
          <p className="mt-2 text-sm text-slate-600 font-medium">
            Answers to common questions about safety, scheduling, and driver consistency.
          </p>
        </div>

        <div className="space-y-3.5">
          {familyFaqs.map((faq, index) => {
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
                    <ChevronUp className="w-5 h-5 text-brand-600 shrink-0 ml-2" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0 ml-2" />
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
      </section>

      {/* Bottom CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-black rounded-[2.5rem] p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Have questions about your child's ride?
            </h3>
            <p className="text-sm text-slate-300 font-medium max-w-xl">
              Connect with your school district's transportation coordinator or reach out directly to the BuckledIn support desk.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={onBackToHome}
              className="px-6 py-3 rounded-full font-normal text-black bg-white hover:bg-slate-100 shadow-md transition-all active:scale-95 cursor-pointer text-sm"
            >
              Return to Homepage
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
