import { FormEvent, useState } from "react";
import InputText from "@/components/ui/InputText";
import { AlertError } from "@/components/ui/Alert"; // adjust path if needed

export default function SignupForm() {
  const [errors, setErrors] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    user: {
      first_name: "",
      last_name: "",
      email: "",
      username: "",
      password: "",
      password_confirmation: "",
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      user: { ...formData.user, [e.target.name]: e.target.value },
    });
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors([]);

    try {
      const response = await fetch("http://localhost:3001/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get("content-type");

      if (!response.ok) {
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          if (Array.isArray(errorData.error)) {
            setErrors(errorData.error);
          } else {
            setErrors([JSON.stringify(errorData)]);
          }
        } else {
          const text = await response.text();
          setErrors([text]);
        }
        return;
      }

      const result = await response.json();
      console.log(result);
    } catch (err) {
      setErrors(["Network error"]);
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-6 sm:p-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Create an Account
        </h2>

        <form onSubmit={onSubmit} className="space-y-5">
          {errors.length > 0 && (
            <AlertError>
              <ul className="list-disc list-inside space-y-1">
                {errors.map((err, index) => (
                  <li key={index} className="text-red-800">
                    {err}
                  </li>
                ))}
              </ul>
            </AlertError>
          )}

          <div className="flex flex-col sm:flex-row sm:gap-4">
            <div className="flex-1">
              <InputText
                label="First Name"
                type="text"
                name="first_name"
                value={formData.user.first_name}
                onChange={handleChange}
                placeholder="Enter your First Name"
                required
              />
            </div>
            <div className="flex-1 mt-5 sm:mt-0">
              <InputText
                label="Last Name"
                type="text"
                name="last_name"
                value={formData.user.last_name}
                onChange={handleChange}
                placeholder="Enter your Last Name"
                required
              />
            </div>
          </div>

          <InputText
            label="Email"
            type="text"
            name="email"
            value={formData.user.email}
            onChange={handleChange}
            placeholder="Enter your Email Address"
            required
          />
          <InputText
            label="Username"
            type="text"
            name="username"
            value={formData.user.username}
            onChange={handleChange}
            placeholder="Enter your Username"
            required
          />
          <InputText
            label="Password"
            type="password"
            name="password"
            value={formData.user.password}
            onChange={handleChange}
            placeholder="Enter your Password"
            required
          />
          <InputText
            label="Confirm Password"
            type="password"
            name="password_confirmation"
            value={formData.user.password_confirmation}
            onChange={handleChange}
            placeholder="Enter your password again"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-200"
          >
            Register
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
