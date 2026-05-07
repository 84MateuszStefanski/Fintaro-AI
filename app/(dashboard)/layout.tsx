import { Sidebar } from "@/components/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,.16),transparent_35%),radial-gradient(circle_at_top_right,rgba(59,130,246,.14),transparent_30%)]"><div className="flex"><Sidebar /><main className="w-full p-4 md:p-8">{children}</main></div></div>;
}
