"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function PostsPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  return (
    <div>
      <h1 className="mt-32">Posts</h1>
    </div>
  );
}
