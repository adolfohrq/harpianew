import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Reveal } from '../Reveal';
import { GradientLine } from './GradientLine';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface CTAButton {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
}

interface HeroSectionProps {
  /** Subtítulo ou Label superior (ex: "Sobre Nós") */
  subtitle?: string;
  /** Título principal (aceita JSX para quebras de linha ou spans) */
  title: React.ReactNode;
  /** Descrição principal */
  description?: string;
  /** Classes adicionais para customização */
  className?: string;
  /** Breadcrumb para navegação e SEO */
  breadcrumb?: BreadcrumbItem[];
  /** Botões de CTA */
  cta?: CTAButton[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  subtitle,
  title,
  description,
  className = '',
  breadcrumb,
  cta,
}) => {
  return (
    <section
      className={`relative bg-harpia-black text-white overflow-hidden rounded-b-4xl z-20 ${className}`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-harpia-gray/10 rounded-full blur-[120px] -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-harpia-gray/5 rounded-full blur-[100px] translate-y-1/2" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Top fade from navbar */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-harpia-black to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center pt-28 pb-12 sm:pt-32 sm:pb-16 md:py-32 md:min-h-[50vh]">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 text-center">
          {/* Breadcrumb */}
          {breadcrumb && breadcrumb.length > 0 && (
            <Reveal>
              <nav aria-label="Breadcrumb" className="flex justify-center mb-8">
                <ol className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs md:text-sm">
                  {breadcrumb.map((item, index) => (
                    <li key={index} className="flex items-center gap-1.5 sm:gap-2">
                      {item.href ? (
                        <Link
                          to={item.href}
                          className="text-white/40 hover:text-white/70 transition-colors duration-300"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <span className="text-white/70">{item.label}</span>
                      )}
                      {index < breadcrumb.length - 1 && (
                        <ChevronRight size={12} className="sm:w-3.5 sm:h-3.5 text-white/20" />
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            </Reveal>
          )}

          {/* Subtitle */}
          {subtitle && (
            <Reveal>
              <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                <GradientLine direction="right" />
                <span className="text-[10px] sm:text-xs md:text-sm tracking-[0.25em] sm:tracking-[0.3em] uppercase text-white/50 font-medium">
                  {subtitle}
                </span>
                <GradientLine direction="left" />
              </div>
            </Reveal>
          )}

          {/* Title */}
          <Reveal delay={0.1}>
            <h1 className="font-serif text-[1.75rem] sm:text-4xl md:text-5xl lg:text-6xl leading-tight sm:leading-[0.95] mb-4 sm:mb-6">
              {title}
            </h1>
          </Reveal>

          {/* Description */}
          {description && (
            <Reveal delay={0.2}>
              <p className="text-white/60 sm:text-white/70 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed max-w-md sm:max-w-xl md:max-w-2xl mx-auto">
                {description}
              </p>
            </Reveal>
          )}

          {/* CTA Buttons */}
          {cta && cta.length > 0 && (
            <Reveal delay={0.3}>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center mt-8 sm:mt-10 px-4 sm:px-0">
                {cta.map((button, index) => (
                  <Link
                    key={index}
                    to={button.href}
                    className={`group inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm uppercase tracking-[0.12em] sm:tracking-[0.15em] font-medium transition-all duration-300 ${
                      button.variant === 'secondary'
                        ? 'bg-transparent border border-white/20 text-white/80 hover:bg-white/5 hover:border-white/40 hover:text-white'
                        : 'bg-white text-harpia-black hover:bg-harpia-white hover:shadow-lg hover:shadow-white/10'
                    }`}
                  >
                    {button.label}
                    <ArrowRight
                      size={14}
                      className="sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </Link>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </div>

      {/* Bottom gradient for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-harpia-black/50 to-transparent pointer-events-none" />
    </section>
  );
};
