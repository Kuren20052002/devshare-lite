"use client";

import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { AuthorProps } from "./AuthorSection";

type Tag = {
  id: number;
  name: string;
};

type Post = {
  id: number;
  title: string;
  created_at: string;
  user: AuthorProps;
  tags: Tag[];
};

export default function PostsSection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // ✅ Add loading state

  useEffect(() => {
    fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load posts");
        return res.json();
      })
      .then((data) => setPosts(data))
      .catch(() => setError("Failed to fetch posts"))
      .finally(() => setLoading(false)); // ✅ Done loading
  }, []);

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Latest Posts
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Stay up to date with our newest articles and guides.
          </p>
        </div>

        {error ? (
          <p className="mt-10 text-red-600">{error}</p>
        ) : (
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:mt-20 lg:max-w-none lg:grid-cols-3">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <PostCardSkeleton key={i} />
                ))
              : posts.map((post) => (
                  <PostCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    date={new Date(post.created_at).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                    author={post.user}
                    tags={post.tags}
                  />
                ))}
          </div>
        )}
      </div>
    </section>
  );
}

function PostCardSkeleton() {
  return (
    <div className="animate-pulse p-4 border rounded-lg shadow-sm space-y-4">
      <div className="h-4 w-1/3 bg-gray-300 rounded" />
      <div className="h-6 w-3/4 bg-gray-300 rounded" />
      <div className="h-4 w-full bg-gray-200 rounded" />
      <div className="flex items-center gap-3 mt-4">
        <div className="h-10 w-10 rounded-full bg-gray-300" />
        <div className="h-4 w-24 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
