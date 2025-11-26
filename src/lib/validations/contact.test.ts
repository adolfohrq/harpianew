import { describe, it, expect } from 'vitest';
import {
  contactFormSchema,
  validateField,
  validateForm,
  BUDGET_OPTIONS,
  INITIAL_FORM_STATE,
  type ContactFormData,
} from './contact';

describe('contactFormSchema', () => {
  describe('name validation', () => {
    it('should require name', () => {
      const result = contactFormSchema.safeParse({
        ...INITIAL_FORM_STATE,
        email: 'test@test.com',
        message: 'Test message here',
      });

      expect(result.success).toBe(false);
      if (!result.success && result.error) {
        expect(result.error.issues.some((e) => e.path[0] === 'name')).toBe(true);
      }
    });

    it('should reject short names', () => {
      const result = contactFormSchema.safeParse({
        ...INITIAL_FORM_STATE,
        name: 'A',
        email: 'test@test.com',
        message: 'Test message here',
      });

      expect(result.success).toBe(false);
    });

    it('should accept valid names', () => {
      const result = contactFormSchema.safeParse({
        ...INITIAL_FORM_STATE,
        name: 'John Doe',
        email: 'test@test.com',
        message: 'Test message here',
      });

      expect(result.success).toBe(true);
    });
  });

  describe('email validation', () => {
    it('should require email', () => {
      const result = contactFormSchema.safeParse({
        ...INITIAL_FORM_STATE,
        name: 'John Doe',
        message: 'Test message here',
      });

      expect(result.success).toBe(false);
    });

    it('should reject invalid email formats', () => {
      const invalidEmails = ['invalid', 'test@', '@test.com', 'test@test'];

      invalidEmails.forEach((email) => {
        const result = contactFormSchema.safeParse({
          ...INITIAL_FORM_STATE,
          name: 'John Doe',
          email,
          message: 'Test message here',
        });

        expect(result.success).toBe(false);
      });
    });

    it('should accept valid emails', () => {
      const validEmails = ['test@test.com', 'user@domain.org', 'name.surname@company.co.uk'];

      validEmails.forEach((email) => {
        const result = contactFormSchema.safeParse({
          ...INITIAL_FORM_STATE,
          name: 'John Doe',
          email,
          message: 'Test message here',
        });

        expect(result.success).toBe(true);
      });
    });
  });

  describe('phone validation', () => {
    it('should allow empty phone', () => {
      const result = contactFormSchema.safeParse({
        ...INITIAL_FORM_STATE,
        name: 'John Doe',
        email: 'test@test.com',
        phone: '',
        message: 'Test message here',
      });

      expect(result.success).toBe(true);
    });

    it('should accept valid phone formats', () => {
      const validPhones = ['11999999999', '(11) 99999-9999', '+55 11 99999-9999'];

      validPhones.forEach((phone) => {
        const result = contactFormSchema.safeParse({
          ...INITIAL_FORM_STATE,
          name: 'John Doe',
          email: 'test@test.com',
          phone,
          message: 'Test message here',
        });

        expect(result.success).toBe(true);
      });
    });

    it('should reject invalid phone formats', () => {
      const result = contactFormSchema.safeParse({
        ...INITIAL_FORM_STATE,
        name: 'John Doe',
        email: 'test@test.com',
        phone: 'abc123',
        message: 'Test message here',
      });

      expect(result.success).toBe(false);
    });
  });

  describe('message validation', () => {
    it('should require message', () => {
      const result = contactFormSchema.safeParse({
        ...INITIAL_FORM_STATE,
        name: 'John Doe',
        email: 'test@test.com',
      });

      expect(result.success).toBe(false);
    });

    it('should reject short messages', () => {
      const result = contactFormSchema.safeParse({
        ...INITIAL_FORM_STATE,
        name: 'John Doe',
        email: 'test@test.com',
        message: 'Short',
      });

      expect(result.success).toBe(false);
    });

    it('should accept messages with 10+ characters', () => {
      const result = contactFormSchema.safeParse({
        ...INITIAL_FORM_STATE,
        name: 'John Doe',
        email: 'test@test.com',
        message: 'This is a valid message',
      });

      expect(result.success).toBe(true);
    });
  });
});

describe('validateField', () => {
  it('should return undefined for valid field', () => {
    expect(validateField('name', 'John Doe')).toBeUndefined();
    expect(validateField('email', 'test@test.com')).toBeUndefined();
    expect(validateField('message', 'Valid message here')).toBeUndefined();
  });

  it('should return error message for invalid field', () => {
    expect(validateField('name', '')).toBe('Nome é obrigatório');
    expect(validateField('email', 'invalid')).toBe('Email inválido');
    expect(validateField('message', 'short')).toBe('Mensagem muito curta (mínimo 10 caracteres)');
  });
});

describe('validateForm', () => {
  it('should return success for valid form', () => {
    const validData: ContactFormData = {
      name: 'John Doe',
      email: 'test@test.com',
      phone: '',
      company: '',
      budget: '',
      message: 'This is a valid message for the form',
    };

    const result = validateForm(validData);

    expect(result.success).toBe(true);
    expect(result.errors).toEqual({});
  });

  it('should return errors for invalid form', () => {
    const invalidData: ContactFormData = {
      name: '',
      email: 'invalid',
      phone: '',
      company: '',
      budget: '',
      message: 'short',
    };

    const result = validateForm(invalidData);

    expect(result.success).toBe(false);
    // At least one error should be present
    expect(Object.keys(result.errors).length).toBeGreaterThan(0);
  });
});

describe('BUDGET_OPTIONS', () => {
  it('should have 5 options', () => {
    expect(BUDGET_OPTIONS).toHaveLength(5);
  });

  it('should include expected ranges', () => {
    expect(BUDGET_OPTIONS).toContain('Até R$ 5.000');
    expect(BUDGET_OPTIONS).toContain('Acima de R$ 50.000');
  });
});

describe('INITIAL_FORM_STATE', () => {
  it('should have all fields empty', () => {
    expect(INITIAL_FORM_STATE.name).toBe('');
    expect(INITIAL_FORM_STATE.email).toBe('');
    expect(INITIAL_FORM_STATE.phone).toBe('');
    expect(INITIAL_FORM_STATE.company).toBe('');
    expect(INITIAL_FORM_STATE.budget).toBe('');
    expect(INITIAL_FORM_STATE.message).toBe('');
  });
});
