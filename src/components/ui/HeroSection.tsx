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
      <div className="relative z-10 h-[55vh] flex items-center justify-center">
        <div className="max-w-5xl mx-auto px-6 text-center">
          {/* Breadcrumb */}
          {breadcrumb && breadcrumb.length > 0 && (
            <Reveal>
              <nav aria-label="Breadcrumb" className="flex justify-center mb-8">
                <ol className="flex items-center gap-2 text-xs md:text-sm">
                  {breadcrumb.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
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
                        <ChevronRight size={14} className="text-white/20" />
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
              <div className="flex items-center justify-center gap-4 mb-6">
                <GradientLine direction="right" />
                <span className="text-xs md:text-sm tracking-[0.3em] uppercase text-white/50 font-medium">
                  {subtitle}
                </span>
                <GradientLine direction="left" />
              </div>
            </Reveal>
          )}

          {/* Title */}
          <Reveal delay={0.1}>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[0.95] mb-8">
              {title}
            </h1>
          </Reveal>

          {/* Description */}
          {description && (
            <Reveal delay={0.2}>
              <p className="text-white/60 text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto">
                {description}
              </p>
            </Reveal>
          )}

          {/* CTA Buttons */}
          {cta && cta.length > 0 && (
            <Reveal delay={0.3}>
              <div className="flex flex-wrap gap-4 justify-center mt-10">
                {cta.map((button, index) => (
                  <Link
                    key={index}
                    to={button.href}
                    className={`group inline-flex items-center gap-3 px-8 py-4 text-sm uppercase tracking-[0.15em] font-medium transition-all duration-300 ${
                      button.variant === 'secondary'
                        ? 'bg-transparent border border-white/20 text-white/80 hover:bg-white/5 hover:border-white/40 hover:text-white'
                        : 'bg-white text-harpia-black hover:bg-harpia-white hover:shadow-lg hover:shadow-white/10'
                    }`}
                  >
                    {button.label}
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform duration-300"
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
