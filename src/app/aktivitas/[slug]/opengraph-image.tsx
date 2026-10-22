import { notFound } from "next/navigation";
import { aktivitas } from "@/data/aktivitas";
import { kategori } from "@/data/kategori";
import { dateLong } from "@/lib/format";
import { ogImage } from "@/lib/og";

export const alt = "Sampul aktivitas warga RT 02 / RW 03 Jatiluhur";
export const size = { width: 1200, height: 630 };
export const contentType = "image/jpeg";

export function generateStaticParams() {
  return aktivitas.map((a) => ({ slug: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = aktivitas.find((x) => x.slug === slug);
  if (!a) notFound();
  return ogImage({
    eyebrow: `Aktivitas · ${kategori[a.kategori].label}`,
    title: a.judul,
    photo: a.cover,
    subtitle: `${dateLong(a.tanggal)} · ${a.lokasi}`,
  });
}
