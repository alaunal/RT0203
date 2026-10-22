"use client";

import clsx from "clsx";
import { addMonths, addWeeks, format, getDay, parse, parseISO, startOfWeek, subMonths, subWeeks } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { CalendarPlus, ChevronLeft, ChevronRight, Clock, MapPin, User, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { Calendar, dateFnsLocalizer, type View } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { WhatsAppIcon } from "@/components/ui/icons";
import { KategoriBadge } from "@/components/ui/primitives";
import { kategori } from "@/data/kategori";
import { jadwal, type Jadwal } from "@/data/jadwal";
import { dateLong, timeWIB, waShareUrl } from "@/lib/format";

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (d: Date) => startOfWeek(d, { weekStartsOn: 1 }),
  getDay,
  locales: { id: localeId },
});

type CalEvent = { title: string; start: Date; end: Date; resource: Jadwal };

const messages = {
  date: "Tanggal",
  time: "Waktu",
  event: "Kegiatan",
  allDay: "Seharian",
  noEventsInRange: "Belum ada kegiatan di rentang ini.",
  showMore: (n: number) => `+${n} lainnya`,
};

const views: { id: View; label: string }[] = [
  { id: "month", label: "Bulan" },
  { id: "week", label: "Minggu" },
  { id: "agenda", label: "Agenda" },
];

function googleCalUrl(j: Jadwal) {
  const f = (s: string) => parseISO(s).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const p = new URLSearchParams({
    action: "TEMPLATE",
    text: j.judul,
    dates: `${f(j.mulai)}/${f(j.selesai)}`,
    location: j.lokasi,
    details: j.deskripsi,
    ctz: "Asia/Jakarta",
  });
  return `https://calendar.google.com/calendar/render?${p}`;
}

