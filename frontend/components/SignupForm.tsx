import { FormEvent, useState } from "react";
import InputText from "@/components/ui/InputText";

export default function SignupForm() {
  const [error, setError] = useState<string | null>(null);
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

    setError(null);

    try {
      const response = await fetch("http://localhost:3001/signup", {
        method: "POST",
        headers: {
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
    } catch (err: any) {
      setError("Network error");
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <InputText
        label="first_name"
        type="text"
        name="first_name"
        value={formData.user.first_name}
        onChange={handleChange}
        placeholder="Enter your First Name"
        required
      />
      <InputText
        label="last_name"
        type="text"
        name="last_name"
        value={formData.user.last_name}
        onChange={handleChange}
        placeholder="Enter your Last Name"
        required
      />
      <InputText
        label="email"
        type="text"
        name="email"
        value={formData.user.email}
        onChange={handleChange}
        placeholder="Enter your Email Address"
        required
      />
      <InputText
        label="username"
        type="text"
        name="username"
        value={formData.user.username}
        onChange={handleChange}
        placeholder="Enter your Username"
        required
      />
      <InputText
        label="password"
        type="password"
        name="password"
        value={formData.user.password}
        onChange={handleChange}
        placeholder="Enter your Password"
        required
      />
      <InputText
        label="password_confirmation"
        type="password"
        name="password_confirmation"
        value={formData.user.password_confirmation}
        onChange={handleChange}
        placeholder="Enter your password again"
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
}
