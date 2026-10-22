import { MapPin } from "lucide-react";
import Link from "next/link";
import { site } from "@/data/site";
import { waChatUrl } from "@/lib/format";
import { InstagramIcon, LogoMark, WhatsAppIcon } from "@/components/ui/icons";
import { Stagger, StaggerItem } from "@/components/ui/motion";

const tautan = [
  { label: "Profil & Pengurus", href: "/#pengurus" },
  { label: "Aktivitas", href: "/aktivitas" },
  { label: "Jadwal Kegiatan", href: "/jadwal" },
  { label: "Kas RT", href: "/kas" },
  { label: "Bank Sampah", href: "/#bank-sampah" },
  { label: "Dokumen", href: "/dokumen" },
  { label: "Panduan Warga", href: "/panduan" },
];

export function Footer() {
  return (
    <footer className="bg-primary-900 text-white/80">
      <Stagger className="mx-auto grid max-w-[1200px] gap-10 px-4 py-14 md:grid-cols-2 md:px-6 lg:grid-cols-[1.6fr_1fr_1fr]">
        <StaggerItem>
          <div className="flex items-center gap-3">
            <LogoMark className="size-12" />
            <div>
              <p className="font-bold text-white">{site.namaRt}</p>
              <p className="text-sm">{site.kecamatan}, {site.kota}</p>
            </div>
          </div>
          <p className="mt-4 flex gap-2 text-sm leading-6">
            <MapPin className="mt-0.5 size-4 shrink-0 text-accent-400" />
            {site.alamat}
          </p>
          <p className="mt-4 text-sm leading-6">{site.tagline}</p>
        </StaggerItem>

        <StaggerItem>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-[.08em] text-accent-400">Tautan Cepat</h2>
          <ul className="space-y-2.5 text-[15px]">
            {tautan.map((t) => (
              <li key={t.href}>
                <Link href={t.href} className="inline-block transition-transform duration-150 hover:translate-x-1 hover:text-white">
                  {t.label}
                </Link>
              </li>
            ))}
          </ul>
        </StaggerItem>

        <StaggerItem>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-[.08em] text-accent-400">Ikuti Kami</h2>
          <div className="flex gap-3">
            <a href={`https://instagram.com/${site.instagram}`} target="_blank" rel="noopener" aria-label="Instagram" className="grid size-11 place-items-center rounded-full bg-white/10 transition hover:-translate-y-0.5 hover:bg-white/20">
              <InstagramIcon className="size-5 text-white" />
            </a>
            <a href={waChatUrl(site.waResmi)} target="_blank" rel="noopener" aria-label="WhatsApp" className="grid size-11 place-items-center rounded-full bg-white/10 transition hover:-translate-y-0.5 hover:bg-white/20">
              <WhatsAppIcon className="size-5 text-white" />
            </a>
          </div>
          <h2 className="mb-2 mt-6 text-sm font-bold uppercase tracking-[.08em] text-accent-400">Jam Layanan</h2>
          <ul className="space-y-1 text-[15px]">
            {site.jamLayanan.map((j) => (
              <li key={j}>{j}</li>
            ))}
          </ul>
        </StaggerItem>
      </Stagger>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-2 px-4 py-5 text-sm md:flex-row md:items-center md:justify-between md:px-6">
          <p>© 2026 RT 02 / RW 03 Kel. Jatiluhur, Kec. Jatiasih, Kota Bekasi</p>
          <p className="text-white/60">Data di situs ini masih contoh (dummy).</p>
        </div>
      </div>
    </footer>
  );
}
