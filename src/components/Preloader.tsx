import React, { useEffect, useState } from 'react';

export const Preloader: React.FC = () => {
  const [step, setStep] = useState<'closed' | 'opening' | 'done'>('closed');
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Hold the black screen for a moment to display the text/logo
    const timer1 = setTimeout(() => setStep('opening'), 1000);

    // Duration of the opening animation
    const timer2 = setTimeout(() => setStep('done'), 2200); // 1.2s animation

    // Remove component from DOM
    const timer3 = setTimeout(() => setVisible(false), 2300);

    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Re-enable scroll when animation starts opening
  useEffect(() => {
    if (step === 'opening') {
      document.body.style.overflow = 'unset';
    }
  }, [step]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center pointer-events-none">
      {/* 
        The "Shutter/Iris" Mechanism:
        We use a centered div with a massive box-shadow.
        The box-shadow creates the "black screen" around the div.
        As the div grows, the "hole" (transparent center) grows, revealing the site.
        Rotation adds a mechanical lens feel.
      */}
      <div
        className={`
          rounded-full 
          shadow-[0_0_0_200vmax_#050505] 
          transition-all duration-[1200ms] ease-[cubic-bezier(0.7,0,0.3,1)]
          ${step === 'closed' ? 'w-0 h-0 rotate-0' : ''}
          ${step === 'opening' ? 'w-[150vmax] h-[150vmax] rotate-12' : ''}
          ${step === 'done' ? 'w-[200vmax] h-[200vmax] opacity-0' : ''}
        `}
      ></div>

      {/* Initial Text Overlay (Visible on top of the black shadow) */}
      {/* We need z-index higher than the shadow container if it were separate, 
          but here the shadow is on the sibling div. Since this comes after, it sits on top naturally if positioned absolutely? 
          Actually, the shadow is on the sibling. Box shadow doesn't cover children or siblings usually unless z-index is involved.
          The previous div has the shadow. We need this text to be visible *over* the shadow area (which is the black screen).
      */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 z-10 ${step === 'closed' ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="text-center">
          <h1 className="font-serif text-white text-3xl md:text-4xl tracking-[0.2em] uppercase mb-2">
            Harpia
          </h1>
          <div className="h-[1px] w-24 mx-auto bg-white/30 mb-3"></div>
          <p className="font-sans text-gray-400 text-xs md:text-sm tracking-[0.4em] uppercase animate-pulse">
            Enxergue Mais Longe
          </p>
        </div>
      </div>
    </div>
  );
};
