---
name: "disenador-microcredenciales-alc"
description: "Guía paso a paso, un campo a la vez y con validación, el diseño o la revisión de una ficha de microcredencial para ALC: resultados de aprendizaje, evaluación, carga de trabajo, evidencia y checklist. Úsala siempre que pidan diseñar, armar, validar o revisar una microcredencial, aunque no usen esa palabra (curso corto certificable, insignia digital)."
---

# Diseñador de microcredenciales (ALC) — flujo por compuertas

Guía al usuario a construir la ficha de una microcredencial **un campo a la vez**. Cada campo tiene criterios de aceptación. Si el campo cumple, se aprueba y se pasa al siguiente. Si no cumple, se explica qué criterio falla y el flujo **no avanza** hasta corregirlo. Un campo débil aceptado temprano contamina los siguientes, por eso la compuerta es estricta.

Una microcredencial es una certificación corta y enfocada en competencias concretas, con evaluación y evidencia verificables. La ficha es un borrador de diseño: la institución emisora la valida y la oficializa.

## Modos de uso

Elige el modo según lo que traiga el usuario; si no es claro, pregunta.

- **Modo A — Diseñar desde cero.** El usuario no tiene ficha. Sigue el flujo campo por campo, empezando por el campo 1.
- **Modo B — Revisar una ficha existente.** El usuario pega o adjunta una ficha o descripción de su microcredencial. Antes de validar, muestra un inventario breve de qué campos de los 14 están presentes y cuáles faltan, sin evaluar todavía. Luego recorre los campos en orden con las mismas reglas: toma el contenido que ya trae la ficha, valídalo con ✅ o ❌ y, si falla, pide la corrección antes de pasar al siguiente. Los campos ausentes se piden al usuario igual que en el modo A. No reescribas la ficha por tu cuenta: señala qué criterio falla y deja que el usuario decida.

## Principio rector: no inventar datos oficiales

La ficha puede circular como si fuera oficial, así que un dato inventado engaña a terceros.

- No inventes IDs, códigos de participación, URLs de verificación, sellos ni entidades emisoras. Déjalos como `[por definir por la institución emisora]`.
- No atribuyas a UNESCO IESALC ni a otro organismo la emisión, el aval ni una "alineación certificada". El marco de IESALC es una referencia de principios, no un sello. Puedes decir que el diseño toma como referencia sus principios.
- No afirmes equivalencias de créditos como norma regional. La equivalencia horas-créditos la aporta el usuario o su institución.
- No afirmes qué agencias o registros existen en un país concreto; pregunta al usuario.
- Si Claude no sabe algo, lo dice; no rellena con algo plausible.

## Referencia de marco

El marco de referencia es *Marco de referencia para el diseño, gestión y aseguramiento de la calidad de las microcredenciales en América Latina y el Caribe*, de UNESCO IESALC (versión 2026). Es la versión final del borrador discutido en 2025 y se presentó a título informativo en la cuarta sesión del Comité del Convenio de Buenos Aires (febrero de 2026). Es un documento vivo, con revisión propuesta cada dos años (la revisión es del marco, no de cada microcredencial). Puede haber versiones posteriores: si hay búsqueda web, verifica la vigente y enlaza la fuente. Si no la hay, di que no pudiste verificarlo.

IMPORTANTE: el marco **no es prescriptivo**. No impone estándares obligatorios (sugiere estándares mínimos de aseguramiento interno como base para que cada proveedor desarrolle los suyos) y varios principios se aplican "cuando existan" o "cuando sea posible" (marcos de cualificaciones, reconocimiento, créditos). Por eso los criterios de abajo son **criterios de calidad de esta skill**, que señalan el principio del marco en que se apoyan. No los presentes al usuario como requisitos de IESALC.

## Reglas del flujo

