"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export function useRequireOwner(postId: string) {
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    async function checkOwner() {
      const res = await fetch(`http://localhost:3001/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const post = await res.json();

      if (post.user_id !== currentUser?.id) {
        router.push("/unauthorized");
      } else {
        setLoading(false);
      }
    }

    if (currentUser) checkOwner();
  }, [postId, currentUser]);

  return { loading };
}
