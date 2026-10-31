# Impor buku kas RT

Sumber: `../../KAS RT 02 RW 03 JATILUHUR.xlsx`. Empat sheet: 2023–2026, 468 transaksi. Data terakhir 24 Oktober 2026. File Excel asli tidak disalin ke folder publik. Hasil impor publik: `src/data/kas-import.json`; perhitungan bersama beranda dan `/kas`: `src/data/kas.ts`.

| Tahun | Saldo awal | Masuk tahun berjalan | Keluar tahun berjalan | Saldo akhir |
|---|---:|---:|---:|---:|
| 2023 | 20.000 | 15.747.000 | 13.378.400 | 2.388.600 |
| 2024 | 2.388.600 | 15.350.000 | 16.950.860 | 787.740 |
| 2025 | 787.740 | 33.930.000 | 33.508.991 | 1.208.749 |
| 2026 s.d. 24 Oktober | 1.208.749 | 21.510.000 | 21.237.500 | 1.481.249 |

## Aturan impor

- Kolom dipetakan dari header; posisi debit/kredit/saldo pada 2024 berbeda.
- Baris `Saldo tahun ...` menjadi saldo awal, bukan transaksi. Debit/kredit pada baris tersebut dan total footer bersifat kumulatif sejak tahun sebelumnya; tidak ditambahkan lagi ke arus kas tahunan.
- Baris kosong, nomor urut saja, dan catatan kepengurusan tanpa nominal tidak menjadi transaksi. Baris transaksi tanpa nomor tetap diimpor.
- Setiap saldo baris dan saldo pindahan antar-tahun diperiksa sebelum hasil ditulis. Nominal/tanggal yang tidak valid menghentikan impor.
- Tanggal memakai kolom tanggal; tidak ditebak dari uraian atau posisi baris. Nominal dan arah debit/kredit tidak dikoreksi otomatis. Saldo negatif tetap ditampilkan.
- Uraian publik menyamarkan penyetor iuran, petugas keamanan, dan penerima bantuan. Kategori dan uraian generik diturunkan dari teks sumber; bukan kategori resmi bendahara. `sumberBaris` dan ID tahun/baris memungkinkan penelusuran ke Excel asli tanpa menyertakan nama pada aplikasi.
- Indikator KK membayar dihapus karena ada pembayaran gabungan, tunggakan, serta pembayaran beberapa bulan; nominal tidak cukup untuk menghitung KK unik.
- Tidak ada klaim verifikasi bendahara atau PDF dummy di ringkasan kas.

## Catatan untuk dikonfirmasi pengurus

1. Sheet 2026 baris 107: `Strip Cek Kesehatan`, Rp750.000 pada **debit**. Dipertahankan sebagai pemasukan; konfirmasi sebelum mengubah sumber.
2. Sheet 2025 baris 117: tanggal 10 Agustus 2025 di antara transaksi September. Grafik memasukkannya ke Agustus sesuai tanggal sumber.
3. Sheet 2026 baris 12–13: transaksi 14 Januari 2026 menyebut gaji Desember 2026 pada uraian. Tanggal tetap 14 Januari 2026; uraian publik menjadi honor petugas keamanan.

## Memperbarui data

Dari root project, dengan Python 3 dan paket `openpyxl`:

```sh
python3 scripts/import-kas.py '../KAS RT 02 RW 03 JATILUHUR.xlsx'
PYTHONDONTWRITEBYTECODE=1 python3 -m unittest discover -s tests -p 'test_*.py'
node --test tests/kas.test.cjs
npm run build -- --webpack
```

Impor dilakukan saat file berubah; belum ada sinkronisasi Google Sheets atau fitur unggah publik. Sheet tahun baru dengan struktur sama akan muncul otomatis pada pilihan tahun setelah impor dan build ulang. Perbarui nilai harapan pada tes rekonsiliasi ketika data sumber diperbarui, sesudah memeriksa totalnya. Formula Excel harus dihitung dan disimpan di Excel/LibreOffice terlebih dahulu agar nilai saldo tersimpan tersedia untuk pemeriksaan.
