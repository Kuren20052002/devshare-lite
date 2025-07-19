"use client";

import { useParams } from "next/navigation";
import PostDetail from "@/components/PostDetail";
import CommentsSection from "@/components/Comment/CommentsSection";

export default function PostDetailPage() {
  const params = useParams();
  const postID = params["posts.id"] as string;

  return (
    <>
      <PostDetail id={postID} />
      <CommentsSection postId={postID} />
    </>
  );
}
