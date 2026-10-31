"""Import buku kas Excel; requires openpyxl. Never publishes the source workbook."""
import argparse
import datetime as dt
import hashlib
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def classify(text, kind):
    s = text.casefold()
    if kind == 'masuk':
        if 'strip cek kesehatan' in s:
            return 'Kesehatan', 'Strip cek kesehatan (tercatat sebagai pemasukan)'
        if 'sampah' in s:
            return 'Kontribusi sampah', 'Kontribusi pengelolaan sampah'
        if any(x in s for x in ['banop', 'bansos rt', 'dana rt (bank']):
            return 'Bantuan operasional', 'Bantuan operasional RT'
        if any(x in s for x in ['17an', '17 agustus', 'agustusan']):
            return 'Donasi', 'Sumbangan kegiatan HUT RI'
        if any(x in s for x in ['infaq', 'infak', 'sewa']):
            return 'Pemanfaatan inventaris', 'Penerimaan pemanfaatan inventaris RT'
        if any(x in s for x in ['sumbangan', 'bantuan', 'zakat', 'kontribusi jamaah']):
            return 'Donasi', 'Sumbangan kegiatan dan lingkungan RT'
        if s.startswith(('iuran', 'kas ')):
            return 'Iuran', 'Penerimaan iuran warga'
        return 'Pemasukan lainnya', 'Penerimaan kas lainnya'
    if s.startswith('transfer ke'):
        return 'Kegiatan warga', 'Penyaluran dana kegiatan HUT RI'
    if any(x in s for x in ['sosial', 'ta\'awun', 'takjiah', 'takziah', 'bela sungkawa', 'ambul', 'bingkisan']):
        return 'Sosial', 'Bantuan sosial warga' + (' dan kegiatan posyandu' if 'posyandu' in s else '') + (' dan pemeliharaan CCTV' if 'cctv' in s else '')
    if any(x in s for x in ['satpam', 'keamanan', 'cctv', 'internet', 'wifi', 'apar']):
        return 'Keamanan', ('Honor petugas keamanan' if any(x in s for x in ['gaji', 'satpam']) else 'Pemasangan dan pemeliharaan CCTV' if 'cctv' in s else 'Layanan internet lingkungan' if any(x in s for x in ['wifi', 'internet']) else text)
    if any(x in s for x in ['posyandu', 'pos yandu', 'darah', 'tensimeter', 'fogging', 'kesehatan']):
        return 'Kesehatan', text
    if any(x in s for x in ['17an', '17-an', 'hut', 'lomba', 'tropeo', 'umbul', 'bendera', 'katar']):
        return 'Kegiatan warga', text
    if 'rapat' in s:
        return 'Rapat', text
    if any(x in s for x in ['got', 'bersih', 'rumput', 'tebang']):
        return 'Kebersihan', text
    if any(x in s for x in ['kartu', 'rompi', 'keliling']):
        return 'Administrasi', text
    return 'Fasilitas & operasional', 'Penyaluran dana kegiatan HUT RI' if s.startswith('transfer ke') else text


def import_workbook(source):
    import openpyxl
    workbook = openpyxl.load_workbook(source, data_only=True)
    entries, years = [], []
    previous = None
    for sheet in workbook:
        if not re.fullmatch(r'20\d{2}', sheet.title):
            continue
        year = sheet.title
        columns = {str(c.value).strip().upper(): c.column for c in sheet[4] if c.value}
        debit, credit, balance = [columns[k] for k in ['DEBIT', 'KREDIT', 'SALDO']]
        opening = None
        running = incoming = outgoing = count = 0
        dates = []
        for row in range(5, sheet.max_row + 1):
            date, description = sheet.cell(row, 2).value, sheet.cell(row, 3).value
            inc, out = sheet.cell(row, debit).value or 0, sheet.cell(row, credit).value or 0
            if not isinstance(date, (dt.datetime, dt.date)):
                if description and (inc or out):
                    raise ValueError(f'{year}:{row}: nominal tanpa tanggal')
                continue
            if not description and not inc and not out:
                continue
            if not description or date.year != int(year):
                raise ValueError(f'{year}:{row}: tanggal/uraian tidak valid')
            for value in [inc, out]:
                if not isinstance(value, (int, float)) or value < 0 or int(value) != value:
                    raise ValueError(f'{year}:{row}: nominal tidak valid')
            recorded = sheet.cell(row, balance).value
            if str(description).casefold().startswith('saldo'):
                if opening is not None or count:
                    raise ValueError(f'{year}:{row}: saldo awal berulang')
                opening = int(recorded)
                running = opening
                if previous is not None and opening != previous:
                    raise ValueError(f'{year}: saldo antar-tahun tidak cocok')
                continue
            if opening is None or bool(inc) == bool(out):
                raise ValueError(f'{year}:{row}: debit/kredit ambigu')
            running += int(inc - out)
            if recorded != running:
                raise ValueError(f'{year}:{row}: saldo {recorded} != {running}')
            kind = 'masuk' if inc else 'keluar'
            category, public_description = classify(' '.join(str(description).split()), kind)
            entries.append(dict(id=f'trx-{year}-{row}', tanggal=date.date().isoformat() if isinstance(date, dt.datetime) else date.isoformat(), uraian=public_description, kategori=category, jenis=kind, nominal=int(inc or out), sumberBaris=row))
            incoming += int(inc)
            outgoing += int(out)
            count += 1
            dates.append(date.isoformat()[:10])
        if not dates:
            raise ValueError(f'{year}: tidak ada transaksi')
        years.append(dict(tahun=year, saldoAwal=opening, masuk=incoming, keluar=outgoing, saldoAkhir=running, jumlahTransaksi=count, sampai=max(dates)))
        previous = running
    if not years or [y['tahun'] for y in years] != sorted(y['tahun'] for y in years):
        raise ValueError('Urutan sheet tahun tidak valid')
    return dict(sumber=source.name, sha256=hashlib.sha256(source.read_bytes()).hexdigest(), sampai=max(t['tanggal'] for t in entries), tahunan=years, transaksi=entries)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('source', type=Path)
    args = parser.parse_args()
    data = import_workbook(args.source)
    target = ROOT / 'src/data/kas-import.json'
    target.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps(data['tahunan'], indent=2))
