import { getFinancialSnapshot, requireUser } from "@/lib/data";
import { Card, CardTitle } from "@/components/ui/card";

export default async function NotificationsPage(){ const user=await requireUser(); const data=await getFinancialSnapshot(user.id); return <div className="space-y-6"><h1 className="text-4xl font-black">Notifications</h1><div className="grid gap-4">{data.notifications.map(n=><Card key={n.id} className={n.read?'opacity-70':''}><div className="flex justify-between"><CardTitle>{n.title}</CardTitle><span className="rounded-full bg-muted px-3 py-1 text-xs">{n.type}</span></div><p className="mt-2 text-muted-foreground">{n.message}</p><p className="mt-3 text-xs text-muted-foreground">{n.createdAt.toISOString().slice(0,10)} • {n.read?'Read':'Unread'}</p></Card>)}</div></div> }
