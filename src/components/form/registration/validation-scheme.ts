import { ValidationMessages } from '@/constants/validation';
import { z } from 'zod';

export type TFormFields = z.infer<typeof userFormSchema>;

const minimumAge = 18;
const todayDate = new Date();
const validDate = new Date(todayDate.getFullYear() - minimumAge, todayDate.getMonth(), todayDate.getDate());

const birthDateSchema = z.coerce
  .date()
  .refine((date) => date <= todayDate, {
    message: ValidationMessages.DATE_FUTURE,
  })
  .refine((date) => date <= validDate, {
    message: ValidationMessages.DATE_AGE,
  });

export const userFormSchema = z.object({
  firstName: z
    .string()
    .min(1, {
      message: ValidationMessages.REQUIRED,
    })
    .regex(/^\S*$/, {
      message: ValidationMessages.WHITESPACE,
    })
    .regex(/^[A-Za-z]+$/, {
      message: ValidationMessages.SPECIAL_CHAR,
    }),
  lastName: z
    .string()
    .min(1, {
      message: ValidationMessages.REQUIRED,
    })
    .regex(/^\S*$/, {
      message: ValidationMessages.WHITESPACE,
    })
    .regex(/^[A-Za-z]+$/, {
      message: ValidationMessages.SPECIAL_CHAR,
    }),
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
    })
    .regex(/^\S*$/, {
      message: ValidationMessages.WHITESPACE,
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
    }),
  dateOfBirth: birthDateSchema,

  address: z.object({
    street: z.string().min(1, {
      message: ValidationMessages.REQUIRED,
    }),
    city: z
      .string()
      .min(1, {
        message: ValidationMessages.REQUIRED,
      })
      .regex(/^[A-Za-z]+$/, {
        message: ValidationMessages.SPECIAL_CHAR,
      }),
    zip: z.string().regex(/^\d{5}$/, {
      message: ValidationMessages.ZIP_INVALID,
    }),
    country: z.string(),
  }),

  billing: z.object({
    street: z.string().min(1, {
      message: ValidationMessages.REQUIRED,
    }),
    city: z
      .string()
      .min(1, {
        message: ValidationMessages.REQUIRED,
      })
      .regex(/^[A-Za-z]+$/, {
        message: ValidationMessages.SPECIAL_CHAR,
      }),
    zip: z.string().regex(/^\d{5}$/, {
      message: ValidationMessages.ZIP_INVALID,
    }),
    country: z.string(),
  }),
});
