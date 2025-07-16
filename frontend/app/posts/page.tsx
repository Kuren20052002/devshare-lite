"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import PostsSection from "@/components/PostCard/PostsSection";

export default function PostsPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-gray-900">
            Latest Posts
          </h2>
          <p className="mt-2 text-base sm:text-lg leading-7 sm:leading-8 text-gray-600">
            Stay up to date with our newest articles and guides.
          </p>
        </div>

        <PostsSection />
      </div>
    </section>
  );
}
