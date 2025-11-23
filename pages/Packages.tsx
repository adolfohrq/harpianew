import React from 'react';
import { PACKAGES } from '../constants';
import { Reveal } from '../components/Reveal';
import { Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Packages: React.FC = () => {
  return (
    <div className="min-h-screen bg-harpia-black pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <Reveal>
            <h1 className="font-serif text-5xl md:text-6xl mb-6">PLANOS DE VOO</h1>
            <p className="text-gray-400 font-light text-lg">
              Escolha a altitude que sua marca deseja alcançar. Nossos pacotes de Gestão de Redes Sociais são desenhados para cada estágio do seu negócio.
            </p>
          </Reveal>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PACKAGES.map((pkg, idx) => (
            <Reveal key={pkg.id} delay={idx * 150}>
              <div 
                className={`relative p-8 border transition-all duration-500 group hover:-translate-y-2 h-full flex flex-col
                  ${pkg.level === 'pro' 
                    ? 'border-white bg-white text-black' 
                    : 'border-white/10 bg-harpia-carbon text-white hover:border-white/30'
                  }`}
              >
                {/* Highlight Badge for Pro */}
                {pkg.level === 'pro' && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-1 text-xs uppercase tracking-widest">
                    Recomendado
                  </div>
                )}

                <div className="mb-8 text-center">
                  <h3 className="font-serif text-3xl mb-2">{pkg.name}</h3>
                  <p className={`text-sm font-light ${pkg.level === 'pro' ? 'text-gray-600' : 'text-gray-400'}`}>
                    {pkg.description}
                  </p>
                </div>

                <div className="flex-grow space-y-4 mb-10">
                  {pkg.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm">
                      {feature.included ? (
                        <Check size={16} className={`mt-0.5 ${pkg.level === 'pro' ? 'text-black' : 'text-white'}`} />
                      ) : (
                        <X size={16} className="mt-0.5 text-gray-500 opacity-50" />
                      )}
                      <span className={`${!feature.included && 'text-gray-500 opacity-50 line-through'}`}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/contato"
                  className={`w-full py-4 text-center text-xs uppercase tracking-[0.2em] transition-colors border
                    ${pkg.level === 'pro'
                      ? 'border-black text-black hover:bg-black hover:text-white'
                      : 'border-white/20 text-white hover:bg-white hover:text-black'
                    }
                  `}
                >
                  Selecionar
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-gray-500 text-sm">
            Precisa de algo personalizado? <Link to="/contato" className="text-white underline underline-offset-4">Fale conosco</Link> para um orçamento sob medida.
          </p>
        </div>
      </div>
    </div>
  );
};