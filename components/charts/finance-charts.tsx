"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const colors = ["#14b8a6", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444", "#10b981"];

export function IncomeExpenseChart({ data }: { data: { month: string; income: number; expenses: number }[] }) {
  return <ResponsiveContainer width="100%" height={260}><AreaChart data={data}><defs><linearGradient id="income" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#14b8a6" stopOpacity={0.5}/><stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" opacity={0.2}/><XAxis dataKey="month"/><YAxis/><Tooltip/><Area type="monotone" dataKey="income" stroke="#14b8a6" fill="url(#income)"/><Area type="monotone" dataKey="expenses" stroke="#ef4444" fill="#ef444422"/></AreaChart></ResponsiveContainer>;
}

export function CategoryPie({ data }: { data: { name: string; value: number }[] }) {
  return <ResponsiveContainer width="100%" height={260}><PieChart><Pie data={data} dataKey="value" nameKey="name" innerRadius={58} outerRadius={92} paddingAngle={4}>{data.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}</Pie><Tooltip/></PieChart></ResponsiveContainer>;
}

export function AllocationBar({ data }: { data: { name: string; value: number }[] }) {
  return <ResponsiveContainer width="100%" height={260}><BarChart data={data}><CartesianGrid strokeDasharray="3 3" opacity={0.2}/><XAxis dataKey="name"/><YAxis/><Tooltip/><Bar dataKey="value" radius={[10,10,0,0]} fill="#3b82f6" /></BarChart></ResponsiveContainer>;
}
