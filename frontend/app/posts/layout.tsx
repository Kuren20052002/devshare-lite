"use client";

import { ReactNode } from "react";
import { useRequireAuth } from "@/lib/hooks/useRequiredAuth";
import { usePathname, useRouter } from "next/navigation";
import LoginRequiredDialog from "@/components/Dialog/LoginRequiredDialog";
export default function PostsLayout({ children }: { children: ReactNode }) {
  const { isLoggedIn, loading } = useRequireAuth();
  const router = useRouter();
  const path = usePathname();

  const isShowPage = /^\/posts\/\d+$/.test(path);

  if (loading) {
    return (
      <div className="flex space-x-2 justify-center items-center bg-white h-screen dark:invert">
        <span className="sr-only">Loading...</span>
        <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-8 w-8 bg-black rounded-full animate-bounce"></div>
      </div>
    );
  }

  if (!isLoggedIn && !isShowPage) {
    return <LoginRequiredDialog />;
  }

  return <>{children}</>;
}
