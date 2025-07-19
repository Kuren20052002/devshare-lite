"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { Skeleton } from "@/components/ui/skeleton"; // ← Import Skeleton

type CommentsSectionProps = {
  postId: string;
};

export default function CommentsSection({ postId }: CommentsSectionProps) {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:3001/posts/${postId}/comments`
        );
        const data = await res.json();
        setComments(data);
      } catch (err) {
        console.error("Error fetching comments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  const handleNewComment = (newComment: any) => {
    console.log(newComment);
    setComments((prev) => [...prev, newComment]);
  };

  return (
    <>
      <hr className="max-w-3xl mx-auto"></hr>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>

        {isLoggedIn && (
          <CommentForm postId={postId} onSubmitSuccess={handleNewComment} />
        )}
        {loading ? (
          <div className="space-y-4 mt-4">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 border rounded-md"
              >
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex flex-col gap-2 w-full">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-4">
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                postId={postId}
                isLoggedIn={isLoggedIn}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
