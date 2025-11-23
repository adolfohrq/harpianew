import React, { useState } from 'react';
import { Reveal } from '../Reveal';
import { Send, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  budget: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

interface FormFieldProps {
  id: string;
  name: keyof FormData;
  type: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  label: string;
  required?: boolean;
  rows?: number;
  error?: string;
  touched: boolean;
  options?: string[];
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  name,
  type,
  value,
  onChange,
  label,
  required = false,
  rows,
  error,
  touched,
  options,
}) => {
  const hasError = error && touched;
  const isValid = !error && touched && value;

  if (options) {
    return (
      <div className="relative group">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`peer w-full bg-transparent border-b py-4 pr-10 text-white focus:outline-none transition-all duration-300 appearance-none ${
            hasError
              ? 'border-red-500'
              : isValid
                ? 'border-green-500'
                : 'border-white/20 hover:border-white/40 focus:border-white'
          }`}
        >
          <option value="" disabled className="bg-harpia-carbon text-gray-400">
            Selecione...
          </option>
          {options.map((option) => (
            <option key={option} value={option} className="bg-harpia-carbon text-white">
              {option}
            </option>
          ))}
        </select>
        <label
          htmlFor={id}
          className={`absolute left-0 -top-3.5 text-[10px] uppercase tracking-[0.3em] transition-colors ${
            hasError ? 'text-red-400' : isValid ? 'text-green-400' : 'text-gray-400'
          }`}
        >
          {label}
        </label>
        {hasError && (
          <p className="absolute -bottom-5 left-0 text-xs text-red-400 flex items-center gap-1">
            <AlertCircle size={12} />
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
    required,
    placeholder: ' ',
    className: `peer w-full bg-transparent border-b py-4 text-white focus:outline-none transition-all duration-300 placeholder-transparent font-light ${
      rows ? 'resize-none' : ''
    } ${
      hasError
        ? 'border-red-500'
        : isValid
          ? 'border-green-500'
          : 'border-white/20 hover:border-white/40 focus:border-white'
    }`,
  };

  return (
    <div className="relative group">
      <Component {...commonProps} {...(rows ? { rows } : { type })} />
      <label
        htmlFor={id}
        className={`absolute left-0 -top-3.5 text-[10px] uppercase tracking-[0.3em] transition-all duration-300
          peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-600 peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal
          peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.3em] ${
            hasError
              ? 'text-red-400'
              : isValid
                ? 'text-green-400 peer-focus:text-white'
                : 'text-gray-400 peer-focus:text-white'
          }`}
      >
        {label}
      </label>

      {/* Validation Icons */}
      {touched && (
        <div className="absolute right-0 top-4">
          {isValid && <CheckCircle2 size={18} className="text-green-400" />}
          {hasError && <AlertCircle size={18} className="text-red-400" />}
        </div>
      )}

      {/* Error Message */}
      {hasError && (
        <p className="absolute -bottom-5 left-0 text-xs text-red-400 flex items-center gap-1">
          <AlertCircle size={12} />
          {error}
        </p>
      )}

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-px overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${
            hasError ? 'bg-red-500' : isValid ? 'bg-green-500 w-full' : 'w-0'
          }`}
        />
      </div>
    </div>
  );
};

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    budget: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateField = (name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Nome é obrigatório';
        if (value.trim().length < 3) return 'Nome muito curto';
        break;
      case 'email':
        if (!value.trim()) return 'Email é obrigatório';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Email inválido';
        break;
      case 'phone':
        if (value && !/^[\d\s()+-]+$/.test(value)) return 'Telefone inválido';
        break;
      case 'message':
        if (!value.trim()) return 'Mensagem é obrigatória';
        if (value.trim().length < 10) return 'Mensagem muito curta (mín. 10 caracteres)';
        break;
    }
    return undefined;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate on change
    const error = validateField(name as keyof FormData, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {});
    setTouched(allTouched);

    // Validate all fields
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key as keyof FormData, formData[key as keyof FormData]);
      if (error) newErrors[key as keyof FormErrors] = error;
    });

    setErrors(newErrors);

    // Check if there are errors
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setSubmitStatus('success');

      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          budget: '',
          message: '',
        });
        setTouched({});
        setErrors({});
        setSubmitStatus('idle');
      }, 3000);
    }, 2000);
  };

  const completionPercentage = Math.round(
    (Object.values(formData).filter((v) => v.trim()).length / Object.keys(formData).length) * 100
  );

  return (
    <div className="lg:col-span-7">
      <Reveal delay={300}>
        <div className="relative bg-harpia-carbon/40 border border-white/5 p-8 md:p-12 backdrop-blur-sm overflow-hidden">
          {/* Decorative Corner with Animation */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-white/5 to-transparent pointer-events-none opacity-50" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-linear-to-tr from-white/3 to-transparent pointer-events-none opacity-50" />

          {/* Completion Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-gray-500">
                Progresso do Formulário
              </span>
              <span className="font-mono text-sm text-white font-semibold">
                {completionPercentage}%
              </span>
            </div>
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-white/50 to-white transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                label="Nome Completo *"
                required
                error={errors.name}
                touched={touched.name || false}
              />
              <FormField
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                label="E-mail *"
                required
                error={errors.email}
                touched={touched.email || false}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                label="Telefone"
                error={errors.phone}
                touched={touched.phone || false}
              />
              <FormField
                id="company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleChange}
                label="Empresa (Opcional)"
                error={undefined}
                touched={touched.company || false}
              />
            </div>

            <FormField
              id="budget"
              name="budget"
              type="text"
              value={formData.budget}
              onChange={handleChange}
              label="Orçamento Estimado"
              error={undefined}
              touched={touched.budget || false}
              options={[
                'Até R$ 5.000',
                'R$ 5.000 - R$ 15.000',
                'R$ 15.000 - R$ 30.000',
                'R$ 30.000 - R$ 50.000',
                'Acima de R$ 50.000',
              ]}
            />

            <FormField
              id="message"
              name="message"
              type="text"
              value={formData.message}
              onChange={handleChange}
              label="Conte-nos sobre seu projeto *"
              required
              rows={6}
              error={errors.message}
              touched={touched.message || false}
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || submitStatus === 'success'}
              className="group relative w-full flex items-center justify-center gap-3 px-8 py-6 bg-white text-harpia-black hover:bg-harpia-black hover:text-white border-2 border-white hover:border-white transition-all duration-500 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
              onBlur={handleBlur}
            >
              {/* Background Shine Effect */}
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

              {isSubmitting ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span className="font-sans text-sm uppercase tracking-[0.2em] font-semibold">
                    Enviando...
                  </span>
                </>
              ) : submitStatus === 'success' ? (
                <>
                  <CheckCircle2 size={20} className="text-green-400" />
                  <span className="font-sans text-sm uppercase tracking-[0.2em] font-semibold">
                    Mensagem Enviada!
                  </span>
                </>
              ) : (
                <>
                  <Sparkles
                    size={18}
                    className="group-hover:rotate-12 transition-transform duration-300"
                  />
                  <span className="font-sans text-sm uppercase tracking-[0.2em] font-semibold">
                    Enviar Mensagem
                  </span>
                  <Send
                    size={18}
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                  />
                </>
              )}
            </button>

            {/* Success/Error Messages */}
            {submitStatus === 'success' && (
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-3">
                <CheckCircle2 size={20} className="text-green-400 shrink-0" />
                <p className="text-sm text-green-400">
                  Obrigado! Recebemos sua mensagem e entraremos em contato em breve.
                </p>
              </div>
            )}
          </form>

          {/* Privacy Notice */}
          <p className="mt-6 text-center text-xs text-gray-600 leading-relaxed">
            Ao enviar este formulário, você concorda com nossa{' '}
            <a href="#" className="text-gray-400 hover:text-white underline transition-colors">
              Política de Privacidade
            </a>
            . Seus dados estão seguros conosco.
          </p>
        </div>
      </Reveal>
    </div>
  );
};
