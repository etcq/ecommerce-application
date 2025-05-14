import * as z from 'zod';
import { ValidationMessages } from '@/constants/validation.ts';

export type TLoginFormValues = z.infer<typeof loginFormSchema>;

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: ValidationMessages.REQUIRED,
    })
    .regex(/^\S*$/, {
      message: ValidationMessages.WHITESPACE,
    })
    .email({
      message: ValidationMessages.EMAIL_INVALID,
    }),
  password: z
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
    })
    .regex(/^\S*$/, {
      message: ValidationMessages.WHITESPACE,
    }),
});
