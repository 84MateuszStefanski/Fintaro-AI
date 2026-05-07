"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function SignOutButton({ label = "Log out" }: { label?: string }) {
  return <Button variant="secondary" className="mt-3 w-full" onClick={() => signOut({ callbackUrl: "/login" })}>{label}</Button>;
}
