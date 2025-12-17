import { Id } from "@/convex/_generated/dataModel";
import { z } from "zod";

export const commentSchema = z.object({
  content: z
    .string()
    .min(1, "Comment cannot be empty")
    .max(1000, "Comment cannot be more than 1000 characters"),
  postId: z.custom<Id<"posts">>(),
});
