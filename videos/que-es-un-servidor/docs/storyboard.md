# Storyboard: Qué es un servidor

Video 2 de 4 para la clase "TIC para la Gestión Organizacional" (taller n8n + Odoo). Público: alumnos de
Administración con muy poco conocimiento técnico, mirando en el proyector del aula.

## Logline

Tu compu de casa se apaga cuando cerrás la tapa; un servidor es una compu que no se apaga nunca, como un local
abierto 24 horas. Vive en un centro de datos de Amazon (AWS), se alquila por mes, adentro corren Evolution y n8n
(Odoo está aparte), se maneja con el control remoto Dokploy y tiene una dirección con candadito. El crédito
gratis baja como un taxímetro, y si el servidor se apaga, el bot deja de contestar.

## Numbers

- 120 bpm: beat 0.5 s (12 frames), bar 2 s.
- 32 s = 16 bars = 768 frames a 24 fps, 1920×1080 (horizontal, proyector).
- 9 shots de 3 a 4 s. **Desvío consciente de la casa (1 a 3 s por toma):** el público necesita tiempo para leer
  el rótulo; las tomas largas se sostienen con movimiento por beat. Igual que el video 1.

## Summary

| Order | Id | Start | End | Mode | Rótulo |
|---|---|---|---|---|---|
| 01 | casa-se-apaga | 0 | 3.5 | illustrated | Tu compu de casa se apaga cuando cerrás la tapa |
| 02 | local-24hs | 3.5 | 7 | schematic | Un servidor es como un local que nunca cierra |
| 03 | centro-de-datos | 7 | 10.5 | illustrated | Vive en un centro de datos de Amazon (AWS) |
| 04 | adentro | 10.5 | 14 | schematic | Adentro viven Evolution y n8n; Odoo está aparte |
| 05 | dokploy | 14 | 17.5 | illustrated | Dokploy: el control remoto para manejarlo |
| 06 | direccion | 17.5 | 21 | schematic | Tiene una dirección con candadito (HTTPS) |
| 07 | taximetro | 21 | 25 | illustrated | Se alquila: el crédito gratis baja como un taxímetro |
| 08 | apagado | 25 | 28 | schematic | Si se apaga, el bot deja de contestar |
| 09 | resumen | 28 | 32 | illustrated | (título arriba) Tu servidor, en 4 ideas |

## Structure

- Acto 1, bars 1–5 (0–10.5 s): qué es (la compu que se apaga, el local que nunca cierra, el centro de datos).
- Acto 2, bars 6–11 (10.5–21 s): qué tiene (lo que vive adentro, el control remoto, la dirección).
- Acto 3, bars 11–14 (21–28 s): lo que cuesta y lo que pasa si se apaga.
- Cierre, bars 15–16 (28–32 s): las 4 ideas, sostenidas para pausar.
- Las piezas que se repiten (servidor, control remoto, celular, nube de Odoo) salen de `FILM.cast` y son las
  mismas del video 1, para que el alumno las reconozca.

## Conventions

- `T` global, `t` local de la toma. Paleta del art bible.
- Rótulo de cada toma: `FILM.cast.caption`, centrado en x 960, baseline y 975, 54 px, peso 600, entra en los
  primeros 6 frames. Las etiquetas van con `FILM.cast.tag` (44 px como mínimo; en plano azul `schem: true`).
- Cortes secos salvo 09, que entra con `fade` de 0.5 s.

## Shared geometry

### G1: el servidor (03, 04, 05, 08)

La caja de servidor es `FILM.cast.server`. En el plano azul (04, 08) se dibuja en contorno lavanda con
`schem: true`. La luz verde es siempre la misma: prendida = verde, apagada = gris (`serverDeep`) en papel o sin
brillo en el plano azul.

### G2: el resumen (09)

Título baseline y 170, 70 px. Cuatro renglones con centro y = 330, 500, 670, 840; ícono centrado en x 300
(alto ≈ 130), texto desde x 450: línea principal 50 px (baseline y − 6) y secundaria 40 px (baseline y + 44).

## Shots

## 01 casa-se-apaga: Tu compu de casa

T 0 to 3.5, illustrated, cut.

- Composition: notebook grande centrada sobre una mesa (bisagra en y 720, base x 520–1400). Pantalla encendida
  con un chat. Ventana con luna arriba a la derecha.
- Motion: T 1.0 la tapa baja (inOutCubic, 0.5 s), T 1.5 cerrada: clack, la pantalla ya no se ve. T 2.0 salen
  tres "z" que suben y se desvanecen.
- Overlays: arco annYellow que muestra el recorrido de la tapa (T 1.0–1.5).
- Sound: T 0 apertura; T 1.0 roce; T 1.5 clack; T 2.0 zzz descendente.

---

## 02 local-24hs: Un local que nunca cierra

T 3.5 to 7, schematic, cut.

- Composition: local en contorno lavanda (x 600–1320, y 330–800), toldo a rayas, puerta y vidriera con una
  lámpara (glowDot) siempre prendida. Cartel arriba "ABIERTO 24 hs" en schemGreen.
