"use client";

import clsx from "clsx";
import { ChevronLeft, ChevronRight, FileSpreadsheet } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { kategoriKas, rekapBulanan, transaksi } from "@/data/kas";
import { dateShort, monthYear, rupiah } from "@/lib/format";

const PER_PAGE = 12;

export function KasExplorer() {
  const bulanList = useMemo(() => rekapBulanan().map((r) => r.bulan).reverse(), []);
  const [bulan, setBulan] = useState("semua");
  const [kat, setKat] = useState("semua");
  const [jenis, setJenis] = useState<"semua" | "masuk" | "keluar">("semua");
  const [page, setPage] = useState(0);

  const rows = useMemo(
    () =>
      [...transaksi]
        .sort((a, b) => b.tanggal.localeCompare(a.tanggal))
        .filter((t) => (bulan === "semua" || t.tanggal.startsWith(bulan)) && (kat === "semua" || t.kategori === kat) && (jenis === "semua" || t.jenis === jenis)),
    [bulan, kat, jenis],
  );
  const pages = Math.max(1, Math.ceil(rows.length / PER_PAGE));
  const view = rows.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);
  const totalMasuk = rows.filter((r) => r.jenis === "masuk").reduce((s, r) => s + r.nominal, 0);
  const totalKeluar = rows.filter((r) => r.jenis === "keluar").reduce((s, r) => s + r.nominal, 0);

  const reset = <T,>(fn: (v: T) => void) => (v: T) => {
    fn(v);
    setPage(0);
  };

  const exportCsv = () => {
    const head = "Tanggal,Uraian,Kategori,Jenis,Nominal";
    const body = rows.map((r) => [r.tanggal, `"${r.uraian.replace(/"/g, '""')}"`, r.kategori, r.jenis, r.nominal].join(","));
    const blob = new Blob(["﻿" + [head, ...body].join("\n")], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `kas-rt02-${bulan}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const selectCls = "h-11 rounded-md border border-line bg-surface px-3 text-[15px] outline-none focus:ring-[3px] focus:ring-primary-300/50";

  return (
    <div>
      <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-[repeat(3,minmax(0,1fr))_auto]">
        <label className="flex flex-col gap-1 text-sm font-medium">
          Bulan
          <select className={clsx(selectCls, "capitalize")} value={bulan} onChange={(e) => reset(setBulan)(e.target.value)}>
            <option value="semua">Semua bulan</option>
            {bulanList.map((b) => (
              <option key={b} value={b}>{monthYear(`${b}-01`)}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          Kategori
          <select className={selectCls} value={kat} onChange={(e) => reset(setKat)(e.target.value)}>
            <option value="semua">Semua kategori</option>
            {kategoriKas.map((k) => (
              <option key={k}>{k}</option>
            ))}
          </select>
        </label>
        <div className="flex flex-col gap-1 text-sm font-medium">
          Jenis
          <div className="inline-flex h-11 rounded-md border border-line bg-surface p-1" role="tablist">
            {(["semua", "masuk", "keluar"] as const).map((j) => (
              <button
                key={j}
                type="button"
                role="tab"
                aria-selected={jenis === j}
                onClick={() => reset(setJenis)(j)}
                className={clsx("relative flex-1 rounded-[8px] text-sm font-semibold capitalize transition-colors", jenis === j ? "text-white" : "text-muted hover:text-ink")}
              >
                {jenis === j && <motion.span layoutId="kas-jenis" className={clsx("absolute inset-0 rounded-[8px]", j === "masuk" ? "bg-income" : j === "keluar" ? "bg-expense" : "bg-primary-600")} transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
                <span className="relative">{j}</span>
              </button>
            ))}
          </div>
        </div>
        <button type="button" onClick={exportCsv} className="inline-flex h-11 items-center justify-center gap-2 self-end rounded-md border-[1.5px] border-primary-600 px-4 text-sm font-semibold text-primary-600 transition hover:bg-primary-50">
          <FileSpreadsheet className="size-4" /> Ekspor CSV
        </button>
      </div>

      <div className="mb-4 flex flex-wrap gap-x-6 gap-y-1 text-[15px]">
        <span>{rows.length} transaksi</span>
        <span className="tabular font-semibold text-income">Masuk {rupiah(totalMasuk)}</span>
        <span className="tabular font-semibold text-expense">Keluar {rupiah(totalKeluar)}</span>
      </div>

      <div className="overflow-x-auto rounded-lg bg-surface shadow-soft ring-1 ring-line/60">
        <table className="w-full min-w-[640px] text-[14px]">
          <caption className="sr-only">Daftar transaksi kas</caption>
          <thead className="bg-surface-alt text-left text-[12px] font-bold uppercase tracking-[.04em] text-muted">
            <tr>
              <th scope="col" className="px-4 py-3">Tanggal</th>
              <th scope="col" className="px-4 py-3">Uraian</th>
              <th scope="col" className="px-4 py-3">Kategori</th>
              <th scope="col" className="px-4 py-3 text-right">Masuk</th>
              <th scope="col" className="px-4 py-3 text-right">Keluar</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout" initial={false}>
              {view.map((r, i) => (
                <motion.tr
                  key={r.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.02 }}
                  className="border-t border-line hover:bg-primary-50/60"
                >
                  <td className="tabular whitespace-nowrap px-4 py-3 text-muted">{dateShort(r.tanggal)}</td>
                  <td className="px-4 py-3 font-medium">{r.uraian}</td>
                  <td className="px-4 py-3 text-muted">{r.kategori}</td>
                  <td className="tabular whitespace-nowrap px-4 py-3 text-right font-semibold text-income">{r.jenis === "masuk" ? rupiah(r.nominal) : ""}</td>
                  <td className="tabular whitespace-nowrap px-4 py-3 text-right font-semibold text-expense">{r.jenis === "keluar" ? `−${rupiah(r.nominal)}` : ""}</td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
        {rows.length === 0 && <p className="px-4 py-12 text-center text-muted">Tidak ada transaksi untuk filter ini.</p>}
      </div>

      {pages > 1 && (
        <nav className="mt-5 flex items-center justify-center gap-2" aria-label="Halaman">
          <button type="button" disabled={page === 0} onClick={() => setPage((p) => p - 1)} aria-label="Halaman sebelumnya" className="grid size-10 place-items-center rounded-md border border-line bg-surface disabled:opacity-40">
            <ChevronLeft className="size-5" />
          </button>
          <span className="tabular px-3 text-sm font-semibold">
            {page + 1} / {pages}
          </span>
          <button type="button" disabled={page >= pages - 1} onClick={() => setPage((p) => p + 1)} aria-label="Halaman berikutnya" className="grid size-10 place-items-center rounded-md border border-line bg-surface disabled:opacity-40">
            <ChevronRight className="size-5" />
          </button>
        </nav>
      )}
    </div>
  );
}
