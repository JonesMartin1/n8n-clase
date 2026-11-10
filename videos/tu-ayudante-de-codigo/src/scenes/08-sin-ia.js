// 08 sin-ia : plano azul. Lo que NO se hace con IA en AE4: el informe, la Bitácora y las respuestas del Coloquio.
// Sellos magenta "sin IA" en t 0.5, 1.0, 1.5 (T 28.5, 29, 29.5); t 2.0 tag "ni para que «mejore» tu texto".
// Rótulo "El informe, la Bitácora y el Coloquio: sin IA".
(function () {
  'use strict';
  const ID = 'sin-ia';
  const Y = 410;
  const ITEMS = [
    { x: 480, name: 'El informe', at: 0.5 },
    { x: 960, name: 'La Bitácora', at: 1.0 },
    { x: 1440, name: 'El Coloquio', at: 1.5 },
  ];
  const TIP = 'ni para que «mejore» tu texto';
  const CAPTION = 'El informe, la Bitácora y el Coloquio: sin IA';

  FILM.scene({
    id: ID,
    draw(ctx, t, info) {
      const L = info.lib, P = L.pal, C = FILM.cast, E = L.ease;
      t = L.clamp(t, 0, info.dur);
      const tt = L.onTwos(t);
      const sd = L.hash(ID) & 0xffff;

      L.blueprint(ctx, { seed: 233, center: [960, 420], circles: 0, diagonals: 0 });

      const icons = [
        () => {
          const r = C.doc(ctx, { x: 0, y: 0, w: 260, h: 320, lines: 5, lineTop: -50, schem: true, seed: 245 });
          L.text(ctx, 'AE4', r.x0 + 30, r.y0 + 66, { size: 44, weight: 800, color: P.lineWhite });
        },
        () => {
          C.notebook(ctx, { x: 0, y: 0, w: 320, h: 300, schem: true, seed: 107 });
        },
        () => {
          L.inkPath(ctx, L.rrectPts(-140, -110, 280, 180, 34, 16), { closed: true, color: P.lavender, width: 3, seed: sd + 1 });
          L.inkPath(ctx, [[-60, 68], [-96, 130], [-10, 70]], { color: P.lavender, width: 3, smooth: false, seed: sd + 2 });
          L.text(ctx, '¿?', 0, -38, { size: 66, weight: 800, align: 'center', color: P.lineWhite });
        },
      ];

      ITEMS.forEach((it, i) => {
        L.guideCircle(ctx, it.x, Y, 200, { alpha: 0.12, width: 1.5 });
        ctx.save();
        ctx.translate(it.x, Y);
        icons[i]();
        ctx.restore();
        L.text(ctx, it.name, it.x, 680, { size: 50, weight: 700, align: 'center', color: P.lineWhite });
        if (tt >= it.at) {
          const k = E.outCubic(L.clamp((tt - it.at) / 0.12));
          C.stamp(ctx, 'sin IA', it.x, Y + 20, { size: 58, color: P.magenta, pop: k, rot: -0.14 + i * 0.07, seed: sd + 10 + i });
          if (k >= 1) {
            const r = L.clamp((tt - it.at - 0.12) / 0.4);
            L.inkCircle(ctx, it.x, Y + 20, 150 + 70 * E.outExpo(r), { color: P.magenta, width: 3, alpha: 1 - r, seed: sd + 20 + i });
          }
        }
      });

      if (tt >= 2.0) {
        C.tag(ctx, TIP, 960, 820, { schem: true, size: 46, pop: E.outBack(L.clamp((tt - 2.0) / 0.125)), seed: sd + 30 });
      }

      C.caption(ctx, CAPTION, L.clamp(t / 0.25), { schem: true });
    },
  });
})();
