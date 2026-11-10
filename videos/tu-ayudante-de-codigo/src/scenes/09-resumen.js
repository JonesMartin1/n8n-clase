// 09 resumen : las cuatro ideas en una pantalla, para pausar. Título arriba; grilla 2×2 de tarjetas con número,
// ícono, idea y detalle. Pops en T 31.5, 32, 32.5, 33 (t 0.5, 1.0, 1.5, 2.0); se sostiene hasta 36.
// Rótulo "Tu ayudante, sí. Tu clave, nunca.".
(function () {
  'use strict';
  const ID = 'resumen';
  const CW = 820, CH = 210;
  const COLS = [110, 990];
  const ROWS = [380, 650];
  const ITEMS = [
    { name: 'Codex, hoy', meta: 'y pedí ya Copilot Student', at: 0.5 },
    { name: 'Nunca una clave', meta: 'siempre PEGAR_ACA', at: 1.0 },
    { name: 'No le creas', meta: 'probalo en tu n8n y tu Odoo', at: 1.5 },
    { name: 'Explicalo vos', meta: 'informe y Bitácora: sin IA', at: 2.0 },
  ];
  const TITLE = 'Tu ayudante de código, en 4 ideas';
  const CAPTION = 'Tu ayudante, sí. Tu clave, nunca.';

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
      L.stripes(ctx, { colors: [P.stripeCream, P.stripeSky], width: 160, offset: tt * 20, seed: sd });
      ctx.restore();

      L.text(ctx, TITLE, 960, 190, { size: 72, weight: 700, align: 'center', color: P.ink, p: L.clamp(t / 0.4) });

      const icons = [
        () => C.laptop(ctx, { x: 0, y: -10, w: 170, h: 112, shadow: false, seed: 343 }),
        () => {
          C.key(ctx, { x: 10, y: 0, s: 0.3, seed: 185, holeFill: P.white });
          L.inkPath(ctx, [[-60, -55], [60, 55]], { width: 12, color: P.alertRed, seed: sd + 1 });
          L.inkPath(ctx, [[60, -55], [-60, 55]], { width: 12, color: P.alertRed, seed: sd + 2 });
        },
        () => {
          C.magnifier(ctx, { x: -14, y: -14, r: 52, seed: 275 });
          L.inkPath(ctx, [[-40, -14], [-20, 8], [16, -34]], { width: 9, color: P.okGreen, smooth: false, seed: sd + 3 });
        },
        () => C.person(ctx, { x: 0, y: -10, s: 0.5, fill: P.teal, seed: 319 }),
      ];

      ITEMS.forEach((it, i) => {
        if (tt < it.at) return;
        const x0 = COLS[i % 2], cy = ROWS[Math.floor(i / 2)];
        const pop = E.outBack(L.clamp((tt - it.at) / 0.125));
        ctx.save();
        ctx.translate(x0 + CW / 2, cy);
        ctx.scale(pop, pop);
        ctx.translate(-(x0 + CW / 2), -cy);
        L.inkPath(ctx, L.rrectPts(x0, cy - CH / 2, CW, CH, 26, 20), { closed: true, width: 4, fill: P.white, seed: sd + 10 + i });
        ctx.save();
        ctx.translate(x0 + 140, cy);
        icons[i]();
        ctx.restore();
        L.inkCircle(ctx, x0 + 18, cy - CH / 2 + 18, 36, { width: 4, fill: P.cardHead, seed: sd + 20 + i });
        L.text(ctx, String(i + 1), x0 + 18, cy - CH / 2 + 34, { size: 44, weight: 800, align: 'center', color: P.white });
        ctx.restore();
        const k = L.clamp((tt - it.at) / 0.25);
        L.text(ctx, it.name, x0 + 270, cy - 8, { size: 52, weight: 800, color: P.ink, alpha: k });
        L.text(ctx, it.meta, x0 + 270, cy + 52, { size: 40, weight: 600, color: P.inkSoft, alpha: k });
      });

      C.caption(ctx, CAPTION, L.clamp(t / 0.25));
    },
  });
})();
