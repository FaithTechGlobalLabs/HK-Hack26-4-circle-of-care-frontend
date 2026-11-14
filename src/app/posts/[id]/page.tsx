import type { Metadata } from "next";
import { Suspense } from "react";
import PostDetail, { PostLoading } from "@/components/PostDetail";

export const metadata: Metadata = {
  title: "Board post",
};

// The id is runtime data (no generateStaticParams), so it is read inside a Suspense boundary.
export default function PostPage({ params }: PageProps<"/posts/[id]">) {
  return (
    <Suspense fallback={<PostLoading />}>
      {params.then(({ id }) => (
        <PostDetail id={id} />
      ))}
    </Suspense>
  );
}
