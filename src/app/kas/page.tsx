import { ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { KasLaporan } from "@/components/sections/KasLaporan";
import { Reveal } from "@/components/ui/motion";
import { PageHeader, Section } from "@/components/ui/primitives";
import { laporanInfo, tahunKas } from "@/data/kas";
import { dateShort } from "@/lib/format";
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
      <PageHeader title="Laporan Kas RT" intro={`Arsip buku kas ${[...tahunKas].reverse().join(", ")}. Data tercatat sampai ${dateShort(laporanInfo.diperbarui)}.`} crumbs={[{ label: "Beranda", href: "/" }, { label: "Kas RT" }]} />
      <Section>
        <KasLaporan />
        <Reveal className="mt-8 flex gap-3 rounded-lg bg-primary-50 p-4 text-[14px] text-primary-900">
          <ShieldCheck className="size-5 shrink-0 text-primary-600" />
          Nama penyetor iuran dan penerima bantuan disamarkan. Tanggal, nominal, dan arah debit/kredit mengikuti buku kas sumber. Saldo awal tidak dihitung ulang sebagai pemasukan. Bukti transaksi dapat diperiksa ke pengurus.
        </Reveal>
        <details className="mt-4 rounded-lg border border-line p-4 text-sm text-muted">
          <summary className="cursor-pointer font-semibold text-ink">Sumber dan catatan pencatatan</summary>
          <p className="mt-3">Sumber: {laporanInfo.sumber}. Ini merupakan impor file, belum tersinkron otomatis dengan spreadsheet.</p>
          <p className="mt-2">Transaksi “Strip cek kesehatan” pada 14 September 2026 tercatat pada kolom debit sehingga ditampilkan sebagai pemasukan Rp750.000. Pengurus perlu mengonfirmasi klasifikasinya.</p>
          <p className="mt-2">Tanggal mengikuti kolom tanggal sumber, termasuk entri 10 Agustus 2025 yang terletak di antara baris September. Uraian gaji Januari 2026 pada sumber menyebut Desember 2026; tanggal transaksi tetap mengikuti sumber.</p>
        </details>
      </Section>
    </>
  );
}
