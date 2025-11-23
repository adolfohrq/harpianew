import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Film, Volume2, VolumeX } from 'lucide-react';
import { Reveal } from './Reveal';

const VIDEO_ID = 'TvZY7BofuX0';

export const Showreel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(() => {
      setIsOpen(true);
    }, 400);
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setIsOpening(false);
    }, 300);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({
          event: 'command',
          func: isMuted ? 'unMute' : 'mute',
        }),
        '*'
      );
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      <section className="py-32 bg-harpia-black border-y border-white/5 relative overflow-hidden">
        {/* Film grain texture */}
        <div
          className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
          }}
        />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          {/* Header Cinematográfico */}
          <div className="mb-16 text-center">
            <Reveal>
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-16 h-px bg-white/20" />
                <Film className="w-5 h-5 text-white/40" strokeWidth={1.5} />
                <div className="w-16 h-px bg-white/20" />
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-serif text-4xl md:text-6xl text-white mb-4 tracking-tight">
                Showreel <span className="italic text-white/50">2024</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-white/40 text-sm uppercase tracking-[0.3em] font-light">
                45 Segundos de Impacto
              </p>
            </Reveal>
          </div>

          {/* Video Card Premium */}
          <Reveal delay={300}>
            <div
              ref={cardRef}
              className="relative w-full aspect-video md:aspect-21/9 bg-harpia-carbon overflow-hidden group cursor-pointer"
              onClick={handleOpen}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${-mousePosition.y * 0.05}deg) rotateY(${mousePosition.x * 0.05}deg)`,
                transition: 'transform 0.1s ease-out',
              }}
            >
              {/* Floating light orb */}
              <div
                className="absolute w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none transition-all duration-300 opacity-0 group-hover:opacity-100"
                style={{
                  left: `${50 + mousePosition.x}%`,
                  top: `${50 + mousePosition.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              />

              {/* Thumbnail */}
              <img
                src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                alt="Harpia Showreel 2024"
                loading="lazy"
                decoding="async"
                width="1920"
                height="1080"
                className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.02] brightness-75 group-hover:brightness-90"
              />

              {/* Vignette */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-black/50" />

              {/* Scanlines effect */}
              <div
                className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity pointer-events-none"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.03) 4px)',
                }}
              />

              {/* Edge glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent" />
                <div className="absolute top-0 left-0 bottom-0 w-px bg-linear-to-b from-transparent via-white/40 to-transparent" />
                <div className="absolute top-0 right-0 bottom-0 w-px bg-linear-to-b from-transparent via-white/40 to-transparent" />
              </div>

              {/* Center Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative group/play">
                  {/* Outer glow ring */}
                  <div className="absolute inset-0 w-20 h-20 md:w-24 md:h-24 bg-white/10 rounded-full blur-xl group-hover/play:bg-white/20 transition-all duration-500" />

                  {/* Play button */}
                  <div className="relative w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center transform group-hover/play:scale-110 transition-all duration-500 shadow-2xl">
                    <Play className="w-8 h-8 md:w-10 md:h-10 text-black ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>

              {/* Film strip perforations (top) */}
              <div className="absolute top-2 left-0 right-0 flex justify-between px-2 opacity-20 group-hover:opacity-30 transition-opacity pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <div key={`top-${i}`} className="w-1 h-2 bg-white/50 rounded-sm" />
                ))}
              </div>

              {/* Film strip perforations (bottom) */}
              <div className="absolute bottom-2 left-0 right-0 flex justify-between px-2 opacity-20 group-hover:opacity-30 transition-opacity pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <div key={`bottom-${i}`} className="w-1 h-2 bg-white/50 rounded-sm" />
                ))}
              </div>
            </div>
          </Reveal>

          {/* Hint */}
          <Reveal delay={400}>
            <div className="mt-8 text-center">
              <p className="text-white/30 text-xs uppercase tracking-[0.2em]">
                Clique para iniciar • ESC para sair
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Theatrical Curtain Opening Modal */}
      {(isOpening || isOpen) && (
        <div className="fixed inset-0 z-[100]">
          {/* Curtain Left */}
          <div
            className="absolute top-0 left-0 bottom-0 w-1/2 bg-black transition-transform duration-700 ease-in-out"
            style={{
              transform: isOpen ? 'translateX(-100%)' : 'translateX(0)',
            }}
          >
            <div className="absolute right-0 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-white/20 to-transparent" />
          </div>

          {/* Curtain Right */}
          <div
            className="absolute top-0 right-0 bottom-0 w-1/2 bg-black transition-transform duration-700 ease-in-out"
            style={{
              transform: isOpen ? 'translateX(100%)' : 'translateX(0)',
            }}
          >
            <div className="absolute left-0 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-white/20 to-transparent" />
          </div>

          {/* Main Content - Appears after curtain opens */}
          <div
            className={`absolute inset-0 bg-black flex items-center justify-center p-6 transition-opacity duration-500 ${
              isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={handleClose}
          >
            {/* Close Button */}
            <button
              className="absolute top-8 right-8 z-50 w-12 h-12 flex items-center justify-center text-white/50 hover:text-white transition-all duration-300 hover:rotate-90 group/close"
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
              aria-label="Fechar vídeo"
            >
              <div className="absolute inset-0 border border-white/10 group-hover/close:border-white/30 transition-colors rounded-full" />
              <X size={20} strokeWidth={1.5} />
            </button>

            {/* Mute Toggle */}
            <button
              className="absolute top-8 left-8 z-50 w-12 h-12 flex items-center justify-center text-white/50 hover:text-white transition-all duration-300 group/mute"
              onClick={toggleMute}
              aria-label={isMuted ? 'Ativar som' : 'Silenciar'}
            >
              <div className="absolute inset-0 border border-white/10 group-hover/mute:border-white/30 transition-colors rounded-full" />
              {isMuted ? (
                <VolumeX size={18} strokeWidth={1.5} />
              ) : (
                <Volume2 size={18} strokeWidth={1.5} />
              )}
            </button>

            {/* Video Container with fade in */}
            <div
              className={`w-full max-w-6xl aspect-video relative transition-all duration-700 delay-300 ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'}`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Video border frame */}
              <div className="absolute -inset-px bg-linear-to-br from-white/20 via-transparent to-white/10 rounded-sm" />

              {/* Video */}
              <div className="relative w-full h-full bg-black overflow-hidden rounded-sm">
                {isOpen && (
                  <iframe
                    ref={iframeRef}
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`}
                    title="Harpia Showreel 2024"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                )}
              </div>

              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/30" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/30" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/30" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/30" />
            </div>

            {/* Bottom text hint */}
            <div
              className={`absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 text-xs uppercase tracking-[0.3em] transition-all duration-700 delay-500 ${
                isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Pressione ESC ou clique fora para fechar
            </div>
          </div>
        </div>
      )}
    </>
  );
};
