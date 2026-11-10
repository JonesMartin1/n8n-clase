# Storyboard: Tu ayudante de código (y la clave no se la das)

Video 5 para la clase "TIC para la Gestión Organizacional" (UCP, 2C 2026, taller n8n + Odoo, AE4). Público: alumnos
de Administración con muy poco conocimiento técnico, mirando en el proyector del aula, sin voz. Fuente única del
contenido: `guia-agente-de-codigo.md` (raíz del repo).

## Logline

Un agente de código es un compañero que sabe programar, pero a veces se equivoca muy seguro. Hay tres opciones con
versión gratis (Codex con tu ChatGPT para arrancar hoy, Copilot Student que hay que pedir ya porque la verificación
tarda, Antigravity como plan B con cupo semanal). Le contás el flujo en criollo y te da el JSON para n8n; le pegás el
error y te lo explica. Tres reglas: nunca le pegues una clave (PEGAR_ACA), no le creas (probalo en tu n8n y tu Odoo) y
tenés que poder explicarlo vos en el Coloquio. El informe, la Bitácora y el Coloquio no se hacen con IA.

## Numbers

- 120 bpm: beat 0.5 s (12 frames), bar 2 s.
- 36 s = 18 bars = 864 frames a 24 fps, 1920×1080 (horizontal, proyector). Se usó el largo de 36 s (permitido por el
  pedido) para que cada plano dure 4 s y se pueda leer.
- 9 shots: ocho de 3 a 4 s y el resumen de 5 s, para pausar.

## Summary

| Order | Id | Start | End | Mode | Title | Rótulo |
|---|---|---|---|---|---|---|
| 01 | companero | 0 | 4 | illustrated | Un compañero | Un agente de código: un compañero que sabe programar |
| 02 | cual-usar | 4 | 8 | schematic | Cuál usar | Tres opciones con versión gratis |
| 03 | en-criollo | 8 | 12 | illustrated | En criollo | Le contás el flujo en criollo y te da el JSON para n8n |
| 04 | el-error | 12 | 16 | schematic | El error | Le pegás el error y te lo explica paso a paso |
| 05 | regla-clave | 16 | 20 | illustrated | Regla 1 | Regla 1 · Nunca le pegues una clave |
| 06 | probalo | 20 | 24 | schematic | Regla 2 | Regla 2 · No le creas: probalo en tu n8n y tu Odoo |
| 07 | explicalo | 24 | 28 | illustrated | Regla 3 | Regla 3 · Tenés que poder explicarlo vos |
| 08 | sin-ia | 28 | 31 | schematic | Sin IA | El informe, la Bitácora y el Coloquio: sin IA |
| 09 | resumen | 31 | 36 | illustrated | Resumen | Tu ayudante, sí. Tu clave, nunca. |

## Structure

- Acto 1, bars 1–4 (0–8 s): qué es un agente de código y cuál usar.
- Acto 2, bars 5–8 (8–16 s): para qué sirve en el taller (el flujo en criollo, el error).
- Acto 3, bars 9–15 (16–31 s): las tres reglas y lo que no se hace con IA.
- Cierre, bars 16–18 (31–36 s): las cuatro ideas en una pantalla, para pausar. Armonía: La en T 30–31, resuelve en
  Re en T 31.
- Geometría compartida: el nodo Datos (G1) y la llave (G2) son los del video 3 (`la-clave-no-se-comparte`), en 05.
  La compu-ayudante (G3) aparece en 01, 03, 04, 05, 06, 07 y 09 con la misma cara.

## Conventions

- `T` global, `t` local. Rótulo: `FILM.cast.caption`, centrado x 960, baseline y 975, 54 px, entra con typewriter.
  Etiquetas con `FILM.cast.tag` o `lib.text`, 40 px como mínimo. Nada de texto fuera de x 80–1840, y 80–1000.
