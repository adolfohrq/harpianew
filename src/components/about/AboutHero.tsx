import { Reveal } from '../Reveal';

export const AboutHero = () => {
  return (
    <section className="py-32 md:py-48 bg-harpia-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Reveal>
          <div className="max-w-4xl">
            <span className="inline-block text-xs uppercase tracking-[0.3em] text-white/50 mb-8 font-medium">
              Nossa História
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-8 leading-tight">
              Mais que uma <span className="italic text-white/40">agência</span>.
              <br />
              Uma <span className="italic text-white/30">parceria</span> de voo.
            </h1>
            <p className="text-xl md:text-2xl text-white/70 font-light max-w-2xl leading-relaxed">
              Transformamos visões em realidades extraordinárias. Desde 2019, ajudamos marcas a
              decolar, enxergar mais longe e conquistar altitudes inimagináveis.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
