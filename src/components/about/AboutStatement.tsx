import { Reveal } from '../Reveal';

export const AboutStatement = () => {
  return (
    <section className="py-32 md:py-40 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gray-50 rounded-full blur-[120px] -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gray-100 rounded-full blur-[100px] translate-y-1/2" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <Reveal>
          <div className="text-center">
            <blockquote className="text-3xl md:text-5xl lg:text-6xl font-serif text-harpia-black mb-8 leading-tight">
              Não criamos campanhas.
              <br />
              <span className="italic text-gray-400">Criamos conexões</span> que transformam
              <br />
              negócios em <span className="italic text-gray-400">lendas</span>.
            </blockquote>
            <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
              Acreditamos que toda marca tem uma história extraordinária esperando para ser contada.
              Nosso trabalho é encontrá-la, amplificá-la e fazê-la voar.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
