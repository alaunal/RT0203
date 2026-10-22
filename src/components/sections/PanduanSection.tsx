import { Stagger, StaggerItem } from "@/components/ui/motion";
import { Section, SectionHeader } from "@/components/ui/primitives";
import { panduan } from "@/data/panduan";
import { PanduanCard } from "./PanduanCard";

export function PanduanSection() {
  return (
    <Section id="panduan">
      <SectionHeader
        eyebrow="Panduan Warga"
        title="Panduan kegiatan kemasyarakatan"
        intro="Langkah praktis urusan sehari-hari sebagai warga RT 02."
        link={{ href: "/panduan", label: "Semua panduan" }}
      />
      <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
        {panduan.slice(0, 3).map((p) => (
          <StaggerItem key={p.slug}>
            <PanduanCard p={p} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
