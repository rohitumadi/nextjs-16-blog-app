import z from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(80, "Title must be at most 80 characters long"),
  content: z
    .string()
    .min(10, "Content must be at least 3 characters long")
    .max(1000, "Content must be at most 1000 characters long"),
  image: z.instanceof(File),
});
