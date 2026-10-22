"use client";

import clsx from "clsx";
import { Download, Eye, FileText, FolderOpen, Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { dokumen, kategoriDokumen, type Dokumen } from "@/data/dokumen";
import { dateShort } from "@/lib/format";

const tipeColor: Record<Dokumen["tipe"], string> = { PDF: "#C2412D", DOCX: "#2563A8", XLSX: "#1F6F4A" };

export function DokumenList({ limit, controls = true }: { limit?: number; controls?: boolean }) {
  const [kat, setKat] = useState<string>("Semua");
  const [q, setQ] = useState("");

  const rows = useMemo(() => {
    const list = [...dokumen]
      .sort((a, b) => b.tanggal.localeCompare(a.tanggal))
      .filter((d) => (kat === "Semua" || d.kategori === kat) && d.judul.toLowerCase().includes(q.trim().toLowerCase()));
    return limit ? list.slice(0, limit) : list;
  }, [kat, q, limit]);

  return (
    <div>
      {controls && (
        <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:px-0" role="tablist" aria-label="Filter kategori dokumen">
            {["Semua", ...kategoriDokumen].map((k) => (
              <button
                key={k}
                type="button"
                role="tab"
                aria-selected={kat === k}
                onClick={() => setKat(k)}
                className={clsx("relative h-9 shrink-0 rounded-full px-4 text-sm font-semibold transition-colors", kat === k ? "text-white" : "bg-surface text-muted ring-1 ring-line hover:text-ink")}
              >
                {kat === k && <motion.span layoutId="doc-chip" className="absolute inset-0 rounded-full bg-primary-600" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                <span className="relative">{k}</span>
              </button>
            ))}
          </div>
          <label className="relative block lg:w-72">
            <span className="sr-only">Cari dokumen</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari judul dokumen…"
              className="h-11 w-full rounded-md border border-line bg-surface pl-9 pr-3 text-[15px] outline-none transition focus:border-primary-500 focus:ring-[3px] focus:ring-primary-300/50"
            />
          </label>
        </div>
      )}

      <motion.ul layout className="overflow-hidden rounded-lg bg-surface shadow-soft ring-1 ring-line/60">
        <AnimatePresence initial={false} mode="popLayout">
          {rows.map((d, i) => (
            <motion.li
              key={d.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              exit={{ opacity: 0, x: -20, transition: { duration: 0.15 } }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              className="group flex items-center gap-4 border-t border-line px-4 py-4 first:border-t-0 transition-colors hover:bg-primary-50/50 md:px-5"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-md transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110" style={{ backgroundColor: `${tipeColor[d.tipe]}14`, color: tipeColor[d.tipe] }}>
                <FileText className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold leading-6">{d.judul}</p>
                <p className="text-[13px] text-muted">
                  {d.kategori} · {dateShort(d.tanggal)} · {d.tipe} · {d.ukuran}
                </p>
              </div>
              <div className="flex shrink-0 gap-1.5">
                <a href={d.file} target="_blank" aria-label={`Lihat ${d.judul}`} className="hidden size-10 place-items-center rounded-md text-muted transition hover:bg-surface-alt hover:text-ink sm:grid">
                  <Eye className="size-5" />
                </a>
                <a href={d.file} download aria-label={`Unduh ${d.judul}`} className="grid size-10 place-items-center rounded-md bg-primary-50 text-primary-600 transition hover:bg-primary-600 hover:text-white">
                  <Download className="size-5" />
                </a>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
        {rows.length === 0 && (
          <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-2 px-4 py-14 text-center text-muted">
            <FolderOpen className="size-10" strokeWidth={1.5} />
            Belum ada dokumen yang cocok.
          </motion.li>
        )}
      </motion.ul>
    </div>
  );
}
