import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();
  if (!email || !password || password.length < 8) return NextResponse.json({ error: "Valid email and 8+ character password required." }, { status: 400 });
  const exists = await prisma.user.findUnique({ where: { email: String(email).toLowerCase() } });
  if (exists) return NextResponse.json({ error: "Email is already registered." }, { status: 409 });
  const user = await prisma.user.create({ data: { name, email: String(email).toLowerCase(), passwordHash: await bcrypt.hash(password, 12) } });
  return NextResponse.json({ id: user.id });
}
