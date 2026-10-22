import { ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { KasChart } from "@/components/sections/KasChart";
import { KasExplorer } from "@/components/sections/KasExplorer";
import { StatTiles } from "@/components/sections/KasParts";
import { kasTiles } from "@/components/sections/KasRingkasan";
import { Reveal } from "@/components/ui/motion";
import { PageHeader, Section } from "@/components/ui/primitives";
import { laporanInfo, rekapBulanan, saldoAwal } from "@/data/kas";
import { dateShort, rupiah } from "@/lib/format";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Laporan Kas RT",
  description:
    "Laporan kas RT 02 / RW 03 Jatiluhur yang terbuka untuk seluruh warga: pemasukan, pengeluaran, dan saldo per bulan, lengkap dengan grafik dan daftar transaksi.",
  path: "/kas",
});

export default function KasPage() {
  return (
    <>
      <PageHeader title="Laporan Kas RT" intro={`Saldo awal ${rupiah(saldoAwal.nominal)} per ${dateShort(saldoAwal.tanggal)}. Diperbarui ${dateShort(laporanInfo.diperbarui)}.`} crumbs={[{ label: "Beranda", href: "/" }, { label: "Kas RT" }]} />
      <Section>
        <StatTiles tiles={kasTiles()} />
        <Reveal className="mt-6 rounded-lg bg-surface p-4 shadow-soft ring-1 ring-line/60 md:p-6">
          <h2 className="mb-4 text-lg font-semibold">Pemasukan, pengeluaran & saldo per bulan</h2>
          <KasChart data={rekapBulanan()} height={380} />
        </Reveal>
        <Reveal className="mt-10">
          <h2 className="mb-4 text-[24px] font-bold">Semua transaksi</h2>
          <KasExplorer />
        </Reveal>
        <Reveal className="mt-8 flex gap-3 rounded-lg bg-primary-50 p-4 text-[14px] text-primary-900">
          <ShieldCheck className="size-5 shrink-0 text-primary-600" />
          Demi privasi, iuran ditampilkan agregat per bulan — tidak per nama warga. Bukti transaksi dapat diperiksa langsung ke Bendahara.
        </Reveal>
      </Section>
    </>
  );
}
