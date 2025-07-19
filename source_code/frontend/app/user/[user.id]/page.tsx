"use client";
import { useParams } from "next/navigation";
import UserProfile from "@/components/UserProfile";

export default function ProfilePage() {
  const params = useParams();
  const id = params["user.id"] as string;

  return <UserProfile id={id} />;
}
