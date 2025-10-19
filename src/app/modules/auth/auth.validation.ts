import { z } from 'zod';

const createVerifyEmailZodSchema = z.object({
    body: z.object({
        email: z.string({ error: 'Email is required' }).email({ message: 'Invalid email format' }),
        oneTimeCode: z.number({ error: 'One time code is required' })
    })
});

const loginZodSchema = z.object({
    body: z.object({
        email: z.string({ error: 'Email is required' }).email({ error: 'Invalid email format' }),
        password: z.string({ error: 'Password is required' })
    })
});
  
const createForgetPasswordZodSchema = z.object({
    body: z.object({
        email: z.string({ error: 'Email is required', }).email({ message: 'Invalid email format' }),
    })
});
  
const createResetPasswordZodSchema = z.object({
    body: z.object({
        newPassword: z.string({ error: 'Password is required' }),
        confirmPassword: z.string({
            error: 'Confirm Password is required',
        })
    })
});
  
const createChangePasswordZodSchema = z.object({
    body: z.object({
        currentPassword: z.string({
            error: 'Current Password is required',
        }),
        newPassword: z.string({ error: 'New Password is required' }),
        confirmPassword: z.string({
            error: 'Confirm Password is required',
        })
    })
});

export const AuthValidation = {
    createVerifyEmailZodSchema,
    createForgetPasswordZodSchema,
    loginZodSchema,
    createResetPasswordZodSchema,
    createChangePasswordZodSchema,
};