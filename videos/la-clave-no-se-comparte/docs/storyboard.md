# Storyboard: La clave no se comparte

Video 3 de 4 para la clase "TIC para la Gestión Organizacional" (taller n8n + Odoo, AE4). Público: alumnos de
Administración con muy poco conocimiento técnico, mirando en el proyector del aula, sin voz.

## Logline

La clave de Evolution, la que está en el nodo Datos del flujo del bot, es la llave de tu casa: quien la tiene entra y
manda mensajes como si fuera la empresa. Se escapa sin querer por una captura, el JSON exportado, el Portafolio o un
grupo de WhatsApp. Cuatro reglas: PEGAR_ACA antes de exportar, revisar las capturas, si se filtró cambiarla (como la
cerradura) antes del Coloquio, y en Odoo solo datos ficticios. Una clave a la vista deja A4 en 10 como máximo.

## Numbers

- 120 bpm: beat 0.5 s (12 frames), bar 2 s.
- 32 s = 16 bars = 768 frames a 24 fps, 1920×1080 (horizontal, proyector).
- 9 shots de 3 a 4 s. Mismo desvío consciente que el video 1: tomas más largas que la casa para que se pueda leer.

## Summary

| Order | Id | Start | End | Mode | Title | Rótulo |
|---|---|---|---|---|---|---|
| 01 | la-llave | 0 | 3.5 | illustrated | La llave | La clave de Evolution es como la llave de tu casa |
| 02 | quien-entra | 3.5 | 6.5 | schematic | Quien la tiene, entra | Quien la tiene, manda mensajes como si fuera la empresa |
| 03 | donde-se-escapa | 6.5 | 10.5 | illustrated | Dónde se escapa | Por dónde se escapa sin querer |
| 04 | pegar-aca | 10.5 | 13.5 | schematic | PEGAR_ACA | Regla 1 · Antes de exportar, cambiala por PEGAR_ACA |
| 05 | capturas | 13.5 | 17 | illustrated | Las capturas | Regla 2 · Revisá cada captura antes de subirla |
| 06 | cerradura | 17 | 20 | schematic | La cerradura | Regla 3 · Si se filtró, cambiala (como la cerradura) |
| 07 | tope-a4 | 20 | 24 | illustrated | El tope | Una clave a la vista deja A4 en 10 como máximo |
| 08 | odoo-ficticio | 24 | 28 | schematic | Datos ficticios | Regla 4 · En Odoo, solo datos ficticios |
| 09 | resumen | 28 | 32 | illustrated | 4 reglas | La clave no se comparte |

## Structure

- Acto 1, bars 1–3 (0–6.5 s): qué es la clave y por qué importa.
- Acto 2, bars 4–5 (6.5–10.5 s): por dónde se escapa.
- Acto 3, bars 6–14 (10.5–28 s): las cuatro reglas, con la consecuencia en la nota en el medio (07).
- Cierre, bars 15–16 (28–32 s): las cuatro reglas en una sola pantalla, para pausar.
- Geometría compartida: el nodo Datos (G1) es el mismo en 01 (papel) y 04 (plano azul); la llave (G2) igual en
  01, 02 y 09.

## Conventions

- `T` global, `t` local. Rótulo: `FILM.cast.caption`, centrado x 960, baseline y 975, 54 px, entra con typewriter
  en 6 frames. Etiquetas con `FILM.cast.tag` o `lib.text`, 40 px como mínimo. Nada de texto con tope por encima de
  y 80.
- La única clave que se ve es `abc123••••`. Siempre con los puntitos.
- Cortes secos salvo 09, que entra con `fade` de 0.5 s.

## Shared geometry

### G1: el nodo Datos (01 y 04)

| Elemento | Valor |
|---|---|
| Tarjeta | x 160–820, y 250–690 (660 × 440), radio 26 |
| Encabezado | y 250–340, texto "Datos" 52 px en x 200, baseline 312 |
| Fila 1 | etiqueta "evo_url" x 200, baseline 448; caja de valor x 470–790, y 395–470; valor "https://…" |
| Fila 2 | etiqueta "evo_apikey" x 200, baseline 588; caja de valor x 470–790, y 535–610; valor "abc123••••" |
| Etiqueta "n8n" | tag en (250, 200) |

### G2: la llave

`FILM.cast.key`: a escala 1 mide 520 × 170; el aro centrado en (x − 180, y), radio 78, agujero 28; la caña de
x − 110 a x + 250; tres dientes abajo entre x + 150 y x + 250. En 01 termina en (1330, 470) a escala 1.

## Shots

## 01 la-llave: La llave

T 0 to 3.5, illustrated, cut.

- Composition: franjas crema/amarillo. Nodo Datos G1 a la izquierda. A la derecha queda la llave grande.
- Motion: T 0.5 la tarjeta entra (pop). T 1.0 la fila `evo_apikey` se resalta (wash keyPale + anillo annYellow).
  T 1.5 la llave sale del valor (escala 0.3 → 1, viaja hasta 1330, 470 en 0.5 s). T 2.0 aterriza con un brillo.
  T 2.5 cuelga del aro un llavero con forma de casita, que se hamaca.
- Sound: T 0 apertura; T 0.5 pop; T 1.0 ding de resaltado; T 1.5 whoosh + pop; T 2.0 clink; T 2.5 tintineo.

---

## 02 quien-entra: Quien la tiene, entra

T 3.5 to 6.5, schematic, cut.

