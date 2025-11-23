import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Reveal } from './Reveal';

export const Hero: React.FC = () => {
  const parallaxRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let rafId: number;
    let isInView = false;

    // Use IntersectionObserver to only animate when hero is in viewport
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        isInView = entries[0].isIntersecting;
      },
      { threshold: 0 }
    );

    if (parallaxRef.current) {
      intersectionObserver.observe(parallaxRef.current);
    }

    const handleScroll = () => {
      // Only run parallax when hero is visible
      if (isInView && parallaxRef.current) {
        const scrollPosition = window.scrollY;
        // Use requestAnimationFrame for smooth performance
        rafId = requestAnimationFrame(() => {
          if (parallaxRef.current) {
            parallaxRef.current.style.transform = `translateY(${scrollPosition * 0.5}px) scale(1.1)`;
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial positioning

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-harpia-gray/20 via-harpia-black to-harpia-black">
        <video
          ref={parallaxRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1280 720'%3E%3Crect fill='%23050505' width='1280' height='720'/%3E%3Crect fill='%23121212' x='100' y='100' width='1080' height='520'/%3E%3C/svg%3E"
          className="w-full h-full object-cover opacity-40 grayscale contrast-150 will-change-transform"
          style={{ transform: 'scale(1.1)' }}
          onError={(e) => {
            console.warn('Video failed to load, using fallback background');
            (e.target as HTMLVideoElement).style.display = 'none';
          }}
        >
          <source
            src="https://cdn.pixabay.com/video/2024/02/09/199958-911694865_large.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-harpia-black/60 via-transparent to-harpia-black" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <Reveal>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight mb-8 tracking-wide">
            ENXERGUE <span className="italic text-gray-400">MAIS LONGE.</span>
            <br />
            VOE <span className="italic text-gray-400">MAIS ALTO.</span>
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="font-sans font-light text-lg md:text-xl text-harpia-white max-w-2xl mx-auto mb-12 leading-relaxed">
            Somos uma equipe apaixonada e dedicada, especializada em criar pontes entre empresas e
            seus clientes. Nossa missão é simples: conectar você ao seu público-alvo de maneira
            significativa e impactante.
          </p>
        </Reveal>

        <Reveal delay={400}>
          <Link
            to="/servicos"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-harpia-accent text-harpia-black font-sans font-semibold tracking-widest uppercase text-sm hover:bg-harpia-white transition-colors focus:outline-none focus:ring-2 focus:ring-harpia-gray focus:ring-offset-2 focus:ring-offset-harpia-black"
          >
            Conheça Nossos Serviços
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
};
