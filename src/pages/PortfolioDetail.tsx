import React, { useMemo, useState, useEffect } from 'react';
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
import { HeroSection } from '../components/ui';
import { OptimizedImage } from '../components/ui/OptimizedImage';
import { Reveal } from '../components/Reveal';
import { CTASection } from '../components/CTASection';
import { PROJECTS } from '../data';

export const PortfolioDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const projectIndex = useMemo(() => {
    return PROJECTS.findIndex((p) => p.slug === slug);
  }, [slug]);

  const project = useMemo(() => {
    return projectIndex >= 0 ? PROJECTS[projectIndex] : undefined;
  }, [projectIndex]);

  const prevProject = useMemo(() => {
    if (projectIndex <= 0) return PROJECTS[PROJECTS.length - 1];
    return PROJECTS[projectIndex - 1];
  }, [projectIndex]);

  const nextProject = useMemo(() => {
    if (projectIndex >= PROJECTS.length - 1) return PROJECTS[0];
    return PROJECTS[projectIndex + 1];
  }, [projectIndex]);

  useMetaTags({
    title: project ? `${project.title} - Portfólio Harpia` : 'Projeto não encontrado',
    description: project?.description || 'Conheça nossos projetos',
    keywords: project
      ? `${project.category}, portfolio, case, ${project.services?.join(', ')}`
      : 'portfolio',
  });

  // Lightbox handlers
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const galleryLength = project?.gallery?.length ?? 0;

  // Handle body overflow for lightbox
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxOpen]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') {
        setLightboxOpen(false);
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev <= 0 ? galleryLength - 1 : prev - 1));
      }
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev >= galleryLength - 1 ? 0 : prev + 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, galleryLength]);

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (galleryLength === 0) return;
    if (direction === 'prev') {
      setLightboxIndex((prev) => (prev <= 0 ? galleryLength - 1 : prev - 1));
    } else {
      setLightboxIndex((prev) => (prev >= galleryLength - 1 ? 0 : prev + 1));
    }
  };

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
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-harpia-black/[0.02] rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-harpia-black/[0.02] rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3" />
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
                  <div className="bg-white p-8 md:p-10 group hover:bg-harpia-black/[0.02] transition-colors duration-500">
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
                  <div className="bg-white p-8 md:p-10 group hover:bg-harpia-black/[0.02] transition-colors duration-500">
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
                <div className="bg-white p-8 md:p-10 group hover:bg-harpia-black/[0.02] transition-colors duration-500">
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
                <div className="bg-white p-8 md:p-10 group hover:bg-harpia-black/[0.02] transition-colors duration-500">
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
                    <span className="absolute -top-8 -left-4 font-serif text-[180px] md:text-[220px] leading-none text-harpia-black/[0.03] select-none pointer-events-none">
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
                    <span className="absolute -top-8 -left-4 font-serif text-[180px] md:text-[220px] leading-none text-harpia-black/[0.03] select-none pointer-events-none">
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
                      idx === 0 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-[4/3]'
                    }`}
                  >
                    <OptimizedImage
                      src={image}
                      alt={`${project.title} - Imagem ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
          className="fixed inset-0 z-[9999] bg-harpia-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors z-10"
            aria-label="Fechar galeria"
          >
            <X size={24} />
          </button>

          {/* Navigation */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox('prev');
            }}
            className="absolute left-4 md:left-8 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
            aria-label="Imagem anterior"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox('next');
            }}
            className="absolute right-4 md:right-8 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
            aria-label="Próxima imagem"
          >
            <ChevronRight size={24} />
          </button>

          {/* Image */}
          <div className="max-w-6xl max-h-[80vh] mx-4" onClick={(e) => e.stopPropagation()}>
            <OptimizedImage
              src={project.gallery[lightboxIndex]}
              alt={`${project.title} - Imagem ${lightboxIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain"
            />
          </div>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
            <span className="font-mono text-sm text-white/60">
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
            <Quote size={400} strokeWidth={0.5} className="text-harpia-black/[0.02]" />
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
      <section className="bg-harpia-black border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-stretch">
            {/* Previous Project */}
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

            {/* Next Project */}
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
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
};