- La única clave que se ve es `abc123••••`. Siempre con los puntitos. Lo demás es `PEGAR_ACA`.
- Sin logos: Codex, Copilot Student, Antigravity, n8n, Odoo y WhatsApp van como texto en tags o nodos.
- Sin números de cupos (cambian seguido).
- Cortes secos salvo 09, que entra con `fade` de 0.5 s.
- Strings con coma que van a `lib.text` se pasan como constantes (el escaneo del gate cuenta comas).

## Shared geometry

### G1: el nodo Datos (05), igual al del video 3

| Elemento | Valor |
|---|---|
| Tarjeta | x 160–820, y 250–690 (660 × 440), radio 26 |
| Fila 1 | etiqueta "evo_url"; caja de valor x 470–790, y 395–470; valor "https://…" |
| Fila 2 | etiqueta "evo_apikey"; caja de valor x 470–790, y 535–610; valor "abc123••••" → "PEGAR_ACA" |
| Etiqueta "n8n" | tag en (250, 196) |

### G2: la llave

`FILM.cast.key`, la misma del video 3: a escala 1 mide 520 × 170, aro a la izquierda.

### G3: la compu-ayudante

`FILM.cast.laptop`: pantalla w × h (520 × 340 a escala 1), marco `phoneCase`, pantalla `agentScreen`, base gris.
Cara: dos ojos (radio 19 a w 520, separados 164) y una sonrisa de 124 de ancho; `sure` levanta las cejas (muy
segura), `sleep` cierra los ojos, `smile: 0` la deja seria. En el plano azul va en contorno y la cara en
`schemGreen` (o `lavender` cuando se equivocó).

## Shots

## 01 companero: Un compañero

T 0 to 4, illustrated, cut.

- Composition: franjas crema/celeste. "vos" (figura teal) en (430, 520); la compu-ayudante grande en (1290, 440),
  tag "tu ayudante" arriba.
- Motion: T 0.5 pop de vos. T 1.0 pop de la compu. T 1.5 globo "¡Te lo armo!". T 2.0 sale una hoja `{ }` con
  renglones de código (guiño). T 2.5 cejas arriba y tag "…pero a veces se equivoca muy seguro".
- Sound: T 0 apertura; pops en 0.5 y 1.0; globo 1.5; hoja 2.0; tag 2.5.

---

## 02 cual-usar: Cuál usar

T 4 to 8, schematic, cut.

- Composition: tres tarjetas en contorno (x 400, 960, 1520; y 190–760), cada una con el nombre en un tag:
  "Codex · con tu ChatGPT · Arrancá hoy / sin instalar nada raro"; "Copilot Student · de GitHub · Pedilo ya / la
  verificación tarda"; "Antigravity · de Google · Plan B / cupo semanal".
- Motion: pops en T 4.5, 5.0, 5.5. T 6.0 brilla la estrella de Codex; T 6.5 gira el reloj de Copilot; T 7.0 gira
  la flecha de renovar de Antigravity.
- Sound: corte; tres pops; ting, tic-tac, glide.

---

## 03 en-criollo: En criollo

T 8 to 12, illustrated, cut.

