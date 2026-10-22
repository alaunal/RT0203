// DATA DUMMY — lihat PRD.md §12. Ganti dengan data asli sebelum rilis.

export const site = {
  namaRt: "RT 02 / RW 03 Jatiluhur",
  namaPendek: "RT 02/03",
  kelurahan: "Kelurahan Jatiluhur",
  kecamatan: "Kecamatan Jatiasih",
  kota: "Kota Bekasi",
  tagline: "Bersama membangun lingkungan yang rukun, bersih, dan transparan.",
  alamat: "Sekretariat RT 02, Jl. Contoh Raya No. 12, Kel. Jatiluhur, Kec. Jatiasih, Kota Bekasi 17425",
  lat: -6.295,
  lng: 106.952,
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
  { src: "/images/lokasi-deret-rumah.jpg", caption: "Deretan rumah warga" },
  { src: "/images/lokasi-jalan-warga.jpg", caption: "Jalan lingkungan" },
  { src: "/images/lokasi-pos-ronda.jpg", caption: "Pos ronda & warung" },
  { src: "/images/lokasi-gang-2.jpg", caption: "Gang 2" },
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
