import React from 'react';
import { Instagram, Facebook, Mail, Linkedin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-harpia-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 py-16">
          {/* Brand & Mission */}
          <div className="space-y-6">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 group hover:opacity-80 transition-opacity"
            >
              <img src="/harpia-logo.png" alt="Harpia Logo" className="h-8 w-auto" />
              <span className="font-serif font-bold text-lg tracking-widest text-harpia-white hidden sm:inline">
                HARPIA
              </span>
            </Link>

            {/* Mission Statement */}
            <div>
              <p className="text-harpia-white font-light leading-relaxed text-sm">
                Transformando visão estratégica em arte digital. Desde 2020, conectando empresas ao
                seu público-alvo através de soluções inovadoras e impactantes.
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-6">
            <h4 className="font-sans text-xs uppercase tracking-[0.3em] text-harpia-gray font-semibold">
              Navegação
            </h4>
            <nav className="flex flex-col gap-4">
              {[
                { label: 'Home', path: '/' },
                { label: 'Serviços', path: '/servicos' },
                { label: 'Pacotes', path: '/pacotes' },
                { label: 'Contato', path: '/contato' },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="font-sans text-sm text-harpia-white hover:text-harpia-gray transition-colors duration-300 relative w-fit group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-harpia-gray group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Services Quick Links */}
          <div className="space-y-6">
            <h4 className="font-sans text-xs uppercase tracking-[0.3em] text-harpia-gray font-semibold">
              Serviços
            </h4>
            <nav className="flex flex-col gap-4">
              {['Estratégia Digital', 'Design & Branding', 'Desenvolvimento Web', 'Marketing'].map(
                (service) => (
                  <Link
                    key={service}
                    to="/servicos"
                    className="font-sans text-sm text-harpia-white hover:text-harpia-gray transition-colors duration-300 relative w-fit group"
                  >
                    {service}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-harpia-gray group-hover:w-full transition-all duration-300" />
                  </Link>
                )
              )}
            </nav>
          </div>

          {/* Contact & Social */}
          <div className="space-y-6">
            <h4 className="font-sans text-xs uppercase tracking-[0.3em] text-harpia-gray font-semibold">
              Conecte-se
            </h4>

            {/* Email */}
            <a
              href="mailto:harpiagencia@gmail.com"
              className="flex items-center gap-3 text-harpia-white hover:text-harpia-gray transition-colors group"
            >
              <Mail
                size={18}
                className="text-harpia-gray group-hover:text-harpia-white transition-colors"
              />
              <span className="font-sans text-sm">harpiagencia@gmail.com</span>
            </a>

            {/* Social Links */}
            <div>
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-harpia-gray mb-4 font-semibold">
                Siga-nos
              </p>
              <div className="flex gap-3">
                <a
                  href="https://instagram.com/harpia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border border-harpia-gray hover:border-harpia-white hover:bg-harpia-white hover:text-harpia-black transition-all duration-300 rounded-lg group"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="https://facebook.com/harpia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border border-harpia-gray hover:border-harpia-white hover:bg-harpia-white hover:text-harpia-black transition-all duration-300 rounded-lg group"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="https://linkedin.com/company/harpia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border border-harpia-gray hover:border-harpia-white hover:bg-harpia-white hover:text-harpia-black transition-all duration-300 rounded-lg group"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-linear-to-r from-transparent via-harpia-gray to-transparent" />

        {/* Bottom Footer */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="font-sans text-xs text-harpia-gray uppercase tracking-widest font-light">
              © {currentYear} Harpia Agência. Todos os direitos reservados.
            </p>
          </div>

          {/* CTA */}
          <Link
            to="/contato"
            className="group flex items-center gap-2 text-harpia-white hover:text-harpia-gray transition-colors"
          >
            <span className="font-sans text-xs uppercase tracking-[0.2em]">Vamos conversar</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </footer>
  );
};
