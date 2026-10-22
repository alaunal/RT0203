import clsx from "clsx";
import { TrendingDown, TrendingUp } from "lucide-react";
import { CountUp, Stagger, StaggerItem } from "@/components/ui/motion";
import type { Transaksi } from "@/data/kas";
import { rupiah, dateShort } from "@/lib/format";

type Tile = { label: string; value: number; kind: "rp" | "pct"; delta?: { value: number; goodWhenUp: boolean } };

export function StatTiles({ tiles }: { tiles: Tile[] }) {
  return (
    <Stagger className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4" stagger={0.08}>
      {tiles.map((t) => {
        const up = (t.delta?.value ?? 0) >= 0;
        const good = t.delta && up === t.delta.goodWhenUp;
        return (
          <StaggerItem key={t.label} variant="up" className="rounded-lg bg-surface p-4 shadow-soft ring-1 ring-line/60 transition-shadow duration-300 hover:shadow-card md:p-5">
            <p className="text-sm font-medium text-muted">{t.label}</p>
            <p className="tabular mt-1 whitespace-nowrap text-[18px] font-extrabold leading-7 sm:text-[22px] sm:leading-8 md:text-[28px]">
              <CountUp value={t.value} preset={t.kind === "rp" ? "rupiah" : "percent"} />
            </p>
            {t.delta && (
              <p className={clsx("mt-1 flex flex-wrap items-center gap-x-1 text-[12px] font-semibold sm:text-[13px]", good ? "text-income" : "text-expense")}>
                {up ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
                <span className="tabular whitespace-nowrap">
                  {up ? "+" : "−"}
                  {rupiah(Math.abs(t.delta.value))}
                </span>
                <span className="hidden font-normal text-muted sm:inline">dari bulan lalu</span>
              </p>
            )}
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}

/** `compact` → selalu tampil sebagai list kartu (untuk kolom sempit di beranda). */
export function KasTable({ rows, compact }: { rows: Transaksi[]; compact?: boolean }) {
  return (
    <>
      {/* Desktop/tablet: tabel */}
      <div className={clsx("hidden overflow-hidden rounded-lg bg-surface shadow-soft ring-1 ring-line/60", !compact && "sm:block")}>
        <table className="w-full text-[14px]">
          <caption className="sr-only">Transaksi kas terbaru</caption>
          <thead className="bg-surface-alt text-left text-[12px] font-bold uppercase tracking-[.04em] text-muted">
            <tr>
              <th scope="col" className="px-4 py-3">Tanggal</th>
              <th scope="col" className="px-4 py-3">Uraian</th>
              <th scope="col" className="px-4 py-3 text-right">Masuk</th>
              <th scope="col" className="px-4 py-3 text-right">Keluar</th>
            </tr>
          </thead>
          <Stagger as="tbody" stagger={0.04}>
            {rows.map((r) => (
              <StaggerItem as="tr" key={r.id} variant="up" className="border-t border-line transition-colors hover:bg-primary-50/60">
                <td className="tabular whitespace-nowrap px-4 py-3 text-muted">{dateShort(r.tanggal)}</td>
                <td className="px-4 py-3">
                  <span className="block font-medium">{r.uraian}</span>
                  <span className="text-[12px] text-muted">{r.kategori}</span>
                </td>
                <td className="tabular whitespace-nowrap px-4 py-3 text-right font-semibold text-income">{r.jenis === "masuk" ? rupiah(r.nominal) : ""}</td>
                <td className="tabular whitespace-nowrap px-4 py-3 text-right font-semibold text-expense">{r.jenis === "keluar" ? `−${rupiah(r.nominal)}` : ""}</td>
              </StaggerItem>
            ))}
          </Stagger>
        </table>
      </div>

      {/* Mobile: list kartu */}
      <Stagger as="ul" className={clsx("space-y-2", !compact && "sm:hidden")} stagger={0.04}>
        {rows.map((r) => (
          <StaggerItem as="li" key={r.id} variant="up" className="flex items-center justify-between gap-3 rounded-md bg-surface p-3.5 shadow-soft ring-1 ring-line/60">
            <div className="min-w-0">
              <p className="truncate font-medium">{r.uraian}</p>
              <p className="text-[13px] text-muted">{dateShort(r.tanggal)} · {r.kategori}</p>
            </div>
            <p className={clsx("tabular shrink-0 font-semibold", r.jenis === "masuk" ? "text-income" : "text-expense")}>
              {r.jenis === "masuk" ? "+" : "−"}
              {rupiah(r.nominal)}
            </p>
          </StaggerItem>
        ))}
      </Stagger>
    </>
  );
}
