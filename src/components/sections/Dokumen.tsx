import { Reveal } from "@/components/ui/motion";
import { Section, SectionHeader } from "@/components/ui/primitives";
import { DokumenList } from "./DokumenList";

export function Dokumen() {
  return (
    <Section id="dokumen" alt>
      <SectionHeader
        eyebrow="Dokumen & Arsip"
        title="Formulir, notulen, dan laporan"
        intro="Unduh formulir yang dibutuhkan tanpa harus datang ke sekretariat."
        link={{ href: "/dokumen", label: "Lihat semua dokumen" }}
      />
      <Reveal>
        <DokumenList limit={5} controls={false} />
      </Reveal>
    </Section>
  );
}
