"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type CommentFormProps = {
  postId: string;
  parentId?: string;
  onSubmitSuccess: (newComment: any) => void;
};

export default function CommentForm({
  postId,
  parentId,
  onSubmitSuccess,
}: CommentFormProps) {
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNewComment = async () => {
    if (!newComment.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:3001/posts/${postId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            comment: {
              content: newComment,
              parent_id: parentId || null,
            },
          }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        onSubmitSuccess(data);
        setNewComment("");
      } else {
        console.error("Failed to create comment:", data);
      }
    } catch (err) {
      console.error("Network error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-2">
      <Label htmlFor="comment">Your Comment</Label>
      <Textarea
        id="comment"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Write your comment..."
        className="mt-2"
      />
      <Button className="mt-2" onClick={handleNewComment} disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </div>
  );
}
