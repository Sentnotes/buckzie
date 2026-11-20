import React, { useState, useRef, useEffect } from 'react';
import {
  School,
  ShieldCheck,
  CheckCircle2,
  FileCheck2,
  MapPin,
  Clock,
  Users,
  BarChart3,
  PhoneCall,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Plus,
  Building2,
  ArrowLeft,
  ArrowRight,
  HeartHandshake,
  Lock,
  Activity,
  X,
  Check,
  Award,
  TrendingUp,
  UserCheck,
  Car,
  AlertCircle
} from 'lucide-react';

const consistencyPillars = [
  {
    num: '01',
    title: 'Dedicated Driver Model',
    tag: 'W-2 Employees',
    icon: Users,
    hasDeepDive: true,
    actionText: 'Explore W-2 Model Breakdown',
    image: '/schools/employment.jpg',
    description:
      'BuckledIn drivers are W-2 employees – not subcontractors. We pair students with a consistent driver, helping build familiarity, trust, and routine.'
  },
  {
    num: '02',
    title: 'Reliable Service Experience',
    tag: 'On-Time Fulfillment',
    icon: Clock,
    hasDeepDive: true,
    actionText: 'Explore Reliability Standards',
    image: '/schools/reliableservice.jpg',
    description:
      'Dependable fulfillment and on-time performance to help districts get students where they need to go – safely and on time.'
  },
  {
    num: '03',
    title: 'People-First Support',
    tag: 'Dedicated Extension',
    icon: HeartHandshake,
    hasDeepDive: true,
    actionText: 'Explore Support Network',
    image: '/schools/home-office-coordinator.jpg',
    description:
      'From daily coordination to issue resolution, our dedicated operations team works as an extension of your district – providing proactive support and a single point of contact when you need it most.'
  },
  {
    num: '04',
    title: 'Connected Technology & Live Tracking',
    tag: 'Tracking & Efficiency',
    icon: Activity,
    hasDeepDive: true,
    actionText: 'Inspect Tracking & Telematics',
    image: '/howweworkFamilies/GuardianPortalAccess.jpg',
    description:
      'Our connected technology experience combines mobile apps, web-based portals, and live GPS tracking that keep districts, families, and drivers informed every step of the way.'
  },
  {
    num: '05',
    title: 'Ongoing Compliance Monitoring',
    tag: 'Continuous Audits',
    icon: ShieldCheck,
    hasDeepDive: true,
    actionText: 'Review Compliance Protocol',
    image: '/schools/compliance-monitoring.jpg',
    description:
      'Safety doesn’t stop after hiring. We continuously monitor the background checks and motor vehicle records to maintain ongoing compliance of every driver.'
  }
];

