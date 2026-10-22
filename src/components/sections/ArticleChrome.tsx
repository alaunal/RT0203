"use client";

import clsx from "clsx";
import { motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";

/** Bar progres baca di bawah navbar. */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });
  return <motion.div aria-hidden style={{ scaleX }} className="fixed inset-x-0 top-16 z-40 h-1 origin-left bg-accent-500 lg:top-[72px]" />;
}

/** Daftar isi sticky dengan highlight bagian aktif. */
export function Toc({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="Daftar isi" className="rounded-lg bg-surface p-5 shadow-soft ring-1 ring-line/60">
      <p className="mb-3 text-[13px] font-bold uppercase tracking-[.08em] text-accent-700">Daftar isi</p>
      <ol className="relative space-y-1 border-l-2 border-line">
        {items.map((i) => (
          <li key={i.id} className="relative">
            {active === i.id && <motion.span layoutId="toc-active" className="absolute -left-[2px] top-0 h-full w-0.5 bg-primary-600" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
            <a href={`#${i.id}`} className={clsx("block py-1.5 pl-4 text-[15px] transition-colors", active === i.id ? "font-semibold text-primary-700" : "text-muted hover:text-ink")}>
              {i.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
