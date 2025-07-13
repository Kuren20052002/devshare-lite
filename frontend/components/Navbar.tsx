"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import SearchBar from "@/components/SearchBar";
import { useSearch } from "@/app/context/SearchContext";

type User = {
  id: number;
  username: string;
  avatar: string | null;
};

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn, loading } = useAuth();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { searchQuery, setSearchQuery } = useSearch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setCurrentUser(null);
    setMobileOpen(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setCurrentUser(null);
          return;
        }

        const res = await fetch("http://localhost:3001/current_user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        if (res.ok) {
          const data = await res.json();
          setCurrentUser(data);
        }
      } catch {
        setCurrentUser(null);
      }
    };

    if (isLoggedIn) fetchUser();
  }, [isLoggedIn]);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < lastScrollY);
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-md transition-transform duration-300 transform-gpu ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {loading ? (
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">
            <Skeleton className="h-8 w-32 rounded-md" />
          </div>
          <div className="flex-1 flex justify-center">
            <Skeleton className="h-10 w-64 rounded-md" />
          </div>
          <div className="flex space-x-4">
            <Skeleton className="h-10 w-20 rounded-md" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              DevShare
            </Link>
          </div>

          {isLoggedIn && (
            <div className="flex-1 flex justify-center ml-4 sm:ml-8 md:ml-16 lg:ml-46">
              <div className="w-full max-w-md mx-auto ">
                <SearchBar value={searchQuery} onChange={setSearchQuery} />
              </div>
            </div>
          )}

          <div className="flex items-center">
            <ul className="hidden md:flex items-center space-x-6 text-gray-700 font-medium">
              <li className="flex items-center h-full">
                <Link
                  href="/posts"
                  className="hover:text-blue-500 flex items-center h-10"
                >
                  Home
                </Link>
              </li>
              {isLoggedIn ? (
                <>
                  <li className="flex items-center h-full">
                    <Link
                      href="/posts/new"
                      className="hover:text-blue-500 flex items-center h-10"
                    >
                      Create
                    </Link>
                  </li>
                  <li className="flex items-center h-full">
                    <Button
                      onClick={handleLogout}
                      className="h-10 flex items-center"
                    >
                      Logout
                    </Button>
                  </li>
                  <li className="flex items-center h-full">
                    <Link
                      href="/profile"
                      className="hover:text-blue-500 flex items-center h-10"
                    >
                      <Image
                        src={currentUser?.avatar || "/default-avatar.png"}
                        alt="Avatar"
                        width={40}
                        height={40}
                        className="rounded-full object-cover shadow-sm"
                      />
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-center h-full">
                    <Button asChild className="h-10 flex items-center">
                      <Link href="/login">Login</Link>
                    </Button>
                  </li>
                  <li className="flex items-center h-full">
                    <Button asChild className="h-10 flex items-center">
                      <Link href="/signup">Sign Up</Link>
                    </Button>
                  </li>
                </>
              )}
            </ul>
            <button
              className="md:hidden text-gray-700 ml-2"
              onClick={() => setMobileOpen((open) => !open)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Mobile */}

      {!loading && mobileOpen && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="space-y-4 p-4 text-gray-700 font-medium">
            <li>
              <Link
                href="/posts"
                className="block hover:text-blue-500"
                onClick={() => setMobileOpen(false)}
              >
                Home
              </Link>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <Link
                    href="/posts/new"
                    className="block hover:text-blue-500"
                    onClick={() => setMobileOpen(false)}
                  >
                    Create
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="block hover:text-blue-500"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogout();
                    }}
                  >
                    Logout
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profile"
                    className="flex items-center space-x-2 hover:text-blue-500"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Image
                      src={
                        currentUser?.avatar ?? "/default_profile_picture.svg"
                      }
                      alt="Avatar"
                      width={32}
                      height={32}
                      className="rounded-full object-cover"
                    />
                    <span>Profile</span>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/login"
                    className="block hover:text-blue-500"
                    onClick={() => setMobileOpen(false)}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signup"
                    className="block hover:text-blue-500"
                    onClick={() => setMobileOpen(false)}
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
