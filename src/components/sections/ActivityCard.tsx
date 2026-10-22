import clsx from "clsx";
import { CalendarDays, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { KategoriBadge } from "@/components/ui/primitives";
import type { Aktivitas } from "@/data/aktivitas";
import { dateShort } from "@/lib/format";

export function ActivityCard({ a, featured }: { a: Aktivitas; featured?: boolean }) {
  return (
    <Link
      href={`/aktivitas/${a.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg bg-surface shadow-soft ring-1 ring-line/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className={clsx("relative overflow-hidden", featured ? "aspect-[16/9] md:aspect-[2/1]" : "aspect-[16/9]")}>
        <Image
          src={a.cover}
          alt={a.judul}
          fill
          sizes={featured ? "(min-width:1024px) 760px, 100vw" : "(min-width:1024px) 380px, (min-width:768px) 50vw, 100vw"}
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-primary-900/0 transition-colors duration-300 group-hover:bg-primary-900/10" />
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <KategoriBadge id={a.kategori} className="self-start" />
        <h3 className={clsx("line-clamp-2 font-semibold text-ink transition-colors group-hover:text-primary-700", featured ? "text-[22px] leading-[30px]" : "text-[20px] leading-7")}>{a.judul}</h3>
        <p className="line-clamp-3 text-muted">{a.ringkasan}</p>
        <p className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-2 text-sm font-medium text-muted">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-4" /> {dateShort(a.tanggal)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-4" /> {a.lokasi}
          </span>
        </p>
      </div>
    </Link>
  );
}
