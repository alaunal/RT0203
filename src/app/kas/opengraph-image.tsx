import { ogImage } from "@/lib/og";

export const alt = "Laporan kas RT 02 / RW 03 Jatiluhur";
export const size = { width: 1200, height: 630 };
export const contentType = "image/jpeg";

export default function Image() {
  return ogImage({
    eyebrow: "Kas RT · Transparan",
    title: "Laporan kas yang terbuka untuk seluruh warga",
    photo: "/images/akt-rapat-rumah.jpg",
    subtitle: "Pemasukan, pengeluaran, dan saldo setiap bulan.",
  });
}
