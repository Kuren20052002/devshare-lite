"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AuthorProps } from "./PostCard/AuthorSection";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { Button } from "@/components/ui/button";
import { AuthorInfo } from "@/components/PostCard/AuthorSection";
import DeletePostDialog from "./Dialog/DeletePostDialog";

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
  const { user } = useAuth();

  console.log("Post user id", post?.user.id);
  console.log("current user id", user?.id);

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
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:3001/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.ok) {
        router.push("/posts");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  if (loading) return <PostDetailSkeleton />;
  if (!post)
    return <p className="text-center py-8 text-red-500">Post not found.</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-24">
      {user?.id === post.user.id && (
        <div className="flex flex-nowrap gap-3 mb-8 h-8 w-full max-[300px]:flex-wrap">
          <Button
            onClick={() => router.push(`/posts/edit/${id}`)}
            className="w-1/2 max-[300px]:w-full"
          >
            Edit Post
          </Button>
          <DeletePostDialog
            handleDelete={handleDelete}
            className="w-1/2 max-[300px]:w-full"
          />
        </div>
      )}
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-gray-500 text-sm mt-2">
        Published on{" "}
        {new Date(post.created_at).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
      <AuthorInfo author={post.user} />
      <div
        className="prose max-w-none mt-4"
        dangerouslySetInnerHTML={{ __html: post.content_html }}
      />
    </div>
  );
}

function PostDetailSkeleton() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-24">
      <div className="flex gap-3 mb-8">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-24" />
      </div>
      <Skeleton className="h-10 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2 mb-4" />
      <div className="flex items-center gap-3 mb-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-4 w-32" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}
