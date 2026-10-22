import type { CSSProperties } from "react";
import { Clock, Info } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ReadingProgress, Toc } from "@/components/sections/ArticleChrome";
import { PanduanCard } from "@/components/sections/PanduanCard";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { PageHeader, Section } from "@/components/ui/primitives";
import { ShareButtons } from "@/components/ui/ShareButtons";
import { panduan, type Blok } from "@/data/panduan";
import { site } from "@/data/site";
import { absUrl, orgId, pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return panduan.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/panduan/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = panduan.find((x) => x.slug === slug);
  if (!p) return {};
  return pageMeta({
    title: p.judul,
    description: p.ringkasan,
    path: `/panduan/${p.slug}`,
    type: "article",
    publishedTime: p.diperbarui,
    modifiedTime: p.diperbarui,
    section: p.kategori,
  });
}

const anchor = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function Block({ b }: { b: Blok }) {
  switch (b.tipe) {
    case "p":
      return <p>{b.teks}</p>;
    case "list":
      return (
        <ul className="list-disc space-y-1.5 pl-6 marker:text-primary-500">
          {b.items.map((i) => <li key={i}>{i}</li>)}
        </ul>
      );
    case "langkah":
      return (
        <Stagger as="ol" className="space-y-3" stagger={0.08}>
          {b.items.map((i, n) => (
            <StaggerItem as="li" variant="left" key={i} className="flex gap-3">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary-600 text-[15px] font-bold text-white">{n + 1}</span>
              <span className="pt-0.5">{i}</span>
            </StaggerItem>
          ))}
        </Stagger>
      );
    case "info":
      return (
        <Reveal className="flex gap-3 rounded-md border-l-4 border-primary-600 bg-primary-50 p-4 text-[16px] text-primary-900">
          <Info className="mt-0.5 size-5 shrink-0 text-primary-600" />
          {b.teks}
        </Reveal>
      );
  }
}

export default async function PanduanDetail({ params }: PageProps<"/panduan/[slug]">) {
  const { slug } = await params;
  const p = panduan.find((x) => x.slug === slug);
  if (!p) notFound();

  const toc = p.bagian.map((b) => ({ id: anchor(b.judul), label: b.judul }));
  const lain = panduan.filter((x) => x.slug !== p.slug).slice(0, 3);
  const path = `/panduan/${p.slug}`;
  const url = absUrl(path);
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: url,
    headline: p.judul,
    description: p.ringkasan,
    articleSection: p.kategori,
    image: [absUrl(`${path}/opengraph-image`), absUrl(p.cover)],
    datePublished: `${p.diperbarui}T08:00:00+07:00`,
    dateModified: `${p.diperbarui}T08:00:00+07:00`,
    timeRequired: `PT${p.menit}M`,
    inLanguage: "id-ID",
    author: { "@type": "Organization", "@id": orgId, name: site.namaRt, url: absUrl("/") },
    publisher: { "@type": "Organization", "@id": orgId, name: site.namaRt, logo: { "@type": "ImageObject", url: absUrl("/pwa-icon/512") } },
  };

  return (
    <>
      <JsonLd data={articleLd} />
      <ReadingProgress />
      <PageHeader title={p.judul} intro={p.ringkasan} crumbs={[{ label: "Beranda", href: "/" }, { label: "Panduan", href: "/panduan" }, { label: p.kategori }]} />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
          <article className="max-w-[68ch] text-lg leading-[30px]">
            {/* Sampul = elemen LCP: animasi CSS + preload, tidak menunggu hidrasi JS. */}
            <div style={{ "--d": "0.15s" } as CSSProperties} className="relative mb-8 aspect-[16/9] animate-rise overflow-hidden rounded-lg shadow-card">
              <Image src={p.cover} alt={p.judul} fill preload sizes="(min-width:1024px) 700px, 100vw" className="object-cover" />
            </div>
            <p className="mb-8 inline-flex items-center gap-1.5 text-[15px] font-medium text-muted">
              <Clock className="size-4" /> {p.menit} menit baca · {p.kategori}
            </p>
            {p.bagian.map((s) => (
              <section key={s.judul} id={anchor(s.judul)} className="mb-10 scroll-mt-28">
                <Reveal>
                  <h2 className="mb-4 text-[24px] font-bold leading-8">{s.judul}</h2>
                </Reveal>
                <div className="space-y-4">
                  {s.blok.map((b, i) => <Block key={i} b={b} />)}
                </div>
              </section>
            ))}
            <ShareButtons url={url} title={p.judul} text={`${p.judul} — ${site.namaRt}`} className="border-t border-line pt-6" />
          </article>
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <Toc items={toc} />
            </div>
          </aside>
        </div>
      </Section>
      <Section alt>
        <h2 className="mb-8 text-[24px] font-bold md:text-[32px]">Panduan lainnya</h2>
        <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {lain.map((x) => (
            <StaggerItem key={x.slug}>
              <PanduanCard p={x} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
    </>
  );
}
