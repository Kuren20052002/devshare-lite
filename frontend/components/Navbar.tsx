"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import { Button } from "./ui/button";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < lastScrollY) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
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
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
        >
          DevShare
        </Link>

        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <li className="flex items-center">
            <Link
              href="/posts"
              className="hover:text-blue-500 transition-colors mr-2"
            >
              Home
            </Link>
          </li>
          {isLoggedIn ? (
            <>
              <li className="flex items-center">
                <Link
                  href="/posts/new"
                  className="hover:text-blue-500 transition-colors"
                >
                  Create
                </Link>
              </li>
              <li>
                <Button onClick={handleLogout}>Logout</Button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Button>
                  <Link
                    href="/login"
                    className="hover:text-blue-500 transition-colors"
                  >
                    Login
                  </Link>
                </Button>
              </li>
              <li>
                <Button>
                  <Link
                    href="/signup"
                    className="hover:text-blue-500 transition-colors"
                  >
                    Sign Up
                  </Link>
                </Button>
              </li>
            </>
          )}
        </ul>

        <button
          className="md:hidden text-gray-700"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="space-y-4 p-4 text-gray-700 font-medium">
            <li>
              <Link href="/posts" className="block hover:text-blue-500">
                Home
              </Link>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <Link href="/posts/new" className="block hover:text-blue-500">
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
                      setMobileOpen(false);
                    }}
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/login" className="block hover:text-blue-500">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/signup" className="block hover:text-blue-500">
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
