"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AssistantChatProps = {
  intro?: string;
  placeholder?: string;
  thinkingLabel?: string;
  askLabel?: string;
};

export function AssistantChat({ intro = "Ask Fintaro AI about savings, budgets, unusual spending or your monthly summary.", placeholder = "How can I save more this month?", thinkingLabel = "Thinking...", askLabel = "Ask AI" }: AssistantChatProps) {
  const [answer,setAnswer]=useState(intro);
  const [loading,setLoading]=useState(false);
  async function ask(formData: FormData){ setLoading(true); const res=await fetch('/api/ai',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question:formData.get('question')})}); const json=await res.json(); setAnswer(json.answer); setLoading(false);}
  return <div><form action={ask} className="flex gap-3"><Input name="question" placeholder={placeholder}/><Button disabled={loading}>{loading?thinkingLabel:askLabel}</Button></form><div className="mt-5 rounded-2xl bg-muted p-5 leading-7 text-muted-foreground">{answer}</div></div>;
}
