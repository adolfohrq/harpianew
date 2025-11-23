import React from 'react';
import { Reveal } from '../Reveal';
import { Mail, Phone, MapPin } from 'lucide-react';

interface ContactInfoItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string | null;
}

const contactInfo: ContactInfoItem[] = [
  {
    icon: <Mail className="w-5 h-5" />,
    label: 'Email',
    value: 'harpiagencia@gmail.com',
    href: 'mailto:harpiagencia@gmail.com',
  },
  {
    icon: <Phone className="w-5 h-5" />,
    label: 'Telefone',
    value: '(11) 99999-9999',
    href: 'tel:+5511999999999',
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    label: 'Localização',
    value: 'Brasil - Atendimento Global',
    href: null,
  },
];

export const ContactInfo: React.FC = () => {
  return (
    <div className="lg:col-span-5">
      <Reveal>
        <div className="space-y-12">
          {/* Header */}
          <div>
            <h2 className="font-serif text-3xl md:text-4xl mb-4 leading-tight text-harpia-black">
              Entre em <span className="italic text-gray-400">Contato</span>
            </h2>
            <p className="text-gray-600 font-light leading-relaxed">
              Preencha o formulário ou utilize nossos canais diretos.
            </p>
          </div>

          {/* Contact Items */}
          <div className="space-y-6">
            {contactInfo.map((item, index) => (
              <Reveal key={item.label} delay={index * 100}>
                <div className="group">
                  <p className="font-sans text-xs uppercase tracking-[0.3em] text-gray-400 mb-2">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="font-sans text-lg text-harpia-black hover:text-gray-600 transition-colors flex items-center gap-3"
                    >
                      <span className="text-harpia-black group-hover:text-gray-600 transition-colors">
                        {item.icon}
                      </span>
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-sans text-lg text-harpia-black flex items-center gap-3">
                      <span className="text-harpia-black">{item.icon}</span>
                      {item.value}
                    </p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
};
