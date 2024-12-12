import * as z from "zod";

export const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers and hyphens"),
  categories: z.array(z.string()).optional(),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().optional(),
});
