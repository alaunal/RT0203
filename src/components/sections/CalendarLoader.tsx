"use client";

import dynamic from "next/dynamic";

// Client-only: jam event bergantung zona waktu perangkat (WIB), hindari mismatch dengan server.
const EventCalendar = dynamic(() => import("./EventCalendar"), {
  ssr: false,
  loading: () => (
    <div className="space-y-4" aria-busy="true" aria-label="Memuat kalender">
      <div className="h-10 w-72 animate-shimmer rounded-md bg-[linear-gradient(90deg,#f2f1ec_25%,#e8e6df_50%,#f2f1ec_75%)] bg-[length:200%_100%]" />
      <div className="h-[520px] animate-shimmer rounded-lg bg-[linear-gradient(90deg,#f2f1ec_25%,#e8e6df_50%,#f2f1ec_75%)] bg-[length:200%_100%]" />
    </div>
  ),
});

export function CalendarLoader({ height }: { height?: number }) {
  return <EventCalendar height={height} />;
}
