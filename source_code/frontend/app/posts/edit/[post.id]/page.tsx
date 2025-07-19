"use client";

import { useParams } from "next/navigation";
import EditPostForm from "@/components/EditPostForm";

export default function EditPage() {
  const params = useParams();
  const post_id = params["post.id"] as string;

  return <EditPostForm id={post_id} />;
}
