import React, { useState, useEffect } from 'react';
import { X, Play, Volume2, Sparkles } from 'lucide-react';
import { Reveal } from './Reveal';

// ID extraído da URL fornecida: https://www.youtube.com/embed/TvZY7BofuX0
const VIDEO_ID = 'TvZY7BofuX0';

export const Showreel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      <section className="py-24 bg-harpia-black border-y border-white/5 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-white/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-white/5 rounded-full blur-[120px]" />
        </div>

        {/* Animated Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <Sparkles
              key={i}
              className="absolute text-white/10 animate-pulse"
              size={16}
              style={{
                top: `${20 + i * 15}%`,
                left: `${10 + i * 12}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: '3s',
              }}
            />
          ))}
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          {/* Header Aprimorado */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <Reveal>
              <div>
                <h2 className="font-serif text-3xl md:text-4xl text-white mb-2">
                  MANIFESTO <span className="text-gray-500 italic">VISUAL</span>
                </h2>
                <div className="flex items-center gap-2 text-white/60">
                  <Volume2 size={14} />
                  <span className="text-xs uppercase tracking-wider">Som Recomendado</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="text-right">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500 pb-1 border-b border-white/10">
                  Assista ao Vídeo (00:45)
                </p>
                <p className="text-xs text-white/40 mt-1">Clique para assistir</p>
              </div>
            </Reveal>
          </div>

          {/* Video Card - Melhorado */}
          <Reveal delay={300}>
            <div
              className="relative w-full aspect-video md:aspect-[21/9] bg-harpia-carbon rounded-sm overflow-hidden group cursor-pointer shadow-2xl shadow-black/50 border border-white/10"
              onClick={() => setIsOpen(true)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Thumbnail - Optimized with lazy loading */}
              <img
                src={`https://img.youtube.com/vi/${VIDEO_ID}/hqdefault.jpg`}
                alt="Harpia Showreel"
                loading="lazy"
                decoding="async"
                width="1280"
                height="720"
                className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0"
              />

              {/* Overlay Gradient com efeito animado */}
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent group-hover:from-black/60 transition-all duration-500"></div>

              {/* Shine Effect */}
              <div
                className={`absolute inset-0 bg-linear-to-br from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity duration-500 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* Border Glow on Hover */}
              <div
                className={`absolute inset-0 transition-all duration-500 rounded-sm ${
                  isHovered ? 'shadow-[inset_0_0_60px_rgba(255,255,255,0.1)]' : 'shadow-none'
                }`}
              />

              {/* Play Button - Centralizado e Premium */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Pulse Ring */}
                  <div className="absolute inset-0 w-16 h-16 md:w-20 md:h-20 bg-white/20 rounded-full animate-ping opacity-75"></div>

                  {/* Main Button */}
                  <div className="relative w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:border-white group-hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                    <Play
                      className="w-6 h-6 md:w-8 md:h-8 text-white ml-1 transition-colors duration-300 group-hover:text-black"
                      fill="currentColor"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Info Bar */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center justify-between text-white/80">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Play size={14} fill="currentColor" />
                    </div>
                    <span className="text-sm font-sans">Showreel 2024</span>
                  </div>
                  <span className="text-xs font-mono bg-white/10 px-2 py-1 rounded backdrop-blur-sm">
                    00:45
                  </span>
                </div>
              </div>

              {/* Corner Badge */}
              <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs text-white uppercase tracking-wider flex items-center gap-1">
                  <Sparkles size={12} />
                  Full HD
                </span>
              </div>
            </div>
          </Reveal>

          {/* Additional Info */}
          <Reveal delay={400}>
            <div className="mt-6 text-center text-white/40 text-xs">
              <p>Pressione ESC para fechar • Clique fora para voltar</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Enhanced Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300"
          onClick={() => setIsOpen(false)}
        >
          {/* Close Button - Melhorado */}
          <button
            className="absolute top-4 right-4 z-50 text-white/70 hover:text-white p-3 transition-all hover:bg-white/10 rounded-full backdrop-blur-sm border border-white/10"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            aria-label="Fechar vídeo"
          >
            <X size={24} />
          </button>

          {/* Video Container */}
          <div
            className="w-full max-w-6xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl border border-white/10 animate-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${VIDEO_ID}?si=P4VXAXV7tyevU1s_&autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>

          {/* ESC Hint */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-sm flex items-center gap-2">
            <kbd className="px-2 py-1 bg-white/10 rounded border border-white/20 text-xs font-mono">
              ESC
            </kbd>
            <span>para fechar</span>
          </div>
        </div>
      )}
    </>
  );
};
