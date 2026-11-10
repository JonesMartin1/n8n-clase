// 08 servidor : plano azul. "Tu servidor" (x 560–1360, y 200–760) con Evolution y n8n adentro; Odoo en su nube
// afuera; el celular a la izquierda; Dokploy como control remoto; una luz que late: siempre prendida.
// Trazo de la caja en T 25.0 (t 0.5), nodos en 25.5 (t 1.0), nube y control en 26.5 (t 2.0), luz desde 27 (t 2.5).
(function () {
  'use strict';
  const ID = 'servidor';
  const BX0 = 560, BY0 = 200, BX1 = 1360, BY1 = 760;

  function cloudPts(cx, cy, w, h) {
    const pts = [];
    for (let i = 0; i < 60; i++) {
      const a = (i / 60) * Math.PI * 2;
      const r = 1 + 0.14 * Math.cos(a * 5 + 1.2);
      pts.push([cx + Math.cos(a) * (w / 2) * r, cy + Math.sin(a) * (h / 2) * r]);
    }
    return pts;
  }

  FILM.scene({
    id: ID,
    draw(ctx, t, info) {
      const L = info.lib, P = L.pal, C = FILM.cast, E = L.ease;
      t = L.clamp(t, 0, info.dur);
      const tt = L.onTwos(t);
      const sd = L.hash(ID) & 0xffff;

      L.blueprint(ctx, { seed: 209, center: [960, 480], circles: 0, diagonals: 0 });

      // la caja del servidor
      const kBox = E.inOutSine(L.clamp((tt - 0.5) / 0.5));
      if (tt < 0.5) L.inkPath(ctx, L.rrectPts(BX0, BY0, BX1 - BX0, BY1 - BY0, 28, 24), { closed: true, color: P.lavender, width: 2, alpha: 0.35, seed: sd + 1 });
      L.inkPath(ctx, L.rrectPts(BX0, BY0, BX1 - BX0, BY1 - BY0, 28, 24), { closed: true, color: P.lineWhite, width: 4, draw: Math.max(0.001, kBox), seed: sd + 1 });
      if (kBox >= 1) C.tag(ctx, 'tu servidor', 960, BY0, { schem: true, size: 46, seed: sd + 2 });

      // nodos adentro
      if (tt >= 1.0) {
        const k = E.outBack(L.clamp((tt - 1.0) / 0.2));
        [[770, 'Evolution'], [1150, 'n8n']].forEach(([x, name], i) => {
          ctx.save();
          ctx.translate(x, 470);
          ctx.scale(k, k);
          L.inkCircle(ctx, 0, 0, 120, { color: P.schemGreen, width: 3.6, seed: sd + 10 + i });
          L.text(ctx, name, 0, 15, { size: 42, weight: 700, align: 'center', color: P.lineWhite });
          ctx.restore();
        });
        if (tt >= 1.25) C.arrow(ctx, 898, 470, 1022, 470, { schem: true, p: L.clamp((tt - 1.25) / 0.25), seed: sd + 15 });
      }

      // celular afuera a la izquierda
      C.phone(ctx, { x: 290, y: 450, h: 300, schem: true, seed: 14 });
      L.text(ctx, 'el cliente', 290, 660, { size: 40, weight: 600, align: 'center', color: P.lavender });
      if (tt >= 1.25) C.arrow(ctx, 390, 450, 640, 465, { schem: true, p: L.clamp((tt - 1.25) / 0.25), seed: sd + 16 });

      // nube Odoo y control remoto: 2.0
      if (tt >= 2.0) {
        const k = L.clamp((tt - 2.0) / 0.25);
        L.inkPath(ctx, cloudPts(1640, 470, 300, 190), { closed: true, color: P.lavender, width: 3, draw: k, seed: sd + 20 });
        if (k >= 1) {
          L.text(ctx, 'Odoo', 1640, 488, { size: 50, weight: 700, align: 'center', color: P.lineWhite });
          L.text(ctx, 'en la nube', 1640, 620, { size: 40, weight: 600, align: 'center', color: P.lavender });
          C.arrow(ctx, 1260, 520, 1500, 500, { schem: true, p: L.clamp((tt - 2.25) / 0.25), bend: 30, seed: sd + 21 });
        }
        C.remote(ctx, { x: 300, y: 810, s: 0.62, schem: true, draw: k, seed: 133 });
        if (k >= 1) {
          L.text(ctx, 'Dokploy:', 380, 800, { size: 42, weight: 700, color: P.lineWhite });
          L.text(ctx, 'el control remoto', 380, 848, { size: 40, weight: 600, color: P.lavender });
          ctx.save();
          ctx.strokeStyle = P.lavender;
          ctx.lineWidth = 3;
          ctx.globalAlpha = 0.5 + 0.5 * Math.sin(tt * 8);
          for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.arc(300, 720, 30 + i * 22, -Math.PI * 0.85, -Math.PI * 0.15);
            ctx.stroke();
          }
          ctx.restore();
        }
      }

      // la luz que late: siempre prendida
      if (kBox >= 1) {
        const beat = tt >= 2.5 ? 0.5 + 0.5 * Math.cos(((tt - 2.5) / 0.5) * Math.PI * 2) : 0.6;
        L.glowDot(ctx, BX1 - 60, BY0 + 60, 12 + 6 * beat, { color: P.schemGreen, rays: 0, intensity: 0.6 + 0.4 * beat, seed: sd + 30 });
        if (tt >= 2.5) L.text(ctx, 'prendido', BX1 - 90, BY0 + 74, { size: 40, weight: 600, align: 'right', color: P.schemGreen });
      }

      C.caption(ctx, 'Todo corre en un servidor: una compu siempre prendida', L.clamp(t / 0.25), { schem: true });
    },
  });
})();
