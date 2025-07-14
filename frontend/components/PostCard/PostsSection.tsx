"use client";

import { useEffect, useState } from "react";
import { AuthorProps } from "./AuthorSection";
import { useSearch } from "@/app/context/SearchContext";
import { Skeleton } from "@/components/ui/skeleton";
import PostCard from "./PostCard";
import PageNumbers from "@/components/PageNumbers";

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
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { searchQuery, setSearchQuery } = useSearch();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/posts/?page=${page}&query=${encodeURIComponent(
            searchQuery
          )}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              Accept: "application/json",
            },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setPosts(data.posts || []);
        setTotalPages(data.meta?.total_pages || 1);
      } catch (err) {
        console.error("Failed to fetch posts", err);
        setError("Could not load posts. Please try again.");
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [page, searchQuery]);

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

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
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:mt-8 lg:max-w-none lg:grid-cols-3">
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
      {totalPages > 1 && (
        <PageNumbers page={page} totalPages={totalPages} setPage={setPage} />
      )}
    </section>
  );
}

function PostCardSkeleton() {
  return (
    <div className="p-4 border rounded-lg shadow-sm space-y-4">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <div className="flex items-center gap-3 mt-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}