const pillarDeepDives = {
  '01': {
    badge: 'Pillar 01 • Dedicated Driver Model',
    icon: Users,
    heroImage: '/schools/employment.jpg',
    heroImageAlt: 'Dedicated School Driver greeting student',
    heroBadge: 'W-2 Dedicated Fleet',
    title: 'Why Direct W-2 Employment Changes Everything for K–12 Districts.',
    subtitle: 'Students with special needs, autism, trauma, or McKinney-Vento circumstances rely on routine and familiar faces. Here is our rigorous 4-stage driver qualification and route pairing pipeline.',
    metrics: [
      { value: '98.4%', label: 'Daily Driver Consistency', desc: 'Same trusted driver each day', color: 'text-brand-600' },
      { value: 'W-2', label: 'Direct Employees', desc: 'Payroll staff, zero subcontractors', color: 'text-black' },
      { value: '-42%', label: 'Morning Anxiety Drop', desc: 'Students arrive calm & ready to learn', color: 'text-emerald-600' }
    ],
    sectionTitle: '4-Stage Driver Vetting & Route Pairing Pipeline',
    sectionSubtitle: 'How we screen, orient, and pair drivers for reliable student transportation.',
    capabilities: [
      {
        step: '01',
        title: 'Multi-Jurisdictional Clearances',
        desc: 'Thorough criminal background checks, child abuse registry checks, and motor vehicle record reviews.',
        tag: 'Background Cleared',
        icon: ShieldCheck
      },
      {
        step: '02',
        title: 'Student Safety & Restraint Orientation',
        desc: 'Drivers complete safety orientation covering student pickup/drop-off procedures, supportive communication, and proper child safety equipment placement.',
        tag: 'Safety Orientation',
        icon: Award
      },
      {
        step: '03',
        title: 'Vehicle Readiness & Dispatch Protocol',
        desc: 'Vehicles meet inspection standards with required safety equipment onboard, and drivers follow clear incident escalation protocols with our dispatch team.',
        tag: 'Vehicle Readiness',
        icon: HeartHandshake
      },
      {
        step: '04',
        title: 'Consistent Route & Family Pairing',
        desc: 'We prioritize matching families with a consistent primary driver to build familiar routines. When a substitute driver is needed, parents and districts are notified in advance.',
        tag: 'Consistent Driver',
        icon: Users
      }
    ],
    verificationCard: {
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
      name: 'Craig Washington',
      role: 'Regional Operations Director • District Fleet & Route Oversight',
      details: 'W-2 Fleet Operations • Safety Vetting & Route Pairing',
      badgeText: 'OPERATIONS LEADERSHIP'
    }
  },
  '02': {
    badge: 'Pillar 02 • Reliable Service Experience',
    icon: Clock,
    heroImage: '/schools/reliableservice.jpg',
    heroImageAlt: 'Students arriving safely at school entrance on time',
    heroBadge: 'High-Reliability Fleet',
    title: 'Dependable On-Time Bell Fulfillment With Standby Backup Fleets.',
    subtitle: 'A single missed ride disrupts an entire instructional day. BuckledIn delivers multi-tiered route redundancy, traffic predictive dispatch, and regional reserve fleets to safeguard route fulfillment.',
    metrics: [
      { value: '99.2%', label: 'On-Time Bell Arrival', desc: 'Across all high-need routes', color: 'text-brand-600' },
      { value: '< 12m', label: 'Proactive Alert Window', desc: 'Advance ETA notice to staff & parents', color: 'text-black' },
      { value: '0.02%', label: 'Route Miss Rate', desc: '50x below pupil transit averages', color: 'text-emerald-600' }
    ],
    sectionTitle: 'The 3-Tier Route Redundancy & Fulfillment Protocol',
    sectionSubtitle: 'Operational mechanisms engineered to ensure dependable student pickups and on-time bell arrivals.',
    capabilities: [
      {
        step: '01',
        title: 'Pre-Trip Driver Check-In',
        desc: 'Drivers are asked to log in at least 20 minutes before starting their route so dispatch can confirm readiness and monitor route conditions.',
        tag: 'Early Verification',
        icon: Clock
      },
      {
        step: '02',
        title: 'Pre-Staged Regional Standby Drivers',
        desc: 'Dedicated reserve drivers staged in every regional zone, ready to roll promptly if an assigned driver experiences a vehicle flat or sudden illness.',
        tag: 'Standby Reserve',
        icon: Car
      },
      {
        step: '03',
        title: 'School Arrival & Drop-Off Confirmation',
        desc: 'Drivers log arrival and drop-off updates through the Driver App, giving schools and families clear visibility when a student reaches campus.',
        tag: 'Verified Drop-Off',
        icon: CheckCircle2
      }
    ],
    verificationCard: {
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      name: 'Elena Vance',
      role: 'Regional Operations Hub • Route Fulfillment Commander',
      details: 'Live Route Monitor Active • Verified Student Hand-off Protocol',
      badgeText: 'DISPATCH CERTIFIED #9021'
    }
  },
  '03': {
    badge: 'Pillar 03 • People-First Support',
    icon: HeartHandshake,
    heroImage: '/schools/home-office-coordinator.jpg',
    heroImageAlt: 'Regional transportation coordinator working from a home office',
    heroBadge: 'Live Support During School Hours',
    title: 'A Dedicated Extension Of Your District Transportation Office.',
    subtitle: 'Transportation directors have direct phone lines and communication channels to assigned regional coordinators who know your schools, staff, and bell times by name.',
    metrics: [
      { value: '< 25s', label: 'Average Call Answer', desc: 'Direct live human response', color: 'text-brand-600' },
      { value: 'Direct', label: 'District Support', desc: 'Knows your district routes & schedules', color: 'text-black' },
      { value: '6AM–6PM', label: 'Safety Operations Center', desc: 'Staffed throughout active school hours', color: 'text-emerald-600' }
    ],
    sectionTitle: 'Dedicated District Operations Pod Structure',
    sectionSubtitle: 'How our operational support integrates seamlessly with district transportation staff.',
    capabilities: [
      {
        step: '01',
        title: 'Dedicated District Account Support',
        desc: 'A dedicated point of contact for your district to handle route adjustments, roster onboarding, IEP schedule coordination, and billing questions.',
        tag: 'Dedicated Liaison',
        icon: Users
      },
      {
        step: '02',
        title: 'School-Hours Live Human Dispatch',
        desc: 'Live dispatchers actively monitoring every vehicle. Calls are answered promptly by coordinators who communicate directly with all drivers and parents—bringing comfort and certainty to every ride.',
        tag: 'Instant Phone Line',
        icon: PhoneCall
      },
      {
        step: '03',
        title: 'Bilingual Family Liaison Team',
        desc: 'Dedicated bilingual support providing families with clear communication, direct text notifications, and live phone updates throughout the school day.',
        tag: 'Parent Reassurance',
        icon: HeartHandshake
      }
    ],
    verificationCard: {
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
      name: 'Sarah Jenkins',
      role: 'Senior District Operations Director • Great Lakes Region',
      details: 'Direct Line: (800) 514-0892 • Pupil Transportation Certified (NAPT)',
      badgeText: 'OPS COMMAND #0114'
    }
  },
  '04': {
    badge: 'Pillar 04 • Connected Technology & Tracking',
    icon: Activity,
    heroImage: '/howweworkFamilies/GuardianPortalAccess.jpg',
    heroImageAlt: 'BuckledIn Real-Time GPS Tracking Dashboard and Telematics',
    heroBadge: 'Live GPS Telemetry & Route Tracking',
    title: 'Enterprise Visibility & Real-Time Telemetry Built For Schools.',
    subtitle: 'Our connected technology suite provides turn-by-turn GPS telemetry, in-vehicle cameras, and automated parent arrival notifications to deliver complete operational transparency and route efficiency.',
    metrics: [
      { value: '1-Sec', label: 'Live GPS Polling', desc: 'Smooth turn-by-turn tracking', color: 'text-brand-600' },
      { value: 'Equipped', label: 'In-Vehicle Cameras', desc: 'Video & audio trip visibility', color: 'text-black' },
      { value: 'Live', label: 'Route Updates', desc: 'Pickup & arrival visibility', color: 'text-emerald-600' }
    ],
    sectionTitle: 'Connected Safety Tech & Telematics Architecture',
    sectionSubtitle: 'Hardware, routing efficiency, and software built specifically for district transit standards.',
    capabilities: [
      {
        step: '01',
        title: 'District Command Telemetry Portal',
        desc: 'Transportation directors view all district vehicles simultaneously on a live digital map with route replay, arrival timestamps, and speed telemetry.',
        tag: 'District Command',
        icon: MapPin
      },
      {
        step: '02',
        title: 'In-Vehicle Safety Cameras & Telemetry',
        desc: 'Connected dashcams and GPS telematics provide clear trip visibility, route efficiency insights, and real-time safety alerts.',
        tag: 'Connected Dashcams',
        icon: Sparkles
      },
      {
        step: '03',
        title: 'Guardian Live Mobile Tracking App',
        desc: 'Parents watch their child’s vehicle navigate in real time, view live ETA updates, and receive automated notifications at pickup and drop-off.',
        tag: 'Guardian Visibility',
        icon: Activity
      },
      {
        step: '04',
        title: 'School Calendar & Route Schedule Coordination',
        desc: 'We keep rides accurately updated based on school calendars, bell schedule adjustments, address changes, and student transport requirements.',
        tag: 'Schedule Coordination',
        icon: FileCheck2
      }
    ],
    verificationCard: {
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      name: 'Telemetry Fleet Server',
      role: 'Encrypted GPS Stream • 256-bit AES FERPA Compliant',
      details: 'SOC-2 Type II Certified • Child Privacy Protected • Real-Time Alert Engine',
      badgeText: 'SECURITY SEAL #FERPA-99'
    }
  },
  '05': {
    badge: 'Pillar 05 • Ongoing Compliance Monitoring',
    icon: ShieldCheck,
    heroImage: '/schools/compliance-monitoring.jpg',
    heroImageAlt: 'Compliance specialist reviewing safety and driver records on a desktop PC',
    heroBadge: 'Ongoing Compliance Audits',
    title: 'Safety Does Not Stop At Hiring: Continuous Multi-Audit Protocol.',
    subtitle: 'Safety requires ongoing vigilance. BuckledIn performs thorough background checks, DMV license monitoring, and periodic mechanical vehicle audits to maintain rigorous regulatory compliance.',
    metrics: [
      { value: '6AM–6PM', label: 'Active Route Oversight', desc: 'Live safety monitoring during school hours', color: 'text-brand-600' },
      { value: 'Vetted', label: 'Thorough Background Checks', desc: 'Multi-jurisdictional screening', color: 'text-black' },
      { value: '19-Point', label: 'Vehicle Inspection', desc: 'Certified mechanical safety audits', color: 'text-emerald-600' }
    ],
    sectionTitle: 'Continuous Safety Oversight & Audit Checklist',
    sectionSubtitle: 'Daily automated checks and recurring certifications that keep pupil transit safe.',
    capabilities: [
      {
        step: '01',
        title: 'Real-Time DMV Motor Vehicle Record Pulse',
        desc: 'Continuous digital connection to state DMVs. Any ticket, suspension, or violation instantly flags the driver and automatically locks their dispatch access.',
        tag: 'Daily DMV Check',
        icon: ShieldCheck
      },
      {
        step: '02',
        title: 'Random Drug & Alcohol Testing Protocols',
        desc: 'Quarterly randomized testing compliant with DOT and state transit regulations, managed by certified third-party medical laboratory partners.',
        tag: 'Zero-Tolerance',
        icon: Lock
      },
      {
        step: '03',
        title: '19-Point Certified Mechanic Vehicle Inspections',
        desc: 'Vehicles must undergo comprehensive periodic 19-point mechanical audits by ASE-certified mechanics covering brakes, tires, steering, and LATCH child anchors.',
        tag: '19-Point Inspection',
        icon: CheckCircle2
      },
      {
        step: '04',
        title: 'Annual Criminal & Child Welfare Re-Checks',
        desc: 'Annual recertification through thorough background checks and state child abuse registries to ensure uninterrupted eligibility for pupil transit.',
        tag: 'Annual Re-Check',
        icon: FileCheck2
      }
    ],
    verificationCard: {
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
      name: 'David Sterling',
      role: 'Pupil Transit Safety Board • Compliance Verification Officer',
      details: 'Background Check Cleared • Child Abuse Registry Cleared • DOT Zero-Tolerance',
      badgeText: 'COMPLIANCE AUDIT #2026-OK'
    }
  }
};


