const { load, sleep } = require("./harness");
const JSZip = require("jszip");
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; console.log("  FALLA:", m); } };
(async () => {
  console.log("== Exportar avance (.docx) con la ficha incompleta");
  const t = await load();
  t.F.goto(1); t.F.fstate(1).values.nombre = "Crear contenido digital sobre clima local"; t.F.touch(1);
  const btn = Array.from(t.d.querySelectorAll("#bar-actions button")).find((b) => /Exportar avance/.test(b.textContent));
  ok(!!btn && /\.docx/.test(btn.textContent), "botón de la barra exporta .docx");
  btn.click(); await sleep(800);
  const rec = t.calls.saves[0];
  ok(rec && /-borrador\.docx$/.test(rec.filename), "nombre con -borrador: " + (rec && rec.filename));
  const xml = await (await JSZip.loadAsync(Buffer.from(await rec.data.arrayBuffer()))).file("word/document.xml").async("string");
  ok(/BORRADOR INCOMPLETO/.test(xml) && /Crear contenido digital sobre clima local/.test(xml), "marcado incompleto y con el nombre");
  ok(t.errors.length === 0, "sin errores");
  console.log(`\nResultado: ${pass} ok, ${fail} fallas`); process.exit(fail ? 1 : 0);
})();
