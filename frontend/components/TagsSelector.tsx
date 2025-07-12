"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

type Tag = {
  id: number;
  name: string;
};

type Props = {
  selectedTags: Tag[];
  onChange: (tags: Tag[]) => void;
};

export default function TagSelector({ selectedTags, onChange }: Props) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/tags/index")
      .then((res) => res.json())
      .then((data) => setTags(data))
      .catch(() => setError("Failed to fetch tags"));
  }, []);

  const toggleTag = (tag: Tag) => {
    const exists = selectedTags.some((t) => t.id === tag.id);
    console.log("Toggling tag:", tag.name, "Exists:", exists);
    if (exists) {
      onChange(selectedTags.filter((t) => t.id !== tag.id));
    } else {
      if (selectedTags.length >= 5) return;
      onChange([...selectedTags, tag]);
    }
  };

  const filteredTags = tags.filter((tag) =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="border p-3 rounded bg-white shadow-md">
      <h4 className="font-medium mb-2">Select up to 5 tags:</h4>
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Input
        type="text"
        placeholder="Search tags..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-3 p-2 border border-gray-300 rounded"
      />

      <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
        {filteredTags.length === 0 && (
          <p className="text-sm text-gray-500">No tags match your search.</p>
        )}

        {filteredTags.map((tag) => {
          const isSelected = selectedTags.some((t) => t.id === tag.id);
          return (
            <Button
              type="button"
              key={tag.id}
              variant={isSelected ? "default" : "secondary"}
              onClick={() => toggleTag(tag)}
              className={
                isSelected ? "bg-blue-600 text-white hover:bg-blue-700" : ""
              }
            >
              {tag.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