const implementationSteps = [
  {
    step: '1',
    category: 'Discovery & Contracting',
    title: 'District Scope & Cooperative Onboarding',
    description:
      'We review your high-need routes, IEP/McKinney-Vento rosters, and compliance requirements. Districts can onboard rapidly through existing cooperative purchasing contracts or direct service agreements.',
    tag: 'Fast Procurement',
    image:
      'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=900&q=80',
    imageBadge: 'Cooperative & Piggyback Ready',
    imageBadgeIcon: FileCheck2,
    details:
      'We support cooperative purchasing vehicles (including Mohave, Sourcewell, and state IU contracts) to streamline school board approval.'
  },
  {
    step: '2',
    category: 'Roster & Driver Pairing',
    title: 'Custom Routing & Vetted Driver Match',
    description:
      'Your transportation team submits student ride requests via our secure portal or direct roster coordination. We match each student with a dedicated, background-cleared driver prepared for their specific accommodations.',
    tag: 'Multi-Level Vetted',
    image:
      'https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=900&q=80',
    imageBadge: 'Thoroughly Background Checked',
    imageBadgeIcon: ShieldCheck,
    details:
      'Every driver undergoes a thorough background check, continuous MVR monitoring, drug screening, and specialized student care certification.'
  },
  {
    step: '3',
    category: 'Live District Command',
    title: 'Real-Time Dispatch & Guardian Sync',
    description:
      'Before the first pickup, both district coordinators and parents receive route details and live GPS tracking access to monitor every morning and afternoon bell arrival.',
    tag: 'Live Telemetry',
    image:
      'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=900&q=80',
    imageBadge: 'Live District & Parent Dashboards',
    imageBadgeIcon: Activity,
    details:
      'District transportation directors gain a single pane of glass showing live vehicle locations, boarding timestamps, and proactive delay alerts.'
  },
  {
    step: '4',
    category: 'Reporting & Audits',
    title: 'Automated Compliance & Billing Logs',
    description:
      'Receive itemized monthly trip logs, mileage splits for inter-district McKinney-Vento cost-sharing, and audit-ready documentation for state and federal Medicaid/IDEA reimbursement.',
    tag: 'Audit-Ready',
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80',
    imageBadge: 'IDEA & Medicaid Reimbursement Ready',
    imageBadgeIcon: BarChart3,
    details:
      'Export route-level attendance, timestamps, and driver credentials in one click for state department of education audits.'
  }
];

