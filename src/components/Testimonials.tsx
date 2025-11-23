import React, { useState, useEffect, useCallback } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '../data';
import { Reveal } from './Reveal';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [handleNext]);

  return (
    <section className="py-32 bg-white relative overflow-hidden border-t border-gray-100">
      {/* Background Decorative Quote */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black/[0.02] pointer-events-none select-none">
        <Quote size={400} />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <Reveal>
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl md:text-5xl mb-6 text-harpia-black">
              VOZES QUE ECOAM
            </h2>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
              Parcerias que transformam visão em realidade
            </p>
          </div>
        </Reveal>

        <div className="relative min-h-[350px] md:min-h-[300px] flex items-center justify-center">
          {TESTIMONIALS.map((item, index) => (
            <div
              key={item.id}
              className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-1000 ease-out
                ${
                  index === currentIndex
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 translate-y-8 pointer-events-none'
                }`}
            >
              <div className="mb-8 text-gray-400">
                <Quote
                  size={32}
                  strokeWidth={1}
                  className="mx-auto mb-6 opacity-50 text-harpia-black"
                />
                <p className="font-serif text-2xl md:text-3xl lg:text-4xl leading-relaxed text-harpia-black italic max-w-4xl mx-auto">
                  "{item.text}"
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-harpia-black uppercase tracking-widest text-sm font-semibold">
                  {item.author}
                </p>
                <p className="text-gray-500 text-xs tracking-wider">{item.company}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-6 mt-8">
          <button
            onClick={handlePrev}
            className="p-4 border border-gray-200 rounded-full hover:bg-harpia-black hover:text-white text-harpia-black transition-all group"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <button
            onClick={handleNext}
            className="p-4 border border-gray-200 rounded-full hover:bg-harpia-black hover:text-white text-harpia-black transition-all group"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
