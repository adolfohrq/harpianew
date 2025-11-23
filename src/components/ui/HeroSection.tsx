import React from 'react';
import { Reveal } from '../Reveal';
import { OptimizedImage } from './OptimizedImage';

interface HeroSectionProps {
  /** Subtítulo ou Label superior (ex: "Sobre Nós") */
  subtitle?: string;
  /** Título principal (aceita JSX para quebras de linha ou spans) */
  title: React.ReactNode;
  /** Descrição principal */
  description?: string;
  /** URL da imagem de destaque */
  imageSrc?: string;
  /** Alt text da imagem */
  imageAlt?: string;
  /** Conteúdo do badge flutuante sobre a imagem (opcional) */
  floatingBadge?: React.ReactNode;
  /** Altura mínima da seção (default: min-h-screen ou auto) */
  className?: string;
  /** Modo compacto (para páginas internas) */
  compact?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  subtitle,
  title,
  description,
  imageSrc,
  imageAlt = 'Hero Image',
  floatingBadge,
  className = '',
  compact = true, // Default to true since it's mostly for inner pages
}) => {
  return (
    <section
      className={`relative bg-harpia-black text-white px-6 md:px-12 lg:px-24 overflow-hidden rounded-b-[2rem] z-20 transition-all duration-500 ${
        compact ? 'pt-32 pb-16 md:pt-40 md:pb-24' : 'pt-40 pb-32 md:pt-48 md:pb-40'
      } ${className}`}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-harpia-gray/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-harpia-gray/10 rounded-full blur-[80px] -translate-x-1/4 translate-y-1/4" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 items-center ${compact ? 'gap-12' : 'gap-16'}`}
        >
          {/* Text Content */}
          <div>
            {subtitle && (
              <Reveal>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-8 h-px bg-white/30" />
                  <span className="text-xs md:text-sm tracking-[0.2em] uppercase text-white/70 font-medium">
                    {subtitle}
                  </span>
                </div>
              </Reveal>
            )}

            <Reveal delay={0.1}>
              <h1
                className={`font-serif leading-[0.95] mb-6 ${
                  compact ? 'text-4xl md:text-5xl lg:text-7xl' : 'text-5xl md:text-7xl lg:text-8xl'
                }`}
              >
                {title}
              </h1>
            </Reveal>

            {description && (
              <Reveal delay={0.2}>
                <p
                  className={`text-white/70 max-w-lg leading-relaxed border-l border-white/10 pl-6 ${
                    compact ? 'text-base md:text-lg mb-8' : 'text-lg md:text-xl mb-12'
                  }`}
                >
                  {description}
                </p>
              </Reveal>
            )}
          </div>

          {/* Image Content */}
          <div className="relative isolate">
            {/* Decorative Background Element for Depth */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/5 rounded-full blur-[60px] -z-10 pointer-events-none" />

            <Reveal delay={0.3}>
              <div
                className={`relative group perspective-1000 mx-auto lg:ml-auto ${
                  compact ? 'max-w-sm' : 'max-w-md'
                }`}
              >
                {/* Image Container with Border */}
                <div className="relative aspect-[4/5] w-full rounded-sm overflow-hidden border border-white/10 group-hover:border-white/30 transition-colors duration-700">
                  {/* Shine Effect Overlay */}
                  <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out z-20 pointer-events-none" />

                  {imageSrc && (
                    <OptimizedImage
                      src={imageSrc}
                      alt={imageAlt}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-1000 ease-out"
                    />
                  )}

                  {/* Inner Shadow / Vignette */}
                  <div className="absolute inset-0 bg-radial-[circle_at_center_transparent_0%,rgba(0,0,0,0.3)_100%] opacity-60 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none" />
                </div>

                {/* Floating Badge */}
                {floatingBadge && (
                  <div
                    className={`absolute bottom-6 -left-4 bg-white text-harpia-black shadow-[0_20px_40px_rgba(0,0,0,0.3)] hidden md:block group-hover:-translate-y-4 group-hover:rotate-1 transition-all duration-700 ease-out z-30 border border-white/50 backdrop-blur-xl ${
                      compact ? 'p-5 max-w-[180px]' : 'p-6 md:p-8 max-w-[200px] md:max-w-[240px]'
                    }`}
                  >
                    {floatingBadge}
                  </div>
                )}

                {/* Geometric Decoration */}
                <div className="absolute -top-4 -right-4 w-16 h-16 border-t border-r border-white/20 -z-10 group-hover:-top-6 group-hover:-right-6 transition-all duration-500" />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 border-b border-l border-white/20 -z-10 group-hover:-bottom-6 group-hover:-left-6 transition-all duration-500" />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
