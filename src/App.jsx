import React, { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InteractiveShowcase from './components/InteractiveShowcase';
import DriversSection from './components/DriversSection';
import FamiliesSection from './components/FamiliesSection';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import PartnerModal from './components/PartnerModal';
import LegalModal from './components/LegalModal';

const AboutPage = lazy(() => import('./components/AboutPage'));
const FamiliesPage = lazy(() => import('./components/FamiliesPage'));
const DriversPage = lazy(() => import('./components/DriversPage'));
const SchoolsPage = lazy(() => import('./components/SchoolsPage'));

const ROUTE_MAP = {
  '/': {
    view: 'home',
    aboutTab: 'who-we-are',
    title: 'BuckledIn | Alternative Safe and Reliable Student Transportation',
  },
  '/schools': {
    view: 'schools',
    aboutTab: 'who-we-are',
    title: 'Schools & Districts | BuckledIn',
  },
  '/families': {
    view: 'families',
    aboutTab: 'who-we-are',
    title: 'Families & Guardians | BuckledIn',
  },
  '/drivers': {
    view: 'drivers',
    aboutTab: 'who-we-are',
    title: 'Drive With Us | BuckledIn',
  },
  '/about': {
    view: 'about',
    aboutTab: 'who-we-are',
    title: 'About Us | BuckledIn',
  },
  '/careers': {
    view: 'about',
    aboutTab: 'careers',
    title: 'Careers | BuckledIn',
  },
  '/newsletters': {
    view: 'about',
    aboutTab: 'newsletters',
    title: 'Newsletters | BuckledIn',
  },
};

function parseRoute(pathname) {
  const normalized = pathname.replace(/\/+$/, '').toLowerCase() || '/';
  return ROUTE_MAP[normalized] || ROUTE_MAP['/'];
}

function getPathForRoute(view, aboutTab = 'who-we-are') {
  if (view === 'schools') return '/schools';
  if (view === 'families') return '/families';
  if (view === 'drivers') return '/drivers';
  if (view === 'about') {
    if (aboutTab === 'careers') return '/careers';
    if (aboutTab === 'newsletters') return '/newsletters';
    return '/about';
  }
  return '/';
}

export default function App() {
  const initialRoute = parseRoute(window.location.pathname);
  const [currentView, setCurrentView] = useState(initialRoute.view); // 'home' | 'schools' | 'about' | 'families' | 'drivers'
  const [aboutTab, setAboutTab] = useState(initialRoute.aboutTab); // 'who-we-are' | 'careers' | 'newsletters'
  const [activeSection, setActiveSection] = useState('home');
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [legalModalState, setLegalModalState] = useState({ isOpen: false, type: 'terms' });

  const syncUrl = (nextView, nextAboutTab = 'who-we-are') => {
    const nextPath = getPathForRoute(nextView, nextAboutTab);
    if (window.location.pathname !== nextPath) {
      window.history.pushState({ view: nextView, aboutTab: nextAboutTab }, '', nextPath);
    }
  };

  useEffect(() => {
    const routePath = getPathForRoute(currentView, aboutTab);
    const meta = ROUTE_MAP[routePath] || ROUTE_MAP['/'];
    document.title = meta.title;
  }, [currentView, aboutTab]);

  useEffect(() => {
    const handlePopState = () => {
      const route = parseRoute(window.location.pathname);
      setCurrentView(route.view);
      setAboutTab(route.aboutTab);
      if (route.view === 'home') {
        setActiveSection('home');
      }
      window.scrollTo({ top: 0, behavior: 'auto' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (target) => {
    if (target === 'careers') {
      setAboutTab('careers');
      setCurrentView('about');
      syncUrl('about', 'careers');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (target === 'newsletters') {
      setAboutTab('newsletters');
      setCurrentView('about');
      syncUrl('about', 'newsletters');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (target === 'schools') {
      setCurrentView('schools');
      syncUrl('schools');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (target === 'drivers') {
      setCurrentView('drivers');
      syncUrl('drivers');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (target === 'families') {
      setCurrentView('families');
      syncUrl('families');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (target === 'about') {
      setAboutTab('who-we-are');
      setCurrentView('about');
      syncUrl('about', 'who-we-are');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (target === 'home') {
      setCurrentView('home');
      setActiveSection('home');
      syncUrl('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Generic fallback for any other anchor/section
    setActiveSection(target);
    if (currentView !== 'home') {
      setCurrentView('home');
      syncUrl('home');
      setTimeout(() => {
        const element = document.getElementById(target);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 50);
    } else {
      const element = document.getElementById(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleAboutTabChange = (nextTab) => {
    setAboutTab(nextTab);
    syncUrl('about', nextTab);
  };

  const handleOpenFullAbout = () => handleNavigate('about');
  const handleOpenFullSchools = () => handleNavigate('schools');
  const handleOpenFullFamilies = () => handleNavigate('families');
  const handleOpenFullDrivers = () => handleNavigate('drivers');

  const handleOpenPartnerModal = () => {
    setIsPartnerModalOpen(true);
  };

  const handleOpenLegal = (type) => {
    setLegalModalState({ isOpen: true, type });
  };

  return (
    <div className="min-h-screen bg-white text-black selection:bg-brand-500 selection:text-white flex flex-col justify-between">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[120] focus:px-4 focus:py-2 focus:rounded-full focus:bg-brand-600 focus:text-white focus:text-sm focus:font-medium focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* Pill-shaped Glassmorphic Navbar */}
      <Navbar
        currentView={currentView}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onBackToHome={() => handleNavigate('home')}
        onOpenBookingModal={handleOpenPartnerModal}
      />

      {/* Main Content Area */}
      <main id="main-content" className="flex-grow">
        <Suspense
          fallback={
            <div className="min-h-[60vh] flex items-center justify-center bg-white">
              <div className="w-8 h-8 rounded-full border-2 border-slate-200 border-t-brand-600 animate-spin" aria-label="Loading page" />
            </div>
          }
        >
        {currentView === 'about' ? (
          /* Dedicated Full About Page with Hero Pill Tabs (Who We Are | Careers | Newsletters) */
          <AboutPage
            initialTab={aboutTab}
            onTabChange={handleAboutTabChange}
            onBackToHome={() => handleNavigate('home')}
          />
        ) : currentView === 'schools' ? (
          /* Dedicated Full Schools & Districts Page */
          <SchoolsPage onBackToHome={() => handleNavigate('home')} />
        ) : currentView === 'families' ? (
          /* Dedicated Full Families / How Our Program Works Page */
          <FamiliesPage onBackToHome={() => handleNavigate('home')} />
        ) : currentView === 'drivers' ? (
          /* Dedicated Full Drivers Page */
          <DriversPage onBackToHome={() => handleNavigate('home')} />
        ) : (
          /* Standard Homepage View */
          <>
            {/* Home Tab / Hero Section */}
            <Hero
              onStartBooking={handleOpenPartnerModal}
              onSelectRide={() => {}}
            />

            {/* Tailored Programs / Schools Section on Home Page with Read More button */}
            <InteractiveShowcase onOpenFullSchools={handleOpenFullSchools} />

            {/* Drivers Tab / Section */}
            <DriversSection onOpenFullDrivers={handleOpenFullDrivers} />

            {/* Families Tab / Section */}
            <FamiliesSection
              onOpenFullProgram={handleOpenFullFamilies}
              onBookFamilyRide={handleOpenPartnerModal}
            />

            {/* About Tab / Teaser Section (1/3 of text + Read Our Full Story Pill + FAQ) */}
            <AboutSection
              onOpenFullAbout={handleOpenFullAbout}
            />
          </>
        )}
        </Suspense>
      </main>

      {/* Deep Black Footer with Contact Us, Terms & Conditions, Privacy Policy */}
      <Footer
        onNavigate={handleNavigate}
        onOpenLegalModal={handleOpenLegal}
      />

      {/* District Partnership & Family Guidance Modal */}
      <PartnerModal
        isOpen={isPartnerModalOpen}
        onClose={() => setIsPartnerModalOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Terms & Conditions / Privacy Policy / Safety Modal */}
      <LegalModal
        isOpen={legalModalState.isOpen}
        type={legalModalState.type}
        onClose={() => setLegalModalState({ isOpen: false, type: 'terms' })}
      />
    </div>
  );
}
