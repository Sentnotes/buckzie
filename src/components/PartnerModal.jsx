import React, { useState, useEffect } from 'react';
import {
  X,
  Building2,
  Users,
  CheckCircle2,
  ArrowRight,
  Phone,
  Mail,
  ShieldCheck,
  Check,
} from 'lucide-react';

const PROGRAM_OPTIONS = [
  'General Partnership',
  'IEP / Special Ed',
  'McKinney-Vento',
  'Foster Care',
  'Out-of-District',
  'Early Childhood',
  'Summer School',
];

export default function PartnerModal({ isOpen, onClose, onNavigate }) {
  const [activeTab, setActiveTab] = useState('district'); // 'district' | 'family'
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    role: '',
    district: '',
    email: '',
    programs: [PROGRAM_OPTIONS[0]],
  });

  const toggleProgram = (option) => {
    setFormData((prev) => {
      const exists = prev.programs.includes(option);
      if (exists && prev.programs.length === 1) return prev;
      return {
        ...prev,
        programs: exists
          ? prev.programs.filter((item) => item !== option)
          : [...prev.programs, option],
      };
    });
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    setSubmitted(false);
    setActiveTab('district');
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="partner-modal-title"
      onClick={handleClose}
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm transition-opacity duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto no-scrollbar"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close partnership modal"
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full text-slate-600 hover:text-black hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-brand-600 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="pr-10 mb-5">
          <div className="inline-flex items-center space-x-1.5 text-xs font-semibold text-brand-600 mb-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>BuckledIn Student Transportation</span>
          </div>
          <h2
            id="partner-modal-title"
            className="font-inktrap text-2xl sm:text-3xl font-medium text-black tracking-tight leading-tight"
          >
            {activeTab === 'district' ? 'Partner Your District' : 'For Families & Guardians'}
          </h2>
        </div>

        {/* 2-Tab Switcher (School District | Parent / Guardian) */}
        <div
          role="tablist"
          aria-label="Inquiry type"
          className="grid grid-cols-2 gap-1.5 p-1 rounded-full bg-slate-100 border border-slate-200/80 mb-6"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'district'}
            onClick={() => {
              setActiveTab('district');
              setSubmitted(false);
            }}
            className={`inline-flex items-center justify-center space-x-2 py-2.5 px-3 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-brand-600 ${
              activeTab === 'district'
                ? 'bg-white text-brand-600 shadow-sm'
                : 'text-slate-600 hover:text-black'
            }`}
          >
            <Building2 className="w-4 h-4 shrink-0" />
            <span>School District</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'family'}
            onClick={() => setActiveTab('family')}
            className={`inline-flex items-center justify-center space-x-2 py-2.5 px-3 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-brand-600 ${
              activeTab === 'family'
                ? 'bg-white text-brand-600 shadow-sm'
                : 'text-slate-600 hover:text-black'
            }`}
          >
            <Users className="w-4 h-4 shrink-0" />
            <span>Parent / Guardian</span>
          </button>
        </div>

        {/* ── TAB 1: SCHOOL DISTRICT CONSULTATION FORM ── */}
        {activeTab === 'district' ? (
          submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="font-inktrap text-2xl font-medium text-black tracking-tight">
                Consultation Request Received
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
                Thank you, <span className="font-semibold text-black">{formData.fullName}</span>. Our District Partnerships team will reach out within 1 business day with route options and cooperative purchasing details for{' '}
                <span className="font-semibold text-black">{formData.district}</span>.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-600">
                <a href="tel:14582279468" className="inline-flex items-center space-x-1.5 hover:text-brand-600 font-medium">
                  <Phone className="w-3.5 h-3.5 text-brand-600" />
                  <span>(458) 227-9468</span>
                </a>
                <a href="mailto:info@buckledin.com" className="inline-flex items-center space-x-1.5 hover:text-brand-600 font-medium">
                  <Mail className="w-3.5 h-3.5 text-brand-600" />
                  <span>info@buckledin.com</span>
                </a>
              </div>
              <div className="pt-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-7 py-2.5 rounded-full bg-black hover:bg-neutral-800 text-white text-sm font-medium transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Connect with our partnerships team for a route cost analysis, Sourcewell cooperative contract details, or a live demo of our District Command Portal.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="partner-fullname" className="block text-xs font-medium text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    id="partner-fullname"
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Dr. Jane Miller"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-sm text-black placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-brand-600 focus:bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="partner-role" className="block text-xs font-medium text-slate-700 mb-1">
                    Title / Role *
                  </label>
                  <input
                    id="partner-role"
                    name="role"
                    type="text"
                    required
                    value={formData.role}
                    onChange={handleChange}
                    placeholder="Transportation Director"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-sm text-black placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-brand-600 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="partner-district" className="block text-xs font-medium text-slate-700 mb-1">
                    School District / Organization *
                  </label>
                  <input
                    id="partner-district"
                    name="district"
                    type="text"
                    required
                    value={formData.district}
                    onChange={handleChange}
                    placeholder="Beaverton School District"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-sm text-black placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-brand-600 focus:bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="partner-email" className="block text-xs font-medium text-slate-700 mb-1">
                    Work Email *
                  </label>
                  <input
                    id="partner-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jmiller@district.edu"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-sm text-black placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-brand-600 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span id="partner-program-label" className="block text-xs font-medium text-slate-700">
                    Program Needs
                  </span>
                  <span className="text-[11px] text-slate-500">Select all that apply</span>
                </div>
                <div
                  role="group"
                  aria-labelledby="partner-program-label"
                  className="flex flex-wrap gap-2"
                >
                  {PROGRAM_OPTIONS.map((option) => {
                    const isSelected = formData.programs.includes(option);
                    return (
                      <button
                        key={option}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => toggleProgram(option)}
                        className={`inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-full text-xs font-medium transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-brand-600 focus-visible:outline-offset-2 ${
                          isSelected
                            ? 'bg-brand-600 text-white shadow-sm'
                            : 'bg-white text-brand-600 border border-brand-600/45 hover:border-brand-600 hover:bg-brand-50/60'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5] shrink-0" aria-hidden="true" />}
                        <span>{option}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 space-y-3">
                <button
                  type="submit"
                  className="group w-full inline-flex items-center justify-center space-x-2 py-3 px-6 rounded-full bg-brand-600 hover:bg-[#0e85ee] hover:-translate-y-0.5 text-white text-sm font-medium shadow-[0_8px_20px_-4px_rgba(2,103,206,0.32)] hover:shadow-[0_12px_26px_-4px_rgba(2,103,206,0.4)] active:translate-y-0 active:scale-[0.97] transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer focus-visible:outline-2 focus-visible:outline-brand-600 focus-visible:outline-offset-2"
                >
                  <span>Request District Consultation</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[3px]" />
                </button>

                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-600">
                  <span>Prefer to call?</span>
                  <a href="tel:14582279468" className="font-semibold text-black hover:text-brand-600">
                    (458) 227-9468
                  </a>
                  <span aria-hidden="true">·</span>
                  <a href="mailto:info@buckledin.com" className="font-semibold text-black hover:text-brand-600">
                    info@buckledin.com
                  </a>
                </div>
              </div>
            </form>
          )
        ) : (
          /* ── TAB 2: PARENT / GUARDIAN GUIDANCE + LIVE APP LINKS ── */
          <div className="space-y-5">
            <div className="p-4 rounded-2xl bg-[#f6f6ec] border border-slate-200/80 space-y-1.5">
              <div className="text-xs font-bold uppercase tracking-wider text-brand-600">
                School-District Initiated Enrollment
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                BuckledIn rides are arranged and funded directly through your child&apos;s school district—families don&apos;t pay out-of-pocket or book rideshare trips individually.
              </p>
            </div>

            <div className="space-y-2.5">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                Already enrolled by your school? Download the Guardian App
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a
                  href="https://apps.apple.com/us/app/buckled-in-guardian/id6749759409"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2.5 bg-black hover:bg-neutral-800 hover:-translate-y-0.5 text-white px-5 py-3 rounded-full shadow-md transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] active:translate-y-0 active:scale-[0.97] text-xs sm:text-sm font-medium"
                >
                  <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.77 1.06-1.85.94-2.93-1 .04-2.18.66-2.88 1.48-.56.63-1.06 1.73-.93 2.79 1.12.09 2.24-.57 2.87-1.34z" />
                  </svg>
                  <span>Apple App Store</span>
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.buckledin.caregiver&pcampaignid=web_share"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2.5 bg-black hover:bg-neutral-800 hover:-translate-y-0.5 text-white px-5 py-3 rounded-full shadow-md transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] active:translate-y-0 active:scale-[0.97] text-xs sm:text-sm font-medium"
                >
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="#4285F4" d="M3.6 2.3c-.3.3-.5.8-.5 1.4v16.6c0 .6.2 1.1.5 1.4l.1.1 9.3-9.3v-.2L3.6 2.3z" />
                    <path fill="#FBBC04" d="M16.1 14.8l-3.1-3.1v-.2l3.1-3.1.1.1 3.7 2.1c1.1.6 1.1 1.6 0 2.2l-3.8 2z" />
                    <path fill="#EA4335" d="M16.2 14.7L13 11.6 3.6 21c.4.4 1 .4 1.6.1l11-6.4" />
                    <path fill="#34A853" d="M16.2 8.5L5.2 2.2C4.6 1.8 4 1.9 3.6 2.3l9.4 9.4 3.2-3.2z" />
                  </svg>
                  <span>Google Play</span>
                </a>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-slate-600 text-center sm:text-left">
                Need help? Call{' '}
                <a href="tel:14582279468" className="font-semibold text-black hover:text-brand-600">
                  (458) 227-9468
                </a>
              </div>
              <button
                type="button"
                onClick={() => {
                  handleClose();
                  if (onNavigate) onNavigate('families');
                }}
                className="group inline-flex items-center space-x-1.5 text-xs sm:text-sm font-medium text-brand-600 hover:text-brand-700 cursor-pointer"
              >
                <span>How Family Enrollment Works</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
