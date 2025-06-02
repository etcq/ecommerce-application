import { ValidationMessages } from '@/constants/validation';
import { z } from 'zod';

export type TPasswordFormFields = z.infer<typeof passwordFormSchema>;

const passwordSchema = z
  .string()
  .min(1, {
    message: ValidationMessages.REQUIRED,
  })
  .regex(/^\S*$/, {
    message: ValidationMessages.WHITESPACE,
  })
  .min(8, {
    message: ValidationMessages.PASSWORD_TOO_SHORT,
  })
  .regex(/[a-z]/, {
    message: ValidationMessages.PASSWORD_MISSING_LOWERCASE,
  })
  .regex(/[A-Z]/, {
    message: ValidationMessages.PASSWORD_MISSING_UPPERCASE,
  })
  .regex(/\d/, {
    message: ValidationMessages.PASSWORD_MISSING_DIGIT,
  });

export const passwordFormSchema = z
  .object({
    currentPassword: passwordSchema,
    newPassword: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: ValidationMessages.PASSWORDS_DO_NOT_MATCH,
  });
