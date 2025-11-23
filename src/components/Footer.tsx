import React from 'react';
import { Instagram, Facebook, Mail, Linkedin, ArrowUpRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-harpia-black overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-harpia-gray/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-harpia-gray/5 rounded-full blur-3xl" />
      </div>

      <div className="relative">
        {/* Top Section - CTA Banner */}
        <div className="border-b border-harpia-gray/20">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Left Content */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-harpia-gray/10 border border-harpia-gray/20 rounded-full">
                  <Zap size={16} className="text-harpia-gray" />
                  <span className="font-sans text-xs uppercase tracking-widest text-harpia-gray">
                    Pronto para voar alto?
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-4xl md:text-5xl text-harpia-white mb-4 leading-tight">
                    Vamos transformar sua visão em realidade.
                  </h3>
                  <p className="font-sans text-harpia-gray text-lg font-light max-w-lg">
                    Entre em contato conosco e descubra como a Harpia pode impulsionar seu negócio.
                  </p>
                </div>
              </div>

              {/* Right CTA */}
              <div className="flex justify-center md:justify-end">
                <Link
                  to="/contato"
                  className="group relative inline-flex items-center justify-center gap-3 px-10 py-6 bg-harpia-accent text-harpia-black font-sans font-semibold tracking-widest uppercase text-sm overflow-hidden"
                >
                  <span className="relative z-10">Iniciar Projeto</span>
                  <ArrowUpRight
                    size={18}
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  />
                  <div className="absolute inset-0 bg-harpia-white opacity-0 group-hover:opacity-20 transition-opacity" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Brand Section - 5 cols */}
            <div className="md:col-span-5 space-y-8">
              {/* Logo */}
              <Link to="/" className="inline-flex group">
                <img
                  src="/harpia-logo.png"
                  alt="Harpia Logo"
                  className="h-10 w-auto group-hover:opacity-80 transition-opacity"
                />
              </Link>

              {/* Mission Statement */}
              <div className="space-y-6">
                <p className="font-serif text-2xl text-harpia-white leading-relaxed font-light">
                  Agência de Marketing Premium para empresas que sonham alto.
                </p>
                <p className="font-sans text-harpia-gray font-light leading-relaxed text-sm">
                  Desde 2020, transformamos visão estratégica em arte digital. Conectamos empresas
                  ao seu público-alvo através de soluções inovadoras que geram impacto real e
                  duradouro.
                </p>
              </div>

              {/* Email CTA */}
              <a
                href="mailto:harpiagencia@gmail.com"
                className="inline-flex items-center gap-3 group"
              >
                <div className="w-12 h-12 flex items-center justify-center border border-harpia-gray/30 group-hover:border-harpia-gray/60 transition-colors">
                  <Mail
                    size={20}
                    className="text-harpia-gray group-hover:text-harpia-white transition-colors"
                  />
                </div>
                <div>
                  <p className="font-sans text-xs uppercase tracking-widest text-harpia-gray group-hover:text-harpia-white transition-colors">
                    Email
                  </p>
                  <p className="font-sans text-sm text-harpia-white">harpiagencia@gmail.com</p>
                </div>
              </a>
            </div>

            {/* Links Columns - 7 cols */}
            <div className="md:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Quick Links */}
              <div className="space-y-6">
                <h4 className="font-sans text-xs uppercase tracking-[0.3em] text-harpia-gray font-semibold">
                  Navegação
                </h4>
                <nav className="space-y-4">
                  {[
                    { label: 'Home', path: '/' },
                    { label: 'Serviços', path: '/servicos' },
                    { label: 'Pacotes', path: '/pacotes' },
                    { label: 'Contato', path: '/contato' },
                  ].map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="group inline-flex items-center gap-2 font-sans text-sm text-harpia-white hover:text-harpia-gray transition-colors"
                    >
                      {link.label}
                      <ArrowUpRight
                        size={14}
                        className="opacity-0 -translate-x-2 -translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300"
                      />
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Services */}
              <div className="space-y-6">
                <h4 className="font-sans text-xs uppercase tracking-[0.3em] text-harpia-gray font-semibold">
                  Serviços
                </h4>
                <nav className="space-y-4">
                  {[
                    'Estratégia Digital',
                    'Design & Branding',
                    'Desenvolvimento',
                    'Marketing Digital',
                  ].map((service) => (
                    <Link
                      key={service}
                      to="/servicos"
                      className="group inline-flex items-center gap-2 font-sans text-sm text-harpia-white hover:text-harpia-gray transition-colors"
                    >
                      {service}
                      <ArrowUpRight
                        size={14}
                        className="opacity-0 -translate-x-2 -translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300"
                      />
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Social Media */}
              <div className="space-y-6">
                <h4 className="font-sans text-xs uppercase tracking-[0.3em] text-harpia-gray font-semibold">
                  Redes Sociais
                </h4>
                <div className="space-y-4">
                  {[
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
                  ].map(({ name, url, icon: Icon }) => (
                    <a
                      key={name}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 font-sans text-sm text-harpia-white hover:text-harpia-gray transition-colors"
                      aria-label={name}
                    >
                      <Icon
                        size={16}
                        className="text-harpia-gray group-hover:text-harpia-white transition-colors"
                      />
                      {name}
                      <ArrowUpRight
                        size={14}
                        className="opacity-0 -translate-x-2 -translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-harpia-gray/20">
          <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <p className="font-sans text-xs text-harpia-gray uppercase tracking-widest">
              © {currentYear} Harpia Agência. Todos os direitos reservados.
            </p>

            {/* Bottom Links */}
            <div className="flex items-center gap-8">
              <a
                href="#"
                className="font-sans text-xs text-harpia-gray hover:text-harpia-white transition-colors uppercase tracking-widest"
              >
                Política de Privacidade
              </a>
              <div className="w-px h-4 bg-harpia-gray/20" />
              <a
                href="#"
                className="font-sans text-xs text-harpia-gray hover:text-harpia-white transition-colors uppercase tracking-widest"
              >
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
