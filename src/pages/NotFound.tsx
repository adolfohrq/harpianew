import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Home as HomeIcon } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>404 - Página Não Encontrada | Harpia Agência</title>
        <meta name="description" content="Página não encontrada." />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-harpia-black text-white px-6">
        <div className="text-center max-w-2xl">
          <h1 className="font-serif text-9xl mb-6 tracking-tight">404</h1>
          <h2 className="text-2xl md:text-3xl mb-4 tracking-wide">Página Não Encontrada</h2>
          <p className="text-gray-400 mb-12 text-lg">
            O caminho que você procura não existe. Vamos voar de volta para casa?
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 hover:bg-white hover:text-black transition-all duration-300 text-sm tracking-widest uppercase"
          >
            <HomeIcon size={20} />
            Voltar para Home
          </Link>
        </div>
      </div>
    </>
  );
};
