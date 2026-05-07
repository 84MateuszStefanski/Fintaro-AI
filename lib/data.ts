import { endOfMonth, format, startOfMonth, subMonths } from "date-fns";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function requireUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  return session.user;
}

export async function getFinancialSnapshot(userId: string) {
  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);
  const [transactions, budgets, goals, investments, insights, notifications] = await Promise.all([
    prisma.transaction.findMany({ where: { userId }, orderBy: { date: "desc" } }),
    prisma.budget.findMany({ where: { userId, month: monthStart } }),
    prisma.savingsGoal.findMany({ where: { userId }, orderBy: { deadline: "asc" } }),
    prisma.investment.findMany({ where: { userId } }),
    prisma.aIInsight.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.notification.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, take: 8 })
  ]);
  const monthly = transactions.filter((t) => t.date >= monthStart && t.date <= monthEnd);
  const income = monthly.filter((t) => t.type === "INCOME").reduce((s, t) => s + Number(t.amount), 0);
  const expenses = monthly.filter((t) => t.type === "EXPENSE").reduce((s, t) => s + Number(t.amount), 0);
  const investmentValue = investments.reduce((s, i) => s + Number(i.quantity) * Number(i.currentPrice), 0);
  const totalBalance = income - expenses + goals.reduce((s, g) => s + Number(g.currentAmount), 0) + investmentValue;
  const savingsRate = income ? ((income - expenses) / income) * 100 : 0;
  const healthScore = Math.max(35, Math.min(98, Math.round(60 + savingsRate * 0.45 + (notifications.filter((n) => !n.read).length ? -4 : 6))));
  const byCategory = Object.values(transactions.filter((t) => t.type === "EXPENSE").reduce<Record<string, { name: string; value: number }>>((acc, t) => {
    acc[t.category] ??= { name: t.category, value: 0 };
    acc[t.category].value += Number(t.amount);
    return acc;
  }, {})).sort((a, b) => b.value - a.value);
  const monthlySeries = Array.from({ length: 6 }, (_, i) => startOfMonth(subMonths(now, 5 - i))).map((date) => {
    const rows = transactions.filter((t) => t.date >= date && t.date <= endOfMonth(date));
    return { month: format(date, "MMM"), income: rows.filter((t) => t.type === "INCOME").reduce((s, t) => s + Number(t.amount), 0), expenses: rows.filter((t) => t.type === "EXPENSE").reduce((s, t) => s + Number(t.amount), 0) };
  });
  return { transactions, budgets, goals, investments, insights, notifications, income, expenses, investmentValue, totalBalance, savingsRate, healthScore, byCategory, monthlySeries };
}
