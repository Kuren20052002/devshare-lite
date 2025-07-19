"use client";
import { useParams } from "next/navigation";
import EditProfileForm from "@/components/EditUserForm";
import { User } from "lucide-react";

export default function UserEditPage() {
  const params = useParams();
  const id = params["user.id"] as string;

  return <EditProfileForm id={id} />;
}
