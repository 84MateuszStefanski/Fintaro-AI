import Link from "next/link";
import { LoginForm } from "@/components/login-form";
import { Card } from "@/components/ui/card";

export default function LoginPage() {
  return <main className="grid min-h-screen place-items-center p-6"><Card className="w-full max-w-md"><h1 className="text-3xl font-black">Welcome back</h1><p className="mt-2 text-sm text-muted-foreground">Use demo@fintaro.ai / demo1234 or your account.</p><LoginForm /><p className="mt-5 text-sm text-muted-foreground">No account? <Link className="text-primary" href="/register">Create one</Link></p></Card></main>;
}
