import React, { useEffect } from 'react';
import { X, Shield, Lock, FileText, Phone, Mail } from 'lucide-react';

export default function LegalModal({ isOpen, type, onClose }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const content = {
    terms: {
      title: 'Terms of Use',
      icon: FileText,
      subtitle: 'Effective November 2026 • BuckledIn, Inc.',
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-black/85 font-normal leading-relaxed">
          <p>
            These Terms of Use (&ldquo;Terms&rdquo;) form a binding legal agreement between you and BuckledIn (&ldquo;BuckledIn,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) governing your access to and use of any BuckledIn website, mobile and web applications, content, tools, and student transportation coordination services (collectively, the &ldquo;BuckledIn Platform&rdquo;).
          </p>
          <p className="font-semibold text-black">
            PLEASE READ THESE TERMS CAREFULLY. SECTION 12 CONTAINS A BINDING INDIVIDUAL ARBITRATION AGREEMENT AND CLASS ACTION WAIVER THAT AFFECT HOW DISPUTES WITH BUCKLEDIN ARE RESOLVED. BY ACCESSING OR USING THE BUCKLEDIN PLATFORM, YOU CONFIRM THAT YOU HAVE READ, UNDERSTAND, AND AGREE TO BE BOUND BY THESE TERMS. IF YOU DO NOT AGREE, DO NOT ACCESS OR USE THE BUCKLEDIN PLATFORM.
          </p>

          <h4 className="font-bold text-black text-sm pt-1">1. Changes to These Terms</h4>
          <p>
            BuckledIn may update these Terms or any incorporated policies at any time. Updated Terms become effective upon posting or your acceptance, and continued use of the BuckledIn Platform after posting constitutes acceptance of the revised Terms to the fullest extent permitted by law.
          </p>

          <h4 className="font-bold text-black text-sm pt-1">2. The BuckledIn Platform &amp; Roles</h4>
          <p>
            The BuckledIn Platform connects school districts, organizations, parents, and legal guardians (&ldquo;Ride Organizers&rdquo;) with vetted drivers (&ldquo;Drivers&rdquo;) to schedule, coordinate, and track student and passenger transportation (&ldquo;Services&rdquo;) for eligible students and family members (&ldquo;Riders&rdquo;). Designated parents and guardians (&ldquo;Guardians&rdquo;) may also use the application to view live trip progress for authorized Riders.
          </p>
          <p>
            Ride Organizers represent and warrant that they hold all required parental, guardian, or district authorizations before adding any Rider or Rider information to an account. We may add, modify, or discontinue Platform features at any time.
          </p>

          <h4 className="font-bold text-black text-sm pt-1">3. Eligibility, Accounts &amp; Confidentiality</h4>
          <p>
            You must be at least 18 years old to create an account as a Ride Organizer or Guardian, and at least 21 years old to provide driving Services on the BuckledIn Platform. You agree to maintain only one active account per role, provide accurate and current information, safeguard your login credentials, and prevent unauthorized or minor access to your account. You are solely responsible for your own internet, mobile device, and carrier data charges.
          </p>
          <p>
            All non-public operational, profile, route, and Rider details accessed through the Platform are strictly confidential (&ldquo;Confidential Information&rdquo;), and may include information protected under HIPAA, FERPA, and PPRA. You may use Confidential Information solely to arrange, monitor, or complete authorized Services, must never disclose or redistribute it improperly, and must notify BuckledIn immediately if any unauthorized disclosure occurs.
          </p>
          <p>
            Calls placed or received through the BuckledIn Platform may be recorded and stored for safety, quality, and compliance purposes to the extent permitted by law. By placing or answering a call through the Platform, you consent to such recording.
          </p>

          <h4 className="font-bold text-black text-sm pt-1">4. Mobile Applications &amp; Location Services</h4>
          <p>
            Subject to these Terms, BuckledIn grants you a limited, non-exclusive, non-transferable, revocable license to install and use our mobile application on a device you own or control strictly for permitted Platform use. Third-party app stores (such as Apple App Store and Google Play) are not responsible for maintenance, support, or product claims related to the BuckledIn application, though they may enforce third-party beneficiary rights regarding your app license.
          </p>
          <p>
            To coordinate routes, verify pickups and drop-offs, calculate trip metrics, and protect Rider safety, the Platform collects real-time GPS location data while the application is active (and in the background for Drivers during active duty). Certain mapping features rely on third-party map providers, whose own terms and privacy policies apply. You also agree to install required application updates to maintain access.
          </p>

          <h4 className="font-bold text-black text-sm pt-1">5. Communications</h4>
          <p>
            By using the BuckledIn Platform, you consent to receive operational and service communications via email, SMS, phone calls, and push notifications (including automated or prerecorded notices). Standard carrier rates apply. You may opt out of promotional emails via the unsubscribe link, or reply &ldquo;STOP&rdquo; to opt out of promotional texts. Replying &ldquo;STOPALL&rdquo; opts out of all texts, which will prevent continued use of Services that require real-time trip notifications.
          </p>

          <h4 className="font-bold text-black text-sm pt-1">6. Intellectual Property</h4>
          <p>
            All software, text, graphics, trademarks, and content on the BuckledIn Platform (excluding user-provided content) belong to BuckledIn or its licensors. You may not copy, modify, resell, reverse engineer, frame, scrape, crawl, remove proprietary notices from, or use any automated tools to extract data from the Platform, or build any competing service from Platform materials. Authorized Drivers who receive BuckledIn branded decals or apparel hold only a limited, revocable license to display them strictly while performing active Services and must return or destroy them upon deactivation.
          </p>

          <h4 className="font-bold text-black text-sm pt-1">7. Prohibited Uses</h4>
          <p>
            You agree not to use the Platform in any way that: violates any law or safety regulation; endangers any Rider, Driver, or third party; involves harassment, threats, discrimination, or fraud; infringes third-party rights; sends unsolicited spam; impersonates any person or BuckledIn representative; falsifies safety attestations; or interferes with Platform security, servers, or networks.
          </p>

          <h4 className="font-bold text-black text-sm pt-1">8. User Submissions &amp; Feedback</h4>
          <p>
            By submitting content or feedback through the Platform, you grant BuckledIn a worldwide, royalty-free, perpetual, transferable, sublicensable license to use, display, reproduce, and incorporate that content or feedback to operate and improve our Services without compensation or attribution. You represent that you own or have permission to share any content you submit. We may pre-screen or remove content at our discretion.
          </p>

          <h4 className="font-bold text-black text-sm pt-1">9. Third-Party Links &amp; Disclaimers</h4>
          <p>
            The Platform may link to third-party websites or tools outside our control, which you access at your own risk under their respective terms. TO THE FULLEST EXTENT PERMITTED BY LAW, THE BUCKLEDIN PLATFORM AND ALL SERVICES ARE PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. WE DO NOT GUARANTEE UNINTERRUPTED AVAILABILITY, SPECIFIC RIDE VOLUMES, OR THAT ANY PARTICULAR RIDE REQUEST WILL BE FULFILLED WITHOUT DELAY.
          </p>

          <h4 className="font-bold text-black text-sm pt-1">10. Limitation of Liability &amp; Indemnification</h4>
          <p>
            TO THE FULLEST EXTENT PERMITTED BY LAW, BUCKLEDIN AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AFFILIATES, AGENTS, AND LICENSORS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR LOSS OF PROFITS, DATA, OR GOODWILL. TOTAL AGGREGATE LIABILITY ARISING FROM OR RELATING TO THE PLATFORM OR SERVICES SHALL NOT EXCEED THE GREATER OF: (A) TOTAL FEES RECEIVED BY BUCKLEDIN FROM YOUR RIDE ACTIVITY IN THE THREE (3) MONTHS PRIOR TO THE EVENT, OR (B) ONE THOUSAND DOLLARS ($1,000.00), EXCEPT WHERE PROHIBITED BY LAW FOR NEGLIGENCE CAUSING PERSONAL INJURY/DEATH OR FRAUD.
          </p>
          <p>
            You agree to indemnify and hold harmless BuckledIn and its covered parties from any claims, losses, liabilities, and reasonable attorneys&rsquo; fees arising out of your use of the Platform, your violation of these Terms or applicable law, or any third-party rights infringed by you or your Riders.
          </p>

          <h4 className="font-bold text-black text-sm pt-1">11. Local Disclosures &amp; Termination</h4>
          <p>
            You are responsible for complying with all applicable state and local pupil transportation disclosures and regulations. You may terminate these Terms with seven (7) days&rsquo; written notice to BuckledIn. BuckledIn may immediately suspend or deactivate your account if you no longer meet qualification requirements, breach these Terms, or if we believe in good faith that suspension is necessary to protect Rider or community safety. Key protective provisions (confidentiality, IP, disclaimers, liability limits, indemnity, and arbitration) survive termination.
          </p>

          <h4 className="font-bold text-black text-sm pt-1">12. Dispute Resolution &amp; Binding Arbitration</h4>
          <p>
            Except for eligible individual small-claims actions, workers&rsquo; compensation/unemployment/disability benefit claims, non-arbitrable government agency reports, or non-waivable statutory claims, you and BuckledIn agree to resolve all disputes (&ldquo;Claims&rdquo;) exclusively through final and binding <strong>individual arbitration</strong> administered by JAMS under its applicable rules, governed by the Federal Arbitration Act (or Oregon law where the FAA does not apply). <strong>BOTH PARTIES WAIVE THE RIGHT TO A JURY TRIAL AND AGREE TO BRING CLAIMS ONLY IN AN INDIVIDUAL CAPACITY — NOT AS A CLASS, COLLECTIVE, OR REPRESENTATIVE ACTION.</strong> Representative PAGA claims, where applicable and to the extent permitted by law, are also waived in favor of individual arbitration, with any non-arbitrable representative portion severed and stayed in court pending individual arbitration.
          </p>
          <p>
            <strong>Optional Pre-Arbitration Negotiation:</strong> Before filing arbitration, either party may send a written dispute notice describing the claim and relief sought for a 30-day informal negotiation window. For non-frivolous claims under $5,000 following informal negotiation, BuckledIn will reimburse filing fees beyond your $50 share, and will pay unique arbitration costs for qualifying Driver claims as required by applicable law.
          </p>
          <p>
            <strong>30-Day Opt-Out Right:</strong> You may opt out of arbitration by sending written notice within 30 days of accepting these Terms (including your full name, address, account email, a clear statement opting out of arbitration, and your signature) by email to <a href="mailto:info@buckledin.com" className="text-brand-600 underline">info@buckledin.com</a> or certified mail to: Legal &amp; Compliance, BuckledIn, 9450 SW Gemini Dr, #63721, Beaverton, Oregon 97008, US.
          </p>

          <h4 className="font-bold text-black text-sm pt-1">13. Driver Requirements, Pricing, Payments &amp; Promotions</h4>
          <p>
            Drivers operating on the BuckledIn Platform must maintain a valid driver&rsquo;s license, required insurance, an approved well-maintained vehicle meeting safety inspection standards, continuous background and motor vehicle record authorization (including prompt self-reporting of any citation or arrest), a working mobile phone, strict adherence to zero-tolerance impairment and safety laws, and required child safety equipment or booster seats in accordance with state law and reasonable accommodation policies.
          </p>
          <p>
            Ride Organizers authorize BuckledIn to charge the designated payment method for all applicable ride fares, tolls, surcharges, and taxes disclosed prior to booking confirmation. Promotional offers and codes are subject to single-use limits and may be modified or ended at any time at BuckledIn&rsquo;s discretion.
          </p>

          <h4 className="font-bold text-black text-sm pt-1">14. Governing Law &amp; Contact</h4>
          <p>
            Except as governed by Section 12, these Terms are governed by the laws of the State of Oregon without regard to conflict-of-law principles. Questions or notices regarding these Terms may be sent to BuckledIn at <a href="mailto:info@buckledin.com" className="text-brand-600 underline">info@buckledin.com</a>, <a href="tel:14582279468" className="text-brand-600 underline">(458) 227-9468</a>, or 9450 SW Gemini Dr, #63721, Beaverton, Oregon 97008, US.
          </p>
        </div>
      ),
    },
    privacy: {
      title: 'Privacy Policy',
      icon: Lock,
      subtitle: 'Last Updated: November 2026 • BuckledIn, Inc.',
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-black/85 font-normal leading-relaxed">
          <p>
            BuckledIn (&ldquo;BuckledIn,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy and is committed to protecting it under this Privacy Policy. This policy explains what information we collect when you use the BuckledIn website, mobile and web applications, and related student transportation coordination services (the &ldquo;BuckledIn Platform&rdquo;), and how we use, disclose, and retain that information.
          </p>

          <h4 className="font-bold text-black text-sm pt-1">1. Changes to This Privacy Policy</h4>
          <p>
            We may update this Privacy Policy periodically. Any updates will be posted on the BuckledIn Platform with an updated effective date, and material changes will be communicated through the Platform or via email using your contact details on file.
          </p>

          <h4 className="font-bold text-black text-sm pt-1">2. Scope &amp; Platform Users</h4>
          <p>
            The BuckledIn Platform enables schools, districts, organizations, and parents or legal guardians (&ldquo;Ride Organizers&rdquo;) to coordinate and monitor transportation services (&ldquo;Services&rdquo;) for eligible students and passengers (&ldquo;Riders&rdquo;) with vetted drivers (&ldquo;Drivers&rdquo;) and partner transportation providers. Authorized parents and guardians (&ldquo;Guardians&rdquo;) may also access the app to track active rides, alongside general visitors to our website and applications.
          </p>

          <h4 className="font-bold text-black text-sm pt-1">3. Information We Collect</h4>
          <p>
            <strong>Information You Provide:</strong> When creating an account or arranging Services, we may collect your full name, email address, phone number, mailing address, optional profile photo, login credentials, billing and payment verification details, emergency contact information, and Driver profile summaries. Ride Organizers may also provide Rider preferences, school schedules, and accommodation notes. For Drivers, consistent with legal and safety requirements, we collect government ID details, vehicle and insurance records, and background/health qualification documentation. We retain support, phone, email, and in-app chat communications (and may record calls where permitted by law). Voluntary survey responses, promotional entries, and public feedback are also collected when submitted.
          </p>
          <p>
            <strong>Information Collected Automatically:</strong> During active use of the Platform, we may collect in-vehicle safety camera video/audio where equipped, trip and transaction details (pickup/drop-off addresses, timestamps, distance, and payment amounts), optional device contacts/calendars if granted permission, app usage and diagnostic logs, IP address, browser/device identifiers, driving telematics (such as braking, cornering, and speed for Drivers), and real-time GPS location. For Drivers, location may be collected in the foreground or background while on duty; for other users, location is collected only while the application is open in the foreground.
          </p>
          <p>
            <strong>Cookies, Analytics &amp; Global Privacy Control:</strong> We use session and persistent cookies, pixels, and analytics tools (such as Google Analytics) to operate, secure, and improve the Platform. You can manage cookies through your browser settings or opt out of targeted sharing where applicable using a Global Privacy Control (GPC) browser signal.
          </p>
          <p>
            <strong>Information From Third Parties:</strong> We may receive background screening, motor vehicle record, drug/alcohol or health compliance verification, insurance, payment processing, referral, or incident-related information from authorized screening vendors, insurance/financial partners, school districts, and public or law enforcement sources.
          </p>

          <h4 className="font-bold text-black text-sm pt-1">4. How We Use Your Data</h4>
          <p>
            We use collected data to: create and manage accounts; match Drivers to Riders, calculate routes and ETAs, process payments, and deliver live trip updates; verify Driver eligibility, prevent fraud, and maintain vehicle and Rider safety (including reviewing dashcam and telematics safety events); provide customer support and in-app chat assistance; improve Platform reliability and develop new features; send operational notices and permitted promotional communications; comply with legal, tax, auditing, and regulatory obligations; and support corporate transactions or de-identified business reporting.
          </p>

          <h4 className="font-bold text-black text-sm pt-1">5. Children&rsquo;s Privacy</h4>
          <p>
            The BuckledIn Platform is not directed to children, and children may not independently create accounts or submit Personal Information directly. Ride Organizers and Guardians may provide necessary Rider details (such as name, optional photo, birthdate, pickup notes, and masked contact numbers) solely to coordinate safe transportation. Drivers only see masked phone numbers when calling or messaging is enabled, never a Rider&rsquo;s actual phone number, and indirect trip location is captured solely via the active Driver&rsquo;s vehicle telemetry.
          </p>

          <h4 className="font-bold text-black text-sm pt-1">6. How We Disclose Information</h4>
          <p>
            We disclose Personal Information only as needed to deliver Services and operate responsibly: between Ride Organizers, Guardians, and assigned Drivers to fulfill rides; with payment processors (such as Stripe) to process payments without BuckledIn storing raw card or bank numbers; with school districts, enterprise partners, and government licensing authorities where required; with authorized background screening, mapping (such as Google Maps), cloud hosting, analytics, insurance, and professional service providers acting under confidentiality obligations; with corporate affiliates or during business restructurings; and when required by law, subpoena, or to protect safety and legal rights.
          </p>

          <h4 className="font-bold text-black text-sm pt-1">7. Data Retention &amp; Security</h4>
          <p>
            We retain account, profile, and trip records for as long as an account remains active and retain ride and payment transaction records for at least seven (7) years for tax, audit, and legal compliance. Driver qualification and background records are retained as required by law. We maintain administrative, technical, and physical safeguards to protect Personal Information, though no digital system can be guaranteed 100% immune from risk. Please use strong passwords and contact us immediately if you suspect unauthorized account access.
          </p>

          <h4 className="font-bold text-black text-sm pt-1">8. Your Privacy Rights &amp; Choices</h4>
          <p>
            Depending on your state of residence, you may have the right to confirm whether we process your Personal Information, access or obtain a portable copy of it, request corrections to inaccurate data, request deletion (subject to legal exemptions), and opt out of targeted advertising or third-party data sharing (including via Global Privacy Control signals). We will verify your identity before fulfilling requests and will not discriminate against you for exercising your privacy rights.
          </p>

          <h4 className="font-bold text-black text-sm pt-1">9. California Residents Privacy Notice</h4>
          <p>
            For California residents under the CCPA/CPRA, BuckledIn collects identifiers, contact and financial details, commercial trip histories, internet/app activity, geolocation, professional/driver qualification records, and limited sensitive personal information solely to provide Services, verify safety, prevent fraud, and meet legal obligations. We do not knowingly sell or share the Personal Information of individuals under 16 years of age, and we do not use sensitive personal information for unrelated purposes. California residents may exercise rights to know, delete, correct, or opt out of sharing (via GPC or direct request) by contacting us as listed below.
          </p>

          <h4 className="font-bold text-black text-sm pt-1">10. Text Message (SMS) Privacy Notice</h4>
          <p>
            If you enroll in SMS/MMS trip or account notifications, we use your phone number solely to deliver mobile messages and respond to you, working with mobile carriers and messaging vendors strictly for message delivery. Text messaging originator opt-in data and consent will not be shared with or sold to third parties or affiliates for marketing purposes.
          </p>

          <h4 className="font-bold text-black text-sm pt-1">11. Third-Party Services</h4>
          <p>
            The BuckledIn Platform may link to third-party websites or services whose privacy practices we do not control. Please review the privacy policies of any external services you visit.
          </p>

          <h4 className="font-bold text-black text-sm pt-1">12. Contact Information</h4>
          <p>
            Questions or privacy rights requests regarding this Privacy Policy may be submitted to BuckledIn by email at <a href="mailto:info@buckledin.com" className="text-brand-600 underline">info@buckledin.com</a>, by phone at <a href="tel:14582279468" className="text-brand-600 underline">(458) 227-9468</a>, or by mail at 9450 SW Gemini Dr, #63721, Beaverton, Oregon 97008, US.
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
            Every BuckledIn vehicle must pass a 19-point mechanical safety inspection. Every driver undergoes continuous DMV license monitoring and multi-jurisdictional background screening.
          </p>
          <p>
            In-app SOS connects directly to both local 911 dispatchers and our dedicated crisis response team during active school hours with GPS coordinates shared instantly.
          </p>
        </div>
      ),
    },
    'driver-terms': {
      title: 'W-2 Driver Employment & Safety Standards',
      icon: FileText,
      subtitle: 'Consistency First • W-2 Employee Model',
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-black font-medium leading-relaxed">
          <p>
            BuckledIn drivers are W-2 employees—never gig-economy contractors—compensated with predictable, scheduled school-route wages rather than variable commissions or gratuities.
          </p>
          <p>
            Every driver completes comprehensive background screening, continuous DMV monitoring, and student-safety training so school districts and families can rely on the same trusted driver every day.
          </p>
        </div>
      ),
    },
  };

  const activeContent = content[type] || content.terms;
  const Icon = activeContent.icon;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      onClick={onClose}
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[85vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h2 id="legal-modal-title" className="text-xl font-extrabold text-black">{activeContent.title}</h2>
              <p className="text-xs text-slate-600 font-medium">{activeContent.subtitle}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 text-black hover:text-brand-600 focus-visible:outline-2 focus-visible:outline-brand-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-2">{activeContent.body}</div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-full font-normal text-xs text-white bg-brand-600 hover:bg-[#0e85ee] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] transition-all duration-200 shadow-md cursor-pointer focus-visible:outline-2 focus-visible:outline-brand-600 focus-visible:outline-offset-2"
          >
            I Understand &amp; Accept
          </button>
        </div>
      </div>
    </div>
  );
}
