import Image from "next/image";
import Link from "next/link";

export interface AuthorProps {
  id: number;
  first_name: string;
  last_name: string;
  avatar_url: string;
}

export function AuthorInfo({ author }: { author: AuthorProps }) {
  const author_name = author.first_name + " " + author.last_name;

  return (
    <div className="relative mt-4 flex justify-start gap-x-2">
      <div className="flex-none">
        <span className="relative rounded-full">
          <span
            aria-hidden="true"
            className="absolute inset-0 h-10 w-10 rounded-full ring-1 ring-inset ring-gray-900/10"
          ></span>
          <Image
            alt={author_name}
            src={author.avatar_url}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
          />
        </span>
      </div>
      <div className="text-sm flex items-center">
        <p className="font-semibold text-gray-900 text-center w-full">
          <Link
            href={`/user/${author.id}`}
            className="relative z-10 font-semibold text-blue-600 hover:text-blue-800"
          >
            <span className="absolute inset-0"></span>
            {author_name}
          </Link>
        </p>
      </div>
    </div>
  );
}
