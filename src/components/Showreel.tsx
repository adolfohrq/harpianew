import { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { Reveal } from './Reveal';
import { GradientLine, OptimizedImage } from './ui';

const VIDEO_SRC = '/video.mp4';

export const Showreel = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickPosition = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = clickPosition * videoRef.current.duration;
    }
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        containerRef.current.requestFullscreen();
      }
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setProgress(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <section className="py-24 md:py-32 lg:py-40 bg-harpia-black relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <OptimizedImage
          src="/5.webp"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover opacity-50 bg-position-showreel"
          loading="lazy"
        />
      </div>

      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-harpia-black/30 via-harpia-black/40 to-harpia-black/50 pointer-events-none" />

      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-linear-to-b from-transparent via-white/5 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-linear-to-b from-transparent via-white/5 to-transparent" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-linear-to-r from-transparent via-white/5 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <Reveal>
            <div className="flex items-center justify-center gap-4 mb-8">
              <GradientLine direction="right" size="lg" />
              <span className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/40 font-medium">
                Showreel 2024
              </span>
              <GradientLine direction="left" size="lg" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-white mb-6">
              CRIATIVIDADE
              <br />
              <span className="italic text-white/40 font-light">em Movimento</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-white/60 text-base md:text-lg font-light max-w-2xl mx-auto">
              Uma jornada visual pelos nossos projetos mais impactantes. Design, estratégia e
              resultados em cada frame.
            </p>
          </Reveal>
        </div>

        {/* Video Player */}
        <Reveal delay={0.3}>
          <div
            ref={containerRef}
            className="relative w-full max-w-5xl mx-auto group"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => isPlaying && setShowControls(false)}
          >
            {/* Video Frame */}
            <div className="relative aspect-video bg-harpia-carbon overflow-hidden rounded-sm border border-white/10">
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/20 z-20 pointer-events-none" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/20 z-20 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/20 z-20 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/20 z-20 pointer-events-none" />

              {/* Video */}
              <video
                ref={videoRef}
                src={VIDEO_SRC}
                muted={isMuted}
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleVideoEnd}
                onClick={togglePlay}
              />

              {/* Overlay Gradient (fades when playing) */}
              <div
                className={`absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/30 transition-opacity duration-500 pointer-events-none ${
                  isPlaying && !showControls ? 'opacity-0' : 'opacity-100'
                }`}
              />

              {/* Center Play Button (shows when paused) */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-all duration-500 cursor-pointer ${
                  isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
                onClick={togglePlay}
              >
                <div className="relative group/play">
                  {/* Pulse ring */}
                  <div className="absolute inset-0 w-24 h-24 md:w-32 md:h-32 bg-white/10 rounded-full animate-ping opacity-20" />

                  {/* Button */}
                  <div className="relative w-24 h-24 md:w-32 md:h-32 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105">
                    <Play
                      className="w-10 h-10 md:w-14 md:h-14 text-white ml-1"
                      fill="currentColor"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Controls */}
              <div
                className={`absolute bottom-0 left-0 right-0 p-4 md:p-6 transition-all duration-300 ${
                  showControls || !isPlaying
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
              >
                {/* Progress Bar */}
                <div
                  className="w-full h-1 bg-white/20 rounded-full mb-4 cursor-pointer group/progress"
                  onClick={handleProgressClick}
                >
                  <div
                    className="h-full bg-white rounded-full relative transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  >
                    {/* Progress Handle */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity shadow-lg" />
                  </div>
                </div>

                {/* Controls Row */}
                <div className="flex items-center justify-between">
                  {/* Left Controls */}
                  <div className="flex items-center gap-4">
                    {/* Play/Pause */}
                    <button
                      onClick={togglePlay}
                      className="w-10 h-10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                      aria-label={isPlaying ? 'Pausar' : 'Play'}
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5" fill="currentColor" />
                      ) : (
                        <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                      )}
                    </button>

                    {/* Mute */}
                    <button
                      onClick={toggleMute}
                      className="w-10 h-10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                      aria-label={isMuted ? 'Ativar som' : 'Silenciar'}
                    >
                      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Right Controls */}
                  <div className="flex items-center gap-4">
                    {/* Fullscreen */}
                    <button
                      onClick={handleFullscreen}
                      className="w-10 h-10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                      aria-label="Tela cheia"
                    >
                      <Maximize className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Info Bar */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
              <div className="flex items-center gap-6 text-white/40">
                <span className="text-xs uppercase tracking-[0.2em] font-light flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                  4K Ultra HD
                </span>
                <span className="text-xs uppercase tracking-[0.2em] font-light flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                  60fps
                </span>
              </div>

              <span className="text-xs uppercase tracking-[0.2em] text-white/30 font-light">
                Harpia Agency © 2024
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
