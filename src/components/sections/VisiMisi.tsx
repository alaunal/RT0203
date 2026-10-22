import { Quote } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { misi, visi } from "@/data/site";

export function VisiMisi() {
  return (
    <section id="visi-misi" className="relative overflow-hidden bg-primary-900 py-16 text-white md:py-24">
      {/* ornamen lingkaran */}
      <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 size-80 rounded-full border border-white/10" />
      <div aria-hidden className="pointer-events-none absolute -bottom-32 -right-20 size-[28rem] rounded-full border border-accent-500/20" />

      <div className="relative mx-auto max-w-[1200px] px-4 md:px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-[13px] font-bold uppercase tracking-[.08em] text-accent-400">Visi</p>
          <Quote className="mx-auto mb-4 size-10 text-accent-400" strokeWidth={1.5} />
          <blockquote className="text-[24px] font-bold leading-8 text-balance md:text-[32px] md:leading-[42px]">“{visi}”</blockquote>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-14 max-w-4xl">
          <p className="mb-6 text-center text-[13px] font-bold uppercase tracking-[.08em] text-accent-400">Misi</p>
        </Reveal>
        <Stagger as="ol" className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2" stagger={0.1}>
          {misi.map((m, i) => (
            <StaggerItem
              as="li"
              key={m}
              variant="left"
              className="group flex gap-4 rounded-lg border border-white/10 bg-white/5 p-5 transition-colors duration-300 hover:border-accent-500/50 hover:bg-white/10"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent-500 text-lg font-extrabold text-primary-900 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                {i + 1}
              </span>
              <span className="text-lg leading-7 text-white/90">{m}</span>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
