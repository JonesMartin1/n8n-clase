// 02 patas : plano azul de la mesa (G1). La tabla se traza en T 4.0; las patas en T 4.5, 5, 5.5, 6 (t 0.5..2.0)
// con A1 Odoo, A2 Bizagi, A3 n8n o Make, A4 Proteger datos. En T 6.5 (t 2.5) la línea "mínimo 10" y las patas
// se llenan como termómetros hasta 12, 13, 11 y 12 (de 15); en T 7.5 (t 3.5) tildan las cuatro.
(function () {
  'use strict';
  const ID = 'patas';
  // G1: tabla centrada en (960, 300), 1120 × 56; patas en x 480, 800, 1120, 1440, de y 328 a 740.
  const LEGS = [
    { x: 480, code: 'A1', name: 'Odoo', val: 12, at: 0.5 },
    { x: 800, code: 'A2', name: 'Bizagi', val: 13, at: 1.0 },
    { x: 1120, code: 'A3', name: 'n8n o Make', val: 11, at: 1.5 },
    { x: 1440, code: 'A4', name: 'Proteger datos', val: 12, at: 2.0 },
  ];
  const Y0 = 328, Y1 = 740, LW = 70;
  const yOf = (v) => Y1 - ((Y1 - Y0) * v) / 15;

  FILM.scene({
    id: ID,
    draw(ctx, t, info) {
      const L = info.lib, P = L.pal, C = FILM.cast, E = L.ease;
      t = L.clamp(t, 0, info.dur);
      const tt = L.onTwos(t);
      const sd = L.hash(ID) & 0xffff;

      L.blueprint(ctx, { seed: 31, center: [960, 520], circles: 0, diagonals: 0 });

      // la tabla
      C.tableTop(ctx, { x: 960, y: 300, w: 1120, schem: true, draw: Math.max(0.001, E.inOutSine(L.clamp(tt / 0.4))), seed: sd + 1 });
      // el piso
      L.inkPath(ctx, [[300, Y1 + 2], [1620, Y1 + 2]], { color: P.lavender, width: 2, alpha: 0.5, seed: sd + 2 });

      // escala a la izquierda
      const fill = E.inOutCubic(L.clamp((tt - 2.5) / 1.0));
      if (tt >= 2.0) {
        const a = L.clamp((tt - 2.0) / 0.25);
        for (const [v, s] of [[15, '15'], [10, '10'], [0, '0']]) {
          L.text(ctx, s, 392, yOf(v) + 14, { size: 40, weight: 700, align: 'right', color: v === 10 ? P.magenta : P.lavender, alpha: a });
          L.inkPath(ctx, [[402, yOf(v)], [432, yOf(v)]], { color: P.lavender, width: 2.4, alpha: a, smooth: false, seed: sd + 3 + v });
        }
      }

      LEGS.forEach((g, i) => {
        if (tt < g.at) return;
        const k = L.clamp((tt - g.at) / 0.25);
        // el termómetro: se llena desde abajo
        if (fill > 0) {
          const top = L.lerp(Y1, yOf(g.val), fill);
          ctx.save();
          ctx.fillStyle = L.rgba(P.schemGreen, 0.55);
          ctx.fillRect(g.x - LW / 2 + 7, top, LW - 14, Y1 - top - 4);
          ctx.restore();
          if (fill >= 1) L.text(ctx, String(g.val), g.x, top - 12, { size: 40, weight: 800, align: 'center', color: P.lineWhite });
        }
        C.tableLeg(ctx, { x: g.x, y0: Y0, y1: Y1, w: LW, schem: true, draw: Math.max(0.001, k), seed: sd + 10 + i });
        if (k >= 1) {
          L.glowDot(ctx, g.x, Y0 + 4, 8, { color: P.schemGreen, rays: 0, intensity: tt - g.at < 0.4 ? 1 : 0.4, seed: sd + 20 + i });
        }
        const a = L.clamp((tt - g.at) / 0.17);
        const ok = tt >= 3.5;
        L.text(ctx, g.code, ok ? g.x - 22 : g.x, 806, { size: 46, weight: 800, align: 'center', color: ok ? P.schemGreen : P.lavender, alpha: a });
        if (ok) {
          const kk = E.outCubic(L.clamp((tt - 3.5) / 0.17));
          const cx = g.x + 32, cy = 790;
          L.inkPath(ctx, [[cx - 16, cy], [cx - 4, cy + 14], [cx + 22, cy - 20]], { color: P.schemGreen, width: 6, draw: kk, smooth: false, seed: sd + 30 + i, taper: [3, 6] });
        }
        L.text(ctx, g.name, g.x, 856, { size: 40, weight: 600, align: 'center', color: P.lineWhite, alpha: a });
      });

      // línea del mínimo: T 6.5
      if (tt >= 2.5) {
        const k = L.clamp((tt - 2.5) / 0.25);
        const y = yOf(10);
        ctx.save();
        ctx.setLineDash([18, 12]);
        ctx.strokeStyle = P.magenta;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(440, y);
        ctx.lineTo(L.lerp(440, 1500, k), y);
        ctx.stroke();
        ctx.restore();
        if (k >= 1) {
          L.text(ctx, 'mínimo', 1520, y - 14, { size: 44, weight: 800, color: P.magenta });
          L.text(ctx, '10 de 15', 1520, y + 36, { size: 44, weight: 800, color: P.magenta });
        }
      }

      C.caption(ctx, '4 patas obligatorias: cada una tiene que llegar a 10 de 15', L.clamp(t / 0.25), { schem: true });
    },
  });
})();
