// 08 los-dos : plano azul. Una notebook al centro con Odoo y n8n en la pantalla; un integrante a cada lado.
// T 28.5 (t 0.5) opera el de la izquierda (se enciende Odoo); T 29.0 (t 1.0) opera el de la derecha (se enciende n8n);
// T 30.0 (t 2.0) flechas cruzadas: cada uno explica también la parte que operó el otro.
(function () {
  'use strict';
  const ID = 'los-dos';
  const LX = 400, RX = 1520, PY = 720;

  FILM.scene({
    id: ID,
    draw(ctx, t, info) {
      const L = info.lib, P = L.pal, C = FILM.cast, E = L.ease;
      t = L.clamp(t, 0, info.dur);
      const tt = L.onTwos(t);
      const sd = L.hash(ID) & 0xffff;

      L.blueprint(ctx, { seed: 73, center: [960, 520], circles: 0, diagonals: 0 });

      // la notebook
      const scr = C.laptop(ctx, { x: 960, y: 720, w: 500, schem: true, seed: sd + 1 });
      const mid = (scr.x0 + scr.x1) / 2;
      const halves = [
        { x: (scr.x0 + mid) / 2, name: 'Odoo', at: 0.5 },
        { x: (mid + scr.x1) / 2, name: 'n8n', at: 1.0 },
      ];
      L.inkLine(ctx, mid, scr.y0 + 14, mid, scr.y1 - 14, { color: P.lavender, width: 2, alpha: 0.6, seed: sd + 2 });
      halves.forEach((h, i) => {
        const on = tt >= h.at;
        const cy = (scr.y0 + scr.y1) / 2;
        if (on) {
          const flash = tt - h.at < 0.3 ? 1 - (tt - h.at) / 0.3 : 0;
          const hx0 = i ? mid + 10 : scr.x0 + 10, hx1 = i ? scr.x1 - 10 : mid - 10;
          ctx.save();
          ctx.fillStyle = L.rgba(P.schemGreen, 0.16 + 0.25 * flash);
          ctx.fillRect(hx0, scr.y0 + 10, hx1 - hx0, scr.y1 - scr.y0 - 20);
          ctx.restore();
          L.inkPath(ctx, L.rrectPts(hx0, scr.y0 + 10, hx1 - hx0, scr.y1 - scr.y0 - 20, 8, 16), { closed: true, color: P.schemGreen, width: 3, seed: sd + 3 + i });
        }
        L.text(ctx, h.name, h.x, cy + 16, { size: 46, weight: 800, align: 'center', color: on ? P.lineWhite : P.lavender });
      });

      // los dos integrantes
      [[LX, 'Ana', 0.5, 1], [RX, 'Juan', 1.0, -1]].forEach(([x, name, at, dir], i) => {
        const on = tt >= at;
        // brazo hacia el teclado
        if (on) {
          const k = E.outCubic(L.clamp((tt - at) / 0.2));
          const sx = x + dir * 130, sy = PY + 40;
          const ex = L.lerp(sx, 960 - dir * 150, k), ey = L.lerp(sy, 735, k);
          L.inkPath(ctx, [[sx, sy], [(sx + ex) / 2, Math.max(sy, ey) + 30], [ex, ey]], { color: P.lavender, width: 3, seed: sd + 10 + i });
          L.inkCircle(ctx, ex, ey, 16, { color: P.lavender, width: 3, seed: sd + 12 + i });
        }
        C.person(ctx, { x, y: PY, s: 0.95, schem: true, seed: sd + 20 + i });
        L.text(ctx, name, x, PY + 110, { size: 44, weight: 800, align: 'center', color: P.lineWhite });
        if (on) C.tag(ctx, 'opera', x, 395, { schem: true, size: 44, pop: E.outBack(L.clamp((tt - at) / 0.17)), seed: sd + 25 + i });
      });

      // T 30.0: cada uno explica la parte del otro
      if (tt >= 2.0) {
        const k = L.clamp((tt - 2.0) / 0.3);
        C.arrow(ctx, LX + 60, 330, halves[1].x, scr.y0 - 16, { schem: true, p: k, bend: -90, color: P.schemGreen, width: 4, head: 22, seed: sd + 30 });
        C.arrow(ctx, RX - 60, 330, halves[0].x, scr.y0 - 16, { schem: true, p: k, bend: 90, color: P.schemGreen, width: 4, head: 22, seed: sd + 31 });
        const a = L.clamp((tt - 2.0) / 0.25);
        L.text(ctx, 'cada uno explica también lo que no operó', 960, 190, { size: 52, weight: 800, align: 'center', color: P.schemGreen, alpha: a });
      }

      C.caption(ctx, 'En la demo operan los dos integrantes', L.clamp(t / 0.25), { schem: true });
    },
  });
})();
