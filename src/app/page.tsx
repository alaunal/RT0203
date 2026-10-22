import { AktivitasTerbaru } from "@/components/sections/AktivitasTerbaru";
import { BankSampah } from "@/components/sections/BankSampah";
import { Dokumen } from "@/components/sections/Dokumen";
import { Hero } from "@/components/sections/Hero";
import { JadwalKegiatan } from "@/components/sections/JadwalKegiatan";
import { KarangTaruna } from "@/components/sections/KarangTaruna";
import { KasRingkasan } from "@/components/sections/KasRingkasan";
import { Lokasi } from "@/components/sections/Lokasi";
import { PanduanSection } from "@/components/sections/PanduanSection";
import { Pengurus } from "@/components/sections/Pengurus";
import { VisiMisi } from "@/components/sections/VisiMisi";
import { jadwal } from "@/data/jadwal";
import { ringkasanKas } from "@/data/kas";
import { site } from "@/data/site";

export default function Home() {
  const { now } = ringkasanKas();
  const bulanAcuan = site.referenceDate.slice(0, 7);
  const kegiatanBulanIni = jadwal.filter((j) => j.mulai.startsWith(bulanAcuan)).length;

  return (
    <>
      <Hero saldo={now.saldo} kegiatanBulanIni={kegiatanBulanIni} />
      <Lokasi />
      <AktivitasTerbaru />
      <JadwalKegiatan />
      <VisiMisi />
      <Pengurus />
      <KasRingkasan />
      <KarangTaruna />
      <BankSampah />
      <Dokumen />
      <PanduanSection />
    </>
  );
}
