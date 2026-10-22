"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { Shimmer, useNearView } from "@/components/ui/lazy";

function Skeleton() {
  return (
    <div className="space-y-4">
      <Shimmer className="h-10 w-72 rounded-md" />
      <Shimmer className="h-[520px] rounded-lg" label="Memuat kalender" />
    </div>
  );
}

// Client-only: jam event bergantung zona waktu perangkat (WIB), hindari mismatch dengan server.
const EventCalendar = dynamic(() => import("./EventCalendar"), { ssr: false, loading: Skeleton });

/** react-big-calendar + date-fns baru diunduh saat kalender mendekati layar. */
export function CalendarLoader({ height }: { height?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const near = useNearView(ref, "400px 0px");
  return <div ref={ref}>{near ? <EventCalendar height={height} /> : <Skeleton />}</div>;
}
