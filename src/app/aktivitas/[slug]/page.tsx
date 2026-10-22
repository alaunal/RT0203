import clsx from "clsx";
import { CalendarDays, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ActivityCard } from "@/components/sections/ActivityCard";
import { Gallery } from "@/components/sections/Gallery";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { btn, KategoriBadge, PageHeader, Section } from "@/components/ui/primitives";
import { aktivitas, aktivitasSorted } from "@/data/aktivitas";
import { site } from "@/data/site";
import { dateLong, waShareUrl } from "@/lib/format";

export function generateStaticParams() {
  return aktivitas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/aktivitas/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = aktivitas.find((x) => x.slug === slug);
  if (!a) return {};
  return { title: a.judul, description: a.ringkasan, openGraph: { images: [a.cover] } };
}

export default async function AktivitasDetail({ params }: PageProps<"/aktivitas/[slug]">) {
  const { slug } = await params;
  const a = aktivitas.find((x) => x.slug === slug);
  if (!a) notFound();

  const terkait = aktivitasSorted.filter((x) => x.slug !== a.slug && x.kategori === a.kategori).concat(aktivitasSorted.filter((x) => x.slug !== a.slug && x.kategori !== a.kategori)).slice(0, 3);
  const url = `https://${site.domain}/aktivitas/${a.slug}`;

  return (
    <>
      <PageHeader title={a.judul} crumbs={[{ label: "Beranda", href: "/" }, { label: "Aktivitas", href: "/aktivitas" }, { label: "Detail" }]} />
      <Section>
        <article className="mx-auto max-w-3xl">
          <Reveal className="relative -mt-28 aspect-[16/9] overflow-hidden rounded-lg shadow-lift md:-mt-32">
            <Image src={a.cover} alt={a.judul} fill priority sizes="(min-width:768px) 768px, 100vw" className="object-cover" />
          </Reveal>
          <Reveal delay={0.1} className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[15px] text-muted">
            <KategoriBadge id={a.kategori} />
            <span className="inline-flex items-center gap-1.5"><CalendarDays className="size-4" /> {dateLong(a.tanggal)}</span>
            <span className="inline-flex items-center gap-1.5"><MapPin className="size-4" /> {a.lokasi}</span>
          </Reveal>
          <Stagger className="mt-6 space-y-5 text-lg leading-[30px]" stagger={0.1}>
            {a.isi.map((p) => (
              <StaggerItem as="div" key={p}>
                <p>{p}</p>
              </StaggerItem>
            ))}
          </Stagger>

          {a.galeri.length > 0 && (
            <div className="mt-10">
              <h2 className="mb-4 text-xl font-semibold">Galeri</h2>
              <Gallery images={a.galeri} alt={a.judul} />
            </div>
          )}

          <Reveal className="mt-10">
            <a href={waShareUrl(`${a.judul}\n${url}`)} target="_blank" rel="noopener" className={clsx(btn.base, btn.outline)}>
              <WhatsAppIcon className="size-5" /> Bagikan ke WhatsApp
            </a>
          </Reveal>
        </article>
      </Section>

      <Section alt>
        <h2 className="mb-8 text-[24px] font-bold md:text-[32px]">Aktivitas terkait</h2>
        <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {terkait.map((x) => (
            <StaggerItem key={x.slug}>
              <ActivityCard a={x} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
    </>
  );
}
