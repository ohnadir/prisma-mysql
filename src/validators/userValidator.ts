import { z } from "zod";
import { ROLES } from "../enum/user";

export const createUserSchema = z.object({
    body: z.object({
        name: z.string({error: "Name is required"}).nonempty("Name is required"),
        role: z.enum(ROLES, {error: "Invalid Option: expected one of ADMIN | SUPER_ADMIN | USER"}),
        email: z.string({error: "Email is required"}).email({error: "Invalid email address"}),
        password: z.string().nonempty("Password is required").min(6, "Password must be at least 6 characters"),
    }),
});