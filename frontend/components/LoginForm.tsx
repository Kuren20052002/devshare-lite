import { FormEvent, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    user: { login: "", password: "" },
  });
  const [error, setError] = useState<string | null>(null);
  const Router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      user: { ...formData.user, [e.target.name]: e.target.value },
    });
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setError(errorText || "Login failed");
        return;
      }

      const result = await response.json();
      if (result.token) {
        localStorage.setItem("token", result.token);
        Router.push("/homepage");
      } else {
        setError("No token returned");
      }
    } catch (err) {
      setError("Network error");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-lg p-6 sm:p-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={onSubmit} className="space-y-5">
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="login">Login</Label>
            <Input
              id="login"
              type="text"
              name="login"
              value={formData.user.login}
              onChange={handleChange}
              placeholder="Enter your Email or Username"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              value={formData.user.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-200"
          >
            Login
          </Button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
