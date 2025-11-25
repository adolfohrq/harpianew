import React, { useEffect, useRef, useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar, Footer, Preloader } from './components';
import { PageSkeleton } from './components/ui';
// Lazy load pages for better performance
const {
  Home,
  Services,
  Contact,
  AboutPage,
  Portfolio,
  PortfolioDetail,
  VisualGovernance,
  Privacy,
  Terms,
  NotFound,
} = {
  Home: lazy(() => import('./pages/Home').then((m) => ({ default: m.Home }))),
  Services: lazy(() => import('./pages/Services').then((m) => ({ default: m.Services }))),
  Contact: lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact }))),
  AboutPage: lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage }))),
  Portfolio: lazy(() => import('./pages/Portfolio').then((m) => ({ default: m.Portfolio }))),
  PortfolioDetail: lazy(() =>
    import('./pages/PortfolioDetail').then((m) => ({ default: m.PortfolioDetail }))
  ),
  VisualGovernance: lazy(() =>
    import('./pages/VisualGovernance').then((m) => ({ default: m.VisualGovernance }))
  ),
  Privacy: lazy(() => import('./pages/Privacy').then((m) => ({ default: m.Privacy }))),
  Terms: lazy(() => import('./pages/Terms').then((m) => ({ default: m.Terms }))),
  NotFound: lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound }))),
};
import { NAV_LINKS } from './data';
import { ArrowUp } from 'lucide-react';

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

        {/* Skip Link para acessibilidade */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-white focus:text-harpia-black focus:rounded-md focus:outline-none"
        >
          Pular para o conteúdo principal
        </a>

        <Navbar links={NAV_LINKS} />

        {/* Main Content */}
        <main id="main-content" role="main" aria-label="Conteúdo principal" className="relative">
          <Suspense fallback={<PageSkeleton />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/servicos" element={<Services />} />
              <Route path="/sobre" element={<AboutPage />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/portfolio/:slug" element={<PortfolioDetail />} />
              <Route path="/visual-governance" element={<VisualGovernance />} />
              <Route path="/contato" element={<Contact />} />
              <Route path="/privacidade" element={<Privacy />} />
              <Route path="/termos" element={<Terms />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>

        {/* Footer - Normal flow */}
        <Footer />

        {/* Back to Top Button */}
        <BackToTopButton />
      </div>
    </Router>
  );
};

// Back to Top Button Component
const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 p-3 bg-harpia-black text-white border border-harpia-gray rounded-full hover:bg-white hover:text-harpia-black hover:border-white transition-all duration-500 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_4px_25px_rgba(0,0,0,0.5)] group ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-label="Voltar ao topo"
    >
      <ArrowUp
        size={20}
        strokeWidth={2}
        className="group-hover:-translate-y-0.5 transition-transform duration-300"
      />
    </button>
  );
};

export default App;
