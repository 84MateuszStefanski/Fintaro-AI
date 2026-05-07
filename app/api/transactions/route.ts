import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/data";

export async function GET() {
  const user = await requireUser();
  const transactions = await prisma.transaction.findMany({ where: { userId: user.id }, orderBy: { date: "desc" } });
  return NextResponse.json(transactions);
}

export async function POST(req: Request) {
  const user = await requireUser();
  const body = await req.json();
  const transaction = await prisma.transaction.create({ data: { userId: user.id, amount: body.amount, type: body.type, category: body.category, date: new Date(body.date), description: body.description } });
  return NextResponse.json(transaction, { status: 201 });
}
