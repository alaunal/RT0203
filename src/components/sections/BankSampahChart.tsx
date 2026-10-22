"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { bankSampah as bs } from "@/data/komunitas";

/** Bagian Recharts dari BankSampah — dimuat terpisah (lazy). */
export default function BankSampahChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={bs.trenKg} margin={{ top: 8, right: 4, left: 4, bottom: 0 }}>
        <defs>
          <linearGradient id="kg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0F766E" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#0F766E" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: "#5C5A52", fontSize: 12 }} padding={{ left: 14, right: 14 }} interval={0} />
        <Tooltip formatter={(v) => [`${v} kg`, "Terkumpul"]} contentStyle={{ borderRadius: 12, border: "1px solid #E2E0D8", fontSize: 13 }} />
        <Area type="monotone" dataKey="kg" stroke="#0F766E" strokeWidth={2.5} fill="url(#kg)" animationDuration={1400} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
