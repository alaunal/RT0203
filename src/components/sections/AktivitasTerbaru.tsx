import clsx from "clsx";
import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { btn, Section, SectionHeader } from "@/components/ui/primitives";
import { aktivitasSorted } from "@/data/aktivitas";
import { ActivityCard } from "./ActivityCard";

export function AktivitasTerbaru() {
  // 1 featured (2 kolom) + 4 kartu → grid penuh di md (2 kol) & lg (3 kol)
  const items = aktivitasSorted.slice(0, 5);
  return (
    <Section id="aktivitas" alt>
      <SectionHeader
        eyebrow="Aktivitas Terbaru"
        title="Kabar dari lingkungan kita"
        intro="Dokumentasi kegiatan warga RT 02 — dari rapat, kerja bakti, sampai keseruan Karang Taruna."
        link={{ href: "/aktivitas", label: "Lihat semua aktivitas" }}
      />
      <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
        {items.map((a, i) => (
          <StaggerItem key={a.slug} className={clsx(i === 0 && "md:col-span-2")}>
            <ActivityCard a={a} featured={i === 0} />
          </StaggerItem>
        ))}
      </Stagger>
      <Reveal className="mt-10 text-center md:hidden">
        <Link href="/aktivitas" className={clsx(btn.base, btn.outline)}>
          Lihat semua aktivitas
        </Link>
      </Reveal>
    </Section>
  );
}
