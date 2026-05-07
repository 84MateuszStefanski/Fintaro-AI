import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => <input ref={ref} className={cn("w-full rounded-xl border bg-background/60 px-3 py-2 text-sm outline-none ring-primary/30 transition focus:ring-4", className)} {...props} />);
Input.displayName = "Input";
