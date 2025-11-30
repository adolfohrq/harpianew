import React, { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Quote,
  ChevronRight,
  ChevronLeft,
  X,
} from 'lucide-react';
import { useMetaTags } from '../hooks/useMetaTags';
import {
  useStructuredData,
  HARPIA_ORGANIZATION,
  createPortfolioSchema,
} from '../hooks/useStructuredData';
import { useWordPressProject, useWordPressProjects } from '../hooks/useWordPressProjects';
import { HeroSection, ProjectDetailSkeleton } from '../components/ui';
import { OptimizedImage } from '../components/ui/OptimizedImage';
import { Reveal } from '../components/Reveal';
import { CTASection } from '../components/CTASection';

export const PortfolioDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Refs para focus trap no lightbox
  const lightboxRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Busca projeto do WordPress (com fallback para dados estáticos)
  const { project, isLoading: projectLoading } = useWordPressProject(slug || '');

  // Busca todos os projetos para navegação anterior/próximo
  const { projects: allProjects, isLoading: allProjectsLoading } = useWordPressProjects();

  const isLoading = projectLoading || allProjectsLoading;

  const projectIndex = useMemo(() => {
    return allProjects.findIndex((p) => p.slug === slug);
  }, [slug, allProjects]);

  const prevProject = useMemo(() => {
    if (allProjects.length === 0) return null;
    if (projectIndex <= 0) return allProjects[allProjects.length - 1];
    return allProjects[projectIndex - 1];
  }, [projectIndex, allProjects]);

  const nextProject = useMemo(() => {
    if (allProjects.length === 0) return null;
    if (projectIndex >= allProjects.length - 1) return allProjects[0];
    return allProjects[projectIndex + 1];
  }, [projectIndex, allProjects]);

  useMetaTags({
    title: project ? `${project.title} - Portfólio Harpia` : 'Projeto não encontrado',
    description: project?.description || 'Conheça nossos projetos',
    keywords: project
      ? `${project.category}, portfolio, case, ${project.services?.join(', ')}`
      : 'portfolio',
  });

  useStructuredData(
    project
      ? [
          HARPIA_ORGANIZATION,
          createPortfolioSchema(
            project.title,
            project.description,
            project.image,
            project.year?.toString()
          ),
        ]
      : []
  );

  // Lightbox handlers
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const galleryLength = project?.gallery?.length ?? 0;

  const goToPrev = useCallback(() => {
    if (galleryLength === 0) return;
    setLightboxIndex((i) => (i <= 0 ? galleryLength - 1 : i - 1));
  }, [galleryLength]);

  const goToNext = useCallback(() => {
    if (galleryLength === 0) return;
    setLightboxIndex((i) => (i >= galleryLength - 1 ? 0 : i + 1));
  }, [galleryLength]);

  // Handle body overflow for lightbox
  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxOpen]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, goToPrev, goToNext]);

  // Focus trap para acessibilidade do lightbox
  useEffect(() => {
    if (!lightboxOpen) {
      // Restaura foco ao elemento anterior quando fecha
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
        previousActiveElement.current = null;
      }
      return;
    }

    // Salva o elemento ativo atual antes de abrir
    previousActiveElement.current = document.activeElement as HTMLElement;

    // Move foco para o botão de fechar quando abre
    const focusTimer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    // Focus trap: impede Tab de sair do lightbox
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusableElements = [
        closeButtonRef.current,
        prevButtonRef.current,
        nextButtonRef.current,
      ].filter(Boolean) as HTMLElement[];

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        // Shift+Tab: vai do primeiro para o último
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab: vai do último para o primeiro
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener('keydown', handleTabKey);
    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleTabKey);
    };
  }, [lightboxOpen]);

  // Estado de carregamento
  if (isLoading) {
    return <ProjectDetailSkeleton />;
  }

  if (!project) {
    return <Navigate to="/portfolio" replace />;
  }

  return (
    <div className="w-full relative bg-white">
      {/* Hero Section usando componente reutilizável */}
      <HeroSection
        subtitle={project.category}
        title={
          <>
            {project.title.split(' ')[0]}
            <br />
            <span className="italic text-white/40">
              {project.title.split(' ').slice(1).join(' ') || project.title}
            </span>
          </>
        }
        description={project.description}
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Portfólio', href: '/portfolio' },
          { label: project.title },
        ]}
      />

      {/* Project Info Section */}
      <section className="relative bg-white overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-harpia-black/2 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-harpia-black/2 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3" />
        </div>

        {/* Top Section - Project Overview */}
        <div className="relative z-10 py-20 md:py-32 border-b border-harpia-black/5">
          <div className="max-w-7xl mx-auto px-6">
            {/* Back Link */}
            <Reveal>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-3 text-sm text-harpia-gray/50 hover:text-harpia-black transition-all duration-300 group mb-16"
              >
                <span className="w-10 h-10 rounded-full border border-harpia-black/10 flex items-center justify-center group-hover:border-harpia-black/30 group-hover:bg-harpia-black group-hover:text-white transition-all duration-300">
                  <ArrowLeft
                    size={16}
                    className="group-hover:-translate-x-0.5 transition-transform"
                  />
                </span>
                <span className="uppercase tracking-[0.2em] text-xs">Voltar ao Portfólio</span>
              </Link>
            </Reveal>

            {/* Project Meta Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-harpia-black/5 rounded-2xl overflow-hidden">
              {project.client && (
                <Reveal>
                  <div className="bg-white p-8 md:p-10 group hover:bg-harpia-black/2 transition-colors duration-500">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-8 h-8 rounded-full bg-harpia-black/5 flex items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-harpia-black/30" />
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.3em] text-harpia-gray/40 font-medium">
                        Cliente
                      </span>
                    </div>
                    <span className="font-serif text-xl md:text-2xl text-harpia-black block group-hover:translate-x-1 transition-transform duration-300">
                      {project.client}
                    </span>
                  </div>
                </Reveal>
              )}

              {project.year && (
                <Reveal delay={50}>
                  <div className="bg-white p-8 md:p-10 group hover:bg-harpia-black/2 transition-colors duration-500">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-8 h-8 rounded-full bg-harpia-black/5 flex items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-harpia-black/30" />
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.3em] text-harpia-gray/40 font-medium">
                        Ano
                      </span>
                    </div>
                    <span className="font-serif text-xl md:text-2xl text-harpia-black block group-hover:translate-x-1 transition-transform duration-300">
                      {project.year}
                    </span>
                  </div>
                </Reveal>
              )}

              <Reveal delay={100}>
                <div className="bg-white p-8 md:p-10 group hover:bg-harpia-black/2 transition-colors duration-500">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 rounded-full bg-harpia-black/5 flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-harpia-black/30" />
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-harpia-gray/40 font-medium">
                      Categoria
                    </span>
                  </div>
                  <span className="font-serif text-xl md:text-2xl text-harpia-black block group-hover:translate-x-1 transition-transform duration-300">
                    {project.category}
                  </span>
                </div>
              </Reveal>

              <Reveal delay={150}>
                <div className="bg-white p-8 md:p-10 group hover:bg-harpia-black/2 transition-colors duration-500">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 rounded-full bg-harpia-black/5 flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-harpia-black/30" />
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-harpia-gray/40 font-medium">
                      Projeto
                    </span>
                  </div>
                  <span className="font-mono text-xl md:text-2xl text-harpia-black/30 block">
                    #{String(projectIndex + 1).padStart(2, '0')}
                  </span>
                </div>
              </Reveal>
            </div>

            {/* Services Tags */}
            {project.services && project.services.length > 0 && (
              <Reveal delay={200}>
                <div className="mt-12">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-harpia-gray/40 mr-2">
                      Serviços:
                    </span>
                    {project.services.map((service, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-5 py-2.5 bg-harpia-black text-white rounded-full hover:bg-harpia-gray transition-colors duration-300 cursor-default"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </div>

        {/* Challenge & Solution Section */}
        <div className="relative z-10 py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              {/* Challenge */}
              {project.challenge && (
                <Reveal>
                  <div className="relative">
                    {/* Large decorative number */}
                    <span className="absolute -top-8 -left-4 font-serif text-[180px] md:text-[220px] leading-none text-harpia-black/3 select-none pointer-events-none">
                      01
                    </span>

                    <div className="relative">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-14 h-14 rounded-full bg-harpia-black flex items-center justify-center">
                          <span className="font-mono text-sm text-white font-medium">01</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase tracking-[0.3em] text-harpia-gray/40 block">
                            Fase Inicial
                          </span>
                          <span className="text-sm uppercase tracking-[0.15em] text-harpia-black font-medium">
                            O Desafio
                          </span>
                        </div>
                      </div>

                      <h2 className="font-serif text-3xl md:text-4xl text-harpia-black mb-8 leading-[1.1]">
                        Entendendo o<br />
                        <span className="italic text-harpia-gray/50">problema</span>
                      </h2>

                      <div className="relative pl-6 border-l-2 border-harpia-black/10">
                        <p className="text-harpia-gray/70 text-lg md:text-xl leading-relaxed font-light">
                          {project.challenge}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )}

              {/* Solution */}
              {project.solution && (
                <Reveal delay={150}>
                  <div className="relative lg:mt-20">
                    {/* Large decorative number */}
                    <span className="absolute -top-8 -left-4 font-serif text-[180px] md:text-[220px] leading-none text-harpia-black/3 select-none pointer-events-none">
                      02
                    </span>

                    <div className="relative">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-14 h-14 rounded-full bg-harpia-black flex items-center justify-center">
                          <span className="font-mono text-sm text-white font-medium">02</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase tracking-[0.3em] text-harpia-gray/40 block">
                            Execução
                          </span>
                          <span className="text-sm uppercase tracking-[0.15em] text-harpia-black font-medium">
                            A Solução
                          </span>
                        </div>
                      </div>

                      <h2 className="font-serif text-3xl md:text-4xl text-harpia-black mb-8 leading-[1.1]">
                        Nossa
                        <br />
                        <span className="italic text-harpia-gray/50">abordagem</span>
                      </h2>

                      <div className="relative pl-6 border-l-2 border-harpia-black/10">
                        <p className="text-harpia-gray/70 text-lg md:text-xl leading-relaxed font-light">
                          {project.solution}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="py-20 md:py-32 bg-harpia-black">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal>
              <div className="flex items-center justify-between mb-12 md:mb-16">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm text-white/30">04</span>
                  <div className="w-12 h-px bg-white/20" />
                  <span className="text-sm uppercase tracking-[0.3em] text-white/50">
                    Galeria do Projeto
                  </span>
                </div>
                <span className="text-xs text-white/40">{project.gallery.length} imagens</span>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {project.gallery.map((image, idx) => (
                <Reveal key={idx} delay={idx * 80}>
                  <button
                    onClick={() => openLightbox(idx)}
                    className={`relative overflow-hidden group cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-white/30 rounded-lg ${
                      idx === 0 ? 'md:col-span-2 aspect-21/9' : 'aspect-4/3'
                    }`}
                  >
                    <OptimizedImage
                      src={image}
                      alt={`${project.title} - Imagem ${idx + 1}`}
                      width={idx === 0 ? 1200 : 800}
                      height={idx === 0 ? 514 : 600}
                      aspectRatio={idx === 0 ? '21/9' : '4/3'}
                      containerClassName="w-full h-full"
                      className="transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-harpia-black/0 group-hover:bg-harpia-black/40 transition-colors duration-500 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500">
                        <ArrowUpRight size={24} className="text-white" />
                      </div>
                    </div>
                    {/* Image number */}
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span className="font-mono text-xs text-white/60 bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
                        {String(idx + 1).padStart(2, '0')} /{' '}
                        {String(project.gallery!.length).padStart(2, '0')}
                      </span>
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox */}
      {lightboxOpen && project.gallery && (
        <div
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Galeria de imagens - ${project.title}`}
          className="fixed inset-0 z-9999 bg-harpia-black/95 backdrop-blur-sm"
        >
          {/* Backdrop click to close */}
          <div className="absolute inset-0" onClick={closeLightbox} />

          {/* Close button */}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Fechar galeria"
          >
            <X size={24} />
          </button>

          {/* Navigation - Previous */}
          <button
            ref={prevButtonRef}
            type="button"
            onClick={goToPrev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Imagem anterior"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Navigation - Next */}
          <button
            ref={nextButtonRef}
            type="button"
            onClick={goToNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Próxima imagem"
          >
            <ChevronRight size={24} />
          </button>

          {/* Image Container */}
          <div className="absolute inset-0 flex items-center justify-center p-16 md:p-24 pointer-events-none">
            <img
              src={project.gallery[lightboxIndex]}
              alt={`${project.title} - Imagem ${lightboxIndex + 1}`}
              width={1200}
              height={800}
              loading="lazy"
              className="max-w-full max-h-full object-contain pointer-events-auto"
            />
          </div>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50">
            <span className="font-mono text-sm text-white/60 bg-black/50 px-4 py-2 rounded-full">
              {String(lightboxIndex + 1).padStart(2, '0')} /{' '}
              {String(project.gallery.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      )}

      {/* Testimonial Section */}
      {project.testimonial && (
        <section className="py-20 md:py-32 bg-white relative overflow-hidden">
          {/* Background quote mark */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <Quote size={400} strokeWidth={0.5} className="text-harpia-black/2" />
          </div>

          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <Reveal>
              <div className="text-center">
                <Quote size={48} strokeWidth={1} className="text-harpia-black/10 mx-auto mb-10" />
                <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl text-harpia-black leading-relaxed mb-10">
                  "{project.testimonial.text}"
                </blockquote>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-px bg-harpia-black/20 mb-6" />
                  <span className="block text-harpia-black font-medium text-lg">
                    {project.testimonial.author}
                  </span>
                  <span className="text-sm text-harpia-gray/60 mt-1">
                    {project.testimonial.role}
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Project Navigation */}
      {(prevProject || nextProject) && (
        <section className="bg-harpia-black border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-stretch">
              {/* Previous Project */}
              {prevProject && (
                <Link
                  to={`/portfolio/${prevProject.slug}`}
                  className="group flex-1 flex items-center gap-4 md:gap-6 p-6 md:p-8 border-r border-white/10 hover:bg-white/5 transition-all duration-300"
                >
                  <span className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:border-white transition-all duration-300">
                    <ArrowLeft
                      size={18}
                      className="text-white/60 group-hover:text-harpia-black group-hover:-translate-x-0.5 transition-all duration-300"
                    />
                  </span>
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-1">
                      Anterior
                    </span>
                    <h3 className="font-serif text-base md:text-lg text-white truncate">
                      {prevProject.title}
                    </h3>
                  </div>
                </Link>
              )}

              {/* Next Project */}
              {nextProject && (
                <Link
                  to={`/portfolio/${nextProject.slug}`}
                  className="group flex-1 flex items-center justify-end gap-4 md:gap-6 p-6 md:p-8 hover:bg-white/5 transition-all duration-300"
                >
                  <div className="min-w-0 text-right">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-1">
                      Próximo
                    </span>
                    <h3 className="font-serif text-base md:text-lg text-white truncate">
                      {nextProject.title}
                    </h3>
                  </div>
                  <span className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:border-white transition-all duration-300">
                    <ArrowRight
                      size={18}
                      className="text-white/60 group-hover:text-harpia-black group-hover:translate-x-0.5 transition-all duration-300"
                    />
                  </span>
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <CTASection />
    </div>
  );
};
