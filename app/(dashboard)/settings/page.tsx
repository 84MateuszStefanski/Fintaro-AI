import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/data";
import { updatePassword, updateSettings } from "@/lib/actions";
import { getDictionary } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default async function SettingsPage(){
  const sessionUser=await requireUser();
  const user=await prisma.user.findUniqueOrThrow({where:{id:sessionUser.id}});
  const t=getDictionary(user.language);
  const prefs=user.aiPreferences as {monthlySummaries?:boolean; spendingAlerts?:boolean; investmentTips?:boolean};
  return <div className="space-y-6"><h1 className="text-4xl font-black">{t.settings}</h1><Card><CardTitle>{t.profilePreferences}</CardTitle><form action={updateSettings} className="mt-4 grid gap-4 md:grid-cols-2"><Input name="name" defaultValue={user.name??''} placeholder={t.name}/><Input name="currency" defaultValue={user.currency}/><select name="language" defaultValue={user.language} className="rounded-xl border bg-background px-3 py-2" aria-label={t.language}><option value="en">{t.english}</option><option value="pl">{t.polish}</option></select><select name="theme" defaultValue={user.theme} className="rounded-xl border bg-background px-3 py-2"><option value="LIGHT">Light</option><option value="DARK">Dark</option><option value="SYSTEM">System</option></select><div className="space-y-2 text-sm"><label className="block"><input name="monthlySummaries" type="checkbox" defaultChecked={prefs.monthlySummaries}/> {t.monthlySummaries}</label><label className="block"><input name="spendingAlerts" type="checkbox" defaultChecked={prefs.spendingAlerts}/> {t.spendingAlerts}</label><label className="block"><input name="investmentTips" type="checkbox" defaultChecked={prefs.investmentTips}/> {t.investmentTips}</label></div><Button className="md:col-span-2">{t.saveSettings}</Button></form></Card><Card><CardTitle>{t.updatePassword}</CardTitle><form action={updatePassword} className="mt-4 flex gap-3"><Input name="password" type="password" placeholder={t.newPassword}/><Button>{t.update}</Button></form></Card></div>;
}
