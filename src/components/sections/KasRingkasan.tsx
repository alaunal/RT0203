import clsx from "clsx";
import { BadgeCheck, FileDown } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/ui/motion";
import { btn, Section, SectionHeader } from "@/components/ui/primitives";
import { laporanInfo, ringkasanKas, transaksiTerbaru } from "@/data/kas";
import { site } from "@/data/site";
import { dateShort, monthYear } from "@/lib/format";
import { KasChart } from "./KasChart";
import { KasTable, StatTiles } from "./KasParts";

export function kasTiles() {
  const { now, prev, kkBayar } = ringkasanKas();
  return [
    { label: "Saldo Akhir", value: now.saldo, kind: "rp" as const, delta: { value: now.saldo - prev.saldo, goodWhenUp: true } },
    { label: "Pemasukan Bulan Ini", value: now.masuk, kind: "rp" as const, delta: { value: now.masuk - prev.masuk, goodWhenUp: true } },
    { label: "Pengeluaran Bulan Ini", value: now.keluar, kind: "rp" as const, delta: { value: now.keluar - prev.keluar, goodWhenUp: false } },
    { label: `Iuran Terkumpul (${kkBayar}/${site.jumlahKK} KK)`, value: Math.round((kkBayar / site.jumlahKK) * 100), kind: "pct" as const },
  ];
}

export function KasRingkasan() {
  const { rekap, now } = ringkasanKas();
  return (
    <Section id="kas">
      <SectionHeader
        eyebrow={`Kas RT · ${monthYear(`${now.bulan}-01`)}`}
        title="Ringkasan kas, terbuka untuk semua warga"
        intro="Saldo dihitung otomatis dari setiap transaksi yang dicatat bendahara."
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
          <BadgeCheck className="size-5 shrink-0 text-primary-600" />
          Diperbarui {dateShort(laporanInfo.diperbarui)} · Diverifikasi {laporanInfo.verifikator}
        </p>
        <div className="flex gap-2">
          <a href="/dokumen/laporan-kas-2026-09.pdf" target="_blank" className={clsx(btn.base, btn.primary, "h-10 md:h-10 text-sm")}>
            <FileDown className="size-4" /> Laporan PDF
          </a>
          <Link href="/kas" className={clsx(btn.base, btn.outline, "h-10 md:h-10 text-sm")}>
            Detail
          </Link>
        </div>
      </Reveal>
    </Section>
  );
}
