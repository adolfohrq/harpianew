import React, { useEffect, useRef, useState, useLayoutEffect, Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { Navbar, Footer, Preloader } from './components';
// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })));
const Services = lazy(() => import('./pages/Services').then((m) => ({ default: m.Services })));
const Packages = lazy(() => import('./pages/Packages').then((m) => ({ default: m.Packages })));
const Contact = lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })));
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })));
import { NAV_LINKS } from './data';
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

  // Removed expensive scroll listener for noise opacity to improve performance
  // The CSS animation is sufficient for the effect

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
            <Suspense
              fallback={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="animate-pulse text-white text-xl tracking-widest">
                    Carregando...
                  </div>
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/servicos" element={<Services />} />
                <Route path="/pacotes" element={<Packages />} />
                <Route path="/contato" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
        </div>

        {/* Fixed Footer sitting behind the content */}
        <div ref={footerRef} className="fixed bottom-0 left-0 w-full z-0">
          <Footer />
        </div>

        {/* Floating CTA Button */}
        <Link
          to="/contato"
          className="fixed bottom-8 right-8 z-50 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white hover:bg-white hover:text-black transition-all duration-500 shadow-2xl hover:shadow-white/20 group"
          aria-label="Fale Conosco"
        >
          <Send
            size={24}
            strokeWidth={1.5}
            className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300"
          />
        </Link>
      </div>
    </Router>
  );
};

export default App;
