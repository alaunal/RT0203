import { ogImage } from "@/lib/og";

export const alt = "Website resmi RT 02 / RW 03 Jatiluhur, Jatiasih, Kota Bekasi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/jpeg";

export default function Image() {
  return ogImage({
    eyebrow: "Website Resmi Warga",
    title: "RT 02 / RW 03 Jatiluhur",
    photo: "/images/hero-perumahan.jpg",
    subtitle: "Bersama membangun lingkungan yang rukun, bersih, dan transparan.",
  });
}
