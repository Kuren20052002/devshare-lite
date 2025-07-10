import { FormEvent, useState } from "react";
import { AlertError } from "@/components/ui/Alert";
import InputText from "@/components/ui/InputText";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    user: { login: "", password: "" },
  });
  const [error, setError] = useState<string | null>(null);

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
      {error && <AlertError>{error}</AlertError>}
      <InputText
        label="login"
        type="text"
        name="login"
        value={formData.user.login}
        onChange={handleChange}
        placeholder="Enter your Email or Username"
        required
      />
      <InputText
        label="password"
        type="password"
        name="password"
        value={formData.user.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
}
