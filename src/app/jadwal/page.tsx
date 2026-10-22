import type { Metadata } from "next";
import { CalendarLoader } from "@/components/sections/CalendarLoader";
import { Reveal } from "@/components/ui/motion";
import { PageHeader, Section } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Jadwal Kegiatan",
  description: "Kalender kegiatan warga RT 02 / RW 03 Jatiluhur.",
};

export default function JadwalPage() {
  return (
    <>
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
