import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../data';
import { Reveal } from './Reveal';
import { OptimizedImage } from './ui/OptimizedImage';

export const PortfolioPreview = () => {
  return (
    <section className="py-24 bg-white selection:bg-harpia-black selection:text-white">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="font-serif text-4xl md:text-5xl mb-6 text-harpia-black">
                PROJETOS RECENTES
              </h2>
              <p className="text-gray-600 font-sans text-lg">
                Uma seleção curada de trabalhos que definem nossa visão de design e excelência
                técnica.
              </p>
            </div>
            <Link
              to="/servicos"
              className="group flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-harpia-black hover:text-gray-600 transition-colors focus:outline-none"
            >
              Explorar tudo
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project, idx) => (
            <Reveal key={project.id} delay={idx * 100}>
              <Link
                to={`/portfolio/${project.slug}`}
                className="block relative group overflow-hidden aspect-[16/10] border border-gray-100 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-500"
              >
                {/* Image Layer */}
                <OptimizedImage
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                  loading="lazy"
                />

                {/* Overlay Layer */}
                <div className="absolute inset-0 bg-gradient-to-t from-harpia-black via-harpia-black/50 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Content Layer */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end items-start">
                  <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-100 w-full">
                    <div className="flex justify-between items-end w-full border-t border-white/20 pt-4">
                      <div>
                        <span className="block font-sans text-xs uppercase tracking-[0.2em] text-harpia-accent mb-2">
                          {project.category}
                        </span>
                        <h3 className="font-serif text-3xl text-white">{project.title}</h3>
                      </div>

                      <div className="bg-white/10 p-3 rounded-full backdrop-blur-sm text-white group-hover:bg-white group-hover:text-harpia-black transition-colors duration-300">
                        <ArrowUpRight size={20} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
