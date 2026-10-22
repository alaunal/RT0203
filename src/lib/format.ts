import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";

const rupiahFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

/** Rp 1.250.000 (spasi setelah "Rp", sesuai design.md §2.2) */
export function rupiah(value: number) {
  return rupiahFormatter.format(value).replace(/ /g, " ").replace(/^Rp(?=\d)/, "Rp ");
}

/** 1,2 jt — untuk sumbu grafik */
export function rupiahShort(value: number) {
  if (Math.abs(value) >= 1_000_000) return `${(value / 1_000_000).toLocaleString("id-ID", { maximumFractionDigits: 1 })} jt`;
  if (Math.abs(value) >= 1_000) return `${(value / 1_000).toLocaleString("id-ID", { maximumFractionDigits: 0 })} rb`;
  return value.toLocaleString("id-ID");
}

const toDate = (d: string | Date) => (typeof d === "string" ? parseISO(d) : d);

/** Sabtu, 24 Oktober 2026 */
export const dateLong = (d: string | Date) => format(toDate(d), "EEEE, d MMMM yyyy", { locale: id });
/** 24 Okt 2026 */
export const dateShort = (d: string | Date) => format(toDate(d), "d MMM yyyy", { locale: id });
/** 19.30 */
export const timeWIB = (d: string | Date) => format(toDate(d), "HH.mm", { locale: id });
/** Oktober 2026 */
export const monthYear = (d: string | Date) => format(toDate(d), "MMMM yyyy", { locale: id });

export function waShareUrl(text: string) {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

export function waChatUrl(phone: string, text?: string) {
  const digits = phone.replace(/\D/g, "").replace(/^0/, "62");
  return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}
