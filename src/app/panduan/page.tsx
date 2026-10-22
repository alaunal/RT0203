import type { Metadata } from "next";
import { PanduanCard } from "@/components/sections/PanduanCard";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { PageHeader, Section } from "@/components/ui/primitives";
import { panduan } from "@/data/panduan";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Panduan Warga",
  description:
    "Panduan praktis untuk warga RT 02 / RW 03 Jatiluhur: cara mengurus surat pengantar RT, wajib lapor tamu, jadwal ronda, menabung di bank sampah, dan warga baru.",
  path: "/panduan",
});

export default function PanduanPage() {
  return (
    <>
      <PageHeader title="Panduan Warga" intro="Langkah praktis urusan administrasi, keamanan, dan lingkungan." crumbs={[{ label: "Beranda", href: "/" }, { label: "Panduan" }]} />
      <Section>
        <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {panduan.map((p) => (
            <StaggerItem key={p.slug}>
              <PanduanCard p={p} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
    </>
  );
}
