import React, { useEffect, useRef, useState } from 'react';
import { Reveal } from '../Reveal';
import { Sparkles, ArrowDown } from 'lucide-react';

export const ServicesHero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2.5,
        opacity: Math.random() * 0.6,
      });
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.fill();

        particles.forEach((otherParticle, j) => {
          if (i !== j) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * (1 - distance / 120)})`;
              ctx.stroke();
            }
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Animated Particle Network Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-25 pointer-events-none" />

      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Orbs */}
        <div
          className="absolute top-1/3 right-1/3 w-[700px] h-[700px] bg-white/5 rounded-full blur-[140px] animate-pulse"
          style={{
            animationDuration: '7s',
            transform: `translate(${mousePosition.x * 0.025}px, ${mousePosition.y * 0.025}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
        <div
          className="absolute bottom-1/3 left-1/3 w-[550px] h-[550px] bg-white/4 rounded-full blur-[110px] animate-pulse"
          style={{
            animationDuration: '9s',
            animationDelay: '1.5s',
            transform: `translate(${-mousePosition.x * 0.02}px, ${-mousePosition.y * 0.02}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />

        {/* Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-radial-to-br from-transparent via-harpia-black/40 to-harpia-black" />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.06) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10 pt-20">
        <Reveal>
          <div className="inline-flex items-center gap-2 mb-10 border border-white/20 px-7 py-3.5 rounded-full backdrop-blur-md bg-white/5 shadow-2xl">
            <Sparkles size={18} className="text-white animate-pulse" />
            <span className="font-sans text-[11px] uppercase tracking-[0.4em] text-white font-semibold">
              Nossos Serviços
            </span>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl mb-12 leading-[0.9] tracking-tight">
            <span className="block">ELEVE</span>
            <span className="block bg-clip-text text-transparent bg-linear-to-r from-white via-gray-200 to-gray-400 italic font-light">
              SUA MARCA
            </span>
            <span className="block">AO TOPO</span>
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="font-sans font-light text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed mb-16">
            Combinamos <span className="text-white font-normal">criatividade estratégica</span> com{' '}
            <span className="text-white font-normal">execução impecável</span>. Cada serviço é
            desenhado para gerar impacto real e duradouro.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <div className="flex items-center gap-4 px-7 py-4 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm group hover:border-white/30 transition-all duration-300">
              <div className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-pulse" />
              <span className="font-sans text-sm text-gray-300 group-hover:text-white transition-colors">
                4 Serviços Principais
              </span>
            </div>
            <div className="flex items-center gap-4 px-7 py-4 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm group hover:border-white/30 transition-all duration-300">
              <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
              <span className="font-sans text-sm text-gray-300 group-hover:text-white transition-colors">
                Soluções Completas
              </span>
            </div>
          </div>
        </Reveal>

        {/* Scroll Indicator */}
        <Reveal delay={400}>
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce">
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-gray-500">
              Explore Nossos Serviços
            </span>
            <ArrowDown size={20} className="text-gray-500" />
          </div>
        </Reveal>
      </div>

      {/* Decorative Lines */}
      <div className="absolute top-1/2 left-0 w-80 h-px bg-linear-to-r from-transparent to-white/10" />
      <div className="absolute top-1/2 right-0 w-80 h-px bg-linear-to-l from-transparent to-white/10" />
    </section>
  );
};
