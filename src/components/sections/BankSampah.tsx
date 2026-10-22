"use client";

import { CalendarClock, MapPin, Recycle, Scale, Users, Wallet } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef } from "react";
import { Shimmer, useNearView } from "@/components/ui/lazy";
import { CountUp, Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { Section, SectionHeader } from "@/components/ui/primitives";
import { bankSampah as bs } from "@/data/komunitas";
import { dateShort, rupiah } from "@/lib/format";

const Chart = dynamic(() => import("./BankSampahChart"), { ssr: false, loading: () => <Shimmer className="h-full rounded-md" /> });

export function BankSampah() {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartNear = useNearView(chartRef);
  const stepsRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: stepsRef, offset: ["start 85%", "end 55%"] });
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const stats = [
    { icon: Scale, label: "Sampah terkumpul", value: bs.stats.totalKg, fmt: (n: number) => `${Math.round(n).toLocaleString("id-ID")} kg` },
    { icon: Users, label: "Nasabah aktif", value: bs.stats.nasabah, fmt: (n: number) => `${Math.round(n)} KK` },
    { icon: Wallet, label: "Total tabungan warga", value: bs.stats.tabungan, fmt: (n: number) => rupiah(Math.round(n)) },
  ];

  return (
    <Section id="bank-sampah">
      <SectionHeader eyebrow="Bank Sampah" eyebrowClass="text-waste" title={bs.nama} intro="Sampah terpilah jadi tabungan, lingkungan jadi lebih bersih." />

      <Reveal className="mb-6 flex flex-wrap gap-x-6 gap-y-2 text-[15px] font-medium">
        <span className="inline-flex items-center gap-2"><CalendarClock className="size-5 text-waste" /> {bs.jadwal}</span>
        <span className="inline-flex items-center gap-2"><MapPin className="size-5 text-waste" /> {bs.lokasi}</span>
        <span className="inline-flex items-center gap-2"><Recycle className="size-5 text-waste" /> PJ: {bs.pj}</span>
      </Reveal>

      <Stagger className="grid gap-3 sm:grid-cols-3 lg:gap-4">
        {stats.map((s) => (
          <StaggerItem key={s.label} className="group flex items-center gap-4 rounded-lg bg-surface p-5 shadow-soft ring-1 ring-line/60">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-waste/10 text-waste transition-transform duration-500 group-hover:rotate-[360deg]">
              <s.icon className="size-6" />
            </span>
            <span>
              <span className="block text-sm text-muted">{s.label}</span>
              <span className="tabular block text-[24px] font-extrabold leading-8">
                <CountUp value={s.value} format={s.fmt} />
              </span>
            </span>
          </StaggerItem>
        ))}
      </Stagger>

      {/* Alur menabung */}
      <div className="mt-12">
        <Reveal><h3 className="mb-6 text-xl font-semibold">Cara menabung</h3></Reveal>
        <ol ref={stepsRef} className="relative grid gap-6 md:grid-cols-4">
          {/* garis progres (horizontal desktop, vertikal mobile) */}
          <div aria-hidden className="absolute left-6 top-6 bottom-6 w-0.5 bg-line md:left-[12.5%] md:right-[12.5%] md:top-6 md:bottom-auto md:h-0.5 md:w-auto">
            <motion.div style={{ scaleY: progress }} className="h-full w-full origin-top bg-waste md:hidden" />
            <motion.div style={{ scaleX: progress }} className="hidden h-full w-full origin-left bg-waste md:block" />
          </div>
          {bs.langkah.map((l, i) => (
            <motion.li
              key={l.judul}
              className="relative flex gap-4 md:flex-col md:items-center md:text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -60px 0px" }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <motion.span
                className="relative z-10 grid size-12 shrink-0 place-items-center rounded-full bg-waste text-lg font-extrabold text-white ring-4 ring-bg"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 + 0.1, type: "spring", stiffness: 300, damping: 18 }}
              >
                {i + 1}
              </motion.span>
              <span>
                <span className="block text-lg font-semibold">{l.judul}</span>
                <span className="mt-1 block text-muted">{l.teks}</span>
              </span>
            </motion.li>
          ))}
        </ol>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-12">
        {/* Tabel harga */}
        <Reveal direction="right" className="lg:col-span-7">
          <div className="overflow-hidden rounded-lg bg-surface shadow-soft ring-1 ring-line/60">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h3 className="text-lg font-semibold">Daftar harga sampah</h3>
              <span className="text-[13px] text-muted">Berlaku sejak {dateShort(bs.hargaBerlaku)}</span>
            </div>
            <table className="w-full text-[15px]">
              <caption className="sr-only">Harga sampah per jenis</caption>
              <thead className="sr-only">
                <tr><th scope="col">Jenis</th><th scope="col">Harga</th></tr>
              </thead>
              <Stagger as="tbody" stagger={0.05}>
                {bs.harga.map((h) => (
                  <StaggerItem as="tr" key={h.jenis} className="border-t border-line first:border-t-0 transition-colors hover:bg-waste/5">
                    <td className="px-5 py-3">
                      <span className="block font-medium">{h.jenis}</span>
                      <span className="text-[13px] text-muted">{h.contoh}</span>
                    </td>
                    <td className="tabular whitespace-nowrap px-5 py-3 text-right font-semibold text-waste">
                      {rupiah(h.harga)}<span className="font-normal text-muted">/{h.satuan}</span>
                    </td>
                  </StaggerItem>
                ))}
              </Stagger>
            </table>
          </div>
        </Reveal>

        <Reveal direction="left" delay={0.1} className="flex flex-col gap-6 lg:col-span-5">
          <div className="rounded-lg bg-surface p-5 shadow-soft ring-1 ring-line/60">
            <h3 className="text-lg font-semibold">Tren sampah terkumpul (kg)</h3>
            <div ref={chartRef} className="mt-3 h-40">
              {chartNear && <Chart />}
            </div>
          </div>
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg shadow-soft">
            <Image src="/images/bs-kertas.jpg" alt="Tumpukan kertas siap ditimbang di bank sampah" fill sizes="(min-width:1024px) 460px, 100vw" className="object-cover transition-transform duration-700 hover:scale-105" />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
