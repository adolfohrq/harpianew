import React from 'react';
import { SERVICES } from '../constants';
import { Reveal } from '../components/Reveal';
import { Camera, PenTool, Monitor, Box } from 'lucide-react';

export const Services: React.FC = () => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'foto': return <Camera size={32} strokeWidth={1} />;
      case 'branding': return <Box size={32} strokeWidth={1} />;
      case 'content': return <PenTool size={32} strokeWidth={1} />;
      case 'marketing': return <Monitor size={32} strokeWidth={1} />;
      default: return <Camera size={32} strokeWidth={1} />;
    }
  };

  return (
    <div className="min-h-screen bg-harpia-black pt-32 pb-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <Reveal>
          <h1 className="font-serif text-5xl md:text-7xl mb-6">NOSSOS <span className="italic text-gray-500">SERVIÇOS</span></h1>
          <p className="text-xl font-light text-gray-400 max-w-2xl border-l border-white/20 pl-6">
            Combinamos estética refinada com estratégia de dados para entregar resultados que elevam sua marca.
          </p>
        </Reveal>
      </div>

      {/* Main Services List */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-32">
          {SERVICES.map((service, index) => (
            <Reveal key={service.id}>
              <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}>
                
                {/* Text Content */}
                <div className="flex-1 space-y-6">
                  <div className="text-gray-500 mb-4">{getIcon(service.id)}</div>
                  <h2 className="font-serif text-4xl text-white">{service.title}</h2>
                  <p className="text-gray-400 font-light leading-relaxed text-lg">
                    {service.description}
                  </p>
                  
                  {/* Specific sub-list for Photography if applicable */}
                  {service.id === 'foto' && (
                    <ul className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/10">
                      <li className="text-sm uppercase tracking-widest text-gray-500">• Interiores</li>
                      <li className="text-sm uppercase tracking-widest text-gray-500">• Arquitetura</li>
                      <li className="text-sm uppercase tracking-widest text-gray-500">• Produto</li>
                      <li className="text-sm uppercase tracking-widest text-gray-500">• Lifestyle</li>
                    </ul>
                  )}
                </div>

                {/* Image */}
                <div className="flex-1 w-full">
                  <div className="relative aspect-[4/3] overflow-hidden group">
                    <img 
                      src={`${service.image}?grayscale`} 
                      alt={service.title} 
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 border border-white/10"></div>
                  </div>
                </div>

              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
};