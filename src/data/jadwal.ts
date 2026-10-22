// DATA DUMMY — PRD.md §12.4. Waktu dalam WIB (+07:00).
import type { KategoriId } from "./kategori";

export type Jadwal = {
  id: string;
  judul: string;
  kategori: KategoriId;
  mulai: string;
  selesai: string;
  lokasi: string;
  pj: string;
  deskripsi: string;
};

const wib = (date: string, time: string) => `${date}T${time}:00+07:00`;

export const jadwal: Jadwal[] = [
  { id: "j1", judul: "Posyandu balita & lansia", kategori: "kesehatan", mulai: wib("2026-10-06", "08:00"), selesai: wib("2026-10-06", "11:00"), lokasi: "Balai Warga", pj: "Kader Posyandu", deskripsi: "Penimbangan balita, imunisasi, cek tensi & gula darah lansia." },
  { id: "j2", judul: "Penimbangan bank sampah", kategori: "bank-sampah", mulai: wib("2026-10-11", "08:00"), selesai: wib("2026-10-11", "10:00"), lokasi: "Sekretariat RT", pj: "Ibu Sri Wahyuni", deskripsi: "Bawa sampah anorganik yang sudah dipilah dan buku tabungan." },
  { id: "j3", judul: "Rapat warga bulanan", kategori: "rapat", mulai: wib("2026-10-12", "19:30"), selesai: wib("2026-10-12", "21:30"), lokasi: "Sekretariat RT", pj: "Bpk. Ahmad Suryadi", deskripsi: "Laporan kas September, evaluasi keamanan, perbaikan lampu jalan." },
  { id: "j4", judul: "Latihan futsal Karang Taruna", kategori: "karang-taruna", mulai: wib("2026-10-17", "15:30"), selesai: wib("2026-10-17", "17:30"), lokasi: "Lapangan RW 03", pj: "Sdr. Bayu Saputra", deskripsi: "Latihan rutin terbuka untuk pemuda usia 15–30 tahun." },
  { id: "j5", judul: "Kerja bakti bersih saluran air", kategori: "kerja-bakti", mulai: wib("2026-10-24", "07:00"), selesai: wib("2026-10-24", "10:00"), lokasi: "Seluruh gang RT 02", pj: "Bpk. Hendra Gunawan", deskripsi: "Bawa cangkul, sapu lidi, dan karung. Konsumsi disediakan RT." },
  { id: "j6", judul: "Pengajian rutin bulanan", kategori: "keagamaan", mulai: wib("2026-10-25", "19:30"), selesai: wib("2026-10-25", "21:00"), lokasi: "Musala Al-Ikhlas", pj: "Bpk. H. Mulyadi", deskripsi: "Kajian bulanan dan doa bersama." },
  { id: "j7", judul: "Latihan futsal Karang Taruna", kategori: "karang-taruna", mulai: wib("2026-10-31", "15:30"), selesai: wib("2026-10-31", "17:30"), lokasi: "Lapangan RW 03", pj: "Sdr. Bayu Saputra", deskripsi: "Latihan rutin terbuka untuk pemuda usia 15–30 tahun." },
  { id: "j8", judul: "Rapat warga bulanan", kategori: "rapat", mulai: wib("2026-10-31", "19:30"), selesai: wib("2026-10-31", "21:30"), lokasi: "Sekretariat RT", pj: "Bpk. Ahmad Suryadi", deskripsi: "Laporan kas Oktober & persiapan jadwal ronda November." },
  { id: "j9", judul: "Posyandu balita & lansia", kategori: "kesehatan", mulai: wib("2026-11-03", "08:00"), selesai: wib("2026-11-03", "11:00"), lokasi: "Balai Warga", pj: "Kader Posyandu", deskripsi: "Penimbangan balita, imunisasi, cek tensi & gula darah lansia." },
  { id: "j10", judul: "Penimbangan bank sampah", kategori: "bank-sampah", mulai: wib("2026-11-08", "08:00"), selesai: wib("2026-11-08", "10:00"), lokasi: "Sekretariat RT", pj: "Ibu Sri Wahyuni", deskripsi: "Bawa sampah anorganik yang sudah dipilah dan buku tabungan." },
  { id: "j11", judul: "Futsal Karang Taruna", kategori: "karang-taruna", mulai: wib("2026-11-14", "15:30"), selesai: wib("2026-11-14", "17:30"), lokasi: "Lapangan RW 03", pj: "Sdr. Bayu Saputra", deskripsi: "Laga persahabatan melawan Karang Taruna RW 05." },
  { id: "j12", judul: "Fogging & PSN DBD", kategori: "kesehatan", mulai: wib("2026-11-21", "07:00"), selesai: wib("2026-11-21", "10:00"), lokasi: "Seluruh RT 02", pj: "Bpk. Hendra Gunawan", deskripsi: "Tutup makanan & minuman, keluarkan hewan peliharaan saat fogging." },
  { id: "j13", judul: "Ronda akbar & bakar jagung", kategori: "lainnya", mulai: wib("2026-11-28", "20:00"), selesai: wib("2026-11-28", "23:00"), lokasi: "Pos Ronda", pj: "Bpk. Joko Prasetyo", deskripsi: "Ronda bersama seluruh regu, sekalian silaturahmi warga." },
];
