// app/posts/layout.tsx
"use client";

import { ReactNode } from "react";
import { useRequireAuth } from "@/lib/hooks/useRequiredAuth";
import { useRouter } from "next/navigation";

export default function PostsLayout({ children }: { children: ReactNode }) {
  const isLoggedIn = useRequireAuth();
  const router = useRouter();
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-[90vw] w-[400px] text-center">
          <h2 className="mb-4 text-2xl font-semibold">Login Required</h2>
          <p className="mb-6 text-gray-600">Please log in to continue.</p>
          <button
            className="py-3 px-6 rounded-md bg-blue-600 text-white font-bold text-base w-full hover:bg-blue-700 transition"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
        </div>
      </div>
    );
  } // Wait for redirect

  return <>{children}</>;
}
