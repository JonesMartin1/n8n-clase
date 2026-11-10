# Storyboard: Qué vamos a armar

Video 1 de 4 para la clase "TIC para la Gestión Organizacional" (taller n8n + Odoo). Público: alumnos con muy
poco conocimiento técnico, mirando en el proyector del aula.

## Logline

Un cliente manda un WhatsApp; el celular virtual (Evolution) lo recibe, la caja de LEGO (n8n) decide qué hacer,
el pedido queda anotado en el cuaderno de la empresa (Odoo) y el cliente recibe la respuesta solo.
Dibujado a mano en canvas, papel y plano azul alternados, con un rótulo corto por toma para que se entienda sin voz.

## Numbers

- 120 bpm: beat 0.5 s (12 frames), bar 2 s.
- 32 s = 16 bars = 768 frames a 24 fps, 1920×1080 (horizontal, proyector).
- 9 shots de 2.5 a 4.5 s. **Desvío consciente de la casa (1 a 3 s por toma):** el público necesita tiempo para
  leer el rótulo y seguir la idea; las tomas largas se sostienen con movimiento por beat.

## Summary

| Order | Id | Start | End | Mode | Title | Rótulo |
|---|---|---|---|---|---|---|
| 01 | cliente-escribe | 0 | 3.5 | illustrated | El cliente escribe | 1 · Un cliente manda un WhatsApp |
| 02 | viaja | 3.5 | 6 | schematic | El mensaje viaja | El mensaje viaja por internet |
| 03 | evolution | 6 | 9.5 | illustrated | El celular virtual | 2 · Evolution: el celular virtual que lo recibe |
| 04 | n8n-lego | 9.5 | 14 | illustrated | La caja de LEGO | 3 · n8n: la caja de LEGO donde se arma la lógica |
| 05 | recorrido | 14 | 17 | schematic | Paso a paso | Cada pieza hace un paso, siempre igual |
| 06 | odoo-cuaderno | 17 | 21 | illustrated | El cuaderno | 4 · Odoo: el cuaderno de la empresa |
| 07 | respuesta | 21 | 24.5 | illustrated | La respuesta | 5 · Y el cliente recibe la respuesta, solo |
| 08 | servidor | 24.5 | 28 | schematic | Dónde vive | Todo corre en un servidor: una compu siempre prendida |
| 09 | resumen | 28 | 32 | illustrated | Lo que vamos a armar | Esto es lo que vamos a armar |

## Structure

- Acto 1, bars 1–3 (0–6 s): llega el mensaje.
- Acto 2, bars 4–9 (6–17 s): Evolution lo recibe y n8n lo procesa (la bisagra: n8n, compás 6, T 10).
- Acto 3, bars 9–14 (17–28 s): queda en Odoo, el cliente recibe la respuesta, dónde corre todo.
- Cierre, bars 15–16 (28–32 s): el mapa completo, sostenido para leer.
- Match cuts: 01 ↔ 07 (el celular del cliente, G2, mismos píxeles); 04 → 05 (los cuatro ladrillos se vuelven
  cuatro nodos, G1).
- Los cuatro íconos (celular, celular virtual, LEGO, cuaderno) se repiten iguales en 09 (G3), dibujados con
  `FILM.cast` para que no deriven.

## Conventions

- `T` global, `t` local de la toma. Cámara con `lib.camera`. Paleta del art bible.
- Rótulo de cada toma: `FILM.cast.caption`, centrado en x 960, baseline y 975, 54 px, peso 600. Entra con
  typewriter en 6 frames desde el primer beat de la toma. Es el único texto obligatorio; las etiquetas de
  objetos (Evolution, n8n, Odoo) van con `FILM.cast.tag`, 44 px como mínimo.
- Cortes secos salvo 09, que entra con `fade` de 0.5 s.

## Shared geometry

### G1: los cuatro pasos de n8n (04 → 05)

| Paso | Texto | Centro x | Centro y | Color 04 (ladrillo) |
|---|---|---|---|---|
| 1 | Leer el mensaje | 420 | 520 | legoBlue |
| 2 | ¿Es un pedido? | 780 | 520 | legoYellow |
| 3 | Anotarlo en Odoo | 1140 | 520 | legoRed |
| 4 | Contestarle | 1500 | 520 | legoGreen |

Ladrillo: 300 × 150 px, 3 tetones arriba. En 05 cada nodo es un círculo de radio 92 en el mismo centro.

### G2: el celular del cliente (01 ↔ 07)

Cuerpo: rectángulo redondeado x 760–1160, y 110–860 (400 × 750), radio 54. Pantalla: x 784–1136, y 190–780.
Burbuja del cliente: derecha de la pantalla, y 300. Burbuja de respuesta: izquierda, y 470.

### G3: los cuatro íconos del resumen (09)

Centros y = 520; x = 300, 740, 1180, 1620; escala 0.42 del dibujo grande. Flechas entre ellos en y 520.

## Shots

