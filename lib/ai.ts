import OpenAI from "openai";
import { prisma } from "@/lib/prisma";
import { getFinancialSnapshot } from "@/lib/data";
import { normalizeLocale } from "@/lib/i18n";

export async function generateFinancialInsight(userId: string, question: string) {
  const data = await getFinancialSnapshot(userId);
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { language: true } });
  const locale = normalizeLocale(user?.language);
  const languageName = locale === "pl" ? "Polish" : "English";
  const context = { income: data.income, expenses: data.expenses, savingsRate: data.savingsRate, topCategories: data.byCategory.slice(0, 5), budgets: data.budgets.map((b) => ({ category: b.category, limit: Number(b.limit) })), goals: data.goals.map((g) => ({ name: g.name, target: Number(g.targetAmount), current: Number(g.currentAmount) })) };
  if (!process.env.OPENAI_API_KEY) return mockInsight(question, context, locale);
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const completion = await openai.chat.completions.create({ model: "gpt-4o-mini", messages: [{ role: "system", content: `You are Fintaro AI, a concise fiduciary-style personal finance assistant. Use the user's provided financial data; do not invent account details. Reply in ${languageName}.` }, { role: "user", content: `Question: ${question}\nFinancial data: ${JSON.stringify(context)}` }], temperature: 0.4 });
  return completion.choices[0]?.message.content ?? mockInsight(question, context, locale);
}

function mockInsight(question: string, context: { income: number; expenses: number; savingsRate: number; topCategories: { name: string; value: number }[] }, locale: "en" | "pl") {
  const top = context.topCategories[0];
  if (locale === "pl") return `Przykładowa wskazówka AI: Twoja stopa oszczędzania wynosi ${Math.round(context.savingsRate)}%. ${top ? `${top.name} to obecnie największa kategoria wydatków: $${Math.round(top.value)}.` : "Dodaj więcej transakcji, aby uzyskać dokładniejszą analizę kategorii."} Dla pytania „${question}” priorytetem jest redukcja wydatków o 10%, automatyczny przelew po wypłacie i cotygodniowy przegląd alertów budżetowych.`;
  return `Mock AI insight: your savings rate is ${Math.round(context.savingsRate)}%. ${top ? `${top.name} is currently your largest spending category at $${Math.round(top.value)}.` : "Add more transactions for sharper category analysis."} For “${question}”, prioritize a 10% expense reduction, automate transfers after payday, and review budget alerts weekly.`;
}