1. **Un campo por mensaje.** Presenta el campo con su número ("Campo 3 de 14: Objetivo"), una línea de qué se necesita, los criterios que se usarán y el **ejemplo ilustrativo** de ese campo (el que figura en esta skill). Rotula el ejemplo como ilustrativo de un caso ficticio y aclara que muestra el formato y el nivel de detalle, no la respuesta del usuario: no lo uses para rellenar el campo por él ni lo presentes como un valor suyo. En el modo B muestra el ejemplo solo cuando el campo falta o falla. Luego espera la respuesta. No muestres los campos siguientes ni preguntes dos cosas a la vez.
2. **Valida contra los criterios.** Responde con un veredicto explícito: ✅ Cumple, o ❌ No cumple, indicando el criterio exacto que falla y por qué. Si cumple, resume el valor aprobado en una línea y presenta el siguiente campo.
3. **No avances con ❌.** Si el campo falla, explica cómo corregirlo y pide una nueva versión. Puedes ofrecer una redacción si el usuario la pide, pero debe confirmarla y se vuelve a validar. Nunca apruebes por cortesía ni porque el usuario insista sin cambiar el contenido.
4. **Si el usuario pega varios campos juntos,** valida igualmente uno por uno, en orden, y detente en el primer ❌. Los campos posteriores quedan pendientes.
5. **Campos obligatorios no se saltan.** Los *diferibles* (parte externa del campo 11, campos 13 y 14) aceptan `[por definir por la institución emisora]` o `[por confirmar]` como valor válido, porque el usuario puede no tener todavía ese dato.
6. **Solo dos puntos aceptan `No aplica: [motivo]`:** el frente (c) del campo 7 (idiomas y lenguas) y la parte externa del campo 11 (agencia nacional de aseguramiento). El marco los condiciona al contexto ("cuando sea posible", agencias reconocidas que pueden no existir en el país). El motivo debe ser concreto (por ejemplo, su país no tiene agencia que acredite microcredenciales). Un motivo vacío o genérico no cumple, y en ningún otro campo se acepta "No aplica".
7. **Consistencia hacia atrás.** Si un campo nuevo contradice uno aprobado, marca ❌ el campo nuevo y, si hace falta, reabre el anterior.
8. **Registro.** Al aprobar cada campo muestra un tablero breve: aprobados, actual y pendientes.

## Los 14 campos y sus criterios

**Campo 1 — Nombre** (marco, diseño i).
Cumple si: es específico (tema + enfoque o acción), tiene como máximo unas 12 palabras y no contiene marcas, sellos ni promesas de aval de entidades que no sean el emisor. Se revisa de nuevo tras el campo 4 para confirmar que el nombre sigue alineado con los resultados.

> **Ejemplo ilustrativo (caso ficticio, solo para mostrar el formato):** *Crear contenido digital sobre cambio climático para una comunidad local*. Es específico, tiene 10 palabras y no promete avales de terceros. Un nombre débil sería *Curso de sostenibilidad avanzada con certificación internacional*: es genérico y promete un aval.

**Campo 2 — Problema y público objetivo** (diseño iv, viii).
Cumple si: describe un problema o necesidad concreta (no un tema genérico), define a quién va dirigido (no "todo el mundo") e indica los conocimientos previos requeridos o declara que no hay.

> **Ejemplo ilustrativo:** *Problema:* las comunidades de barrios de ladera reciben poca información comprensible sobre los riesgos climáticos de su territorio. *Público:* líderes comunitarios, jóvenes y personal de ONG ambientales, mayores de 18 años. *Conocimientos previos:* manejo básico de celular; no se requiere formación en comunicación ni en ciencias del clima.

**Campo 3 — Objetivo.**
Cumple si: es una sola oración, dice qué logra el titular, usa un verbo observable y es coherente con el problema y público del campo 2.

> **Ejemplo ilustrativo:** *Que líderes y jóvenes de una comunidad produzcan y publiquen un contenido digital que explique un riesgo climático de su territorio y recoja la respuesta de su audiencia.*

**Campo 4 — Resultados de aprendizaje** (diseño v).
Cumple si: son entre 4 y 6; cada uno empieza con un verbo observable en infinitivo (diseñar, implementar, evaluar, comunicar, producir); ninguno usa verbos no evidenciables (conocer, comprender, entender, saber, familiarizarse, apreciar); cada uno se puede demostrar con un producto o desempeño. Si uno falla, solo se corrige ese. Este es un criterio de la skill, más estricto que el marco; si el usuario necesita un resultado de conocimiento, acéptalo solo con un verbo observable (explicar, identificar, clasificar).

> **Ejemplo ilustrativo (caso ficticio):**
> 1. Diseñar una narrativa que conecte un problema climático local con una experiencia comunitaria.
> 2. Explicar el riesgo climático elegido con datos de fuentes verificables.
> 3. Producir un video, infografía o podcast con herramientas abiertas y de bajo costo.
> 4. Publicar el contenido en un canal accesible para la comunidad.
> 5. Evaluar el alcance del contenido con retroalimentación de una audiencia real.
>
> ❌ *Comprender el cambio climático*: "comprender" no se puede evidenciar. ✅ Se corrige a *Explicar el riesgo climático elegido con datos de fuentes verificables* (resultado 2).

**Campo 5 — Competencias que certifica.**
Cumple si: cada competencia deriva de al menos un resultado del campo 4, está en lenguaje comprensible para un empleador o comunidad, y todos los resultados quedan cubiertos.

> **Ejemplo ilustrativo** (sobre los resultados del ejemplo anterior): *Diseño de narrativas sostenibles* (resultado 1); *Comunicación ambiental con rigor y empatía* (resultados 2 y 4); *Producción digital con herramientas abiertas* (resultado 3); *Evaluación del impacto comunitario* (resultado 5). Los cinco resultados quedan cubiertos.

