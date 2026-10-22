import type { Metadata } from "next";
import { site } from "@/data/site";

/** URL publik situs. Set `NEXT_PUBLIC_SITE_URL` saat deploy ke domain lain (mis. preview Vercel). */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? `https://${site.domain}`).replace(/\/$/, "");

export const absUrl = (path = "/") => `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;

export const siteDescription = `Website resmi ${site.namaRt}, ${site.kelurahan}, ${site.kecamatan}, ${site.kota}. Info kegiatan warga, jadwal, laporan kas RT yang transparan, bank sampah, Karang Taruna, dokumen, dan panduan warga.`;

export const keywords = [
  "RT 02 RW 03",
  "RT 02 Jatiluhur",
  "Jatiluhur",
  "Jatiasih",
  "Kota Bekasi",
  "website RT",
  "kas RT",
  "bank sampah Jatiluhur",
  "Karang Taruna Jatiluhur",
  "kegiatan warga",
  "surat pengantar RT",
];

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
};

/**
 * Metadata lengkap per halaman. Next.js menimpa objek `openGraph`/`twitter`
 * induk secara utuh (bukan deep merge), jadi semua field diisi ulang di sini.
 * Gambar OG berasal dari file `opengraph-image.tsx` di segmen rute.
 */
export function pageMeta({ title, description, path, type = "website", publishedTime, modifiedTime, section }: PageMetaInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: "id_ID",
      siteName: site.namaRt,
      url: path,
      title,
      description,
      ...(type === "article" && { publishedTime, modifiedTime, section, authors: [site.namaRt] }),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/** Serialisasi JSON-LD aman untuk disisipkan di <script> (escape `<`). */
export const ldJson = (data: object) => JSON.stringify(data).replace(/</g, "\\u003c");

export const orgId = `${siteUrl}/#organisasi`;

export function breadcrumbLd(items: { name: string; path?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      ...(it.path && { item: absUrl(it.path) }),
    })),
  };
}
