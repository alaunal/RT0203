import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { siteDescription } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.namaRt,
    short_name: site.namaPendek,
    description: siteDescription,
    lang: "id",
    start_url: "/",
    display: "standalone",
    background_color: "#FAFAF7",
    theme_color: "#1F6F4A",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/pwa-icon/192", sizes: "192x192", type: "image/png" },
      { src: "/pwa-icon/512", sizes: "512x512", type: "image/png" },
      { src: "/pwa-icon/maskable-512", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
