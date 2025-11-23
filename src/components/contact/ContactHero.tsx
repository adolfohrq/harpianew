import React, { useEffect, useRef, useState } from 'react';
import { Reveal } from '../Reveal';
import { Sparkles, ArrowDown } from 'lucide-react';

export const ContactHero: React.FC = () => {
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

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2,
        opacity: Math.random() * 0.5,
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

            if (distance < 150) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 150)})`;
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
      <canvas ref={canvasRef} className="absolute inset-0 opacity-30 pointer-events-none" />

      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Orbs */}
        <div
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] animate-pulse"
          style={{
            animationDuration: '8s',
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
        <div
          className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-white/3 rounded-full blur-[100px] animate-pulse"
          style={{
            animationDuration: '10s',
            animationDelay: '2s',
            transform: `translate(${-mousePosition.x * 0.015}px, ${-mousePosition.y * 0.015}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />

        {/* Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-radial-to-br from-transparent via-harpia-black/50 to-harpia-black" />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 text-center relative z-10 pt-20">
        <Reveal>
          <div className="inline-flex items-center gap-2 mb-8 border border-white/20 px-6 py-3 rounded-full backdrop-blur-md bg-white/5 shadow-2xl">
            <Sparkles size={16} className="text-white animate-pulse" />
            <span className="font-sans text-[11px] uppercase tracking-[0.4em] text-white font-semibold">
              Vamos Conversar
            </span>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl mb-10 leading-[0.9] tracking-tight">
            <span className="block">VAMOS</span>
            <span className="block bg-clip-text text-transparent bg-linear-to-r from-white via-gray-200 to-gray-400 italic font-light">
              VOAR
            </span>
            <span className="block">JUNTOS?</span>
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="font-sans font-light text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12">
            Transforme sua <span className="text-white font-normal">visão estratégica</span> em{' '}
            <span className="text-white font-normal">realidade digital</span>. Nossa equipe está
            pronta para elevar sua marca a novos patamares.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="font-sans text-sm text-gray-300">Disponível Agora</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
              <span className="font-sans text-sm text-gray-300">
                Resposta em até <span className="text-white font-semibold">24h</span>
              </span>
            </div>
          </div>
        </Reveal>

        {/* Scroll Indicator */}
        <Reveal delay={400}>
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce">
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-gray-500">
              Role para Baixo
            </span>
            <ArrowDown size={20} className="text-gray-500" />
          </div>
        </Reveal>
      </div>

      {/* Decorative Lines */}
      <div className="absolute top-1/2 left-0 w-64 h-px bg-linear-to-r from-transparent to-white/10" />
      <div className="absolute top-1/2 right-0 w-64 h-px bg-linear-to-l from-transparent to-white/10" />
    </section>
  );
};
