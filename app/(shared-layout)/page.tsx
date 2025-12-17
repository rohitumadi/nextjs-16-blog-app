import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to our modern blog platform.",
};

import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, PenTool } from "lucide-react";
import Link from "next/link";
import * as motion from "motion/react-client";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] py-12 lg:py-24">
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center space-y-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              ✨ Welcome to the future of blogging
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-linear-to-r from-primary to-primary/60">
              Share Your Story <br /> With The World
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Discover stories, thinking, and expertise from writers on any
              topic. Join our community and start your journey today.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Button asChild size="lg" className="h-12 px-8 text-base">
              <Link href="/blog">
                <BookOpen className="mr-2 size-5" />
                Start Reading
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 px-8 text-base"
            >
              <Link href="/create">
                <PenTool className="mr-2 size-5" />
                Start Writing
                <ArrowRight className="ml-2 size-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
