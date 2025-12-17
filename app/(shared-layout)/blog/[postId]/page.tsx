import CommentsSection from "@/components/web/CommentsSection";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";
import Image from "next/image";

import { Metadata } from "next";
import PostPresence from "@/components/web/PostPresence";
import { getToken } from "@/lib/auth-server";
import { Separator } from "@/components/ui/separator";

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
    <article className="w-full mx-auto py-12 px-4 md:px-6 space-y-10 flex flex-col">
      {/* Header Section */}
      <div className="space-y-6 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-4 text-muted-foreground text-sm font-medium">
          <time dateTime={new Date(post._creationTime).toISOString()}>
            {new Date(post._creationTime).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          {userId && (
            <>
              <span className="hidden sm:inline">•</span>
              <PostPresence roomId={postId} userId={userId} />
            </>
          )}
        </div>
      </div>

      {/* Hero Image Section - Smart Background for No Crop */}
      <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden rounded-2xl bg-muted/20 shadow-xl border">
        {/* Background Layer: Blurred & zoomed to fill space with color */}
        <Image
          src={
            post.imgUrl ||
            "https://images.unsplash.com/vector-1750957143816-5405b0bda33c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGFydHxlbnwwfHwwfHx8Mg%3D%3D"
          }
          alt="Background"
          fill
          className="object-cover opacity-50 blur-3xl scale-110"
          priority
        />

        {/* Foreground Layer: Full image, contained, perfectly centered */}
        <Image
          src={
            post.imgUrl ||
            "https://images.unsplash.com/vector-1750957143816-5405b0bda33c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGFydHxlbnwwfHwwfHx8Mg%3D%3D"
          }
          alt={post.title}
          fill
          className="object-contain relative z-10 transition-transform duration-700 hover:scale-[1.01]"
          priority
        />
      </div>

      {/* Content Section */}
      <div className="prose prose-lg dark:prose-invert w-full mx-auto">
        <div className="text-xl md:text-2xl leading-relaxed text-foreground/90 font-serif md:font-sans whitespace-pre-wrap">
          {post.content}
        </div>
      </div>

      <div className="w-full mx-auto">
        <Separator className="my-10" />

        {/* Comments Section */}
        <section className="bg-muted/30 p-8 rounded-2xl border backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-8">
            <h3 className="text-2xl font-bold tracking-tight">Discussion</h3>
            <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
              Live
            </span>
          </div>
          <CommentsSection />
        </section>
      </div>
    </article>
  );
};
export default BlogPage;
