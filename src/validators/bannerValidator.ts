import { z } from "zod";

export const createBannerValidationSchema = z.object({
    body: z.object({
        name: z.string({error: "Name is required"}).nonempty("Name shouldn't be Empty"),
        image: z.string({error: "Image is required"}).nonempty("Image shouldn't be Empty"),
    }),
});