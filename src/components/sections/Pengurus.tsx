import clsx from "clsx";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { Section, SectionHeader } from "@/components/ui/primitives";
import { WhatsAppIcon } from "@/components/ui/icons";
import { inisial, pengurus, periode, type Pengurus as P } from "@/data/pengurus";
import { waChatUrl } from "@/lib/format";

function Card({ p, big }: { p: P; big?: boolean }) {
  return (
    <div
      className={clsx(
        "group relative flex h-full flex-col items-center rounded-lg bg-surface p-5 text-center shadow-soft ring-1 ring-line/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift hover:ring-primary-300",
        big && "md:px-10 md:py-8",
      )}
    >
      <div
        className={clsx(
          "relative grid place-items-center rounded-full bg-primary-100 font-extrabold text-primary-700 transition-transform duration-500 group-hover:scale-105",
          big ? "size-28 text-3xl" : "size-20 text-xl",
        )}
        aria-hidden
      >
        <span className="absolute inset-0 rounded-full ring-2 ring-primary-300/0 transition-all duration-500 group-hover:ring-offset-4 group-hover:ring-primary-300" />
        {inisial(p.nama)}
      </div>
      <h3 className={clsx("mt-4 font-semibold", big ? "text-[22px]" : "text-[17px] leading-6")}>{p.nama}</h3>
      <span className={clsx("mt-2 inline-flex rounded-full px-3 py-1 text-[12px] font-semibold", big ? "bg-accent-100 text-accent-700" : "bg-primary-50 text-primary-700")}>{p.jabatan}</span>
      {p.wa && (
        <a
          href={waChatUrl(p.wa)}
          target="_blank"
          rel="noopener"
          aria-label={`WhatsApp ${p.nama}`}
          className="mt-4 grid size-10 place-items-center rounded-full bg-primary-50 text-primary-600 transition-all duration-200 hover:scale-110 hover:bg-primary-600 hover:text-white"
        >
          <WhatsAppIcon className="size-5" />
        </a>
      )}
    </div>
  );
}

export function Pengurus() {
  const t1 = pengurus.filter((p) => p.tingkat === 1);
  const t2 = pengurus.filter((p) => p.tingkat === 2);
  const t3 = pengurus.filter((p) => p.tingkat === 3);

  return (
    <Section id="pengurus" alt>
      <SectionHeader eyebrow={`Pengurus · Periode ${periode}`} title="Jajaran Pengurus RT 02" intro="Tak perlu sungkan — pengurus siap membantu kebutuhan warga." center />

      <Stagger className="flex justify-center">
        {t1.map((p) => (
          <StaggerItem key={p.nama} variant="scale" className="w-full max-w-xs">
            <Card p={p} big />
          </StaggerItem>
        ))}
      </Stagger>

      {/* garis penghubung bagan */}
      <div aria-hidden className="mx-auto hidden h-8 w-px bg-line md:block" />

      <Stagger className="mx-auto mt-6 grid max-w-xl grid-cols-2 gap-4 md:mt-0" delay={0.15}>
        {t2.map((p) => (
          <StaggerItem key={p.nama} variant="scale">
            <Card p={p} />
          </StaggerItem>
        ))}
      </Stagger>

      <div aria-hidden className="mx-auto hidden h-8 w-px bg-line md:block" />

      <Stagger className="mt-6 grid grid-cols-2 gap-4 md:mt-0 lg:grid-cols-3 xl:grid-cols-6" stagger={0.07} delay={0.2}>
        {t3.map((p) => (
          <StaggerItem key={p.nama} variant="scale">
            <Card p={p} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
