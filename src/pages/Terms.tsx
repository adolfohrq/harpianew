import React from 'react';
import { useMetaTags } from '../hooks/useMetaTags';
import { HeroSection } from '../components/ui/HeroSection';
import { Reveal } from '../components/Reveal';

export const Terms: React.FC = () => {
  useMetaTags({
    title: 'Termos de Uso - Harpia | Agência de Marketing',
    description:
      'Termos de uso da Harpia Agência. Conheça as condições e regras para utilização dos nossos serviços e site.',
    keywords: 'termos de uso, condições de uso, termos e condições, regras, contrato',
    ogTitle: 'Termos de Uso - Harpia',
    ogDescription: 'Conheça as condições para utilização dos nossos serviços.',
    canonical: `${window.location.origin}/termos`,
  });

  const sections = [
    {
      title: '1. Aceitação dos Termos',
      content: [
        'Ao acessar e utilizar o site da Harpia Agência, você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deverá utilizar nosso site ou serviços.',
        'Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após sua publicação no site.',
      ],
    },
    {
      title: '2. Descrição dos Serviços',
      content: [
        'A Harpia Agência oferece serviços de marketing digital, branding, design, fotografia, gestão de redes sociais e desenvolvimento web.',
        'Os serviços específicos, prazos e valores são definidos em propostas comerciais e contratos individuais firmados com cada cliente.',
        'Nos reservamos o direito de modificar, suspender ou descontinuar qualquer serviço a qualquer momento.',
      ],
    },
    {
      title: '3. Uso do Site',
      content: [
        'Você concorda em utilizar nosso site apenas para fins legais e de maneira que não infrinja os direitos de terceiros.',
        'É proibido:',
        '• Tentar obter acesso não autorizado a qualquer parte do site',
        '• Usar o site para transmitir vírus ou código malicioso',
        '• Coletar informações de outros usuários sem consentimento',
        '• Reproduzir, duplicar ou copiar qualquer conteúdo sem autorização',
        '• Usar o site para fins comerciais não autorizados',
      ],
    },
    {
      title: '4. Propriedade Intelectual',
      content: [
        'Todo o conteúdo presente no site, incluindo textos, imagens, logotipos, designs, vídeos e código-fonte, são de propriedade exclusiva da Harpia Agência ou de seus licenciadores.',
        'O uso não autorizado de qualquer material do site pode violar leis de direitos autorais, marcas registradas e outras legislações aplicáveis.',
        'Os trabalhos exibidos em nosso portfólio foram desenvolvidos para nossos clientes e sua reprodução é estritamente proibida.',
      ],
    },
    {
      title: '5. Trabalhos e Entregas',
      content: [
        'Os direitos sobre os trabalhos desenvolvidos são transferidos ao cliente somente após o pagamento integral dos valores acordados.',
        'A Harpia Agência reserva o direito de utilizar os trabalhos realizados em seu portfólio e materiais promocionais, salvo acordo em contrário.',
        'Revisões e alterações nos trabalhos são limitadas conforme estabelecido em cada proposta comercial.',
      ],
    },
    {
      title: '6. Pagamentos e Cancelamentos',
      content: [
        'Os valores e condições de pagamento são estabelecidos em propostas comerciais individuais.',
        'O não pagamento nas datas acordadas pode resultar em suspensão dos serviços e cobrança de multas e juros.',
        'Cancelamentos de projetos em andamento estão sujeitos às condições estabelecidas em contrato, incluindo possíveis multas proporcionais ao trabalho já realizado.',
      ],
    },
    {
      title: '7. Confidencialidade',
      content: [
        'Comprometemo-nos a manter em sigilo todas as informações confidenciais compartilhadas pelos clientes durante a prestação de serviços.',
        'Esta obrigação de confidencialidade permanece válida mesmo após o término da relação comercial.',
        'Informações podem ser divulgadas quando exigido por lei ou ordem judicial.',
      ],
    },
    {
      title: '8. Limitação de Responsabilidade',
      content: [
        'A Harpia Agência não será responsável por danos indiretos, incidentais, especiais ou consequenciais decorrentes do uso ou incapacidade de uso do site ou serviços.',
        'Não garantimos que o site estará sempre disponível, livre de erros ou que os resultados obtidos serão precisos ou confiáveis.',
        'Nossa responsabilidade total em qualquer caso está limitada ao valor pago pelos serviços em questão.',
      ],
    },
    {
      title: '9. Links para Sites de Terceiros',
      content: [
        'Nosso site pode conter links para sites de terceiros que não são operados por nós.',
        'Não temos controle sobre o conteúdo ou práticas desses sites e não assumimos responsabilidade por eles.',
        'Recomendamos que você leia os termos de uso de qualquer site de terceiros que acessar.',
      ],
    },
    {
      title: '10. Comunicações',
      content: [
        'Ao utilizar nossos serviços, você concorda em receber comunicações eletrônicas relacionadas aos projetos e serviços contratados.',
        'Comunicações de marketing só serão enviadas mediante seu consentimento expresso.',
        'Você pode optar por não receber comunicações promocionais a qualquer momento.',
      ],
    },
    {
      title: '11. Lei Aplicável e Foro',
      content: [
        'Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil.',
        'Fica eleito o foro da comarca de Tubarão, Santa Catarina, para dirimir quaisquer controvérsias decorrentes destes termos.',
      ],
    },
    {
      title: '12. Disposições Gerais',
      content: [
        'Se qualquer disposição destes termos for considerada inválida ou inexequível, as demais disposições permanecerão em pleno vigor.',
        'A falha em exercer qualquer direito previsto nestes termos não constituirá renúncia a tal direito.',
        'Estes termos constituem o acordo integral entre você e a Harpia Agência em relação ao uso do site.',
      ],
    },
    {
      title: '13. Contato',
      content: [
        'Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco:',
        '• E-mail: contato@agenciaharpia.com.br',
        '• WhatsApp: (48) 99966-1913',
        '• Localização: Tubarão, SC - Brasil',
      ],
    },
  ];

  return (
    <div className="w-full relative bg-white">
      {/* Hero Section */}
      <HeroSection
        subtitle="Legal"
        title={
          <>
            Termos de <span className="italic text-white/40">Uso</span>
          </>
        }
        description="Condições e regras para utilização dos nossos serviços e site."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Termos de Uso' }]}
      />

      {/* Content Section */}
      <section className="py-16 md:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-6">
          {/* Last Update */}
          <Reveal>
            <p className="text-sm text-gray-500 mb-12 pb-8 border-b border-gray-200">
              Última atualização:{' '}
              {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
            </p>
          </Reveal>

          {/* Introduction */}
          <Reveal delay={0.1}>
            <div className="mb-12">
              <p className="text-gray-700 text-lg leading-relaxed">
                Bem-vindo ao site da Harpia Agência. Estes Termos de Uso regulam o acesso e
                utilização do nosso site e serviços. Por favor, leia atentamente antes de utilizar
                nossa plataforma.
              </p>
            </div>
          </Reveal>

          {/* Sections */}
          <div className="space-y-10">
            {sections.map((section, index) => (
              <Reveal key={index} delay={0.1 + index * 0.05}>
                <div className="group">
                  <h2 className="font-serif text-xl md:text-2xl text-harpia-black mb-4 pb-3 border-b border-gray-100 group-hover:border-harpia-black/20 transition-colors duration-300">
                    {section.title}
                  </h2>
                  <div className="space-y-3">
                    {section.content.map((paragraph, pIndex) => (
                      <p
                        key={pIndex}
                        className={`text-gray-600 leading-relaxed ${
                          paragraph.startsWith('•') ? 'pl-4' : ''
                        }`}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Footer Note */}
          <Reveal delay={0.5}>
            <div className="mt-16 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">
                Ao utilizar nosso site e serviços, você declara ter lido e concordado com estes
                Termos de Uso.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};
