import { NextResponse } from "next/server";
import { generateFinancialInsight } from "@/lib/ai";
import { requireUser } from "@/lib/data";

export async function POST(req: Request) {
  const user = await requireUser();
  const { question } = await req.json();
  const answer = await generateFinancialInsight(user.id, question || "Give me a monthly summary");
  return NextResponse.json({ answer, mocked: !process.env.OPENAI_API_KEY });
}
