import Link from "next/link";
import { getServerSession } from "next-auth";
import { BarChart3, Bell, Bot, Briefcase, CreditCard, Gauge, PiggyBank, Settings, Target, Wallet } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { SignOutButton } from "@/components/sign-out-button";

const nav = [
  ["Dashboard", "/dashboard", Gauge], ["Transactions", "/transactions", CreditCard], ["Budgets", "/budgets", Wallet], ["Savings Goals", "/goals", Target], ["Investments", "/investments", Briefcase], ["Analytics", "/analytics", BarChart3], ["AI Assistant", "/assistant", Bot], ["Notifications", "/notifications", Bell], ["Settings", "/settings", Settings]
] as const;

export async function Sidebar() {
  const session = await getServerSession(authOptions);
  return <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r bg-card/70 p-5 backdrop-blur-xl lg:block"><Link href="/dashboard" className="mb-8 flex items-center gap-3"><div className="grid size-11 place-items-center rounded-2xl bg-primary text-primary-foreground"><PiggyBank /></div><div><p className="text-xl font-black">Fintaro <span className="gradient-text">AI</span></p><p className="text-xs text-muted-foreground">Premium finance cockpit</p></div></Link><nav className="space-y-1">{nav.map(([label, href, Icon]) => <Link key={href} href={href} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"><Icon className="size-4" />{label}</Link>)}</nav><div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-muted p-4"><p className="text-sm font-semibold">{session?.user?.name}</p><p className="truncate text-xs text-muted-foreground">{session?.user?.email}</p><SignOutButton /></div></aside>;
}
