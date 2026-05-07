import { deleteTransaction, upsertTransaction } from "@/lib/actions";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getUserDictionary } from "@/lib/i18n";
import { formatCurrency } from "@/lib/utils";

export default async function TransactionsPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const user = await requireUser();
  const t = await getUserDictionary(user.id);
  const sp = await searchParams;
  const q = sp.q ?? "";
  const type = sp.type;
  const transactions = await prisma.transaction.findMany({ where: { userId: user.id, ...(type ? { type: type as "INCOME" | "EXPENSE" } : {}), ...(q ? { OR: [{ description: { contains: q, mode: "insensitive" } }, { category: { contains: q, mode: "insensitive" } }] } : {}) }, orderBy: { [sp.sort ?? "date"]: sp.order === "asc" ? "asc" : "desc" } });

  return <div className="space-y-6"><h1 className="text-4xl font-black">{t.transactions}</h1><Card><CardTitle>{t.addTransaction}</CardTitle><form action={upsertTransaction} className="mt-4 grid gap-3 md:grid-cols-6"><Input name="description" placeholder={t.description} required/><Input name="category" placeholder={t.category} required/><Input name="amount" type="number" step="0.01" placeholder={t.amount} required/><select name="type" className="rounded-xl border bg-background px-3"><option>EXPENSE</option><option>INCOME</option></select><Input name="date" type="date" defaultValue={new Date().toISOString().slice(0,10)} required/><Button>{t.save}</Button></form></Card><Card><form className="mb-4 flex flex-wrap gap-3"><Input name="q" defaultValue={q} placeholder={t.search} className="max-w-xs"/><select name="type" defaultValue={type ?? ""} className="rounded-xl border bg-background px-3"><option value="">{t.all}</option><option>EXPENSE</option><option>INCOME</option></select><select name="sort" defaultValue={sp.sort ?? "date"} className="rounded-xl border bg-background px-3"><option value="date">{t.date}</option><option value="amount">{t.amount}</option><option value="category">{t.category}</option></select><Button>{t.search}</Button></form><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-left text-muted-foreground"><th className="py-3">{t.date}</th><th>{t.description}</th><th>{t.category}</th><th>{t.type}</th><th className="text-right">{t.amount}</th><th></th></tr></thead><tbody>{transactions.map((tx) => <tr key={tx.id} className="border-t"><td className="py-3">{tx.date.toISOString().slice(0,10)}</td><td>{tx.description}</td><td>{tx.category}</td><td>{tx.type}</td><td className="text-right font-semibold">{formatCurrency(Number(tx.amount), user.currency)}</td><td className="text-right"><form action={deleteTransaction}><input type="hidden" name="id" value={tx.id}/><Button variant="ghost">{t.delete}</Button></form></td></tr>)}</tbody></table></div></Card></div>;
}
