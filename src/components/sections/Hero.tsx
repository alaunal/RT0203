"use client";

import { CalendarDays, ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, type CSSProperties } from "react";
import clsx from "clsx";
import { btn } from "@/components/ui/primitives";
import { CountUp } from "@/components/ui/motion";
import { WhatsAppIcon } from "@/components/ui/icons";
import { site } from "@/data/site";
import { rupiahShort, waChatUrl } from "@/lib/format";

const rise = (delay: number) => ({ "--d": `${delay}s` }) as CSSProperties;

export function Hero({ saldo, kegiatanBulanIni }: { saldo: number; kegiatanBulanIni: number }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const stats = [
    { label: "Kepala Keluarga", value: site.jumlahKK, fmt: (n: number) => `± ${Math.round(n)}` },
    { label: "Warga", value: site.jumlahWarga, fmt: (n: number) => Math.round(n).toLocaleString("id-ID") },
    { label: "Saldo Kas", value: saldo, fmt: (n: number) => `Rp ${rupiahShort(n)}` },
    { label: "Kegiatan bulan ini", value: kegiatanBulanIni, fmt: (n: number) => String(Math.round(n)) },
  ];

  return (
    <section ref={ref} className="relative isolate flex min-h-[85svh] items-end overflow-hidden lg:min-h-[max(600px,100svh)]">
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-perumahan.jpg"
          alt="Pemandangan perumahan warga saat matahari terbenam"
          fill
          preload
          sizes="100vw"
          className="animate-ken-burns object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,51,34,.35)_0%,rgba(13,51,34,.85)_100%)]" />
      </motion.div>

      <motion.div style={{ y: contentY, opacity: fade }} className="mx-auto w-full max-w-[1200px] px-4 pb-28 pt-32 text-center md:px-6 md:text-left lg:pb-40">
        {/* Animasi masuk via CSS (bukan JS) supaya judul langsung terlukis sebelum hidrasi. */}
        <div>
          <p style={rise(0.25)} className="animate-rise mb-4 text-[13px] font-bold uppercase tracking-[.1em] text-accent-400">
            {site.kelurahan} · {site.kecamatan} · {site.kota}
          </p>
          <h1 className="text-[36px] font-extrabold leading-[42px] text-white md:text-[56px] md:leading-[64px]">
            <span style={rise(0.37)} className="animate-rise inline-block">RT 02 / RW 03</span>{" "}
            <span style={rise(0.49)} className="animate-rise inline-block text-accent-400">Jatiluhur</span>
          </h1>
          <p style={rise(0.61)} className="animate-rise mx-auto mt-4 max-w-xl text-lg leading-7 text-white/85 md:mx-0 md:text-xl">
            {site.tagline}
          </p>
          <div style={rise(0.73)} className="animate-rise mt-8 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
            <Link href="#jadwal" className={clsx(btn.base, btn.accent)}>
              <CalendarDays className="size-5" /> Lihat Jadwal Kegiatan
            </Link>
            <a href={waChatUrl(site.waResmi, "Halo Pengurus RT 02, saya ingin bertanya.")} target="_blank" rel="noopener" className={clsx(btn.base, btn.ghost)}>
              <WhatsAppIcon className="size-5" /> Hubungi Pengurus
            </a>
          </div>
        </div>
      </motion.div>

      <div style={rise(0.9)} className="animate-rise absolute inset-x-0 bottom-6 hidden lg:block">
        <dl className="mx-auto grid max-w-[1200px] grid-cols-4 gap-px overflow-hidden rounded-lg border border-white/20 bg-white/10 px-0 backdrop-blur-md">
          {stats.map((s) => (
            <div key={s.label} className="px-6 py-4 text-white">
              <dt className="text-sm text-white/70">{s.label}</dt>
              <dd className="tabular text-2xl font-extrabold">
                <CountUp value={s.value} format={s.fmt} />
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <motion.a
        href="#lokasi"
        aria-label="Gulir ke bawah"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 lg:hidden"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="size-7" />
      </motion.a>
    </section>
  );
}
