import { TriangleAlert } from "lucide-react";
import type { Metadata } from "next";
import { DokumenList } from "@/components/sections/DokumenList";
import { Reveal } from "@/components/ui/motion";
import { PageHeader, Section } from "@/components/ui/primitives";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Dokumen & Arsip",
  description:
    "Unduh formulir surat pengantar, formulir lapor tamu, notulen rapat, laporan kas bulanan, dan peraturan lingkungan RT 02 / RW 03 Jatiluhur.",
  path: "/dokumen",
});

export default function DokumenPage() {
  return (
    <>
      <PageHeader title="Dokumen & Arsip" intro="Formulir, notulen rapat, laporan kas, dan peraturan lingkungan." crumbs={[{ label: "Beranda", href: "/" }, { label: "Dokumen" }]} />
      <Section>
        <Reveal>
          <DokumenList />
        </Reveal>
        <Reveal className="mt-8 flex gap-3 rounded-lg border-l-4 border-warning bg-accent-100 p-4 text-[14px] text-accent-700">
          <TriangleAlert className="size-5 shrink-0" />
          Dokumen yang memuat data pribadi warga (NIK, KK, alamat per warga) tidak dipublikasikan di website.
        </Reveal>
      </Section>
    </>
  );
}
