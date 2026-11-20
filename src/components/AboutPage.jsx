import React, { useState, useEffect, useRef } from 'react';
import PlacesWeOperate from './PlacesWeOperate';
import CareersPage from './CareersPage';
import StoryRoadmap from './StoryRoadmap';
import {
  Sparkles,
  Award,
  Calendar,
  Building2,
  Briefcase,
  Newspaper,
  Mail,
  ArrowRight,
  Clock,
  CheckCircle2,
  Search,
  X,
  BookOpen,
  Share2,
  Bell,
  ShieldCheck,
  Users,
  ChevronLeft,
  ChevronRight,
  Check,
  Target,
  Compass,
} from 'lucide-react';

/* ─── LinkedIn SVG Icon Component ─────────────────────────────────────────── */
function LinkedInIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.65 1.65 0 1 0 0-3.3 1.66 1.66 0 0 0 0 3.3m1.4 9.74v-8.37H5.06v8.37h2.8z" />
    </svg>
  );
}

/* ─── Programs (Inner Ring - Rotates Clockwise) ─────────────────────────── */
const PROGRAM_PARTNERS = [
  { name: 'Arizona DES', image: '/program/des.webp', tilt: 8 },
  { name: 'Mohave Educational Services', image: '/program/mohave.webp', tilt: -10 },
  { name: 'Oregon DHS', image: '/program/odhs.webp', tilt: 12 },
  { name: 'PA Intermediate Units', image: '/program/paiu.webp', tilt: -7 },
  { name: 'Sourcewell District Transit', image: '/program/sourdewell.webp', tilt: 9 },
  { name: 'Washington State DCYF', image: '/program/washington-state-dpeartment-children.webp', tilt: -12 },
];

/* ─── Partnerships / Industry (Outer Ring - Rotates Anti-Clockwise) ─────── */
const INDUSTRY_PARTNERS = [
  { name: 'CASTO', image: '/industry/casto.webp', tilt: -8 },
  { name: 'MAPT', image: '/industry/mapt.webp', tilt: 11 },
  { name: 'NAEHCY', image: '/industry/naehcy.webp', tilt: -13 },
  { name: 'NAPT', image: '/industry/napt.webp', tilt: 7 },
  { name: 'OPTA', image: '/industry/opta.webp', tilt: -9 },
  { name: 'PASBO', image: '/industry/pasbo.webp', tilt: 12 },
  { name: 'WAPT', image: '/industry/wapt.webp', tilt: -10 },
];

