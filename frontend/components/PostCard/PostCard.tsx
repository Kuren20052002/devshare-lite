import Image from "next/image";
import Link from "next/link";
import { AuthorProps, AuthorInfo } from "./AuthorSection";
import { Button } from "@/components/ui/button";

type Tag = {
  id: number;
  name: string;
};

interface PostCardProps {
  id: number;
  title: string;
  date: string;
  author: AuthorProps;
  tags: Tag[]; // Add this
}

export default function PostCard({
  id,
  title,
  date,
  author,
  tags,
}: PostCardProps) {
  return (
    <article className="flex flex-col items-start justify-between p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag) => (
          <Button
            key={tag.id}
            variant="secondary"
            className="text-xs px-3 py-1 rounded-full"
            disabled
          >
            {tag.name}
          </Button>
        ))}
      </div>

      <div className="flex items-center gap-x-2 text-sm text-gray-500">
        <time>{date}</time>
      </div>

      <div className="group relative mt-3">
        <h3 className="text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
          <Link href={`/posts/${id}`}>
            <span className="absolute inset-0" />
            {title}
          </Link>
        </h3>
      </div>

      <AuthorInfo author={author} />
    </article>
  );
}
