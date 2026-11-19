const { load, sleep } = require("./harness");
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; console.log("  FALLA:", m); } };
const eq = (a, b, m) => ok(JSON.stringify(a) === JSON.stringify(b), `${m}: esperado ${JSON.stringify(b)}, obtuve ${JSON.stringify(a)}`);

const GOOD = {
  1: { nombre: "Crear contenido digital sobre cambio climático para una comunidad local" },
  2: { problema: "Las comunidades de barrios de ladera reciben poca información comprensible sobre los riesgos climáticos de su territorio y no pueden actuar a tiempo.", publico: "Líderes comunitarios, jóvenes y personal de ONG ambientales, mayores de 18 años.", previos: "Manejo básico de celular; no se requiere formación en comunicación." },
  3: { objetivo: "Que líderes y jóvenes de una comunidad produzcan y publiquen un contenido digital que explique un riesgo climático de su territorio y recoja la respuesta de su audiencia." },
  4: { resultados: [{ text: "Diseñar una narrativa que conecte un problema climático local con una experiencia comunitaria." }, { text: "Explicar el riesgo climático elegido con datos de fuentes verificables." }, { text: "Producir un video, infografía o podcast con herramientas abiertas y de bajo costo." }, { text: "Publicar el contenido en un canal accesible para la comunidad." }, { text: "Evaluar el alcance del contenido con retroalimentación de una audiencia real." }], nombreAlineado: true },
  5: { competencias: [{ text: "Diseño de narrativas sostenibles", refs: [1] }, { text: "Comunicación ambiental con rigor y empatía", refs: [2, 4] }, { text: "Producción digital con herramientas abiertas", refs: [3] }, { text: "Evaluación del impacto comunitario", refs: [5] }] },
  6: { modalidad: "hibrida", equipo: "Celular con cámara y micrófono, conexión estable para las sesiones sincrónicas y una herramienta gratuita de edición.", fisica: "Ninguna" },
  7: { discapacidad: "Videos subtitulados con transcripción, materiales compatibles con lector de pantalla y ajustes razonables a solicitud.", barreras: "Herramientas gratuitas y abiertas; sesiones grabadas para quien tenga conectividad limitada.", idiomaNA: true, idiomaMotivo: "En esta primera edición no hay facilitadores para lenguas indígenas." },
  8: { carga: [{ horas: "6", modo: "dirigida", detalle: "3 sesiones" }, { horas: "17", modo: "autonoma" }, { horas: "4", modo: "autonoma" }, { horas: "2", modo: "autonoma" }], totalDeclarado: "29", creditos: "no" },
  9: { metodo: "Proyecto final: el contenido digital publicado.", evalua: "El docente de la microcredencial", comunicado: "antes", dondeCriterios: "Primera sesión y portal", criterios: [{ text: "La narrativa conecta el problema con la experiencia local", refs: [1] }, { text: "Datos y fuentes verificables", refs: [2] }, { text: "Calidad técnica con herramientas abiertas", refs: [3] }, { text: "Publicación accesible para la comunidad", refs: [4] }, { text: "Análisis de la retroalimentación recibida", refs: [5] }] },
  10: { evidencias: [{ producto: "Pieza final: video, infografía o podcast", formato: "video", donde: "Archivo y enlace de publicación", refs: [1, 3, 4] }, { producto: "Documento de proceso con fuentes", formato: "informe", donde: "Archivo adjunto", refs: [2] }, { producto: "Retroalimentación escrita de una persona de la comunidad", formato: "formulario", donde: "Archivo adjunto", refs: [5] }] },
  11: { emisorPD: false, emisor: "Institución X", mecanismo: "El comité académico revisa la microcredencial antes de cada edición y analiza las encuestas de participantes.", frecuencia: "Cada edición", externa: "na", externaMotivo: "En mi país no hay agencia que acredite microcredenciales (por verificar)." },
  12: { actor: "ONG ambiental local", accion: "Revisará la pertinencia de cada contenido antes de publicarlo y firmará la retroalimentación.", estado: "propuesto" },
  13: { id: "", codigo: "", url: "", confirma: false },
  14: { valor: [{ text: "Puede servir como evidencia de experiencia en comunicación ambiental.", tipo: "hipotesis" }], actualizacion: "confirmar" }
};
function setAll(F, ids) { ids.forEach((id) => { const f = F.FIELD_BY_ID[id]; F.fstate(id).values = F.mergeValues(f, GOOD[id]); }); }

