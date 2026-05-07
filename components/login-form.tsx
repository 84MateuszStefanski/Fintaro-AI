"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  async function onSubmit(formData: FormData) {
    setError("");
    const res = await signIn("credentials", { email: formData.get("email"), password: formData.get("password"), redirect: false });
    if (res?.ok) router.push("/dashboard"); else setError("Invalid email or password.");
  }
  return <form action={onSubmit} className="mt-6 space-y-3"><Input name="email" type="email" defaultValue="demo@fintaro.ai" required /><Input name="password" type="password" defaultValue="demo1234" required />{error && <p className="text-sm text-red-500">{error}</p>}<Button className="w-full">Log in</Button></form>;
}
