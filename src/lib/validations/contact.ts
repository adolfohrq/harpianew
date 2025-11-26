import { z } from 'zod';

/**
 * Schema de validação para o formulário de contato
 * Usando Zod para validação type-safe
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Nome é obrigatório')
    .min(2, 'Nome muito curto')
    .max(100, 'Nome muito longo'),

  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email inválido')
    .max(255, 'Email muito longo'),

  phone: z
    .string()
    .regex(/^[\d\s()+-]*$/, 'Telefone inválido')
    .max(20, 'Telefone muito longo')
    .optional()
    .or(z.literal('')),

  company: z.string().max(100, 'Nome da empresa muito longo').optional().or(z.literal('')),

  budget: z.string().optional().or(z.literal('')),

  message: z
    .string()
    .min(1, 'Mensagem é obrigatória')
    .min(10, 'Mensagem muito curta (mínimo 10 caracteres)')
    .max(5000, 'Mensagem muito longa'),
});

/**
 * Tipo inferido do schema para uso em componentes
 */
export type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * Tipo para erros de validação por campo
 */
export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

/**
 * Valida um campo específico do formulário
 */
export const validateField = (name: keyof ContactFormData, value: string): string | undefined => {
  try {
    // Cria um schema parcial apenas para o campo específico
    const fieldSchema = contactFormSchema.shape[name];
    fieldSchema.parse(value);
    return undefined;
  } catch (error) {
    if (error instanceof z.ZodError && error.issues.length > 0) {
      return error.issues[0].message;
    }
    return 'Erro de validação';
  }
};

/**
 * Valida todos os campos do formulário
 */
export const validateForm = (
  data: ContactFormData
): { success: boolean; errors: ContactFormErrors } => {
  const result = contactFormSchema.safeParse(data);

  if (result.success) {
    return { success: true, errors: {} };
  }

  const errors: ContactFormErrors = {};
  const zodIssues = result.error?.issues ?? [];

  zodIssues.forEach((issue) => {
    const field = issue.path[0] as keyof ContactFormData;
    if (field && !errors[field]) {
      errors[field] = issue.message;
    }
  });

  return { success: false, errors };
};

/**
 * Opções de orçamento pré-definidas
 */
export const BUDGET_OPTIONS = [
  'Até R$ 5.000',
  'R$ 5.000 - R$ 15.000',
  'R$ 15.000 - R$ 30.000',
  'R$ 30.000 - R$ 50.000',
  'Acima de R$ 50.000',
] as const;

/**
 * Estado inicial do formulário
 */
export const INITIAL_FORM_STATE: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  budget: '',
  message: '',
};
