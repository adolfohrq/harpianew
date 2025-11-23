import React, { useState, useEffect } from 'react';
import { X, Play } from 'lucide-react';
import { Reveal } from './Reveal';

// ID extraído da URL fornecida: https://www.youtube.com/embed/TvZY7BofuX0
const VIDEO_ID = "TvZY7BofuX0";

export const Showreel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
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
      <section className="py-24 bg-harpia-black border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          
          {/* Header Compacto */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <Reveal>
              <h2 className="font-serif text-3xl md:text-4xl text-white">
                MANIFESTO <span className="text-gray-500 italic">VISUAL</span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500 pb-1 border-b border-white/10">
                Assista ao Vídeo (00:45)
              </p>
            </Reveal>
          </div>

          {/* Video Card - Simples e Direto */}
          <Reveal delay={300}>
            <div 
              className="relative w-full aspect-video md:aspect-[21/9] bg-harpia-carbon rounded-sm overflow-hidden group cursor-pointer shadow-2xl shadow-black/50 border border-white/10"
              onClick={() => setIsOpen(true)}
            >
              {/* Thumbnail - Optimized with lazy loading */}
              <img 
                src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                alt="Harpia Showreel"
                loading="lazy"
                decoding="async"
                width="1280"
                height="720"
                className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500"></div>

              {/* Play Button - Centralizado e Óbvio */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:border-white">
                  <Play 
                    className="w-6 h-6 md:w-8 md:h-8 text-white ml-1 transition-colors duration-300 group-hover:text-black" 
                    fill="currentColor" 
                  />
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* Standard Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300"
          onClick={() => setIsOpen(false)}
        >
          <button 
            className="absolute top-4 right-4 z-50 text-white/70 hover:text-white p-2 transition-colors"
            onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
          >
            <X size={32} />
          </button>

          <div 
            className="w-full max-w-6xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl border border-white/10"
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
        </div>
      )}
    </>
  );
};