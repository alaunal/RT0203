const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const filename = path.resolve(__dirname, '../src/data/kas.ts');
const mod = new Module(filename, module);
mod.filename = filename;
mod.paths = module.paths;
mod._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText, filename);
const kas = mod.exports;
const source = require('../src/data/kas-import.json');

test('468 transactions exclude carry-forward totals and reconcile all four years', () => {
  assert.equal(kas.transaksi.length, 468);
  assert.equal(new Set(kas.transaksi.map(t => t.id)).size, 468);
  assert.deepEqual(kas.tahunKas, ['2026', '2025', '2024', '2023']);
  assert.deepEqual(kas.rekapTahunan(), source.tahunan);
  assert.deepEqual(kas.rekapTahunan().map(r => [r.masuk, r.keluar, r.saldoAkhir]), [
    [15747000, 13378400, 2388600], [15350000, 16950860, 787740],
    [33930000, 33508991, 1208749], [21510000, 21237500, 1481249],
  ]);
});
test('monthly totals reconcile each year and retain negative balances', () => {
  for (const year of kas.rekapTahunan()) {
    const months = kas.rekapBulanan(year.tahun);
    assert.equal(months.length, year.tahun === '2026' ? 10 : 12);
    assert(months.every(m => m.bulan.startsWith(year.tahun)));
    assert.equal(months.reduce((s,m) => s+m.masuk,0),year.masuk);
    assert.equal(months.reduce((s,m) => s+m.keluar,0),year.keluar);
    assert.equal(months.at(-1).saldo,year.saldoAkhir);
  }
  assert.equal(kas.rekapBulanan('2026').find(m => m.bulan === '2026-06').saldo, -811251);
});
test('homepage uses latest recorded month and sums all dues, never estimates households', () => {
  const { now, iuran, rekap } = kas.ringkasanKas();
  assert.equal(now.bulan, '2026-10');
  assert.equal(now.saldo,1481249);
  assert.equal(now.masuk,1480000);
  assert.equal(now.keluar,1598000);
  assert.equal(iuran,1280000);
  assert.equal(rekap.length,10);
  assert.equal(kas.transaksiTerbaru(1)[0].tanggal, '2026-10-24');
});
test('public descriptions redact names and retain ambiguous debit without correcting it', () => {
  assert(kas.transaksi.every(t => !/\b(Dianto|Masin|Fuad|Wildan|Wahyudin|Burhanudin|Susanto|Baihaqi|Inayah|Riansyah)\b/i.test(t.uraian)));
  const strip=kas.transaksi.find(t=>t.id==='trx-2026-107');
  assert.equal(strip.jenis,'masuk');
  assert.equal(strip.nominal,750000);
  assert.equal(kas.transaksi.find(t=>t.id==='trx-2025-117').tanggal,'2025-08-10');
});
