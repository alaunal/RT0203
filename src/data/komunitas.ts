// DATA DUMMY — PRD.md §12.5 & §12.6

export const bankSampah = {
  nama: "Bank Sampah “Berkah Bersih” RT 02",
  jadwal: "Minggu ke-2 tiap bulan · 08.00–10.00 WIB",
  lokasi: "Sekretariat RT 02",
  pj: "Ibu Sri Wahyuni",
  wa: "0812-0000-0009",
  stats: { totalKg: 1284, nasabah: 57, tabungan: 3_412_000 },
  trenKg: [
    { label: "Mei", kg: 168 },
    { label: "Jun", kg: 181 },
    { label: "Jul", kg: 205 },
    { label: "Agu", kg: 247 },
    { label: "Sep", kg: 269 },
    { label: "Okt", kg: 214 },
  ],
  harga: [
    { jenis: "Plastik PET", contoh: "Botol air mineral", satuan: "kg", harga: 3000 },
    { jenis: "Plastik campur", contoh: "Kemasan, kantong", satuan: "kg", harga: 1000 },
    { jenis: "Kardus", contoh: "Kardus bekas", satuan: "kg", harga: 2000 },
    { jenis: "Kertas HVS", contoh: "Kertas putih, buku", satuan: "kg", harga: 2500 },
    { jenis: "Kaleng aluminium", contoh: "Kaleng minuman", satuan: "kg", harga: 9000 },
    { jenis: "Besi", contoh: "Besi tua", satuan: "kg", harga: 3500 },
    { jenis: "Minyak jelantah", contoh: "Minyak goreng bekas", satuan: "liter", harga: 5000 },
  ],
  hargaBerlaku: "2026-09-01",
  langkah: [
    { judul: "Pilah", teks: "Pisahkan plastik, kertas, logam, dan minyak jelantah di rumah." },
    { judul: "Bawa", teks: "Bawa ke sekretariat saat jadwal penimbangan." },
    { judul: "Timbang & catat", teks: "Petugas menimbang dan mencatat di buku tabungan." },
    { judul: "Tabungan bertambah", teks: "Saldo bisa dicairkan atau dipakai bayar iuran." },
  ],
};

export const karangTaruna = {
  nama: "Karang Taruna “Tunas Muda” RW 03",
  ketua: "Sdr. Bayu Saputra",
  wa: "0812-0000-0008",
  deskripsi:
    "Wadah pemuda RW 03 untuk berkarya, berolahraga, dan berbagi. Terbuka untuk warga usia 13–35 tahun yang ingin ikut membangun lingkungan.",
  program: ["Futsal Mingguan", "Lomba 17-an", "Bakti Sosial Ramadan", "Kelas Desain & Konten Digital", "Penghijauan"],
  kegiatan: [
    { judul: "Turnamen futsal antar-RT", tanggal: "2026-09-27", foto: "/images/kt-futsal.jpg" },
    { judul: "Gowes pagi keliling Jatiasih", tanggal: "2026-09-06", foto: "/images/kt-gowes.jpg" },
    { judul: "Diskusi pemuda: ide kegiatan 2027", tanggal: "2026-08-30", foto: "/images/kt-diskusi.jpg" },
    { judul: "Camping ceria Karang Taruna", tanggal: "2026-07-12", foto: "/images/kt-hiking.jpg" },
    { judul: "Susur situ & bersih danau", tanggal: "2026-06-21", foto: "/images/kt-kano.jpg" },
  ],
};
