import React from 'react';

interface DifferentialCardProps {
  /** Ícone do card (React component) */
  icon: React.ReactNode;
  /** Título do diferencial */
  title: string;
  /** Descrição detalhada */
  description: string;
  /** Index para animação stagger (opcional) */
  index?: number;
}

export const DifferentialCard: React.FC<DifferentialCardProps> = ({ icon, title, description }) => {
  return (
    <div className="group relative h-full flex flex-col p-8 bg-gray-50 border border-gray-100 hover:border-gray-300 transition-all duration-500 rounded-sm">
      {/* Icon Container */}
      <div className="mb-6 text-harpia-black group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-2xl text-harpia-black mb-4">{title}</h3>

      {/* Description */}
      <p className="text-sm text-gray-600 font-light flex-1">{description}</p>

      {/* Hover Effect Line */}
      <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-harpia-black group-hover:w-full transition-all duration-500" />
    </div>
  );
};
