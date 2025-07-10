import { FormEvent, useState } from "react";
import InputText from "@/components/ui/InputText";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    user: { login: "", password: "" },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      user: { ...formData.user, [e.target.name]: e.target.value },
    });
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log("Sending login request:", JSON.stringify(formData));

    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Login failed:", errorText);
      return;
    }

    const result = await response.json();
    console.log("Login token:", result.token);
    console.log("Login success:", result);
  }

  return (
    <form onSubmit={onSubmit}>
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
