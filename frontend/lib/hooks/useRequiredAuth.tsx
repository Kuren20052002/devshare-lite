"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export function useRequireAuth(redirectTo = "/login") {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push(redirectTo);
    }
  }, [isLoggedIn, router]);

  return isLoggedIn;
}
