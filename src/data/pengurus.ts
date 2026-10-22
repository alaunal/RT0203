// DATA DUMMY — nama & nomor fiktif (PRD.md §12.1)

export type Pengurus = {
  nama: string;
  jabatan: string;
  tingkat: 1 | 2 | 3;
  wa?: string;
};

export const periode = "2025–2028";

export const pengurus: Pengurus[] = [
  { nama: "Bpk. Ahmad Suryadi", jabatan: "Ketua RT", tingkat: 1, wa: "0812-0000-0001" },
  { nama: "Ibu Rina Marlina", jabatan: "Sekretaris", tingkat: 2, wa: "0812-0000-0002" },
  { nama: "Ibu Dewi Anggraini", jabatan: "Bendahara", tingkat: 2, wa: "0812-0000-0003" },
  { nama: "Bpk. Joko Prasetyo", jabatan: "Seksi Keamanan", tingkat: 3, wa: "0812-0000-0004" },
  { nama: "Bpk. Hendra Gunawan", jabatan: "Seksi Kebersihan & Lingkungan", tingkat: 3 },
  { nama: "Bpk. H. Mulyadi", jabatan: "Seksi Sosial & Keagamaan", tingkat: 3 },
  { nama: "Sdr. Fajar Ramadhan", jabatan: "Seksi Humas", tingkat: 3, wa: "0812-0000-0007" },
  { nama: "Sdr. Bayu Saputra", jabatan: "Seksi Pemuda", tingkat: 3, wa: "0812-0000-0008" },
  { nama: "Ibu Sri Wahyuni", jabatan: "Koordinator Bank Sampah", tingkat: 3, wa: "0812-0000-0009" },
];

export function inisial(nama: string) {
  return nama
    .replace(/^(Bpk\.|Ibu|Sdr\.|Sdri\.)\s+/, "")
    .replace(/^H\.\s+/, "")
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}
