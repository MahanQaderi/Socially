import { z } from "zod";

export const editProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must be at most 50 characters long"),
  bio: z
    .string()
    .trim()
    .max(50, "Bio must be at most 50 characters long")
    .optional(),
  location: z
    .string()
    .trim()
    .max(20, "Location must be at most 20 characters long")
    .optional(),
  website: z
    .string()
    .trim()
    .max(50, "Website must be at most 50 characters long")
    .optional(),
  image: z.string().optional(),
});
