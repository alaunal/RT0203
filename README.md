# Website RT 02 / RW 03 Jatiluhur

Website informasi warga RT 02 / RW 03, Kel. Jatiluhur, Kec. Jatiasih, Kota Bekasi.
Spesifikasi: [`../PRD.md`](../PRD.md) · Desain: [`../design.md`](../design.md)

> ⚠️ Semua data (nama, nomor, angka kas, foto) masih **DUMMY** — lihat PRD §12. Ganti sebelum rilis.

## Menjalankan

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm run start   # mode produksi
```

Butuh Node.js ≥ 20.9.

## Stack

| Kebutuhan | Library |
|---|---|
| Framework | Next.js 16 (App Router, Cache Components) + TypeScript |
| Styling | Tailwind CSS v4 — token design.md ada di `src/app/globals.css` (`@theme`) |
| Animasi | `motion` (Framer Motion) |
| Kalender | `react-big-calendar` + `date-fns` (locale `id`, minggu mulai Senin) |
| Grafik | `recharts` |
| Peta | `leaflet` langsung (OpenStreetMap, tanpa API key) |
| Lightbox foto | `yet-another-react-lightbox` |
| Ikon | `lucide-react` (+ ikon WhatsApp/Instagram kustom di `components/ui/icons.tsx`) |
| Font | Plus Jakarta Sans via `next/font` |

## Struktur

```
src/
├── app/                    # halaman: /, /aktivitas, /aktivitas/[slug], /jadwal, /kas, /dokumen, /panduan, /panduan/[slug]
├── components/
│   ├── layout/             # Navbar (scrollspy, dropdown, drawer), Footer
│   ├── sections/           # section beranda + komponen halaman detail
│   └── ui/                 # motion.tsx (Reveal, Stagger, CountUp), primitives.tsx (Section, SectionHeader, badge, tombol)
├── data/                   # ⬅ DATA DUMMY — edit di sini
└── lib/format.ts           # format Rupiah, tanggal Indonesia, link WhatsApp
public/
├── images/                 # foto lingkungan (Unsplash) + placeholder — sumber di images/CREDITS.md
└── dokumen/                # PDF placeholder
```

Saldo kas **dihitung otomatis** dari `data/kas.ts → transaksi` (PRD §6.8), jadi cukup tambah transaksi.

## Animasi per section

| Section | Interaksi |
|---|---|
| Navbar | Slide-in saat load, transparan → solid saat scroll, garis aktif berpindah (scrollspy), dropdown & drawer mobile ber-animasi |
| Hero | Ken Burns zoom, parallax saat scroll, teks muncul bertahap, angka statistik berjalan (count-up) |
| Lokasi | Peta masuk dari kiri, foto pop-in bertahap, zoom saat hover, lightbox |
| Aktivitas | Kartu muncul bertahap, kartu terangkat + foto zoom saat hover |
| Jadwal | Judul bulan & grid bergeser sesuai arah navigasi, pill tampilan ber-animasi, modal detail (spring) |
| Visi & Misi | Kutipan fade-up, butir misi masuk dari kiri, nomor berputar saat hover |
| Pengurus | Kartu pop-in per tingkat jabatan, ring avatar saat hover |
| Kas RT | Count-up angka, grafik digambar saat terlihat, baris transaksi bertahap |
| Karang Taruna | Kartu carousel meluncur masuk, ikon piala melayang dengan cincin berputar, chip program pop-in |
| Bank Sampah | Garis progres langkah terisi mengikuti scroll, ikon statistik berputar, tabel harga bertahap |
| Dokumen | Filter chip ber-animasi, list menyusun ulang saat difilter/dicari |
| Panduan | Panah "Baca" bergeser saat hover; halaman artikel: progress bar baca + daftar isi aktif |

Semua animasi menghormati `prefers-reduced-motion`.

## Catatan

- Kalender dirender client-only supaya jam event mengikuti zona waktu perangkat (WIB) tanpa mismatch hidrasi.
- Kalau perubahan `globals.css` tidak muncul di build produksi, hapus cache: `rm -rf .next`.
- Panel admin (PRD §6.14) belum dibuat — data masih file statis di `src/data/`.
