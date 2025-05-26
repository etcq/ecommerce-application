import { ValidationMessages } from '@/constants/validation';
import { z } from 'zod';

export type TUserFormFields = z.infer<typeof userFormSchema>;

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

const addressSchema = z.object({
  streetName: z.string().min(1, {
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
  postalCode: z.string().regex(/^\d{5}$/, {
    message: ValidationMessages.ZIP_INVALID,
  }),
  country: z.string({
    message: ValidationMessages.REQUIRED,
  }),
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
    .optional(),
  dateOfBirth: birthDateSchema,
  address: addressSchema.optional(),
  addresses: z.array(addressSchema),
  billing: addressSchema.optional(),
});
