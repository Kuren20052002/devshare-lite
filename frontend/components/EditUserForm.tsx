import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";

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

type EditProfileFormProps = {
  id: string;
};

export default function EditProfileForm({ id }: EditProfileFormProps) {
  const [formData, setFormData] = useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`http://localhost:3001/users/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("User not found.");
        }
        return res.json();
      })
      .then((data: User) => {
        setFormData(data);
      })
      .catch((e: unknown) => {
        console.error("Failed to fetch user:", e);
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("An unknown error occurred while fetching user data.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      if (!prevData) return null;

      if (
        e.target instanceof HTMLInputElement &&
        e.target.type === "file" &&
        e.target.files &&
        e.target.files.length > 0
      ) {
        const file = e.target.files[0];
        const fileUrl = URL.createObjectURL(file);

        if (name === "avatar_url") {
          setAvatarFile(file);
          return { ...prevData, [name]: fileUrl };
        } else if (name === "cover_picture_url") {
          setCoverFile(file);
          return { ...prevData, [name]: fileUrl };
        }
      }
      return {
        ...prevData,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData) return;

    setIsSubmitting(true);
    setError(null);

    const form = new FormData();

    for (const key in formData) {
      if (
        key !== "avatar_url" &&
        key !== "cover_picture_url" &&
        formData[key as keyof User] !== undefined &&
        formData[key as keyof User] !== null
      ) {
        form.append(`user[${key}]`, formData[key as keyof User] as string);
      }
    }

    if (avatarFile) {
      form.append("user[avatar]", avatarFile);
    }
    if (coverFile) {
      form.append("user[cover_picture]", coverFile);
    }

    try {
      const response = await fetch(`http://localhost:3001/users/${id}`, {
        method: "PUT",
        // Remove or comment out the 'Content-Type' header when sending FormData
        // headers: {
        //   "Content-Type": "application/json", // <-- REMOVE THIS LINE
        //   Authorization: `Bearer ${localStorage.getItem("token")}`,
        // },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: form,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update user profile.");
      }

      console.log("Profile updated successfully");
      router.push(`/user/${id}`);
    } catch (e: unknown) {
      console.error("Error submitting form:", e);
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unknown error occurred during submission.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="w-[90%] sm:w-[80%] mx-auto mt-16 p-8">
        <Skeleton className="h-8 w-1/3 mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-20 w-full mt-6" />
        <Skeleton className="h-10 w-full mt-6" />
        <Skeleton className="h-10 w-full mt-6" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-[90%] sm:w-[80%] mx-auto mt-16 p-8 text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="w-[90%] sm:w-[80%] mx-auto mt-16 p-8 text-center text-red-500">
        <p>User not found.</p>
      </div>
    );
  }

  return (
    <div className="w-[90%] sm:w-[80%] mx-auto mt-16 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center">
        Edit Profile
      </h2>
      {error && <p className="text-center text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="first_name">First Name</Label>
            <Input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="last_name">Last Name</Label>
            <Input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            rows={4}
            value={formData.bio || ""}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="avatar_url">Profile Picture</Label>
            <Input
              type="file"
              id="avatar_url"
              name="avatar_url"
              onChange={handleChange}
              accept="image/*" // Restrict to image files
            />
            {formData.avatar_url && (
              <img
                src={formData.avatar_url}
                alt="Avatar Preview"
                className="mt-2 w-24 h-24 object-cover rounded-md border border-gray-300"
              />
            )}
          </div>
          <div>
            <Label htmlFor="cover_picture_url">Cover Picture</Label>
            <Input
              type="file"
              id="cover_picture_url"
              name="cover_picture_url"
              onChange={handleChange}
              accept="image/*" // Restrict to image files
            />
            {formData.cover_picture_url && (
              <img
                src={formData.cover_picture_url}
                alt="Cover Preview"
                className="mt-2 w-full h-32 object-cover rounded-md border border-gray-300"
              />
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <Label htmlFor="github">GitHub URL</Label>
            <Input
              type="text"
              id="github"
              name="github"
              value={formData.github || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="linkedin">LinkedIn URL</Label>
            <Input
              type="text"
              id="linkedin"
              name="linkedin"
              value={formData.linkedin || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="facebook">Facebook URL</Label>
            <Input
              type="text"
              id="facebook"
              name="facebook"
              value={formData.facebook || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
