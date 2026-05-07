import Link from "next/link";
import { RegisterForm } from "@/components/register-form";
import { Card } from "@/components/ui/card";
export default function RegisterPage() { return <main className="grid min-h-screen place-items-center p-6"><Card className="w-full max-w-md"><h1 className="text-3xl font-black">Create account</h1><p className="mt-2 text-sm text-muted-foreground">Securely isolate your financial workspace.</p><RegisterForm /><p className="mt-5 text-sm text-muted-foreground">Already have an account? <Link className="text-primary" href="/login">Log in</Link></p></Card></main>; }