/* ─── Newsletter Issues Data ────────────────────────────────────────────── */
const NEWSLETTER_ISSUES = [
  {
    id: 'nl-01',
    issueNumber: 'Issue #28',
    date: 'October 2026',
    readTime: '5 min read',
    category: 'District Partnerships',
    featured: true,
    title: 'Solving Specialized & McKinney-Vento Transit Bottlenecks Across 500+ School Districts',
    excerpt:
      'How public school superintendents and transportation directors are pairing traditional yellow bus fleets with vetted small-capacity vehicles for reliable morning bell arrivals.',
    image: '/briefings/issue-28-district-partnerships.jpg',
    author: 'Sarah Chen, M.Ed. — VP of District Partnerships',
    highlights: [
      'Reducing out-of-district IEP commute times by an average of 27 minutes per route',
      'Seamless single-rider and small-group dispatch within 48 hours of placement',
      'Full IDEA, McKinney-Vento, and state pupil transportation audit transparency',
    ],
    content: [
      'Across the country, school districts face an acute shortage of traditional commercial bus drivers while specialized student transportation needs continue to grow. Students with Individualized Education Programs (IEPs), out-of-district placements, and protections under the McKinney-Vento Homeless Assistance Act often require flexible, lower-sensory routes that fixed bus loops were never designed to serve.',
      'In our latest multi-district benchmark study covering 500+ partner schools from Pennsylvania to Oregon, districts that integrated BuckledIn for specialized routes reduced average student ride durations by 27 minutes while freeing up commercial buses for high-density corridors.',
      'Every route is paired with a consistent, background-cleared driver so students see the same trusted face every morning and afternoon—transforming the daily school commute into a calm extension of the classroom.',
    ],
  },
  {
    id: 'nl-02',
    issueNumber: 'Issue #27',
    date: 'September 2026',
    readTime: '4 min read',
    category: 'Safety & Compliance',
    featured: false,
    title: 'Inside Guardian Shield 3.0: Real-Time Doorstep Geofencing & Live Parent Telemetry',
    excerpt:
      'A deep dive into our upgraded telematics architecture giving parents and school transportation coordinators second-by-second visibility from home pickup to school gate handoff.',
    image: '/briefings/issue-27-guardian-telemetry.jpg',
    author: 'Elena Rostova — Head of Telematics & Dispatch Operations',
    highlights: [
      'Instant push notifications at approach, verified pickup, and school check-in',
      'Live human monitoring from our safety operations center during school hours',
      'Encrypted chain-of-custody verification for elementary and special needs handoffs',
    ],
    content: [
      'Peace of mind starts with visibility. This semester we rolled out Guardian Shield 3.0 across all 28+ operating metro areas, introducing sub-second GPS telemetry and verified doorstep handoff logs.',
      'Parents and authorized school staff now receive automated notifications when their assigned driver is 5 minutes away, when the student is safely buckled in, and the moment they are greeted by school personnel at the drop-off zone.',
      'Behind the scenes, our live safety specialists monitor route progress in real time to proactively reroute around traffic bottlenecks and weather delays before they impact morning bell schedules.',
    ],
  },
  {
    id: 'nl-03',
    issueNumber: 'Issue #26',
    date: 'August 2026',
    readTime: '6 min read',
    category: 'Safety & Compliance',
    featured: false,
    title: 'Our 19-Point Back-to-School Vehicle & Multi-Jurisdiction Driver Vetting Protocol',
    excerpt:
      'How BuckledIn drivers complete thorough background checks, child safety restraint certifications, and recurring mechanical inspections before their first route.',
    image: '/briefings/issue-26-vehicle-vetting.jpg',
    author: 'Marcus Ramirez — Director of Driver Safety & Vetting',
    highlights: [
      'Thorough background checks, state child abuse registry, and continuous MVR monitoring',
      'Certified booster, 5-point harness, and ADA wheelchair securement checks',
      'Trauma-informed student de-escalation training for every driver',
    ],
    content: [
      'Before the first school bell rings each fall, every BuckledIn driver and vehicle undergoes our comprehensive annual recertification audit.',
      'Unlike standard rideshare platforms, our compliance framework is purpose-built for K-12 pupil transportation. Every driver completes multi-jurisdictional criminal and child welfare clearances, continuous motor vehicle record (MVR) tracking, drug screening, and specialized student care orientation.',
      'Each vehicle is inspected across 19 mechanical and safety checkpoints and outfitted with age-appropriate child safety restraints tailored to the assigned route.',
    ],
  },
  {
    id: 'nl-04',
    issueNumber: 'Issue #25',
    date: 'July 2026',
    readTime: '4 min read',
    category: 'Driver Spotlights',
    featured: false,
    title: 'From Beaverton to the Lehigh Valley: Celebrating Our 10-Year Driver Partners',
    excerpt:
      'Meet the retirees, former educators, and community champions who have found rewarding weekday routines driving consistent student routes with BuckledIn.',
    image: '/briefings/issue-25-driver-spotlights.jpg',
    author: 'David Vance — Chief Executive Officer',
    highlights: [
      'Predictable morning and afternoon weekday school bell hours',
      'Consistent student pairings that build lasting family trust',
      'Dedicated local dispatch support on every single trip',
    ],
    content: [
      'Since our founding in Beaverton, Oregon in 1997, our drivers have been the heart of everything we do. This month we honor 42 driver partners who recently crossed their 10-year milestone of safe student service.',
      'Many of our drivers are retired teachers, healthcare workers, and parents who value the predictability of morning and afternoon weekday school routes.',
      'Because drivers are matched with the same students throughout the school year, they become a reassuring, familiar part of each family’s daily routine.',
    ],
  },
  {
    id: 'nl-05',
    issueNumber: 'Issue #24',
    date: 'June 2026',
    readTime: '5 min read',
    category: 'Family & Guardian',
    featured: false,
    title: 'Supporting Neurodivergent Learners: Creating Calm, Sensory-Friendly School Commutes',
    excerpt:
      'How quiet cabins, consistent driver pairings, and personalized family intake profiles help students with autism and sensory sensitivities arrive at school ready to learn.',
    image: '/briefings/issue-24-sensory-friendly.png',
    author: 'Sarah Chen, M.Ed. — VP of District Partnerships',
    highlights: [
      'Customizable sensory preferences including quiet-cabin protocols',
      'Zero crowded bus aisles or unpredictable route changes',
      'Direct coordination between parents, IEP teams, and dispatchers',
    ],
    content: [
      'For many neurodivergent students, a noisy 60-passenger school bus can cause sensory overload before the school day even begins. A stressful morning commute directly impacts classroom readiness and emotional regulation.',
      'Through our Family & IEP Intake Protocol, guardians can specify sensory accommodations—from preferred cabin temperature and quiet-ride settings to step-by-step curb handoff routines.',
      'School psychologists across our partner districts report measurable improvements in morning attendance and first-period engagement when students transition to calm, consistent BuckledIn routes.',
    ],
  },
  {
    id: 'nl-06',
    issueNumber: 'Issue #23',
    date: 'May 2026',
    readTime: '3 min read',
    category: 'District Partnerships',
    featured: false,
    title: 'Assist Services to BuckledIn: 29 Years of Heritage Entering a New Era of Safety',
    excerpt:
      'Reflecting on our evolution from a single Oregon school district initiative in 1997 to a nationwide student mobility network delivering 2,000+ safe daily rides.',
    image: '/briefings/issue-23-heritage-rebrand.jpg',
    author: 'David Vance — Chief Executive Officer',
    highlights: [
      '29+ years of continuous pupil transit service since 1997',
      'Expanded presence across 10 states and 28+ major metro hubs',
      'Same foundational promise: keeping people first and every child safely buckled in',
    ],
    content: [
      'When we rebranded from Assist Services LLC to BuckledIn, our goal was simple: align our name directly with the uncompromising safety and compliance standards that have guided us since 1997.',
      'Today, as we serve over 500 schools, state child welfare agencies, and special education cooperatives nationwide, our mission remains unchanged—ensuring transportation is never a barrier to a child’s education.',
    ],
  },
];

