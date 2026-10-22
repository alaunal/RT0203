"use client";

import clsx from "clsx";
import { useInView } from "motion/react";
import type { RefObject } from "react";

export const shimmerClass =
  "animate-shimmer bg-[linear-gradient(90deg,#f2f1ec_25%,#e8e6df_50%,#f2f1ec_75%)] bg-[length:200%_100%]";

export function Shimmer({ className, label }: { className?: string; label?: string }) {
  return <div className={clsx(shimmerClass, className)} aria-busy="true" aria-label={label} role={label ? "status" : undefined} />;
}

/**
 * `true` (sekali) saat elemen mendekati viewport. Dipakai untuk menunda unduhan
 * library berat (Recharts, Leaflet, kalender) sampai benar-benar dibutuhkan.
 */
export function useNearView(ref: RefObject<Element | null>, margin: `${number}px ${number}px` = "300px 0px") {
  return useInView(ref, { once: true, margin });
}
