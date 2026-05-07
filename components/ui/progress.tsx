export function Progress({ value, tone = "primary" }: { value: number; tone?: "primary" | "warn" | "danger" }) {
  const color = tone === "danger" ? "bg-red-500" : tone === "warn" ? "bg-amber-500" : "bg-primary";
  return <div className="h-2 overflow-hidden rounded-full bg-muted"><div className={`${color} h-full rounded-full transition-all`} style={{ width: `${Math.min(value, 100)}%` }} /></div>;
}
