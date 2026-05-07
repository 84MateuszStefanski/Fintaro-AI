import { differenceInMonths } from "date-fns";
import { deleteGoal, upsertGoal } from "@/lib/actions";
import { getFinancialSnapshot, requireUser } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { getUserDictionary } from "@/lib/i18n";
import { formatCurrency, pct } from "@/lib/utils";

export default async function GoalsPage() {
  const user = await requireUser();
  const t = await getUserDictionary(user.id);
  const data = await getFinancialSnapshot(user.id);
  return <div className="space-y-6"><h1 className="text-4xl font-black">{t.savingsGoals}</h1><Card><CardTitle>{t.createGoal}</CardTitle><form action={upsertGoal} className="mt-4 grid gap-3 md:grid-cols-5"><Input name="name" placeholder="Emergency fund, vacation..." required/><Input name="targetAmount" type="number" placeholder="Target" required/><Input name="currentAmount" type="number" placeholder="Current" required/><Input name="deadline" type="date" required/><Button>{t.save}</Button></form></Card><div className="grid gap-4 md:grid-cols-2">{data.goals.map((goal) => { const progress = Number(goal.currentAmount)/Number(goal.targetAmount)*100; const months = Math.max(1, differenceInMonths(goal.deadline, new Date())); const contribution = (Number(goal.targetAmount)-Number(goal.currentAmount))/months; return <Card key={goal.id}><CardTitle>{goal.name}</CardTitle><p className="mt-2 text-sm text-muted-foreground">{t.deadline} {goal.deadline.toISOString().slice(0,10)} • {t.estimated} {formatCurrency(contribution, user.currency)}/{t.perMonth}</p><div className="mt-4"><Progress value={progress}/></div><p className="mt-2 font-semibold">{formatCurrency(Number(goal.currentAmount), user.currency)} / {formatCurrency(Number(goal.targetAmount), user.currency)} ({pct(progress)})</p><form action={upsertGoal} className="mt-4 grid gap-2"><input type="hidden" name="id" value={goal.id}/><Input name="name" defaultValue={goal.name}/><Input name="targetAmount" type="number" step="0.01" defaultValue={Number(goal.targetAmount)}/><Input name="currentAmount" type="number" step="0.01" defaultValue={Number(goal.currentAmount)}/><Input name="deadline" type="date" defaultValue={goal.deadline.toISOString().slice(0,10)}/><Button variant="secondary">{t.update}</Button></form><form action={deleteGoal} className="mt-2"><input type="hidden" name="id" value={goal.id}/><Button variant="ghost">{t.delete}</Button></form></Card>; })}</div></div>;
}
