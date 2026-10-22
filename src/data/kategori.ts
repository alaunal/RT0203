import {
  CalendarDays,
  HeartPulse,
  MoonStar,
  Recycle,
  Shovel,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";

export type KategoriId = "rapat" | "kerja-bakti" | "karang-taruna" | "bank-sampah" | "keagamaan" | "kesehatan" | "lainnya";

/** `ink` = varian lebih gelap untuk teks kecil bila `color` kurang kontras. */
export const kategori: Record<KategoriId, { label: string; color: string; ink?: string; icon: LucideIcon }> = {
  rapat: { label: "Rapat", color: "#2563A8", icon: Users },
  "kerja-bakti": { label: "Kerja Bakti", color: "#2E8B57", icon: Shovel },
  "karang-taruna": { label: "Karang Taruna", color: "#EA580C", ink: "#C2410C", icon: Trophy },
  "bank-sampah": { label: "Bank Sampah", color: "#0F766E", icon: Recycle },
  keagamaan: { label: "Keagamaan", color: "#A86E14", icon: MoonStar },
  kesehatan: { label: "Posyandu / Kesehatan", color: "#C2412D", icon: HeartPulse },
  lainnya: { label: "Lainnya", color: "#5C5A52", icon: CalendarDays },
};

export const kategoriList = Object.entries(kategori).map(([id, v]) => ({ id: id as KategoriId, ...v }));
