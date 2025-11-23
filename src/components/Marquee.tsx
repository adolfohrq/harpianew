import React from 'react';
import { Star } from 'lucide-react';

interface MarqueeProps {
  items: string[];
}

export const Marquee: React.FC<MarqueeProps> = ({ items }) => {
  return (
    <div className="relative w-full overflow-hidden bg-harpia-black border-y border-white/5 py-8 md:py-10">
      {/* Gradient Mask for seamless edges */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, #050505 0%, transparent 20%, transparent 80%, #050505 100%)',
        }}
      />

      <div className="group relative flex overflow-hidden select-none">
        <div className="flex w-max min-w-full hover:[animation-play-state:paused]">
          {/* 
            Optimization: 
            1. Reduced duplication array from 3 to 2 (sufficient for this content length on most screens).
            2. Added will-change-transform and transform-gpu to force layer promotion.
          */}
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="flex animate-marquee items-center will-change-transform transform-gpu"
              style={{ animationDuration: '40s' }}
            >
              {items.map((item, index) => (
                <MarqueeItem key={`${i}-${index}`} text={item} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MarqueeItem: React.FC<{ text: string }> = React.memo(({ text }) => (
  <div className="flex items-center px-8 md:px-12 group/item cursor-default transition-opacity duration-300 hover:opacity-100 opacity-60">
    <span
      className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold italic text-transparent uppercase tracking-wider transition-all duration-300 group-hover/item:text-white group-hover/item:scale-105"
      style={{
        WebkitTextStroke: '1px rgba(255, 255, 255, 0.4)',
        textRendering: 'optimizeSpeed', // Performance hint for browser
      }}
    >
      {text}
    </span>
    {/* Removed animate-pulse to save GPU cycles on low-end devices */}
    <span className="ml-8 md:ml-12 text-white/30">
      <Star size={14} fill="currentColor" strokeWidth={0} />
    </span>
  </div>
));
