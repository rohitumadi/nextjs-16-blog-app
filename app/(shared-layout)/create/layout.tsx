import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Post",
  description: "Share your thoughts and ideas with the world.",
};

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
