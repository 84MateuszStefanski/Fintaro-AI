"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AssistantChat() { const [answer,setAnswer]=useState("Ask Fintaro AI about savings, budgets, unusual spending or your monthly summary."); const [loading,setLoading]=useState(false); async function ask(formData: FormData){ setLoading(true); const res=await fetch('/api/ai',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question:formData.get('question')})}); const json=await res.json(); setAnswer(json.answer); setLoading(false);} return <div><form action={ask} className="flex gap-3"><Input name="question" placeholder="How can I save more this month?"/><Button disabled={loading}>{loading?'Thinking...':'Ask AI'}</Button></form><div className="mt-5 rounded-2xl bg-muted p-5 leading-7 text-muted-foreground">{answer}</div></div>; }
