import clsx from "clsx";
import { FileSpreadsheet } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/ui/motion";
import { btn, Section, SectionHeader } from "@/components/ui/primitives";
import { laporanInfo, ringkasanKas, transaksiTerbaru } from "@/data/kas";
import { dateShort, monthYear } from "@/lib/format";
import { KasChart } from "./KasChart";
import { KasTable, StatTiles } from "./KasParts";

export function kasTiles() {
  const { now, prev, iuran } = ringkasanKas();
  return [
    { label: "Saldo Akhir", value: now.saldo, kind: "rp" as const, delta: { value: now.saldo - prev.saldo, goodWhenUp: true } },
    { label: "Pemasukan Bulan Tercatat", value: now.masuk, kind: "rp" as const, delta: { value: now.masuk - prev.masuk, goodWhenUp: true } },
    { label: "Pengeluaran Bulan Tercatat", value: now.keluar, kind: "rp" as const, delta: { value: now.keluar - prev.keluar, goodWhenUp: false } },
    { label: "Iuran Diterima Bulan Tercatat", value: iuran, kind: "rp" as const },
  ];
}

export function KasRingkasan() {
  const { rekap, now } = ringkasanKas();
  return (
    <Section id="kas">
      <SectionHeader
        eyebrow={`Kas RT · ${monthYear(`${now.bulan}-01`)}`}
        title="Ringkasan kas, terbuka untuk semua warga"
        intro="Bersumber dari buku kas RT. Saldo dihitung dari saldo awal dan transaksi yang tercatat; arsip tiap tahun tersedia di laporan lengkap."
        link={{ href: "/kas", label: "Laporan kas lengkap" }}
      />
      <StatTiles tiles={kasTiles()} />

      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        <Reveal direction="right" className="rounded-lg bg-surface p-4 shadow-soft ring-1 ring-line/60 md:p-6 lg:col-span-7">
          <h3 className="mb-4 text-lg font-semibold">Pemasukan, pengeluaran & saldo per bulan</h3>
          <KasChart data={rekap} />
        </Reveal>
        <Reveal direction="left" delay={0.1} className="lg:col-span-5">
          <h3 className="mb-4 text-lg font-semibold">Transaksi terbaru</h3>
          <KasTable rows={transaksiTerbaru(7)} compact />
        </Reveal>
      </div>

      <Reveal className="mt-6 flex flex-col gap-3 rounded-lg border border-dashed border-primary-300 bg-primary-50 p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 text-[14px] text-primary-900">
          <FileSpreadsheet className="size-5 shrink-0 text-primary-600" />
          Data tercatat sampai {dateShort(laporanInfo.diperbarui)} · Sumber: buku kas RT
        </p>
        <div className="flex gap-2">
          <Link href="/kas" className={clsx(btn.base, btn.outline, "h-10 md:h-10 text-sm")}>
            Lihat arsip tahunan
          </Link>
        </div>
      </Reveal>
    </Section>
  );
}
