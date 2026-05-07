import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const month = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

async function main() {
  const passwordHash = await bcrypt.hash("demo1234", 12);
  const user = await prisma.user.upsert({
    where: { email: "demo@fintaro.ai" },
    update: { passwordHash },
    create: { name: "Demo Financier", email: "demo@fintaro.ai", passwordHash, currency: "USD" }
  });
  await prisma.notification.deleteMany({ where: { userId: user.id } });
  await prisma.aIInsight.deleteMany({ where: { userId: user.id } });
  await prisma.investment.deleteMany({ where: { userId: user.id } });
  await prisma.savingsGoal.deleteMany({ where: { userId: user.id } });
  await prisma.budget.deleteMany({ where: { userId: user.id } });
  await prisma.transaction.deleteMany({ where: { userId: user.id } });

  const transactions = [
    [5200, "INCOME", "Salary", 2, "May salary"], [600, "INCOME", "Freelance", 12, "Design retainer"], [2100, "EXPENSE", "Housing", 3, "Rent"], [420, "EXPENSE", "Groceries", 5, "Whole market"], [165, "EXPENSE", "Dining", 8, "Client dinner"], [95, "EXPENSE", "Transport", 9, "Transit card"], [140, "EXPENSE", "Subscriptions", 10, "SaaS bundle"], [360, "EXPENSE", "Travel", 14, "Weekend trip"], [75, "EXPENSE", "Fitness", 18, "Gym"], [240, "EXPENSE", "Utilities", 20, "Power and internet"],
    [5150, "INCOME", "Salary", -28, "April salary"], [380, "EXPENSE", "Groceries", -22, "Groceries"], [180, "EXPENSE", "Dining", -18, "Restaurants"], [2100, "EXPENSE", "Housing", -26, "Rent"], [520, "EXPENSE", "Shopping", -13, "Work wardrobe"],
    [5100, "INCOME", "Salary", -58, "March salary"], [2100, "EXPENSE", "Housing", -57, "Rent"], [340, "EXPENSE", "Groceries", -51, "Groceries"], [130, "EXPENSE", "Transport", -46, "Ride share"]
  ] as const;
  await prisma.transaction.createMany({ data: transactions.map(([amount, type, category, offset, description]) => ({ userId: user.id, amount, type, category, description, date: new Date(Date.now() + Number(offset) * 86400000) })) });
  await prisma.budget.createMany({ data: [
    { userId: user.id, category: "Groceries", limit: 550, month }, { userId: user.id, category: "Dining", limit: 250, month }, { userId: user.id, category: "Transport", limit: 180, month }, { userId: user.id, category: "Travel", limit: 300, month }, { userId: user.id, category: "Subscriptions", limit: 160, month }
  ] });
  await prisma.savingsGoal.createMany({ data: [
    { userId: user.id, name: "Emergency fund", targetAmount: 18000, currentAmount: 9400, deadline: new Date("2026-12-31") }, { userId: user.id, name: "Japan vacation", targetAmount: 6500, currentAmount: 2200, deadline: new Date("2026-10-15") }, { userId: user.id, name: "House deposit", targetAmount: 60000, currentAmount: 18500, deadline: new Date("2028-06-01") }
  ] });
  await prisma.investment.createMany({ data: [
    { userId: user.id, assetName: "Vanguard Total Stock Market ETF", symbol: "VTI", type: "ETF", quantity: 42, purchasePrice: 224, currentPrice: 265 }, { userId: user.id, assetName: "Apple", symbol: "AAPL", type: "STOCK", quantity: 18, purchasePrice: 155, currentPrice: 192 }, { userId: user.id, assetName: "Bitcoin", symbol: "BTC", type: "CRYPTO", quantity: 0.22, purchasePrice: 64000, currentPrice: 82000 }, { userId: user.id, assetName: "High-yield cash", symbol: "CASH", type: "CASH", quantity: 1, purchasePrice: 7000, currentPrice: 7000 }
  ] });
  await prisma.aIInsight.createMany({ data: [
    { userId: user.id, title: "Dining spike detected", category: "spending", severity: "warning", content: "Dining is trending 22% above your three-month average. Consider a weekly cap of $55 to return under budget." },
    { userId: user.id, title: "Savings goal acceleration", category: "savings", severity: "info", content: "Redirecting $180 from travel this month would move your Japan vacation goal nine days ahead of schedule." },
    { userId: user.id, title: "Portfolio concentration", category: "investment", severity: "info", content: "Your equity exposure is healthy, but single-stock positions should remain below your preferred risk threshold." }
  ] });
  await prisma.notification.createMany({ data: [
    { userId: user.id, title: "Travel budget exceeded", message: "Travel is above the monthly limit. Review recent trip expenses.", type: "budget", read: false },
    { userId: user.id, title: "Savings deadline approaching", message: "Japan vacation needs about $860 per month to stay on track.", type: "goal", read: false },
    { userId: user.id, title: "Monthly summary ready", message: "Your Fintaro AI summary is available with three actions to improve cash flow.", type: "ai", read: true },
    { userId: user.id, title: "Unusual spending detected", message: "Shopping spend was materially higher than usual last month.", type: "anomaly", read: false }
  ] });
}

main().finally(async () => prisma.$disconnect());
