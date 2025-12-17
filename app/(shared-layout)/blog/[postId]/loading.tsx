import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <article className="w-full mx-auto py-12 px-4 md:px-6 space-y-10 flex flex-col">
      {/* Header Skeleton */}
      <div className="space-y-6 text-center max-w-2xl mx-auto w-full">
        <Skeleton className="h-12 w-3/4 mx-auto" />
        <div className="flex justify-center gap-4">
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      {/* Hero Image Skeleton */}
      <Skeleton className="w-full h-[300px] md:h-[500px] rounded-2xl" />

      {/* Content Skeleton */}
      <div className="w-full mx-auto space-y-4">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-5/6" />
        <Skeleton className="h-6 w-4/6" />
      </div>

      <div className="w-full mx-auto">
        <Skeleton className="h-px w-full my-10" />
        {/* Comments Skeleton */}
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    </article>
  );
}