- Composition: a la izquierda una figura "cualquiera" (cabeza + hombros, con "?") en x 300; puerta en contorno
  x 760–1080, y 230–800, con el tag "la empresa" arriba; a la derecha tres clientes (figuras chicas) en x 1640,
  y 300 / 520 / 740.
- Motion: T 3.75–4.25 la llave (schemGold) viaja de la mano de la figura a la cerradura. T 4.5 la puerta se abre y
  adentro brilla un celular. T 5.0, 5.5, 6.0 sale un globo magenta hacia cada cliente.
- Sound: T 3.5 whoosh al plano azul; T 4.25 click de llave; T 4.5 puerta; T 5.0, 5.5, 6.0 globos.

---

## 03 donde-se-escapa: Por dónde se escapa

T 6.5 to 10.5, illustrated, cut.

- Composition: cuatro íconos en y 470, x 300 / 740 / 1180 / 1620, cada uno con una llavecita que asoma:
  informe con una captura · documento `{ }` (el JSON exportado) · carpeta (Portafolio) · celular con un chat de
  grupo. Debajo, nombre (48 px, baseline 745) y detalle (40 px, baseline 800): "Una captura / del informe",
  "El JSON / exportado", "El Portafolio / Digital", "Un grupo / de WhatsApp".
- Motion: pops en T 7.0, 7.5, 8.0, 8.5. T 9.0 las cuatro llavecitas se sacuden con un anillo annMagenta.
- Sound: T 6.5 corte; cuatro pops; T 9.0 alerta.

---

## 04 pegar-aca: PEGAR_ACA

T 10.5 to 13.5, schematic, cut.

- Composition: el nodo Datos G1 en contorno lavanda. A la derecha, un documento en contorno "flujo exportado"
  (centro 1440, 470).
- Motion: T 11.0 "abc123••••" se tacha en magenta y se va. T 11.5–12.0 se escribe "PEGAR_ACA" en schemGreen.
  T 12.5 flecha "Exportar" de la tarjeta al documento; en el documento aparece "PEGAR_ACA". T 13.0 tilde verde.
- Sound: T 10.5 corte; T 11.0 tachón; T 11.5 tecleo; T 12.5 swoosh; T 13.0 acierto.

---

## 05 capturas: Las capturas

T 13.5 to 17, illustrated, cut.

- Composition: una hoja de informe grande (x 520–1400, y 120–860) con título "Informe AE4", renglones, y una
  captura (x 600–1320, y 300–700) que muestra un nodo Datos chico con "abc123••••" a 44 px.
- Motion: T 14.0–15.0 una lupa entra desde la izquierda y se para sobre la clave. T 15.0 anillo annMagenta: "¡ojo!".
  T 15.5 un marcador negro la tapa. T 16.0 sello verde "lista" con tilde.
- Sound: T 13.5 corte; T 14.0 deslizamiento; T 15.0 alerta; T 15.5 marcador; T 16.0 acierto.

---

## 06 cerradura: La cerradura

T 17 to 20, schematic, cut.

- Composition: candado viejo (magenta) en el centro (960, 470); llave vieja a la izquierda (300, 520); llave nueva
  (schemGreen) a la derecha (1600, 520). Tag "antes del Coloquio" arriba (960, 170).
- Motion: T 17.5 el candado viejo cae y se desvanece. T 18.0 el candado nuevo baja; T 18.5 cierra (click).
  T 19.0 la llave vieja tiembla con una cruz magenta: "ya no abre". T 19.5 entra el tag "antes del Coloquio".
- Sound: T 17 corte; T 17.5 caída; T 18.0 deslizamiento; T 18.5 click; T 19.0 buzz; T 19.5 pop.

---

## 07 tope-a4: El tope

T 20 to 24, illustrated, cut.

- Composition: encabezado "A4 · Protección de datos" (y 200). Regla de la nota de 0 a 15 (x 360–1560, y 470) con
  números 0, 5, 10, 15. En 10, un tope rojo con una llavecita y el texto "clave a la vista".
- Motion: T 20.5 la barra verde sube; T 21.5 choca contra el tope en 10 (rebote). T 22.5 entra el tag "y hay que
  cambiarla antes del Coloquio".
- Sound: T 20 corte; T 20.5 subida; T 21.5 golpe contra el tope; T 22.5 pop.

---

## 08 odoo-ficticio: Datos ficticios

T 24 to 28, schematic, cut.

- Composition: el cuaderno (contorno) centrado; tag "Odoo". Página izquierda "Clientes": "Cliente de prueba 1",
  "Cliente de prueba 2", "Ana Ejemplo", cada uno con tilde verde. Página derecha: "clientes reales" tachado en
  magenta.
- Motion: filas en T 24.5, 25.0, 25.5. T 26.0 aparece "clientes reales"; T 26.5 cruz magenta.
- Sound: T 24 corte; tres ticks; T 26.0 aparece; T 26.5 buzz.

---

## 09 resumen: 4 reglas

T 28 to 32, illustrated, fade 0.5 s.

- Composition: título "4 reglas para no olvidar" (y 200, 76 px). Cuatro íconos en y 480 (x 300 / 740 / 1180 /
  1620) con número: documento con PEGAR_ACA · lupa · candado verde · cuaderno. Debajo, nombre y detalle:
  "PEGAR_ACA / antes de exportar", "Revisá / cada captura", "¿Se filtró? / cambiala", "En Odoo / datos ficticios".
  Rótulo "La clave no se comparte".
- Motion: pops en T 28.5, 29, 29.5, 30; hold hasta 32.
- Sound: T 28 acorde de resolución; cuatro pops; T 31 cierre.
