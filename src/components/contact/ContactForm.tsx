import React, { useState } from 'react';
import { Reveal } from '../Reveal';
import { Send, Loader2, CheckCircle2 } from 'lucide-react';
import {
  validateField,
  validateForm,
  BUDGET_OPTIONS,
  INITIAL_FORM_STATE,
  type ContactFormData,
  type ContactFormErrors,
} from '../../lib/validations';

interface FormFieldProps {
  id: string;
  name: keyof ContactFormData;
  type: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  label: string;
  required?: boolean;
  rows?: number;
  options?: string[];
  error?: string;
  touched?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  name,
  type,
  value,
  onChange,
  onBlur,
  label,
  required = false,
  rows,
  options,
  error,
  touched,
}) => {
  const hasError = touched && error;
  const isValid = touched && !error && value;

  if (options) {
    return (
      <div className="relative pb-2 group/field">
        {/* Background glow on focus */}
        <div className="absolute inset-0 bg-white/2 opacity-0 peer-focus:opacity-100 transition-opacity duration-300 blur-sm" />

        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          className={`peer w-full bg-white/2 border-b py-4 px-4 pr-10 text-white focus:outline-none transition-all duration-300 appearance-none cursor-pointer ${
            hasError
              ? 'border-red-500/50 focus:border-red-500'
              : isValid
                ? 'border-green-500/50 focus:border-green-500'
                : 'border-white/10 focus:border-white/40 hover:border-white/20'
          }`}
        >
          <option value="" disabled className="bg-harpia-black text-gray-500">
            Selecione uma opção
          </option>
          {options.map((option) => (
            <option key={option} value={option} className="bg-harpia-black text-white py-3">
              {option}
            </option>
          ))}
        </select>

        {/* Custom Dropdown Arrow */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-400 transition-transform duration-300 group-focus-within/field:rotate-180"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <label
          htmlFor={id}
          className={`absolute left-4 -top-3.5 text-xs uppercase tracking-[0.3em] transition-colors pointer-events-none ${
            hasError ? 'text-red-400' : isValid ? 'text-green-400' : 'text-gray-500'
          }`}
        >
          {label}
        </label>

        {/* Success Indicator */}
        {isValid && (
          <div className="absolute right-12 top-4 flex items-center gap-2">
            <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse" />
            <CheckCircle2
              size={16}
              className="text-green-400 animate-in fade-in zoom-in duration-300"
            />
          </div>
        )}

        {/* Error Message */}
        {hasError && (
          <p className="absolute -bottom-6 left-4 text-xs text-red-400 animate-in fade-in slide-in-from-top-1 duration-200 flex items-center gap-1.5">
            <span className="w-1 h-1 bg-red-400 rounded-full" />
            {error}
          </p>
        )}
      </div>
    );
  }

  const Component = rows ? 'textarea' : 'input';
  const commonProps = {
    id,
    name,
    value,
    onChange,
    onBlur,
    required,
    placeholder: ' ',
    className: `peer w-full bg-white/2 border-b py-4 px-4 text-white focus:outline-none transition-all duration-300 placeholder-transparent font-light ${
      rows ? 'resize-none' : ''
    } ${
      hasError
        ? 'border-red-500/50 focus:border-red-500'
        : isValid
          ? 'border-green-500/50 focus:border-green-500'
          : 'border-white/10 focus:border-white/40 hover:border-white/20'
    }`,
  };

  return (
    <div className="relative pb-2 group/field">
      {/* Background glow on focus */}
      <div className="absolute inset-0 bg-white/2 opacity-0 peer-focus:opacity-100 transition-opacity duration-300 blur-sm" />

      <Component {...commonProps} {...(rows ? { rows } : { type })} />
      <label
        htmlFor={id}
        className={`absolute left-4 -top-3.5 text-xs uppercase tracking-[0.3em] transition-all duration-300 pointer-events-none
          peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-600 peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal
          peer-focus:-top-3.5 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-[0.3em] ${
            hasError
              ? 'text-red-400'
              : isValid
                ? 'text-green-400 peer-focus:text-white'
                : 'text-gray-500 peer-focus:text-gray-400'
          }`}
      >
        {label}
      </label>

      {/* Success Indicator */}
      {isValid && (
        <div className="absolute right-4 top-4 flex items-center gap-2">
          <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse" />
          <CheckCircle2
            size={16}
            className="text-green-400 animate-in fade-in zoom-in duration-300"
          />
        </div>
      )}

      {/* Error Message */}
      {hasError && (
        <p className="absolute -bottom-6 left-4 text-xs text-red-400 animate-in fade-in slide-in-from-top-1 duration-200 flex items-center gap-1.5">
          <span className="w-1 h-1 bg-red-400 rounded-full" />
          {error}
        </p>
      )}
    </div>
  );
};

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Valida em tempo real se o campo já foi tocado
    if (touched[name]) {
      const error = validateField(name as keyof ContactFormData, value);
      setErrors((prev) => ({ ...prev, [name]: error || '' }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name as keyof ContactFormData, value);
    setErrors((prev) => ({ ...prev, [name]: error || '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Marca todos os campos como tocados
    const newTouched: Record<string, boolean> = {};
    Object.keys(formData).forEach((key) => {
      newTouched[key] = true;
    });
    setTouched(newTouched);

    // Valida todos os campos com Zod
    const { success, errors: validationErrors } = validateForm(formData);

    if (!success) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');

      // Reset form after success
      setTimeout(() => {
        setFormData(INITIAL_FORM_STATE);
        setErrors({});
        setTouched({});
        setSubmitStatus('idle');
      }, 4000);
    }, 2000);
  };

  const filledFieldsCount = Object.values(formData).filter((v) => v.trim()).length;
  const totalFields = Object.keys(formData).length;
  const progress = Math.round((filledFieldsCount / totalFields) * 100);

  return (
    <div className="lg:col-span-7">
      <Reveal delay={200}>
        {/* Premium Card Container */}
        <div className="relative group">
          {/* Glow Effect on Hover */}
          <div className="absolute -inset-0.5 bg-linear-to-r from-white/10 via-white/5 to-white/10 opacity-0 group-hover:opacity-100 blur transition-opacity duration-1000" />

          {/* Main Card */}
          <div className="relative bg-harpia-carbon/60 backdrop-blur-xl border border-white/10 overflow-hidden">
            {/* Decorative Corner Elements */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-white/5" />
            <div className="absolute top-0 right-0 w-20 h-20 border-t border-r border-white/5" />
            <div className="absolute bottom-0 left-0 w-20 h-20 border-b border-l border-white/5" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-white/5" />

            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-[0.02]">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, rgb(255 255 255) 1px, transparent 0)`,
                  backgroundSize: '40px 40px',
                }}
              />
            </div>

            {/* Content Wrapper */}
            <div className="relative p-8 md:p-12">
              {/* Card Header */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px flex-1 bg-linear-to-r from-transparent to-white/20" />
                  <span className="font-sans text-xs uppercase tracking-[0.3em] text-gray-500">
                    Formulário de Contato
                  </span>
                  <div className="h-px flex-1 bg-linear-to-l from-transparent to-white/20" />
                </div>

                {/* Progress Indicator */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-sans text-xs uppercase tracking-[0.3em] text-gray-400">
                      Conclusão
                    </span>
                    <span className="font-mono text-sm text-white font-semibold tabular-nums">
                      {progress}%
                    </span>
                  </div>
                  <div className="relative h-1 bg-white/5 overflow-hidden rounded-full">
                    <div
                      className="absolute inset-y-0 left-0 bg-linear-to-r from-white/40 to-white rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                    <div
                      className="absolute inset-y-0 left-0 bg-white/20 rounded-full blur-sm transition-all duration-700 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Nome Completo *"
                    required
                    error={errors.name}
                    touched={touched.name}
                  />
                  <FormField
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="E-mail *"
                    required
                    error={errors.email}
                    touched={touched.email}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Telefone"
                    error={errors.phone}
                    touched={touched.phone}
                  />
                  <FormField
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Empresa"
                  />
                </div>

                <FormField
                  id="budget"
                  name="budget"
                  type="text"
                  value={formData.budget}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Orçamento Estimado"
                  options={[...BUDGET_OPTIONS]}
                />

                <FormField
                  id="message"
                  name="message"
                  type="text"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Conte-nos sobre seu projeto *"
                  required
                  rows={6}
                  error={errors.message}
                  touched={touched.message}
                />

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting || submitStatus === 'success'}
                    className="group relative w-full flex items-center justify-center gap-3 px-8 py-5 bg-white text-harpia-black font-sans font-semibold tracking-widest uppercase text-sm hover:bg-harpia-accent transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                  >
                    {/* Animated Background Layers */}
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-harpia-accent scale-0 group-hover:scale-100 transition-transform duration-500 origin-center" />

                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin relative z-10" />
                        <span className="relative z-10">Enviando...</span>
                      </>
                    ) : submitStatus === 'success' ? (
                      <>
                        <CheckCircle2 size={18} className="relative z-10 text-green-400" />
                        <span className="relative z-10">Mensagem Enviada!</span>
                      </>
                    ) : (
                      <>
                        <span className="relative z-10">Enviar Mensagem</span>
                        <Send
                          size={18}
                          className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 relative z-10"
                        />
                      </>
                    )}
                  </button>
                </div>

                {/* Success Message */}
                {submitStatus === 'success' && (
                  <div className="mt-6 relative overflow-hidden">
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-green-500/5 blur-xl" />

                    {/* Message Card */}
                    <div className="relative flex items-start gap-4 p-6 bg-linear-to-r from-green-500/10 to-transparent border border-green-500/20 animate-in fade-in slide-in-from-bottom-4 duration-700">
                      <div className="relative">
                        <div className="absolute inset-0 bg-green-400 rounded-full blur-lg opacity-50 animate-pulse" />
                        <CheckCircle2 size={24} className="relative text-green-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-sans text-base text-green-400 font-semibold mb-1">
                          Mensagem enviada com sucesso!
                        </p>
                        <p className="font-sans text-sm text-gray-400 leading-relaxed">
                          Recebemos sua mensagem e entraremos em contato em breve. Fique atento ao
                          seu e-mail.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </form>

              {/* Card Footer */}
              <div className="mt-8 pt-6 border-t border-white/5">
                <p className="text-center text-xs text-gray-500 leading-relaxed">
                  Ao enviar este formulário, você concorda com nossa{' '}
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white underline decoration-dotted underline-offset-2 transition-colors"
                  >
                    Política de Privacidade
                  </a>
                  . Seus dados estão seguros.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
};
