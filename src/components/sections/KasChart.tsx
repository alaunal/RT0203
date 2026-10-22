"use client";

import { useInView } from "motion/react";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { Shimmer, useNearView } from "@/components/ui/lazy";
import type { RekapBulan } from "@/data/kas";
import { rupiah } from "@/lib/format";

const loadPlot = () => import("./KasChartPlot");
const Plot = dynamic(loadPlot, { ssr: false, loading: () => <Shimmer className="h-full rounded-md" /> });

/**
 * Recharts diunduh saat grafik mendekati layar, lalu di-mount saat terlihat
 * → animasi bar/garis bawaan Recharts berjalan di depan mata pengguna.
 */
export function KasChart({ data, height = 340 }: { data: RekapBulan[]; height?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const near = useNearView(ref, "600px 0px");
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  useEffect(() => {
    if (near) loadPlot();
  }, [near]);

  return (
    <div ref={ref} style={{ height }} role="img" aria-label={`Grafik kas: ${data.map((d) => `${d.label} masuk ${rupiah(d.masuk)}, keluar ${rupiah(d.keluar)}, saldo ${rupiah(d.saldo)}`).join("; ")}`}>
      {inView && <Plot data={data} />}
    </div>
  );
}
