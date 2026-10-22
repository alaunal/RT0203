import { notFound } from "next/navigation";
import { panduan } from "@/data/panduan";
import { ogImage } from "@/lib/og";

export const alt = "Sampul panduan warga RT 02 / RW 03 Jatiluhur";
export const size = { width: 1200, height: 630 };
export const contentType = "image/jpeg";

export function generateStaticParams() {
  return panduan.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = panduan.find((x) => x.slug === slug);
  if (!p) notFound();
  return ogImage({
    eyebrow: `Panduan Warga · ${p.kategori}`,
    title: p.judul,
    photo: p.cover,
    subtitle: `${p.menit} menit baca`,
  });
}
