import * as z from 'zod';
import {ValidationMessages} from "@/core/constants/validation.tsx";

export const loginFormSchema = z.object({
  email: z
    .string()
    .trim()
    .email({
      message: ValidationMessages.EMAIL_INVALID,
    })
    .min(1, {
      message: ValidationMessages.EMAIL_REQUIRED,
    })
    .refine((value: string): boolean => value.includes('@'), {
      message: ValidationMessages.EMAIL_NO_AT_SYMBOL,
    })
    .refine(
      (value: string): boolean | '' => {
        const domain: string = value.split('@')[1];
        return domain && domain.includes('.');
      },
      {
        message: ValidationMessages.EMAIL_NO_DOMAIN,
      },
    )
    .refine((value: string): boolean => !/^\s|\s$/.test(value), {
      message: ValidationMessages.EMAIL_WHITESPACE,
    }),
  password: z
    .string()
    .min(1, {
      message: ValidationMessages.PASSWORD_REQUIRED,
    })
    .min(8, {
      message: ValidationMessages.PASSWORD_TOO_SHORT,
    })
    .refine((value: string): boolean => /\d/.test(value), {
      message: ValidationMessages.PASSWORD_MISSING_DIGIT,
    })
    .refine((value: string): boolean => /[A-Z]/.test(value), {
      message: ValidationMessages.PASSWORD_MISSING_UPPERCASE,
    })
    .refine((value: string): boolean => /[a-z]/.test(value), {
      message: ValidationMessages.PASSWORD_MISSING_LOWERCASE,
    })
    .refine((value: string): boolean => !/^\s|\s$/.test(value), {
      message: ValidationMessages.PASSWORD_WHITESPACE,
    }),
});
