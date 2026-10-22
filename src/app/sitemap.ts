import type { MetadataRoute } from "next";
import { aktivitas, aktivitasSorted } from "@/data/aktivitas";
import { dokumen } from "@/data/dokumen";
import { panduan } from "@/data/panduan";
import { site } from "@/data/site";
import { absUrl } from "@/lib/seo";

const latest = (dates: string[]) => dates.reduce((a, b) => (a > b ? a : b));

export default function sitemap(): MetadataRoute.Sitemap {
  const ref = site.referenceDate;
  const latestPanduan = latest(panduan.map((p) => p.diperbarui));

  return [
    { url: absUrl("/"), lastModified: ref, changeFrequency: "weekly", priority: 1, images: [absUrl("/images/hero-perumahan.jpg")] },
    { url: absUrl("/aktivitas"), lastModified: aktivitasSorted[0].tanggal, changeFrequency: "weekly", priority: 0.8 },
    { url: absUrl("/jadwal"), lastModified: ref, changeFrequency: "weekly", priority: 0.8 },
    { url: absUrl("/kas"), lastModified: ref, changeFrequency: "monthly", priority: 0.7 },
    { url: absUrl("/dokumen"), lastModified: latest(dokumen.map((d) => d.tanggal)), changeFrequency: "monthly", priority: 0.6 },
    { url: absUrl("/panduan"), lastModified: latestPanduan, changeFrequency: "monthly", priority: 0.7 },
    ...aktivitas.map((a) => ({
      url: absUrl(`/aktivitas/${a.slug}`),
      lastModified: a.tanggal,
      changeFrequency: "yearly" as const,
      priority: 0.6,
      images: [...new Set([a.cover, ...a.galeri])].map((src) => absUrl(src)),
    })),
    ...panduan.map((p) => ({
      url: absUrl(`/panduan/${p.slug}`),
      lastModified: p.diperbarui,
      changeFrequency: "yearly" as const,
      priority: 0.6,
      images: [absUrl(p.cover)],
    })),
  ];
}
