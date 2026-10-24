import { z } from 'zod';


export const registerDTO = z.object({
    email: z.email().lowercase().trim(),
    namme: z.string().min(2).max(20).trim(),
    password: z.string().min(8).max(16).trim(),
    provider: z.enum(['local', 'google', 'facebook']).default('local'),
    dob: z.date().optional(),
    gender: z.enum(['male', 'female']).optional(),
})


export const loginDTO = z.object({

    email: z.email().lowercase().trim(),
    password: z.string().min(8).max(16).trim(),
})


export const verifyAccountDTO = z.object({
    email: z.email().lowercase().trim(),
    code: z.string().length(6).trim()

})


export const sendOtpDTO = z.object({

    email: z.email().lowercase().trim(),
})


export const resetPasswordDTO = z.object({
    email: z.email().lowercase().trim(),
    code: z.string().length(8).trim(),

})