"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CKEditorWrapper from "@/components/CKEditorWrapper";
import { Button } from "@/components/ui/button";

type Props = {
  id: string;
};

type Post = {
  title: string;
  content_html: string;
};

export default function EditPostForm({ id }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:3001/posts/${id}`);
        if (!res.ok) throw new Error("Failed to fetch post");
        const data = await res.json();
        setTitle(data.title);
        setContent(data.content_html);
      } catch (err) {
        alert("Error loading post.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async () => {
    const res = await fetch(`http://localhost:3001/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      router.push(`/posts/${id}`);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 bg-white rounded shadow">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded-md"
        placeholder="Post Title"
      />

      <CKEditorWrapper value={content} onChange={setContent} />

      <Button onClick={handleSubmit}>Update Post</Button>
    </div>
  );
}
