import OpenAI from "openai";
import { getFinancialSnapshot } from "@/lib/data";

export async function generateFinancialInsight(userId: string, question: string) {
  const data = await getFinancialSnapshot(userId);
  const context = { income: data.income, expenses: data.expenses, savingsRate: data.savingsRate, topCategories: data.byCategory.slice(0, 5), budgets: data.budgets.map((b) => ({ category: b.category, limit: Number(b.limit) })), goals: data.goals.map((g) => ({ name: g.name, target: Number(g.targetAmount), current: Number(g.currentAmount) })) };
  if (!process.env.OPENAI_API_KEY) return mockInsight(question, context);
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const completion = await openai.chat.completions.create({ model: "gpt-4o-mini", messages: [{ role: "system", content: "You are Fintaro AI, a concise fiduciary-style personal finance assistant. Use the user's provided financial data; do not invent account details." }, { role: "user", content: `Question: ${question}\nFinancial data: ${JSON.stringify(context)}` }], temperature: 0.4 });
  return completion.choices[0]?.message.content ?? mockInsight(question, context);
}

function mockInsight(question: string, context: { income: number; expenses: number; savingsRate: number; topCategories: { name: string; value: number }[] }) {
  const top = context.topCategories[0];
  return `Mock AI insight: your savings rate is ${Math.round(context.savingsRate)}%. ${top ? `${top.name} is currently your largest spending category at $${Math.round(top.value)}.` : "Add more transactions for sharper category analysis."} For “${question}”, prioritize a 10% expense reduction, automate transfers after payday, and review budget alerts weekly.`;
}
