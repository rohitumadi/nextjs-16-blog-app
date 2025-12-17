import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { authComponent } from "./auth";

// Create a new post with the given text
export const createPost = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    imageStorageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new Error("User not Authenticated");
    }

    const newPostId = await ctx.db.insert("posts", {
      title: args.title,
      content: args.content,
      authorId: user._id,
      imageStorageId: args.imageStorageId,
    });
    return newPostId;
  },
});

//Get all posts
export const getAllPosts = query({
  handler: async (ctx) => {
    const posts = await ctx.db.query("posts").order("desc").collect();
    return await Promise.all(
      posts.map(async (post) => {
        const imgUrl = post.imageStorageId
          ? await ctx.storage.getUrl(post.imageStorageId)
          : null;
        return {
          ...post,
          imgUrl,
        };
      })
    );
  },
});

//get post by id
export const getPostById = query({
  args: {
    id: v.id("posts"),
  },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.id);
    if (!post) {
      throw new Error("Post not found");
    }
    const imgUrl = post.imageStorageId
      ? await ctx.storage.getUrl(post.imageStorageId)
      : null;
    return {
      ...post,
      imgUrl,
    };
  },
});

//generate presigned url for image
export const generatePresignedUrl = mutation({
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new Error("User not Authenticated");
    }
    const presignedUrl = await ctx.storage.generateUploadUrl();
    return presignedUrl;
  },
});
