import React from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../data';
import { Reveal } from './Reveal';
import { OptimizedImage } from './ui/OptimizedImage';

export const PortfolioPreview: React.FC = () => {
  return (
    <section className="py-24 bg-harpia-black">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl mb-6">PROJETOS RECENTES</h2>
            <Link
              to="/servicos"
              className="font-sans text-xs uppercase tracking-[0.2em] text-harpia-gray hover:text-harpia-accent transition-colors focus:outline-none focus:ring-2 focus:ring-harpia-gray"
            >
              Explorar o portfólio completo
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project, idx) => (
            <Reveal key={project.id} delay={idx * 100}>
              <div className="relative group overflow-hidden aspect-[16/10] border border-white/5 cursor-pointer">
                {/* Image Layer */}
                <OptimizedImage
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                  loading="lazy"
                />

                {/* Overlay Layer */}
                <div className="absolute inset-0 bg-harpia-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-2">
                  {/* Animated Content */}
                  {/* Refined Animation: Subtle upward translation (translate-y-4 and translate-y-8) */}
                  <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-100">
                    <span className="font-sans text-xs uppercase tracking-[0.3em] text-harpia-gray border-b border-white/20 pb-2">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="font-serif text-3xl md:text-4xl text-harpia-accent transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-200">
                    {project.title}
                  </h3>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
