import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { Reveal } from './Reveal';

export const Hero: React.FC = () => {
  const parallaxRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let rafId: number;
    let isInView = false;

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
      if (isInView && parallaxRef.current) {
        const scrollPosition = window.scrollY;
        rafId = requestAnimationFrame(() => {
          if (parallaxRef.current) {
            parallaxRef.current.style.transform = `translateY(${scrollPosition * 0.3}px) scale(1.1)`;
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-harpia-black">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={parallaxRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1280 720'%3E%3Crect fill='%23191919' width='1280' height='720'/%3E%3C/svg%3E"
          className="w-full h-full object-cover opacity-30 grayscale will-change-transform"
          style={{ transform: 'scale(1.1)' }}
          onError={(e) => {
            (e.target as HTMLVideoElement).style.display = 'none';
          }}
        >
          <source
            src="https://cdn.pixabay.com/video/2024/02/09/199958-911694865_large.mp4"
            type="video/mp4"
          />
        </video>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-linear-to-b from-harpia-black via-harpia-black/40 to-harpia-black" />
        <div className="absolute inset-0 bg-linear-to-r from-harpia-black/60 via-transparent to-harpia-black/60" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-harpia-gray/10 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-harpia-gray/5 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Corner accents */}
        <div className="absolute top-32 left-12 w-px h-24 bg-linear-to-b from-white/20 to-transparent hidden lg:block" />
        <div className="absolute top-32 left-12 w-24 h-px bg-linear-to-r from-white/20 to-transparent hidden lg:block" />
        <div className="absolute bottom-32 right-12 w-px h-24 bg-linear-to-t from-white/20 to-transparent hidden lg:block" />
        <div className="absolute bottom-32 right-12 w-24 h-px bg-linear-to-l from-white/20 to-transparent hidden lg:block" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <Reveal>
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-px bg-linear-to-r from-transparent to-white/30" />
            <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/40 font-medium">
              Agência de Marketing Digital
            </span>
            <div className="w-12 h-px bg-linear-to-l from-transparent to-white/30" />
          </div>
        </Reveal>

        {/* Main Headline */}
        <Reveal delay={0.1}>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[0.95] mb-6">
            <span className="block">ENXERGUE</span>
            <span className="block italic text-white/40">MAIS LONGE.</span>
            <span className="block mt-1">VOE</span>
            <span className="block italic text-white/40">MAIS ALTO.</span>
          </h1>
        </Reveal>

        {/* Description */}
        <Reveal delay={0.2}>
          <p className="font-sans text-white/50 text-sm md:text-base max-w-xl mx-auto mb-10 leading-relaxed">
            Conectamos sua marca ao público certo com estratégias digitais que transformam visão em
            resultados extraordinários.
          </p>
        </Reveal>

        {/* CTAs */}
        <Reveal delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              to="/servicos"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-harpia-black font-medium text-xs uppercase tracking-[0.15em] hover:bg-harpia-white hover:shadow-xl hover:shadow-white/10 transition-all duration-300"
            >
              Nossos Serviços
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </Link>

            <Link
              to="/contato"
              className="group inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white/70 font-medium text-xs uppercase tracking-[0.15em] hover:bg-white/5 hover:border-white/30 hover:text-white transition-all duration-300"
            >
              <Play size={12} className="fill-current" />
              Iniciar Projeto
            </Link>
          </div>
        </Reveal>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-harpia-black via-harpia-black/80 to-transparent pointer-events-none" />

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <Reveal delay={0.5}>
          <div className="flex flex-col items-center gap-3 text-white/30">
            <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
            <div className="w-px h-12 bg-linear-to-b from-white/30 to-transparent animate-pulse" />
          </div>
        </Reveal>
      </div>
    </section>
  );
};
