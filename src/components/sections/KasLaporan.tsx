"use client";

import { useState } from "react";
import { rekapBulanan, rekapTahunan, tahunKas, tahunTerbaru } from "@/data/kas";
import { dateShort, rupiah } from "@/lib/format";
import { KasChart } from "./KasChart";
import { KasExplorer } from "./KasExplorer";
import { StatTiles } from "./KasParts";

export function KasLaporan() {
  const [tahun, setTahun] = useState(tahunTerbaru);
  const tahunan = rekapTahunan();
  const laporan = tahunan.find((r) => r.tahun === tahun)!;
  const rekap = rekapBulanan(tahun);
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Laporan tahun {tahun}</h2>
          <p className="mt-1 text-sm text-muted">{laporan.jumlahTransaksi} transaksi · Tercatat sampai {dateShort(laporan.sampai)}</p>
        </div>
        <label className="flex flex-col gap-1 text-sm font-semibold">
          Tahun laporan
          <select value={tahun} onChange={(e) => setTahun(e.target.value)} className="h-11 min-w-40 rounded-md border border-line bg-surface px-3 focus:ring-2 focus:ring-primary-300">
            {tahunKas.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </label>
      </div>
      <div aria-live="polite">
        <StatTiles tiles={[
          { label: `Saldo Awal ${tahun}`, value: laporan.saldoAwal, kind: "rp" },
          { label: `Pemasukan ${tahun}`, value: laporan.masuk, kind: "rp" },
          { label: `Pengeluaran ${tahun}`, value: laporan.keluar, kind: "rp" },
          { label: `Saldo Akhir Tercatat ${tahun}`, value: laporan.saldoAkhir, kind: "rp" },
        ]} />
      </div>
      <div className="mt-6 rounded-lg bg-surface p-4 shadow-soft ring-1 ring-line/60 md:p-6">
        <h3 className="mb-4 text-lg font-semibold">Pemasukan, pengeluaran & saldo bulanan · {tahun}</h3>
        <KasChart data={rekap} height={380} />
      </div>
      <div className="mt-10">
        <h3 className="mb-4 text-2xl font-bold">Transaksi tahun {tahun}</h3>
        <KasExplorer key={tahun} tahun={tahun} />
      </div>
      <div className="mt-10">
        <h3 className="mb-4 text-2xl font-bold">Perbandingan antar-tahun</h3>
        <div className="overflow-x-auto rounded-lg bg-surface shadow-soft ring-1 ring-line/60">
          <table className="w-full min-w-[720px] text-sm">
            <caption className="sr-only">Rekap kas setiap tahun; saldo awal tidak dihitung sebagai pemasukan.</caption>
            <thead className="bg-surface-alt text-left text-muted"><tr>
              {['Tahun', 'Saldo awal', 'Pemasukan', 'Pengeluaran', 'Saldo akhir'].map((h) => <th key={h} scope="col" className="px-4 py-3">{h}</th>)}
            </tr></thead>
            <tbody>{tahunan.map((r) => <tr key={r.tahun} className="border-t border-line">
              <th scope="row" className="px-4 py-3 text-left"><button type="button" onClick={() => setTahun(r.tahun)} aria-label={`Lihat laporan tahun ${r.tahun}`} aria-pressed={tahun === r.tahun} className="min-h-11 font-bold text-primary-600 underline underline-offset-4">{r.tahun}</button><span className="block text-xs font-normal text-muted">s.d. {dateShort(r.sampai)}</span></th>
              <td className="tabular whitespace-nowrap px-4 py-3">{rupiah(r.saldoAwal)}</td>
              <td className="tabular whitespace-nowrap px-4 py-3 text-income">{rupiah(r.masuk)}</td>
              <td className="tabular whitespace-nowrap px-4 py-3 text-expense">{rupiah(r.keluar)}</td>
              <td className="tabular whitespace-nowrap px-4 py-3 font-bold">{rupiah(r.saldoAkhir)}</td>
            </tr>)}</tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-muted">Saldo akhir menjadi saldo awal tahun berikutnya. Tahun {tahunTerbaru} mencakup data yang tersedia sampai {dateShort(tahunan.at(-1)!.sampai)}.</p>
      </div>
    </div>
  );
}
