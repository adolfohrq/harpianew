import React from 'react';
import { Mail, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../data';

// Ícone Instagram inline
const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// Ícone WhatsApp inline
const WhatsAppIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

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