const districtFaqs = [
  {
    q: 'How many students can ride per vehicle?',
    a: 'We can typically accommodate between 3 – 7 students in a vehicle, depending on the size of the vehicle, any special equipment needs, and rider size and age.'
  },
  {
    q: 'Can you provide transportation for special needs students?',
    a: 'We do provide transportation for students with special needs including but not limited to: visual or hearing impairments, special medical requirements, autism, and behavioral disorders.'
  },
  {
    q: 'Do you require that districts share the IEP for students we work with?',
    a: 'No, we do not require the school to send us the entire document, but we do ask about it and make sure we are doing everything we can to meet the student’s transportation needs.'
  },
  {
    q: 'Do you provide safety equipment?',
    a: 'We ensure that any required equipment, including car seats, booster seats, or safety vests are in place prior to each ride. Our drivers keep the safety equipment in the car with them, so it doesn’t need to be brought into the schools each day.'
  },
  {
    q: 'Are there cameras in the vehicles?',
    a: 'Yes, we have cameras in every vehicle, on every ride, for no additional cost. Cameras record both video and in-car audio adding another layer of safety and visibility to every ride.'
  },
  {
    q: 'How do you monitor your drivers?',
    a: 'Driver location is monitored through our Driver app. Our dashcam and GPS telematics platform provides insights on safety events, tracking efficiency, and driver behavior in real time. In addition we continuously monitor background and motor vehicle records throughout a driver’s employment – not just at time of hiring. This allows us to identify changes that may affect a driver’s eligibility and address compliance concerns as they occur.'
  },
  {
    q: 'Can I know in real-time what arrival and pick-up times are?',
    a: 'Yes, all rides can be seen in real-time on our District Portal. From a single dashboard, staff can quickly access trip details, student information, ride status, and reporting – all in one place. Parents and guardians can access the same information for their students through our Parent App.'
  },
  {
    q: 'Do you have substitute drivers available to fill in when needed?',
    a: 'We maintain a pool of drivers that are on-call to fill in for driver absences or other unforeseen events. This allows us to maintain consistent service for students without delays. If we need to use a substitute driver, we’ll send an automatic communication to the district and to the family. Substitute drivers meet the same hiring, training, and compliance standards as primary drivers.'
  },
  {
    q: 'Do you require a minimum number of guaranteed rides?',
    a: 'We do not have a requirement for a minimum number of rides. We serve student populations where the need for support often changes, and we are flexible to support the needs of our school partners and their families.'
  }
];

