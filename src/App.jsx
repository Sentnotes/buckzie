import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InteractiveShowcase from './components/InteractiveShowcase';
import DriversSection from './components/DriversSection';
import FamiliesSection from './components/FamiliesSection';
import AboutSection from './components/AboutSection';
import AboutPage from './components/AboutPage';
import FamiliesPage from './components/FamiliesPage';
import DriversPage from './components/DriversPage';
import SchoolsPage from './components/SchoolsPage';
import CareersPage from './components/CareersPage';
import Footer from './components/Footer';
import RideSimulationModal from './components/RideSimulationModal';
import LegalModal from './components/LegalModal';

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'schools' | 'about' | 'families' | 'drivers' | 'careers'
  const [aboutTab, setAboutTab] = useState('who-we-are'); // 'who-we-are' | 'careers' | 'newsletters'
  const [activeSection, setActiveSection] = useState('home');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [legalModalState, setLegalModalState] = useState({ isOpen: false, type: 'terms' });

  const handleNavigate = (target) => {
    if (target === 'careers') {
      setAboutTab('careers');
      setCurrentView('about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (target === 'newsletters') {
      setAboutTab('newsletters');
      setCurrentView('about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (target === 'schools') {
      setCurrentView('schools');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (target === 'drivers') {
      setCurrentView('drivers');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (target === 'families') {
      setCurrentView('families');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (target === 'about') {
      setAboutTab('who-we-are');
      setCurrentView('about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (target === 'home') {
      setCurrentView('home');
      setActiveSection('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Generic fallback for any other anchor/section
    setActiveSection(target);
    if (currentView !== 'home') {
      setCurrentView('home');
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

  const handleOpenFullAbout = () => {
    setAboutTab('who-we-are');
    setCurrentView('about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenFullSchools = () => {
    setCurrentView('schools');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenFullFamilies = () => {
    setCurrentView('families');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenFullDrivers = () => {
    setCurrentView('drivers');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartBooking = (data) => {
    setBookingDetails(data);
    setIsBookingModalOpen(true);
  };

  const handleOpenLegal = (type) => {
    setLegalModalState({ isOpen: true, type });
  };

  return (
    <div className="min-h-screen bg-white text-black selection:bg-brand-500 selection:text-white flex flex-col justify-between">
      {/* Pill-shaped Glassmorphic Navbar */}
      <Navbar
        currentView={currentView}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onBackToHome={() => handleNavigate('home')}
        onOpenBookingModal={() => {
          setBookingDetails({
            pickup: 'Current Location (742 Evergreen Terr.)',
            destination: 'Metropolitan Arts Center',
            rideType: {
              name: 'BuckledIn Comfort',
              price: '$24.50',
              eta: '4 min',
            },
          });
          setIsBookingModalOpen(true);
        }}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {currentView === 'about' ? (
          /* Dedicated Full About Page with Hero Pill Tabs (Who We Are | Careers | Newsletters) */
          <AboutPage
            initialTab={aboutTab}
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
        ) : currentView === 'careers' ? (
          /* Dedicated Full Careers Page */
          <CareersPage onBackToHome={() => handleNavigate('home')} />
        ) : (
          /* Standard Homepage View */
          <>
            {/* Home Tab / Hero Section with Interactive Ride Request Widget */}
            <Hero
              onStartBooking={handleStartBooking}
              onSelectRide={() => {}}
            />

            {/* Tailored Programs / Schools Section on Home Page with Read More button */}
            <InteractiveShowcase onOpenFullSchools={handleOpenFullSchools} />

            {/* Drivers Tab / Section */}
            <DriversSection onOpenFullDrivers={handleOpenFullDrivers} />

            {/* Families Tab / Section */}
            <FamiliesSection
              onOpenFullProgram={handleOpenFullFamilies}
              onBookFamilyRide={() => {
                setBookingDetails({
                  pickup: 'Home (742 Evergreen Terr.)',
                  destination: 'Lincoln Elementary School',
                  rideType: {
                    name: 'Family XL',
                    price: '$32.00',
                    eta: '6 min',
                  },
                  childSeat: 'booster',
                });
                setIsBookingModalOpen(true);
              }}
            />

            {/* About Tab / Teaser Section (1/3 of text + Read Our Full Story Pill + FAQ) */}
            <AboutSection
              onOpenFullAbout={handleOpenFullAbout}
            />
          </>
        )}
      </main>

      {/* Deep Black Footer with Contact Us, Terms & Conditions, Privacy Policy */}
      <Footer
        onNavigate={handleNavigate}
        onOpenLegalModal={handleOpenLegal}
      />

      {/* Live Ride Simulation Dialog */}
      <RideSimulationModal
        isOpen={isBookingModalOpen}
        bookingData={bookingDetails}
        onClose={() => setIsBookingModalOpen(false)}
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
