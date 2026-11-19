// Arnés de prueba: carga la página en jsdom con mocks de las capacidades de claude.use()
const fs = require("fs");
const { JSDOM, VirtualConsole } = require("jsdom");
const nodeDocx = require("docx");
const mammoth = require("mammoth");

const HTML = fs.readFileSync(require("path").join(__dirname, "..", "index.html"), "utf8").replace(/<script src="[^"]+"><\/script>/g, "");

function makeMocks(opts = {}) {
  const store = opts.store || {};
  const calls = { dbSet: [], saves: [], uploads: [], deletes: [], sample: [] };
  const sampleImpl = opts.sample || (async () => ({ cumple: true, problemas: [], advertencias: [] }));
  const sample = Object.assign(async () => ({ text: "" }), { json: async (p) => { calls.sample.push(p); return sampleImpl(p); } });
  const mocks = {
    user: { id: async () => "u1" },
    db: { doc: (path) => ({ get: async () => ({ exists: path in store, data: () => store[path] }), set: async (d) => { if (opts.failSet) throw { code: "quota" }; calls.dbSet.push({ path, d }); store[path] = JSON.parse(JSON.stringify(d)); } }) },
    assets: { upload: async (f) => { calls.uploads.push(f.name); return { id: "a" + calls.uploads.length, url: "/_blob/a" + calls.uploads.length, sizeBytes: f.size || 10, contentType: "x" }; }, delete: async (id) => { calls.deletes.push(id); } },
    downloads: { save: async (r) => { calls.saves.push(r); return { status: "saved" }; } },
    sample
  };
  for (const k of (opts.without || [])) delete mocks[k];
  return { mocks, calls, store };
}

async function load(opts = {}) {
  const { mocks, calls, store } = makeMocks(opts);
  const errors = [];
  const vc = new VirtualConsole();
  vc.on("jsdomError", (e) => errors.push("jsdomError: " + (e.detail && e.detail.stack || e.message)));
  vc.on("error", (e) => errors.push("console.error: " + e));
  const dom = new JSDOM(HTML, {
    runScripts: "dangerously", pretendToBeVisual: true, url: "https://example.test/", virtualConsole: vc,
    beforeParse(w) {
      w.claude = { use: async (n) => (mocks[n] || null) };
      w.addEventListener("error", (e) => errors.push("window.error: " + e.message));
      w.HTMLElement.prototype.scrollTo = () => {}; w.scrollTo = () => {};
      if (opts.docx !== false) w.docx = nodeDocx;
      if (opts.mammoth !== false) w.mammoth = mammoth;
      if (opts.local) w.localStorage.setItem("ficha-microcredencial-v1", opts.local);
      if (opts.session) for (const [k, v] of Object.entries(opts.session)) w.sessionStorage.setItem(k, v);
    }
  });
  await new Promise((r) => setTimeout(r, 60));
  if (opts.open !== false) { await dom.window.__ficha.createFicha(); await new Promise((r) => setTimeout(r, 20)); }
  return { dom, w: dom.window, d: dom.window.document, F: dom.window.__ficha, mocks, calls, store, errors };
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
module.exports = { load, sleep, mammoth, nodeDocx };
