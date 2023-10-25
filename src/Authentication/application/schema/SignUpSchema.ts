import { z } from 'zod';

const SignUpSchema = z
  .object({
    name: z.string().min(2, { message: 'nameMustBeAtleast3' }),
    email: z.string().email('emailInvalid'),
    password: z.string().min(6, { message: 'passwordMustBeAtleast6' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'passwordDontMatch',
  });

export default SignUpSchema;
