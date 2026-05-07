import * as React from "react";
import { cn } from "@/lib/utils";

export function Button({ className, variant = "primary", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" | "destructive" }) {
  return <button className={cn("inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition hover:scale-[1.01] disabled:opacity-50", variant === "primary" && "bg-primary text-primary-foreground shadow-glow", variant === "secondary" && "bg-secondary text-secondary-foreground", variant === "ghost" && "hover:bg-muted", variant === "destructive" && "bg-destructive text-destructive-foreground", className)} {...props} />;
}
