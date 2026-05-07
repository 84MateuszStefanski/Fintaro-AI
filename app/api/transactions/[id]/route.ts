import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/data";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await params;
  const body = await req.json();
  const transaction = await prisma.transaction.update({ where: { id, userId: user.id }, data: { ...body, ...(body.date ? { date: new Date(body.date) } : {}) } });
  return NextResponse.json(transaction);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await params;
  await prisma.transaction.delete({ where: { id, userId: user.id } });
  return NextResponse.json({ ok: true });
}