## 01 cliente-escribe: El cliente escribe

T 0 to 3.5, illustrated, cut.

- Composition: celular grande centrado (G2) sobre papel con franjas crema/amarillo. Mano no.
- Motion: T 0.5 el celular vibra (3 sacudidas de ±6 px en dos). T 1.0 aparecen tres puntitos "escribiendo".
  T 2.0 pop de la burbuja verde "Hola! Quiero 2 docenas de empanadas" (outBack, 3 frames). T 2.5 dos tildes.
- Overlays: ondas de vibración (annYellow) a los costados en T 0.5.
- Sound: T 0 apertura; T 0.5 zumbido; T 2.0 pop de burbuja.

---

## 02 viaja: El mensaje viaja

T 3.5 to 6, schematic, cut.

- Composition: contorno lavanda del celular a la izquierda (centro 330, 520, alto 420); a la derecha una caja
  de servidor en contorno (centro 1590, 520). Entre ellos un arco punteado; un glowDot verde (schemGreen) viaja
  de 4.0 a 5.5. Globo de red (guideCircle con meridianos) en el medio, tenue.
- Sound: T 3.5 corte con whoosh; T 5.5 llegada (campanita).

---

## 03 evolution: El celular virtual

T 6 to 9.5, illustrated, cut.

- Composition: caja de servidor (gris) a la izquierda-centro con un celular dibujado adentro (pantalla azul
  evoBlue). Etiqueta "Evolution" arriba. A la derecha, flecha con la palabra "aviso" que sale en T 8.5.
- Motion: T 6.5 la burbuja entra en la pantalla; T 7.5 el celular virtual suena (ondas); T 8.5 sale la flecha
  "aviso" hacia la derecha.
- Sound: T 6.5 ding; T 7.5 ring; T 8.5 swoosh.

---

## 04 n8n-lego: La caja de LEGO

T 9.5 to 14, illustrated, cut.

- Composition: etiqueta "n8n" arriba al centro. Los cuatro ladrillos G1 caen y encastran uno por beat:
  T 10.0, 11.0, 12.0, 13.0, cada uno con su texto adentro (40 px, blanco sobre el color).
- Sound: T 10, 11, 12, 13 "clack" de encastre.

---

## 05 recorrido: Paso a paso

T 14 to 17, schematic, cut.

- Composition: los cuatro nodos G1 en contorno lavanda con su texto debajo (y 660); conectores entre ellos. Un
  glowDot recorre 1→4: llega al nodo 1 en T 14.5, 2 en T 15.0, 3 en T 15.5, 4 en T 16.0; cada nodo se enciende
  con un anillo magenta de 8 frames.
- Sound: T 14.5, 15, 15.5, 16 blips ascendentes.

---

## 06 odoo-cuaderno: El cuaderno

T 17 to 21, illustrated, cut.

- Composition: cuaderno abierto (tapa odooPlum) centrado, x 460–1460, y 170–840. Encabezado "Pedidos". Dos
  renglones ya escritos (tinta suave). Etiqueta "Odoo" arriba a la izquierda.
- Motion: T 18.0 se escribe el renglón nuevo "N° 12 · Ana · 2 docenas de empanadas" (typewriter hasta T 19.0);
  T 19.5 tilde verde grande.
- Sound: T 18 lápiz; T 19.5 acierto.

---

## 07 respuesta: La respuesta

T 21 to 24.5, illustrated, cut.

- Composition: el mismo celular de 01 (G2) con la burbuja del cliente arriba. T 22.0 pop de la respuesta
  (blanca, izquierda): "¡Listo! Tu pedido es el N° 12". T 23.0 corazones/chispas.
- Sound: T 22 pop; T 23 acorde feliz.

---

## 08 servidor: Dónde vive

T 24.5 to 28, schematic, cut.

- Composition: rectángulo grande "tu servidor" (x 560–1360, y 200–760) con dos nodos adentro: "Evolution" y
  "n8n". Afuera a la derecha una nube "Odoo"; a la izquierda el celular. A la izquierda abajo un control remoto
  "Dokploy". Luz encendida (glowDot) que late en la esquina del servidor: "siempre prendida".
- Motion: T 25.0 el rectángulo se traza; T 25.5 nodos; T 26.5 nube y control remoto; T 27 la luz late.
- Sound: T 25 trazo; T 26.5 blip.

---

## 09 resumen: Lo que vamos a armar

T 28 to 32, illustrated, fade 0.5 s.

- Composition: título grande arriba "Esto es lo que vamos a armar" (y 230, 76 px). Los cuatro íconos G3 con
  flechas, y debajo de cada uno su nombre y su metáfora: WhatsApp / el cliente · Evolution / el celular virtual ·
  n8n / la caja de LEGO · Odoo / el cuaderno.
- Motion: íconos pop en T 28.5, 29.0, 29.5, 30.0; flechas entre ellos; hold hasta 32.
- Sound: T 28 acorde de resolución; pops en los cuatro beats; T 31 cierre.
