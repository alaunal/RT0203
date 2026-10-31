import importlib.util
from pathlib import Path
import tempfile
import unittest
import openpyxl

spec = importlib.util.spec_from_file_location('import_kas', Path(__file__).resolve().parents[1] / 'scripts/import-kas.py')
importer = importlib.util.module_from_spec(spec)
spec.loader.exec_module(importer)


class ImportKasTest(unittest.TestCase):
    def fixture(self):
        from datetime import datetime
        w = openpyxl.Workbook()
        a = w.active
        a.title = '2023'
        a.append(['Buku kas'])
        a.append([])
        a.append([])
        a.append(['NO', 'TANGGAL', 'URAIAN', 'DEBIT', 'KREDIT', 'SALDO'])
        a.append([1, datetime(2023, 1, 1), 'Saldo tahun 2022', 20000, None, 20000])
        a.append([None, datetime(2023, 1, 3), 'Iuran Pak Contoh', 40000, None, 60000])
        a.append(['SALDO', None, None, 60000, 0, 60000])
        b = w.create_sheet('2024')
        for _ in range(3): b.append([])
        b.append(['NO', 'TANGGAL', 'URAIAN', None, 'DEBIT', 'KREDIT', 'SALDO'])
        b.append([1, datetime(2024, 1, 1), 'Saldo tahun 2023', None, 60000, 0, 60000])
        b.append([None, datetime(2024, 1, 4), 'Posyandu', None, None, 10000, 50000])
        b.append([None, datetime(2024, 1, 5)])
        return w

    def parse(self, workbook):
        with tempfile.TemporaryDirectory() as d:
            source = Path(d) / 'kas.xlsx'
            workbook.save(source)
            return importer.import_workbook(source)

    def test_shifted_columns_blank_numbers_and_carry_are_handled(self):
        data = self.parse(self.fixture())
        self.assertEqual(len(data['transaksi']), 2)
        self.assertEqual(data['tahunan'][1]['masuk'], 0)
        self.assertEqual(data['tahunan'][1]['saldoAwal'], 60000)
        self.assertEqual(data['tahunan'][1]['saldoAkhir'], 50000)
        self.assertEqual(data['transaksi'][0]['uraian'], 'Penerimaan iuran warga')

    def test_incorrect_running_balance_is_rejected(self):
        w = self.fixture()
        w['2023']['F6'] = 90000
        with self.assertRaisesRegex(ValueError, 'saldo'):
            self.parse(w)

    def test_inconsistent_carry_is_rejected(self):
        w = self.fixture()
        w['2024']['G5'] = 50000
        with self.assertRaisesRegex(ValueError, 'antar-tahun'):
            self.parse(w)


if __name__ == '__main__':
    unittest.main()
