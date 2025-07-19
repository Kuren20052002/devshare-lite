import { useAuth } from "@/app/context/AuthContext";

export function useRequireAuth() {
  const { isLoggedIn, loading } = useAuth();
  return { isLoggedIn, loading };
}
