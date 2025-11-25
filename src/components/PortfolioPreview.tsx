import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS, SERVICES } from '../data';
import { Reveal } from './Reveal';
import { OptimizedImage, GradientLine } from './ui';

// Categorias baseadas nos serviços
const CATEGORIES = ['Todos', ...SERVICES.map((s) => s.title)];

interface PortfolioPreviewProps {
  showAllProjects?: boolean;
}

export const PortfolioPreview: React.FC<PortfolioPreviewProps> = ({ showAllProjects = false }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('Todos');

  // Filtra projetos baseado na categoria selecionada
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'Todos') return PROJECTS;
    return PROJECTS.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  // Conta projetos por categoria
  const categoryCount = useMemo(() => {
    const counts: Record<string, number> = { Todos: PROJECTS.length };
    SERVICES.forEach((service) => {
      counts[service.title] = PROJECTS.filter((p) => p.category === service.title).length;
    });
    return counts;
  }, []);

  return (
    <section className="py-24 md:py-32 lg:py-40 bg-harpia-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgb(255 255 255) 1px, transparent 0)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-white/2 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-40 w-[400px] h-[400px] bg-white/2 rounded-full blur-[100px]" />

        {/* Top decorative line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section - Hidden when showAllProjects is true (used in Portfolio page) */}
        {!showAllProjects && (
          <Reveal>
            <div className="text-center mb-12 md:mb-16">
              <div className="flex items-center justify-center gap-4 mb-8">
                <GradientLine direction="right" size="lg" />
                <span className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/50 font-medium">
                  Portfolio
                </span>
                <GradientLine direction="left" size="lg" />
              </div>

              <h2 className="font-serif text-4xl md:text-6xl text-white mb-6 leading-[1.1]">
                TRABALHOS
                <br />
                <span className="italic text-white/40 font-light">Selecionados</span>
              </h2>

              <p className="text-white/60 text-base md:text-lg font-light max-w-2xl mx-auto">
                Uma seleção curada de trabalhos que definem nossa visão de design e excelência
                técnica. Cada projeto é uma história de transformação.
              </p>
            </div>
          </Reveal>
        )}

        {/* Category Filters */}
        <Reveal delay={0.1}>
          <div className="mb-8 md:mb-14">
            {/* Filter Pills - Scrollable on mobile */}
            <div className="overflow-x-auto pb-2 -mx-6 px-6 md:mx-0 md:px-0 md:overflow-visible scrollbar-hide">
              <div className="flex items-center gap-2 md:gap-3 md:flex-wrap md:justify-center min-w-max md:min-w-0">
                {CATEGORIES.map((category) => {
                  const isActive = activeCategory === category;
                  const count = categoryCount[category] || 0;

                  return (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`group relative px-3 md:px-5 py-2 md:py-2.5 rounded-full border text-xs md:text-sm transition-all duration-300 whitespace-nowrap ${
                        isActive
                          ? 'bg-white text-harpia-black border-white'
                          : 'bg-transparent text-white/70 border-white/20 hover:border-white/40 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-1.5 md:gap-2">
                        <span className="font-medium tracking-wide">{category}</span>
                        <span
                          className={`font-mono text-[10px] px-1.5 py-0.5 rounded-full transition-colors duration-300 ${
                            isActive
                              ? 'bg-harpia-black/20 text-harpia-black'
                              : 'bg-white/10 text-white/60'
                          }`}
                        >
                          {count}
                        </span>
                      </span>

                      {/* Active indicator line */}
                      <div
                        className={`absolute -bottom-px left-1/2 -translate-x-1/2 h-[2px] bg-white transition-all duration-300 ${
                          isActive ? 'w-8' : 'w-0'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active filter indicator */}
            <div className="mt-4 md:mt-6 flex items-center justify-center gap-3 text-white/40">
              <div className="w-8 h-px bg-white/20" />
              <span className="text-[10px] md:text-xs uppercase tracking-[0.2em]">
                {filteredProjects.length} {filteredProjects.length === 1 ? 'Projeto' : 'Projetos'}
              </span>
              <div className="w-8 h-px bg-white/20" />
            </div>
          </div>
        </Reveal>

        {/* Projects Grid - Bento Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {filteredProjects.map((project, idx) => (
            <Reveal key={project.id} delay={idx * 100}>
              <Link
                to={`/portfolio/${project.slug}`}
                className={`block relative group overflow-hidden bg-harpia-carbon border border-white/10 hover:border-white/20 transition-all duration-700 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-harpia-black ${
                  idx === 0 && filteredProjects.length > 2
                    ? 'md:col-span-2 aspect-4/3 md:aspect-21/9'
                    : 'aspect-4/3'
                } ${
                  hoveredIndex !== null && hoveredIndex !== idx
                    ? 'opacity-60 scale-[0.99]'
                    : 'opacity-100 scale-100'
                }`}
                aria-label={`Ver projeto ${project.title}`}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-white/20 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-white/20 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-white/20 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-white/20 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Image Layer */}
                <OptimizedImage
                  src={project.image}
                  alt={`${project.title} - Projeto de ${project.category}`}
                  className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                    hoveredIndex === idx ? 'scale-110 grayscale-0' : 'scale-100 grayscale'
                  }`}
                  loading="lazy"
                />

                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-linear-to-t from-harpia-black/95 via-harpia-black/50 to-transparent transition-opacity duration-500 ${
                    hoveredIndex === idx ? 'opacity-100' : 'opacity-80'
                  }`}
                />

                {/* Number Badge */}
                <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20">
                  <span className="font-mono text-[10px] text-white/60 border border-white/20 px-2.5 py-1 rounded-full backdrop-blur-sm bg-white/5">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/70 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                    {project.category}
                  </span>
                </div>

                {/* Content Layer */}
                <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end z-10">
                  <div className="flex justify-between items-end gap-3 md:gap-4">
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`text-white mb-1.5 md:mb-2 transition-transform duration-500 font-serif leading-tight ${
                          idx === 0 && filteredProjects.length > 2
                            ? 'text-xl sm:text-2xl md:text-4xl'
                            : 'text-lg sm:text-xl md:text-2xl'
                        } ${hoveredIndex === idx ? 'translate-y-0' : 'translate-y-2'}`}
                      >
                        {project.title}
                      </h3>

                      {/* Description - always visible on mobile, hover on desktop */}
                      <p
                        className={`text-white/70 text-xs sm:text-sm font-light max-w-md transition-all duration-500 line-clamp-2 md:line-clamp-none ${
                          hoveredIndex === idx
                            ? 'opacity-100 translate-y-0'
                            : 'md:opacity-0 md:translate-y-4 opacity-100 translate-y-0'
                        }`}
                      >
                        {project.description || 'Clique para ver o projeto completo'}
                      </p>
                    </div>

                    {/* Arrow Button */}
                    <div
                      className={`shrink-0 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full border transition-all duration-500 ${
                        hoveredIndex === idx
                          ? 'bg-white text-harpia-black border-white scale-110'
                          : 'bg-white/10 text-white border-white/20'
                      }`}
                    >
                      <ArrowUpRight
                        size={18}
                        strokeWidth={2}
                        className={`transition-transform duration-300 md:w-5 md:h-5 ${
                          hoveredIndex === idx ? 'rotate-0' : '-rotate-45'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Line Accent */}
                <div
                  className={`absolute bottom-0 left-0 h-[2px] bg-white transition-all duration-700 z-20 ${
                    hoveredIndex === idx ? 'w-full' : 'w-0'
                  }`}
                />
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <Reveal>
            <div className="py-16 text-center">
              <p className="text-white/50 text-lg font-light mb-4">
                Nenhum projeto encontrado nesta categoria.
              </p>
              <button
                onClick={() => setActiveCategory('Todos')}
                className="text-sm uppercase tracking-[0.2em] text-white hover:text-white/70 transition-colors"
              >
                Ver todos os projetos
              </button>
            </div>
          </Reveal>
        )}

        {/* Navigation Footer */}
        <Reveal delay={0.4}>
          <div className="mt-12 md:mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10">
            {/* Project Counter */}
            <div className="flex items-center gap-4 text-white/50">
              <span className="text-xs uppercase tracking-[0.2em]">{PROJECTS.length} Projetos</span>
              <div className="w-8 h-px bg-white/10" />
              <span className="text-xs uppercase tracking-[0.2em]">Portfolio Completo</span>
            </div>

            {/* CTA Link - Hidden on Portfolio page */}
            {!showAllProjects && (
              <Link
                to="/portfolio"
                className="group/link flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-300"
                aria-label="Ver todos os projetos"
              >
                Ver Todos
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                />
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
