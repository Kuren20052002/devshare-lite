import React, { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import PostsSection from "./PostCard/PostsSection";
interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar_url?: string;
  cover_picture_url?: string;
  bio?: string;
  github?: string;
  linkedin?: string;
  facebook?: string;
}

type Props = {
  id: string;
};

export default function UserProfile({ id }: Props) {
  const [profileUser, setUser] = useState<User | null>(null);
  const { user, isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      setLoading(true);
      setError(null);

      fetch(`http://localhost:3001/users/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then((data: User) => {
          setUser(data);
        })
        .catch((e) => {
          console.error("Failed to fetch user:", e);
          setError("Failed to load user profile. Please try again.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center">
        <Skeleton className="w-full xl:h-[20rem] lg:h-[18rem] md:h-[16rem] sm:h-[14rem] h-[11rem]" />
        <Skeleton className="w-[7rem] h-[7rem] rounded-md mt-[-3rem]" />
        <Skeleton className="w-[60%] h-[1.5rem] mt-4" />
        <Skeleton className="w-[80%] h-[1.5rem] mt-2" />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!profileUser) {
    return <p className="text-center text-red-500">User not found.</p>;
  }

  return (
    <section className="w-full overflow-hidden dark:bg-gray-900">
      <div className="flex flex-col mt-[80px]">
        <img
          src={profileUser.cover_picture_url}
          alt="User Cover"
          className="w-full object-cover max-h-[340px]"
        />

        <div className="w-[90%] sm:w-[80%] mx-auto flex flex-col sm:flex-row relative items-center -mt-8">
          <img
            src={profileUser.avatar_url}
            alt="User Profile"
            className="rounded-md w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 outline outline-2 outline-offset-2 outline-blue-500 relative -top-16 sm:top-0 bg-white object-cover"
          />

          <h1 className="w-full text-center sm:text-left mx-4 -mt-4 sm:mt-0 text-gray-800 dark:text-white lg:text-4xl md:text-3xl sm:text-2xl text-xl font-serif">
            {profileUser.first_name} {profileUser.last_name}
          </h1>

          {id === String(user?.id) && (
            <Button
              variant="secondary"
              className="sm:ml-auto mt-4 sm:mt-0 hover:text-blue-700 text-lg font-semibold border border-blue"
              onClick={() => router.push(`/user/edit/${id}`)}
            >
              Edit Profile
            </Button>
          )}
        </div>

        <div className="xl:w-[80%] lg:w-[90%] md:w-[90%] sm:w-[92%] w-[90%] mx-auto flex flex-col gap-4 items-center relative">
          <p className="w-fit text-gray-700 dark:text-gray-400 text-md">
            {profileUser.bio || "No bio available"}
          </p>

          <div className="w-full my-auto py-6 flex flex-col justify-center gap-2 ">
            <div className="w-full flex sm:flex-row flex-col gap-2 justify-center">
              <div className="w-full">
                <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                  <div className="flex flex-col pb-3">
                    <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                      First Name
                    </dt>
                    <dd className="text-lg font-semibold">
                      {profileUser.first_name}
                    </dd>
                  </div>
                  <div className="flex flex-col py-3">
                    <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                      Last Name
                    </dt>
                    <dd className="text-lg font-semibold">
                      {profileUser.last_name}
                    </dd>
                  </div>
                  <div className="flex flex-col py-3">
                    <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                      Email
                    </dt>
                    <dd className="text-lg font-semibold">
                      {profileUser.email}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="flex gap-4 mt-6 border-t border-black">
              {profileUser.github && (
                <a
                  href={profileUser.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600"
                >
                  <FaGithub className="w-8 h-8" />
                </a>
              )}
              {profileUser.linkedin && (
                <a
                  href={profileUser.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600"
                >
                  <FaLinkedin className="w-8 h-8" />
                </a>
              )}
              {profileUser.facebook && (
                <a
                  href={profileUser.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600"
                >
                  <FaFacebook className="w-8 h-8" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {isLoggedIn ? (
        <>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-gray-900">
                User's Posts
              </h2>
              <p className="mt-2 text-lg leading-8 text-gray-600">
                Check out the latest posts shared by {profileUser.first_name}.
              </p>
            </div>
          </div>
          <PostsSection user_id={id} />
        </>
      ) : (
        <div className="flex justify-center items-center py-12 px-6">
          <p className="text-xl text-gray-500 dark:text-gray-400 font-semibold text-center">
            <a href="/login">Log in</a> to see user posts.
          </p>
        </div>
      )}
    </section>
  );
}
