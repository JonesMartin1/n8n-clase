// 09 resumen : la tarjeta para pausar. Título y tres renglones con ícono que entran en T 32.5, 33, 33.5
// (t 0.5, 1.0, 1.5): la fecha, las 4 patas y el Coloquio. Se sostiene hasta 36 para leer y sacar una foto.
(function () {
  'use strict';
  const ID = 'resumen';
  const IX = 330, TX = 480;
  const ROWS = [
    { y: 340, at: 0.5, main: 'Jueves 19/11, antes de la clase', sub: 'en la Tarea del Aula Digital UCP' },
    { y: 535, at: 1.0, main: 'Las 4 patas, cada una con 10 de 15', sub: 'si una no llega, no se aprueba y los extras no cuentan' },
    { y: 730, at: 1.5, main: 'Coloquio: operan los dos', sub: 'y cada uno explica también lo que no operó' },
  ];

  FILM.scene({
    id: ID,
    draw(ctx, t, info) {
      const L = info.lib, P = L.pal, C = FILM.cast, E = L.ease;
      t = L.clamp(t, 0, info.dur);
      const tt = L.onTwos(t);
      const sd = L.hash(ID) & 0xffff;

      L.paper(ctx, { seed: 19 });
      ctx.save();
      ctx.globalAlpha = 0.4;
      L.stripes(ctx, { colors: [P.stripeCream, P.stripeApricot], width: 160, offset: tt * 20, seed: sd });
      ctx.restore();

      // la hoja donde va la lista
      L.inkPath(ctx, L.rrectPts(196, 236, 1540, 640, 30, 24), { closed: true, width: 0.1, fill: P.paperDeep, seed: sd + 1 });
      L.inkPath(ctx, L.rrectPts(184, 222, 1540, 640, 30, 24), { closed: true, width: 4.5, fill: P.white, seed: sd + 2 });

      L.text(ctx, 'AE4: lo que no te podés olvidar', 960, 170, { size: 72, weight: 800, align: 'center', color: P.ink, p: L.clamp(t / 0.4) });

      const icons = [
        () => C.calendar(ctx, { x: 0, y: 0, s: 0.27, bare: true, seed: sd + 10 }),
        () => {
          C.tableTop(ctx, { x: 0, y: -50, w: 210, h: 24, seed: sd + 11 });
          [['odooPlum', -85], ['orange', -30], ['annMagenta', 30], ['teal', 85]].forEach(([c, x], i) => {
            C.tableLeg(ctx, { x, y0: -38, y1: 60, w: 20, fill: P[c], seed: sd + 12 + i });
          });
        },
        () => {
          C.person(ctx, { x: -42, y: 30, s: 0.34, shirt: P.teal, seed: sd + 20 });
          C.person(ctx, { x: 42, y: 36, s: 0.34, shirt: P.ochre, hair: P.wood, seed: sd + 21 });
        },
      ];

      ROWS.forEach((r, i) => {
        if (tt < r.at) return;
        const pop = E.outBack(L.clamp((tt - r.at) / 0.17));
        ctx.save();
        ctx.translate(IX, r.y - 10);
        ctx.scale(pop, pop);
        icons[i]();
        ctx.restore();
        const a = L.clamp((tt - r.at) / 0.25);
        L.text(ctx, r.main, TX, r.y - 8, { size: 56, weight: 800, color: P.ink, alpha: a });
        L.text(ctx, r.sub, TX, r.y + 48, { size: 40, weight: 600, color: P.inkSoft, alpha: a });
        if (i < ROWS.length - 1) L.inkPath(ctx, [[TX, r.y + 92], [1640, r.y + 92]], { width: 2, color: P.paperShade, alpha: a, seed: sd + 30 + i });
      });

      C.caption(ctx, 'Pausá el video y sacale una foto', L.clamp((t - 2.0) / 0.25));
    },
  });
})();
