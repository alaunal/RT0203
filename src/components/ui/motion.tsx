"use client";

import { animate, motion, MotionConfig, useInView, useReducedMotion, type Variants } from "motion/react";
import { useEffect, useRef, useState, type ComponentProps, type ReactNode } from "react";
import { rupiah } from "@/lib/format";

export const EASE = [0.2, 0.8, 0.2, 1] as const;

export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user" transition={{ ease: EASE }}>{children}</MotionConfig>;
}

type Direction = "up" | "down" | "left" | "right" | "none";

const offset = (dir: Direction, distance = 28) =>
  ({
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  })[dir];

/** Fade + geser saat masuk viewport (sekali). */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className,
  as = "div",
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "span";
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, ...offset(direction) }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

const containerVariants = (stagger: number, delay: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

export const itemVariants: Record<string, Variants> = {
  up: { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } } },
  left: { hidden: { opacity: 0, x: -28 }, show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE } } },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 260, damping: 22 } },
  },
};

/** Container yang men-stagger anak <StaggerItem>. */
export function Stagger({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: "div" | "ul" | "ol" | "tbody";
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      variants={containerVariants(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({
  children,
  className,
  variant = "up",
  as = "div",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof itemVariants;
  as?: "div" | "li" | "article" | "tr";
} & Omit<ComponentProps<typeof motion.div>, "children" | "className" | "variants">) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp className={className} variants={itemVariants[variant]} {...rest}>
      {children}
    </Comp>
  );
}

/** Format siap pakai — bisa dikirim dari Server Component (fungsi tidak bisa). */
const presets = {
  number: (n: number) => Math.round(n).toLocaleString("id-ID"),
  rupiah: (n: number) => rupiah(Math.round(n)),
  percent: (n: number) => `${Math.round(n)}%`,
};

/** Angka berjalan dari 0 ke `value` saat terlihat. */
export function CountUp({
  value,
  preset = "number",
  format = presets[preset],
  duration = 1.4,
  className,
}: {
  value: number;
  preset?: keyof typeof presets;
  format?: (n: number) => string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const reduce = useReducedMotion();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, { duration, ease: EASE, onUpdate: setCurrent });
    return () => controls.stop();
  }, [inView, value, duration, reduce]);

  const shown = reduce ? (inView ? value : 0) : current;

  return (
    <span ref={ref} className={className} aria-label={format(value)}>
      <span aria-hidden>{format(shown)}</span>
    </span>
  );
}
