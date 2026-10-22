"use client";

import { useInView } from "motion/react";
import { useRef } from "react";
import { Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { RekapBulan } from "@/data/kas";
import { rupiah, rupiahShort } from "@/lib/format";

/** Grafik baru di-mount saat terlihat → animasi bar/garis bawaan Recharts berjalan di depan mata pengguna. */
export function KasChart({ data, height = 340 }: { data: RekapBulan[]; height?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <div ref={ref} style={{ height }} role="img" aria-label={`Grafik kas: ${data.map((d) => `${d.label} masuk ${rupiah(d.masuk)}, keluar ${rupiah(d.keluar)}, saldo ${rupiah(d.saldo)}`).join("; ")}`}>
      {inView && (
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 8, right: 8, left: -8, bottom: 0 }} barGap={4}>
            <CartesianGrid vertical={false} stroke="#E2E0D8" strokeDasharray="4 4" />
            <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: "#5C5A52", fontSize: 12 }} />
            <YAxis tickFormatter={rupiahShort} tickLine={false} axisLine={false} tick={{ fill: "#5C5A52", fontSize: 12 }} width={56} />
            <Tooltip
              cursor={{ fill: "rgba(31,111,74,.06)" }}
              formatter={(v, name) => [rupiah(Number(v)), String(name)]}
              contentStyle={{ borderRadius: 12, border: "1px solid #E2E0D8", boxShadow: "0 4px 16px rgba(28,27,24,.08)", fontSize: 13 }}
            />
            <Legend iconType="circle" wrapperStyle={{ fontSize: 13, paddingTop: 8 }} />
            <Bar dataKey="masuk" name="Pemasukan" fill="#1F6F4A" radius={[6, 6, 0, 0]} maxBarSize={28} animationDuration={900} />
            <Bar dataKey="keluar" name="Pengeluaran" fill="#C2412D" radius={[6, 6, 0, 0]} maxBarSize={28} animationDuration={900} animationBegin={150} />
            <Line dataKey="saldo" name="Saldo" type="monotone" stroke="#E8A33D" strokeWidth={3} dot={{ r: 4, fill: "#E8A33D", strokeWidth: 0 }} activeDot={{ r: 6 }} animationDuration={1400} animationBegin={500} />
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
