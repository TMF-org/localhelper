import { z } from 'zod';

export const defaultErrorMap: z.ZodErrorMap = (error, ctx) => {
  switch (error.code) {
    case z.ZodIssueCode.invalid_string:
      if (error.validation === 'email') {
        return { message: 'Die E-Mail-Adresse ist nicht korrekt' };
      }
    case z.ZodIssueCode.too_small:
      return { message: 'Bitte fülle das Feld aus' };
  }
  return { message: ctx.defaultError };
};
