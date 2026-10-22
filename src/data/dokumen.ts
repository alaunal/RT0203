// DATA DUMMY — PRD.md §12.7. File berupa PDF placeholder "CONTOH — DATA DUMMY".

export const kategoriDokumen = ["Surat & Formulir", "Notulen Rapat", "Laporan Kas", "SK & Peraturan"] as const;
export type KategoriDokumen = (typeof kategoriDokumen)[number];

export type Dokumen = {
  id: string;
  judul: string;
  kategori: KategoriDokumen;
  tanggal: string;
  tipe: "PDF" | "DOCX" | "XLSX";
  ukuran: string;
  file: string;
};

export const dokumen: Dokumen[] = [
  { id: "d1", judul: "Laporan Kas Bulanan — September 2026", kategori: "Laporan Kas", tanggal: "2026-10-05", tipe: "PDF", ukuran: "1 KB", file: "/dokumen/laporan-kas-2026-09.pdf" },
  { id: "d2", judul: "Notulen Rapat Warga September 2026", kategori: "Notulen Rapat", tanggal: "2026-09-28", tipe: "PDF", ukuran: "1 KB", file: "/dokumen/notulen-2026-09.pdf" },
  { id: "d3", judul: "Laporan Kas Bulanan — Agustus 2026", kategori: "Laporan Kas", tanggal: "2026-09-04", tipe: "PDF", ukuran: "1 KB", file: "/dokumen/laporan-kas-2026-08.pdf" },
  { id: "d4", judul: "Notulen Rapat Persiapan HUT RI ke-81", kategori: "Notulen Rapat", tanggal: "2026-07-25", tipe: "PDF", ukuran: "1 KB", file: "/dokumen/notulen-2026-07.pdf" },
  { id: "d5", judul: "Formulir Permohonan Surat Pengantar RT", kategori: "Surat & Formulir", tanggal: "2026-05-01", tipe: "PDF", ukuran: "1 KB", file: "/dokumen/formulir-surat-pengantar.pdf" },
  { id: "d6", judul: "Formulir Lapor Tamu", kategori: "Surat & Formulir", tanggal: "2026-05-01", tipe: "PDF", ukuran: "1 KB", file: "/dokumen/formulir-lapor-tamu.pdf" },
  { id: "d7", judul: "Tata Tertib Lingkungan RT 02", kategori: "SK & Peraturan", tanggal: "2025-02-10", tipe: "PDF", ukuran: "1 KB", file: "/dokumen/tata-tertib.pdf" },
  { id: "d8", judul: "SK Pengurus RT 02 Periode 2025–2028", kategori: "SK & Peraturan", tanggal: "2025-01-15", tipe: "PDF", ukuran: "1 KB", file: "/dokumen/sk-pengurus.pdf" },
];
