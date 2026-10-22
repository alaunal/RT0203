import { ogImage } from "@/lib/og";

export const alt = "Dokumen dan arsip RT 02 / RW 03 Jatiluhur";
export const size = { width: 1200, height: 630 };
export const contentType = "image/jpeg";

export default function Image() {
  return ogImage({
    eyebrow: "Dokumen & Arsip",
    title: "Formulir, notulen rapat, dan peraturan RT",
    photo: "/images/pd-surat.jpg",
    subtitle: "Unduh dokumen resmi RT kapan saja.",
  });
}
