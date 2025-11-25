import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Clock,
  Users,
  Award,
} from 'lucide-react';
import { Reveal } from './Reveal';

const SERVICES = [
  { id: 'branding', label: 'Branding & Identidade', icon: Sparkles },
  { id: 'marketing', label: 'Marketing Digital', icon: Award },
  { id: 'design', label: 'Design & Conteúdo', icon: Users },
  { id: 'foto', label: 'Fotografia & Vídeo', icon: Clock },
];

export const ContactMain: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleServiceSelect = (serviceId: string) => {
    setFormData((prev) => ({
      ...prev,
      service: prev.service === serviceId ? '' : serviceId,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', company: '', service: '', message: '' });
    }, 5000);
  };

  return (
    <section className="py-24 md:py-32 lg:py-40 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #191919 1px, transparent 0)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* Decorative lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-linear-to-b from-transparent via-black/5 to-transparent hidden lg:block" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-linear-to-b from-transparent via-black/5 to-transparent hidden lg:block" />
        {/* Gradient orbs */}
        <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-gray-100 rounded-full blur-[150px] opacity-60" />
        <div className="absolute bottom-20 left-20 w-[400px] h-[400px] bg-gray-50 rounded-full blur-[120px] opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <Reveal>
          <div className="text-center mb-16 md:mb-24">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-px bg-linear-to-r from-transparent to-black/20" />
              <span className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-gray-500 font-medium">
                Fale Conosco
              </span>
              <div className="w-16 h-px bg-linear-to-l from-transparent to-black/20" />
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-harpia-black mb-6 leading-tight">
              Vamos construir algo
              <br />
              <span className="italic text-gray-400">incrível juntos</span>
            </h2>

            <p className="text-gray-600 text-base md:text-lg font-light max-w-2xl mx-auto">
              Conte-nos sobre seu projeto. Nossa equipe está pronta para transformar sua visão em
              resultados extraordinários.
            </p>
          </div>
        </Reveal>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left Column - Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Cards */}
            <Reveal delay={100}>
              <div className="space-y-4">
                {/* Email */}
                <a
                  href="mailto:harpiagencia@gmail.com"
                  className="group block p-6 bg-gray-50 border border-gray-100 rounded-sm hover:bg-white hover:border-gray-200 hover:shadow-lg transition-all duration-500"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-harpia-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 block mb-1">
                        Email
                      </span>
                      <span className="text-harpia-black font-medium text-lg group-hover:text-gray-700 transition-colors">
                        harpiagencia@gmail.com
                      </span>
                    </div>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href="tel:+5511999999999"
                  className="group block p-6 bg-gray-50 border border-gray-100 rounded-sm hover:bg-white hover:border-gray-200 hover:shadow-lg transition-all duration-500"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-harpia-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 block mb-1">
                        Telefone
                      </span>
                      <span className="text-harpia-black font-medium text-lg group-hover:text-gray-700 transition-colors">
                        (11) 99999-9999
                      </span>
                    </div>
                  </div>
                </a>

                {/* Location */}
                <div className="p-6 bg-gray-50 border border-gray-100 rounded-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-harpia-black rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 block mb-1">
                        Localização
                      </span>
                      <span className="text-harpia-black font-medium text-lg">
                        Brasil - Atendimento Global
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Trust Badges */}
            <Reveal delay={200}>
              <div className="pt-6 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <span className="text-4xl font-serif text-harpia-black block mb-2">24h</span>
                    <span className="text-xs uppercase tracking-wider text-gray-500">
                      Tempo de Resposta
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="text-4xl font-serif text-harpia-black block mb-2">100+</span>
                    <span className="text-xs uppercase tracking-wider text-gray-500">
                      Projetos Entregues
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-3">
            <Reveal delay={150}>
              <div className="relative">
                {/* Form Card */}
                <div className="relative bg-white border border-gray-200 rounded-sm shadow-xl shadow-black/5 overflow-hidden">
                  {/* Corner Accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-harpia-black/10" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-harpia-black/10" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-harpia-black/10" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-harpia-black/10" />

                  <div className="p-8 md:p-10 lg:p-12">
                    {submitted ? (
                      /* Success State */
                      <div className="py-12 text-center">
                        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                          <CheckCircle className="w-10 h-10 text-green-500" />
                        </div>
                        <h3 className="text-2xl font-serif text-harpia-black mb-3">
                          Mensagem Enviada!
                        </h3>
                        <p className="text-gray-600 font-light max-w-sm mx-auto">
                          Recebemos sua mensagem e entraremos em contato em até 24 horas.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Service Selection */}
                        <div>
                          <label className="text-xs uppercase tracking-[0.2em] text-gray-500 block mb-4 font-medium">
                            Qual serviço você precisa?
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            {SERVICES.map((service) => {
                              const Icon = service.icon;
                              const isSelected = formData.service === service.id;
                              return (
                                <button
                                  key={service.id}
                                  type="button"
                                  onClick={() => handleServiceSelect(service.id)}
                                  className={`group relative p-4 border rounded-sm text-left transition-all duration-300 ${
                                    isSelected
                                      ? 'bg-harpia-black border-harpia-black text-white'
                                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-white hover:border-gray-300 hover:shadow-md'
                                  }`}
                                >
                                  <Icon
                                    className={`w-5 h-5 mb-2 ${isSelected ? 'text-white/80' : 'text-gray-400 group-hover:text-harpia-black'} transition-colors`}
                                  />
                                  <span className="text-sm font-medium block">{service.label}</span>
                                  {isSelected && (
                                    <div className="absolute top-3 right-3">
                                      <CheckCircle className="w-4 h-4 text-white" />
                                    </div>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Name & Email Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Name */}
                          <div className="relative">
                            <label
                              htmlFor="name"
                              className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                                focusedField === 'name' || formData.name
                                  ? '-top-6 text-[10px] uppercase tracking-[0.2em] text-harpia-black'
                                  : 'top-4 text-gray-400 text-base'
                              }`}
                            >
                              Nome Completo *
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              onFocus={() => setFocusedField('name')}
                              onBlur={() => setFocusedField(null)}
                              required
                              className="w-full bg-transparent border-b-2 border-gray-200 py-4 text-harpia-black focus:outline-none focus:border-harpia-black transition-colors"
                            />
                          </div>

                          {/* Email */}
                          <div className="relative">
                            <label
                              htmlFor="email"
                              className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                                focusedField === 'email' || formData.email
                                  ? '-top-6 text-[10px] uppercase tracking-[0.2em] text-harpia-black'
                                  : 'top-4 text-gray-400 text-base'
                              }`}
                            >
                              E-mail *
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              onFocus={() => setFocusedField('email')}
                              onBlur={() => setFocusedField(null)}
                              required
                              className="w-full bg-transparent border-b-2 border-gray-200 py-4 text-harpia-black focus:outline-none focus:border-harpia-black transition-colors"
                            />
                          </div>
                        </div>

                        {/* Phone & Company Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Phone */}
                          <div className="relative">
                            <label
                              htmlFor="phone"
                              className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                                focusedField === 'phone' || formData.phone
                                  ? '-top-6 text-[10px] uppercase tracking-[0.2em] text-harpia-black'
                                  : 'top-4 text-gray-400 text-base'
                              }`}
                            >
                              Telefone
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              onFocus={() => setFocusedField('phone')}
                              onBlur={() => setFocusedField(null)}
                              className="w-full bg-transparent border-b-2 border-gray-200 py-4 text-harpia-black focus:outline-none focus:border-harpia-black transition-colors"
                            />
                          </div>

                          {/* Company */}
                          <div className="relative">
                            <label
                              htmlFor="company"
                              className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                                focusedField === 'company' || formData.company
                                  ? '-top-6 text-[10px] uppercase tracking-[0.2em] text-harpia-black'
                                  : 'top-4 text-gray-400 text-base'
                              }`}
                            >
                              Empresa
                            </label>
                            <input
                              type="text"
                              id="company"
                              name="company"
                              value={formData.company}
                              onChange={handleChange}
                              onFocus={() => setFocusedField('company')}
                              onBlur={() => setFocusedField(null)}
                              className="w-full bg-transparent border-b-2 border-gray-200 py-4 text-harpia-black focus:outline-none focus:border-harpia-black transition-colors"
                            />
                          </div>
                        </div>

                        {/* Message */}
                        <div className="relative">
                          <label
                            htmlFor="message"
                            className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                              focusedField === 'message' || formData.message
                                ? '-top-6 text-[10px] uppercase tracking-[0.2em] text-harpia-black'
                                : 'top-4 text-gray-400 text-base'
                            }`}
                          >
                            Conte-nos sobre seu projeto *
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('message')}
                            onBlur={() => setFocusedField(null)}
                            required
                            rows={4}
                            className="w-full bg-transparent border-b-2 border-gray-200 py-4 text-harpia-black focus:outline-none focus:border-harpia-black transition-colors resize-none"
                          />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="group relative w-full flex items-center justify-center gap-3 px-8 py-5 bg-harpia-black text-white font-medium uppercase tracking-wider text-sm hover:bg-harpia-carbon transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden rounded-sm"
                          >
                            {isSubmitting ? (
                              <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Enviando...</span>
                              </>
                            ) : (
                              <>
                                <span>Enviar Mensagem</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                              </>
                            )}
                          </button>
                        </div>

                        {/* Privacy */}
                        <p className="text-center text-xs text-gray-400">
                          Ao enviar, você concorda com nossa{' '}
                          <a href="#" className="text-harpia-black hover:underline">
                            Política de Privacidade
                          </a>
                        </p>
                      </form>
                    )}
                  </div>
                </div>

                {/* Decorative Badge */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-harpia-black rounded-full flex items-center justify-center shadow-xl hidden md:flex">
                  <div className="text-center">
                    <Send className="w-6 h-6 text-white mx-auto mb-1" />
                    <span className="text-[8px] uppercase tracking-wider text-white/70">
                      Resposta
                      <br />
                      Rápida
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
