import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

/**
 * Skeleton - Componente de loading placeholder
 *
 * Usado para melhorar a percepção de velocidade durante carregamento de páginas.
 *
 * @example
 * // Texto
 * <Skeleton variant="text" width="60%" />
 *
 * @example
 * // Avatar circular
 * <Skeleton variant="circular" width={48} height={48} />
 *
 * @example
 * // Card retangular
 * <Skeleton variant="rectangular" height={200} />
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse',
}) => {
  const baseClasses = 'bg-white/10';

  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-sm',
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
    none: '',
  };

  const style: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
};

/**
 * PageSkeleton - Skeleton para páginas completas
 *
 * Simula a estrutura de uma página durante carregamento lazy.
 */
export const PageSkeleton: React.FC<{ variant?: 'default' | 'portfolio' | 'services' }> = ({
  variant = 'default',
}) => {
  return (
    <div className="min-h-screen bg-harpia-black">
      {/* Hero Skeleton */}
      <div className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        <Skeleton className="absolute inset-0" animation="pulse" />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-harpia-black via-harpia-black/50 to-transparent" />

        {/* Hero content skeleton */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
          {/* Badge */}
          <Skeleton variant="text" width={120} height={24} className="mb-8" />

          {/* Title */}
          <Skeleton variant="text" width="60%" height={64} className="mb-4 max-w-2xl" />
          <Skeleton variant="text" width="40%" height={48} className="mb-8 max-w-xl" />

          {/* Description */}
          <Skeleton variant="text" width="80%" height={20} className="mb-2 max-w-lg" />
          <Skeleton variant="text" width="60%" height={20} className="max-w-md" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        {variant === 'portfolio' && <PortfolioGridSkeleton />}
        {variant === 'services' && <ServicesGridSkeleton />}
        {variant === 'default' && <DefaultContentSkeleton />}
      </div>
    </div>
  );
};

/**
 * PortfolioGridSkeleton - Skeleton para grid de portfolio
 */
const PortfolioGridSkeleton: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Featured item - larger */}
    <div className="md:col-span-2">
      <Skeleton className="w-full aspect-[21/9]" />
    </div>

    {/* Regular items */}
    {[...Array(4)].map((_, i) => (
      <Skeleton key={i} className="w-full aspect-[4/3]" />
    ))}
  </div>
);

/**
 * ServicesGridSkeleton - Skeleton para grid de serviços
 */
const ServicesGridSkeleton: React.FC = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="space-y-4">
        <Skeleton className="w-full aspect-[4/5]" />
        <Skeleton variant="text" width="70%" height={24} />
        <Skeleton variant="text" width="90%" height={16} />
        <Skeleton variant="text" width="60%" height={16} />
      </div>
    ))}
  </div>
);

/**
 * DefaultContentSkeleton - Skeleton genérico para conteúdo
 */
const DefaultContentSkeleton: React.FC = () => (
  <div className="space-y-16">
    {/* Section header */}
    <div className="text-center space-y-4">
      <Skeleton variant="text" width={100} height={16} className="mx-auto" />
      <Skeleton variant="text" width="50%" height={48} className="mx-auto" />
      <Skeleton variant="text" width="70%" height={20} className="mx-auto" />
    </div>

    {/* Content grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="w-full aspect-video" />
          <Skeleton variant="text" width="80%" height={24} />
          <Skeleton variant="text" width="100%" height={16} />
          <Skeleton variant="text" width="60%" height={16} />
        </div>
      ))}
    </div>
  </div>
);

/**
 * CardSkeleton - Skeleton para cards individuais
 */
export const CardSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`space-y-4 ${className}`}>
    <Skeleton className="w-full aspect-[4/3]" />
    <Skeleton variant="text" width="70%" height={24} />
    <Skeleton variant="text" width="100%" height={16} />
    <Skeleton variant="text" width="40%" height={16} />
  </div>
);

/**
 * PortfolioSkeleton - Skeleton completo para página de portfolio
 * Usado durante carregamento dos dados do WordPress
 */
export const PortfolioSkeleton: React.FC<{ showFilters?: boolean }> = ({ showFilters = true }) => (
  <div className="space-y-8">
    {/* Filtros de categoria */}
    {showFilters && (
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {[...Array(5)].map((_, i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            width={i === 0 ? 80 : 120}
            height={40}
            className="rounded-full"
          />
        ))}
      </div>
    )}

    {/* Grid de projetos */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Primeiro item maior */}
      <div className="md:col-span-2">
        <div className="relative overflow-hidden rounded-sm">
          <Skeleton className="w-full aspect-[21/9]" />
          <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
            <Skeleton variant="text" width={100} height={16} />
            <Skeleton variant="text" width="60%" height={32} />
          </div>
        </div>
      </div>

      {/* Itens regulares */}
      {[...Array(4)].map((_, i) => (
        <div key={i} className="relative overflow-hidden rounded-sm">
          <Skeleton className="w-full aspect-[4/3]" />
          <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
            <Skeleton variant="text" width={80} height={14} />
            <Skeleton variant="text" width="70%" height={24} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

/**
 * ProjectDetailSkeleton - Skeleton para página de detalhe do projeto
 */
export const ProjectDetailSkeleton: React.FC = () => (
  <div className="min-h-screen bg-harpia-black">
    {/* Hero */}
    <div className="relative h-[60vh]">
      <Skeleton className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-harpia-black to-transparent" />
    </div>

    {/* Conteúdo */}
    <div className="max-w-6xl mx-auto px-6 -mt-32 relative z-10">
      {/* Título */}
      <Skeleton variant="text" width="50%" height={48} className="mb-8" />

      {/* Meta grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton variant="text" width={60} height={14} />
            <Skeleton variant="text" width="80%" height={20} />
          </div>
        ))}
      </div>

      {/* Challenge & Solution */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton variant="text" width={120} height={24} />
            <Skeleton variant="text" width="100%" height={16} />
            <Skeleton variant="text" width="90%" height={16} />
            <Skeleton variant="text" width="80%" height={16} />
          </div>
        ))}
      </div>

      {/* Galeria */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="w-full aspect-[4/3]" />
        ))}
      </div>
    </div>
  </div>
);
