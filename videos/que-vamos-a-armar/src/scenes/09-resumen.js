// 09 resumen : el mapa completo (G3). Título arriba; cuatro íconos con flechas y, debajo, el nombre y la metáfora.
// Pops en T 28.5, 29, 29.5, 30 (t 0.5, 1.0, 1.5, 2.0); se sostiene hasta 32 para leer.
(function () {
  'use strict';
  const ID = 'resumen';
  const Y = 500;
  const ITEMS = [
    { x: 300, name: 'WhatsApp', meta: 'el cliente', at: 0.5, right: 390 },
    { x: 740, name: 'Evolution', meta: 'el celular virtual', at: 1.0, left: 625, right: 855 },
    { x: 1180, name: 'n8n', meta: 'la caja de LEGO', at: 1.5, left: 1090, right: 1270 },
    { x: 1620, name: 'Odoo', meta: 'el cuaderno', at: 2.0, left: 1450 },
  ];

  FILM.scene({
    id: ID,
    draw(ctx, t, info) {
      const L = info.lib, P = L.pal, C = FILM.cast, E = L.ease;
      t = L.clamp(t, 0, info.dur);
      const tt = L.onTwos(t);
      const sd = L.hash(ID) & 0xffff;

      L.paper(ctx, { seed: 17 });
      ctx.save();
      ctx.globalAlpha = 0.4;
      L.stripes(ctx, { colors: [P.stripeCream, P.stripeApricot], width: 160, offset: tt * 20, seed: sd });
      ctx.restore();

      L.text(ctx, 'Esto es lo que vamos a armar', 960, 200, { size: 76, weight: 700, align: 'center', color: P.ink, p: L.clamp(t / 0.4) });

      const icon = [
        (s) => {
          C.phone(ctx, { x: 0, y: 0, h: 315, seed: 11, title: 'Doña Rosa' });
          C.bubble(ctx, { side: 'right', x: 70, y: -70, w: 110, lines: ['Hola!'], size: 24, seed: sd + 1 });
        },
        () => {
          const srv = C.server(ctx, { x: 0, y: 0, w: 230, h: 290, window: true, seed: 63 });
          const w = srv.win;
          C.phone(ctx, { x: (w.x0 + w.x1) / 2, y: (w.y0 + w.y1) / 2, h: 135, screenColor: P.evoBlue, header: false, seed: 13 });
        },
        () => {
          C.brick(ctx, { x: 0, y: 70, w: 170, h: 70, color: P.legoBlue, seed: sd + 10 });
          C.brick(ctx, { x: -14, y: -10, w: 170, h: 70, color: P.legoYellow, seed: sd + 11 });
          C.brick(ctx, { x: 10, y: -90, w: 170, h: 70, color: P.legoRed, seed: sd + 12 });
        },
        () => {
          C.notebook(ctx, { x: 0, y: 0, w: 300, h: 220, seed: 101 });
        },
      ];

      ITEMS.forEach((it, i) => {
        if (tt < it.at) return;
        const pop = E.outBack(L.clamp((tt - it.at) / 0.17));
        ctx.save();
        ctx.translate(it.x, Y);
        ctx.scale(pop, pop);
        icon[i]();
        ctx.restore();
        const k = L.clamp((tt - it.at) / 0.25);
        L.text(ctx, it.name, it.x, 770, { size: 52, weight: 700, align: 'center', color: P.ink, alpha: k });
        L.text(ctx, it.meta, it.x, 828, { size: 40, weight: 500, align: 'center', color: P.inkSoft, alpha: k });
        if (i > 0) {
          const prev = ITEMS[i - 1];
          C.arrow(ctx, prev.right + 12, Y, it.left - 12, Y, { p: L.clamp((tt - it.at + 0.17) / 0.25), width: 5, head: 22, seed: sd + 20 + i });
        }
      });
    },
  });
})();
