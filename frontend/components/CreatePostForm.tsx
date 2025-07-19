"use client";

import { useState } from "react";
import CKEditorWrapper from "@/components/CKEditorWrapper";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import { AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import TagSelector from "@/components/TagsSelector";
import { Button } from "@/components/ui/button";

export default function CreatePostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const res = await fetch("http://localhost:3001/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        post: {
          title,
          content,
          tag_names: selectedTags.map((tag) => tag.name),
        },
      }),
    });

    if (res.ok) {
      const data = await res.json();
      router.push(`/posts/${data.id}`);
    } else {
      const errorData = await res.json();
      setError(errorData?.error || "Something went wrong.");
    }
  };

  return (
    <form
      className="mx-auto mt-32 w-[70%] max-w-3xl space-y-4"
      onSubmit={handleSubmit}
    >
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Input
        type="text"
        placeholder="Title"
        className="w-full border border-gray-300 rounded-md p-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <div className="flex justify-center bg-gray-100 min-h-screen">
        <div className="shadow-lg rounded-md w-full bg-pink">
          <CKEditorWrapper value={content} onChange={setContent} />
        </div>
      </div>
      <TagSelector
        selectedTags={selectedTags}
        onChange={(tags) => setSelectedTags(tags)}
      />
      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-200"
      >
        Submit Post
      </Button>
    </form>
  );
}
