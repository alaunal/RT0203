import type { Metadata } from "next";
import { CalendarLoader } from "@/components/sections/CalendarLoader";
import { Reveal } from "@/components/ui/motion";
import { PageHeader, Section } from "@/components/ui/primitives";
import { JsonLd } from "@/components/ui/JsonLd";
import { jadwal } from "@/data/jadwal";
import { site } from "@/data/site";
import { absUrl, orgId, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Jadwal Kegiatan",
  description:
    "Kalender kegiatan warga RT 02 / RW 03 Jatiluhur: posyandu, kerja bakti, rapat warga bulanan, futsal Karang Taruna, pengajian, dan ronda. Semua waktu WIB.",
  path: "/jadwal",
});

/** Event mendatang sebagai structured data (Google Events). */
const eventsLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `Jadwal kegiatan ${site.namaRt}`,
  itemListElement: jadwal
    .filter((j) => j.selesai.slice(0, 10) >= site.referenceDate)
    .map((j, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Event",
        name: j.judul,
        description: j.deskripsi,
        startDate: j.mulai,
        endDate: j.selesai,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        isAccessibleForFree: true,
        image: absUrl("/jadwal/opengraph-image"),
        url: absUrl("/jadwal"),
        location: {
          "@type": "Place",
          name: `${j.lokasi}, ${site.namaRt}`,
          address: { "@type": "PostalAddress", addressLocality: "Jatiluhur, Jatiasih", addressRegion: "Jawa Barat", postalCode: "17425", addressCountry: "ID" },
        },
        organizer: { "@type": "Organization", "@id": orgId, name: site.namaRt, url: absUrl("/") },
      },
    })),
};

export default function JadwalPage() {
  return (
    <>
      <JsonLd data={eventsLd} />
      <PageHeader
        title="Jadwal Kegiatan"
        intro="Semua waktu dalam WIB. Ronda malam berlangsung setiap hari pukul 22.00–04.00 sesuai giliran regu."
        crumbs={[{ label: "Beranda", href: "/" }, { label: "Jadwal Kegiatan" }]}
      />
      <Section>
        <Reveal>
          <CalendarLoader height={760} />
        </Reveal>
      </Section>
    </>
  );
}
