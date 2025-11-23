import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SERVICES } from '../data';
import { Reveal } from './Reveal';
import { OptimizedImage } from './ui/OptimizedImage';

export const ServicesHub: React.FC = () => {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-black/10 pb-8">
          <Reveal>
            <h2 className="font-serif text-4xl md:text-5xl mb-2 text-harpia-black">
              NOSSOS SERVIÇOS
            </h2>
            <p className="font-sans text-gray-500 font-light text-xl">
              Somos movidos por resultados.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <Link
              to="/servicos"
              className="hidden md:inline-block font-sans text-sm uppercase tracking-widest border-b border-black/30 pb-1 hover:text-harpia-black hover:border-harpia-black transition-all focus:outline-none focus:ring-2 focus:ring-harpia-gray text-gray-600"
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
                className="group relative block aspect-[9/16] md:aspect-[3/4] overflow-hidden bg-gray-100 border border-gray-200"
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
                      <span className="italic text-gray-400 group-hover:text-harpia-accent transition-colors duration-300">
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
            className="inline-block font-sans text-sm uppercase tracking-widest border-b border-black/30 pb-1 hover:text-harpia-black transition-all focus:outline-none focus:ring-2 focus:ring-harpia-gray text-gray-600"
          >
            Ver Todos os Serviços
          </Link>
        </div>
      </div>
    </section>
  );
};
