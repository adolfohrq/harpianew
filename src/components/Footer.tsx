import React from 'react';
import { Mail, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../data';
import { InstagramIcon, WhatsAppIcon, YouTubeIcon } from './ui/icons';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      aria-label="Rodapé do site"
      className="relative bg-harpia-black overflow-hidden"
    >
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial gradient glow */}
        <div
          className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-white/2 rounded-full blur-[100px] animate-pulse"
          style={{ animationDuration: '8s' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[400px] h-[250px] bg-white/1.5 rounded-full blur-[80px] animate-pulse"
          style={{ animationDuration: '10s', animationDelay: '2s' }}
        />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(255 255 255) 1px, transparent 0)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Elegant Top Border with Gradient */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-linear-to-r from-transparent via-white/20 to-transparent" />

      {/* Pre-Footer Statement Section */}
      <div className="relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 mb-4">
                <Sparkles size={16} className="text-white/40" />
                <span className="font-sans text-[10px] text-white/40 uppercase tracking-[0.3em]">
                  Voe Mais Alto
                </span>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl text-harpia-white font-light leading-tight">
                Transforme sua visão em{' '}
                <span className="italic text-white/60">realidade digital</span>
              </h3>
            </div>
            <Link
              to="/contato"
              className="group flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white hover:text-harpia-black border border-white/10 hover:border-white rounded-full transition-all duration-500 backdrop-blur-sm"
            >
              <span className="font-sans text-sm text-harpia-white group-hover:text-harpia-black uppercase tracking-[0.2em] transition-colors">
                Iniciar Projeto
              </span>
              <ArrowRight
                size={16}
                className="text-harpia-white group-hover:text-harpia-black group-hover:translate-x-1 transition-all duration-300"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1 space-y-5">
              <Link to="/" className="inline-block group">
                <img
                  src="/harpia-logo.webp"
                  alt="Harpia Logo"
                  loading="lazy"
                  className="h-6 sm:h-7 md:h-8 w-auto group-hover:opacity-70 transition-opacity"
                />
              </Link>
              <p className="font-sans text-sm text-gray-500 leading-relaxed">
                Agência de marketing estratégico para marcas que aspiram grandeza.
              </p>
            </div>

            {/* Navigation Links */}
            <div className="lg:col-span-1">
              <h4 className="font-sans text-[11px] text-white/60 uppercase tracking-[0.3em] mb-5">
                Navegação
              </h4>
              <nav className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="group block font-sans text-sm text-gray-400 hover:text-harpia-white transition-colors"
                  >
                    <span className="inline-flex items-center gap-2">
                      {link.label}
                      <ArrowRight
                        size={12}
                        className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                      />
                    </span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h4 className="font-sans text-[11px] text-white/60 uppercase tracking-[0.3em] mb-5">
                Contato
              </h4>
              <div className="space-y-3">
                <a
                  href="mailto:contato@agenciaharpia.com.br"
                  className="group flex items-center gap-3 font-sans text-sm text-gray-400 hover:text-harpia-white transition-colors"
                >
                  <Mail size={14} className="text-gray-500 group-hover:text-white/70" />
                  <span>contato@agenciaharpia.com.br</span>
                </a>
                <a
                  href="https://wa.me/5548999661913"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 font-sans text-sm text-gray-400 hover:text-harpia-white transition-colors"
                >
                  <span className="text-gray-500 group-hover:text-white/70">
                    <WhatsAppIcon size={14} />
                  </span>
                  <span>(48) 99966-1913</span>
                </a>
                <p className="flex items-center gap-3 font-sans text-sm text-gray-500">
                  <span className="w-3.5" />
                  Tubarão, SC - Brasil
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="lg:col-span-1">
              <h4 className="font-sans text-[11px] text-white/60 uppercase tracking-[0.3em] mb-5">
                Redes Sociais
              </h4>
              <div className="flex gap-3">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/5548999661913"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-center w-11 h-11 bg-white/5 hover:bg-white border border-white/10 hover:border-white rounded-full transition-all duration-500 overflow-hidden"
                  aria-label="WhatsApp"
                >
                  <span className="relative z-10 text-gray-400 group-hover:text-harpia-black transition-colors duration-300">
                    <WhatsAppIcon size={16} />
                  </span>
                  <div className="absolute inset-0 bg-white scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/harpia.agencia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-center w-11 h-11 bg-white/5 hover:bg-white border border-white/10 hover:border-white rounded-full transition-all duration-500 overflow-hidden"
                  aria-label="Instagram"
                >
                  <span className="relative z-10 text-gray-400 group-hover:text-harpia-black transition-colors duration-300">
                    <InstagramIcon size={16} />
                  </span>
                  <div className="absolute inset-0 bg-white scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
                </a>

                {/* YouTube */}
                <a
                  href="https://www.youtube.com/@harpiaagencia1043"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-center w-11 h-11 bg-white/5 hover:bg-white border border-white/10 hover:border-white rounded-full transition-all duration-500 overflow-hidden"
                  aria-label="YouTube"
                >
                  <span className="relative z-10 text-gray-400 group-hover:text-harpia-black transition-colors duration-300">
                    <YouTubeIcon size={16} />
                  </span>
                  <div className="absolute inset-0 bg-white scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
                </a>

                {/* Email */}
                <a
                  href="mailto:contato@agenciaharpia.com.br"
                  className="group relative flex items-center justify-center w-11 h-11 bg-white/5 hover:bg-white border border-white/10 hover:border-white rounded-full transition-all duration-500 overflow-hidden"
                  aria-label="Email"
                >
                  <Mail
                    size={16}
                    className="relative z-10 text-gray-400 group-hover:text-harpia-black transition-colors duration-300"
                  />
                  <div className="absolute inset-0 bg-white scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
                </a>
              </div>

              {/* Tagline */}
              <p className="mt-6 font-sans text-xs text-gray-600 italic">
                Desde 2020, criando experiências digitais memoráveis.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="font-sans text-[10px] text-gray-600 uppercase tracking-[0.3em]">
                © {currentYear} Harpia Agência
              </p>

              <div className="flex items-center gap-6">
                <Link
                  to="/privacidade"
                  className="font-sans text-[10px] text-gray-600 hover:text-gray-400 uppercase tracking-[0.3em] transition-colors"
                >
                  Privacidade
                </Link>
                <div className="w-px h-3 bg-white/10" />
                <Link
                  to="/termos"
                  className="font-sans text-[10px] text-gray-600 hover:text-gray-400 uppercase tracking-[0.3em] transition-colors"
                >
                  Termos
                </Link>
              </div>

              <p className="font-sans text-[10px] text-gray-700 uppercase tracking-[0.3em]">
                Estratégia & Criatividade
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