const NEWSLETTER_CATEGORIES = [
  'All Editions',
  'District Partnerships',
  'Safety & Compliance',
  'Family & Guardian',
  'Driver Spotlights',
];

/* ─── Dual-Row Infinite Ribbon Marquee Partnerships Component ──────────────── */
function OrbitalPartnerships() {
  // Quadruple sets (2x per half) so -50% CSS marquee loop is wider than 4K screens & 100% seamless
  const programRibbon = [
    ...PROGRAM_PARTNERS,
    ...PROGRAM_PARTNERS,
    ...PROGRAM_PARTNERS,
    ...PROGRAM_PARTNERS,
  ];
  const industryRibbon = [
    ...INDUSTRY_PARTNERS,
    ...INDUSTRY_PARTNERS,
    ...INDUSTRY_PARTNERS,
    ...INDUSTRY_PARTNERS,
  ];

  return (
    <section
      id="partnerships"
      className="relative py-12 sm:py-16 md:py-24 bg-white overflow-hidden select-none scroll-mt-28 w-full"
    >
      {/* ── Centered Section Header ── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center mb-10 sm:mb-14">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200/80 text-xs font-bold text-brand-600 uppercase tracking-wider mb-3">
          <Building2 className="w-3.5 h-3.5" />
          <span>Trusted Nationwide</span>
        </div>
        <h2
          style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
          className="font-inktrap text-3xl sm:text-4xl md:text-5xl font-medium text-black tracking-tight leading-[1.12]"
        >
          District &amp; Community Partnerships.
        </h2>
        <p className="mt-3 text-sm sm:text-base md:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
          Collaborating with over 500+ school districts, special education cooperatives, state child welfare agencies, and national pupil transportation associations.
        </p>
      </div>

      {/* ── Dual-Row Full-Bleed Infinite Ribbon Marquee ── */}
      <div className="relative w-full space-y-4 sm:space-y-6 py-2">
        {/* Soft Frosted Edge Fades (Left & Right) */}
        <div
          className="absolute inset-y-0 left-0 w-16 sm:w-32 md:w-48 bg-gradient-to-r from-white via-white/90 to-transparent pointer-events-none z-20"
        />
        <div
          className="absolute inset-y-0 right-0 w-16 sm:w-32 md:w-48 bg-gradient-to-l from-white via-white/90 to-transparent pointer-events-none z-20"
        />

        {/* Row 1: State Agencies & Procurement Cooperatives (Scrolls Left) */}
        <div className="w-full overflow-hidden">
          <div className="flex w-max animate-marquee py-1.5">
            {programRibbon.map((p, idx) => (
              <div
                key={`prog-ribbon-${idx}`}
                className="group mr-4 sm:mr-5 bg-white hover:bg-slate-50/80 rounded-2xl border border-slate-200/90 hover:border-brand-300 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgba(0,99,206,0.12)] px-5 sm:px-6 py-3.5 sm:py-4 flex items-center space-x-4 shrink-0 transition-all duration-300 cursor-pointer"
              >
                <div className="w-24 sm:w-28 h-10 sm:h-12 flex items-center justify-center shrink-0">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="max-h-9 sm:max-h-11 w-auto max-w-[100px] sm:max-w-[115px] object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="border-l border-slate-200/80 pl-4 text-left">
                  <div className="text-xs sm:text-sm font-medium text-black group-hover:text-brand-600 transition-colors whitespace-nowrap">
                    {p.name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-normal whitespace-nowrap mt-0.5">
                    State &amp; District Program
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: National & State Pupil Transit Associations (Scrolls Right) */}
        <div className="w-full overflow-hidden">
          <div className="flex w-max animate-marquee-reverse py-1.5">
            {industryRibbon.map((p, idx) => (
              <div
                key={`ind-ribbon-${idx}`}
                className="group mr-4 sm:mr-5 bg-white hover:bg-slate-50/80 rounded-2xl border border-slate-200/90 hover:border-brand-300 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgba(0,99,206,0.12)] px-5 sm:px-6 py-3.5 sm:py-4 flex items-center space-x-4 shrink-0 transition-all duration-300 cursor-pointer"
              >
                <div className="w-24 sm:w-28 h-10 sm:h-12 flex items-center justify-center shrink-0">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="max-h-9 sm:max-h-11 w-auto max-w-[100px] sm:max-w-[115px] object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="border-l border-slate-200/80 pl-4 text-left">
                  <div className="text-xs sm:text-sm font-medium text-black group-hover:text-brand-600 transition-colors whitespace-nowrap">
                    {p.name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-normal whitespace-nowrap mt-0.5">
                    Industry Association
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const MAX_TEAM_TEXT_LENGTH = 150;

const teamMembers = [
  {
    name: 'David Vance',
    role: 'CEO',
    quote: 'Knowing thousands of vulnerable children arrive at school safely and ready to learn every morning is our greatest reward.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
    linkedin: 'https://www.linkedin.com/company/buckledin',
  },
  {
    name: 'Sarah Chen, M.Ed.',
    role: 'VP of Partnerships',
    quote: 'We aren’t just solving bus shortages—we build dependable daily lifelines for special education students and their families.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    linkedin: 'https://www.linkedin.com/company/buckledin',
  },
  {
    name: 'Marcus Ramirez',
    role: 'Chief Safety Officer',
    quote: 'Our multi-tier background audits and strict vehicle standards give parents complete peace of mind on every student route.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    linkedin: 'https://www.linkedin.com/company/buckledin',
  },
  {
    name: 'Elena Rostova',
    role: 'Head of Telematics',
    quote: 'Live GPS route tracking and instant parent alerts ensure school districts and families have total daily transparency.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
    linkedin: 'https://www.linkedin.com/company/buckledin',
  },
  {
    name: 'Jonathan Brooks',
    role: 'Driver Community Lead',
    quote: 'Empowering consistent, compassionate local drivers who truly get to know each student makes our culture unbeatable.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    linkedin: 'https://www.linkedin.com/company/buckledin',
  },
  {
    name: 'Amara Okafor',
    role: 'Special Needs Transit',
    quote: 'Every child deserves quiet, tailored, sensory-friendly rides—delivering that comfort every morning drives my heart.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    linkedin: 'https://www.linkedin.com/company/buckledin',
  },
  {
    name: 'Robert Sterling',
    role: 'VP of Fleet Ops',
    quote: 'Zero mechanical disruptions across our student transit networks is our non-negotiable benchmark in every state.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
    linkedin: 'https://www.linkedin.com/company/buckledin',
  },
  {
    name: 'Maya Patel, CPA',
    role: 'Chief Financial Officer',
    quote: 'Helping public school districts redirect transit savings back directly into classroom learning inspires me every day.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80',
    linkedin: 'https://www.linkedin.com/company/buckledin',
  },
  {
    name: 'Craig Washington',
    role: 'Regional Ops Director',
    quote: 'Connecting rural and urban districts through dependable routing has restored daily classroom attendance for hundreds.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    linkedin: 'https://www.linkedin.com/company/buckledin',
  },
  {
    name: 'Rachel Morales',
    role: 'Crisis Response Lead',
    quote: 'Being there within seconds whenever a parent, driver, or school coordinator needs real human support defines our team.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    linkedin: 'https://www.linkedin.com/company/buckledin',
  },
];

/* ─── Leadership Team Carousel Component ───────────────────────────────────── */
function LeadershipCarousel() {
  const carouselRef = useRef(null);
  const scrollPosRef = useRef(0);
  const [isPaused, setIsPaused] = useState(false);

  const loopedMembers = [...teamMembers, ...teamMembers];

  const getSingleSetWidth = () => {
    const el = carouselRef.current;
    if (!el || el.children.length <= teamMembers.length) return 0;
    return el.children[teamMembers.length].offsetLeft - el.children[0].offsetLeft;
  };

  // Continuous seamless infinite forward loop (pauses off-screen, on card hover/touch, or reduced motion)
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

  return (
    <section
      id="team"
      className="w-full mb-20 md:mb-28 scroll-mt-28 overflow-hidden"
    >
      {/* Header with Title and Left/Right Buttons (Aligned to max-w-7xl) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200/80 text-xs font-bold text-brand-600 uppercase tracking-wider mb-3">
              <Users className="w-3.5 h-3.5" />
              <span>The People Behind Every Safe Ride</span>
            </div>
            <h2
              style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
              className="font-inktrap text-3xl sm:text-4xl md:text-5xl font-medium text-black tracking-tight"
            >
              Leadership Team.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
              Experienced pupil transit directors, dispatch commanders, and student welfare specialists dedicated to keeping every child safely buckled in.
            </p>
          </div>

          {/* Carousel Navigation Buttons */}
          <div className="flex items-center gap-2 self-start md:self-end shrink-0">
            <button
              onClick={() => scroll('left')}
              aria-label="Previous leadership members"
              className="w-11 h-11 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-black shadow-xs active:scale-95 flex items-center justify-center transition-all duration-200 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Next leadership members"
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
          {loopedMembers.map((member, i) => {
            const maxQuoteLen = Math.max(0, MAX_TEAM_TEXT_LENGTH - member.role.length - 5);
            const displayQuote =
              member.quote.length > maxQuoteLen
                ? `${member.quote.slice(0, maxQuoteLen - 1).trimEnd()}…`
                : member.quote;

            return (
              <div
                key={i}
                onMouseEnter={pauseCarousel}
                onMouseLeave={resumeCarousel}
                onTouchStart={pauseCarousel}
                onTouchEnd={resumeCarousel}
                className="w-[235px] sm:w-[260px] md:w-[275px] shrink-0 h-[350px] sm:h-[380px] md:h-[395px] rounded-[26px] overflow-hidden relative shadow-md hover:shadow-xl transition-all duration-500 group snap-start border border-slate-200/80 flex flex-col justify-end"
              >
                {/* Full-bleed Portrait Headshot */}
                <img
                  src={member.image}
                  alt={member.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* ── Smooth Progressive Blur & Gradient Fade Layer ── */}
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
                  {/* Name + Verified Check Badge */}
                  <div className="flex items-center space-x-1.5">
                    <h3 className="text-base sm:text-lg font-medium text-white tracking-normal leading-snug truncate">
                      {member.name}
                    </h3>
                    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-white text-black shadow-xs shrink-0">
                      <Check className="w-2.5 h-2.5 text-brand-600 stroke-[2.5]" />
                    </span>
                  </div>

                  {/* Role & Statement (Capped at 150 characters max) */}
                  <p className="mt-1.5 text-xs text-white/80 font-normal leading-relaxed">
                    <span className="font-medium text-white">{member.role}</span> &mdash; &ldquo;{displayQuote}&rdquo;
                  </p>

                  {/* LinkedIn Pill Button */}
                  <div className="mt-3 flex items-center justify-end">
                    <a
                      href={member.linkedin || "https://www.linkedin.com/company/buckledin"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-white text-black hover:bg-slate-100 transition-all duration-200 text-[11px] font-medium shadow-sm cursor-pointer active:scale-95"
                      onClick={(e) => {
                        if (!member.linkedin) e.preventDefault();
                      }}
                    >
                      <LinkedInIcon className="w-3 h-3 text-[#0077b5]" />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Newsletters Sub-View Component ──────────────────────────────────────── */
function NewslettersTabView({ onBackToHome }) {
  const [selectedCategory, setSelectedCategory] = useState('All Editions');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeIssueModal, setActiveIssueModal] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const modalTimerRef = useRef(null);

  const handleOpenIssueModal = (issue) => {
    if (modalTimerRef.current) clearTimeout(modalTimerRef.current);
    setActiveIssueModal(issue);
    setIsModalVisible(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsModalVisible(true);
      });
    });
  };

  const handleCloseIssueModal = () => {
    setIsModalVisible(false);
    window.dispatchEvent(new CustomEvent('unlockNavbarCollapsed'));
    if (modalTimerRef.current) clearTimeout(modalTimerRef.current);
    modalTimerRef.current = setTimeout(() => {
      setActiveIssueModal(null);
    }, 550);
  };

  useEffect(() => {
    return () => {
      if (modalTimerRef.current) clearTimeout(modalTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleCloseIssueModal();
      }
    };
    if (activeIssueModal) {
      window.dispatchEvent(new CustomEvent('lockNavbarCollapsed'));
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.dispatchEvent(new CustomEvent('unlockNavbarCollapsed'));
      document.body.style.overflow = '';
    }
    return () => {
      window.dispatchEvent(new CustomEvent('unlockNavbarCollapsed'));
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIssueModal]);

  const filteredIssues = NEWSLETTER_ISSUES.filter((issue) => {
    const matchesCat =
      selectedCategory === 'All Editions' || issue.category === selectedCategory;
    const matchesQuery =
      searchQuery.trim() === '' ||
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-16">
      {/* 1. Editorial Briefings Grid (Clean White + Split Issue/Date + Photo + Dark Frosted Bar) */}
      <section className="w-full bg-[#F7F7F7] py-14 sm:py-20 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Filter Controls Toolbar (No Redundant Second Heading) */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
                {NEWSLETTER_CATEGORIES.map((cat) => {
                  const active = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-full text-xs transition-all duration-200 cursor-pointer ${
                        active
                          ? 'bg-[#121316] text-white font-medium'
                          : 'bg-white text-slate-600 hover:text-[#121316] border border-slate-200/80 font-normal'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              <div className="relative w-full sm:w-56">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search briefings..."
                  aria-label="Search briefings"
                  className="w-full bg-white border border-slate-200/90 text-xs text-black placeholder-slate-500 pl-8 pr-8 py-1.5 rounded-full focus:outline-none focus:ring-2 focus:ring-[#0267CE] focus:border-[#0267CE]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    aria-label="Clear search"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-black cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
          </div>

          {/* Crisp Architectural Grid With Top-Faded Column Separators (No Top Border on First Row) */}
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
            {/* Desktop 3-Column Vertical Separators (Fade In From Transparent at Top of First Row) */}
            <div
              className="hidden lg:block absolute left-1/3 top-0 bottom-0 w-px pointer-events-none z-20"
              style={{
                background:
                  'linear-gradient(to bottom, transparent 0%, rgba(15, 23, 42, 0.14) 22%, rgba(15, 23, 42, 0.14) 100%)',
              }}
            />
            <div
              className="hidden lg:block absolute left-2/3 top-0 bottom-0 w-px pointer-events-none z-20"
              style={{
                background:
                  'linear-gradient(to bottom, transparent 0%, rgba(15, 23, 42, 0.14) 22%, rgba(15, 23, 42, 0.14) 100%)',
              }}
            />
            {/* Tablet 2-Column Center Vertical Separator (Fades In at Top) */}
            <div
              className="hidden sm:block lg:hidden absolute left-1/2 top-0 bottom-0 w-px pointer-events-none z-20"
              style={{
                background:
                  'linear-gradient(to bottom, transparent 0%, rgba(15, 23, 42, 0.14) 22%, rgba(15, 23, 42, 0.14) 100%)',
              }}
            />

            {filteredIssues.map((issue, idx) => {
              const issueDigits = issue.issueNumber.replace(/\D/g, '') || '01';
              const [monthWord = 'Oct', yearNum = '2026'] = issue.date.split(' ');
              const monthPart1 = monthWord.slice(0, 3);
              const monthPart2 = monthWord.slice(3, 6);
              const monthPart3 = monthWord.slice(6);

              // Horizontal row separator only between rows (never on the top of row 1)
              const rowDividerClass = [
                idx >= 1 ? 'border-t border-slate-900/10' : 'border-t-0',
                idx >= 2 ? 'sm:border-t sm:border-slate-900/10' : 'sm:border-t-0',
                idx >= 3 ? 'lg:border-t lg:border-slate-900/10' : 'lg:border-t-0',
              ].join(' ');

              return (
                <article
                  key={issue.id}
                  onClick={() => handleOpenIssueModal(issue)}
                  className={`${rowDividerClass} bg-transparent hover:bg-white/80 transition-colors duration-300 flex flex-col justify-between group cursor-pointer overflow-hidden px-5 sm:px-6 lg:px-7 pb-6 sm:pb-7 ${
                    idx < 3 ? 'pt-4 sm:pt-5' : 'pt-6 sm:pt-7'
                  }`}
                >
                  {/* Upper Clean Surface */}
                  <div className="bg-white p-6 sm:p-7 flex flex-col justify-between min-h-[210px] space-y-6">
                    <div className="space-y-2">
                      <span className="inline-block text-[10px] font-mono uppercase tracking-[0.16em] text-[#0267CE] font-semibold">
                        {issue.category}
                      </span>
                      <h3 className="text-[15px] sm:text-base font-normal text-[#121316] leading-snug line-clamp-3 group-hover:text-[#0267CE] transition-colors">
                        {issue.title}
                      </h3>
                    </div>

                    {/* Signature Large Number + Stacked Month Lockup */}
                    <div className="flex items-center gap-2.5 pt-2">
                      <span className="text-4xl sm:text-[42px] font-normal text-[#121316] tracking-tight leading-none tabular-nums">
                        {issueDigits}
                      </span>
                      <div className="text-[10px] sm:text-[11px] leading-[1.1] text-slate-600 font-normal">
                        <div>{monthPart1}</div>
                        {monthPart2 && <div>{monthPart2}</div>}
                        <div>{monthPart3 || yearNum}</div>
                      </div>
                    </div>
                  </div>

                  {/* Lower Photo + Frosted Dark Action Bar */}
                  <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-200">
                    <img
                      src={issue.image}
                      alt={issue.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                    {/* Bottom Dark Frosted Action Bar */}
                    <div className="absolute inset-x-0 bottom-0 bg-[#18181B]/88 backdrop-blur-md text-white grid grid-cols-2 divide-x divide-white/15 border-t border-white/10">
                      <span className="py-3 text-center text-xs font-normal text-white/90 group-hover:text-white transition-colors">
                        {issue.readTime}
                      </span>
                      <span className="py-3 text-center text-xs font-medium text-white group-hover:bg-white/10 transition-colors">
                        Read issue
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {filteredIssues.length === 0 && (
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-12 text-center space-y-3">
            <Newspaper className="w-10 h-10 text-slate-400 mx-auto" />
            <h4 className="text-lg font-bold text-black">No newsletter issues match your filter</h4>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Try selecting &ldquo;All Editions&rdquo; or clearing your search query to browse our complete archive.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All Editions');
                setSearchQuery('');
              }}
              className="px-5 py-2 rounded-full bg-black text-white text-xs font-normal cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* ── Issue Reader Deep-Dive Modal (Matches Schools Page Dedicated Driver Model) ── */}
      {activeIssueModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeIssueModal.title}
          onClick={handleCloseIssueModal}
          className={`fixed inset-0 z-[90] flex items-start sm:items-center justify-center p-3 sm:p-6 pt-16 sm:pt-20 bg-black/60 backdrop-blur-md overflow-hidden ${
            isModalVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          style={{
            transition: 'opacity 780ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {/* Outer Modal Shell (Non-scrolling shell with fixed floating X button) */}
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative max-w-3xl w-full bg-white rounded-[2.5rem] shadow-2xl border border-slate-200/90 flex flex-col max-h-[82vh] sm:max-h-[85vh] overflow-hidden select-none text-left transform-gpu ${
              isModalVisible
                ? 'opacity-100 scale-100 translate-y-0'
                : 'opacity-0 scale-[0.88] translate-y-8'
            }`}
            style={{
              transition: 'all 780ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {/* Floating Persistent Close Button (Top Right — Stays anchored without scrolling up!) */}
            <button
              type="button"
              onClick={handleCloseIssueModal}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 z-30 w-10 h-10 rounded-full bg-slate-100/90 hover:bg-slate-200 text-slate-700 hover:text-black flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95 border border-slate-200/80 backdrop-blur-sm"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 stroke-[2.2]" />
            </button>

            {/* ── Inner Scrollable Content Area (no scrollbar) ── */}
            <div
              className="flex-1 overflow-y-auto no-scrollbar p-6 sm:p-9 md:p-10 pt-7 sm:pt-8"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {/* Hero Visual Image Banner */}
              {activeIssueModal.image && (
                <div className="relative w-full h-48 sm:h-64 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/90 mb-7 shadow-xs">
                  <img
                    src={activeIssueModal.image}
                    alt={activeIssueModal.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-xs font-semibold text-white bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
                      {activeIssueModal.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-white/90 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
                      {activeIssueModal.issueNumber}
                    </span>
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="pr-2 space-y-3 mb-8">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-50 border border-brand-100 text-xs font-bold text-brand-600 uppercase tracking-wider">
                  <Newspaper className="w-3.5 h-3.5" />
                  <span>{activeIssueModal.category} • {activeIssueModal.issueNumber}</span>
                </div>
                <h3
                  style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
                  className="text-2xl sm:text-3xl md:text-4xl font-medium text-black tracking-tight leading-tight"
                >
                  {activeIssueModal.title}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500 pt-1">
                  <span className="text-slate-900 font-semibold">By {activeIssueModal.author}</span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{activeIssueModal.date}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{activeIssueModal.readTime}</span>
                  </span>
                  <span>•</span>
                  <span className="text-slate-400">BuckledIn Press &amp; Research</span>
                </div>
              </div>

              {/* Key Takeaways Card */}
              {activeIssueModal.highlights && activeIssueModal.highlights.length > 0 && (
                <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 sm:p-6 mb-8 space-y-3">
                  <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-brand-600">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Key Takeaways &amp; Executive Summary</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2.5 pt-1">
                    {activeIssueModal.highlights.map((h, i) => (
                      <div key={i} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-600 mt-2 shrink-0" />
                        <span className="leading-relaxed">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Article Content Paragraphs */}
              <div className="space-y-4 mb-8">
                {activeIssueModal.content.map((para, idx) => (
                  <p key={idx} className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                    {para}
                  </p>
                ))}
              </div>

              {/* Bottom Action Footer */}
              <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleCloseIssueModal}
                  className="px-6 py-2.5 rounded-full bg-black hover:bg-neutral-800 text-white text-xs sm:text-sm font-normal cursor-pointer transition-all active:scale-95 shadow-sm"
                >
                  Close Article
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleCloseIssueModal();
                    if (onBackToHome) onBackToHome();
                  }}
                  className="text-xs font-normal text-brand-600 hover:text-brand-700 hover:underline cursor-pointer"
                >
                  Return to Homepage
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Main Component ──────────────────────────────────────────────────────── */
export default function AboutPage({ onBackToHome, initialTab = 'who-we-are', onTabChange }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  const heroTabs = [
    { id: 'who-we-are', label: 'Who We Are' },
    { id: 'careers', label: 'Careers' },
    { id: 'newsletters', label: 'Briefings' },
  ];

  const heroTabContent = {
    'who-we-are': {
      badge: 'About BuckledIn',
      title: (
        <>
          Our Ride: <span className="text-brand-600">29+ Years</span> of Safe Student Transit.
        </>
      ),
      subtitle:
        'From a local initiative in Beaverton, Oregon in 1997 to a trusted nationwide student transit partner providing thousands of safe rides every single day.',
    },
    careers: {
      badge: 'Join Our Mission',
      title: (
        <>
          Careers With <span className="text-brand-600">Real Purpose</span>.
        </>
      ),
      subtitle:
        'Whether you’re behind the wheel delivering consistent morning rides or orchestrating live student telematics in our dispatch center, you make a lasting impact on children’s educational journeys every single day.',
    },
    newsletters: {
      badge: 'District Insights & Research',
      title: (
        <>
          Monthly <span className="text-brand-600">District Dispatches</span> & Research.
        </>
      ),
      subtitle:
        'Stay ahead of student transit policy, fleet compliance, and pupil safety innovations with monthly briefings published by our research and operations team.',
    },
  };

  const currentTabMeta = heroTabContent[activeTab] || heroTabContent['who-we-are'];

  return (
    <div className="min-h-screen bg-white text-black pt-28 pb-20">

      {/* ── Hero Header with Sub-Navigation Tabs & Dynamic Typography ────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 sm:mb-14">
        {/* Top Context Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-brand-600 uppercase tracking-wider mb-5 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{currentTabMeta.badge}</span>
        </div>

        {/* ── Pill-Shaped Hero Tabs (Positioned above headline: Y-position is 100% constant, zero jumping) ── */}
        <div className="flex justify-center mb-8">
          <div
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5"
            role="tablist"
            aria-label="About page sections"
          >
            {heroTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleSelectTab(tab.id)}
                  className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-colors duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-black text-white shadow-xs'
                      : 'bg-neutral-100 text-neutral-500 hover:text-neutral-800 hover:bg-neutral-200/80'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Dynamic Hero Headline & Subtitle (Per-tab typography in Whyte Inktrap) ── */}
        <div className="max-w-4xl mx-auto">
          <h1
            style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
            className="font-inktrap text-4xl sm:text-5xl md:text-6xl font-medium text-black tracking-tight leading-tight max-w-4xl mx-auto"
          >
            {currentTabMeta.title}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-700 font-medium max-w-2xl mx-auto leading-relaxed">
            {currentTabMeta.subtitle}
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          TAB 1: WHO WE ARE
      ════════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'who-we-are' && (
        <>
          {/* Animated 29-Year Transit Highway Journey */}
          <StoryRoadmap />

          {/* ── Mission & Vision Section ── */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Mission Card */}
              <div className="bg-slate-50/80 hover:bg-white rounded-[2rem] border border-slate-200/90 p-7 sm:p-9 transition-all duration-300 shadow-2xs hover:shadow-xl flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-center text-brand-600 group-hover:bg-brand-600 group-hover:text-white group-hover:border-brand-600 transition-colors duration-300">
                      <Target className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
                      Our Guiding Purpose
                    </span>
                  </div>
                  <h3
                    style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
                    className="text-2xl sm:text-3xl font-medium text-black tracking-tight"
                  >
                    Our Mission
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                    To deliver safe, dependable, and specialized pupil transportation that gives school districts complete peace of mind—ensuring every student, regardless of learning accommodation or circumstance, arrives at school calm, supported, and ready to learn.
                  </p>
                </div>
                <div className="pt-6 border-t border-slate-200/80 mt-6 flex items-center space-x-2 text-xs font-semibold text-brand-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
                  <span>Consistency First Standard of Care</span>
                </div>
              </div>

              {/* Vision Card */}
              <div className="bg-slate-50/80 hover:bg-white rounded-[2rem] border border-slate-200/90 p-7 sm:p-9 transition-all duration-300 shadow-2xs hover:shadow-xl flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-center text-brand-600 group-hover:bg-black group-hover:text-white group-hover:border-black transition-colors duration-300">
                      <Compass className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                      The Road Ahead
                    </span>
                  </div>
                  <h3
                    style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
                    className="text-2xl sm:text-3xl font-medium text-black tracking-tight"
                  >
                    Our Vision
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                    To set the national benchmark for modern pupil transit through dedicated professional drivers, real-time safety telemetry, and compassionate human-first coordination across every school district in America.
                  </p>
                </div>
                <div className="pt-6 border-t border-slate-200/80 mt-6 flex items-center space-x-2 text-xs font-semibold text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Nationwide Student Transit Network</span>
                </div>
              </div>
            </div>
          </section>

          {/* Key Numbers */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 md:mb-24">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { num: '29+',   label: 'Years of Proven Service', sub: 'Safely operating since 1997' },
                { num: '2,000+',label: 'Daily Student Rides',     sub: 'Doorstep to school bells' },
                { num: '500+',  label: 'Schools & Districts',     sub: 'Nationwide network partners' },
                { num: 'Verified', label: 'Vetted Drivers',          sub: 'Safety & background cleared' },
              ].map((s, i) => (
                <div key={i} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 text-center shadow-sm">
                  <div className="text-3xl sm:text-5xl font-extrabold text-brand-600">{s.num}</div>
                  <div className="text-sm font-bold text-slate-800 mt-2">{s.label}</div>
                  <p className="text-xs text-slate-500 mt-1">{s.sub}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Dual Orbital Partnerships System (Clockwise inner, Anti-clockwise outer) ── */}
          <OrbitalPartnerships />

          {/* Places We Operate */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 sm:mb-18 md:mb-24">
            <PlacesWeOperate />
          </section>

          {/* Team Leadership Carousel */}
          <LeadershipCarousel />

          {/* Bottom CTA */}
          <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-black rounded-[2.5rem] p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <h3
                  style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
                  className="font-inktrap text-2xl sm:text-3xl font-medium tracking-tight"
                >
                  Ready to collaborate with BuckledIn?
                </h3>
                <p className="text-sm text-slate-300 font-medium max-w-xl">
                  Explore open driver and operations roles, read our monthly district dispatches, or return to the homepage.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => {
                    handleSelectTab('careers');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3 rounded-full font-normal text-white bg-brand-600 hover:bg-brand-500 shadow-md transition-all active:scale-95 cursor-pointer text-sm"
                >
                  Explore Careers
                </button>
                <button
                  onClick={onBackToHome}
                  className="px-6 py-3 rounded-full font-normal text-black bg-white hover:bg-slate-100 shadow-md transition-all active:scale-95 cursor-pointer text-sm"
                >
                  Return to Homepage
                </button>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ════════════════════════════════════════════════════════════════════════
          TAB 2: CAREERS (Embedded Careers View)
      ════════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'careers' && (
        <CareersPage onBackToHome={onBackToHome} embedded={true} />
      )}

      {/* ════════════════════════════════════════════════════════════════════════
          TAB 3: NEWSLETTERS
      ════════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'newsletters' && (
        <NewslettersTabView onBackToHome={onBackToHome} />
      )}

    </div>
  );
}
