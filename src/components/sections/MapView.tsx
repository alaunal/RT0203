"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import { site } from "@/data/site";

const pin = L.divIcon({
  className: "",
  html: `<div style="position:relative;width:40px;height:52px">
    <span style="position:absolute;left:4px;top:4px;width:32px;height:32px;border-radius:999px;background:#1F6F4A;opacity:.35;animation:pin-pulse 2s ease-out infinite"></span>
    <svg viewBox="0 0 40 52" width="40" height="52" style="position:relative;filter:drop-shadow(0 4px 6px rgba(0,0,0,.25))">
      <path d="M20 0C9 0 0 9 0 20c0 15 20 32 20 32s20-17 20-32C40 9 31 0 20 0z" fill="#1F6F4A"/>
      <circle cx="20" cy="20" r="9" fill="#E8A33D"/>
    </svg>
  </div>
  <style>@keyframes pin-pulse{0%{transform:scale(.6);opacity:.5}100%{transform:scale(2.2);opacity:0}}</style>`,
  iconSize: [40, 52],
  iconAnchor: [20, 52],
  popupAnchor: [0, -48],
});

/**
 * Leaflet langsung (tanpa react-leaflet): setiap mount membuat peta baru dan
 * cleanup memanggil map.remove(), jadi aman saat Strict Mode / route yang
 * disembunyikan lalu ditampilkan lagi me-remount effect
 * (sebelumnya: "Map container is being reused by another instance").
 */
export default function MapView() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const map = L.map(ref.current, { center: [site.lat, site.lng], zoom: 16, scrollWheelZoom: false });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const gmaps = `https://www.google.com/maps/search/?api=1&query=${site.lat},${site.lng}`;
    L.marker([site.lat, site.lng], { icon: pin })
      .addTo(map)
      .bindPopup(`<strong>${site.namaRt}</strong><br/>Sekretariat RT 02<br/><a href="${gmaps}" target="_blank" rel="noopener">Buka di Google Maps</a>`);

    return () => {
      map.remove();
    };
  }, []);

  return <div ref={ref} className="h-full w-full" />;
}
