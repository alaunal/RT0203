import { ArrowRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Panduan } from "@/data/panduan";

export function PanduanCard({ p }: { p: Panduan }) {
  return (
    <Link
      href={`/panduan/${p.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg bg-surface shadow-soft ring-1 ring-line/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image src={p.cover} alt="" fill sizes="(min-width:1024px) 380px, (min-width:768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[12px] font-semibold text-primary-700 backdrop-blur">{p.kategori}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[20px] font-semibold leading-7 transition-colors group-hover:text-primary-700">{p.judul}</h3>
        <p className="mt-2 line-clamp-2 text-muted">{p.ringkasan}</p>
        <div className="mt-auto flex items-center justify-between pt-4 text-sm font-medium">
          <span className="inline-flex items-center gap-1.5 text-muted">
            <Clock className="size-4" /> {p.menit} menit baca
          </span>
          <span className="inline-flex items-center gap-1 text-primary-600">
            Baca
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
