import { Bot } from "lucide-react";
import { AssistantChat } from "@/components/assistant-chat";
import { getFinancialSnapshot, requireUser } from "@/lib/data";
import { getUserDictionary } from "@/lib/i18n";
import { Card, CardTitle } from "@/components/ui/card";

export default async function AssistantPage() {
  const user=await requireUser();
  const data=await getFinancialSnapshot(user.id);
  const t=await getUserDictionary(user.id);
  return <div className="space-y-6"><h1 className="text-4xl font-black">{t.aiAssistant}</h1><Card><div className="flex gap-3"><Bot className="text-primary"/><div><CardTitle>{t.personalFinanceCopilot}</CardTitle><p className="text-sm text-muted-foreground">{t.aiAssistantDescription}</p></div></div><div className="mt-6"><AssistantChat intro={t.askAiIntro} placeholder={t.askAiPlaceholder} thinkingLabel={t.thinking} askLabel={t.askAi}/></div></Card><div className="grid gap-4 md:grid-cols-3">{data.insights.map(i=><Card key={i.id}><p className="text-xs uppercase text-primary">{i.category} • {i.severity}</p><CardTitle className="mt-2">{i.title}</CardTitle><p className="mt-2 text-sm text-muted-foreground">{i.content}</p></Card>)}</div></div>;
}
