import { z } from "zod";

export const createPostSchema = z.object({
  content: z
    .string({ error: "Content is required" })
    .trim()
    .min(5, { message: "Content is too short, minimum 5 characters" })
    .max(300, { message: "Content is too long, maximum 300 characters" }),
  image: z.string().optional(),
});

export const updatePostSchema = z
  .object({
    content: z
      .string()
      .trim()
      .min(5, { message: "Content is too short, minimum 5 characters" })
      .max(300, { message: "Content is too long, maximum 300 characters" })
      .optional(),
    image: z.string().optional(),
  })
  .refine((data) => data.image || data.content, {
    path: ["content"],
    error: "One of content or image is required",
  });

export const createCommentSchema = z.object({
  content: z
    .string({ error: "Content is required" })
    .trim()
    .min(5, { message: "Content is too short, minimum 5 characters" })
    .max(200, { message: "Content is too long, maximum 200 characters" }),
});
