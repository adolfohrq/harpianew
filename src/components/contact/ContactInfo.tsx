import React, { useState } from 'react';
import { Reveal } from '../Reveal';
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Linkedin,
  LucideIcon,
  Copy,
  Check,
} from 'lucide-react';

interface ContactInfoItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string | null;
  copyable?: boolean;
}

interface SocialLink {
  name: string;
  icon: LucideIcon;
  url: string;
  followers?: string;
}

const contactInfo: ContactInfoItem[] = [
  {
    icon: <Mail className="w-6 h-6" />,
    label: 'Email',
    value: 'harpiagencia@gmail.com',
    href: 'mailto:harpiagencia@gmail.com',
    copyable: true,
  },
  {
    icon: <Phone className="w-6 h-6" />,
    label: 'Telefone',
    value: '(11) 99999-9999',
    href: 'tel:+5511999999999',
    copyable: true,
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    label: 'Localização',
    value: 'Brasil - Atendimento Global',
    href: null,
    copyable: false,
  },
];

const socialLinks: SocialLink[] = [
  {
    name: 'Instagram',
    icon: Instagram,
    url: 'https://instagram.com/harpia',
    followers: '15K',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://linkedin.com/company/harpia',
    followers: '8K',
  },
  {
    name: 'Facebook',
    icon: Facebook,
    url: 'https://facebook.com/harpia',
    followers: '12K',
  },
];

const benefits = [
  { label: 'Resposta Rápida', value: '24h' },
  { label: 'Atendimento', value: 'Personalizado' },
  { label: 'Orçamento', value: 'Gratuito' },
];

export const ContactInfo: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="lg:col-span-5 space-y-12">
      <Reveal>
        <div className="space-y-8">
          {/* Header */}
          <div className="relative">
            <div className="absolute -left-4 top-0 w-1 h-full bg-linear-to-b from-white/50 via-white/20 to-transparent" />
            <h2 className="font-serif text-4xl md:text-5xl mb-4 leading-tight">
              Entre em{' '}
              <span className="italic bg-clip-text text-transparent bg-linear-to-r from-white to-gray-400">
                Contato
              </span>
            </h2>
            <p className="text-gray-500 font-light leading-relaxed text-lg">
              Preencha o formulário ou utilize nossos canais diretos para iniciar uma conversa
              estratégica.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="space-y-4">
            {contactInfo.map((item, index) => (
              <Reveal key={item.label} delay={index * 100}>
                <div className="group relative overflow-hidden">
                  {/* Gradient Border Effect */}
                  <div className="absolute inset-0 bg-linear-to-r from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative flex items-start gap-4 p-6 bg-harpia-carbon/40 border border-white/5 hover:border-white/20 transition-all duration-500 backdrop-blur-sm">
                    {/* Icon Container with Glow */}
                    <div className="relative shrink-0">
                      <div className="absolute inset-0 bg-white/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative w-14 h-14 flex items-center justify-center border-2 border-white/10 rounded-full group-hover:border-white/30 group-hover:bg-white/5 transition-all duration-500 group-hover:rotate-12">
                        {item.icon}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-sans text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-2">
                        {item.label}
                      </h3>
                      <div className="flex items-center gap-3">
                        {item.href ? (
                          <a
                            href={item.href}
                            className="font-sans text-harpia-white hover:text-gray-300 transition-colors text-lg font-light truncate"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="font-sans text-harpia-white text-lg font-light">
                            {item.value}
                          </p>
                        )}
                        {item.copyable && (
                          <button
                            onClick={() => handleCopy(item.value, index)}
                            className="shrink-0 p-2 border border-white/10 hover:border-white/30 rounded-lg hover:bg-white/5 transition-all duration-300 group/copy"
                            aria-label={`Copiar ${item.label}`}
                          >
                            {copiedIndex === index ? (
                              <Check size={14} className="text-green-400" />
                            ) : (
                              <Copy
                                size={14}
                                className="text-gray-400 group-hover/copy:text-white transition-colors"
                              />
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Benefits Grid */}
          <Reveal delay={300}>
            <div className="grid grid-cols-3 gap-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="relative p-4 bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 group"
                >
                  <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-white/20 to-transparent" />
                  <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-gray-500 mb-2">
                    {benefit.label}
                  </p>
                  <p className="font-serif text-xl text-white group-hover:scale-110 transition-transform duration-300 origin-left">
                    {benefit.value}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Social Links */}
          <Reveal delay={400}>
            <div className="pt-8 border-t border-white/5">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-sans text-[11px] uppercase tracking-[0.3em] text-white/80 font-semibold">
                  Redes Sociais
                </h3>
                <div className="h-px flex-1 ml-6 bg-linear-to-r from-white/10 to-transparent" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                {socialLinks.map(({ name, icon: Icon, url, followers }) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex flex-col items-center gap-3 p-6 bg-white/5 border border-white/10 hover:border-white rounded-lg transition-all duration-500 overflow-hidden hover:scale-105"
                    aria-label={name}
                  >
                    {/* Background Gradient */}
                    <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Icon */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-white rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                      <div className="relative w-12 h-12 flex items-center justify-center bg-white/5 group-hover:bg-white border border-white/10 group-hover:border-white rounded-full transition-all duration-500 overflow-hidden">
                        <Icon
                          size={20}
                          className="relative z-10 text-gray-400 group-hover:text-harpia-black transition-colors duration-300"
                        />
                        <div className="absolute inset-0 bg-white scale-0 group-hover:scale-100 transition-transform duration-500" />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="relative text-center">
                      <p className="font-sans text-xs text-gray-400 group-hover:text-white transition-colors mb-1">
                        {name}
                      </p>
                      {followers && (
                        <p className="font-mono text-[10px] text-gray-600 group-hover:text-gray-400 transition-colors">
                          {followers} seguidores
                        </p>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Availability Indicator */}
          <Reveal delay={500}>
            <div className="flex items-center gap-4 p-5 bg-linear-to-r from-green-500/10 to-transparent border border-green-500/20 backdrop-blur-sm rounded-lg">
              <div className="relative shrink-0">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-75" />
              </div>
              <div>
                <p className="font-sans text-sm text-white font-semibold">Online Agora</p>
                <p className="font-sans text-xs text-gray-400">
                  Nossa equipe está disponível para atendê-lo
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Reveal>
    </div>
  );
};