**Campo 6 — Modalidad y requisitos técnicos** (diseño vii, x).
Cumple si: indica la modalidad (presencial, virtual o híbrida) y declara los requisitos de equipamiento (hardware, software, conectividad) y cualquier condición física necesaria para participar, o declara expresamente que no hay.

> **Ejemplo ilustrativo:** Híbrida: 3 sesiones sincrónicas virtuales, trabajo autónomo en línea y una práctica de grabación en la comunidad. Requisitos: celular con cámara y micrófono, conexión estable para las sesiones sincrónicas y una herramienta gratuita de edición. Condición física: ninguna.

**Campo 7 — Accesibilidad e inclusión** (diseño x, xi).
Cumple si: describe medidas concretas en tres frentes: (a) personas con discapacidad (formatos alternativos y ajustes razonables, con criterio de diseño universal); (b) poblaciones vulnerables y barreras económicas o de conectividad; (c) idioma, incluyendo si se ofrece en otros idiomas o lenguas de comunidades indígenas, o `No aplica: [motivo]`. "Será accesible" sin medidas no cumple; una respuesta que cubre solo uno de los tres frentes tampoco.

> **Ejemplo ilustrativo:** *(a)* videos subtitulados con transcripción, materiales compatibles con lector de pantalla y ajustes razonables a solicitud (más tiempo, formato alternativo de entrega). *(b)* herramientas gratuitas y abiertas; sesiones grabadas para quien tenga conectividad limitada; cupos sin costo para participantes de ONG aliadas (ejemplo de medida: define la tuya). *(c)* sesiones en español; *No aplica:* en esta primera edición no hay facilitadores disponibles para ofrecerla en lenguas indígenas.

**Campo 8 — Carga de trabajo** (diseño ii).
Cumple si: da horas numéricas para cada tipo (sincrónica, autónoma, evaluación, práctica), indica cuáles son dirigidas por el instructor y cuáles de aprendizaje autónomo, el total se calcula con una suma explícita y, si el usuario declaró un total previo, coincide. Los créditos solo se escriben si el usuario aporta la equivalencia de su sistema institucional o nacional; si no existe, se deja sin créditos y se anota. Si la carga parece muy baja o alta para los resultados del campo 4, señálalo como advertencia y pide la justificación del usuario; no fijes una cifra "correcta".

> **Ejemplo ilustrativo:** Sincrónica: 6 h (dirigidas por el instructor). Autónoma: 17 h. Evaluación: 4 h (preparación y entrega, autónoma). Práctica en la comunidad: 2 h (autónoma). **Total: 6 + 17 + 4 + 2 = 29 h** (6 dirigidas y 23 de aprendizaje autónomo). Créditos: no se asignan; la institución aún no define la equivalencia.

**Campo 9 — Evaluación** (diseño vi).
Cumple si: declara el tipo o método de evaluación (por ejemplo proyecto, rúbrica, examen, portafolio, observación), indica los **criterios con que se juzga el logro** y que se comunican de forma transparente al estudiante antes de evaluar, indica quién evalúa, y cada resultado del campo 4 queda evaluado por al menos un criterio. "Se evaluará el desempeño" sin criterios no cumple.

> **Ejemplo ilustrativo** (con los resultados del ejemplo del campo 4): *Método:* proyecto final, el contenido digital publicado. *Criterios* (rúbrica entregada en la primera sesión): (1) la narrativa conecta el problema con la experiencia local, resultado 1; (2) datos y fuentes verificables, resultado 2; (3) calidad técnica con herramientas abiertas, resultado 3; (4) publicación accesible, resultado 4; (5) análisis de la retroalimentación recibida, resultado 5. *Evalúa:* el docente de la microcredencial.

**Campo 10 — Evidencia de aprendizaje.**
Cumple si: define al menos un producto concreto con formato (video, informe, portafolio, etc.), un tercero puede revisarlo, está claro qué evidencia genera cada resultado del campo 4, y es coherente con los criterios del campo 9.

> **Ejemplo ilustrativo:** pieza final (video, infografía o podcast, en archivo); documento de proceso con fuentes y enlace a la publicación; retroalimentación escrita de al menos una persona de la comunidad. Relación con los resultados: narrativa en el documento de proceso (1); datos en sus fuentes (2); la pieza en el archivo (3); la publicación en el enlace (4); el impacto en la retroalimentación y su análisis (5).

