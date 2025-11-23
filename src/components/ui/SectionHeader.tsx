import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '../Reveal';

interface SectionHeaderProps {
  /** Label superior opcional (ex: "O que fazemos") */
  label?: string;
  /** Título principal da seção */
  title: string;
  /** Descrição/subtítulo da seção */
  description?: string;
  /** Link opcional para "Ver mais" */
  link?: {
    to: string;
    text: string;
    ariaLabel?: string;
  };
  /** Alinhamento do conteúdo */
  align?: 'left' | 'center';
  /** Largura máxima da descrição */
  descriptionMaxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  /** Margem inferior customizada */
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  label,
  title,
  description,
  link,
  align = 'left',
  descriptionMaxWidth = '2xl',
  className = 'mb-16 md:mb-20',
}) => {
  const alignmentClasses = align === 'center' ? 'text-center' : 'text-center md:text-left';
  const maxWidthMap = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full',
  };

  return (
    <header className={`${alignmentClasses} ${className}`}>
      <Reveal>
        {/* Label Superior */}
        {label && (
          <span className="inline-block font-sans text-xs uppercase tracking-widest text-gray-500 mb-4 px-4 py-1.5 bg-gray-100 rounded-full">
            {label}
          </span>
        )}

        {/* Título */}
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-harpia-black mb-4 md:mb-6 leading-tight">
          {title}
        </h2>

        {/* Descrição e Link */}
        {(description || link) && (
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            {/* Descrição */}
            {description && (
              <p
                className={`font-sans text-gray-600 font-light text-base md:text-lg lg:text-xl ${maxWidthMap[descriptionMaxWidth]} leading-relaxed ${align === 'center' ? 'mx-auto' : ''}`}
              >
                {description}
              </p>
            )}

            {/* Link de Ação */}
            {link && (
              <Link
                to={link.to}
                aria-label={link.ariaLabel || link.text}
                className="hidden md:inline-flex items-center gap-2 font-sans text-sm uppercase tracking-widest border-b-2 border-gray-300 pb-1.5 hover:text-harpia-black hover:border-harpia-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-harpia-black focus:ring-offset-2 text-gray-600 whitespace-nowrap group/link"
              >
                {link.text}
                <ArrowRight
                  size={16}
                  strokeWidth={2}
                  className="transition-transform duration-300 group-hover/link:translate-x-1"
                />
              </Link>
            )}
          </div>
        )}
      </Reveal>
    </header>
  );
};
