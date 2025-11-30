import React, { ImgHTMLAttributes, useState } from 'react';

interface OptimizedImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'width' | 'height'> {
  src: string;
  alt: string;
  /**
   * Largura da imagem em pixels (OBRIGATÓRIO para prevenir CLS)
   */
  width: number;
  /**
   * Altura da imagem em pixels (OBRIGATÓRIO para prevenir CLS)
   */
  height: number;
  fallback?: string;
  /**
   * Aspect ratio para prevenir CLS (ex: "16/9", "4/3", "1/1")
   * Quando definido, a imagem é envolvida em um container com aspect-ratio fixo
   * Se não definido, será calculado automaticamente a partir de width/height
   */
  aspectRatio?: string;
  /**
   * Classes CSS para o container (usado apenas quando aspectRatio é definido)
   */
  containerClassName?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  fallback = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23111" width="400" height="300"/%3E%3C/svg%3E',
  className,
  aspectRatio,
  containerClassName,
  ...props
}) => {
  // Calcula aspect-ratio automaticamente se não fornecido
  const computedAspectRatio = aspectRatio || `${width}/${height}`;
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Usa src ou fallback (em caso de erro ou src vazio)
  const imgSrc = hasError || !src ? fallback : src;

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  // Verifica se className já define uma opacidade customizada
  const hasCustomOpacity = className?.includes('opacity-');

  const imgElement = (
    <img
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      onError={handleError}
      onLoad={handleLoad}
      className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : hasCustomOpacity ? '' : 'opacity-100'} ${className || ''}`}
      style={{ aspectRatio: computedAspectRatio }}
      {...props}
    />
  );

  // Se aspectRatio explícito ou containerClassName está definido, envolve em container
  if (aspectRatio || containerClassName) {
    return (
      <div
        className={`relative overflow-hidden ${containerClassName || ''}`}
        style={{ aspectRatio: computedAspectRatio }}
      >
        <img
          src={imgSrc}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          onError={handleError}
          onLoad={handleLoad}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : hasCustomOpacity ? '' : 'opacity-100'} ${className || ''}`}
          {...props}
        />
      </div>
    );
  }

  return imgElement;
};
