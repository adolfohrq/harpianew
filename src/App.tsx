import React, { useEffect, useRef, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { Navbar, Footer, Preloader } from './components';
// Lazy load pages for better performance
const {
  Home,
  Services,
  Packages,
  Contact,
  AboutPage,
  Portfolio,
  PortfolioDetail,
  VisualGovernance,
  NotFound,
} = {
  Home: lazy(() => import('./pages/Home').then((m) => ({ default: m.Home }))),
  Services: lazy(() => import('./pages/Services').then((m) => ({ default: m.Services }))),
  Packages: lazy(() => import('./pages/Packages').then((m) => ({ default: m.Packages }))),
  Contact: lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact }))),
  AboutPage: lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage }))),
  Portfolio: lazy(() => import('./pages/Portfolio').then((m) => ({ default: m.Portfolio }))),
  PortfolioDetail: lazy(() =>
    import('./pages/PortfolioDetail').then((m) => ({ default: m.PortfolioDetail }))
  ),
  VisualGovernance: lazy(() =>
    import('./pages/VisualGovernance').then((m) => ({ default: m.VisualGovernance }))
  ),
  NotFound: lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound }))),
};
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
  const noiseRef = useRef<HTMLDivElement>(null);

  return (
    <Router>
      <Preloader />
      <ScrollToTop />
      <div className="min-h-screen bg-harpia-black text-white font-sans">
        {/* Global Animated Grain Overlay */}
        <div className="fixed inset-0 z-9999 pointer-events-none overflow-hidden">
          <div
            ref={noiseRef}
            className="absolute -top-full -left-full w-[300%] h-[300%] bg-noise opacity-[0.04] animate-noise transition-opacity duration-150 ease-out will-change-opacity"
          ></div>
        </div>

        <Navbar links={NAV_LINKS} />

        {/* Main Content */}
        <main className="relative">
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
              <Route path="/sobre" element={<AboutPage />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/portfolio/:slug" element={<PortfolioDetail />} />
              <Route path="/visual-governance" element={<VisualGovernance />} />
              <Route path="/contato" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>

        {/* Footer - Normal flow */}
        <Footer />

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