- Composition: vos chico arriba a la izquierda con un globo de tres líneas ("Cuando llega un pedido / por
  WhatsApp, crealo / en Odoo y contestale."); la compu en (1240, 330); la hoja `flujo.json` en (1650, 360); abajo,
  tag "n8n" y tres nodos en y 700: WhatsApp, Odoo, Responder.
- Motion: T 8.5 globo y tecleo. T 9.0 flecha a la compu. T 9.5 sale `flujo.json`. T 9.75 flecha "Importar".
  T 10.0, 10.5, 11.0 los tres nodos con su tilde y sus cables.
- Sound: corte; tecleo; plip; whoosh de la hoja; tres tocks con bleep.

---

## 04 el-error: El error

T 12 to 16, schematic, cut.

- Composition: a la izquierda el nodo "Crear en Odoo" (contorno) con su cartel de error magenta debajo; a la derecha
  la ventana "Chat con tu ayudante" (x 730–1820, y 140–790).
- Motion: T 12.5 el nodo falla (temblor, cruz magenta, cartel "Error · el nodo falló"). T 13.0 el cartel se copia y
  vuela al chat: "¿Qué significa este error?". T 13.5, 14.0, 14.5 la respuesta: "Paso 1 · qué significa",
  "Paso 2 · por qué pasa", "Paso 3 · cómo se arregla". T 15.0 tag "explicámelo como si no supiera nada".
- Sound: corte; buzz; copiar y pegar; tres bleeps; pop.

---

## 05 regla-clave: Regla 1

T 16 to 20, illustrated, cut.

- Composition: franjas crema/amarillo. Nodo Datos G1 a la izquierda; la compu en (1490, 450).
- Motion: T 16.5 la compu pide "Pasame tu clave" (la fila de la clave se resalta). T 17.0 la llave sale del borde
  del nodo hacia la compu; T 17.5 choca contra un disco rojo con cruz, "¡No!", y vuelve. T 18.0–18.4 abc123•••• se
  tacha y se escribe PEGAR_ACA en verde. T 18.5 flecha verde "con PEGAR_ACA" a la compu y tilde. T 19.0 tag "la
  clave la ponés vos, a mano, en n8n".
- Sound: corte; globo; whoosh de la llave; golpe + buzz; tecleo; acierto; pop.

---

## 06 probalo: Regla 2

T 20 to 24, schematic, cut.

- Composition: la compu arriba a la izquierda con el globo "¡Seguro que anda!"; botón "Probar" arriba a la derecha
  con el tag "tu n8n"; tres nodos en y 560.
- Motion: T 20.5 globo, cejas arriba. T 21.0 se aprieta Probar y una señal viaja. T 21.5 tilde en WhatsApp. T 22.0
  Odoo falla: cruz magenta, "ese campo no existe", la compu se pone seria y el globo se apaga. T 22.5 tag "vale
  cuando el dato aparece en tu Odoo".
- Sound: corte; boop; click del botón; tick; golpe + buzz; pop.

---

## 07 explicalo: Regla 3

T 24 to 28, illustrated, cut.

- Composition: franjas salvia. Tag "Coloquio" arriba; mesa de madera; vos (teal) a la izquierda, docente (ciruela) a
  la derecha; la compu chica sobre la mesa.
- Motion: T 24.5 el docente pregunta "¿Por qué pusiste este nodo?". T 24.75 la compu levanta la mano ("¡Yo sé!");
  T 25.0 una cruz roja la tacha y se duerme. T 25.5 vos contestás "Lo puse para crear el pedido en Odoo". T 26.0
  tilde. T 26.5 tag "pedile que te explique hasta entenderlo".
- Sound: corte; glide de pregunta; buzz; pluck; acierto; pop.

---

## 08 sin-ia: Sin IA

T 28 to 31, schematic, cut.

- Composition: tres íconos en contorno en y 410 (x 480, 960, 1440): hoja "AE4", cuaderno, globo "¿?"; debajo "El
  informe", "La Bitácora", "El Coloquio".
- Motion: sellos magenta "sin IA" en T 28.5, 29.0, 29.5. T 30.0 tag "ni para que «mejore» tu texto".
- Sound: corte; tres sellos (thud + tock); pop.

---

## 09 resumen: Resumen

T 31 to 36, illustrated, fade 0.5 s.

- Composition: título "Tu ayudante de código, en 4 ideas" (y 190, 72 px). Grilla 2×2 de tarjetas blancas (820 × 210)
  con número, ícono, idea (52 px) y detalle (40 px): "Codex, hoy / y pedí ya Copilot Student"; "Nunca una clave /
  siempre PEGAR_ACA"; "No le creas / probalo en tu n8n y tu Odoo"; "Explicalo vos / informe y Bitácora: sin IA".
- Motion: pops en T 31.5, 32.0, 32.5, 33.0; hold hasta 36.
- Sound: T 31 resolución en Re (crash + campana); cuatro pops; T 35 cierre.
