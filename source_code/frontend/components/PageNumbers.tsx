"use client";

import { Button } from "@/components/ui/button";

type Props = {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
};

export default function PageNumbers({ page, totalPages, setPage }: Props) {
  const visiblePages = getVisiblePages(page, totalPages);

  return (
    <div className="container mx-auto px-4 mt-10">
      <nav
        className="flex flex-row flex-nowrap justify-between md:justify-center items-center"
        aria-label="PageNumbers"
      >
        <Button
          variant="outline"
          size="icon"
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page === 1}
          className="mr-1"
        >
          <span className="sr-only">Previous Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="block w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </Button>

        {visiblePages.map((p) => (
          <Button
            key={p}
            variant={p === page ? "default" : "outline"}
            size="icon"
            onClick={() => setPage(p)}
            className={`hidden md:flex mx-1 ${
              p === page ? "pointer-events-none" : ""
            }`}
            aria-current={p === page ? "page" : undefined}
            title={`Page ${p}`}
          >
            {p}
          </Button>
        ))}

        <Button
          variant="outline"
          size="icon"
          onClick={() => setPage(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="ml-1"
        >
          <span className="sr-only">Next Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="block w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </Button>
      </nav>
    </div>
  );
}

function getVisiblePages(current: number, total: number): number[] {
  const delta = 2;
  const range: number[] = [];

  const start = Math.max(1, current - delta);
  const end = Math.min(total, current + delta);

  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  return range;
}
