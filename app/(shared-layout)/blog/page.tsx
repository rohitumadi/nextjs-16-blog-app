import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Blogs",
  description: "Read the latest trends and insights from our community.",
};

const BlogPage = async () => {
  return (
    <div className="py-12">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
          Blogs
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Read about the latest trends and insights.
        </p>
      </div>
      <Suspense fallback={<SkeletonLoadingUi />}>
        <LoadBlogList />
      </Suspense>
    </div>
  );
};

export default BlogPage;

async function LoadBlogList() {
  const posts = await fetchQuery(api.posts.getAllPosts);
  return (
    <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts?.map((post) => (
        <Card key={post._id} className="pt-0">
          <div className="relative aspect-video w-full overflow-hidden rounded-t-lg ">
            <Image
              src={
                post.imgUrl ??
                "https://images.unsplash.com/vector-1750957143816-5405b0bda33c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGFydHxlbnwwfHwwfHx8Mg%3D%3D"
              }
              alt={post.title}
              fill
              className=" hover:scale-105 transition-all duration-300"
            />
          </div>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              {post.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {post.content}
            </p>
          </CardContent>
          <CardFooter>
            <Link
              className={buttonVariants({ className: "w-full" })}
              href={`/blog/${post._id}`}
            >
              Read More
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

function SkeletonLoadingUi() {
  return (
    <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <div className="flex flex-col space-y-3" key={i}>
          <Skeleton className="h-48 w-full rounded-xl" />
          <div className="space-y-2 flex flex-col">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/" />
          </div>
        </div>
      ))}
    </div>
  );
}
