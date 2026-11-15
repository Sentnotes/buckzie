import React, { useState, useEffect, useRef } from 'react';
import { X, ArrowRight, ChevronRight, GraduationCap, Car, ShieldCheck, Compass } from 'lucide-react';

export default function Navbar({
  currentView = 'home',
  activeSection,
  onNavigate,
  onOpenBookingModal,
  onBackToHome
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDesktopHovered, setIsDesktopHovered] = useState(false);
  const [isLockedCollapsed, setIsLockedCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleLock = () => {
      setIsLockedCollapsed(true);
      setIsDesktopHovered(false);
    };
    const handleUnlock = () => {
      setIsLockedCollapsed(false);
    };
    window.addEventListener('lockNavbarCollapsed', handleLock);
    window.addEventListener('unlockNavbarCollapsed', handleUnlock);
    return () => {
      window.removeEventListener('lockNavbarCollapsed', handleLock);
      window.removeEventListener('unlockNavbarCollapsed', handleUnlock);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      setIsScrolled(currentY > 20);

      // Always keep expanded near the top of the page
      if (currentY < 60) {
        setIsCollapsed(false);
      } else if (delta > 8 && currentY > 90) {
        // Scrolling down -> smoothly collapse into centered squircle
        setIsCollapsed(true);
      } else if (delta < -6) {
        // Scrolling up -> smoothly zoom out into full pill
        setIsCollapsed(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Desktop morph state: expands if user scrolls up OR hovers over the collapsed squircle
  // BUT if isLockedCollapsed is true (e.g. modal overlay open), stay strictly collapsed and DO NOT expand
  const showDesktopCollapsed = isLockedCollapsed || (isCollapsed && !isDesktopHovered);

  // Uniform navigation items across all pages
  const navItems = [
    {
      id: 'schools',
      label: 'Schools',
      desc: 'District routes & IEPs',
      icon: GraduationCap,
    },
    {
      id: 'drivers',
      label: 'Drivers',
      desc: 'Careers & steady pay',
      icon: Car,
    },
    {
      id: 'families',
      label: 'Families',
      desc: 'Parent app & safety',
      icon: ShieldCheck,
    },
    {
      id: 'about',
      label: 'About',
      desc: '29-yr history & values',
      icon: Compass,
    },
  ];

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  // Determine active nav item: on subpages it's the current view, on home it's activeSection
  const currentActiveId =
    currentView === 'home'
      ? activeSection
      : currentView;

  return (
    <>
      {/* Mobile Backdrop Overlay when Menu is Open */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-[95] md:hidden bg-black/25 backdrop-blur-[2px] transition-opacity duration-300 animate-in fade-in cursor-pointer"
          aria-hidden="true"
        />
      )}

      {/* Sticky Floating Header Container */}
      <header className="fixed top-3 sm:top-5 left-0 right-0 z-[100] flex justify-center px-3 sm:px-4 pointer-events-none transition-all duration-300">
        {/* ── Desktop Header Bar (md and up) — Collapses to Centered Squircle on Scroll Down ── */}
        <nav
          onMouseEnter={() => {
            if (!isLockedCollapsed) setIsDesktopHovered(true);
          }}
          onMouseLeave={() => setIsDesktopHovered(false)}
          className={`hidden md:flex pointer-events-auto w-full items-center overflow-hidden ${
            showDesktopCollapsed
              ? 'justify-center max-w-[126px] rounded-[22px] bg-white/85 border border-white/75 shadow-[0_14px_38px_0_rgba(0,0,0,0.12),0_1px_1px_0_rgba(255,255,255,0.95)_inset] py-2 px-3 ring-1 ring-black/5 scale-[0.97]'
              : isScrolled
              ? 'justify-between max-w-5xl rounded-[999px] bg-white/75 border border-white/60 shadow-[0_12px_40px_0_rgba(0,0,0,0.10),0_1px_1px_0_rgba(255,255,255,0.9)_inset] py-2 sm:py-2.5 px-4 md:px-6 ring-1 ring-black/5 scale-100'
              : 'justify-between max-w-5xl rounded-[999px] bg-white/65 border border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.08),0_1px_1px_0_rgba(255,255,255,0.95)_inset] py-2.5 sm:py-3 px-4 md:px-7 ring-1 ring-black/5 scale-100'
          }`}
          style={{
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            backdropFilter: 'blur(20px) saturate(180%)',
            transition: 'all 780ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {/* Brand Logo - Always Returns Home & Centers Smoothly When Collapsed */}
          <button
            onClick={() => {
              if (currentView !== 'home' && onBackToHome) {
                onBackToHome();
              } else {
                handleNavClick('home');
              }
            }}
            className="flex items-center justify-center group focus:outline-none cursor-pointer flex-shrink-0"
            aria-label="BuckledIn Home"
          >
            <img
              src="/logo/buckledin-logo.webp"
              alt="BuckledIn"
              className="h-9 sm:h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-200"
            />
          </button>

          {/* Desktop Navigation Tabs - Glassmorphic inner pill */}
          <div
            className={`hidden md:flex items-center space-x-1 bg-black/[0.04] rounded-full border border-black/[0.04] shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] whitespace-nowrap overflow-hidden flex-shrink-0 ${
              showDesktopCollapsed
                ? 'max-w-0 opacity-0 scale-90 p-0 border-0 pointer-events-none'
                : 'max-w-[440px] opacity-100 scale-100 p-1.5'
            }`}
            style={{
              WebkitBackdropFilter: 'blur(12px)',
              backdropFilter: 'blur(12px)',
              transition: 'all 750ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {navItems.map((item) => {
              const isActive = currentActiveId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-1.5 text-sm font-normal rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-white/90 text-brand-600 shadow-sm border border-white/80'
                      : 'text-slate-800 hover:text-black hover:bg-white/50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Action Buttons (Uniform across all pages) */}
          <div
            className={`hidden md:flex items-center space-x-3 whitespace-nowrap overflow-hidden flex-shrink-0 ${
              showDesktopCollapsed
                ? 'max-w-0 opacity-0 scale-90 pointer-events-none'
                : 'max-w-[340px] opacity-100 scale-100'
            }`}
            style={{
              transition: 'all 750ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <button
              onClick={() => handleNavClick('drivers')}
              className="text-sm font-normal text-slate-800 hover:text-brand-600 px-3 py-1.5 rounded-full hover:bg-black/[0.03] transition-colors cursor-pointer whitespace-nowrap"
            >
              Sign Up to Drive
            </button>
            <button
              onClick={onOpenBookingModal}
              className="group relative inline-flex items-center space-x-2 px-5 py-2 text-sm font-normal text-white bg-brand-600 hover:bg-brand-700 rounded-full shadow-md shadow-brand-500/25 active:scale-[0.98] transition-all duration-200 cursor-pointer whitespace-nowrap"
            >
              <span>Book a Ride</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </nav>

        {/* ── Mobile Morphing Navigation (< md) ────────────────────── */}
        <div className="md:hidden flex flex-col items-center w-full">
          {/* Top Floating Pill: Stretches gracefully to match the dropdown card width */}
          <div
            className={`pointer-events-auto transition-all duration-300 ease-out flex items-center justify-between rounded-full ${
              mobileMenuOpen
                ? 'w-[calc(100vw-2rem)] max-w-sm px-2.5 py-1.5 bg-white/95 border border-white/80 shadow-[0_12px_36px_rgba(0,0,0,0.12)] ring-1 ring-black/5'
                : 'w-36 px-2.5 py-1.5 bg-white/80 border border-white/60 shadow-[0_8px_25px_rgba(0,0,0,0.10)] ring-1 ring-black/5'
            }`}
            style={{
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              backdropFilter: 'blur(24px) saturate(180%)',
            }}
          >
            {/* Left: Brand Logo Button */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (currentView !== 'home' && onBackToHome) {
                  onBackToHome();
                } else {
                  handleNavClick('home');
                }
              }}
              className="flex items-center focus:outline-none cursor-pointer group flex-shrink-0 pl-1"
              aria-label="BuckledIn Home"
            >
              <img
                src="/logo/buckledin-logo.webp"
                alt="BuckledIn"
                className="h-8 w-auto object-contain group-hover:scale-105 transition-transform duration-200"
              />
            </button>

            {/* Right: Hamburger (=) when closed, Close (X) when open */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 active:scale-90 transition-all cursor-pointer flex-shrink-0"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-black stroke-[2.2]" />
              ) : (
                <div className="flex flex-col space-y-1.5 justify-center items-center">
                  <span className="w-5 h-0.5 bg-black rounded-full" />
                  <span className="w-5 h-0.5 bg-black rounded-full" />
                </div>
              )}
            </button>
          </div>

          {/* Separate Dropdown Options Card with Centered Typography */}
          {mobileMenuOpen && (
            <div
              className="pointer-events-auto mt-2.5 w-[calc(100vw-2rem)] max-w-sm rounded-3xl bg-white/95 border border-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.18)] p-3.5 sm:p-4 ring-1 ring-black/5 animate-in fade-in slide-in-from-top-3 duration-200 overflow-hidden"
              style={{
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                backdropFilter: 'blur(24px) saturate(180%)',
              }}
            >
              {/* Option 2: Apple-Style Clean Centered Typography */}
              <div className="py-2 space-y-1 flex flex-col items-center">
                {navItems.map((item) => {
                  const isActive = currentActiveId === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full py-2.5 px-4 rounded-2xl transition-all duration-200 cursor-pointer flex items-center justify-center space-x-2 group active:scale-[0.98] ${
                        isActive
                          ? 'bg-brand-50/90 text-brand-600'
                          : 'text-slate-800 hover:text-black hover:bg-black/[0.03]'
                      }`}
                    >
                      <span
                        className={`text-xl tracking-tight ${
                          isActive ? 'font-medium text-brand-600' : 'font-normal text-slate-800'
                        }`}
                      >
                        {item.label}
                      </span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-brand-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons: Clean Apple-Style Centered Side-by-Side Pills */}
              <div className="pt-3 mt-2 border-t border-black/[0.06] flex items-center justify-center gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBookingModal();
                  }}
                  className="flex-1 py-2.5 px-3 rounded-full font-normal text-center text-white bg-brand-600 hover:bg-brand-700 shadow-sm cursor-pointer text-xs sm:text-sm active:scale-98 transition-all flex items-center justify-center space-x-1.5 whitespace-nowrap"
                >
                  <span>Book a Ride</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleNavClick('drivers')}
                  className="flex-1 py-2.5 px-3 rounded-full font-normal text-slate-800 bg-black/[0.04] hover:bg-black/[0.07] border border-black/[0.06] text-center cursor-pointer text-xs sm:text-sm active:scale-98 transition-all whitespace-nowrap"
                >
                  Drive with Us
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
