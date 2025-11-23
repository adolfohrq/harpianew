import React from 'react';
import { Instagram, Facebook, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-harpia-carbon border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <h3 className="font-serif text-3xl tracking-wider">HARPIA</h3>
            <p className="text-gray-400 font-light max-w-xs leading-relaxed">
              Enxergue mais longe. Voe mais alto. Transformando visão estratégica em arte digital desde 2020.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-6 flex flex-col md:items-center">
            <h4 className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-2">Menu</h4>
            <div className="flex flex-col gap-4 md:text-center">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors font-light">Home</Link>
              <Link to="/servicos" className="text-gray-300 hover:text-white transition-colors font-light">Serviços</Link>
              <Link to="/pacotes" className="text-gray-300 hover:text-white transition-colors font-light">Pacotes</Link>
              <Link to="/contato" className="text-gray-300 hover:text-white transition-colors font-light">Contato</Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-6 md:text-right">
            <h4 className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-2">Contato</h4>
            <div className="flex flex-col gap-4 md:items-end">
              <a href="mailto:harpiagencia@gmail.com" className="text-gray-300 hover:text-white transition-colors font-light flex items-center gap-2">
                <Mail size={16} /> harpiagencia@gmail.com
              </a>
              <div className="flex gap-4">
                <a href="#" className="p-2 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all">
                  <Instagram size={20} />
                </a>
                <a href="#" className="p-2 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all">
                  <Facebook size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 font-light uppercase tracking-widest">
          <p>© Harpia Agência 2023. All rights Reserved.</p>
          <p>Harpia Agência – 2020</p>
        </div>
      </div>
    </footer>
  );
};