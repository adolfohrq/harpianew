import React from 'react';
import { PACKAGES } from '../data';
import { Reveal } from '../components/Reveal';
import { HeroSection } from '../components/ui';
import { Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Packages: React.FC = () => {
  return (
    <div className="min-h-screen bg-white pb-20">
      <HeroSection
        subtitle="INVESTIMENTO"
        title="PLANOS DE VOO"
        description="Escolha a altitude que sua marca deseja alcançar. Nossos pacotes de Gestão de Redes Sociais são desenhados para cada estágio do seu negócio."
        imageSrc="/3.jpeg"
        imageAlt="Planos Harpia"
        floatingBadge={
          <>
            <p className="font-serif text-2xl mb-1">Flexível</p>
            <p className="text-xs uppercase tracking-widest text-gray-500">Escalável</p>
          </>
        }
      />

      <div className="max-w-7xl mx-auto px-6 mt-12">
        {/* Header */}
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <Reveal>
            <h1 className="font-serif text-5xl md:text-6xl mb-6 text-harpia-black">
              PLANOS DE VOO
            </h1>
            <p className="text-gray-600 font-light text-lg">
              Escolha a altitude que sua marca deseja alcançar. Nossos pacotes de Gestão de Redes
              Sociais são desenhados para cada estágio do seu negócio.
            </p>
          </Reveal>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PACKAGES.map((pkg, idx) => (
            <Reveal key={pkg.id} delay={idx * 150}>
              <div
                className={`relative p-8 border transition-all duration-500 group hover:-translate-y-2 h-full flex flex-col shadow-lg
                  ${
                    pkg.level === 'pro'
                      ? 'border-harpia-black bg-harpia-black text-white'
                      : 'border-gray-200 bg-white text-harpia-black hover:border-harpia-black/30'
                  }`}
              >
                {/* Highlight Badge for Pro */}
                {pkg.level === 'pro' && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-harpia-black px-4 py-1 text-xs uppercase tracking-widest font-bold">
                    Recomendado
                  </div>
                )}

                <div className="mb-8 text-center">
                  <h3 className="font-serif text-3xl mb-2">{pkg.name}</h3>
                  <p
                    className={`text-sm font-light ${pkg.level === 'pro' ? 'text-gray-400' : 'text-gray-500'}`}
                  >
                    {pkg.description}
                  </p>
                </div>

                <div className="flex-grow space-y-4 mb-10">
                  {pkg.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm">
                      {feature.included ? (
                        <Check
                          size={16}
                          className={`mt-0.5 ${pkg.level === 'pro' ? 'text-white' : 'text-harpia-black'}`}
                        />
                      ) : (
                        <X size={16} className="mt-0.5 text-gray-400 opacity-50" />
                      )}
                      <span
                        className={`${!feature.included && 'text-gray-400 opacity-50 line-through'}`}
                      >
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/contato"
                  className={`w-full py-4 text-center text-xs uppercase tracking-[0.2em] transition-colors border
                    ${
                      pkg.level === 'pro'
                        ? 'border-white text-white hover:bg-white hover:text-harpia-black'
                        : 'border-harpia-black text-harpia-black hover:bg-harpia-black hover:text-white'
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
            Precisa de algo personalizado?{' '}
            <Link
              to="/contato"
              className="text-harpia-black underline underline-offset-4 hover:text-gray-600"
            >
              Fale conosco
            </Link>{' '}
            para um orçamento sob medida.
          </p>
        </div>
      </div>
    </div>
  );
};
