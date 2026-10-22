import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { kategori, type KategoriId } from "@/data/kategori";
import { breadcrumbLd } from "@/lib/seo";
import { JsonLd } from "./JsonLd";
import { Reveal } from "./motion";

export const btn = {
  base: "inline-flex items-center justify-center gap-2 rounded-md px-5 h-11 md:h-12 text-[15px] font-semibold transition-all duration-150 active:scale-[.97] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-300",
  primary: "bg-primary-600 text-white hover:bg-primary-700 shadow-soft hover:shadow-card",
  accent: "bg-accent-500 text-primary-900 hover:bg-accent-400 shadow-soft hover:shadow-card",
  outline: "border-[1.5px] border-primary-600 text-primary-600 hover:bg-primary-50",
  ghost: "border-[1.5px] border-white/80 text-white bg-white/10 backdrop-blur-md hover:bg-white/20",
};

export function SectionHeader({
  eyebrow,
  title,
  intro,
  link,
  invert,
  eyebrowClass,
  center,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  link?: { href: string; label: string };
  invert?: boolean;
  eyebrowClass?: string;
  center?: boolean;
}) {
  return (
    <div className={clsx("mb-10 md:mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between", center && "md:flex-col md:items-center text-center")}>
      <Reveal className={clsx("max-w-2xl", center && "mx-auto")}>
        <p className={clsx("mb-3 text-[13px] font-bold uppercase tracking-[.08em]", eyebrowClass ?? (invert ? "text-accent-400" : "text-accent-700"))}>{eyebrow}</p>
        <h2 className={clsx("text-[24px] leading-8 md:text-[32px] md:leading-10 font-bold text-balance", invert ? "text-white" : "text-ink")}>{title}</h2>
        {intro && <p className={clsx("mt-3 text-lg leading-7", invert ? "text-white/75" : "text-muted")}>{intro}</p>}
      </Reveal>
      {link && (
        <Reveal direction="left" delay={0.15} className="shrink-0">
          <Link href={link.href} className="group inline-flex items-center gap-1.5 font-semibold text-primary-600 hover:text-primary-700">
            {link.label}
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      )}
    </div>
  );
}

export function Section({ id, children, className, alt }: { id?: string; children: ReactNode; className?: string; alt?: boolean }) {
  return (
    <section id={id} className={clsx("overflow-x-clip py-16 md:py-24", alt ? "bg-surface-alt" : "bg-bg", className)}>
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">{children}</div>
    </section>
  );
}

export function KategoriBadge({ id, className }: { id: KategoriId; className?: string }) {
  const k = kategori[id];
  const Icon = k.icon;
  return (
    <span
      className={clsx("inline-flex h-6 items-center gap-1.5 rounded-full px-2.5 text-[12px] font-semibold", className)}
      style={{ color: k.ink ?? k.color, backgroundColor: `${k.color}1f` }}
    >
      <Icon className="size-3.5" strokeWidth={2} />
      {k.label}
    </span>
  );
}

export function PageHeader({ title, intro, crumbs }: { title: string; intro?: string; crumbs: { label: string; href?: string }[] }) {
  return (
    <header className="relative overflow-hidden bg-primary-700 pt-32 pb-14 md:pt-36 md:pb-16 text-white">
      <JsonLd data={breadcrumbLd(crumbs.map((c) => ({ name: c.label, path: c.href })))} />
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[.07]" aria-hidden>
        <defs>
          <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
      <div className="relative mx-auto max-w-[1200px] px-4 md:px-6">
        <div className="animate-rise">
          <nav aria-label="Breadcrumb" className="mb-3 text-sm text-white/70">
            <ol className="flex flex-wrap items-center gap-1.5">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-1.5">
                  {i > 0 && <span aria-hidden>/</span>}
                  {c.href ? <Link href={c.href} className="hover:text-white">{c.label}</Link> : <span aria-current="page" className="text-white">{c.label}</span>}
                </li>
              ))}
            </ol>
          </nav>
          <h1 className="max-w-3xl text-[30px] leading-[38px] md:text-[40px] md:leading-[48px] font-bold text-balance">{title}</h1>
          {intro && <p className="mt-3 max-w-2xl text-lg text-white/80">{intro}</p>}
        </div>
      </div>
    </header>
  );
}
