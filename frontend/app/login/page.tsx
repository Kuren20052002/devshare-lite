"use client";
import LoginForm from "@/components/LoginForm";
export default function LoginPage() {
  return (
    <>
      <h1>Login Page</h1>
      <LoginForm />
      <p>
        Already have an account?{" "}
        <a href="/signin" className="text-blue-600 underline">
          Sign In
        </a>
      </p>
    </>
  );
}
