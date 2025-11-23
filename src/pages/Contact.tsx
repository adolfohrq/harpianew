import React, { useState } from 'react';
import { Reveal } from '../components/Reveal';
import { Mail, Phone, MapPin, ArrowRight, Instagram, Facebook } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Mensagem enviada (Simulação). Entraremos em contato em breve!');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-harpia-black pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Contact Info */}
          <Reveal>
            <div className="space-y-12">
              <div>
                <h1 className="font-serif text-5xl md:text-6xl mb-6">VAMOS <br/>VOAR JUNTOS?</h1>
                <p className="text-gray-400 font-light text-lg max-w-md leading-relaxed">
                  Estamos prontos para ouvir sua história e transformá-la em resultados. Preencha o formulário ou utilize nossos canais diretos para iniciar uma conversa estratégica.
                </p>
              </div>

              <div className="space-y-8 mt-16">
                <div className="flex items-start gap-4 group">
                  <div className="p-3 border border-white/10 rounded-full group-hover:border-white/40 transition-colors">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-1">Email</h3>
                    <a href="mailto:harpiagencia@gmail.com" className="text-white text-lg font-light hover:text-gray-300 transition-colors">harpiagencia@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="p-3 border border-white/10 rounded-full group-hover:border-white/40 transition-colors">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-1">Telefone & Social</h3>
                    <div className="flex flex-wrap items-center gap-6">
                      <a href="tel:+5511999999999" className="text-white text-lg font-light hover:text-gray-300 transition-colors">
                        (11) 99999-9999
                      </a>
                      <div className="flex items-center gap-3">
                        <a 
                          href="https://instagram.com/harpia.agencia" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-gray-500 hover:text-white transition-colors p-1 border border-white/10 rounded-full hover:border-white/50"
                          aria-label="Instagram"
                        >
                          <Instagram size={16} strokeWidth={1.5} />
                        </a>
                        <a 
                          href="https://facebook.com/harpia.agencia" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-gray-500 hover:text-white transition-colors p-1 border border-white/10 rounded-full hover:border-white/50"
                          aria-label="Facebook"
                        >
                          <Facebook size={16} strokeWidth={1.5} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="p-3 border border-white/10 rounded-full group-hover:border-white/40 transition-colors">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-1">Localização</h3>
                    <p className="text-white text-lg font-light">Brasil - Atendimento Global</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={200}>
            <div className="bg-harpia-carbon/30 border border-white/5 p-8 md:p-12 relative backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="relative group">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder=" "
                    className="peer w-full bg-transparent border-b border-white/20 hover:border-white/50 py-4 text-white focus:outline-none focus:border-white transition-all duration-300 placeholder-transparent font-light tracking-wide text-lg"
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-0 -top-3.5 text-xs uppercase tracking-[0.2em] text-gray-400 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-600 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-white"
                  >
                    Nome Completo
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="relative group">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder=" "
                      className="peer w-full bg-transparent border-b border-white/20 hover:border-white/50 py-4 text-white focus:outline-none focus:border-white transition-all duration-300 placeholder-transparent font-light tracking-wide text-lg"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-xs uppercase tracking-[0.2em] text-gray-400 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-600 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-white"
                    >
                      E-mail
                    </label>
                  </div>
                  <div className="relative group">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder=" "
                      className="peer w-full bg-transparent border-b border-white/20 hover:border-white/50 py-4 text-white focus:outline-none focus:border-white transition-all duration-300 placeholder-transparent font-light tracking-wide text-lg"
                    />
                    <label
                      htmlFor="phone"
                      className="absolute left-0 -top-3.5 text-xs uppercase tracking-[0.2em] text-gray-400 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-600 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-white"
                    >
                      Telefone
                    </label>
                  </div>
                </div>

                <div className="relative group">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder=" "
                    className="peer w-full bg-transparent border-b border-white/20 hover:border-white/50 py-4 text-white focus:outline-none focus:border-white transition-all duration-300 placeholder-transparent font-light tracking-wide text-lg resize-none"
                  />
                  <label
                    htmlFor="message"
                    className="absolute left-0 -top-3.5 text-xs uppercase tracking-[0.2em] text-gray-400 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-600 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-white"
                  >
                    Mensagem
                  </label>
                </div>

                <button
                  type="submit"
                  className="group w-full border border-white bg-white text-black py-5 uppercase tracking-[0.2em] text-sm font-bold hover:bg-black hover:text-white transition-all duration-500 flex items-center justify-center gap-3"
                >
                  Enviar Mensagem
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
};