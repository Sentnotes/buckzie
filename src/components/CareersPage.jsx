import React, { useState } from 'react';
import {
  Briefcase,
  Car,
  MapPin,
  CheckCircle2,
  Search,
  X,
  Send,
  Building2,
  Headphones,
  Check,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const statesData = [
  { code: 'ALL', name: 'All States', metros: [] },
  { code: 'PA', name: 'Pennsylvania', metros: ['Harrisburg', 'Allentown', 'Pittsburgh', 'Easton'] },
  { code: 'MO', name: 'Missouri', metros: ['Kansas City', 'St. Louis'] },
  { code: 'KS', name: 'Kansas', metros: ['Kansas City'] },
  { code: 'OR', name: 'Oregon', metros: ['Portland', 'Salem'] },
  { code: 'WA', name: 'Washington', metros: ['Seattle', 'Tacoma'] },
  { code: 'CA', name: 'California', metros: ['Los Angeles', 'San Diego'] },
  { code: 'AZ', name: 'Arizona', metros: ['Phoenix', 'Tucson'] },
  { code: 'OH', name: 'Ohio', metros: ['Cincinnati', 'Columbus', 'Dayton'] },
  { code: 'KY', name: 'Kentucky', metros: ['Covington'] },
  { code: 'FL', name: 'Florida', metros: ['Palm Beach'] },
];

const vehicleTypes = [
  { id: 'ALL', label: 'All Vehicle Types' },
  { id: 'sedan', label: '4-Door Sedan (Camry, Accord, etc.)' },
  { id: 'suv', label: 'SUV / Crossover (RAV4, CR-V, Explorer)' },
  { id: 'minivan', label: 'Minivan (Sienna, Pacifica, Odyssey)' },
  { id: 'wav', label: 'Wheelchair Accessible Van (WAV)' },
  { id: 'ev', label: 'Hybrid / Electric Vehicle' },
];

const driverOpenings = [
  {
    id: 'drv-1',
    title: 'Dedicated Morning & Afternoon School Route Driver',
    stateCode: 'PA',
    stateName: 'Pennsylvania',
    metro: 'Harrisburg',
    vehicleFit: ['sedan', 'suv', 'minivan', 'ev'],
    description: 'Provide consistent, calming student transportation for assigned routes. Familiar routines and dependable care every school day.',
    perks: ['Predictable weekday schedule', 'No weekend or late-night routes', 'Child safety equipment provided']
  },
  {
    id: 'drv-1b',
    title: 'Allentown & Lehigh Valley Student Route Driver',
    stateCode: 'PA',
    stateName: 'Pennsylvania',
    metro: 'Allentown',
    vehicleFit: ['sedan', 'suv', 'minivan', 'ev'],
    description: 'Serve Lehigh Valley partner school districts with morning pick-ups and afternoon returns.',
    perks: ['Assigned recurring route in your local radius', 'Direct dispatch phone line support', 'Weekly direct deposit']
  },
  {
    id: 'drv-1c',
    title: 'Greater Pittsburgh Student Transit Partner',
    stateCode: 'PA',
    stateName: 'Pennsylvania',
    metro: 'Pittsburgh',
    vehicleFit: ['sedan', 'suv', 'minivan'],
    description: 'Transport Pittsburgh area students to and from school safely with attentive, consistent care.',
    perks: ['Consistent student route pairing', 'Clean and peaceful rides', 'Comprehensive onboarding']
  },
  {
    id: 'drv-1d',
    title: 'Easton Area School Transit Driver',
    stateCode: 'PA',
    stateName: 'Pennsylvania',
    metro: 'Easton',
    vehicleFit: ['sedan', 'suv', 'ev'],
    description: 'Deliver reliable transportation for Easton students and families throughout the school year.',
    perks: ['Assigned local routes', 'Dedicated single student pairing', 'Paid background vetting']
  },
  {
    id: 'drv-2',
    title: 'Specialized Student Transit Chauffeur',
    stateCode: 'MO',
    stateName: 'Missouri',
    metro: 'Kansas City',
    vehicleFit: ['suv', 'minivan', 'wav'],
    description: 'Transport students with IEPs or specialized accommodations. Includes doorstep escort handoffs with authorized school personnel.',
    perks: ['Specialized transit training & certification', 'Dedicated single student route pairing', 'Weekly fuel stipend assistance']
  },
  {
    id: 'drv-2b',
    title: 'St. Louis Metro Student Transit Driver',
    stateCode: 'MO',
    stateName: 'Missouri',
    metro: 'St. Louis',
    vehicleFit: ['sedan', 'suv', 'minivan'],
    description: 'Provide dependable morning and afternoon transportation across St. Louis school partner districts.',
    perks: ['School calendar schedule with holidays off', 'Supportive local dispatch team', 'Paid background vetting']
  },
  {
    id: 'drv-3',
    title: 'Wheelchair-Accessible Route Specialist (WAV)',
    stateCode: 'WA',
    stateName: 'Washington',
    metro: 'Seattle',
    vehicleFit: ['wav'],
    description: 'Operate certified ramp/lift wheelchair-accessible vehicle for students with physical mobility requirements. Safety securement verified.',
    perks: ['Specialized vehicle route rate', 'Dedicated route assignment', 'Comprehensive ADA securement training']
  },
  {
    id: 'drv-3b',
    title: 'Tacoma & Pierce County Student Route Driver',
    stateCode: 'WA',
    stateName: 'Washington',
    metro: 'Tacoma',
    vehicleFit: ['sedan', 'suv', 'ev'],
    description: 'Connect students to education across Tacoma and South Sound school districts.',
    perks: ['Predictable routes', 'Familiar daily passengers', 'Weekly direct deposit']
  },
  {
    id: 'drv-4',
    title: 'Consistent Morning Bell Commute Driver',
    stateCode: 'OR',
    stateName: 'Oregon',
    metro: 'Portland',
    vehicleFit: ['sedan', 'suv', 'ev'],
    description: 'Perfect for retirees, educators, and early risers. Escort students safely from their home doorstep to school drop-off gates.',
    perks: ['Free midday time for other commitments', 'Assigned route in your local radius', 'Real-time dispatch guidance']
  },
  {
    id: 'drv-4b',
    title: 'Salem District Student Route Chauffeur',
    stateCode: 'OR',
    stateName: 'Oregon',
    metro: 'Salem',
    vehicleFit: ['sedan', 'suv', 'minivan'],
    description: 'Morning and afternoon school route driver for Mid-Willamette Valley partner schools.',
    perks: ['Consistent daily student pairing', 'Doorstep safety protocol', 'App-directed navigation']
  },
  {
    id: 'drv-5',
    title: 'Family & District Route Partner',
    stateCode: 'CA',
    stateName: 'California',
    metro: 'Los Angeles',
    vehicleFit: ['sedan', 'suv', 'minivan', 'ev'],
    description: 'Establish trusting daily connections with students and guardian escorts. Drive recurring routes throughout Los Angeles county districts.',
    perks: ['Consistent student assignment', 'Clean, smoke-free rider environment', 'Fast-track onboarding']
  },
  {
    id: 'drv-5b',
    title: 'San Diego County Student Transit Driver',
    stateCode: 'CA',
    stateName: 'California',
    metro: 'San Diego',
    vehicleFit: ['sedan', 'suv', 'minivan', 'ev'],
    description: 'Reliable school rides for San Diego unified and charter school students.',
    perks: ['Supportive local operations team', 'No night or weekend driving', 'Competitive weekly earnings']
  },
  {
    id: 'drv-6',
    title: 'Student Transit Partner — Multi-Rider Minivan',
    stateCode: 'OH',
    stateName: 'Ohio',
    metro: 'Cincinnati',
    vehicleFit: ['minivan', 'suv'],
    description: 'Drive small sibling groups or coordinated cluster students traveling to specialized magnet and regional district campuses.',
    perks: ['Multi-passenger route rate', 'Pre-installed certified safety seats', 'Dedicated local route manager']
  },
  {
    id: 'drv-6b',
    title: 'Columbus Metro Student Commute Driver',
    stateCode: 'OH',
    stateName: 'Ohio',
    metro: 'Columbus',
    vehicleFit: ['sedan', 'suv', 'minivan', 'ev'],
    description: 'Coordinated morning pickups and afternoon drop-offs for Columbus area schools.',
    perks: ['Fixed recurring route assignment', 'Calm student passenger base', 'Weekly direct deposit']
  },
  {
    id: 'drv-6c',
    title: 'Dayton District School Route Driver',
    stateCode: 'OH',
    stateName: 'Ohio',
    metro: 'Dayton',
    vehicleFit: ['sedan', 'suv', 'ev'],
    description: 'Safe, punctual student transit partner serving Dayton area school districts.',
    perks: ['Predictable school year schedules', 'Local route territory', 'Dispatch phone support']
  },
  {
    id: 'drv-7',
    title: 'Early Childhood & Elementary Transit Driver',
    stateCode: 'AZ',
    stateName: 'Arizona',
    metro: 'Phoenix',
    vehicleFit: ['sedan', 'suv', 'minivan'],
    description: 'Calm, patient drivers wanted for young learners. Secure approved booster seats and execute face-to-face handoffs.',
    perks: ['Consistent schedules matching school calendar', 'Paid background vetting', 'Supportive team community']
  },
  {
    id: 'drv-7b',
    title: 'Tucson District Route Chauffeur',
    stateCode: 'AZ',
    stateName: 'Arizona',
    metro: 'Tucson',
    vehicleFit: ['sedan', 'suv', 'ev'],
    description: 'Safe, punctual student transit partner serving Pima County school districts.',
    perks: ['Predictable school year schedules', 'Local route territory', 'Dispatch phone support']
  },
  {
    id: 'drv-8',
    title: 'Out-of-District Placement Route Chauffeur',
    stateCode: 'KS',
    stateName: 'Kansas',
    metro: 'Kansas City',
    vehicleFit: ['sedan', 'suv', 'ev'],
    description: 'Drive students attending specialized vocational or out-of-district day schools. Smooth highway commutes with predictable schedules.',
    perks: ['Longer route mileage compensation', 'Single pickup and dropoff simplicity', 'Weekly direct deposit']
  },
  {
    id: 'drv-9',
    title: 'Dedicated School Route Partner',
    stateCode: 'FL',
    stateName: 'Florida',
    metro: 'Palm Beach',
    vehicleFit: ['sedan', 'suv', 'minivan', 'ev'],
    description: 'Help Palm Beach area students access educational opportunities safely every morning and afternoon.',
    perks: ['Full holidays and summer breaks off', 'Local operating zone', 'Direct dispatch phone line']
  },
  {
    id: 'drv-10',
    title: 'Consistent Student Transit Chauffeur',
    stateCode: 'KY',
    stateName: 'Kentucky',
    metro: 'Covington',
    vehicleFit: ['sedan', 'suv', 'ev'],
    description: 'Punctual, compassionate transit partner for Northern Kentucky school partner routes.',
    perks: ['Fixed recurring route assignment', 'Calm student passenger base', 'App-directed navigation']
  }
];

const staffOpenings = [
  {
    id: 'stf-1',
    title: 'Ride Monitoring & Safety Specialist',
    department: 'Safety & Telematics Operations',
    location: 'Remote (US) / Headquarters (New York)',
    type: 'Full-Time',
    badge: 'Open Position',
    description: 'Monitor live GPS telematics, route ETAs, and geofence alerts for daily student rides in real time. Proactively identify delays, assist drivers, and notify school district liaisons.',
    responsibilities: [
      'Maintain active oversight of live transit map and in-flight vehicle telemetry',
      'Detect traffic bottlenecks and coordinate rerouting recommendations with drivers',
      'Manage real-time communication with parents and school district transportation coordinators',
      'Enforce zero-tolerance safety policies and assist in incident documentation'
    ],
    requirements: [
      '2+ years in dispatch, emergency monitoring, fleet logistics, or air/transit control',
      'Calm, solution-oriented composure during urgent situations',
      'Proficiency with logistics consoles and communications software'
    ]
  },
  {
    id: 'stf-2',
    title: 'Student Transit Dispatch Specialist',
    department: 'Dispatch & District Logistics',
    location: 'Remote (US) / East Coast Hours',
    type: 'Full-Time',
    badge: 'Open Position',
    description: 'Coordinate daily driver manifests, schedule changes, and substitute driver coverages across school districts. Act as the central communication center for morning and afternoon routes.',
    responsibilities: [
      'Build and optimize recurring route manifests aligned with school bell schedules',
      'Handle urgent morning driver callouts by rapidly dispatching vetted reserve chauffeurs',
      'Directly interface with district special education supervisors on student transit plans',
      'Maintain high on-time delivery rates across all operating territories'
    ],
    requirements: [
      '3+ years dispatch experience in pupil transit, paratransit, or medical mobility',
      'Expertise in dispatch software, Google Maps enterprise, and route optimization',
      'Exceptional multi-tasking and phone coordination skills'
    ]
  },
  {
    id: 'stf-3',
    title: 'District Partnerships & Transportation Liaison',
    department: 'School Partnerships',
    location: 'Hybrid (New York, NY / Travel to District Hubs)',
    type: 'Full-Time',
    badge: 'Open Position',
    description: 'Work directly with public school superintendents, transportation directors, and county boards of education to expand BuckledIn student transportation contracts.',
    responsibilities: [
      'Cultivate long-term partnerships with school districts seeking alternative transit for IEP & McKinney-Vento students',
      'Prepare contract proposals, RFPs, and district compliance documentation',
      'Present monthly safety and punctuality audits to school boards and committees'
    ],
    requirements: [
      'Proven track record in K-12 education partnerships, public procurement, or municipal transit',
      'Deep understanding of IDEA, McKinney-Vento, and state pupil transit standards'
    ]
  },
  {
    id: 'stf-4',
    title: 'Driver Vetting & Safety Compliance Lead',
    department: 'Compliance & Safety',
    location: 'Remote (US)',
    type: 'Full-Time',
    badge: 'Open Position',
    description: 'Oversee the comprehensive background screening, motor vehicle record audits, vehicle safety inspections, and child welfare training of every BuckledIn chauffeur applicant.',
    responsibilities: [
      'Conduct multi-jurisdictional background and motor vehicle record checks',
      'Audit 19-point vehicle inspection records and verify child restraint certifications',
      'Lead virtual orientation training sessions covering student de-escalation and safety standards'
    ],
    requirements: [
      'Background in human resources, compliance auditing, or background investigation in youth-serving organizations'
    ]
  },
  {
    id: 'stf-5',
    title: 'Guardian Experience & Family Support Specialist',
    department: 'Customer & Family Success',
    location: 'Remote (US)',
    type: 'Full-Time / Part-Time Shifts',
    badge: 'Open Position',
    description: 'Deliver compassionate, reassuring customer support to parents and legal guardians. Assist families with the Guardian App, login setup, and special ride requests.',
    responsibilities: [
      'Answer incoming phone calls, chats, and emails from parents regarding student ride status',
      'Guide guardians through downloading and configuring the live GPS tracking app',
      'Coordinate with dispatch to fulfill personalized student sensory or mobility accommodations'
    ],
    requirements: [
      'Warm, empathetic interpersonal demeanor with excellent written communication',
      'Bilingual proficiency (English/Spanish) strongly preferred'
    ]
  }
];

export default function CareersPage({ onBackToHome, embedded = false }) {
  const [activeCategory, setActiveCategory] = useState('drivers');

  // Separate State and Metro filters
  const [selectedState, setSelectedState] = useState('ALL');
  const [selectedMetro, setSelectedMetro] = useState('ALL');
  const [selectedVehicle, setSelectedVehicle] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Application Modal state
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    state: 'PA',
    metro: 'Harrisburg',
    vehicleType: 'sedan',
    vehicleYear: '',
    vehicleModel: '',
    experience: '3-5 years',
    resumeLink: '',
    notes: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStateChange = (stateCode) => {
    setSelectedState(stateCode);
    setSelectedMetro('ALL'); // Reset metro when state changes
  };

  const handleOpenApply = (role) => {
    setSelectedRole(role);
    setApplicationSubmitted(false);
    setIsApplyModalOpen(true);
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    setApplicationSubmitted(true);
  };

  // Get available metros based on current state selection
  const availableMetros = React.useMemo(() => {
    if (selectedState === 'ALL') {
      const allUniqueMetros = Array.from(
        new Set(driverOpenings.map((d) => d.metro))
      ).sort();
      return allUniqueMetros;
    }
    const stateObj = statesData.find((s) => s.code === selectedState);
    return stateObj ? stateObj.metros : [];
  }, [selectedState]);

  // Filtered driver positions
  const filteredDrivers = driverOpenings.filter((job) => {
    const matchesState = selectedState === 'ALL' || job.stateCode === selectedState;
    const matchesMetro = selectedMetro === 'ALL' || job.metro === selectedMetro;
    const matchesVehicle = selectedVehicle === 'ALL' || job.vehicleFit.includes(selectedVehicle);
    const matchesSearch =
      searchQuery === '' ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.metro.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.stateName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesState && matchesMetro && matchesVehicle && matchesSearch;
  });

  // Filtered staff positions
  const filteredStaff = staffOpenings.filter((job) => {
    return (
      searchQuery === '' ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const resetFilters = () => {
    setSelectedState('ALL');
    setSelectedMetro('ALL');
    setSelectedVehicle('ALL');
    setSearchQuery('');
  };

  return (
    <div className={embedded ? "bg-white text-black pb-12 selection:bg-brand-500 selection:text-white" : "min-h-screen bg-white text-black pt-36 sm:pt-40 pb-24 selection:bg-brand-500 selection:text-white"}>

      {/* Hero Header / Category Switcher */}
      <section className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${embedded ? 'mb-10' : 'mb-16'}`}>
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {!embedded && (
            <>
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 uppercase tracking-wider shadow-2xs">
                <Briefcase className="w-3.5 h-3.5 text-brand-600" />
                <span>Join the BuckledIn Mission</span>
              </div>

              <h1
                style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-black tracking-tight leading-[1.08]"
              >
                Careers With Real Purpose.
              </h1>

              <p className="text-lg sm:text-xl text-slate-700 font-normal leading-relaxed max-w-3xl mx-auto">
                Whether you&apos;re behind the wheel delivering consistent morning rides or orchestrating live student telematics in our dispatch center, you make a lasting impact on children&apos;s educational journeys every single day.
              </p>
            </>
          )}

          {/* Category Toggle (Drivers vs Staff) */}
          <div className={`${embedded ? 'pt-0' : 'pt-4'} flex justify-center`}>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
              <button
                onClick={() => {
                  setActiveCategory('drivers');
                  setSearchQuery('');
                }}
                className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                  activeCategory === 'drivers'
                    ? 'bg-black text-white font-medium shadow-xs'
                    : 'bg-neutral-100 text-neutral-500 hover:text-neutral-800 hover:bg-neutral-200/80 font-normal'
                }`}
              >
                Driver Positions
              </button>

              <button
                onClick={() => {
                  setActiveCategory('staff');
                  setSearchQuery('');
                }}
                className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                  activeCategory === 'staff'
                    ? 'bg-black text-white font-medium shadow-xs'
                    : 'bg-neutral-100 text-neutral-500 hover:text-neutral-800 hover:bg-neutral-200/80 font-normal'
                }`}
              >
                Operations &amp; Staff
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* DRIVERS VIEW */}
        {activeCategory === 'drivers' && (
          <div className="space-y-10">

            {/* Drivers Filter Bar Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
                <div>
                  <h3
                    style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
                    className="text-xl sm:text-2xl font-medium text-black tracking-tight"
                  >
                    Filter School Route Driver Opportunities
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal mt-0.5">
                    Select your state, metro area, and vehicle type to discover local routes.
                  </p>
                </div>

                {/* Keyword Search */}
                <div className="relative w-full md:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search city or keyword..."
                    className="w-full bg-white border border-slate-200 text-xs sm:text-sm text-black placeholder-slate-400 pl-10 pr-4 py-2.5 rounded-full focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 font-normal"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-black cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Three Separate Filter Columns: State, Metro Area, Vehicle Type */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                {/* 1. State Selector */}
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-slate-600 mb-2">
                    1. Select State
                  </label>
                  <div className="relative">
                    <select
                      value={selectedState}
                      onChange={(e) => handleStateChange(e.target.value)}
                      className="w-full appearance-none bg-white border border-slate-200 text-sm font-normal text-black px-4 py-3 rounded-2xl focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 cursor-pointer"
                    >
                      {statesData.map((st) => (
                        <option key={st.code} value={st.code}>
                          {st.name}
                        </option>
                      ))}
                    </select>
                    <MapPin className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* 2. Metro / City Selector */}
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-slate-600 mb-2">
                    2. Select Metro Area
                  </label>
                  <div className="relative">
                    <select
                      value={selectedMetro}
                      onChange={(e) => setSelectedMetro(e.target.value)}
                      className="w-full appearance-none bg-white border border-slate-200 text-sm font-normal text-black px-4 py-3 rounded-2xl focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 cursor-pointer"
                    >
                      <option value="ALL">
                        {selectedState === 'ALL' ? 'All Metro Areas' : `All ${statesData.find(s => s.code === selectedState)?.name} Metros`}
                      </option>
                      {availableMetros.map((metro) => (
                        <option key={metro} value={metro}>
                          {metro}
                        </option>
                      ))}
                    </select>
                    <MapPin className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* 3. Vehicle Type Selector */}
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-slate-600 mb-2">
                    3. Vehicle Type
                  </label>
                  <div className="relative">
                    <select
                      value={selectedVehicle}
                      onChange={(e) => setSelectedVehicle(e.target.value)}
                      className="w-full appearance-none bg-white border border-slate-200 text-sm font-normal text-black px-4 py-3 rounded-2xl focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 cursor-pointer"
                    >
                      {vehicleTypes.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.label}
                        </option>
                      ))}
                    </select>
                    <Car className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

              </div>

              {/* Quick Pills for Vehicle Types */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <span className="text-xs font-normal text-slate-500 mr-1">Quick Car Filter:</span>
                {vehicleTypes.map((v) => {
                  const isSelected = selectedVehicle === v.id;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVehicle(v.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-brand-600 text-white shadow-xs'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {v.id === 'ALL' ? 'All Types' : v.label.split(' ')[0]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Results Counter */}
            <div className="flex items-center justify-between text-sm text-slate-600 font-normal px-1">
              <span>Showing <strong className="font-medium text-black">{filteredDrivers.length}</strong> route opportunities</span>
              {(selectedState !== 'ALL' || selectedMetro !== 'ALL' || selectedVehicle !== 'ALL' || searchQuery !== '') && (
                <button
                  onClick={resetFilters}
                  className="text-xs font-medium text-brand-600 hover:underline cursor-pointer"
                >
                  Reset all filters
                </button>
              )}
            </div>

            {/* Job Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredDrivers.map((job) => (
                <div
                  key={job.id}
                  className="bg-white border border-slate-200 hover:border-brand-300 rounded-3xl p-7 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    {/* Top Tag: State & Metro */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-brand-50 text-brand-600 border border-brand-100">
                          {job.stateName}
                        </span>
                        <span className="text-xs text-slate-600 font-normal">
                          {job.metro}
                        </span>
                      </div>
                    </div>

                    {/* Job Title */}
                    <h4
                      style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
                      className="text-xl sm:text-2xl font-medium text-black tracking-tight leading-snug group-hover:text-brand-600 transition-colors"
                    >
                      {job.title}
                    </h4>

                    {/* Description */}
                    <p className="text-sm text-slate-700 font-normal leading-relaxed">
                      {job.description}
                    </p>

                    {/* Eligible Vehicles */}
                    <div className="pt-2">
                      <span className="text-[11px] font-medium uppercase tracking-wider text-slate-500 block mb-1.5">
                        Eligible Vehicle Categories:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {job.vehicleFit.map((veh) => {
                          const matched = vehicleTypes.find((vt) => vt.id === veh);
                          return (
                            <span
                              key={veh}
                              className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200 text-[11px] font-normal text-slate-700"
                            >
                              <Car className="w-3 h-3 text-slate-400" />
                              <span>{matched ? matched.label.split(' ')[0] : veh}</span>
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Route Perks Checklist */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                      {job.perks.map((p, i) => (
                        <div key={i} className="flex items-center space-x-2 text-xs text-slate-700 font-normal">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Apply Button */}
                  <div className="pt-6 mt-6 border-t border-slate-100">
                    <button
                      onClick={() => handleOpenApply(job)}
                      className="w-full py-3 px-6 rounded-full bg-black hover:bg-brand-600 text-white text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer active:scale-98 shadow-xs"
                    >
                      <span>Apply for this Route</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredDrivers.length === 0 && (
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-12 text-center space-y-4">
                <Car className="w-10 h-10 text-slate-400 mx-auto" />
                <h4
                  style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
                  className="text-lg font-medium text-black"
                >
                  No route openings found for your current filter
                </h4>
                <p className="text-sm text-slate-700 font-normal max-w-md mx-auto">
                  Try clearing the state, metro area, or vehicle type filter to see available routes in neighboring areas.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-black text-white text-xs font-medium rounded-full hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* OPERATIONS & STAFF VIEW */}
        {activeCategory === 'staff' && (
          <div className="space-y-10">

            {/* Staff Header Banner */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-medium text-brand-600 uppercase tracking-wider">
                  <Headphones className="w-3.5 h-3.5" />
                  <span>Mission Control &amp; Operations</span>
                </div>
                <h3
                  style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
                  className="text-2xl sm:text-3xl font-medium text-black tracking-tight"
                >
                  Join Our Dispatch &amp; Safety Technology Center
                </h3>
                <p className="text-sm text-slate-700 font-normal leading-relaxed">
                  Help keep thousands of students safe every day from our telematics operations room or from the comfort of your home office.
                </p>
              </div>

              {/* Staff Search Input */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter staff positions..."
                  className="w-full bg-white border border-slate-200 text-xs sm:text-sm text-black placeholder-slate-400 pl-10 pr-4 py-3 rounded-full focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 font-normal"
                />
              </div>
            </div>

            {/* Staff Openings List */}
            <div className="space-y-6">
              {filteredStaff.map((job) => (
                <div
                  key={job.id}
                  className="bg-white border border-slate-200 hover:border-brand-300 rounded-3xl p-7 sm:p-9 shadow-xs hover:shadow-lg transition-all duration-200 space-y-6 group"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-brand-50 text-brand-600 border border-brand-100">
                          {job.department}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-normal bg-slate-100 text-slate-700">
                          {job.location}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-normal bg-slate-100 text-slate-700">
                          {job.type}
                        </span>
                      </div>

                      <h4
                        style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
                        className="text-2xl sm:text-3xl font-medium text-black tracking-tight group-hover:text-brand-600 transition-colors"
                      >
                        {job.title}
                      </h4>
                    </div>

                    <button
                      onClick={() => handleOpenApply(job)}
                      className="inline-flex items-center space-x-2 bg-black hover:bg-brand-600 text-white font-medium text-sm px-6 py-3.5 rounded-full transition-all duration-200 cursor-pointer self-start lg:self-auto shrink-0 shadow-xs active:scale-95"
                    >
                      <span>Apply for Role</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-sm sm:text-base text-slate-700 font-normal leading-relaxed">
                    {job.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    {/* Key Responsibilities */}
                    <div className="space-y-2.5">
                      <h5 className="text-xs font-medium uppercase tracking-wider text-slate-500">
                        Core Responsibilities:
                      </h5>
                      <ul className="space-y-2">
                        {job.responsibilities.map((r, i) => (
                          <li key={i} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-700 font-normal leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-brand-600 flex-shrink-0 mt-0.5" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Requirements */}
                    <div className="space-y-2.5">
                      <h5 className="text-xs font-medium uppercase tracking-wider text-slate-500">
                        Qualifications &amp; Requirements:
                      </h5>
                      <ul className="space-y-2">
                        {job.requirements.map((req, i) => (
                          <li key={i} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-700 font-normal leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </section>

      {/* Application Modal */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[92vh] overflow-y-auto">

            {/* Close Button */}
            <button
              onClick={() => setIsApplyModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-black hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {applicationSubmitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <Check className="w-8 h-8" />
                </div>
                <h3
                  style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
                  className="text-2xl sm:text-3xl font-medium text-black tracking-tight"
                >
                  Application Submitted!
                </h3>
                <p className="text-sm text-slate-700 font-normal max-w-md mx-auto leading-relaxed">
                  Thank you for applying for <strong>{selectedRole?.title}</strong>. Our recruiting and onboarding coordination team will review your details and reach out within 1–2 business days.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setIsApplyModalOpen(false)}
                    className="px-8 py-3 bg-black hover:bg-neutral-800 text-white font-medium text-sm rounded-full cursor-pointer transition-colors"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-100">
                    {activeCategory === 'drivers' ? 'Driver Partner Application' : 'Staff Position Application'}
                  </span>
                  <h3
                    style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
                    className="text-2xl sm:text-3xl font-medium text-black tracking-tight mt-2"
                  >
                    {selectedRole ? selectedRole.title : 'Apply to BuckledIn'}
                  </h3>
                  <p className="text-xs text-slate-600 font-normal mt-1">
                    Complete this quick application to begin our streamlined onboarding and vetting review.
                  </p>
                </div>

                <form onSubmit={handleSubmitApplication} className="space-y-4 font-normal">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="e.g. Maria"
                        className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-brand-500 focus:bg-white font-normal"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="e.g. Santos"
                        className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-brand-500 focus:bg-white font-normal"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="you@email.com"
                        className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-brand-500 focus:bg-white font-normal"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(555) 000-0000"
                        className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-brand-500 focus:bg-white font-normal"
                      />
                    </div>
                  </div>

                  {/* State & Metro Selection */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Operating State *
                      </label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            state: val,
                            metro: statesData.find((s) => s.code === val)?.metros[0] || ''
                          }));
                        }}
                        className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-brand-500 focus:bg-white font-normal"
                      >
                        {statesData.filter((s) => s.code !== 'ALL').map((st) => (
                          <option key={st.code} value={st.code}>
                            {st.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Preferred Metro Area *
                      </label>
                      <select
                        name="metro"
                        value={formData.metro}
                        onChange={handleInputChange}
                        className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-brand-500 focus:bg-white font-normal"
                      >
                        {(statesData.find((s) => s.code === formData.state)?.metros || []).map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Driver Specific Fields */}
                  {activeCategory === 'drivers' && (
                    <div className="space-y-4 pt-1 border-t border-slate-100">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Vehicle Type You Own / Drive *
                        </label>
                        <select
                          name="vehicleType"
                          value={formData.vehicleType}
                          onChange={handleInputChange}
                          className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-brand-500 focus:bg-white font-normal"
                        >
                          <option value="sedan">4-Door Sedan (Camry, Accord, etc.)</option>
                          <option value="suv">SUV / Crossover (RAV4, CR-V, Explorer)</option>
                          <option value="minivan">Minivan (Sienna, Pacifica, Odyssey)</option>
                          <option value="wav">Wheelchair Accessible Van (WAV)</option>
                          <option value="ev">Hybrid / Electric Vehicle</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-slate-700 mb-1">
                            Vehicle Year *
                          </label>
                          <input
                            type="text"
                            name="vehicleYear"
                            required
                            value={formData.vehicleYear}
                            onChange={handleInputChange}
                            placeholder="e.g. 2021"
                            className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-brand-500 focus:bg-white font-normal"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-700 mb-1">
                            Vehicle Make &amp; Model *
                          </label>
                          <input
                            type="text"
                            name="vehicleModel"
                            required
                            value={formData.vehicleModel}
                            onChange={handleInputChange}
                            placeholder="e.g. Toyota RAV4"
                            className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-brand-500 focus:bg-white font-normal"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Staff Specific Fields */}
                  {activeCategory === 'staff' && (
                    <div className="space-y-4 pt-1 border-t border-slate-100">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          LinkedIn Profile or Resume Link *
                        </label>
                        <input
                          type="url"
                          name="resumeLink"
                          required
                          value={formData.resumeLink}
                          onChange={handleInputChange}
                          placeholder="https://linkedin.com/in/... or Google Drive link"
                          className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-brand-500 focus:bg-white font-normal"
                        />
                      </div>
                    </div>
                  )}

                  {/* Notes / Experience */}
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Brief Experience or Relevant Notes (Optional)
                    </label>
                    <textarea
                      name="notes"
                      rows={2}
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder={activeCategory === 'drivers' ? 'Previous driving, student care, or school bus experience...' : 'Relevant dispatch, telematics, or customer experience...'}
                      className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-brand-500 focus:bg-white font-normal"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-medium text-sm rounded-full transition-all duration-200 cursor-pointer shadow-md shadow-brand-500/25 active:scale-98 flex items-center justify-center space-x-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Application</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
