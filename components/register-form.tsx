"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  async function onSubmit(formData: FormData) {
    const res = await fetch("/api/auth/register", { method: "POST", body: JSON.stringify(Object.fromEntries(formData)), headers: { "Content-Type": "application/json" } });
    if (!res.ok) return setError((await res.json()).error ?? "Registration failed");
    await signIn("credentials", { email: formData.get("email"), password: formData.get("password"), redirect: false });
    router.push("/dashboard");
  }
  return <form action={onSubmit} className="mt-6 space-y-3"><Input name="name" placeholder="Name" required /><Input name="email" type="email" placeholder="Email" required /><Input name="password" type="password" placeholder="Password (min 8 chars)" required />{error && <p className="text-sm text-red-500">{error}</p>}<Button className="w-full">Create Fintaro account</Button></form>;
}
