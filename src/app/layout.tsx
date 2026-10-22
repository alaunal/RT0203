import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { MotionProvider } from "@/components/ui/motion";
import { site } from "@/data/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: {
    default: `${site.namaRt} — ${site.kecamatan}, ${site.kota}`,
    template: `%s · ${site.namaRt}`,
  },
  description: `Website resmi ${site.namaRt}, ${site.kelurahan}, ${site.kecamatan}, ${site.kota}. Info kegiatan, jadwal, kas RT, bank sampah, dan panduan warga.`,
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: site.namaRt,
    images: ["/images/hero-perumahan.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#1F6F4A",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" data-scroll-behavior="smooth" className={`${jakarta.variable} antialiased`}>
      <body className="flex min-h-svh flex-col">
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
