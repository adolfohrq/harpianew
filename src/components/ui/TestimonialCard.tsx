import React from 'react';
import { Quote } from 'lucide-react';

interface TestimonialCardProps {
  /** Texto do depoimento */
  text: string;
  /** Nome do autor */
  author: string;
  /** Empresa do autor */
  company: string;
  /** Se o card está ativo (visível) */
  isActive: boolean;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  text,
  author,
  company,
  isActive,
}) => {
  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-1000 ease-out
        ${
          isActive
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-8 pointer-events-none'
        }`}
      role="tabpanel"
      aria-hidden={!isActive}
    >
      {/* Quote Icon */}
      <div className="mb-8">
        <Quote
          size={32}
          strokeWidth={1}
          className="mx-auto mb-6 opacity-50 text-harpia-black transform -scale-x-100"
          aria-hidden="true"
        />
        <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl leading-relaxed text-harpia-black italic max-w-4xl mx-auto">
          "{text}"
        </blockquote>
      </div>

      {/* Author Info */}
      <div className="space-y-1">
        <cite className="not-italic text-harpia-black uppercase tracking-widest text-sm font-semibold">
          {author}
        </cite>
        <p className="text-gray-500 text-xs tracking-wider">{company}</p>
      </div>
    </div>
  );
};
