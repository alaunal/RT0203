// DATA DUMMY — lihat PRD.md §12. Ganti dengan data asli sebelum rilis.

export const site = {
  namaRt: "RT 02 / RW 03 Jatiluhur",
  namaPendek: "RT 02/03",
  kelurahan: "Kelurahan Jatiluhur",
  kecamatan: "Kecamatan Jatiasih",
  kota: "Kota Bekasi",
  tagline: "Bersama membangun lingkungan yang rukun, bersih, dan transparan.",
  alamat: "Area RT 02 / RW 03, Kel. Jatiluhur, Kec. Jatiasih, Kota Bekasi · Patokan: Kedai ABAH Kopi YOJO",
  lokasiPatokan: "Kedai ABAH Kopi YOJO",
  // Koordinat tempat (!3d / !4d), bukan pusat kamera (@), dari tautan warga.
  lat: -6.3123034,
  lng: 106.9458975,
  googleMapsUrl: "https://www.google.com/maps/place/Kedai+ABAH+Kopi+YOJO/@-6.3122999,106.9451577,19.74z/data=!4m6!3m5!1s0x2e699331aaac91b1:0xbc06f29f9ce5887e!8m2!3d-6.3123034!4d106.9458975!16s%2Fg%2F11t3gc8j73",
  waResmi: "0812-0000-0001",
  jumlahKK: 124,
  jumlahWarga: 438,
  jamLayanan: ["Senin–Jumat · 19.00–21.00 WIB", "Sabtu · 08.00–12.00 WIB"],
  instagram: "rt02rw03jatiluhur",
  waChannel: "Info RT 02/03",
  domain: "rt02rw03jatiluhur.my.id",
  /** Tanggal acuan data dummy (WIB). */
  referenceDate: "2026-10-22",
} as const;

export const visi = "Terwujudnya lingkungan RT 02 yang aman, bersih, guyub, dan transparan.";

export const misi = [
  "Menjaga keamanan lingkungan melalui ronda bergilir dan wajib lapor tamu.",
  "Menumbuhkan budaya bersih dan pilah sampah lewat kerja bakti dan bank sampah.",
  "Mengelola kas RT secara terbuka dan dapat diperiksa setiap warga.",
  "Mempererat silaturahmi lintas usia lewat kegiatan sosial, keagamaan, dan Karang Taruna.",
  "Mempermudah layanan administrasi warga.",
];

export const lokasiFoto = [
  { src: "/images/lokasi-deret-rumah-rt.jpg", caption: "Deretan rumah warga" },
  { src: "/images/lokasi-jalan-warga-rt.jpg", caption: "Jalan lingkungan" },
  { src: "/images/lokasi-pos-ronda-rt.jpg", caption: "Pos ronda & warung" },
  { src: "/images/lokasi-gang-2-rt.jpg", caption: "Gang lingkungan" },
];

export type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };

export const navItems: NavItem[] = [
  { label: "Beranda", href: "/" },
  {
    label: "Profil",
    href: "/#visi-misi",
    children: [
      { label: "Visi & Misi", href: "/#visi-misi" },
      { label: "Pengurus", href: "/#pengurus" },
      { label: "Lokasi", href: "/#lokasi" },
    ],
  },
  {
    label: "Kegiatan",
    href: "/aktivitas",
    children: [
      { label: "Aktivitas Terbaru", href: "/aktivitas" },
      { label: "Jadwal Kegiatan", href: "/jadwal" },
      { label: "Karang Taruna", href: "/#karang-taruna" },
    ],
  },
  { label: "Kas RT", href: "/kas" },
  { label: "Bank Sampah", href: "/#bank-sampah" },
  { label: "Dokumen", href: "/dokumen" },
  { label: "Panduan", href: "/panduan" },
];