(async () => {
  console.log("== 1. Carga e intro");
  let t = await load();
  ok(t.errors.length === 0, "sin errores al cargar: " + t.errors.join("|"));
  ok(t.d.querySelector("h1").textContent.includes("un campo a la vez"), "intro visible");
  ok(t.d.querySelectorAll(".step-btn").length === 16, "16 pasos en la barra lateral (inicio+14+cierre)");
  console.log("== 2. Compuerta: no se salta de campo");
  t.F.goto(3);
  ok(t.F.state.step === 0, "goto(3) bloqueado sin aprobar 1 y 2");
  t.F.goto(1);
  ok(t.F.state.step === 1, "goto(1) permitido");
  console.log("== 3. Validación del campo 1 (reglas)");
  t.F.fstate(1).values.nombre = "Curso";
  await t.F.validateField(1);
  eq(t.F.fstate(1).status, "fail", "nombre muy corto falla");
  t.F.fstate(1).values.nombre = "Curso de sostenibilidad avanzada avalado por la UNESCO";
  await t.F.validateField(1);
  ok(t.F.fstate(1).issues.some((i) => /organismo|aval/.test(i.msg)), "detecta aval de organismo");
  t.F.fstate(1).values.nombre = "uno dos tres cuatro cinco seis siete ocho nueve diez once doce trece";
  await t.F.validateField(1);
  ok(t.F.fstate(1).issues.some((i) => /13 palabras/.test(i.msg)), "detecta más de 12 palabras");
  console.log("== 4. Flujo feliz de los 14 campos con revisión de Claude");
  for (let id = 1; id <= 14; id++) {
    setAll(t.F, [id]);
    await t.F.validateField(id);
    ok(t.F.fstate(id).status === "ok", `campo ${id} aprobado (status=${t.F.fstate(id).status}; ${JSON.stringify(t.F.fstate(id).issues.filter(i=>i.type==="error"))})`);
  }
  eq(t.F.approvedCount(), 14, "14 aprobados");
  eq(t.F.maxReachable(), 15, "se llega a la revisión final");
  t.F.goto(15);
  ok(t.F.state.step === 15, "ir a revisión final");
  ok(!!t.d.querySelector("#btn-docx"), "botón de descarga .docx visible");
  console.log("== 5. Renderizado de cada paso sin errores");
  for (let s = 0; s <= 15; s++) { t.F.state.step = s; t.F.renderAll(); }
  ok(t.errors.length === 0, "sin errores al renderizar todos los pasos: " + t.errors.join("|"));
  console.log("== 6. Dependencias (rule 7): cambiar el campo 4 invalida 5, 9 y 10");
  t.F.touch(4);
  eq(["pending", "pending", "pending", "pending"], [4, 5, 9, 10].map((i) => t.F.fstate(i).status), "4,5,9,10 vuelven a pendiente");
  ok(/cambió el campo 4/.test(t.F.fstate(5).stale), "mensaje de revisión en campo 5");
  eq(t.F.maxReachable(), 4, "la compuerta vuelve al campo 4");
  console.log("== 7. Casos negativos por campo");
  const neg = async (id, patch, re, label) => {
    const x = await load(); setAll(x.F, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
    const v = x.F.fstate(id).values; patch(v);
    await x.F.validateField(id);
    const errs = x.F.fstate(id).issues.filter((i) => i.type === "error").map((i) => i.msg).join(" | ");
    ok(x.F.fstate(id).status === "fail" && re.test(errs), `${label}: status=${x.F.fstate(id).status} errores=${errs}`);
  };
  await neg(4, (v) => { v.resultados[0].text = "Comprender el cambio climático local"; }, /difícil de evidenciar/, "F4 «Comprender…»");
  await neg(4, (v) => { v.resultados.pop(); v.resultados.pop(); }, /entre 4 y 6/, "F4 solo 3 resultados");
  await neg(4, (v) => { v.nombreAlineado = false; }, /nombre del campo 1/, "F4 sin confirmar nombre");
  await neg(3, (v) => { v.objetivo = "Producir un video. Y además publicarlo en redes sociales de la comunidad local."; }, /oraciones/, "F3 dos oraciones");
  await neg(2, (v) => { v.previos = ""; }, /conocimientos previos/, "F2 sin previos");
  await neg(5, (v) => { v.competencias[0].refs = []; }, /no indica de qué resultado/, "F5 sin refs");
  await neg(5, (v) => { v.competencias = [{ text: "Solo una competencia", refs: [1] }]; }, /no queda cubierto/, "F5 resultados sin cubrir");
  await neg(6, (v) => { v.equipo = "Ninguno"; }, /dispositivo y conectividad/, "F6 virtual/híbrida sin equipo");
  await neg(7, (v) => { v.discapacidad = "Será accesible"; }, /discapacidad/, "F7 «será accesible»");
  await neg(7, (v) => { v.idiomaMotivo = "No aplica"; }, /motivo concreto/, "F7 No aplica genérico");
  await neg(8, (v) => { v.totalDeclarado = "10"; }, /no coincide con la suma/, "F8 total 10 vs 29 (caso real del archivo)");
  await neg(8, (v) => { v.carga[0].horas = ""; }, /número de horas/, "F8 horas vacías");
  await neg(8, (v) => { v.carga[1].modo = ""; }, /Clasifica/, "F8 sin clasificar dirigida/autónoma");
  await neg(9, (v) => { v.comunicado = "despues"; }, /antes de evaluar/, "F9 criterios no comunicados antes");
  await neg(9, (v) => { v.criterios = v.criterios.slice(0, 2); }, /no queda cubierto/, "F9 resultados sin criterio");
  await neg(10, (v) => { v.evidencias[0].donde = ""; }, /dónde puede revisarla/, "F10 sin dónde");
  await neg(11, (v) => { v.mecanismo = "Un comité"; }, /mecanismo interno/, "F11 mecanismo vago");
  await neg(11, (v) => { v.externa = "na"; v.externaMotivo = "No aplica"; }, /motivo concreto/, "F11 No aplica sin motivo");
  await neg(12, (v) => { v.actor = "UNESCO IESALC"; v.estado = "propuesto"; }, /No atribuyas respaldo/, "F12 organismo sin confirmar");
  await neg(13, (v) => { v.id = "LAC-2026-CLIM-001-01"; v.confirma = false; }, /sin confirmar su origen/, "F13 ID sin confirmar (caso real del archivo)");
  await neg(13, (v) => { v.url = "no-es-url"; v.confirma = true; }, /dirección web válida/, "F13 URL inválida");
  await neg(14, (v) => { v.valor[0].tipo = "respaldada"; v.valor[0].fuente = ""; }, /no dice en qué/, "F14 respaldada sin fuente");
  console.log("== 8. Advertencias (no bloquean)");
  { const x = await load(); setAll(x.F, [1,2,3,4,5,6,7,8,9]); x.F.fstate(9).values.criterios[0].text = "Tono empático. Si esto aplica, se documenta"; await x.F.validateField(9);
    ok(x.F.fstate(9).status === "ok" && x.F.fstate(9).issues.filter((i) => i.type === "warn").length >= 2, "F9 advierte subjetivo y condicional sin bloquear: " + JSON.stringify(x.F.fstate(9).issues.map(i=>i.type))); }
  console.log("== 9. Verbos en futuro aceptados (hallazgo b)");
  { const x = await load(); setAll(x.F, [1,2,3,4]); x.F.fstate(4).values.resultados = [{text:"Diseñará una narrativa digital sostenible local"},{text:"Implementará un contenido digital adaptado a la audiencia"},{text:"Evaluará el impacto de su trabajo con retroalimentación"},{text:"Publicará el contenido en una plataforma masiva"}]; await x.F.validateField(4);
    ok(x.F.fstate(4).status === "ok", "futuro aceptado: " + JSON.stringify(x.F.fstate(4).issues)); }
  console.log(`\nResultado: ${pass} ok, ${fail} fallas`);
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.error("EXCEPCIÓN", e); process.exit(2); });
