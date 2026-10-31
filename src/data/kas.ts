// Hasil impor buku kas asli. Baris saldo awal/pindahan tidak dihitung sebagai arus kas.
import data from "./kas-import.json";

export type Transaksi = {
  id: string;
  tanggal: string;
  uraian: string;
  kategori: string;
  jenis: "masuk" | "keluar";
  nominal: number;
  sumberBaris: number;
};
export const transaksi = data.transaksi as Transaksi[];
export const tahunKas = data.tahunan.map((r) => r.tahun).sort().reverse();
export const tahunTerbaru = tahunKas[0];
export const saldoAwal = { tanggal: `${data.tahunan[0].tahun}-01-01`, nominal: data.tahunan[0].saldoAwal };
export const laporanInfo = { diperbarui: data.sampai, sumber: data.sumber };
export const kategoriKas = Array.from(new Set(transaksi.map((x) => x.kategori))).sort();
export type RekapBulan = { bulan: string; label: string; masuk: number; keluar: number; saldo: number };
const BULAN = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

export function rekapTahunan() {
  let saldo = saldoAwal.nominal;
  return [...tahunKas].reverse().map((tahun) => {
    const rows = transaksi.filter((t) => t.tanggal.startsWith(`${tahun}-`));
    const masuk = rows.reduce((n, t) => n + (t.jenis === "masuk" ? t.nominal : 0), 0);
    const keluar = rows.reduce((n, t) => n + (t.jenis === "keluar" ? t.nominal : 0), 0);
    const awal = saldo;
    saldo += masuk - keluar;
    return { tahun, saldoAwal: awal, masuk, keluar, saldoAkhir: saldo, jumlahTransaksi: rows.length, sampai: rows.map((r) => r.tanggal).sort().at(-1)! };
  });
}

/** Termasuk bulan tanpa transaksi; tahun terakhir hanya sampai bulan pencatatan terakhir. */
export function rekapBulanan(tahun?: string): RekapBulan[] {
  const result: RekapBulan[] = [];
  for (const annual of rekapTahunan()) {
    let saldo = annual.saldoAwal;
    const akhir = annual.tahun === tahunTerbaru ? Number(annual.sampai.slice(5, 7)) : 12;
    for (let m = 1; m <= akhir; m++) {
      const bulan = `${annual.tahun}-${String(m).padStart(2, "0")}`;
      const rows = transaksi.filter((t) => t.tanggal.startsWith(bulan));
      const masuk = rows.reduce((n, t) => n + (t.jenis === "masuk" ? t.nominal : 0), 0);
      const keluar = rows.reduce((n, t) => n + (t.jenis === "keluar" ? t.nominal : 0), 0);
      saldo += masuk - keluar;
      if (!tahun || tahun === annual.tahun) result.push({ bulan, label: `${BULAN[m - 1]} ${annual.tahun.slice(2)}`, masuk, keluar, saldo });
    }
  }
  return result;
}

export function ringkasanKas() {
  const rekap = rekapBulanan(tahunTerbaru);
  const now = rekap[rekap.length - 1];
  const semua = rekapBulanan();
  const prev = semua[semua.length - 2] ?? { ...now, masuk: 0, keluar: 0, saldo: saldoAwal.nominal };
  const iuran = transaksi.filter((x) => x.kategori === "Iuran" && x.jenis === "masuk" && x.tanggal.startsWith(now.bulan)).reduce((n, x) => n + x.nominal, 0);
  return { rekap, now, prev, iuran };
}

export function transaksiTerbaru(n = 10) {
  return [...transaksi].sort((a, b) => b.tanggal.localeCompare(a.tanggal) || b.sumberBaris - a.sumberBaris).slice(0, n);
}
