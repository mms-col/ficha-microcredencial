const { load, sleep } = require("./harness");
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; console.log("  FALLA:", m); } };
const set = (t, v) => { t.F.fstate(1).values.nombre = v; t.F.touch(1); };
(async () => {
  console.log("== M. Varias fichas, independientes");
  const store = {};
  const A = await load({ store });                       // pestaña A
  set(A, "Microcredencial uno sobre clima local"); await sleep(900);
  const idA = A.F.fid;
  const B = await load({ store });                       // pestaña B (sesión distinta)
  await sleep(100);
  ok(B.F.liveIndex().length >= 1, "pestaña B ve la ficha de A en la lista");
  ok(B.F.fid !== idA, "B abrió una ficha nueva, no la de A");
  set(B, "Microcredencial dos sobre agua urbana"); await sleep(900);
  set(A, "Microcredencial uno sobre clima local v2"); await sleep(900);
  ok(!A.F.conflict && !B.F.conflict, "sin conflicto entre fichas distintas");
  ok(store["data/users/u1/ficha-" + idA].fields[1].values.nombre.endsWith("v2"), "ficha A intacta tras escribir B");
  const items = store["data/users/u1/fichas-index"].items.filter((x) => !x.deleted);
  ok(items.length === 2, "índice con 2 fichas: " + items.length);
  ok(items.some((x) => /dos/.test(x.name)) && items.some((x) => /v2/.test(x.name)), "ambos nombres en el índice (merge sin pisarse)");

  console.log("== N. Misma ficha en dos pestañas → conflicto, sin pisar");
  const C = await load({ store, open: false }); await sleep(100);
  await C.F.openFicha(idA);
  ok(C.F.fstate(1).values.nombre.endsWith("v2"), "C carga la ficha A");
  set(C, "Cambio hecho en la pestaña C"); await sleep(900);
  ok(!C.F.conflict, "C guarda (es la más reciente)");
  set(A, "Cambio hecho en la pestaña A"); await sleep(900);
  ok(A.F.conflict && A.F.conflict.id === idA, "A detecta conflicto");
  ok(store["data/users/u1/ficha-" + idA].fields[1].values.nombre === "Cambio hecho en la pestaña C", "no pisó lo de C");
  ok(/cambió en otra pestaña/.test(A.d.getElementById("main").textContent), "banner visible en A");
  A.F.keepMine(); await sleep(900);
  ok(store["data/users/u1/ficha-" + idA].fields[1].values.nombre === "Cambio hecho en la pestaña A", "mantener la mía sobrescribe");
  set(C, "Otro cambio de C"); await sleep(900);
  ok(C.F.conflict, "ahora C detecta conflicto");
  C.F.useRemote();
  ok(C.F.fstate(1).values.nombre === "Cambio hecho en la pestaña A" && !C.F.conflict, "cargar la más reciente");

  console.log("== O. Volver a la lista, duplicar, eliminar");
  await A.F.closeFicha();
  ok(A.F.fid === null && /Mis microcredenciales/.test(A.d.querySelector("h1").textContent), "closeFicha muestra la lista");
  const rows = A.d.querySelectorAll("tbody tr"); ok(rows.length === 2, "2 filas en la lista: " + rows.length);
  await A.F.duplicateFicha(idA); await sleep(900);
  ok(A.F.fstate(1).values.nombre.endsWith("(copia)") && A.F.fid !== idA, "duplicada con nombre (copia) y otro id");
  const idCopy = A.F.fid;
  await A.F.closeFicha();
  ok(A.F.liveIndex().length === 3, "3 fichas");
  A.d.querySelectorAll("tbody tr")[0].querySelector("button.danger").click(); await sleep(50);
  const okBtn = A.d.getElementById("modal-ok"); ok(!!okBtn, "pide confirmación"); okBtn.click(); await sleep(900);
  ok(A.F.liveIndex().length === 2, "eliminada: quedan " + A.F.liveIndex().length);
  const D = await load({ store, open: false }); await sleep(150);
  ok(D.F.liveIndex().length === 2, "otra pestaña no ve la eliminada");

  console.log("== P. Recordar la ficha por pestaña (recarga)");
  const E = await load({ store, open: false, session: { "ficha-open": idA }, local: null }); await sleep(150);
  ok(E.F.fid === idA, "recarga reabre la ficha de la pestaña: " + E.F.fid);

  console.log("== Q. Migración de la ficha única anterior");
  const legacy = { v: 1, step: 3, mode: "A", imported: null, inventory: null, aiOn: true, updatedAt: 5, fields: { 1: { values: { nombre: "Ficha de la versión anterior de prueba" }, status: "ok", issues: [], attachments: [], proposed: false, stale: "" } } };
  const st = { "data/users/u1/ficha": legacy };
  const F = await load({ store: st, open: false }); await sleep(200);
  const li = F.F.liveIndex();
  ok(li.length === 1 && li[0].id === "base" && /anterior/.test(li[0].name), "ficha anterior migrada: " + JSON.stringify(li));
  const G = await load({ local: JSON.stringify(legacy), open: false, without: ["db", "user"] }); await sleep(100);
  ok(G.F.liveIndex().length === 1 && G.F.liveIndex()[0].id === "base", "migración local");

  console.log("== R. Restaurar copia crea ficha nueva");
  const H = await load({ store: {} }); const before = H.F.fid; const json = JSON.stringify(H.F.state);
  await H.F.createFicha(H.F.adoptState(JSON.parse(json))); ok(H.F.fid !== before, "restaurar = ficha nueva");
  ok(A.errors.length + B.errors.length + C.errors.length === 0, "sin errores: " + [...A.errors, ...B.errors, ...C.errors].join("|"));
  console.log(`\nResultado: ${pass} ok, ${fail} fallas`); process.exit(fail ? 1 : 0);
})().catch((e) => { console.error("EXCEPCIÓN", e); process.exit(2); });
