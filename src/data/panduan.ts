// DATA DUMMY — isi panduan bersifat contoh; sesuaikan dengan aturan kelurahan setempat.

export type Blok =
  | { tipe: "p"; teks: string }
  | { tipe: "langkah"; items: string[] }
  | { tipe: "list"; items: string[] }
  | { tipe: "info"; teks: string };

export type Panduan = {
  slug: string;
  judul: string;
  ringkasan: string;
  kategori: string;
  cover: string;
  menit: number;
  bagian: { judul: string; blok: Blok[] }[];
};

export const panduan: Panduan[] = [
  {
    slug: "cara-mengurus-surat-pengantar-rt",
    judul: "Cara Mengurus Surat Pengantar RT",
    ringkasan: "Syarat dan langkah meminta surat pengantar untuk KTP, KK, SKCK, domisili, dan keperluan lain.",
    kategori: "Administrasi",
    cover: "/images/pd-surat.jpg",
    menit: 3,
    bagian: [
      {
        judul: "Kapan butuh surat pengantar?",
        blok: [
          { tipe: "p", teks: "Surat pengantar RT diperlukan sebagai syarat awal sebelum mengurus dokumen di kelurahan atau instansi lain." },
          { tipe: "list", items: ["Pembuatan / perubahan KTP & KK", "Surat keterangan domisili", "SKCK", "Surat keterangan tidak mampu (SKTM)", "Izin keramaian / hajatan"] },
        ],
      },
      {
        judul: "Syarat",
        blok: [
          { tipe: "list", items: ["Fotokopi KTP & KK", "Formulir permohonan (unduh di halaman Dokumen)", "Bukti iuran bulan berjalan (bila diminta)"] },
        ],
      },
      {
        judul: "Langkah-langkah",
        blok: [
          { tipe: "langkah", items: ["Unduh dan isi formulir permohonan surat pengantar.", "Datang ke sekretariat RT pada jam layanan, atau hubungi sekretaris via WhatsApp untuk janji.", "Serahkan formulir dan fotokopi dokumen.", "Surat ditandatangani Ketua RT dan distempel (biasanya 1 hari kerja).", "Bawa surat ke RW 03 untuk diketahui, lalu ke Kelurahan Jatiluhur."] },
          { tipe: "info", teks: "Layanan surat pengantar di RT tidak dipungut biaya." },
        ],
      },
    ],
  },
  {
    slug: "wajib-lapor-tamu-1x24-jam",
    judul: "Wajib Lapor Tamu 1×24 Jam",
    ringkasan: "Tamu menginap lebih dari 24 jam wajib dilaporkan ke pengurus RT demi keamanan bersama.",
    kategori: "Keamanan",
    cover: "/images/pd-lapor-tamu.jpg",
    menit: 2,
    bagian: [
      {
        judul: "Mengapa wajib lapor?",
        blok: [{ tipe: "p", teks: "Laporan tamu membantu pengurus dan petugas ronda mengenali orang baru di lingkungan, sehingga keamanan tetap terjaga." }],
      },
      {
        judul: "Cara melapor",
        blok: [
          { tipe: "langkah", items: ["Isi formulir lapor tamu (nama, asal, lama menginap, keperluan).", "Kirim foto formulir & KTP tamu ke Seksi Keamanan via WhatsApp.", "Untuk tamu > 7 hari, lapor langsung ke Ketua RT."] },
          { tipe: "info", teks: "Data tamu hanya disimpan pengurus dan tidak dipublikasikan di website." },
        ],
      },
    ],
  },
  {
    slug: "jadwal-dan-tata-tertib-ronda",
    judul: "Jadwal & Tata Tertib Ronda Malam",
    ringkasan: "Pembagian regu, jam jaga, dan hal yang perlu diperhatikan saat ronda.",
    kategori: "Keamanan",
    cover: "/images/pd-ronda-gang.jpg",
    menit: 3,
    bagian: [
      {
        judul: "Jam ronda",
        blok: [{ tipe: "p", teks: "Ronda dilakukan setiap malam pukul 22.00–04.00 WIB oleh regu bergilir. Setiap KK mendapat giliran sekitar sebulan sekali." }],
      },
      {
        judul: "Tata tertib",
        blok: [
          { tipe: "list", items: ["Hadir tepat waktu dan isi buku jaga di pos ronda.", "Keliling minimal 3 kali per malam.", "Pukul kentongan sesuai kode jam.", "Bila berhalangan, tukar jadwal dan kabari koordinator regu.", "Laporkan kejadian mencurigakan ke Seksi Keamanan."] },
          { tipe: "info", teks: "Warga yang berhalangan dapat mengganti dengan iuran pengganti ronda sesuai kesepakatan rapat warga." },
        ],
      },
    ],
  },
  {
    slug: "cara-menabung-di-bank-sampah",
    judul: "Cara Menabung di Bank Sampah",
    ringkasan: "Ubah sampah anorganik jadi tabungan. Begini cara jadi nasabah Bank Sampah Berkah Bersih.",
    kategori: "Lingkungan",
    cover: "/images/pd-bank-sampah.jpg",
    menit: 3,
    bagian: [
      {
        judul: "Daftar jadi nasabah",
        blok: [{ tipe: "langkah", items: ["Datang ke sekretariat saat jadwal penimbangan.", "Isi formulir nasabah dan terima buku tabungan.", "Mulai setor sampah terpilah."] }],
      },
      {
        judul: "Tips memilah",
        blok: [
          { tipe: "list", items: ["Bilas botol & kaleng, keringkan.", "Lipat kardus agar ringkas.", "Kumpulkan minyak jelantah di jeriken tertutup.", "Pisahkan plastik keras (PET) dan plastik lembut."] },
          { tipe: "info", teks: "Harga sampah terbaru tersedia di section Bank Sampah halaman Beranda." },
        ],
      },
    ],
  },
  {
    slug: "panduan-warga-baru-pindah-datang",
    judul: "Panduan Warga Baru: Pindah Datang",
    ringkasan: "Selamat datang! Ini yang perlu dilakukan saat baru pindah ke RT 02.",
    kategori: "Administrasi",
    cover: "/images/pd-rumah-baru.jpg",
    menit: 4,
    bagian: [
      {
        judul: "Minggu pertama",
        blok: [
          { tipe: "langkah", items: ["Lapor ke Ketua RT dengan membawa fotokopi KTP & KK.", "Minta surat pengantar pindah datang bila akan pindah domisili resmi.", "Gabung grup WhatsApp warga & ikuti Channel Info RT 02/03.", "Catat jadwal ronda dan iuran bulanan."] },
        ],
      },
      {
        judul: "Iuran & fasilitas",
        blok: [
          { tipe: "p", teks: "Iuran lingkungan Rp 50.000/KK/bulan mencakup kebersihan (angkut sampah) dan keamanan. Laporan penggunaannya bisa dilihat di halaman Kas RT." },
          { tipe: "info", teks: "Ada pertanyaan? Hubungi sekretaris RT melalui tombol WhatsApp di bagian atas halaman." },
        ],
      },
    ],
  },
];
