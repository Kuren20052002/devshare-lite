"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function PostsPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-[90vw] w-[400px] text-center">
          <h2 className="mb-4 text-2xl font-semibold">Login Required</h2>
          <p className="mb-6 text-gray-600">
            Please log in to continue browsing posts.
          </p>
          <button
            className="py-3 px-6 rounded-md bg-blue-600 text-white font-bold text-base w-full hover:bg-blue-700 transition"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Posts</h1>
    </div>
  );
}
