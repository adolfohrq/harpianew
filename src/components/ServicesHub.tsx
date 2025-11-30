import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { SERVICES } from '../data';
import { Reveal } from './Reveal';
import { OptimizedImage, GradientLine } from './ui';
import type { ServiceItem } from '../types';

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
  isHovered: boolean;
  onHover: (index: number | null) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index, isHovered, onHover }) => {
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
      className="group relative block aspect-4/5 overflow-hidden bg-gray-100 rounded-sm transition-all duration-700 focus:outline-none focus:ring-2 focus:ring-harpia-black focus:ring-offset-2"
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-harpia-black/20 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-harpia-black/20 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-harpia-black/20 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-harpia-black/20 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Background Image - Com aspectRatio para prevenir CLS */}
      <OptimizedImage
        src={service.image}
        alt={`${service.title} - Serviço da Harpia Agência`}
        width={400}
        height={500}
        aspectRatio="4/5"
        containerClassName="w-full h-full"
        className={`transition-all duration-700 ease-out ${
          isHovered ? 'scale-110 grayscale-0' : 'scale-100 grayscale'
        }`}
      />

      {/* Gradient Overlay */}
      <div
        className={`absolute inset-0 bg-linear-to-t from-black/95 via-black/50 to-transparent transition-opacity duration-500 ${
          isHovered ? 'opacity-95' : 'opacity-80'
        }`}
      />

      {/* Content Container */}
      <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-between z-10">
        {/* Top: Index Badge */}
        <div className="flex justify-between items-start">
          <span className="font-mono text-[10px] text-white/60 border border-white/20 px-2.5 py-1 rounded-full backdrop-blur-sm bg-black/30">
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Arrow Button */}
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-500 ${
              isHovered
                ? 'bg-white text-harpia-black border-white scale-110'
                : 'bg-white/10 text-white border-white/20 scale-100'
            }`}
          >
            <ArrowUpRight
              size={18}
              strokeWidth={2}
              className={`transition-transform duration-300 ${isHovered ? 'rotate-0' : '-rotate-45'}`}
            />
          </div>
        </div>

        {/* Bottom: Title & Description */}
        <div className="space-y-3">
          <h3
            className={`text-white transition-transform duration-500 ${
              isHovered ? 'translate-y-0' : 'translate-y-2'
            }`}
          >
            {titleParts.firstWord}
            <br />
            <span className="italic text-white/50 font-light">{titleParts.restWords}</span>
          </h3>

          <p
            className={`text-white/70 text-sm font-light line-clamp-3 transition-all duration-500 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {service.description}
          </p>
        </div>
      </div>

      {/* Bottom Line Accent */}
      <div
        className={`absolute bottom-0 left-0 h-[2px] bg-white transition-all duration-700 ${
          isHovered ? 'w-full' : 'w-0'
        }`}
      />
    </Link>
  );
};

export const ServicesHub: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-32 lg:py-40 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #191919 1px, transparent 0)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Vertical accent lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-linear-to-b from-transparent via-black/5 to-transparent hidden lg:block" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-linear-to-b from-transparent via-black/5 to-transparent hidden lg:block" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <Reveal>
          <div className="text-center mb-16 md:mb-20">
            <div className="flex items-center justify-center gap-4 mb-8">
              <GradientLine direction="right" variant="dark" size="lg" />
              <span className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-gray-500 font-medium">
                O que fazemos
              </span>
              <GradientLine direction="left" variant="dark" size="lg" />
            </div>

            <h2 className="text-harpia-black mb-6">
              NOSSOS
              <br />
              <span className="italic text-gray-400 font-light">Serviços</span>
            </h2>

            <p className="text-gray-600 text-base md:text-lg font-light max-w-2xl mx-auto">
              Somos movidos por resultados. Cada serviço é pensado estrategicamente para elevar sua
              marca e gerar impacto real.
            </p>
          </div>
        </Reveal>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {SERVICES.map((service, index) => (
            <Reveal key={service.id} delay={index * 100}>
              <ServiceCard
                service={service}
                index={index}
                isHovered={hoveredIndex === index}
                onHover={setHoveredIndex}
              />
            </Reveal>
          ))}
        </div>

        {/* Footer with CTA */}
        <Reveal delay={0.4}>
          <div className="mt-12 md:mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-black/10">
            {/* Service Count */}
            <div className="flex items-center gap-4 text-gray-400">
              <span className="text-xs uppercase tracking-[0.2em]">{SERVICES.length} Serviços</span>
              <div className="w-8 h-px bg-black/10" />
              <span className="text-xs uppercase tracking-[0.2em]">Soluções Completas</span>
            </div>

            {/* CTA Link */}
            <Link
              to="/servicos"
              className="group/link flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gray-600 hover:text-harpia-black transition-colors duration-300"
              aria-label="Ver todos os serviços"
            >
              Ver Detalhes
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
