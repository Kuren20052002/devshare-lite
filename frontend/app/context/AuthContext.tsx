"use client";

import {
  createContext,
  useEffect,
  useState,
  useContext,
  ReactNode,
} from "react";

type User = {
  id: number;
  email: string;
};

type AuthContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  user: User | null;
  loading: boolean;
  setToken: (token: string | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (!token) {
      setIsLoggedIn(false);
      setUser(null);
      setLoading(false);
      return;
    }

    fetch("http://localhost:3001/current_user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Invalid token");
        return res.json();
      })
      .then((data) => {
        setIsLoggedIn(true);
        setUser(data);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, user, loading, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
