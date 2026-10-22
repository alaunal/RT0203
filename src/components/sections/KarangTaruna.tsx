"use client";

import clsx from "clsx";
import { ChevronLeft, ChevronRight, Trophy } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { btn, Section, SectionHeader } from "@/components/ui/primitives";
import { karangTaruna as kt } from "@/data/komunitas";
import { dateShort, waChatUrl } from "@/lib/format";

export function KarangTaruna() {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => track.current?.scrollBy({ left: dir * 280, behavior: "smooth" });

  return (
    <Section id="karang-taruna" alt>
      <SectionHeader eyebrow="Karang Taruna" eyebrowClass="text-youth-ink" title="Anak muda yang bergerak" />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
        <Reveal direction="right" className="lg:col-span-4">
          <div className="relative overflow-hidden rounded-lg bg-surface p-6 shadow-soft ring-1 ring-line/60">
            <div aria-hidden className="absolute -right-6 -top-6 grid size-24 place-items-center rounded-full bg-youth/10">
              <motion.span
                className="absolute inset-1.5 rounded-full border-2 border-dashed border-youth/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              />
              <motion.span animate={{ y: [0, -4, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}>
                <Trophy className="size-8 text-youth" />
              </motion.span>
            </div>
            <h3 className="pr-16 text-[22px] font-bold leading-[30px]">{kt.nama}</h3>
            <p className="mt-1 text-sm font-medium text-muted">Ketua: {kt.ketua}</p>
            <p className="mt-4 text-muted">{kt.deskripsi}</p>

            <Stagger className="mt-5 flex flex-wrap gap-2" stagger={0.06} delay={0.2}>
              {kt.program.map((p) => (
                <StaggerItem key={p} variant="scale" className="rounded-full bg-youth/10 px-3 py-1.5 text-[13px] font-semibold text-youth-ink">
                  {p}
                </StaggerItem>
              ))}
            </Stagger>

            <a href={waChatUrl(kt.wa, "Halo, saya ingin bergabung dengan Karang Taruna.")} target="_blank" rel="noopener" className={clsx(btn.base, "mt-6 w-full bg-youth-ink text-white hover:bg-youth")}>
              <WhatsAppIcon className="size-5" /> Gabung Sekarang
            </a>
          </div>
        </Reveal>

        <div className="min-w-0 lg:col-span-8">
          <div className="mb-3 hidden justify-end gap-2 md:flex">
            <button type="button" onClick={() => scroll(-1)} aria-label="Geser kiri" className="grid size-10 place-items-center rounded-full bg-surface shadow-soft ring-1 ring-line transition hover:bg-youth hover:text-white active:scale-95">
              <ChevronLeft className="size-5" />
            </button>
            <button type="button" onClick={() => scroll(1)} aria-label="Geser kanan" className="grid size-10 place-items-center rounded-full bg-surface shadow-soft ring-1 ring-line transition hover:bg-youth hover:text-white active:scale-95">
              <ChevronRight className="size-5" />
            </button>
          </div>
          <div ref={track} className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0" tabIndex={0} aria-label="Kegiatan Karang Taruna">
            {kt.kegiatan.map((k, i) => (
              <motion.figure
                key={k.judul}
                className="group relative aspect-[4/5] w-[68vw] max-w-[260px] shrink-0 snap-start overflow-hidden rounded-lg shadow-card"
                initial={{ opacity: 0, x: 60, rotate: 2 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 200, damping: 24 }}
                whileHover={{ y: -6 }}
              >
                <Image src={k.foto} alt={k.judul} fill sizes="260px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-youth-deep/90 via-youth-deep/40 to-transparent p-4 pt-16 text-white">
                  <p className="text-[12px] font-semibold text-white/75">{dateShort(k.tanggal)}</p>
                  <p className="font-semibold leading-6">{k.judul}</p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