- Motion: el cartel se enciende en T 4.0. Un sol cruza el cielo de 3.5 a 5.0, la luna de 5.0 a 6.0, el sol
  vuelve de 6.0 a 7.0. La lámpara late siempre.
- Sound: T 3.5 whoosh; T 4.0 zumbido de neón; T 5.0 campanita grave (luna); T 6.0 campanita aguda (sol).

---

## 03 centro-de-datos: El centro de datos

T 7 to 10.5, illustrated, cut.

- Composition: galpón con dos filas de cinco servidores (G1, escala chica) con luces que titilan. Cartel colgado
  arriba "Amazon (AWS)". Uno de la fila de adelante es "el tuyo".
- Motion: T 7.5 pop del cartel; T 8.5 anillo annMagenta y etiqueta "el tuyo"; T 9.5 pin con "en Estados Unidos".
- Sound: T 7.5 pop; T 8.5 ding; T 9.5 pop del pin.

---

## 04 adentro: Qué vive adentro

T 10.5 to 14, schematic, cut.

- Composition: rectángulo "tu servidor" (x 260–1200, y 220–780) con dos nodos: Evolution (x 500) y n8n
  (x 960), y 500. Afuera a la derecha la nube de Odoo (x 1580), separada por una línea punteada, con
  "aparte, en su nube".
- Motion: T 10.5–11.0 se traza el rectángulo; T 11.0 pop Evolution; T 11.5 pop n8n y flecha entre ellos;
  T 12.5 la nube y la flecha hacia Odoo.
- Sound: T 11.0 y 11.5 blips; T 12.5 campanita.

---

## 05 dokploy: El control remoto

T 14 to 17.5, illustrated, cut.

- Composition: control remoto grande (cast.remote, s 1.5) a la izquierda (x 470, y 520) con etiqueta "Dokploy".
  A la derecha el servidor (G1, con ventana) con una pantallita que lista "n8n" y "Evolution".
- Motion: T 14.5 el botón grande se hunde y salen ondas hacia el servidor; T 15.0 se prende "n8n" (tilde);
  T 15.5 "Evolution" (tilde); T 16.5 otro botón y la luz del servidor titila.
- Sound: T 14.5 clic; T 15.0 y 15.5 tildes; T 16.5 clic.

---

## 06 direccion: La dirección

T 17.5 to 21, schematic, cut.

- Composition: ventana de navegador en contorno (x 260–1660, y 200–780) con barra de dirección arriba
  (y 260–360). Adentro, el nodo "n8n" tenue.
- Motion: T 18.0–19.0 se tipea "n8n.tunombre.duckdns.org"; T 19.5 el candadito se cierra con brillo verde y
  aparece "candadito = conexión segura"; T 20.0 corchete y etiqueta "dominio" bajo la dirección.
- Sound: T 18.0 tecleo; T 19.5 clic metálico; T 20.0 blip.

---

## 07 taximetro: El taxímetro del crédito

T 21 to 25, illustrated, cut.

- Composition: taxímetro grande (x 560–1360, y 230–720) con display rojo "USD 100", título "crédito de regalo"
  y debajo del display "mes 0". Etiqueta "≈ USD 21 por mes" a la derecha.
- Motion: baja un mes por beat: T 22.0 79 · T 22.5 58 · T 23.0 37 · T 23.5 16; T 24.0 llega a 0, el display
  titila y aparece "¡se terminó!".
- Sound: T 22.0–23.5 clic de taxímetro en cada beat; T 24.0 alarma corta.

---

## 08 apagado: Si se apaga

T 25 to 28, schematic, cut.

- Composition: servidor en contorno a la izquierda (x 560) con una llave de encendido debajo; celular en contorno
  a la derecha (x 1380) con el chat.
- Motion: T 25.5 la llave pasa a "apagado", la luz se muere y un flash magenta; T 26.0 burbuja del cliente
  "¿Hola?"; T 26.5 tres puntitos de espera; T 27.0 "sin respuesta" en magenta.
- Sound: T 25.5 clack y bajada de tono; T 26.0 pop; T 27.0 tono grave de error.

---

## 09 resumen: Tu servidor, en 4 ideas

T 28 to 32, illustrated, fade 0.5 s.

- Composition: título arriba "Tu servidor, en 4 ideas" y los cuatro renglones G2:
  1. Una compu siempre prendida / alquilada por mes en Amazon (AWS)
  2. Ahí viven Evolution y n8n / Odoo está aparte, en su nube
  3. Se maneja con Dokploy / y tiene dirección con candadito (HTTPS)
  4. Apagalo si no lo usás y mirá el crédito / pero que ande hasta el Coloquio
- Motion: cada renglón entra con pop en T 28.5, 29.0, 29.5, 30.0; hold hasta 32.
- Sound: T 28 acorde de resolución; pops en los cuatro beats; T 31 cierre.
