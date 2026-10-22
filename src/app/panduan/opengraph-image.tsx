import { ogImage } from "@/lib/og";

export const alt = "Panduan warga RT 02 / RW 03 Jatiluhur";
export const size = { width: 1200, height: 630 };
export const contentType = "image/jpeg";

export default function Image() {
  return ogImage({
    eyebrow: "Panduan Warga",
    title: "Panduan kegiatan kemasyarakatan",
    photo: "/images/pd-rumah-baru.jpg",
    subtitle: "Surat pengantar, lapor tamu, ronda, bank sampah, dan warga baru.",
  });
}