export default function EventCalendar({ height = 680 }: { height?: number }) {
  const [now] = useState(() => new Date());
  const [date, setDate] = useState(now);
  // Komponen ini client-only (ssr: false), jadi aman membaca window saat inisialisasi.
  const [view, setView] = useState<View>(() => (window.matchMedia("(max-width: 767px)").matches ? "agenda" : "month"));
  const [dir, setDir] = useState(0);
  const [selected, setSelected] = useState<Jadwal | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const events = useMemo<CalEvent[]>(
    () => jadwal.map((j) => ({ title: j.judul, start: parseISO(j.mulai), end: parseISO(j.selesai), resource: j })),
    [],
  );

  const step = (n: 1 | -1) => {
    setDir(n);
    if (view === "week") setDate((d) => (n > 0 ? addWeeks(d, 1) : subWeeks(d, 1)));
    else setDate((d) => (n > 0 ? addMonths(d, 1) : subMonths(d, 1)));
  };

  const title = format(date, view === "week" ? "'Minggu' d MMM yyyy" : "MMMM yyyy", { locale: localeId });

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => step(-1)} aria-label="Sebelumnya" className="grid size-10 place-items-center rounded-md border border-line bg-surface transition hover:bg-primary-50 active:scale-95">
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => {
              setDir(0);
              setDate(new Date());
            }}
            className="h-10 whitespace-nowrap rounded-md border border-line bg-surface px-3 text-sm font-semibold transition hover:bg-primary-50 active:scale-95 md:px-4"
          >
            Hari ini
          </button>
          <button type="button" onClick={() => step(1)} aria-label="Berikutnya" className="grid size-10 place-items-center rounded-md border border-line bg-surface transition hover:bg-primary-50 active:scale-95">
            <ChevronRight className="size-5" />
          </button>
          <div className="relative ml-1 h-8 min-w-0 flex-1 overflow-hidden md:ml-2 md:min-w-56">
            <AnimatePresence mode="popLayout" initial={false} custom={dir}>
              <motion.h3
                key={title}
                custom={dir}
                initial={{ y: dir >= 0 ? 24 : -24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: dir >= 0 ? -24 : 24, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute whitespace-nowrap text-lg font-bold capitalize md:text-xl"
                aria-live="polite"
              >
                {title}
              </motion.h3>
            </AnimatePresence>
          </div>
        </div>

        <div className="inline-flex self-start rounded-md border border-line bg-surface p-1" role="tablist" aria-label="Tampilan kalender">
          {views.map((v) => (
            <button
              key={v.id}
              type="button"
              role="tab"
              aria-selected={view === v.id}
              onClick={() => setView(v.id)}
              className={clsx("relative h-9 rounded-[8px] px-4 text-sm font-semibold transition-colors", view === v.id ? "text-white" : "text-muted hover:text-ink")}
            >
              {view === v.id && <motion.span layoutId="cal-view-pill" className="absolute inset-0 rounded-[8px] bg-primary-600" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
              <span className="relative">{v.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Calendar */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`${view}-${format(date, view === "week" ? "yyyy-II" : "yyyy-MM")}`}
          initial={{ opacity: 0, x: dir * 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: dir * -40 }}
          transition={{ duration: 0.28 }}
          style={{ height: view === "agenda" ? "auto" : height }}
        >
          <Calendar<CalEvent>
            localizer={localizer}
            culture="id"
            events={events}
            date={date}
            view={view}
            onView={setView}
            onNavigate={setDate}
            views={["month", "week", "agenda"]}
            toolbar={false}
            length={60}
            messages={messages}
            popup
            min={new Date(1970, 0, 1, 6)}
            max={new Date(1970, 0, 1, 23, 59)}
            onSelectEvent={(e) => setSelected(e.resource)}
            // Warna lewat CSS var: blok penuh di Bulan/Minggu, aksen garis kiri di Agenda (lihat globals.css)
            eventPropGetter={(e) => ({
              style: {
                "--ev": kategori[e.resource.kategori].color,
                opacity: e.end < now ? 0.5 : 1,
              } as CSSProperties,
            })}
            formats={{
              agendaDateFormat: (d) => format(d, "EEE, d MMM", { locale: localeId }),
              agendaTimeRangeFormat: ({ start, end }) => `${format(start, "HH.mm")}–${format(end, "HH.mm")}`,
              eventTimeRangeFormat: () => "",
              timeGutterFormat: (d) => format(d, "HH.mm"),
              weekdayFormat: (d) => format(d, "EEE", { locale: localeId }),
              dayFormat: (d) => format(d, "EEE d", { locale: localeId }),
            }}
            style={{ height: view === "agenda" ? "auto" : "100%" }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Legend */}
      <motion.ul
        className="mt-5 flex flex-wrap gap-2"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{ show: { transition: { staggerChildren: 0.05 } } }}
        aria-label="Keterangan kategori"
      >
        {Object.keys(kategori).map((k) => (
          <motion.li key={k} variants={{ hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1 } }}>
            <KategoriBadge id={k as keyof typeof kategori} />
          </motion.li>
        ))}
      </motion.ul>

      <EventModal j={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

function EventModal({ j, onClose }: { j: Jadwal | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {j && (
        <motion.div className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-primary-900/50 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="event-title"
            className="relative w-full max-w-md overflow-hidden rounded-t-lg bg-surface shadow-lift sm:rounded-lg"
            initial={{ y: 60, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 40, scale: 0.97, opacity: 0 }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
          >
            <div className="h-2" style={{ backgroundColor: kategori[j.kategori].color }} />
            <div className="p-6">
              <button type="button" onClick={onClose} aria-label="Tutup" className="absolute right-3 top-5 grid size-10 place-items-center rounded-full hover:bg-surface-alt">
                <X className="size-5" />
              </button>
              <KategoriBadge id={j.kategori} />
              <h3 id="event-title" className="mt-3 pr-8 text-[22px] font-bold leading-[30px]">{j.judul}</h3>
              <ul className="mt-4 space-y-2.5 text-[15px]">
                <li className="flex gap-2.5">
                  <Clock className="mt-0.5 size-4 shrink-0 text-primary-600" />
                  <span>
                    {dateLong(j.mulai)}
                    <br />
                    <span className="text-muted">{timeWIB(j.mulai)}–{timeWIB(j.selesai)} WIB</span>
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-primary-600" />
                  {j.lokasi}
                </li>
                <li className="flex gap-2.5">
                  <User className="mt-0.5 size-4 shrink-0 text-primary-600" />
                  PJ: {j.pj}
                </li>
              </ul>
              <p className="mt-4 rounded-md bg-surface-alt p-3 text-[15px] text-muted">{j.deskripsi}</p>
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                <a href={googleCalUrl(j)} target="_blank" rel="noopener" className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary-600 text-sm font-semibold text-white hover:bg-primary-700">
                  <CalendarPlus className="size-4" /> Google Calendar
                </a>
                <a
                  href={waShareUrl(`📅 ${j.judul}\n${dateLong(j.mulai)}, ${timeWIB(j.mulai)} WIB\n📍 ${j.lokasi}\n\n${j.deskripsi}`)}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-md border-[1.5px] border-primary-600 text-sm font-semibold text-primary-600 hover:bg-primary-50"
                >
                  <WhatsAppIcon className="size-4" /> Bagikan
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
