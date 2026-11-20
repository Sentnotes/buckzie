import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Building2,
  Users,
  ShieldCheck
} from 'lucide-react';
import BriefingsMorphShowcase from './BriefingsMorphShowcase';

export default function Footer({ onNavigate, onOpenLegalModal }) {
  const [email, setEmail] = useState('');
  const [subRole, setSubRole] = useState('family');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <>
      {/* ── ABOVE FOOTER: Morphing Showcase (Left) + Clean White "Subscribe to BuckledIn" CTA Band (Right) ── */}
      <section className="bg-white text-black border-t border-slate-200 py-14 md:py-16 px-6 sm:px-10 lg:px-12 relative z-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Side: Self-Playing Morphing Showcase */}
          <div className="lg:col-span-6 flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="w-full max-w-[380px] sm:max-w-[420px]">
              <BriefingsMorphShowcase />
            </div>
          </div>

          {/* Right Side: Subscribe to BuckledIn + Audience Role Selector Tabs */}
          <div className="lg:col-span-6 text-center lg:text-left order-1 lg:order-2">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 mb-3 inline-block">
              District &amp; Family Updates
            </span>
            <h2 className="font-inktrap text-3xl sm:text-4xl font-medium text-black tracking-tight mb-3">
              Subscribe to BuckledIn
            </h2>
            <p className="text-slate-600 text-sm max-w-md mx-auto lg:mx-0 mb-5 leading-relaxed">
              Be the first to hear about new district launches, safety updates, and W-2 driver openings.
            </p>

            {/* Audience Role Selector Pills (Families / Drivers / School Districts) */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-5">
              {[
                { id: 'family', label: 'Parent / Family', icon: Users },
                { id: 'driver', label: 'Driver Partner', icon: ShieldCheck },
                { id: 'district', label: 'School District', icon: Building2 },
              ].map((role) => {
                const Icon = role.icon;
                const active = subRole === role.id;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSubRole(role.id)}
                    className={`inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                      active
                        ? 'bg-[#0267CE] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-black'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{role.label}</span>
                  </button>
                );
              })}
            </div>

            {subscribed ? (
              <div className="w-full max-w-md mx-auto lg:mx-0 p-4 bg-slate-50 border border-brand-500/40 rounded-2xl text-sm text-brand-700 flex items-center justify-center lg:justify-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                <span>Thank you for subscribing! Check your inbox for updates.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="w-full max-w-md mx-auto lg:mx-0 flex flex-col sm:flex-row gap-2.5">
                <label htmlFor="footer-newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  aria-label="Email address"
                  className="flex-1 bg-slate-50 border border-slate-300 text-black placeholder-slate-500 px-5 py-3 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-brand-600"
                />
                <button
                  type="submit"
                  className="group bg-brand-600 hover:bg-[#0e85ee] text-white px-7 py-3 rounded-full text-sm font-medium shadow-[0_8px_20px_-4px_rgba(2,103,206,0.32)] hover:shadow-[0_12px_26px_-4px_rgba(2,103,206,0.4)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] flex items-center justify-center space-x-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-brand-600 focus-visible:outline-offset-2 shrink-0"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[3px]" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── ELECTRIC BLUE TRACK FOOTER (Inspired by Reference Loop Aesthetic) ── */}
      <footer className="bg-[#051D97] text-white relative z-20 overflow-hidden min-h-[480px] lg:min-h-[560px] flex flex-col justify-between">
        {/* Background 3-Lane Looping Overpass/Underpass Track SVG */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-25 lg:opacity-35"
          viewBox="0 0 1440 520"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          {/* Underpass Track: Bottom Exit -> Left Loop -> Center Arch -> Right Loop */}
          <g>
            <path
              d="M 480 540 L 480 285 C 480 175, 400 135, 290 135 C 165 135, 110 205, 110 290 C 110 380, 175 440, 310 440 L 470 440 C 570 440, 620 355, 650 265 C 685 165, 755 135, 860 135 C 960 135, 1020 195, 1020 275 C 1020 365, 1085 435, 1190 435 C 1300 435, 1365 365, 1365 275 C 1365 180, 1295 135, 1195 135 C 1095 135, 1045 205, 1015 280 C 980 365, 915 435, 815 435 C 715 435, 665 365, 665 265"
              stroke="#FFFFFF"
              strokeWidth="36"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 480 540 L 480 285 C 480 175, 400 135, 290 135 C 165 135, 110 205, 110 290 C 110 380, 175 440, 310 440 L 470 440 C 570 440, 620 355, 650 265 C 685 165, 755 135, 860 135 C 960 135, 1020 195, 1020 275 C 1020 365, 1085 435, 1190 435 C 1300 435, 1365 365, 1365 275 C 1365 180, 1295 135, 1195 135 C 1095 135, 1045 205, 1015 280 C 980 365, 915 435, 815 435 C 715 435, 665 365, 665 265"
              stroke="#051D97"
              strokeWidth="22"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 480 540 L 480 285 C 480 175, 400 135, 290 135 C 165 135, 110 205, 110 290 C 110 380, 175 440, 310 440 L 470 440 C 570 440, 620 355, 650 265 C 685 165, 755 135, 860 135 C 960 135, 1020 195, 1020 275 C 1020 365, 1085 435, 1190 435 C 1300 435, 1365 365, 1365 275 C 1365 180, 1295 135, 1195 135 C 1095 135, 1045 205, 1015 280 C 980 365, 915 435, 815 435 C 715 435, 665 365, 665 265"
              stroke="#FFFFFF"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          {/* Overpass Vertical Spine: Top Exit Passing Over Center Arch */}
          <g>
            <path
              d="M 835 -20 L 835 280"
              stroke="#051D97"
              strokeWidth="52"
            />
            <path
              d="M 835 -20 L 835 280"
              stroke="#FFFFFF"
              strokeWidth="36"
            />
            <path
              d="M 835 -20 L 835 280"
              stroke="#051D97"
              strokeWidth="22"
            />
            <path
              d="M 835 -20 L 835 280"
              stroke="#FFFFFF"
              strokeWidth="8"
            />
          </g>
        </svg>

        {/* Foreground Footer Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-20 pb-12 lg:pt-28 lg:pb-14 flex-1 flex flex-col justify-between">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
            {/* Brand Wordmark Column (Left Loop Zone) */}
            <div className="lg:col-span-4 space-y-5">
              <span
                style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
                className="text-5xl sm:text-6xl font-medium tracking-tight text-white block"
              >
                BuckledIn.
              </span>
              <p className="text-blue-100/90 text-sm max-w-xs leading-relaxed">
                Structured student transportation built around safety, predictable routes, and trusted local drivers.
              </p>
              <span className="inline-block text-xs font-medium uppercase tracking-widest text-blue-200/80 pt-1">
                Operating in 28+ Major Metro Areas
              </span>

              {/* Social Icons (LinkedIn, Facebook & Instagram) */}
              <div className="flex items-center space-x-3 pt-2">
                <a
                  href="https://www.linkedin.com/company/buckledin"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="BuckledIn on LinkedIn"
                  className="w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#051D97] focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/61576133175473/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="BuckledIn on Facebook"
                  className="w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#051D97] focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/buckled.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="BuckledIn on Instagram"
                  className="w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#051D97] focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Navigation Column */}
            <div className="lg:col-span-3">
              <h3 className="font-inktrap text-xs font-medium uppercase tracking-widest text-blue-200 mb-4">
                Navigation
              </h3>
              <ul className="space-y-2.5 text-sm text-white/90">
                <li>
                  <button onClick={() => onNavigate('schools')} className="hover:text-amber-300 transition-colors cursor-pointer">
                    Schools &amp; Programs
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('drivers')} className="hover:text-amber-300 transition-colors cursor-pointer">
                    Drivers &amp; Earnings
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('families')} className="hover:text-amber-300 transition-colors cursor-pointer">
                    Families &amp; Guardian Mode
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('about')} className="hover:text-amber-300 transition-colors cursor-pointer">
                    About Us
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('careers')} className="hover:text-amber-300 transition-colors cursor-pointer">
                    Careers
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('newsletters')} className="hover:text-amber-300 transition-colors cursor-pointer">
                    Briefings &amp; Press
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Us Column */}
            <div id="contact" className="lg:col-span-3">
              <h3 className="font-inktrap text-xs font-medium uppercase tracking-widest text-blue-200 mb-4">
                Contact Us
              </h3>
              <ul className="space-y-3.5 text-sm text-white/90">
                <li className="flex items-start space-x-2.5">
                  <Phone className="w-4 h-4 text-blue-200 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-blue-200/80">Phone</div>
                    <a href="tel:14582279468" className="hover:text-amber-300 transition-colors font-medium">
                      (458) 227-9468
                    </a>
                  </div>
                </li>
                <li className="flex items-start space-x-2.5">
                  <Mail className="w-4 h-4 text-blue-200 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-blue-200/80">Email</div>
                    <a href="mailto:info@buckledin.com" className="hover:text-amber-300 transition-colors font-medium">
                      info@buckledin.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start space-x-2.5">
                  <MapPin className="w-4 h-4 text-blue-200 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-blue-200/80">Location • Beaverton, OR</div>
                    <a
                      href="https://www.bing.com/maps?where=Beaverton+OR+US&trk=org-locations_url"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-white/85 hover:text-amber-300 transition-colors leading-snug block"
                    >
                      9450 SW Gemini Dr, #63721<br />Beaverton, Oregon 97008, US
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            {/* Legal & Cookies Column */}
            <div className="lg:col-span-2">
              <h3 className="font-inktrap text-xs font-medium uppercase tracking-widest text-blue-200 mb-4">
                Legal
              </h3>
              <ul className="space-y-2.5 text-sm text-white/90">
                <li>
                  <button onClick={() => onOpenLegalModal('terms')} className="hover:text-amber-300 transition-colors cursor-pointer text-left">
                    Terms &amp; Conditions
                  </button>
                </li>
                <li>
                  <button onClick={() => onOpenLegalModal('privacy')} className="hover:text-amber-300 transition-colors cursor-pointer text-left">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => onOpenLegalModal('cookies')} className="hover:text-amber-300 transition-colors cursor-pointer text-left">
                    Cookie Preferences
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright Bar */}
          <div className="mt-20 pt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-100/80">
            <span>&copy; BuckledIn 2026</span>
            <div className="flex items-center space-x-5">
              <button onClick={() => onOpenLegalModal('cookies')} className="hover:text-white transition-colors cursor-pointer">
                Cookies
              </button>
              <button onClick={() => onOpenLegalModal('privacy')} className="hover:text-white transition-colors cursor-pointer">
                Privacy
              </button>
              <button onClick={() => onOpenLegalModal('terms')} className="hover:text-white transition-colors cursor-pointer">
                Terms
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
