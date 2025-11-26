import { useState, useRef, useEffect, forwardRef, VideoHTMLAttributes } from 'react';

interface LazyVideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
  /** Thumbnail/poster image to show before video loads */
  poster?: string;
  /** Whether to start loading when component enters viewport */
  lazyLoad?: boolean;
  /** Intersection observer threshold (0-1) */
  threshold?: number;
  /** Root margin for intersection observer */
  rootMargin?: string;
}

/**
 * LazyVideo - Video component with lazy loading and performance optimizations
 *
 * Features:
 * - Lazy loads video source when entering viewport
 * - Shows poster image until user interacts
 * - Prevents unnecessary bandwidth usage
 *
 * @example
 * <LazyVideo
 *   src="/video.mp4"
 *   poster="/video-poster.jpg"
 *   lazyLoad
 *   muted
 *   playsInline
 * />
 */
export const LazyVideo = forwardRef<HTMLVideoElement, LazyVideoProps>(
  (
    { src, poster, lazyLoad = true, threshold = 0.1, rootMargin = '100px', className, ...props },
    ref
  ) => {
    const [isInView, setIsInView] = useState(!lazyLoad);
    const [hasStartedLoading, setHasStartedLoading] = useState(!lazyLoad);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!lazyLoad) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            setHasStartedLoading(true);
            observer.disconnect();
          }
        },
        { threshold, rootMargin }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => observer.disconnect();
    }, [lazyLoad, threshold, rootMargin]);

    return (
      <div ref={containerRef} className="relative">
        <video
          ref={ref}
          src={hasStartedLoading ? src : undefined}
          poster={poster}
          className={className}
          preload={isInView ? 'metadata' : 'none'}
          {...props}
        />
      </div>
    );
  }
);

LazyVideo.displayName = 'LazyVideo';
