import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PROJECTS, SERVICES } from '../data';
import { Reveal } from '../components/Reveal';
import { Testimonials } from '../components/Testimonials';
import { Marquee } from '../components/Marquee';
import { Process } from '../components/Process';
import { Showreel } from '../components/Showreel';
import { Stats } from '../components/Stats';
import { WhyHarpia } from '../components/WhyHarpia';
import { ClientLogos } from '../components/ClientLogos';
import { OptimizedImage } from '../components/ui/OptimizedImage';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { useMetaTags } from '../hooks/useMetaTags';

export const Home: React.FC = () => {
  // Changed ref type to HTMLVideoElement
  const parallaxRef = useRef<HTMLVideoElement>(null);

  useMetaTags({
    title: 'Harpia - Agência de Marketing Premium | Conectando Visões',
    description:
      'Somos uma agência de marketing especializada em criar pontes entre empresas e seus clientes. Estratégia, design e tecnologia para impactar seu negócio.',
    keywords: 'agência marketing, design digital, branding, estratégia, digital agency',
    ogTitle: 'Harpia - Agência de Marketing Premium',
    ogDescription: 'Conectando visões. Voando mais alto. Enxergando mais longe.',
    canonical: window.location.origin,
  });

  useEffect(() => {
    let rafId: number;
    let isInView = false;

    // Use IntersectionObserver to only animate when hero is in viewport
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        isInView = entries[0].isIntersecting;
      },
      { threshold: 0 }
    );

    if (parallaxRef.current) {
      intersectionObserver.observe(parallaxRef.current);
    }

    const handleScroll = () => {
      // Only run parallax when hero is visible
      if (isInView && parallaxRef.current) {
        const scrollPosition = window.scrollY;
        // Use requestAnimationFrame for smooth performance
        rafId = requestAnimationFrame(() => {
          if (parallaxRef.current) {
            parallaxRef.current.style.transform = `translateY(${scrollPosition * 0.5}px) scale(1.1)`;
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial positioning

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video with Overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-harpia-gray/20 via-harpia-black to-harpia-black">
          <video
            ref={parallaxRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1280 720'%3E%3Crect fill='%23050505' width='1280' height='720'/%3E%3Crect fill='%23121212' x='100' y='100' width='1080' height='520'/%3E%3C/svg%3E"
            className="w-full h-full object-cover opacity-40 grayscale contrast-150 will-change-transform"
            style={{ transform: 'scale(1.1)' }}
            onError={(e) => {
              console.warn('Video failed to load, using fallback background');
              (e.target as HTMLVideoElement).style.display = 'none';
            }}
          >
            <source
              src="https://cdn.pixabay.com/video/2024/02/09/199958-911694865_large.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

          <div className="absolute inset-0 bg-gradient-to-b from-harpia-black/60 via-transparent to-harpia-black" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <Reveal>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight mb-8 tracking-wide">
              ENXERGUE <span className="italic text-harpia-gray">MAIS LONGE.</span>
              <br />
              VOE <span className="italic text-harpia-gray">MAIS ALTO.</span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="font-sans font-light text-lg md:text-xl text-harpia-white max-w-2xl mx-auto mb-12 leading-relaxed">
              Somos uma equipe apaixonada e dedicada, especializada em criar pontes entre empresas e
              seus clientes. Nossa missão é simples: conectar você ao seu público-alvo de maneira
              significativa e impactante.
            </p>
          </Reveal>

          <Reveal delay={400}>
            <Link
              to="/servicos"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-harpia-accent text-harpia-black font-sans font-semibold tracking-widest uppercase text-sm hover:bg-harpia-white transition-colors focus:outline-none focus:ring-2 focus:ring-harpia-gray focus:ring-offset-2 focus:ring-offset-harpia-black"
            >
              Conheça Nossos Serviços
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="py-24 bg-harpia-black relative border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <span className="block font-sans text-xs uppercase tracking-[0.3em] text-harpia-gray mb-6">
              Manifesto
            </span>
            <h2 className="font-serif text-3xl md:text-4xl leading-relaxed text-harpia-white">
              "Todo mundo tem uma <span className="text-harpia-accent italic">história</span> para
              contar. Nós acreditamos que cada história importa, e queremos ajudar o seu negócio a
              comunicar de forma <span className="text-harpia-accent italic">efetiva</span> e{' '}
              <span className="text-harpia-accent italic">relevante</span>."
            </h2>
          </Reveal>
        </div>
      </section>

      {/* Stats Section */}
      <ErrorBoundary sectionName="estatísticas">
        <Stats />
      </ErrorBoundary>

      {/* Infinite Marquee */}
      <ErrorBoundary sectionName="marquee">
        <Marquee
          items={['Strategy', 'Vision', 'Motion', 'Design', 'Impact', 'Culture', 'Growth']}
        />
      </ErrorBoundary>

      {/* Why Harpia Section */}
      <ErrorBoundary sectionName="diferenciais">
        <WhyHarpia />
      </ErrorBoundary>

      {/* Services Hub Preview */}
      <section className="py-24 bg-harpia-carbon relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8">
            <Reveal>
              <h2 className="font-serif text-4xl md:text-5xl mb-2">NOSSOS SERVIÇOS</h2>
              <p className="font-sans text-harpia-gray font-light text-xl">
                Somos movidos por resultados.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <Link
                to="/servicos"
                className="hidden md:inline-block font-sans text-sm uppercase tracking-widest border-b border-white/30 pb-1 hover:text-harpia-white hover:border-harpia-accent transition-all focus:outline-none focus:ring-2 focus:ring-harpia-gray"
              >
                Ver Detalhes
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, index) => (
              <Reveal key={service.id} delay={index * 100}>
                <Link
                  to="/servicos"
                  className="group relative block aspect-[9/16] md:aspect-[3/4] overflow-hidden bg-harpia-black border border-white/5"
                >
                  {/* Background Image */}
                  <OptimizedImage
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110 opacity-50 group-hover:opacity-80 grayscale group-hover:grayscale-0"
                    loading="lazy"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 transition-opacity duration-500" />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-10">
                    {/* Top: Index */}
                    <div className="flex justify-between items-start">
                      <span className="font-sans text-xs text-harpia-white/60 border border-white/10 px-2 py-1 rounded-full backdrop-blur-md">
                        0{index + 1}
                      </span>
                      <div className="bg-harpia-accent text-harpia-black p-2 rounded-full opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                        <ArrowRight size={16} />
                      </div>
                    </div>

                    {/* Bottom: Title & Desc */}
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="font-serif text-2xl text-harpia-accent mb-3 leading-tight">
                        {service.title.split(' ')[0]} <br />
                        <span className="italic text-harpia-gray group-hover:text-harpia-accent transition-colors duration-300">
                          {service.title.split(' ').slice(1).join(' ')}
                        </span>
                      </h3>
                      <p className="font-sans text-sm text-harpia-white line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75 font-light leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-colors duration-500 pointer-events-none"></div>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Mobile View All Button */}
          <div className="mt-12 text-center md:hidden">
            <Link
              to="/servicos"
              className="inline-block font-sans text-sm uppercase tracking-widest border-b border-white/30 pb-1 hover:text-harpia-accent transition-all focus:outline-none focus:ring-2 focus:ring-harpia-gray"
            >
              Ver Todos os Serviços
            </Link>
          </div>
        </div>
      </section>

      {/* Showreel Section */}
      <ErrorBoundary sectionName="showreel">
        <Showreel />
      </ErrorBoundary>

      {/* Process / Methodology Section */}
      <ErrorBoundary sectionName="processo">
        <Process />
      </ErrorBoundary>

      {/* Portfolio Preview */}
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

      {/* Client Logos Section */}
      <ErrorBoundary sectionName="logos de clientes">
        <ClientLogos />
      </ErrorBoundary>

      {/* Testimonials Section */}
      <ErrorBoundary sectionName="depoimentos">
        <Testimonials />
      </ErrorBoundary>

      {/* CTA Section */}
      <section className="py-32 relative bg-harpia-carbon overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <Reveal>
            <h2 className="font-serif text-5xl md:text-7xl mb-8">VAMOS VOAR JUNTOS?</h2>
            <Link
              to="/contato"
              className="inline-block font-sans px-10 py-5 border border-harpia-white/20 hover:bg-harpia-accent hover:text-harpia-black transition-all duration-300 text-sm uppercase tracking-[0.2em] focus:outline-none focus:ring-2 focus:ring-harpia-accent focus:ring-offset-2 focus:ring-offset-harpia-carbon"
            >
              Iniciar Projeto
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
};
