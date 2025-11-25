import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS, SERVICES } from '../data';
import { Reveal } from './Reveal';
import { OptimizedImage } from './ui/OptimizedImage';

// Categorias baseadas nos serviços
const CATEGORIES = ['Todos', ...SERVICES.map((s) => s.title)];

export const PortfolioPreview = () => {
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
    <section className="py-24 md:py-32 lg:py-40 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #191919 1px, transparent 0)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Vertical accent lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-linear-to-b from-transparent via-black/5 to-transparent hidden lg:block" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-linear-to-b from-transparent via-black/5 to-transparent hidden lg:block" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <Reveal>
          <div className="text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-px bg-linear-to-r from-transparent to-black/20" />
              <span className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-gray-500 font-medium">
                Portfolio
              </span>
              <div className="w-16 h-px bg-linear-to-l from-transparent to-black/20" />
            </div>

            <h2 className="text-harpia-black mb-6">
              TRABALHOS
              <br />
              <span className="italic text-gray-400 font-light">Selecionados</span>
            </h2>

            <p className="text-gray-600 text-base md:text-lg font-light max-w-2xl mx-auto">
              Uma seleção curada de trabalhos que definem nossa visão de design e excelência
              técnica. Cada projeto é uma história de transformação.
            </p>
          </div>
        </Reveal>

        {/* Category Filters */}
        <Reveal delay={0.1}>
          <div className="mb-10 md:mb-14">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
              {CATEGORIES.map((category) => {
                const isActive = activeCategory === category;
                const count = categoryCount[category] || 0;

                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`group relative px-4 md:px-5 py-2 md:py-2.5 rounded-full border text-xs md:text-sm transition-all duration-300 ${
                      isActive
                        ? 'bg-harpia-black text-white border-harpia-black'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:text-harpia-black'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="font-medium tracking-wide">{category}</span>
                      <span
                        className={`font-mono text-[10px] px-1.5 py-0.5 rounded-full transition-colors duration-300 ${
                          isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {count}
                      </span>
                    </span>

                    {/* Active indicator line */}
                    <div
                      className={`absolute -bottom-px left-1/2 -translate-x-1/2 h-[2px] bg-harpia-black transition-all duration-300 ${
                        isActive ? 'w-8' : 'w-0'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Active filter indicator */}
            <div className="mt-6 flex items-center justify-center gap-3 text-gray-400">
              <div className="w-8 h-px bg-gray-200" />
              <span className="text-xs uppercase tracking-[0.2em]">
                {filteredProjects.length} {filteredProjects.length === 1 ? 'Projeto' : 'Projetos'}
              </span>
              <div className="w-8 h-px bg-gray-200" />
            </div>
          </div>
        </Reveal>

        {/* Projects Grid - Bento Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {filteredProjects.map((project, idx) => (
            <Reveal key={project.id} delay={idx * 100}>
              <Link
                to={`/portfolio/${project.slug}`}
                className={`block relative group overflow-hidden bg-gray-100 rounded-sm border border-gray-200 hover:border-gray-400 transition-all duration-700 focus:outline-none focus:ring-2 focus:ring-harpia-black focus:ring-offset-2 ${
                  idx === 0 && filteredProjects.length > 2
                    ? 'md:col-span-2 aspect-21/9'
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
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-harpia-black/20 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-harpia-black/20 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-harpia-black/20 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-harpia-black/20 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Image Layer */}
                <OptimizedImage
                  src={project.image}
                  alt={`${project.title} - Projeto de ${project.category}`}
                  className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                    hoveredIndex === idx ? 'scale-105 grayscale-0' : 'scale-100 grayscale'
                  }`}
                  loading="lazy"
                />

                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 ${
                    hoveredIndex === idx ? 'opacity-95' : 'opacity-70'
                  }`}
                />

                {/* Number Badge */}
                <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20">
                  <span className="font-mono text-[10px] text-white/60 border border-white/20 px-2.5 py-1 rounded-full backdrop-blur-sm bg-black/30">
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
                  <div className="flex justify-between items-end gap-4">
                    <div className="flex-1">
                      <h3
                        className={`text-white mb-2 transition-transform duration-500 ${
                          idx === 0 && filteredProjects.length > 2
                            ? 'text-2xl md:text-4xl'
                            : 'text-xl md:text-2xl'
                        } ${hoveredIndex === idx ? 'translate-y-0' : 'translate-y-2'}`}
                      >
                        {project.title}
                      </h3>

                      {/* Description on hover */}
                      <p
                        className={`text-white/70 text-sm font-light max-w-md transition-all duration-500 ${
                          hoveredIndex === idx
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-4'
                        }`}
                      >
                        {project.description || 'Clique para ver o projeto completo'}
                      </p>
                    </div>

                    {/* Arrow Button */}
                    <div
                      className={`shrink-0 w-12 h-12 flex items-center justify-center rounded-full border transition-all duration-500 ${
                        hoveredIndex === idx
                          ? 'bg-white text-harpia-black border-white scale-110'
                          : 'bg-white/10 text-white border-white/20'
                      }`}
                    >
                      <ArrowUpRight
                        size={20}
                        strokeWidth={2}
                        className={`transition-transform duration-300 ${
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
              <p className="text-gray-400 text-lg font-light mb-4">
                Nenhum projeto encontrado nesta categoria.
              </p>
              <button
                onClick={() => setActiveCategory('Todos')}
                className="text-sm uppercase tracking-[0.2em] text-harpia-black hover:opacity-70 transition-opacity"
              >
                Ver todos os projetos
              </button>
            </div>
          </Reveal>
        )}

        {/* Navigation Footer */}
        <Reveal delay={0.4}>
          <div className="mt-12 md:mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-black/10">
            {/* Project Counter */}
            <div className="flex items-center gap-4 text-gray-400">
              <span className="text-xs uppercase tracking-[0.2em]">{PROJECTS.length} Projetos</span>
              <div className="w-8 h-px bg-black/10" />
              <span className="text-xs uppercase tracking-[0.2em]">Portfolio Completo</span>
            </div>

            {/* CTA Link */}
            <Link
              to="/servicos"
              className="group/link flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gray-600 hover:text-harpia-black transition-colors duration-300"
              aria-label="Ver todos os projetos"
            >
              Ver Todos
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