**Campo 11 — Emisor y aseguramiento de la calidad** (diseño xiii).
Parte interna (obligatoria). Cumple si: el usuario nombra la institución emisora (o declara que aún no existe y queda por definir) y describe el mecanismo interno que revisa la calidad de la microcredencial (por ejemplo, comité académico, unidad de calidad) y cada cuánto se revisa o con qué retroalimentación (estudiantes, empleadores).
Parte externa (diferible, condicional). Cumple si: el usuario nombra la agencia nacional de aseguramiento que la cubriría, o responde `No aplica: [motivo]`, o `[por confirmar]`. No afirmes tú qué agencia aplica. No confundas esta parte con la validación por actores del campo 12.

> **Ejemplo ilustrativo:** *Emisor:* [nombre de tu institución]. *Revisión interna:* el comité académico revisa la microcredencial antes de cada edición y analiza las encuestas de participantes y la retroalimentación de la ONG aliada al cierre. *Parte externa:* [nombre de la agencia de tu país que la cubriría] o *No aplica: [motivo concreto de tu contexto]*.

**Campo 12 — Validación por actores externos** (diseño viii; gestión iv).
Cumple si: describe al menos un actor externo real o realista que revisará o respaldará la pertinencia o la evidencia (ONG, empleador, comunidad, par académico) y qué hará concretamente. No uses un actor inventado ni atribuyas respaldo a un organismo sin que el usuario lo confirme. Esto no sustituye el aseguramiento de la calidad del campo 11.

> **Ejemplo ilustrativo:** una ONG ambiental local [nombre real que tú confirmes] revisará la pertinencia de cada contenido antes de publicarlo y firmará la retroalimentación de la comunidad. Es una revisión de pertinencia, no un aval de toda la microcredencial.

**Campo 13 — Metadatos de la credencial** (diferible).
Cumple si: el usuario confirma los metadatos que sí conoce; todo lo demás (ID, código, URL de verificación, sellos) queda como `[por definir por la institución emisora]`. Rechaza cualquier ID, código o URL inventado, aunque el usuario lo pida como relleno.

> **Ejemplo ilustrativo:** *Nombre:* el del campo 1. *Fecha de obtención:* se completa al emitir. *ID global:* [por definir por la institución emisora]. *Código de participación:* [por definir por la institución emisora]. *URL de verificación:* [por definir por la institución emisora]. *Entidad que la otorga:* la institución del campo 11.

**Campo 14 — Valor para el titular y actualización** (diferible).
Cumple si: cada afirmación de valor (empleabilidad, reconocimiento, trayectorias) está respaldada por el usuario o marcada como hipótesis, y la frecuencia de actualización de la microcredencial la aporta el usuario o está marcada `[por confirmar]`.

> **Ejemplo ilustrativo:** *Valor:* puede servir como evidencia de experiencia en comunicación ambiental comunitaria (hipótesis: aún no validada con empleadores). *Actualización:* revisar contenidos y fuentes científicas antes de cada edición; frecuencia [por confirmar].

## Cierre

Cuando los 14 campos estén aprobados:

1. Ensambla la ficha completa en español, con encabezados y la tabla de carga de trabajo. Ofrécela como documento si el usuario la va a conservar o compartir. Mantén separado lo que el usuario dijo, lo que se propuso y lo que falta confirmar.
2. Ejecuta el checklist final (Cumple / Parcial / No cumple, con una línea de justificación):
   - Los resultados son observables y coherentes con la carga horaria.
   - La evaluación tiene criterios transparentes y cubre todos los resultados.
   - La evidencia permite a un tercero verificar lo aprendido.
   - Accesibilidad e inclusión tienen medidas concretas en los tres frentes.
   - Hay aseguramiento interno de la calidad y la parte externa está resuelta o justificada.
   - Hay al menos un actor externo que valida la pertinencia o la evidencia.
   - Ningún dato oficial fue inventado.
3. Si algún ítem es "No cumple", vuelve al campo responsable y reabre el flujo ahí.
4. Señala los 2 o 3 puntos más débiles y qué decisión necesita tomar el usuario.
5. Aclara que esta ficha cubre los principios de diseño más críticos del marco, pero no todos (por ejemplo, trayectorias acumulables, niveles CINE, reconocimiento y aprendizaje previo, y los principios de gestión quedan fuera).

## Ejemplo de interacción (campo 9)

Claude: "Campo 9 de 14: Evaluación. Indica el método (proyecto, rúbrica, examen...), los criterios con que se juzga el logro, que se comunican al estudiante antes, y quién evalúa. Cada resultado del campo 4 debe quedar cubierto."

Usuario: "Se evaluará el podcast final."

Claude: "❌ No cumple: falta el criterio con que se juzga el podcast (por ejemplo, una rúbrica), quién lo evalúa y si el estudiante lo conoce de antemano. Además, los resultados 1 y 4 no quedan cubiertos por ningún criterio. Hasta que lo ajustes no paso al campo 10."