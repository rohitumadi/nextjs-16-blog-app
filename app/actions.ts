"use server";

import z from "zod";
import { postSchema } from "./schemas/post";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { getToken } from "@/lib/auth-server";
import { redirect } from "next/navigation";

/*
with the current implementation where the file is sent through a Server Action, the limit is strictly what we validly configure in 
next.config.ts
.

However, sending large files through a Server Action is not recommended because:

Double Bandwidth: The file goes Client -> Next.js Server -> Convex (twice the work).
Platform Limits: Hosting providers (like Vercel) often have a hard cap on
 Serverless Function payloads (usually around 4.5 MB), regardless of what you set in 
next.config.ts
To allow larger uploads (e.g., 10MB, 50MB+) and make it faster,
 we should upload the file directly from the browser to Convex, bypassing the Next.js server.
*/
export const createPostAction = async (data: z.infer<typeof postSchema>) => {
  const parsedData = postSchema.safeParse(data);

  if (!parsedData.success) {
    throw new Error(parsedData.error.message);
  }
  const token = await getToken();
  const imageUrl = await fetchMutation(
    api.posts.generatePresignedUrl,
    {},
    { token }
  );

  const uploadResult = await fetch(imageUrl, {
    method: "POST",
    headers: {
      "Content-Type": parsedData.data.image.type,
    },
    body: parsedData.data.image,
  });

  if (!uploadResult.ok) {
    throw new Error(uploadResult.statusText);
  }

  const { storageId } = await uploadResult.json();
  const postId = await fetchMutation(
    api.posts.createPost,
    {
      content: parsedData.data.content,
      title: parsedData.data.title,
      imageStorageId: storageId,
    },
    { token }
  );

  return redirect(`/blogs/${postId}`);
};
