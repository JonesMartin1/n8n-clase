// 07 tope-a4 : la nota de A4 (de 0 a 15) como una barra que sube. t 0.5–1.5 (T 20.5–21.5) sube y choca contra
// el tope rojo en 10 ("clave a la vista"); t 2.5 (T 22.5) tag "y hay que cambiarla antes del Coloquio".
// Rótulo "Una clave a la vista deja A4 en 10 como máximo".
(function () {
  'use strict';
  const ID = 'tope-a4';
  const X0 = 360, X1 = 1560, Y = 500, PX = (X1 - X0) / 15;
  const WALL = X0 + 10 * PX;

  FILM.scene({
    id: ID,
    draw(ctx, t, info) {
      const L = info.lib, P = L.pal, C = FILM.cast, E = L.ease;
      t = L.clamp(t, 0, info.dur);
      const tt = L.onTwos(t);
      const sd = L.hash(ID) & 0xffff;

      L.paper(ctx, { seed: 19 });
      ctx.save();
      ctx.globalAlpha = 0.45;
      L.stripes(ctx, { colors: [P.stripeCream, P.stripeYellow], width: 150, offset: tt * 20, seed: sd });
      ctx.restore();

      L.text(ctx, 'A4 · Protección de datos', 960, 190, { size: 64, weight: 700, align: 'center', color: P.ink });
      L.text(ctx, 'vale 15 puntos', 960, 250, { size: 42, weight: 500, align: 'center', color: P.inkSoft });

      // la pista y la parte a la que ya no se llega
      L.inkPath(ctx, L.rrectPts(X0, Y - 35, X1 - X0, 70, 30, 20), { closed: true, width: 4, fill: P.white, seed: sd + 1 });
      L.hatch(ctx, L.rectPts(WALL + 16, Y - 30, X1 - WALL - 40, 60, 20), { spacing: 10, width: 1.6, color: P.inkFaint, alpha: 0.6, seed: sd + 2, length: [20, 60] });

      // la barra
      let v;
      if (tt < 0.5) v = 0;
      else if (tt < 1.5) v = 10 * E.inOutSine(L.clamp((tt - 0.5) / 1.0));
      else {
        const a = tt - 1.5;
        v = 10 - 0.45 * Math.abs(Math.sin(a * 14)) * Math.exp(-a * 5);
      }
      const xf = X0 + v * PX;
      if (v > 0.05) L.inkPath(ctx, L.rrectPts(X0 + 6, Y - 29, Math.max(10, xf - X0 - 6), 58, 26, 16), { closed: true, width: 3, fill: P.okGreen, seed: sd + 3 });

      // marcas
      [0, 5, 10, 15].forEach((n) => {
        const x = X0 + n * PX;
        L.inkPath(ctx, [[x, Y + 44], [x, Y + 70]], { width: 4, seed: sd + 10 + n });
        L.text(ctx, String(n), x, Y + 132, { size: 52, weight: 700, align: 'center', color: n === 10 ? P.alertRed : P.inkSoft });
      });

      // el tope
      const hit = tt >= 1.5 ? L.clamp((tt - 1.5) / 0.4) : 0;
      const shake = tt >= 1.5 ? 6 * Math.sin((tt - 1.5) * 50) * Math.exp(-(tt - 1.5) * 6) : 0;
      L.inkPath(ctx, L.rrectPts(WALL - 4 + shake, Y - 100, 30, 160, 8, 14), { closed: true, width: 4, fill: P.alertRed, seed: sd + 4 });
      L.hatch(ctx, L.rectPts(WALL + 10 + shake, Y - 94, 12, 148, 14), { spacing: 6, width: 1.4, color: P.ink, alpha: 0.4, seed: sd + 5 });
      L.text(ctx, 'clave a la vista', WALL + 11, Y - 160, { size: 46, weight: 700, align: 'center', color: P.alertRed });
      C.key(ctx, { x: WALL + 260, y: Y - 176, s: 0.3, rot: -0.3, seed: 181, holeFill: P.paper });
      if (tt >= 1.5) {
        L.inkCircle(ctx, WALL + 11, Y, 80 + 120 * E.outExpo(hit), { color: P.annMagenta, width: 4, alpha: 1 - hit, seed: sd + 6 });
        for (let i = 0; i < 6; i++) {
          const a = -Math.PI / 2 + (i - 2.5) * 0.45;
          const r0 = 130 + 30 * hit, r1 = 160 + 60 * hit;
          L.inkPath(ctx, [[WALL + 11 + Math.cos(a) * r0, Y + Math.sin(a) * r0], [WALL + 11 + Math.cos(a) * r1, Y + Math.sin(a) * r1]], {
            width: 5, color: P.annYellow, alpha: 1 - hit, seed: sd + 20 + i,
          });
        }
      }

      // número que acompaña la punta
      if (v > 0.05) {
        const n = Math.round(v);
        L.text(ctx, String(n), xf - 36, Y + 14, { size: 44, weight: 800, align: 'center', color: P.white });
      }

      // aviso: 2.5
      if (tt >= 2.5) {
        C.tag(ctx, 'y hay que cambiarla antes del Coloquio', 960, 790, { size: 46, fill: P.keyPale, pop: E.outBack(L.clamp((tt - 2.5) / 0.125)), rot: -0.02, seed: sd + 7 });
      }

      C.caption(ctx, 'Una clave a la vista deja A4 en 10 como máximo', L.clamp(t / 0.25));
    },
  });
})();
