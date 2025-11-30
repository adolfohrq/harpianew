import React, { useEffect, useState } from 'react';

export const Preloader: React.FC = () => {
  const [step, setStep] = useState<'closed' | 'opening' | 'done'>('closed');

  useEffect(() => {
    // Hold the black screen briefly to display the text/logo (reduzido para melhorar LCP)
    const timer1 = setTimeout(() => setStep('opening'), 400);

    // Duration of the opening animation (reduzido de 2.2s para 1.2s)
    const timer2 = setTimeout(() => setStep('done'), 1200);

    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Re-enable scroll when animation starts opening
  useEffect(() => {
    if (step === 'opening') {
      document.body.style.overflow = 'unset';
    }
  }, [step]);

  // Usa transform: scale() em vez de width/height para evitar CLS
  // transform não causa reflow/layout shift
  return (
    <div
      className={`fixed inset-0 z-99999 flex items-center justify-center pointer-events-none ${
        step === 'done' ? 'invisible' : 'visible'
      }`}
      aria-hidden={step === 'done'}
    >
      {/*
        The "Shutter/Iris" Mechanism usando transform (não causa CLS):
        - Elemento com tamanho fixo (1px) e box-shadow massivo
        - Usa scale() para expandir (GPU accelerated, não causa reflow)
      */}
      <div
        className="w-px h-px rounded-full shadow-[0_0_0_200vmax_#050505] transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.7,0,0.3,1)] will-change-transform"
        style={{
          transform:
            step === 'closed'
              ? 'scale(0) rotate(0deg)'
              : step === 'opening'
                ? 'scale(150) rotate(12deg)'
                : 'scale(200) rotate(12deg)',
          opacity: step === 'done' ? 0 : 1,
        }}
      />

      {/* Initial Text Overlay */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 z-10 ${step === 'closed' ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="text-center">
          <h1 className="font-serif text-white text-3xl md:text-4xl tracking-[0.2em] uppercase mb-2">
            Harpia
          </h1>
          <div className="h-px w-24 mx-auto bg-white/30 mb-3" />
          <p className="font-sans text-gray-400 text-xs md:text-sm tracking-[0.4em] uppercase animate-pulse">
            Enxergue Mais Longe
          </p>
        </div>
      </div>
    </div>
  );
};
