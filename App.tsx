import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { Packages } from './pages/Packages';
import { Contact } from './pages/Contact';
import { Preloader } from './components/Preloader';
import { NAV_LINKS } from './constants';
import { Send } from 'lucide-react';

// Helper component to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const noiseRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const [footerHeight, setFooterHeight] = useState(0);

  // Calculate footer height to apply proper margin to the content
  useLayoutEffect(() => {
    const updateHeight = () => {
      if (footerRef.current) {
        setFooterHeight(footerRef.current.offsetHeight);
      }
    };

    window.addEventListener('resize', updateHeight);
    
    // Initial check and a slightly delayed check to account for font loading/layout shifts
    updateHeight();
    const timer = setTimeout(updateHeight, 100);

    return () => {
      window.removeEventListener('resize', updateHeight);
      clearTimeout(timer);
    };
  }, []);

  // Handle Dynamic Noise Opacity based on Scroll Speed
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const handleScroll = () => {
      if (!noiseRef.current) return;

      const currentScroll = window.scrollY;
      const diff = Math.abs(currentScroll - lastScrollY.current);
      
      // Calculate opacity boost based on speed
      // Base opacity is 0.04. We add up to 0.12 based on speed.
      // Sensitivity factor: 400 (Lower = more sensitive)
      const boost = Math.min(diff / 400, 0.12);
      const newOpacity = 0.04 + boost;

      noiseRef.current.style.opacity = newOpacity.toFixed(3);
      lastScrollY.current = currentScroll;

      // Reset to base opacity when scroll stops
      if (timeoutId) clearTimeout(timeoutId);
      
      timeoutId = setTimeout(() => {
        if (noiseRef.current) {
          noiseRef.current.style.opacity = '0.04';
        }
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <Router>
      <Preloader />
      <ScrollToTop />
      <div className="min-h-screen bg-harpia-black text-white font-sans selection:bg-white selection:text-black">
        
        {/* Global Animated Grain Overlay */}
        <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
          <div 
            ref={noiseRef}
            className="absolute -top-[100%] -left-[100%] w-[300%] h-[300%] bg-noise opacity-[0.04] animate-noise transition-opacity duration-150 ease-out will-change-opacity"
          ></div>
        </div>

        <Navbar links={NAV_LINKS} />
        
        {/* 
          Reveal Footer Implementation:
          1. The Main Content is relative, z-10, and has a background color (the curtain).
          2. It has a bottom margin equal to the footer height.
          3. The Footer is fixed, z-0, sitting behind the content.
        */}
        <div 
          className="relative z-10 bg-harpia-black shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          style={{ marginBottom: `${footerHeight}px` }}
        >
          {/* 
            Added rounded-b-3xl to create a subtle "card" effect when the footer reveals,
            enhancing the 3D depth perception.
          */}
          <main className="relative bg-harpia-black rounded-b-[2rem] overflow-hidden">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/servicos" element={<Services />} />
              <Route path="/pacotes" element={<Packages />} />
              <Route path="/contato" element={<Contact />} />
            </Routes>
          </main>
        </div>

        {/* Fixed Footer sitting behind the content */}
        <div 
          ref={footerRef}
          className="fixed bottom-0 left-0 w-full z-0"
        >
          <Footer />
        </div>

        {/* Floating CTA Button */}
        <Link 
          to="/contato"
          className="fixed bottom-8 right-8 z-50 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white hover:bg-white hover:text-black transition-all duration-500 shadow-2xl hover:shadow-white/20 group"
          aria-label="Fale Conosco"
        >
          <Send size={24} strokeWidth={1.5} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </Router>
  );
};

export default App;