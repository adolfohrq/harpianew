import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PROJECTS, SERVICES } from '../constants';
import { Reveal } from '../components/Reveal';
import { Testimonials } from '../components/Testimonials';
import { Marquee } from '../components/Marquee';
import { Process } from '../components/Process';
import { Showreel } from '../components/Showreel';

export const Home: React.FC = () => {
  // Changed ref type to HTMLVideoElement
  const parallaxRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollPosition = window.scrollY;
        // Only animate if the hero section is likely in view (100vh)
        if (scrollPosition <= window.innerHeight) {
          // Use requestAnimationFrame for smooth performance
          rafId = requestAnimationFrame(() => {
            if (parallaxRef.current) {
              parallaxRef.current.style.transform = `translateY(${scrollPosition * 0.5}px) scale(1.1)`;
            }
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial positioning

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video with Overlay */}
        <div className="absolute inset-0 z-0">
          <video
            ref={parallaxRef}
            autoPlay
            loop
            muted
            playsInline
            // Using a moody, atmospheric cloud timelapse that suggests "Flight" and "Vision"
            // Source: Pexels Free Stock Video
            poster="https://images.pexels.com/photos/5355988/pexels-photo-5355988.jpeg"
            className="w-full h-full object-cover opacity-40 grayscale contrast-150 will-change-transform"
            style={{ transform: 'scale(1.1)' }}
          >
            <source src="https://cdn.pixabay.com/video/2024/02/09/199958-911694865_large.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="absolute inset-0 bg-gradient-to-b from-harpia-black/60 via-transparent to-harpia-black" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <Reveal>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight mb-8 tracking-wide">
              ENXERGUE <span className="italic text-gray-400">MAIS LONGE.</span><br />
              VOE <span className="italic text-gray-400">MAIS ALTO.</span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="font-sans font-light text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
              Somos uma equipe apaixonada e dedicada, especializada em criar pontes entre empresas e seus clientes. Nossa missão é simples: conectar você ao seu público-alvo de maneira significativa e impactante.
            </p>
          </Reveal>

          <Reveal delay={400}>
            <Link
              to="/servicos"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold tracking-widest uppercase text-sm hover:bg-gray-200 transition-colors"
            >
              Conheça Nossos Serviços
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="py-32 bg-harpia-black relative border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <span className="block text-xs uppercase tracking-[0.3em] text-gray-500 mb-6">Manifesto</span>
            <h2 className="font-serif text-3xl md:text-4xl leading-relaxed text-gray-200">
              "Todo mundo tem uma <span className="text-white italic">história</span> para contar. Nós acreditamos que cada história importa, e queremos ajudar o seu negócio a comunicar de forma <span className="text-white italic">efetiva</span> e <span className="text-white italic">relevante</span>."
            </h2>
          </Reveal>
        </div>
      </section>

      {/* Infinite Marquee */}
      <Marquee items={['Strategy', 'Vision', 'Motion', 'Design', 'Impact', 'Culture', 'Growth']} />

      {/* Services Hub Preview */}
      <section className="py-32 bg-harpia-carbon relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8">
            <Reveal>
              <h2 className="font-serif text-4xl md:text-5xl mb-2">NOSSOS SERVIÇOS</h2>
              <p className="text-gray-400 font-light text-xl">Somos movidos por resultados.</p>
            </Reveal>
            <Reveal delay={200}>
              <Link to="/servicos" className="hidden md:inline-block text-sm uppercase tracking-widest border-b border-white/30 pb-1 hover:text-gray-300 hover:border-white transition-all">Ver Detalhes</Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, index) => (
              <Reveal key={service.id} delay={index * 100}>
                <Link to="/servicos" className="group relative block aspect-[9/16] md:aspect-[3/4] overflow-hidden bg-harpia-black border border-white/5">
                  {/* Background Image */}
                  <img
                    src={`${service.image}?grayscale`}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110 opacity-50 group-hover:opacity-80 grayscale group-hover:grayscale-0"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 transition-opacity duration-500" />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-10">
                    {/* Top: Index */}
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-mono text-white/60 border border-white/10 px-2 py-1 rounded-full backdrop-blur-md">
                        0{index + 1}
                      </span>
                      <div className="bg-white text-black p-2 rounded-full opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                        <ArrowRight size={16} />
                      </div>
                    </div>

                    {/* Bottom: Title & Desc */}
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="font-serif text-2xl text-white mb-3 leading-tight">
                        {service.title.split(' ')[0]} <br />
                        <span className="italic text-gray-400 group-hover:text-white transition-colors duration-300">
                          {service.title.split(' ').slice(1).join(' ')}
                        </span>
                      </h3>
                      <p className="text-sm text-gray-300 line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75 font-light leading-relaxed">
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
            <Link to="/servicos" className="inline-block text-sm uppercase tracking-widest border-b border-white/30 pb-1 hover:text-white transition-all">
              Ver Todos os Serviços
            </Link>
          </div>
        </div>
      </section>

      {/* Showreel Section */}
      <Showreel />

      {/* Process / Methodology Section */}
      <Process />

      {/* Portfolio Preview */}
      <section className="py-32 bg-harpia-black">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl mb-6">PROJETOS RECENTES</h2>
              <Link to="/servicos" className="text-xs uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors">
                Explorar o portfólio completo
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS.map((project, idx) => (
              <Reveal key={project.id} delay={idx * 100}>
                <div className="relative group overflow-hidden aspect-[16/10] border border-white/5 cursor-pointer">
                  {/* Image Layer */}
                  <img
                    src={`${project.image}?grayscale`}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                  />

                  {/* Overlay Layer */}
                  <div className="absolute inset-0 bg-harpia-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-2">

                    {/* Animated Content */}
                    {/* Refined Animation: Subtle upward translation (translate-y-4 and translate-y-8) */}
                    <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-100">
                      <span className="text-xs uppercase tracking-[0.3em] text-gray-400 border-b border-white/20 pb-2">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="font-serif text-3xl md:text-4xl text-white transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-200">
                      {project.title}
                    </h3>

                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-40 relative bg-harpia-carbon overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <Reveal>
            <h2 className="font-serif text-5xl md:text-7xl mb-8">VAMOS VOAR JUNTOS?</h2>
            <Link
              to="/contato"
              className="inline-block px-10 py-5 border border-white/20 hover:bg-white hover:text-black transition-all duration-300 text-sm uppercase tracking-[0.2em]"
            >
              Iniciar Projeto
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
};