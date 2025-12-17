import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { authComponent } from "./auth";

export const createComment = mutation({
  args: {
    postId: v.id("posts"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const { postId, content } = args;

    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new Error("User not Authenticated");
    }
    const newCommentId = await ctx.db.insert("comments", {
      postId,
      content,
      authorId: user._id,
      authorName: user.name,
    });
    return newCommentId;
  },
});

export const getCommentsByPostId = query({
  args: {
    postId: v.id("posts"),
  },
  handler: async (ctx, args) => {
    const { postId } = args;
    return await ctx.db
      .query("comments")
      .order("desc")
      .filter((comment) => comment.eq(comment.field("postId"), postId))
      .collect();
  },
});
