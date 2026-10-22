// DATA DUMMY — angka fiktif (PRD.md §12.3).
// Saldo selalu dihitung dari transaksi, tidak diinput manual (PRD §6.8).

export type Transaksi = {
  id: string;
  tanggal: string;
  uraian: string;
  kategori: string;
  jenis: "masuk" | "keluar";
  nominal: number;
};

export const saldoAwal = { tanggal: "2026-05-01", nominal: 8_750_000 };

export const iuranPerKK = 50_000;

export const laporanInfo = {
  diperbarui: "2026-10-20",
  verifikator: "Ibu Dewi Anggraini (Bendahara)",
};

let seq = 0;
const t = (tanggal: string, uraian: string, kategori: string, jenis: Transaksi["jenis"], nominal: number): Transaksi => ({
  id: `trx-${++seq}`,
  tanggal,
  uraian,
  kategori,
  jenis,
  nominal,
});

export const transaksi: Transaksi[] = [
  // Mei 2026
  t("2026-05-01", "Iuran warga Mei (103 KK)", "Iuran", "masuk", 5_150_000),
  t("2026-05-03", "Honor petugas sampah", "Kebersihan", "keluar", 1_200_000),
  t("2026-05-05", "Honor satpam / hansip", "Keamanan", "keluar", 1_500_000),
  t("2026-05-10", "Setoran hasil bank sampah ke kas", "Bank Sampah", "masuk", 450_000),
  t("2026-05-14", "Perbaikan atap pos ronda", "Fasilitas", "keluar", 800_000),
  t("2026-05-23", "Pembelian alat kebersihan", "Kebersihan", "keluar", 300_000),
  t("2026-05-30", "Konsumsi rapat warga", "Rapat", "keluar", 350_000),
  // Juni 2026
  t("2026-06-01", "Iuran warga Juni (100 KK)", "Iuran", "masuk", 5_000_000),
  t("2026-06-03", "Honor petugas sampah", "Kebersihan", "keluar", 1_200_000),
  t("2026-06-05", "Honor satpam / hansip", "Keamanan", "keluar", 1_500_000),
  t("2026-06-14", "Setoran hasil bank sampah ke kas", "Bank Sampah", "masuk", 450_000),
  t("2026-06-18", "Santunan warga meninggal", "Sosial", "keluar", 500_000),
  t("2026-06-22", "ATK & fotokopi", "Administrasi", "keluar", 350_000),
  t("2026-06-27", "Konsumsi rapat warga", "Rapat", "keluar", 350_000),
  // Juli 2026
  t("2026-07-01", "Iuran warga Juli (105 KK)", "Iuran", "masuk", 5_250_000),
  t("2026-07-03", "Honor petugas sampah", "Kebersihan", "keluar", 1_200_000),
  t("2026-07-05", "Honor satpam / hansip", "Keamanan", "keluar", 1_500_000),
  t("2026-07-12", "Setoran hasil bank sampah ke kas", "Bank Sampah", "masuk", 550_000),
  t("2026-07-15", "Cat portal & gapura", "Fasilitas", "keluar", 1_100_000),
  t("2026-07-20", "Obat fogging DBD", "Kesehatan", "keluar", 450_000),
  t("2026-07-25", "Konsumsi rapat warga", "Rapat", "keluar", 350_000),
  // Agustus 2026
  t("2026-08-01", "Iuran warga Agustus (102 KK)", "Iuran", "masuk", 5_100_000),
  t("2026-08-02", "Donasi warga untuk HUT RI ke-81", "Donasi", "masuk", 3_700_000),
  t("2026-08-03", "Honor petugas sampah", "Kebersihan", "keluar", 1_200_000),
  t("2026-08-05", "Honor satpam / hansip", "Keamanan", "keluar", 1_500_000),
  t("2026-08-09", "Setoran hasil bank sampah ke kas", "Bank Sampah", "masuk", 450_000),
  t("2026-08-10", "Dekorasi & umbul-umbul 17-an", "Acara", "keluar", 1_600_000),
  t("2026-08-16", "Konsumsi malam tirakatan", "Acara", "keluar", 2_800_000),
  t("2026-08-17", "Hadiah lomba 17-an", "Acara", "keluar", 3_500_000),
  t("2026-08-17", "Sewa sound system", "Acara", "keluar", 700_000),
  // September 2026
  t("2026-09-01", "Iuran warga September (101 KK)", "Iuran", "masuk", 5_050_000),
  t("2026-09-03", "Honor petugas sampah", "Kebersihan", "keluar", 1_200_000),
  t("2026-09-05", "Honor satpam / hansip", "Keamanan", "keluar", 1_500_000),
  t("2026-09-13", "Setoran hasil bank sampah ke kas", "Bank Sampah", "masuk", 450_000),
  t("2026-09-17", "Perbaikan lampu jalan (2 titik)", "Fasilitas", "keluar", 400_000),
  t("2026-09-21", "ATK & fotokopi", "Administrasi", "keluar", 300_000),
  t("2026-09-26", "Konsumsi rapat warga", "Rapat", "keluar", 350_000),
  // Oktober 2026
  t("2026-10-01", "Iuran warga Oktober (104 KK)", "Iuran", "masuk", 5_200_000),
  t("2026-10-03", "Honor petugas sampah", "Kebersihan", "keluar", 1_200_000),
  t("2026-10-05", "Honor satpam / hansip", "Keamanan", "keluar", 1_500_000),
  t("2026-10-10", "Setoran hasil bank sampah ke kas", "Bank Sampah", "masuk", 450_000),
  t("2026-10-12", "Konsumsi rapat warga", "Rapat", "keluar", 350_000),
  t("2026-10-18", "Perbaikan lampu jalan (3 titik)", "Fasilitas", "keluar", 600_000),
  t("2026-10-20", "Santunan warga sakit", "Sosial", "keluar", 400_000),
];

export const kategoriKas = Array.from(new Set(transaksi.map((x) => x.kategori))).sort();

export type RekapBulan = { bulan: string; label: string; masuk: number; keluar: number; saldo: number };

const BULAN = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

/** Rekap per bulan, saldo berjalan dari saldoAwal. */
export function rekapBulanan(): RekapBulan[] {
  const map = new Map<string, { masuk: number; keluar: number }>();
  for (const x of [...transaksi].sort((a, b) => a.tanggal.localeCompare(b.tanggal))) {
    const key = x.tanggal.slice(0, 7);
    const m = map.get(key) ?? { masuk: 0, keluar: 0 };
    m[x.jenis] += x.nominal;
    map.set(key, m);
  }
  let saldo = saldoAwal.nominal;
  return Array.from(map.entries()).map(([bulan, v]) => {
    saldo += v.masuk - v.keluar;
    const [y, mm] = bulan.split("-");
    return { bulan, label: `${BULAN[Number(mm) - 1]} ${y.slice(2)}`, masuk: v.masuk, keluar: v.keluar, saldo };
  });
}

export function ringkasanKas() {
  const rekap = rekapBulanan();
  const now = rekap[rekap.length - 1];
  const prev = rekap[rekap.length - 2];
  const iuranBulanIni = transaksi.find((x) => x.kategori === "Iuran" && x.tanggal.startsWith(now.bulan));
  const kkBayar = iuranBulanIni ? Math.round(iuranBulanIni.nominal / iuranPerKK) : 0;
  return { rekap, now, prev, kkBayar };
}

export function transaksiTerbaru(n = 10) {
  return [...transaksi].sort((a, b) => b.tanggal.localeCompare(a.tanggal) || Number(b.id.slice(4)) - Number(a.id.slice(4))).slice(0, n);
}
