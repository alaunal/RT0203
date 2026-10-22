import { Reveal } from "@/components/ui/motion";
import { Section, SectionHeader } from "@/components/ui/primitives";
import { CalendarLoader } from "./CalendarLoader";

export function JadwalKegiatan() {
  return (
    <Section id="jadwal">
      <SectionHeader
        eyebrow="Jadwal Kegiatan"
        title="Catat tanggalnya, yuk ikut!"
        intro="Klik kegiatan untuk melihat detail, menambahkannya ke Google Calendar, atau membagikannya ke grup WhatsApp."
        link={{ href: "/jadwal", label: "Buka kalender penuh" }}
      />
      <Reveal>
        <CalendarLoader />
      </Reveal>
    </Section>
  );
}
