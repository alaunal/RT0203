// DATA DUMMY — foto ilustrasi AI; bukan dokumentasi kegiatan warga asli.
import type { KategoriId } from "./kategori";

export type Aktivitas = {
  slug: string;
  judul: string;
  ringkasan: string;
  isi: string[];
  kategori: KategoriId;
  tanggal: string;
  lokasi: string;
  cover: string;
  galeri: string[];
};

export const aktivitas: Aktivitas[] = [
  {
    slug: "rapat-warga-oktober-2026",
    judul: "Rapat Warga Bulanan Oktober: Bahas Lampu Jalan & Jadwal Ronda",
    ringkasan: "Warga menyepakati perbaikan 3 titik lampu jalan dan rotasi jadwal ronda baru mulai November.",
    isi: [
      "Rapat warga bulanan RT 02 digelar di sekretariat RT dan dihadiri 46 perwakilan KK. Agenda utama adalah evaluasi keamanan lingkungan dan laporan kas bulan September.",
      "Bendahara memaparkan laporan kas dan warga menyetujui perbaikan tiga titik lampu jalan yang padam di gang 2 dan gang 4. Perbaikan sudah dilaksanakan pada 18 Oktober.",
      "Seksi Keamanan mengusulkan rotasi jadwal ronda agar setiap KK mendapat giliran sebulan sekali. Jadwal baru akan dibagikan lewat website dan grup WhatsApp.",
    ],
    kategori: "rapat",
    tanggal: "2026-10-12",
    lokasi: "Sekretariat RT",
    cover: "/images/akt-rapat-rumah-rt.jpg",
    galeri: ["/images/akt-rapat-rumah-rt.jpg", "/images/lokasi-gang-2-rt.jpg"],
  },
  {
    slug: "penimbangan-bank-sampah-oktober",
    judul: "Penimbangan Bank Sampah: 214 kg Terkumpul Bulan Ini",
    ringkasan: "Rekor baru! 41 nasabah menyetor sampah terpilah, didominasi kardus dan botol plastik.",
    isi: [
      "Penimbangan rutin Bank Sampah Berkah Bersih berlangsung Minggu pagi. Sebanyak 41 nasabah menyetor total 214 kg sampah anorganik terpilah.",
      "Kardus dan botol PET menjadi jenis terbanyak. Hasil penjualan ke pengepul sebagian masuk ke tabungan nasabah dan sebagian disetor ke kas RT.",
    ],
    kategori: "bank-sampah",
    tanggal: "2026-10-11",
    lokasi: "Sekretariat RT",
    cover: "/images/akt-bank-sampah-rt.jpg",
    galeri: ["/images/akt-bank-sampah-rt.jpg", "/images/bs-kertas-rt.jpg"],
  },
  {
    slug: "posyandu-balita-lansia-oktober",
    judul: "Posyandu Balita & Lansia Bersama Kader Kesehatan",
    ringkasan: "32 balita ditimbang dan 18 lansia cek tensi & gula darah gratis.",
    isi: [
      "Kader posyandu bersama petugas Puskesmas Jatiluhur melayani penimbangan balita, imunisasi, serta pemeriksaan tekanan darah dan gula darah untuk lansia.",
      "Warga diingatkan membawa buku KIA pada jadwal posyandu berikutnya.",
    ],
    kategori: "kesehatan",
    tanggal: "2026-10-06",
    lokasi: "Balai Warga",
    cover: "/images/akt-posyandu-gang-rt.jpg",
    galeri: ["/images/akt-posyandu-gang-rt.jpg"],
  },
  {
    slug: "futsal-karang-taruna-september",
    judul: "Turnamen Futsal Antar-RT Karang Taruna Tunas Muda",
    ringkasan: "Tim RT 02 melaju ke semifinal di turnamen persahabatan se-RW 03.",
    isi: [
      "Karang Taruna Tunas Muda RW 03 menggelar turnamen futsal persahabatan yang diikuti 6 tim dari tiap RT.",
      "Tim RT 02 berhasil melaju ke semifinal. Terima kasih untuk warga yang datang memberi dukungan!",
    ],
    kategori: "karang-taruna",
    tanggal: "2026-09-27",
    lokasi: "Lapangan RW 03",
    cover: "/images/akt-futsal-rt.jpg",
    galeri: ["/images/akt-futsal-rt.jpg", "/images/kt-futsal-rt.jpg"],
  },
  {
    slug: "kerja-bakti-saluran-air-september",
    judul: "Kerja Bakti Bersihkan Saluran Air Jelang Musim Hujan",
    ringkasan: "Puluhan warga turun membersihkan selokan untuk mencegah banjir.",
    isi: [
      "Menyambut musim hujan, warga RT 02 bergotong royong membersihkan saluran air di seluruh gang. Sedimen dan sampah yang menyumbat diangkut menggunakan gerobak.",
      "Seksi Kebersihan mengimbau warga tidak membuang sampah ke selokan dan menggunakan bank sampah untuk sampah anorganik.",
    ],
    kategori: "kerja-bakti",
    tanggal: "2026-09-20",
    lokasi: "Seluruh gang RT 02",
    cover: "/images/akt-kerja-bakti-jalan-rt.jpg",
    galeri: ["/images/akt-kerja-bakti-jalan-rt.jpg", "/images/akt-deret-rumah-rt.jpg"],
  },
  {
    slug: "sepeda-santai-hut-ri",
    judul: "Sepeda Santai Meriahkan HUT RI ke-81",
    ringkasan: "Rute 8 km keliling Jatiluhur diikuti warga dari anak-anak hingga lansia.",
    isi: [
      "Rangkaian HUT RI ke-81 dibuka dengan sepeda santai keliling Kelurahan Jatiluhur. Peserta mendapat kupon doorprize yang diundi pada malam tirakatan.",
    ],
    kategori: "lainnya",
    tanggal: "2026-08-16",
    lokasi: "Start: Gerbang RT 02",
    cover: "/images/akt-sepeda-santai-rt.jpg",
    galeri: ["/images/akt-sepeda-santai-rt.jpg", "/images/kt-gowes-rt.jpg"],
  },
  {
    slug: "pengajian-bulanan-agustus",
    judul: "Pengajian Bulanan & Santunan Anak Yatim",
    ringkasan: "Pengajian rutin dilanjutkan santunan untuk 12 anak yatim di lingkungan RW 03.",
    isi: [
      "Seksi Sosial & Keagamaan menggelar pengajian bulanan yang dirangkai dengan santunan anak yatim dari dana sumbangan sukarela warga.",
    ],
    kategori: "keagamaan",
    tanggal: "2026-08-09",
    lokasi: "Musala Al-Ikhlas",
    cover: "/images/akt-pengajian-rt.jpg",
    galeri: ["/images/akt-pengajian-rt.jpg"],
  },
  {
    slug: "penghijauan-taman-warga",
    judul: "Penghijauan Taman Warga: 40 Bibit Pohon Ditanam",
    ringkasan: "Lahan kosong di ujung gang 3 disulap menjadi taman bermain hijau.",
    isi: [
      "Bekerja sama dengan Karang Taruna, warga menanam 40 bibit pohon buah dan tanaman peneduh di lahan kosong ujung gang 3.",
      "Taman ini nantinya dilengkapi bangku dan area bermain anak.",
    ],
    kategori: "kerja-bakti",
    tanggal: "2026-07-19",
    lokasi: "Taman Gang 3",
    cover: "/images/akt-penghijauan-taman-rt.jpg",
    galeri: ["/images/akt-penghijauan-taman-rt.jpg", "/images/akt-taman-warga-rt.jpg"],
  },
];

export const aktivitasSorted = [...aktivitas].sort((a, b) => b.tanggal.localeCompare(a.tanggal));
