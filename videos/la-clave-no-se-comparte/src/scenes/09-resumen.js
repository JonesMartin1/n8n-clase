// 09 resumen : las cuatro reglas en una pantalla, para pausar. Título arriba; cuatro íconos numerados con nombre y
// detalle. Pops en T 28.5, 29, 29.5, 30 (t 0.5, 1.0, 1.5, 2.0); se sostiene hasta 32.
// Rótulo "La clave no se comparte".
(function () {
  'use strict';
  const ID = 'resumen';
  const Y = 470;
  const ITEMS = [
    { x: 300, name: 'PEGAR_ACA', meta: 'antes de exportar', at: 0.5 },
    { x: 740, name: 'Revisá', meta: 'cada captura', at: 1.0 },
    { x: 1180, name: '¿Se filtró?', meta: 'cambiala', at: 1.5 },
    { x: 1620, name: 'En Odoo', meta: 'datos ficticios', at: 2.0 },
  ];

  FILM.scene({
    id: ID,
    draw(ctx, t, info) {
      const L = info.lib, P = L.pal, C = FILM.cast, E = L.ease;
      t = L.clamp(t, 0, info.dur);
      const tt = L.onTwos(t);
      const sd = L.hash(ID) & 0xffff;

      L.paper(ctx, { seed: 23 });
      ctx.save();
      ctx.globalAlpha = 0.4;
      L.stripes(ctx, { colors: [P.stripeCream, P.stripeSpring], width: 160, offset: tt * 20, seed: sd });
      ctx.restore();

      L.text(ctx, '4 reglas para no olvidar', 960, 190, { size: 76, weight: 700, align: 'center', color: P.ink, p: L.clamp(t / 0.4) });

      const tick = (x, y, s) => L.inkPath(ctx, [[x - 50 * s, y], [x - 14 * s, y + 40 * s], [x + 60 * s, y - 60 * s]], { color: P.okGreen, width: 14 * s, smooth: false, seed: sd + 9, taper: [6, 10] });
      const icons = [
        () => {
          C.doc(ctx, { x: 0, y: 0, w: 240, h: 300, lines: 5, lineTop: -70, seed: 241 });
          tick(60, 90, 1);
        },
        () => {
          const r = C.doc(ctx, { x: -20, y: 10, w: 240, h: 280, lines: 0, seed: 243 });
          L.inkPath(ctx, L.rectPts(r.x0 + 24, r.y0 + 60, 190, 120, 16), { closed: true, width: 3, fill: P.stripeSky, seed: sd + 2 });
          L.inkPath(ctx, [[r.x0 + 50, r.y0 + 140], [r.x0 + 180, r.y0 + 140]], { color: P.ink, width: 30, seed: sd + 3 });
          C.magnifier(ctx, { x: 40, y: -20, r: 80, seed: 273 });
        },
        () => {
          C.padlock(ctx, { x: -10, y: -30, s: 0.95, color: P.okGreen, seed: 199 });
          C.key(ctx, { x: 70, y: 150, s: 0.32, rot: -0.3, seed: 183, holeFill: P.paper });
        },
        () => {
          C.notebook(ctx, { x: 0, y: 0, w: 300, h: 220, seed: 105 });
          tick(110, 60, 0.9);
        },
      ];

      ITEMS.forEach((it, i) => {
        if (tt < it.at) return;
        const pop = E.outBack(L.clamp((tt - it.at) / 0.125));
        ctx.save();
        ctx.translate(it.x, Y);
        ctx.scale(pop, pop);
        icons[i]();
        ctx.restore();
        // número
        const bx = it.x - 150, by = Y - 150;
        ctx.save();
        ctx.translate(bx, by);
        ctx.scale(pop, pop);
        L.inkCircle(ctx, 0, 0, 38, { width: 4, fill: P.cardHead, seed: sd + 40 + i });
        L.text(ctx, String(i + 1), 0, 16, { size: 46, weight: 800, align: 'center', color: P.white });
        ctx.restore();
        const k = L.clamp((tt - it.at) / 0.25);
        L.text(ctx, it.name, it.x, 745, { size: 52, weight: 700, align: 'center', color: P.ink, alpha: k });
        L.text(ctx, it.meta, it.x, 802, { size: 42, weight: 500, align: 'center', color: P.inkSoft, alpha: k });
      });

      C.caption(ctx, 'La clave no se comparte', L.clamp(t / 0.25));
    },
  });
})();
