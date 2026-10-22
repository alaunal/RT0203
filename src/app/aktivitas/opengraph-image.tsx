import { ogImage } from "@/lib/og";

export const alt = "Aktivitas warga RT 02 / RW 03 Jatiluhur";
export const size = { width: 1200, height: 630 };
export const contentType = "image/jpeg";

export default function Image() {
  return ogImage({
    eyebrow: "Aktivitas Warga",
    title: "Kabar & dokumentasi kegiatan warga",
    photo: "/images/akt-kerja-bakti-jalan.jpg",
    subtitle: "Kerja bakti, posyandu, rapat warga, Karang Taruna, dan lainnya.",
  });
}
