"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import PostsSection from "@/components/PostCard/PostsSection";

export default function PostsPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  return <PostsSection />;
}
