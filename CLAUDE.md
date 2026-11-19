# Ficha de microcredencial: contexto para Claude Code

Asistente web, de un solo archivo (`index.html`), que guía el diseño de una ficha de microcredencial en 14 campos, **uno por pantalla, con compuertas**: no se avanza hasta que el campo cumple. Es la versión web de la skill `disenador-microcredenciales-alc` (copia en `docs/`). Responde en español.

## Estado
- Funciona y está publicada como artefacto de claude.ai (privada). Este repositorio es una copia exacta del código publicado más sus pruebas.
- `npm install && npm test` ejecuta 116 comprobaciones en jsdom (validación por campo, compuertas, dependencias, varias fichas, conflicto entre pestañas, exportación .docx, importación, degradación sin capacidades).
- **Nunca se probó en un navegador real.** Pendiente: recorrer el flujo a mano y revisar el aspecto visual.

## Arquitectura (todo en `index.html`)
- `FIELDS`: los 14 campos, cada uno con `criteria`, `example`, `controls`, `validate(values, ctx)` (reglas deterministas que devuelven errores y advertencias) y `ai` (criterio semántico para la revisión con Claude).
- `DEPS`: qué campos se invalidan al cambiar otro (1→13; 4→5,9,10; 9→10; 11→13).
- Estado por ficha: `{v:1, id, step, mode, imported, inventory, aiOn, fields:{id:{values,status,issues,attachments,proposed,stale}}, updatedAt}`. Estados: `pending | ok | okdet | fail` (`ok` = reglas + revisión de Claude; `okdet` = solo reglas).
- Varias fichas: índice en `data/users/<id>/fichas-index` y una ficha por documento `data/users/<id>/ficha-<fid>`; copia local en `localStorage` (`ficha-micro-v2:<fid>`). Cada pestaña recuerda su ficha en `sessionStorage`. Antes de escribir se compara `updatedAt` remoto con `baseStamp`: si es mayor, se pausa el guardado y se ofrece cargar lo remoto o sobrescribir.
- Exportación: `docModel()` → `buildDocx` (librería `docx@8.5.0`) / `toMarkdown`. Importación de fichas existentes: `mammoth@1.8.0` y propuesta campo a campo con IA.
- `window.__ficha` expone el estado y funciones para las pruebas.

## Dependencia del entorno de claude.ai (lo que cambia al salir de ahí)
La página usa `window.claude.use(nombre)` para: `db` y `user` (guardado en la cuenta), `assets` (adjuntos), `downloads` (guardar archivos) y `sample` (llamar a Claude). **Fuera de claude.ai esas capacidades no existen** y la página degrada sola:
- sin `db`: guarda solo en `localStorage` (por navegador);
- sin `sample`: solo reglas automáticas, sin revisión ni propuesta con IA, sin inventario de ficha importada;
- sin `assets`: sin adjuntos;
- sin `downloads`: descarga normal del navegador (`browserDownload`).

Para una versión independiente hay que sustituir esas cuatro por adaptadores: almacenamiento (IndexedDB o backend), subida de archivos, y un endpoint propio que llame a la API de Claude (con clave en el servidor) que devuelva el JSON `{cumple, problemas[], advertencias[]}` de `validationPrompt()`. Decidir antes cuántos usuarios habrá y si se necesita ver las fichas de todos.

## Decisiones que no hay que revertir
- Los criterios son **criterios de calidad de esta herramienta**, apoyados en el Marco de referencia UNESCO IESALC (2026), que **no es prescriptivo**. No presentarlos como requisitos de IESALC.
- No inventar datos oficiales: ID, código y URL de verificación quedan «[por definir por la institución emisora]» salvo que la persona confirme que su institución los definió.
- Solo el frente (c) del campo 7 y el aseguramiento externo del campo 11 admiten «No aplica» con un motivo concreto. Los campos 11 (parte externa), 13 y 14 son diferibles.
- La IA nunca redacta el valor del campo por la persona en la validación; en modo B solo propone a partir de la ficha importada, y las casillas de confirmación quedan sin marcar.
- Verbos prohibidos en resultados (campo 4): conocer, comprender, entender, saber, familiarizarse, apreciar. Se aceptan infinitivo y futuro.

## Pendientes conocidos
- La skill guardada en claude.ai **no tiene** los arreglos que ya incorpora la página: aceptar resultados en futuro, exigir que la suma de horas coincida con el total declarado, y las reglas de metadatos. Conviene alinear ambas.
- Probar en navegador real: consentimiento de la revisión con Claude, subidas, descargas, varias pestañas.
- Si dos pestañas crean fichas casi a la vez, el índice puede tardar en mostrar ambas (se corrige con «Actualizar lista»).
- Pasos del marco fuera de alcance de la ficha: trayectorias acumulables, niveles CINE, reconocimiento y aprendizaje previo, y principios de gestión (costos, datos personales, integridad académica con IA, verificación digital).

## Convenciones
- Un solo archivo; sin build. Mantener `h()` para crear DOM y no usar `alert/confirm/prompt` (hay `confirmModal`).
- Cualquier campo nuevo o cambio de criterio: actualizar `FIELDS`, `DEPS` si aplica, `fieldBlocks()` (documento) y las pruebas.
