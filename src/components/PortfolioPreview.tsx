import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../data';
import { Reveal } from './Reveal';
import { OptimizedImage } from './ui/OptimizedImage';

export const PortfolioPreview = () => {
  return (
    <section className="py-24 md:py-32 bg-harpia-black border-y border-white/5 relative overflow-hidden">
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

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Header Section */}
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-6">
            <div className="max-w-2xl">
              <span className="inline-block font-sans text-xs font-medium uppercase tracking-[0.4em] text-gray-500 mb-6 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                Portfolio
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 text-white leading-tight">
                PROJETOS RECENTES
              </h2>
              <p className="text-gray-400 font-sans text-base md:text-lg leading-relaxed font-light">
                Uma seleção curada de trabalhos que definem nossa visão de design e excelência
                técnica. Cada projeto é uma história de transformação.
              </p>
            </div>
            <Link
              to="/servicos"
              className="group flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-white hover:text-gray-300 transition-all duration-300 border-b border-white/20 pb-2 hover:border-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-harpia-black"
              aria-label="Explorar todos os projetos"
            >
              Explorar tudo
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </Reveal>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {PROJECTS.map((project, idx) => (
            <Reveal key={project.id} delay={idx * 100}>
              <Link
                to={`/portfolio/${project.slug}`}
                className="block relative group overflow-hidden aspect-16/10 bg-harpia-carbon rounded-sm border border-white/10 hover:border-white/30 hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-2 transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-4 focus:ring-offset-harpia-black"
                aria-label={`Ver projeto ${project.title}`}
              >
                {/* Image Layer */}
                <OptimizedImage
                  src={project.image}
                  alt={`${project.title} - Projeto de ${project.category}`}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                  loading="lazy"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent group-hover:from-black/70 transition-all duration-500" />

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-linear-to-br from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Border Glow on Hover */}
                <div className="absolute inset-0 transition-all duration-500 rounded-sm group-hover:shadow-[inset_0_0_60px_rgba(255,255,255,0.1)]" />

                {/* Number Badge */}
                <div className="absolute top-6 left-6 md:top-8 md:left-8 z-20">
                  <span className="font-sans text-xs text-harpia-white/80 border border-white/25 px-3 py-1.5 rounded-full backdrop-blur-sm bg-black/20 group-hover:bg-black/40 group-hover:border-white/50 transition-all duration-300">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Content Layer */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end items-start z-10">
                  <div className="transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-100 w-full">
                    <div className="flex justify-between items-end w-full border-t border-white/40 pt-5 gap-4">
                      <div className="flex-1">
                        <span className="block font-sans text-xs uppercase tracking-[0.25em] text-white/90 mb-2 font-medium">
                          {project.category}
                        </span>
                        <h3 className="font-serif text-2xl md:text-3xl text-white leading-tight">
                          {project.title}
                        </h3>
                      </div>

                      <div className="shrink-0 bg-white/10 p-3 rounded-full backdrop-blur-sm text-white border-2 border-white/30 group-hover:bg-white group-hover:text-harpia-black group-hover:border-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                        <ArrowUpRight size={20} strokeWidth={2.5} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Mobile CTA Footer */}
        <footer className="mt-12 md:mt-16 text-center md:hidden">
          <Link
            to="/servicos"
            aria-label="Ver todos os projetos"
            className="inline-flex items-center gap-2 font-sans text-sm uppercase tracking-widest border-b-2 border-white/30 pb-1.5 hover:text-white hover:border-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-harpia-black text-gray-400 group/cta"
          >
            Ver Todos os Projetos
            <ArrowUpRight
              size={16}
              strokeWidth={2.5}
              className="transition-transform duration-300 group-hover/cta:translate-x-1 group-hover/cta:-translate-y-1"
            />
          </Link>
        </footer>
      </div>
    </section>
  );
};
