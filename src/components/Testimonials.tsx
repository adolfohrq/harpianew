import React, { useState, useEffect, useCallback } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '../data';
import { Reveal } from './Reveal';
import { SectionHeader, TestimonialCard } from './ui';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  const handleDotClick = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Auto-advance with pause control
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [handleNext, isPaused]);

  return (
    <section
      className="py-32 bg-white relative overflow-hidden border-t border-gray-100"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Customer testimonials"
    >
      {/* Background Decorative Quote */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black/2 pointer-events-none select-none"
        aria-hidden="true"
      >
        <Quote size={400} />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <Reveal>
          <SectionHeader
            title="VOZES QUE ECOAM"
            description={
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                Parcerias que transformam visão em realidade
              </p>
            }
            align="center"
            className="mb-20"
          />
        </Reveal>

        {/* Testimonials Container */}
        <div
          className="relative min-h-[350px] md:min-h-[300px] flex items-center justify-center"
          role="tablist"
          aria-label="Testimonials carousel"
        >
          {TESTIMONIALS.map((item, index) => (
            <TestimonialCard
              key={item.id}
              text={item.text}
              author={item.author}
              company={item.company}
              isActive={index === currentIndex}
            />
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="flex flex-col items-center gap-6 mt-12">
          {/* Dot Indicators */}
          <div
            className="flex items-center gap-3"
            role="tablist"
            aria-label="Testimonial navigation"
          >
            {TESTIMONIALS.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleDotClick(index)}
                className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-harpia-black focus:ring-offset-2 ${
                  index === currentIndex
                    ? 'w-8 h-2 bg-harpia-black'
                    : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-selected={index === currentIndex}
                role="tab"
              />
            ))}
          </div>

          {/* Arrow Controls */}
          <div className="flex justify-center gap-4">
            <button
              onClick={handlePrev}
              className="p-4 border border-gray-200 rounded-full hover:bg-harpia-black hover:text-white hover:border-harpia-black text-harpia-black transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-harpia-black focus:ring-offset-2"
              aria-label="Previous testimonial"
            >
              <ChevronLeft
                size={20}
                strokeWidth={1.5}
                className="group-hover:-translate-x-1 transition-transform duration-300"
              />
            </button>
            <button
              onClick={handleNext}
              className="p-4 border border-gray-200 rounded-full hover:bg-harpia-black hover:text-white hover:border-harpia-black text-harpia-black transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-harpia-black focus:ring-offset-2"
              aria-label="Next testimonial"
            >
              <ChevronRight
                size={20}
                strokeWidth={1.5}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
