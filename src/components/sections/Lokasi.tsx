"use client";

import clsx from "clsx";
import { Clock, MapPin, Navigation } from "lucide-react";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef, useState } from "react";
import { Shimmer, useNearView } from "@/components/ui/lazy";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { btn, Section, SectionHeader } from "@/components/ui/primitives";
import { lokasiFoto, site } from "@/data/site";

const mapFallback = () => <Shimmer className="h-full w-full rounded-lg" label="Memuat peta" />;
const MapView = dynamic(() => import("./MapView"), { ssr: false, loading: mapFallback });
const PhotoLightbox = dynamic(() => import("./PhotoLightbox"), { ssr: false });

export function Lokasi() {
  const [index, setIndex] = useState(-1);
  const mapRef = useRef<HTMLDivElement>(null);
  // Leaflet (+ tile OSM) baru diunduh saat peta hampir terlihat.
  const mapNear = useNearView(mapRef, "100px 0px");
  const gmaps = `https://www.google.com/maps/dir/?api=1&destination=${site.lat},${site.lng}`;

  return (
    <Section id="lokasi">
      <SectionHeader eyebrow="Lokasi Kita" title="Di sinilah kita tinggal" intro={`${site.kelurahan}, ${site.kecamatan}, ${site.kota} — lingkungan hijau yang guyub dan mudah dijangkau.`} />

      <div className="grid gap-6 lg:grid-cols-12">
        <Reveal direction="right" className="lg:col-span-7">
          <div ref={mapRef} className="h-[280px] overflow-hidden rounded-lg border border-line shadow-card md:h-[420px]">
            {mapNear ? <MapView /> : mapFallback()}
          </div>
          <div className="mt-4 flex flex-col gap-4 rounded-lg border border-line bg-surface p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2 text-[15px]">
              <p className="flex gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary-600" />
                {site.alamat}
              </p>
              <p className="flex gap-2 text-muted">
                <Clock className="mt-0.5 size-4 shrink-0 text-primary-600" />
                {site.jamLayanan.join(" · ")}
              </p>
            </div>
            <a href={gmaps} target="_blank" rel="noopener" className={clsx(btn.base, btn.outline, "shrink-0")}>
              <Navigation className="size-4" /> Petunjuk Arah
            </a>
          </div>
        </Reveal>

        <Stagger className="grid grid-cols-2 content-start gap-3 lg:col-span-5 lg:gap-4" stagger={0.1}>
          {lokasiFoto.map((f, i) => (
            <StaggerItem key={f.src} variant="scale">
              <motion.button
                type="button"
                onClick={() => setIndex(i)}
                whileHover={{ y: -4 }}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-lg shadow-soft"
                aria-label={`Perbesar foto: ${f.caption}`}
              >
                <Image src={f.src} alt="" fill sizes="(min-width:1024px) 240px, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-2 pt-8 text-left text-[13px] font-semibold text-white transition-transform duration-300 group-hover:-translate-y-0.5">
                  {f.caption}
                </span>
              </motion.button>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      {index >= 0 && <PhotoLightbox index={index} close={() => setIndex(-1)} slides={lokasiFoto.map((f) => ({ src: f.src, title: f.caption }))} />}
    </Section>
  );
}
