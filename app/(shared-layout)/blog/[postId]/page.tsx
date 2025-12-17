import CommentsSection from "@/components/web/CommentsSection";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";
import Image from "next/image";

import { Metadata } from "next";
import PostPresence from "@/components/web/PostPresence";
import { getToken } from "@/lib/auth-server";

interface PostIdRouteProps {
  params: Promise<{ postId: Id<"posts"> }>;
}

export async function generateMetadata({
  params,
}: PostIdRouteProps): Promise<Metadata> {
  const { postId } = await params;
  const post = await fetchQuery(api.posts.getPostById, { id: postId });
  if (!post) {
    return {
      title: "Post Not Found",
      description: "The post you are looking for does not exist.",
    };
  }
  return {
    title: post.title,
    description: post.content.slice(0, 100),
  };
}

const BlogPage = async ({ params }: PostIdRouteProps) => {
  const { postId } = await params;
  const token = await getToken();
  const [post, userId] = await Promise.all([
    fetchQuery(api.posts.getPostById, { id: postId }),
    fetchQuery(api.presence.getUserId, {}, { token }),
  ]);

  return (
    <div className="m-12 flex flex-col gap-4">
      <h1 className="text-3xl text-primary font-bold text-center">
        {post.title}
      </h1>
      <div className="relative h-100 w-full overflow-hidden rounded-lg ">
        <Image
          src={
            post.imgUrl ||
            "https://images.unsplash.com/vector-1750957143816-5405b0bda33c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGFydHxlbnwwfHwwfHx8Mg%3D%3D"
          }
          alt="Blog Image"
          className="object-cover hover:scale-105 transition-all duration-300"
          fill
        />
      </div>
      <p className="text-sm text-muted-foreground">
        Posted on {new Date(post._creationTime).toLocaleDateString()}
      </p>
      {userId && <PostPresence roomId={postId} userId={userId} />}
      <p className="text-lg">{post.content}</p>
      <CommentsSection />
    </div>
  );
};
export default BlogPage;
