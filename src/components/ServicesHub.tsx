import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SERVICES } from '../data';
import { Reveal } from './Reveal';
import { OptimizedImage, SectionHeader } from './ui';
import type { ServiceItem } from '../types';

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  // Performance: Memoize title split to avoid recalculation on every render
  const titleParts = useMemo(() => {
    const words = service.title.split(' ');
    return {
      firstWord: words[0],
      restWords: words.slice(1).join(' '),
    };
  }, [service.title]);

  return (
    <Link
      to="/servicos"
      aria-label={`Explorar ${service.title}`}
      className="group relative block aspect-9/16 md:aspect-3/4 overflow-hidden bg-gray-100 border border-gray-200 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-harpia-black focus:ring-offset-2 rounded-sm"
    >
      {/* Background Image */}
      <OptimizedImage
        src={service.image}
        alt={`${service.title} - Serviço da Harpia Agência`}
        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110 opacity-80 group-hover:opacity-100 grayscale-[0.5] group-hover:grayscale-0"
        loading="lazy"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent opacity-95 group-hover:opacity-90 transition-opacity duration-500" />

      {/* Content Container */}
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-10">
        {/* Top: Index Badge & Arrow Icon */}
        <div className="flex justify-between items-start">
          <span className="font-sans text-xs text-harpia-white/80 border border-white/25 px-3 py-1.5 rounded-full backdrop-blur-sm bg-black/20 group-hover:bg-black/30 group-hover:border-white/40 transition-all duration-300">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div
            className="bg-harpia-accent text-harpia-black p-2.5 rounded-full opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 shadow-lg"
            aria-hidden="true"
          >
            <ArrowRight size={18} strokeWidth={2.5} />
          </div>
        </div>

        {/* Bottom: Title & Description */}
        <div className="space-y-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="font-serif text-2xl md:text-3xl text-harpia-accent leading-tight">
            {titleParts.firstWord}
            <br />
            <span className="italic text-white/85 group-hover:text-harpia-accent transition-colors duration-300">
              {titleParts.restWords}
            </span>
          </h3>
          <p className="font-sans text-sm md:text-base text-harpia-white/95 line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 font-light leading-relaxed">
            {service.description}
          </p>
        </div>
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 border border-white/0 group-hover:border-white/40 transition-colors duration-500 pointer-events-none rounded-sm" />
    </Link>
  );
};

export const ServicesHub: React.FC = () => {
  return (
    <section className="py-20 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <SectionHeader
          label="O que fazemos"
          title="NOSSOS SERVIÇOS"
          description="Somos movidos por resultados. Cada serviço é pensado estrategicamente para elevar sua marca e gerar impacto real."
          link={{
            to: '/servicos',
            text: 'Ver Detalhes',
            ariaLabel: 'Ver todos os detalhes dos serviços',
          }}
        />

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {SERVICES.map((service, index) => (
            <Reveal key={service.id} delay={index * 100}>
              <ServiceCard service={service} index={index} />
            </Reveal>
          ))}
        </div>

        {/* Mobile CTA Button */}
        <footer className="mt-12 md:mt-16 text-center md:hidden">
          <Link
            to="/servicos"
            aria-label="Ver página completa de serviços"
            className="inline-flex items-center gap-2 font-sans text-sm uppercase tracking-widest border-b-2 border-gray-300 pb-1.5 hover:text-harpia-black hover:border-harpia-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-harpia-black focus:ring-offset-2 text-gray-600 group/cta"
          >
            Ver Todos os Serviços
            <ArrowRight
              size={16}
              strokeWidth={2.5}
              className="transition-transform duration-300 group-hover/cta:translate-x-1"
            />
          </Link>
        </footer>
      </div>
    </section>
  );
};
