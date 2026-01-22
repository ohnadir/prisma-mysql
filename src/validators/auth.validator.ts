import { z } from "zod";

export const authZodValidationSchema = z.object({
    body: z.object({
        email: z.string({error: "Email is required"}).email({error: "Invalid email address"}),
        password: z.string().nonempty("Password is required").min(6, "Password must be at least 6 characters"),
        fcmToken: z.string().optional(),
    }),
});