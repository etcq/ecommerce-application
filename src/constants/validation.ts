export enum ValidationMessages {
  EMAIL_INVALID = 'Please enter a valid email address.',
  EMAIL_INVALID_CHARACTERS = 'Email must contain only Latin letters, digits, and valid symbols ("@", ".", "-", "_")',
  EMAIL_REQUIRED = 'Please enter your email address',
  EMAIL_WHITESPACE = 'Email address must not contain leading or trailing whitespace.',
  EMAIL_NO_DOMAIN = 'Email address must contain a domain name (e.g., example.com).',
  EMAIL_NO_AT_SYMBOL = 'Email address must contain an "@" symbol',
  PASSWORD_REQUIRED = 'Please enter your password',
  PASSWORD_TOO_SHORT = 'Password must be at least 8 characters long.',
  PASSWORD_MISSING_DIGIT = 'Password must contain at least one digit.',
  PASSWORD_MISSING_UPPERCASE = 'Password must contain at least one uppercase letter.',
  PASSWORD_MISSING_LOWERCASE = 'Password must contain at least one lowercase letter.',
  PASSWORD_WHITESPACE = 'Password must not contain leading or trailing whitespace.',
}
