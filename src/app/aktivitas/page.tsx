import type { Metadata } from "next";
import { AktivitasGrid } from "@/components/sections/AktivitasGrid";
import { PageHeader, Section } from "@/components/ui/primitives";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Aktivitas Warga",
  description:
    "Dokumentasi dan kabar kegiatan warga RT 02 / RW 03 Jatiluhur, Jatiasih, Bekasi: rapat warga, kerja bakti, posyandu, bank sampah, Karang Taruna, dan pengajian.",
  path: "/aktivitas",
});

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