export default function SchoolsPage({ onBackToHome }) {
  const [openFaq, setOpenFaq] = useState(null);
  const [activePartnershipStep, setActivePartnershipStep] = useState(0);
  const [activePillarModal, setActivePillarModal] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [consultationSubmitted, setConsultationSubmitted] = useState(false);
  const modalTimerRef = useRef(null);

  const handleOpenModal = (pillar) => {
    if (modalTimerRef.current) clearTimeout(modalTimerRef.current);
    setActivePillarModal(pillar);
    setIsModalVisible(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsModalVisible(true);
      });
    });
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    window.dispatchEvent(new CustomEvent('unlockNavbarCollapsed'));
    if (modalTimerRef.current) clearTimeout(modalTimerRef.current);
    modalTimerRef.current = setTimeout(() => {
      setActivePillarModal(null);
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
        handleCloseModal();
      }
    };
    if (activePillarModal) {
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
  }, [activePillarModal]);

  return (
    <div className="min-h-screen bg-white text-black pb-24">
      {/* ── 1. Hero Header Section ────────────────────────────────────────── */}
      <section className="w-full home-dot-grid pt-36 sm:pt-40 pb-12 lg:pb-16 mb-12 lg:mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Hero Copy */}
          <div className="lg:col-span-7 space-y-7">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-medium text-brand-600 uppercase tracking-wider shadow-2xs">
              <School className="w-3.5 h-3.5" />
              <span>Alternative Student Transportation</span>
            </div>

            <h1
              style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
              className="text-4xl sm:text-5xl md:text-6xl xl:text-[4.25rem] font-medium text-black tracking-tight leading-[1.08]"
            >
              Dependable Alternative Student Transit for <span className="text-brand-600">Every District.</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-700 font-normal leading-relaxed max-w-2xl">
              We partner with public school districts, special education cooperatives, and county offices of education to solve bus driver shortages and safely transport students with IEPs, McKinney-Vento status, and out-of-district placements.
            </p>

            {/* Key District Metrics */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 text-left">
                <div className="text-2xl sm:text-3xl font-semibold text-brand-600">500+</div>
                <div className="text-xs sm:text-sm font-medium text-slate-600 mt-1">Partner Districts</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 text-left">
                <div className="text-2xl sm:text-3xl font-semibold text-black">99.4%</div>
                <div className="text-xs sm:text-sm font-medium text-slate-600 mt-1">On-Time Bell Arrival</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 text-left">
                <div className="text-2xl sm:text-3xl font-semibold text-black">48–72h</div>
                <div className="text-xs sm:text-sm font-medium text-slate-600 mt-1">Rapid Route Launch</div>
              </div>
            </div>

            {/* Hero CTA Row */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#district-inquiry"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-black hover:bg-brand-600 text-white text-sm font-normal transition-all duration-200 shadow-sm cursor-pointer active:scale-95"
              >
                <span>Request a District Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#consistency-first"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-normal transition-all duration-200 cursor-pointer"
              >
                <span>Our Operating Model</span>
              </a>
            </div>
          </div>

          {/* Right Hero Visual */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-lg rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-xl bg-slate-100">
              <img
                src="/schools/(IEP).png"
                alt="BuckledIn specialized student transportation for school districts"
                className="w-full h-[420px] sm:h-[480px] object-cover block select-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex items-end p-6 sm:p-8">
                <div className="text-white space-y-2">
                  <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand-600 text-[11px] font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>IDEA • ESSA • McKinney-Vento Compliant</span>
                  </span>
                  <h3 className="text-xl sm:text-2xl font-medium tracking-tight">
                    Built for High-Need &amp; Specialized Routes
                  </h3>
                  <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                    Every route is paired with a consistent, background-cleared driver and monitored live by our dispatch command center during school hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* ── 2. Consistency First Operating Model Section ──────────────────── */}
      <section id="consistency-first" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28 scroll-mt-28">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-600 mb-3">
            Consistency First Operating Model
          </p>
          <h2
            style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
            className="text-3xl sm:text-4xl md:text-5xl font-medium text-black tracking-tight leading-[1.12]"
          >
            Different students. Different needs.
            <br />
            <span className="text-brand-600">One consistent standard.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Our Consistency First operating model is our commitment to delivering safe, dependable transportation through a people-first technology enabled experience.
          </p>
        </div>

        {/* 5 Pillars Grid: 3 on top row, 2 centered/spanning on bottom row */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {consistencyPillars.map((pillar, idx) => {
            const PillarIcon = pillar.icon;
            // First 3 cards take 2 columns each (3 across on md+), last 2 cards take 3 columns each (2 across on md+)
            const colSpanClass = idx < 3 ? 'md:col-span-2' : 'md:col-span-3';

            return (
              <div
                key={pillar.num}
                role={pillar.hasDeepDive ? 'button' : undefined}
                tabIndex={pillar.hasDeepDive ? 0 : undefined}
                onClick={() => {
                  if (pillar.hasDeepDive) handleOpenModal(pillar);
                }}
                onKeyDown={(e) => {
                  if (pillar.hasDeepDive && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    handleOpenModal(pillar);
                  }
                }}
                className={`${colSpanClass} bg-slate-50/70 hover:bg-white rounded-[2rem] border border-slate-200/90 p-7 sm:p-8 transition-all duration-300 hover:shadow-xl flex flex-col justify-between group focus-visible:outline-2 focus-visible:outline-brand-600 focus-visible:outline-offset-2 ${
                  pillar.hasDeepDive ? 'cursor-pointer hover:border-brand-300/80' : ''
                }`}
              >
                <div className="space-y-5">
                  {/* Top Row: Icon + Pillar Number & Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-center text-brand-600 group-hover:bg-black group-hover:text-white group-hover:border-black transition-colors duration-300">
                      <PillarIcon className="w-5 h-5" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] font-medium text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
                        {pillar.tag}
                      </span>
                      <span className="text-xs font-bold text-slate-600">
                        {pillar.num}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
                    className="text-xl sm:text-2xl font-medium text-black tracking-tight leading-snug"
                  >
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                {/* Deep Dive Action Button */}
                {pillar.hasDeepDive && (
                  <div className="pt-5 border-t border-slate-200/80 mt-6 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenModal(pillar);
                      }}
                      className="inline-flex items-center space-x-1.5 text-xs font-semibold text-brand-600 group-hover:text-brand-700 cursor-pointer group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>{pillar.actionText || 'Explore Breakdown'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <span
                      className="w-7 h-7 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center text-xs group-hover:bg-brand-600 group-hover:text-white group-hover:border-brand-600 transition-colors shadow-2xs shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 3. How District Partnerships Work (Drivers Onboarding Design: Frosted Step Cards + Yellow Road Ribbon) ── */}
      <section className="relative pt-24 sm:pt-28 pb-28 sm:pb-36 bg-[#F4F4F4] overflow-hidden mb-24">
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
                <span>(Turnkey Operations)</span>
              </span>
            </div>
            <div className="lg:col-span-9 max-w-2xl">
              <h2
                style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
                className="text-3xl sm:text-4xl md:text-5xl font-medium text-black tracking-tight leading-tight"
              >
                How District Partnerships Work
              </h2>
              <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
                We guide your transportation team every step of the way, from cooperative onboarding to live daily route coordination.
              </p>
            </div>
          </div>

          {/* Pill Arrow Controls */}
          <div className="flex items-center space-x-2 mb-6">
            <button
              type="button"
              onClick={() =>
                setActivePartnershipStep((prev) =>
                  prev === 0 ? implementationSteps.length - 1 : prev - 1
                )
              }
              aria-label="Previous partnership phase"
              className="w-11 h-11 rounded-full bg-white hover:bg-neutral-50 border border-black/10 shadow-sm flex items-center justify-center text-black focus-visible:outline-2 focus-visible:outline-black transition-all cursor-pointer active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() =>
                setActivePartnershipStep((prev) =>
                  prev === implementationSteps.length - 1 ? 0 : prev + 1
                )
              }
              aria-label="Next partnership phase"
              className="w-11 h-11 rounded-full bg-black hover:bg-neutral-900 shadow-sm flex items-center justify-center text-[#FFCC00] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 transition-all cursor-pointer active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </button>
          </div>

          {/* 4 Frosted / Highlighted Phase Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {implementationSteps.map((stepItem, idx) => {
              const isActive = idx === activePartnershipStep;
              return (
                <div
                  key={stepItem.step}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isActive}
                  onClick={() => setActivePartnershipStep(idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActivePartnershipStep(idx);
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
                      {stepItem.title}
                    </h3>
                    <p
                      className={`mt-3 text-xs sm:text-sm leading-relaxed ${
                        isActive ? 'text-black/80' : 'text-slate-600'
                      }`}
                    >
                      {stepItem.description}
                    </p>
                  </div>

                  <div className="pt-6 flex items-center space-x-2 text-[11px] font-bold uppercase tracking-wider text-black/80">
                    <span>Phase 0{stepItem.step}</span>
                    <span>+</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. District Command Center & Safety Compliance Spotlight ──────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="bg-black rounded-[2.5rem] p-8 sm:p-12 md:p-16 text-white shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl space-y-6">
            <span className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider border border-white/20">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span>Uncompromising Pupil Safety &amp; Oversight</span>
            </span>

            <h2
              style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
              className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-tight"
            >
              Total Visibility For Transportation Directors.
            </h2>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              Unlike consumer rideshare platforms, BuckledIn operates as a dedicated extension of your school district&apos;s transportation office with strict regulatory accountability.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="bg-white/10 rounded-2xl p-5 border border-white/15">
                <div className="text-white font-semibold text-base sm:text-lg flex items-center space-x-2">
                  <Lock className="w-5 h-5 text-sky-400 shrink-0" />
                  <span>Multi-Jurisdictional Vetting</span>
                </div>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Thorough background checks, Child Abuse Index checks, continuous MVR monitoring, and random drug/alcohol testing.
                </p>
              </div>

              <div className="bg-white/10 rounded-2xl p-5 border border-white/15">
                <div className="text-white font-semibold text-base sm:text-lg flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-sky-400 shrink-0" />
                  <span>Live Route Telemetry</span>
                </div>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Track every active vehicle in real time with GPS breadcrumb trails, speed monitoring, and verified school drop-off timestamps.
                </p>
              </div>

              <div className="bg-white/10 rounded-2xl p-5 border border-white/15">
                <div className="text-white font-semibold text-base sm:text-lg flex items-center space-x-2">
                  <HeartHandshake className="w-5 h-5 text-sky-400 shrink-0" />
                  <span>Consistent Driver Pairing</span>
                </div>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Students ride with the same assigned driver every single day, building calm routines for children with autism and sensory needs.
                </p>
              </div>

              <div className="bg-white/10 rounded-2xl p-5 border border-white/15">
                <div className="text-white font-semibold text-base sm:text-lg flex items-center space-x-2">
                  <PhoneCall className="w-5 h-5 text-sky-400 shrink-0" />
                  <span>Live Dispatch During School Hours</span>
                </div>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Direct phone and portal access to our regional dispatch commanders whenever your staff or families need immediate schedule adjustments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. School District FAQs ───────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-600 mb-2">
            Procurement &amp; Operations FAQ
          </p>
          <h2
            style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
            className="text-3xl sm:text-4xl font-medium text-black tracking-tight"
          >
            Common Questions From Schools &amp; School Districts
          </h2>
        </div>

        <div className="space-y-3">
          {districtFaqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-2xs hover:border-slate-300 transition-colors"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span className="font-semibold text-black text-sm sm:text-base leading-snug">
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-brand-600 shrink-0 ml-2" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0 ml-2" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-2 text-sm text-slate-700 font-normal bg-white leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 6. District Consultation Inquiry Form / CTA ───────────────────── */}
      <section id="district-inquiry" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="bg-slate-50 border border-slate-200/90 rounded-[2.5rem] p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold text-brand-600 uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5" />
                <span>Partner With BuckledIn</span>
              </div>
              <h3
                style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
                className="text-2xl sm:text-4xl font-medium text-black tracking-tight leading-tight"
              >
                Ready to Solve Your District&apos;s Hardest Routes?
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Connect with our District Partnerships team for a custom route cost analysis, cooperative contract details, or a live demo of our District Command Portal.
              </p>
              <div className="pt-2 space-y-2 text-xs sm:text-sm text-slate-700 font-medium">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                  <span>No minimum vehicle commitments required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                  <span>Cooperative purchasing &amp; RFP support included</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              {consultationSubmitted ? (
                <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-3 shadow-xs">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-black">Consultation Request Received</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Thank you! Our VP of District Partnerships will reach out within 1 business day with cooperative contract information and routing options for your district.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setConsultationSubmitted(true);
                  }}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="school-fullname" className="block text-xs font-medium text-slate-700 mb-1">Full Name *</label>
                      <input
                        id="school-fullname"
                        type="text"
                        required
                        placeholder="Dr. Jane Miller"
                        className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-brand-600 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="school-role" className="block text-xs font-medium text-slate-700 mb-1">Title / Role *</label>
                      <input
                        id="school-role"
                        type="text"
                        required
                        placeholder="Transportation Director"
                        className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-brand-600 focus:bg-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="school-district" className="block text-xs font-medium text-slate-700 mb-1">School District / Organization *</label>
                      <input
                        id="school-district"
                        type="text"
                        required
                        placeholder="Beaverton School District"
                        className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-brand-600 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="school-email" className="block text-xs font-medium text-slate-700 mb-1">Work Email *</label>
                      <input
                        id="school-email"
                        type="email"
                        required
                        placeholder="jmiller@district.edu"
                        className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-brand-600 focus:bg-white"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-brand-600 hover:bg-[#0e85ee] hover:-translate-y-0.5 text-white text-xs sm:text-sm font-medium shadow-[0_8px_20px_-4px_rgba(2,103,206,0.32)] hover:shadow-[0_12px_26px_-4px_rgba(2,103,206,0.4)] active:translate-y-0 active:scale-[0.97] transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer focus-visible:outline-2 focus-visible:outline-brand-600 focus-visible:outline-offset-2"
                  >
                    Schedule District Consultation
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Pillar Deep-Dive Modal (Dedicated Driver Model & All Pillars) ────────────────── */}
      {activePillarModal && (() => {
        const currentDeepDive = pillarDeepDives[activePillarModal.num] || pillarDeepDives['01'];
        const DeepDiveIcon = currentDeepDive.icon || Users;

        return (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="pillar-modal-title"
            onClick={handleCloseModal}
            className={`fixed inset-0 z-[110] flex items-start sm:items-center justify-center p-3 sm:p-6 pt-16 sm:pt-20 bg-black/60 backdrop-blur-md overflow-hidden ${
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
                onClick={handleCloseModal}
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
                {currentDeepDive.heroImage && (
                  <div className="relative w-full h-48 sm:h-64 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/90 mb-7 shadow-xs">
                    <img
                      src={currentDeepDive.heroImage}
                      alt={currentDeepDive.heroImageAlt || currentDeepDive.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <span className="text-xs font-semibold text-white bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
                        {currentDeepDive.heroBadge}
                      </span>
                      <span className="text-xs font-bold text-white/90 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
                        PILLAR {activePillarModal.num}
                      </span>
                    </div>
                  </div>
                )}

                {/* Header */}
                <div className="pr-2 space-y-3 mb-8">
                  <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-50 border border-brand-100 text-xs font-bold text-brand-600 uppercase tracking-wider">
                    <DeepDiveIcon className="w-3.5 h-3.5" />
                    <span>{currentDeepDive.badge}</span>
                  </div>
                  <h3
                    style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
                    id="pillar-modal-title"
                    className="text-2xl sm:text-3xl md:text-4xl font-medium text-black tracking-tight leading-tight"
                  >
                    {currentDeepDive.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                    {currentDeepDive.subtitle}
                  </p>
                </div>

                {/* 3 Metric Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                  {currentDeepDive.metrics.map((m, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 text-left">
                      <div className={`text-2xl sm:text-3xl font-semibold ${m.color}`}>{m.value}</div>
                      <div className="text-xs font-medium text-slate-700 mt-1">{m.label}</div>
                      <div className="text-[11px] text-slate-600 mt-0.5">{m.desc}</div>
                    </div>
                  ))}
                </div>

                {/* Tailored Capabilities / Operational Protocol Section */}
                <div className="space-y-4 mb-8">
                  <div>
                    <h4
                      style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
                      className="text-lg sm:text-xl font-medium text-black tracking-tight"
                    >
                      {currentDeepDive.sectionTitle}
                    </h4>
                    {currentDeepDive.sectionSubtitle && (
                      <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1">
                        {currentDeepDive.sectionSubtitle}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {currentDeepDive.capabilities.map((cap, idx) => {
                      const CapIcon = cap.icon || CheckCircle2;
                      return (
                        <div
                          key={idx}
                          className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-3 hover:bg-white hover:border-brand-200 transition-colors"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="w-8 h-8 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-center text-brand-600">
                                <CapIcon className="w-4 h-4" />
                              </div>
                              <span className="text-[10px] font-bold text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-100">
                                {cap.tag}
                              </span>
                            </div>
                            <h5 className="font-bold text-sm text-black">
                              {cap.title}
                            </h5>
                            <p className="text-xs text-slate-600 leading-relaxed font-normal">
                              {cap.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Personnel Verification Badge Card */}
                {currentDeepDive.verificationCard && (
                  <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                    <div className="flex items-center space-x-3.5">
                      <img
                        src={currentDeepDive.verificationCard.image}
                        alt={currentDeepDive.verificationCard.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-brand-500 shrink-0"
                      />
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <span className="font-bold text-sm text-black">{currentDeepDive.verificationCard.name}</span>
                          <span className="w-4 h-4 rounded-full bg-brand-600 text-white inline-flex items-center justify-center text-[10px]">
                            ✓
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 font-medium">
                          {currentDeepDive.verificationCard.role}
                        </div>
                        <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">
                          {currentDeepDive.verificationCard.details}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-bold bg-white px-3 py-1.5 rounded-full border border-slate-200 text-slate-700 shadow-2xs shrink-0">
                      {currentDeepDive.verificationCard.badgeText}
                    </span>
                  </div>
                )}

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    onClick={handleCloseModal}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-normal text-slate-600 hover:text-black hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Close Breakdown
                  </button>

                  <button
                    onClick={() => {
                      handleCloseModal();
                      setTimeout(() => {
                        const el = document.getElementById('district-inquiry');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 300);
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-2.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white text-xs font-normal transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <span>Request District Staffing Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
