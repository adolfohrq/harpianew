import React from 'react';
import { useMetaTags } from '../hooks/useMetaTags';
import { HeroSection } from '../components/ui/HeroSection';
import { Reveal } from '../components/Reveal';

export const Privacy: React.FC = () => {
  useMetaTags({
    title: 'Política de Privacidade - Harpia | Agência de Marketing',
    description:
      'Política de privacidade da Harpia Agência. Saiba como coletamos, usamos e protegemos suas informações pessoais.',
    keywords: 'política de privacidade, privacidade, dados pessoais, LGPD, proteção de dados',
    ogTitle: 'Política de Privacidade - Harpia',
    ogDescription: 'Saiba como protegemos suas informações pessoais.',
    canonical: `${window.location.origin}/privacidade`,
  });

  const sections = [
    {
      title: '1. Informações que Coletamos',
      content: [
        'Coletamos informações que você nos fornece diretamente, como nome, e-mail e telefone quando você entra em contato conosco através do formulário de contato ou outros meios de comunicação.',
        'Também podemos coletar automaticamente informações técnicas sobre sua visita, incluindo endereço IP, tipo de navegador, páginas visitadas e tempo de permanência no site.',
      ],
    },
    {
      title: '2. Como Usamos suas Informações',
      content: [
        'Utilizamos suas informações para responder às suas solicitações e fornecer os serviços que você solicita.',
        'Podemos usar seus dados para melhorar nosso site e serviços, personalizar sua experiência e enviar comunicações sobre nossos serviços, caso você tenha optado por recebê-las.',
        'Suas informações também podem ser usadas para cumprir obrigações legais e proteger nossos direitos.',
      ],
    },
    {
      title: '3. Compartilhamento de Informações',
      content: [
        'Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros para fins de marketing sem seu consentimento explícito.',
        'Podemos compartilhar informações com prestadores de serviços que nos auxiliam na operação do site e na prestação de serviços, sempre sob obrigações de confidencialidade.',
        'Também podemos divulgar informações quando exigido por lei ou para proteger nossos direitos legais.',
      ],
    },
    {
      title: '4. Cookies e Tecnologias Similares',
      content: [
        'Utilizamos cookies e tecnologias similares para melhorar sua experiência de navegação, analisar o tráfego do site e personalizar conteúdo.',
        'Você pode configurar seu navegador para recusar cookies, mas isso pode afetar algumas funcionalidades do site.',
      ],
    },
    {
      title: '5. Segurança dos Dados',
      content: [
        'Implementamos medidas de segurança técnicas e organizacionais adequadas para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.',
        'No entanto, nenhum método de transmissão pela internet ou armazenamento eletrônico é 100% seguro, e não podemos garantir segurança absoluta.',
      ],
    },
    {
      title: '6. Seus Direitos (LGPD)',
      content: [
        'De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:',
        '• Confirmar a existência de tratamento de seus dados',
        '• Acessar seus dados pessoais',
        '• Corrigir dados incompletos, inexatos ou desatualizados',
        '• Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários',
        '• Solicitar a portabilidade dos dados',
        '• Revogar seu consentimento a qualquer momento',
        'Para exercer esses direitos, entre em contato conosco através do e-mail contato@agenciaharpia.com.br.',
      ],
    },
    {
      title: '7. Retenção de Dados',
      content: [
        'Mantemos suas informações pessoais pelo tempo necessário para cumprir as finalidades descritas nesta política, a menos que um período de retenção mais longo seja exigido ou permitido por lei.',
      ],
    },
    {
      title: '8. Links para Sites de Terceiros',
      content: [
        'Nosso site pode conter links para sites de terceiros. Não somos responsáveis pelas práticas de privacidade desses sites e recomendamos que você leia suas políticas de privacidade.',
      ],
    },
    {
      title: '9. Alterações nesta Política',
      content: [
        'Podemos atualizar esta política de privacidade periodicamente. A versão mais recente estará sempre disponível em nosso site, com a data da última atualização.',
        'Recomendamos que você revise esta página regularmente para se manter informado sobre como protegemos suas informações.',
      ],
    },
    {
      title: '10. Contato',
      content: [
        'Se você tiver dúvidas sobre esta política de privacidade ou sobre como tratamos seus dados pessoais, entre em contato conosco:',
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
            Política de <span className="italic text-white/40">Privacidade</span>
          </>
        }
        description="Transparência e segurança no tratamento dos seus dados pessoais."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Privacidade' }]}
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
                A Harpia Agência está comprometida em proteger sua privacidade. Esta política
                descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais
                quando você utiliza nosso site e serviços.
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
                Ao utilizar nosso site, você concorda com os termos desta política de privacidade.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};
