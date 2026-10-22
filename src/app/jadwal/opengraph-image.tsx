import { ogImage } from "@/lib/og";

export const alt = "Jadwal kegiatan RT 02 / RW 03 Jatiluhur";
export const size = { width: 1200, height: 630 };
export const contentType = "image/jpeg";

export default function Image() {
  return ogImage({
    eyebrow: "Jadwal Kegiatan",
    title: "Kalender kegiatan warga",
    photo: "/images/akt-taman-warga.jpg",
    subtitle: "Posyandu, kerja bakti, rapat warga, ronda, dan acara bersama.",
  });
}
