import React from 'react';
import { Instagram, Facebook, Linkedin, Mail, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../data';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://instagram.com/harpia',
      icon: Instagram,
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/harpia',
      icon: Linkedin,
    },
    {
      name: 'Facebook',
      url: 'https://facebook.com/harpia',
      icon: Facebook,
    },
  ];

  return (
    <footer className="relative bg-harpia-black overflow-hidden">
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
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Left: Brand Section */}
            <div className="lg:col-span-4 space-y-6">
              <Link to="/" className="inline-block group">
                <img
                  src="/harpia-logo.png"
                  alt="Harpia Logo"
                  className="h-8 w-auto group-hover:opacity-70 transition-opacity"
                />
              </Link>
              <p className="font-sans text-sm text-gray-500 leading-relaxed max-w-sm">
                Agência de marketing estratégico para marcas que aspiram grandeza. Desde 2020,
                criando experiências digitais memoráveis.
              </p>

              {/* Email CTA */}
              <a
                href="mailto:harpiagencia@gmail.com"
                className="group inline-flex items-center gap-3 px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full transition-all duration-300"
              >
                <Mail
                  size={16}
                  className="text-gray-400 group-hover:text-harpia-white transition-colors"
                />
                <span className="font-sans text-xs text-gray-400 group-hover:text-harpia-white">
                  harpiagencia@gmail.com
                </span>
              </a>
            </div>

            {/* Center: Navigation Links */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-8">
              {/* Quick Links */}
              <div className="space-y-4">
                <h4 className="font-sans text-[11px] text-white/60 uppercase tracking-[0.3em] mb-6">
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

              {/* Services Links */}
              <div className="space-y-4">
                <h4 className="font-sans text-[11px] text-white/60 uppercase tracking-[0.3em] mb-6">
                  Serviços
                </h4>
                <nav className="space-y-3">
                  {['Branding', 'Web Design', 'Marketing', 'Estratégia'].map((service) => (
                    <Link
                      key={service}
                      to="/servicos"
                      className="group block font-sans text-sm text-gray-400 hover:text-harpia-white transition-colors"
                    >
                      <span className="inline-flex items-center gap-2">
                        {service}
                        <ArrowRight
                          size={12}
                          className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                        />
                      </span>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>

            {/* Right: Social Links */}
            <div className="lg:col-span-3 space-y-6">
              <h4 className="font-sans text-[11px] text-white/60 uppercase tracking-[0.3em]">
                Conecte-se
              </h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map(({ name, url, icon: Icon }) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-center w-12 h-12 bg-white/5 hover:bg-white border border-white/10 hover:border-white rounded-full transition-all duration-500 overflow-hidden"
                    aria-label={name}
                  >
                    <Icon
                      size={16}
                      className="relative z-10 text-gray-400 group-hover:text-harpia-black transition-colors duration-300"
                    />
                    {/* Ripple effect on hover */}
                    <div className="absolute inset-0 bg-white scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
                  </a>
                ))}
              </div>
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
                <a
                  href="#"
                  className="font-sans text-[10px] text-gray-600 hover:text-gray-400 uppercase tracking-[0.3em] transition-colors"
                >
                  Privacidade
                </a>
                <div className="w-px h-3 bg-white/10" />
                <a
                  href="#"
                  className="font-sans text-[10px] text-gray-600 hover:text-gray-400 uppercase tracking-[0.3em] transition-colors"
                >
                  Termos
                </a>
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
