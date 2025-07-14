"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AuthorProps } from "./PostCard/AuthorSection";
import { METHODS } from "http";
import PostsLayout from "@/app/posts/layout";
import { AuthorInfo } from "@/components/PostCard/AuthorSection";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { Button } from "@/components/ui/button";

type Props = {
  id: string;
};

type Post = {
  title: string;
  content_html: string;
  created_at: string;
  user: AuthorProps;
};

export default function PostDetail({ id }: Props) {
  const [post, setPost] = useState<Post | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user, isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:3001/posts/${id}`, {
          method: "GET",
          headers: { Accept: "application/json" },
        });
        const data = await res.json();
        setPost(data);
      } catch (error) {
        console.error("Failed to load post", error);
      } finally {
        console.log(post);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <p className="text-center py-8">Loading...</p>;
  if (!post)
    return <p className="text-center py-8 text-red-500">Post not found.</p>;

  console.log("Current User id", user?.id);
  console.log("Post's User id", post.user.id);
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-24">
      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-8 w-2/3" /> {/* Title */}
          <Skeleton className="h-4 w-1/3" /> {/* Date */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
            <Skeleton className="h-4 w-3/6" />
          </div>
        </div>
      ) : post ? (
        <>
          {user?.id === post.user.id && (
            <div className="flex flex-nowrap gap-3 mb-8 h-8 w-full max-[300px]:flex-wrap">
              <Button
                onClick={() => router.push(`/posts/edit/${id}`)}
                className="w-1/2 max-[300px]:w-full"
              >
                Edit Post
              </Button>
              <Button className="w-1/2 max-[300px]:w-full">Delete Post</Button>
            </div>
          )}
          <h1 className="text-3xl font-bold">{post.title}</h1>
          <p className="text-gray-500 text-sm">
            Published on{" "}
            {new Date(post.created_at).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <AuthorInfo author={post.user} />
          <div
            className="prose max-w-none mt-4"
            dangerouslySetInnerHTML={{ __html: post.content_html }}
          />
        </>
      ) : (
        <p className="text-gray-500">Post not found.</p>
      )}
    </div>
  );
}
