import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from '../types';
import { ArrowUpRight, Mail } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

// Ícone Instagram inline (lucide-react deprecou o componente)
const InstagramIcon = ({ size = 18 }: { size?: number }) => (
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

interface NavbarProps {
  links: NavLink[];
}

export const Navbar: React.FC<NavbarProps> = ({ links }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Bloqueia scroll do body quando menu está aberto
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
      // Focus no primeiro link após abrir
      setTimeout(() => firstLinkRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  // Fecha menu com ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileOpen) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isMobileOpen]);

  const handleMobileLinkClick = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      <nav
        role="navigation"
        aria-label="Navegação principal"
        className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
          isScrolled || isMobileOpen
            ? 'bg-harpia-black/90 backdrop-blur-md border-white/10 py-4'
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="group flex items-center gap-3 hover:opacity-80 transition-opacity relative z-[60]"
          >
            <img src="/harpia-logo.png" alt="Harpia Logo" className="h-8 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm tracking-[0.2em] font-light uppercase transition-colors duration-300 relative py-2
                    ${isActive ? 'text-harpia-white' : 'text-gray-400 hover:text-harpia-white'}
                    after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-harpia-white after:transition-all after:duration-300 after:ease-out
                    ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'}
                  `}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Toggle */}
          <button
            ref={closeButtonRef}
            className="md:hidden relative z-[60] w-12 h-12 flex items-center justify-center text-white"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label={isMobileOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-menu"
          >
            <div className="relative w-6 h-5">
              {/* Hamburger lines animadas */}
              <span
                className={`absolute left-0 w-full h-[2px] bg-white transition-all duration-300 ease-out ${
                  isMobileOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-white transition-all duration-300 ease-out ${
                  isMobileOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 w-full h-[2px] bg-white transition-all duration-300 ease-out ${
                  isMobileOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu - Fullscreen Overlay */}
      <div
        ref={menuRef}
        id="mobile-menu"
        aria-hidden={!isMobileOpen}
        className={`md:hidden fixed inset-0 z-[55] transition-all duration-500 ${
          isMobileOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Background overlay with blur */}
        <div
          className={`absolute inset-0 bg-harpia-black transition-opacity duration-500 ${
            isMobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Elementos decorativos */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Círculo decorativo */}
            <div
              className={`absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full border border-white/5 transition-all duration-1000 delay-200 ${
                isMobileOpen ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
              }`}
            />
            <div
              className={`absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full border border-white/5 transition-all duration-1000 delay-300 ${
                isMobileOpen ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
              }`}
            />

            {/* Grid sutil */}
            <div
              className={`absolute inset-0 transition-opacity duration-700 delay-400 ${
                isMobileOpen ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)`,
                backgroundSize: '40px 40px',
              }}
            />
          </div>
        </div>

        {/* Menu Content */}
        <div className="relative h-full flex flex-col justify-center px-8 pt-24 pb-12">
          {/* Navigation Links */}
          <nav className="flex-1 flex flex-col justify-center">
            <ul className="space-y-2">
              {links.map((link, index) => {
                const isActive = location.pathname === link.path;
                return (
                  <li
                    key={link.path}
                    className={`overflow-hidden transition-all duration-500 ${
                      isMobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{
                      transitionDelay: isMobileOpen ? `${150 + index * 75}ms` : '0ms',
                    }}
                  >
                    <Link
                      ref={index === 0 ? firstLinkRef : undefined}
                      to={link.path}
                      onClick={handleMobileLinkClick}
                      className={`group flex items-center justify-between py-4 border-b border-white/10 transition-all duration-300 ${
                        isActive ? 'border-white/30' : 'hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {/* Número do item */}
                        <span className="font-mono text-xs text-white/30 w-6">
                          {String(index + 1).padStart(2, '0')}
                        </span>

                        {/* Nome do link */}
                        <span
                          className={`font-serif text-3xl sm:text-4xl transition-all duration-300 ${
                            isActive
                              ? 'text-white'
                              : 'text-white/60 group-hover:text-white group-hover:translate-x-2'
                          }`}
                        >
                          {link.label}
                        </span>
                      </div>

                      {/* Indicador ativo ou seta */}
                      <div
                        className={`transition-all duration-300 ${
                          isActive
                            ? 'opacity-100'
                            : 'opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0'
                        }`}
                      >
                        {isActive ? (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        ) : (
                          <ArrowUpRight size={20} className="text-white/50" />
                        )}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer do Menu */}
          <div
            className={`mt-auto transition-all duration-500 ${
              isMobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionDelay: isMobileOpen ? `${150 + links.length * 75 + 100}ms` : '0ms',
            }}
          >
            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

            {/* Social & Contact */}
            <div className="flex items-center justify-between">
              {/* Social Links */}
              <div className="flex items-center gap-4">
                <a
                  href="https://www.instagram.com/harpia.agencia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300"
                  aria-label="Instagram"
                >
                  <InstagramIcon size={18} />
                </a>
                <a
                  href="mailto:contato@agenciaharpia.com.br"
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300"
                  aria-label="Email"
                >
                  <Mail size={18} />
                </a>
              </div>

              {/* CTA */}
              <Link
                to="/contato"
                onClick={handleMobileLinkClick}
                className="group flex items-center gap-3 px-6 py-3 bg-white text-harpia-black rounded-full hover:bg-white/90 transition-all duration-300"
              >
                <span className="text-sm font-medium uppercase tracking-wider">Contato</span>
                <ArrowUpRight
                  size={16}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                />
              </Link>
            </div>

            {/* Copyright */}
            <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] mt-8 text-center">
              © {new Date().getFullYear()} Harpia Agência
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
