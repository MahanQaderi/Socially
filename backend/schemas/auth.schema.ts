import { z } from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must be at most 50 characters long"),
  email: z.email(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(16, "Password must be at most 16 characters long"),
});

export const signInSchema = signUpSchema.omit({ name: true });
