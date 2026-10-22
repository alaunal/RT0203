"use client";

import clsx from "clsx";
import { ImageOff } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { aktivitasSorted } from "@/data/aktivitas";
import { kategori, type KategoriId } from "@/data/kategori";
import { monthYear } from "@/lib/format";
import { ActivityCard } from "./ActivityCard";

export function AktivitasGrid() {
  const [kat, setKat] = useState<KategoriId | "semua">("semua");
  const [bulan, setBulan] = useState("semua");

  const bulanList = useMemo(() => Array.from(new Set(aktivitasSorted.map((a) => a.tanggal.slice(0, 7)))), []);
  const katList = useMemo(() => Array.from(new Set(aktivitasSorted.map((a) => a.kategori))), []);
  const items = aktivitasSorted.filter((a) => (kat === "semua" || a.kategori === kat) && (bulan === "semua" || a.tanggal.startsWith(bulan)));

  return (
    <>
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:flex-wrap md:px-0" role="tablist" aria-label="Filter kategori">
          {(["semua", ...katList] as const).map((k) => (
            <button
              key={k}
              type="button"
              role="tab"
              aria-selected={kat === k}
              onClick={() => setKat(k)}
              className={clsx("relative h-9 shrink-0 rounded-full px-4 text-sm font-semibold transition-colors", kat === k ? "text-white" : "bg-surface text-muted ring-1 ring-line hover:text-ink")}
            >
              {kat === k && <motion.span layoutId="akt-chip" className="absolute inset-0 rounded-full bg-primary-600" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
              <span className="relative">{k === "semua" ? "Semua" : kategori[k].label}</span>
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm font-medium">
          Bulan
          <select value={bulan} onChange={(e) => setBulan(e.target.value)} className="h-10 rounded-md border border-line bg-surface px-3 capitalize outline-none focus:ring-[3px] focus:ring-primary-300/50">
            <option value="semua">Semua bulan</option>
            {bulanList.map((b) => (
              <option key={b} value={b}>{monthYear(`${b}-01`)}</option>
            ))}
          </select>
        </label>
      </div>

      <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {items.map((a, i) => (
            <motion.div
              key={a.slug}
              layout
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.35, delay: Math.min(i, 6) * 0.05 }}
            >
              <ActivityCard a={a} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {items.length === 0 && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-2 py-16 text-center text-muted">
          <ImageOff className="size-10" strokeWidth={1.5} /> Belum ada aktivitas untuk filter ini.
        </motion.p>
      )}
    </>
  );
}
