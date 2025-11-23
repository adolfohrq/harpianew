import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '../Reveal';

export const ServicesHero: React.FC = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);

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
            parallaxRef.current.style.transform = `translateY(${scrollPosition * 0.5}px)`;
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
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          ref={parallaxRef}
          className="absolute inset-0 bg-harpia-gray/30"
          style={{ transform: 'translateY(0)' }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-harpia-black/80 via-harpia-black/40 to-harpia-black" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <Reveal>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight mb-8 tracking-wide">
            NOSSOS <span className="italic text-gray-400">SERVIÇOS.</span>
            <br />
            SUA <span className="italic text-gray-400">TRANSFORMAÇÃO.</span>
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="font-sans font-light text-lg md:text-xl text-harpia-white max-w-2xl mx-auto mb-12 leading-relaxed">
            Combinamos estética refinada com estratégia de dados para entregar resultados que elevam
            sua marca e criam conexões autênticas.
          </p>
        </Reveal>

        <Reveal delay={400}>
          <Link
            to="/contato"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-harpia-accent text-harpia-black font-sans font-semibold tracking-widest uppercase text-sm hover:bg-harpia-white transition-colors focus:outline-none focus:ring-2 focus:ring-harpia-gray focus:ring-offset-2 focus:ring-offset-harpia-black"
          >
            Solicitar Orçamento
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
};
