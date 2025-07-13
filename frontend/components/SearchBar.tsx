"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSearch = () => {
    router.push(`/posts?page=1&query=${encodeURIComponent(value)}`);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
      className="w-full max-w-xl px-4"
    >
      <div className="relative flex items-center rounded-full border border-gray-300 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500 dark:bg-gray-200 dark:border-gray-700">
        <input
          ref={inputRef}
          type="text"
          name="q"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search..."
          className="w-full h-12 pl-5 pr-10 text-sm sm:text-base rounded-full bg-transparent focus:outline-none dark:text-gray-800"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
          tabIndex={-1}
          onClick={() => inputRef.current?.focus()}
        >
          <svg
            className="h-5 w-5 text-teal-500 dark:text-teal-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 56.966 56.966"
            fill="currentColor"
          >
            <path
              d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786
              c0-12.682-10.318-23-23-23s-23,10.318-23,23s10.318,23,23,23
              c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208
              c0.571,0.593,1.339,0.92,2.162,0.92c0.779,0,1.518-0.297,
              2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z
              M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17
              s-17-7.626-17-17S14.61,6,23.984,6z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}
