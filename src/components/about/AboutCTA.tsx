import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '../Reveal';

export const AboutCTA = () => {
  return (
    <section className="py-32 md:py-48 relative bg-harpia-black overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <Reveal>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-8 leading-tight">
            Pronto para
            <br />
            <span className="italic text-white/40">decolar?</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/70 font-light mb-12 max-w-2xl mx-auto">
            Vamos converter sua visão em uma história extraordinária que seus clientes nunca
            esquecerão.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/contato"
              className="group inline-flex items-center gap-3 px-10 py-4 bg-white text-harpia-black rounded-sm hover:bg-white/90 transition-all duration-300 font-medium uppercase tracking-wider text-sm"
            >
              Iniciar Projeto
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>

            <Link
              to="/servicos"
              className="group inline-flex items-center gap-3 px-10 py-4 border border-white/30 text-white hover:border-white hover:bg-white/10 transition-all duration-300 font-medium uppercase tracking-wider text-sm backdrop-blur-sm"
            >
              Explorar Serviços
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
