// 05 recorrido : plano azul. Los ladrillos de 04 son ahora nodos (G1, mismo centro). Un punto los recorre:
// llega al nodo 1 en T 14.5, 2 en 15.0, 3 en 15.5, 4 en 16.0; cada uno se enciende con un anillo magenta.
(function () {
  'use strict';
  const ID = 'recorrido';
  const NODES = [
    { x: 420, lines: ['Leer el', 'mensaje'], at: 0.5 },
    { x: 780, lines: ['¿Es un', 'pedido?'], at: 1.0 },
    { x: 1140, lines: ['Anotarlo', 'en Odoo'], at: 1.5 },
    { x: 1500, lines: ['Contestarle'], at: 2.0 },
  ];
  const Y = 520, R = 92;

  FILM.scene({
    id: ID,
    draw(ctx, t, info) {
      const L = info.lib, P = L.pal, C = FILM.cast, E = L.ease;
      t = L.clamp(t, 0, info.dur);
      const tt = L.onTwos(t);
      const sd = L.hash(ID) & 0xffff;

      L.blueprint(ctx, { seed: 207, center: [960, 520], circles: 0, diagonals: 0 });

      // conectores
      for (let i = 0; i < 3; i++) {
        const a = NODES[i], b = NODES[i + 1];
        L.inkLine(ctx, a.x + R + 6, Y, b.x - R - 6, Y, { color: P.lavender, width: 3, seed: sd + 50 + i });
        L.inkPath(ctx, [[b.x - R - 22, Y - 12], [b.x - R - 6, Y], [b.x - R - 22, Y + 12]], { color: P.lavender, width: 3, smooth: false, seed: sd + 60 + i, taper: 0 });
      }
      // entrada desde la izquierda
      L.inkLine(ctx, 130, Y, NODES[0].x - R - 6, Y, { color: P.lavender, width: 3, seed: sd + 70 });
      L.text(ctx, 'llega el', 210, Y - 60, { size: 40, weight: 600, align: 'center', color: P.lavender });
      L.text(ctx, 'mensaje', 210, Y - 16, { size: 40, weight: 600, align: 'center', color: P.lavender });

      NODES.forEach((n, i) => {
        const lit = tt >= n.at;
        if (lit) L.glowDot(ctx, n.x, Y, R * 0.7, { color: P.schemGreen, rays: 0, intensity: 0.35, glow: 1.6, seed: sd + i });
        L.inkCircle(ctx, n.x, Y, R, { color: lit ? P.schemGreen : P.lavender, width: 3.4, seed: sd + 10 + i });
        L.text(ctx, String(i + 1), n.x, Y + 30, { size: 84, weight: 700, align: 'center', color: lit ? P.lineWhite : P.lavender });
        n.lines.forEach((s, j) => L.text(ctx, s, n.x, 680 + j * 46, { size: 40, weight: 600, align: 'center', color: P.lineWhite, alpha: lit ? 1 : 0.7 }));
        if (tt >= n.at && tt < n.at + 0.34) {
          const k = (tt - n.at) / 0.34;
          L.inkCircle(ctx, n.x, Y, R + 10 + 50 * E.outCubic(k), { color: P.magenta, width: 5, alpha: 1 - k, seed: sd + 20 + i });
        }
      });

      // el punto que recorre: de x 130 (t 0) a cada nodo en su beat
      const stops = [[0, 130], ...NODES.map((n) => [n.at, n.x])];
      let x = NODES[3].x;
      for (let i = 0; i + 1 < stops.length; i++) {
        const [t0, x0] = stops[i], [t1, x1] = stops[i + 1];
        if (tt < t1) {
          x = L.lerp(x0, x1, E.inOutSine(L.clamp((tt - t0) / (t1 - t0))));
          break;
        }
      }
      if (tt < 2.5) L.glowDot(ctx, x, Y, 15, { color: P.schemGreen, rays: 0, seed: sd + 40 });
      if (tt >= 2.0) {
        const k = L.clamp((tt - 2.0) / 0.5);
        L.text(ctx, 'listo ✓', 1500, 380, { size: 44, weight: 700, align: 'center', color: P.schemGreen, alpha: k });
      }

      C.caption(ctx, 'Cada pieza hace un paso, siempre igual', L.clamp(t / 0.25), { schem: true });
    },
  });
})();
