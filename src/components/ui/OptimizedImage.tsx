import React, { ImgHTMLAttributes, useState } from 'react';

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
  /**
   * Aspect ratio para prevenir CLS (ex: "16/9", "4/3", "1/1")
   * Quando definido, a imagem é envolvida em um container com aspect-ratio fixo
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
  fallback = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23111" width="400" height="300"/%3E%3C/svg%3E',
  className,
  aspectRatio,
  containerClassName,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    setImgSrc(fallback);
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
      loading="lazy"
      onError={handleError}
      onLoad={handleLoad}
      className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : hasCustomOpacity ? '' : 'opacity-100'} ${aspectRatio ? 'absolute inset-0 w-full h-full object-cover' : ''} ${className || ''}`}
      {...props}
    />
  );

  // Se aspectRatio está definido, envolve a imagem em um container
  if (aspectRatio) {
    return (
      <div
        className={`relative overflow-hidden ${containerClassName || ''}`}
        style={{ aspectRatio }}
      >
        {imgElement}
      </div>
    );
  }

  return imgElement;
};
