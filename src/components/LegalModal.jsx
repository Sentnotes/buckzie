import React from 'react';
import { X, Shield, Lock, FileText, Phone, Mail } from 'lucide-react';

export default function LegalModal({ isOpen, type, onClose }) {
  if (!isOpen) return null;

  const content = {
    terms: {
      title: 'Terms and Conditions',
      icon: FileText,
      subtitle: 'Effective October 2026',
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-black font-medium leading-relaxed">
          <p>
            Welcome to BuckledIn. By accessing or using our website, passenger application, or driver partner network, you agree to be bound by these Terms and Conditions.
          </p>
          <h4 className="font-extrabold text-black text-sm">1. Fair Upfront Pricing</h4>
          <p>
            Unlike legacy rideshare systems that introduce uncontrolled dynamic pricing spikes, BuckledIn provides upfront fixed estimates based on calculated distance and operational parameters. Traffic fluctuations will not result in unjustified surcharges.
          </p>
          <h4 className="font-extrabold text-black text-sm">2. Rider Safety and Conduct</h4>
          <p>
            BuckledIn maintains a zero-tolerance policy against discrimination, harassment, and unsafe conduct. Every passenger agrees to treat driver partners with dignity and comply with state seatbelt and child safety seat requirements.
          </p>
          <h4 className="font-extrabold text-black text-sm">3. Cancellation & Refunds</h4>
          <p>
            Rides may be cancelled free of charge within 2 minutes of driver acceptance. If a driver is delayed past the estimated window by more than 5 minutes, cancellation is completely free.
          </p>
        </div>
      ),
    },
    privacy: {
      title: 'Privacy Policy',
      icon: Lock,
      subtitle: 'Your privacy is guarded with 256-bit encryption',
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-black font-medium leading-relaxed">
          <p>
            At BuckledIn, your personal privacy is paramount. We do not sell rider or driver personal data to third-party advertising brokers.
          </p>
          <h4 className="font-extrabold text-black text-sm">1. Telematics & GPS Data</h4>
          <p>
            Location data is utilized strictly during active trip requests, safety routing, and guardian sharing features. Once a trip concludes, high-resolution trajectory points are anonymized.
          </p>
          <h4 className="font-extrabold text-black text-sm">2. Phone Number Masking</h4>
          <p>
            Calls and messages between riders and drivers are routed through masked VoIP proxies. Your real mobile phone number is never disclosed to drivers or riders.
          </p>
          <h4 className="font-extrabold text-black text-sm">3. Family & Minor Accounts</h4>
          <p>
            BuckledIn Guardian accounts for teens and minors require explicit parental verification. Minor account telematics are accessible only by designated guardians.
          </p>
        </div>
      ),
    },
    cookies: {
      title: 'Cookie Preferences & Policy',
      icon: Shield,
      subtitle: 'Transparent web telemetry controls',
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-black font-medium leading-relaxed">
          <p>
            We use essential cookies strictly to provide authentication, session persistence, and fraud prevention during booking transactions.
          </p>
          <p>
            You can customize or disable optional analytics cookies anytime within your browser settings.
          </p>
        </div>
      ),
    },
    safety: {
      title: 'Rider Safety Charter',
      icon: Shield,
      subtitle: 'Our 5-Star Commitment to Every Passenger',
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-black font-medium leading-relaxed">
          <p>
            Every BuckledIn vehicle must pass a 150-point annual mechanical inspection. Every driver undergoes continuous DMV license monitoring and multi-jurisdictional background screening.
          </p>
          <p>
            In-app SOS connects directly to both local 911 dispatchers and our 24/7 dedicated crisis response team with GPS coordinates shared instantly.
          </p>
        </div>
      ),
    },
    'driver-terms': {
      title: 'Driver Partner Agreement',
      icon: FileText,
      subtitle: 'The 88% Take-Home Policy',
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-black font-medium leading-relaxed">
          <p>
            BuckledIn covenants that our platform take rate shall never exceed 15% on standard rides. Driver partners retain 100% of all gratuities and bonuses, with instant zero-fee payout rights.
          </p>
        </div>
      ),
    },
  };

  const activeContent = content[type] || content.terms;
  const Icon = activeContent.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-black">{activeContent.title}</h3>
              <p className="text-xs text-black font-medium">{activeContent.subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-black hover:text-brand-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-2">{activeContent.body}</div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full font-normal text-xs text-white bg-brand-600 hover:bg-brand-700 transition-all shadow-md cursor-pointer"
          >
            I Understand & Accept
          </button>
        </div>
      </div>
    </div>
  );
}
