import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../data';
import { Reveal } from './Reveal';
import { OptimizedImage } from './ui/OptimizedImage';

export const PortfolioPreview = () => {
  return (
    <section className="py-32 bg-harpia-black border-y border-white/5 relative overflow-hidden selection:bg-white selection:text-harpia-black">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] animate-pulse"
          style={{ animationDuration: '8s' }}
        />
        <div
          className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-[120px] animate-pulse"
          style={{ animationDuration: '10s' }}
        />
      </div>

      {/* Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(255 255 255) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div className="max-w-xl">
              <span className="block font-sans text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
                Portfolio
              </span>
              <h2 className="font-serif text-4xl md:text-5xl mb-6 text-white">PROJETOS RECENTES</h2>
              <p className="text-gray-400 font-sans text-lg leading-relaxed">
                Uma seleção curada de trabalhos que definem nossa visão de design e excelência
                técnica.
              </p>
            </div>
            <Link
              to="/servicos"
              className="group flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-white hover:text-gray-300 transition-colors focus:outline-none"
            >
              Explorar tudo
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project, idx) => (
            <Reveal key={project.id} delay={idx * 100}>
              <Link
                to={`/portfolio/${project.slug}`}
                className="block relative group overflow-hidden aspect-16/10 bg-harpia-carbon rounded-sm border border-white/10 hover:border-white/30 hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-2 transition-all duration-500"
              >
                {/* Image Layer */}
                <OptimizedImage
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                  loading="lazy"
                />

                {/* Overlay Layer */}
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent group-hover:from-black/60 transition-all duration-500" />

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-linear-to-br from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Border Glow on Hover */}
                <div className="absolute inset-0 transition-all duration-500 rounded-sm group-hover:shadow-[inset_0_0_60px_rgba(255,255,255,0.1)]" />

                {/* Content Layer */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end items-start">
                  <div className="transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-100 w-full">
                    <div className="flex justify-between items-end w-full border-t border-white/30 pt-5">
                      <div>
                        <span className="block font-sans text-xs uppercase tracking-[0.25em] text-white/90 mb-2">
                          {project.category}
                        </span>
                        <h3 className="font-serif text-3xl text-white leading-tight">
                          {project.title}
                        </h3>
                      </div>

                      <div className="bg-white/10 p-3 rounded-full backdrop-blur-sm text-white border-2 border-white/30 group-hover:bg-white group-hover:text-harpia-black group-hover:border-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                        <ArrowUpRight size={20} strokeWidth={2} />
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
