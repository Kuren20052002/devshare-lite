"use client";
import SignupForm from "@/components/SignupForm";

export default function SignupPage() {
  return (
    <>
      <h1>Sign up Page</h1>
      <SignupForm />
      <p>
        Already have an account?{" "}
        <a href="/login" className="text-blue-600 underline">
          Log In
        </a>
      </p>
    </>
  );
}
