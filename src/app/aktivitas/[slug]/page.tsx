import type { CSSProperties } from "react";
import { CalendarDays, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ActivityCard } from "@/components/sections/ActivityCard";
import { Gallery } from "@/components/sections/Gallery";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { KategoriBadge, PageHeader, Section } from "@/components/ui/primitives";
import { ShareButtons } from "@/components/ui/ShareButtons";
import { aktivitas, aktivitasSorted } from "@/data/aktivitas";
import { kategori } from "@/data/kategori";
import { site } from "@/data/site";
import { dateLong } from "@/lib/format";
import { absUrl, orgId, pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return aktivitas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/aktivitas/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = aktivitas.find((x) => x.slug === slug);
  if (!a) return {};
  return pageMeta({
    title: a.judul,
    description: a.ringkasan,
    path: `/aktivitas/${a.slug}`,
    type: "article",
    publishedTime: a.tanggal,
    section: kategori[a.kategori].label,
  });
}

export default async function AktivitasDetail({ params }: PageProps<"/aktivitas/[slug]">) {
  const { slug } = await params;
  const a = aktivitas.find((x) => x.slug === slug);
  if (!a) notFound();

  const terkait = aktivitasSorted.filter((x) => x.slug !== a.slug && x.kategori === a.kategori).concat(aktivitasSorted.filter((x) => x.slug !== a.slug && x.kategori !== a.kategori)).slice(0, 3);
  const path = `/aktivitas/${a.slug}`;
  const url = absUrl(path);
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    mainEntityOfPage: url,
    headline: a.judul,
    description: a.ringkasan,
    articleSection: kategori[a.kategori].label,
    image: [absUrl(`${path}/opengraph-image`), ...[...new Set([a.cover, ...a.galeri])].map((src) => absUrl(src))],
    datePublished: `${a.tanggal}T08:00:00+07:00`,
    dateModified: `${a.tanggal}T08:00:00+07:00`,
    inLanguage: "id-ID",
    contentLocation: { "@type": "Place", name: `${a.lokasi}, ${site.namaRt}` },
    author: { "@type": "Organization", "@id": orgId, name: site.namaRt, url: absUrl("/") },
    publisher: { "@type": "Organization", "@id": orgId, name: site.namaRt, logo: { "@type": "ImageObject", url: absUrl("/pwa-icon/512") } },
  };

  return (
    <>
      <JsonLd data={articleLd} />
      <PageHeader title={a.judul} crumbs={[{ label: "Beranda", href: "/" }, { label: "Aktivitas", href: "/aktivitas" }, { label: "Detail" }]} />
      <Section>
        <article className="mx-auto max-w-3xl">
          {/* Sampul = elemen LCP: animasi CSS + preload, tidak menunggu hidrasi JS. */}
          <div style={{ "--d": "0.15s" } as CSSProperties} className="relative -mt-28 aspect-[16/9] animate-rise overflow-hidden rounded-lg shadow-lift md:-mt-32">
            <Image src={a.cover} alt={a.judul} fill preload sizes="(min-width:768px) 768px, 100vw" className="object-cover" />
          </div>
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

          <Reveal className="mt-10 border-t border-line pt-6">
            <ShareButtons url={url} title={a.judul} text={`${a.judul} — ${site.namaRt}`} />
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
