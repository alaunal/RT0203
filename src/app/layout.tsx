import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { MotionProvider } from "@/components/ui/motion";
import { JsonLd } from "@/components/ui/JsonLd";
import { site } from "@/data/site";
import { absUrl, keywords, orgId, siteDescription, siteUrl } from "@/lib/seo";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.namaRt} — ${site.kecamatan}, ${site.kota}`,
    template: `%s · ${site.namaRt}`,
  },
  description: siteDescription,
  applicationName: site.namaRt,
  keywords,
  authors: [{ name: `Pengurus ${site.namaRt}`, url: siteUrl }],
  creator: site.namaRt,
  publisher: site.namaRt,
  category: "community",
  alternates: { canonical: "/" },
  formatDetection: { telephone: false, address: false, email: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: site.namaRt,
    url: "/",
    title: `${site.namaRt} — ${site.kecamatan}, ${site.kota}`,
    description: siteDescription,
  },
  twitter: { card: "summary_large_image" },
  other: { "geo.region": "ID-JB", "geo.placename": `${site.kelurahan}, ${site.kota}`, "geo.position": `${site.lat};${site.lng}`, ICBM: `${site.lat}, ${site.lng}` },
};

export const viewport: Viewport = {
  themeColor: "#1F6F4A",
  colorScheme: "light",
};

const websiteLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": orgId,
      name: site.namaRt,
      alternateName: [site.namaPendek, "RT 02 RW 03 Kelurahan Jatiluhur"],
      url: siteUrl,
      logo: absUrl("/pwa-icon/512"),
      image: absUrl("/opengraph-image"),
      description: siteDescription,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Jl. Contoh Raya No. 12",
        addressLocality: "Jatiluhur, Jatiasih",
        addressRegion: "Jawa Barat",
        postalCode: "17425",
        addressCountry: "ID",
      },
      geo: { "@type": "GeoCoordinates", latitude: site.lat, longitude: site.lng },
      areaServed: { "@type": "Place", name: `${site.namaRt}, ${site.kelurahan}, ${site.kecamatan}, ${site.kota}` },
      sameAs: [`https://instagram.com/${site.instagram}`],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: site.namaRt,
      inLanguage: "id-ID",
      publisher: { "@id": orgId },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" data-scroll-behavior="smooth" className={`${jakarta.variable} antialiased`}>
      <body className="flex min-h-svh flex-col">
        <JsonLd data={websiteLd} />
        <MotionProvider>
          <Navbar />
          <main id="konten" className="flex-1">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
