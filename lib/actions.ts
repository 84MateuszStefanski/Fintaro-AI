"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/data";

function monthStart(value?: FormDataEntryValue | null) { const d = value ? new Date(String(value)) : new Date(); return new Date(d.getFullYear(), d.getMonth(), 1); }

export async function upsertTransaction(formData: FormData) {
  const user = await requireUser();
  const id = String(formData.get("id") || "");
  const data = { userId: user.id, amount: String(formData.get("amount")), type: String(formData.get("type")) as "INCOME" | "EXPENSE", category: String(formData.get("category")), date: new Date(String(formData.get("date"))), description: String(formData.get("description")) };
  if (id) await prisma.transaction.update({ where: { id, userId: user.id }, data }); else await prisma.transaction.create({ data });
  revalidatePath("/transactions"); revalidatePath("/dashboard");
}
export async function deleteTransaction(formData: FormData) { const user = await requireUser(); await prisma.transaction.delete({ where: { id: String(formData.get("id")), userId: user.id } }); revalidatePath("/transactions"); }
export async function upsertBudget(formData: FormData) { const user = await requireUser(); const id = String(formData.get("id") || ""); const data = { userId: user.id, category: String(formData.get("category")), limit: String(formData.get("limit")), month: monthStart(formData.get("month")) }; if (id) await prisma.budget.update({ where: { id, userId: user.id }, data }); else await prisma.budget.create({ data }); revalidatePath("/budgets"); }
export async function deleteBudget(formData: FormData) { const user = await requireUser(); await prisma.budget.delete({ where: { id: String(formData.get("id")), userId: user.id } }); revalidatePath("/budgets"); }
export async function upsertGoal(formData: FormData) { const user = await requireUser(); const id = String(formData.get("id") || ""); const data = { userId: user.id, name: String(formData.get("name")), targetAmount: String(formData.get("targetAmount")), currentAmount: String(formData.get("currentAmount")), deadline: new Date(String(formData.get("deadline"))) }; if (id) await prisma.savingsGoal.update({ where: { id, userId: user.id }, data }); else await prisma.savingsGoal.create({ data }); revalidatePath("/goals"); }
export async function deleteGoal(formData: FormData) { const user = await requireUser(); await prisma.savingsGoal.delete({ where: { id: String(formData.get("id")), userId: user.id } }); revalidatePath("/goals"); }
export async function upsertInvestment(formData: FormData) { const user = await requireUser(); const id = String(formData.get("id") || ""); const data = { userId: user.id, assetName: String(formData.get("assetName")), symbol: String(formData.get("symbol")).toUpperCase(), type: String(formData.get("type")) as "STOCK" | "ETF" | "CRYPTO" | "CASH", quantity: String(formData.get("quantity")), purchasePrice: String(formData.get("purchasePrice")), currentPrice: String(formData.get("currentPrice")) }; if (id) await prisma.investment.update({ where: { id, userId: user.id }, data }); else await prisma.investment.create({ data }); revalidatePath("/investments"); }
export async function deleteInvestment(formData: FormData) { const user = await requireUser(); await prisma.investment.delete({ where: { id: String(formData.get("id")), userId: user.id } }); revalidatePath("/investments"); }
export async function updateSettings(formData: FormData) { const user = await requireUser(); await prisma.user.update({ where: { id: user.id }, data: { name: String(formData.get("name")), currency: String(formData.get("currency")), language: String(formData.get("language")) === "pl" ? "pl" : "en", theme: String(formData.get("theme")) as "LIGHT" | "DARK" | "SYSTEM", aiPreferences: { monthlySummaries: formData.get("monthlySummaries") === "on", spendingAlerts: formData.get("spendingAlerts") === "on", investmentTips: formData.get("investmentTips") === "on" } } }); revalidatePath("/settings"); revalidatePath("/dashboard", "layout"); }
export async function updatePassword(formData: FormData) { const user = await requireUser(); const password = String(formData.get("password")); if (password.length >= 8) await prisma.user.update({ where: { id: user.id }, data: { passwordHash: await bcrypt.hash(password, 12) } }); }
