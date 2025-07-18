"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import CommentForm from "./CommentForm";

type CommentProps = {
  comment: {
    id: string;
    parent_id?: string;
    content: string;
    user: { first_name: string; last_name: string; avatar_url: string };
    have_children: boolean;
  };
  postId: string;
  isLoggedIn: boolean;
};

export default function Comment({ comment, postId, isLoggedIn }: CommentProps) {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replies, setReplies] = useState<any[]>([]);
  const [loadingReplies, setLoadingReplies] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const fetchReplies = async () => {
    setLoadingReplies(true);
    try {
      const res = await fetch(
        `http://localhost:3001/posts/${postId}/comments/${comment.id}/replies`
      );
      const data = await res.json();
      setReplies(data);
      setShowReplies(true);
    } catch (err) {
      console.error("Error fetching replies", err);
    } finally {
      setLoadingReplies(false);
    }
  };

  const handleReplySuccess = (newReply: any) => {
    setReplies((prev) => [...prev, newReply]);
    setShowReplyBox(false);
    if (!showReplies) setShowReplies(true);
  };

  return (
    <div className="mb-4 p-3 border rounded-md">
      <div className="flex items-start gap-3">
        <Image
          src={comment.user.avatar_url || "/avatar-default-svgrepo-com.png"}
          alt={`${comment.user.first_name + comment.user.last_name}'s avatar`}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <p className="font-semibold">
            {comment.user.first_name + comment.user.last_name}
          </p>
          <p>{comment.content}</p>
        </div>
      </div>
      <div className="mt=2 ">
        {isLoggedIn && !comment.parent_id && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowReplyBox(!showReplyBox)}
          >
            {showReplyBox ? "Cancel" : "Reply"}
          </Button>
        )}

        {comment.have_children && (
          <>
            {!showReplies ? (
              <Button variant="ghost" size="sm" onClick={fetchReplies}>
                {loadingReplies ? "Loading..." : "View Replies"}
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowReplies(false)}
              >
                Hide Replies
              </Button>
            )}
          </>
        )}
      </div>

      {showReplyBox && isLoggedIn && (
        <CommentForm
          postId={postId}
          parentId={comment.id}
          onSubmitSuccess={handleReplySuccess}
        />
      )}

      {showReplies && (
        <div className="pl-6 mt-2 border-l">
          {replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              postId={postId}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </div>
      )}
    </div>
  );
}
