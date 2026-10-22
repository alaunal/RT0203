import type { Metadata } from "next";
import { AktivitasGrid } from "@/components/sections/AktivitasGrid";
import { PageHeader, Section } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Aktivitas",
  description: "Dokumentasi kegiatan warga RT 02 / RW 03 Jatiluhur.",
};

export default function AktivitasPage() {
  return (
    <>
      <PageHeader title="Aktivitas Warga" intro="Dokumentasi kegiatan di lingkungan RT 02 / RW 03." crumbs={[{ label: "Beranda", href: "/" }, { label: "Aktivitas" }]} />
      <Section>
        <AktivitasGrid />
      </Section>
    </>
  );
}
