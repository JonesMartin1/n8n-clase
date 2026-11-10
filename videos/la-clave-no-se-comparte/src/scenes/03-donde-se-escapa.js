// 03 donde-se-escapa : los cuatro lugares por donde se escapa la clave, cada uno con una llavecita que asoma.
// Pops en t 0.5, 1.0, 1.5, 2.0 (T 7, 7.5, 8, 8.5); en t 2.5 (T 9) las cuatro llaves se sacuden con un anillo.
// Rótulo "Por dónde se escapa sin querer".
(function () {
  'use strict';
  const ID = 'donde-se-escapa';
  const Y = 420;
  const ITEMS = [
    { x: 300, name: 'Una captura', meta: 'del informe', at: 0.5 },
    { x: 740, name: 'El JSON', meta: 'exportado', at: 1.0 },
    { x: 1180, name: 'El Portafolio', meta: 'Digital', at: 1.5 },
    { x: 1620, name: 'Un grupo', meta: 'de WhatsApp', at: 2.0 },
  ];
  const KEY_AT = [[60, 120], [60, 120], [40, 40], [40, 60]];

  FILM.scene({
    id: ID,
    draw(ctx, t, info) {
      const L = info.lib, P = L.pal, C = FILM.cast, E = L.ease;
      t = L.clamp(t, 0, info.dur);
      const tt = L.onTwos(t);
      const sd = L.hash(ID) & 0xffff;

      L.paper(ctx, { seed: 7 });
      ctx.save();
      ctx.globalAlpha = 0.4;
      L.stripes(ctx, { colors: [P.stripeCream, P.stripeApricot], width: 160, offset: tt * 20, seed: sd });
      ctx.restore();

      const icons = [
        () => {
          const r = C.doc(ctx, { x: 0, y: 0, w: 270, h: 340, lines: 2, lineTop: -120, seed: 231 });
          L.text(ctx, 'Informe', r.x0 + 30, r.y0 + 62, { size: 40, weight: 700, color: P.ink });
          // la captura adentro
          L.inkPath(ctx, L.rectPts(-105, -40, 210, 150, 16), { closed: true, width: 3, fill: P.screen, seed: sd + 1 });
          ctx.save();
          ctx.fillStyle = P.cardHead;
          ctx.fillRect(-103, -38, 206, 30);
          ctx.restore();
          for (const yy of [20, 60]) L.inkPath(ctx, L.rrectPts(-20, yy - 14, 110, 28, 8, 10), { closed: true, width: 2.4, fill: P.white, seed: sd + 2 + yy });
        },
        () => {
          C.doc(ctx, { x: 0, y: 0, w: 270, h: 340, lines: 0, seed: 233 });
          L.text(ctx, '{ }', 0, 30, { size: 120, weight: 700, align: 'center', color: P.inkSoft });
        },
        () => {
          C.folder(ctx, { x: 0, y: 20, w: 320, h: 240, seed: 251 });
        },
        () => {
          const scr = C.phone(ctx, { x: 0, y: 0, h: 360, header: false, seed: 17 });
          ctx.save();
          ctx.fillStyle = P.chatGreen;
          ctx.fillRect(scr.x0 + 2, scr.y0 + 2, scr.x1 - scr.x0 - 4, 44);
          ctx.restore();
          [[-34, 0], [-10, 0], [14, 0]].forEach(([dx], i) => L.inkCircle(ctx, scr.x0 + 40 + i * 26, scr.y0 + 24, 12, { width: 2, fill: [P.legoYellow, P.legoBlue, P.rose][i], seed: sd + 30 + i }));
          [[scr.x0 + 14, -70, 110], [scr.x1 - 14 - 120, -20, 120], [scr.x0 + 14, 30, 100]].forEach(([bx, by, bw], i) => {
            L.inkPath(ctx, L.rrectPts(bx, by, bw, 36, 10, 10), { closed: true, width: 2.4, fill: i === 1 ? P.bubbleOut : P.white, seed: sd + 40 + i });
          });
        },
      ];

      ITEMS.forEach((it, i) => {
        if (tt < it.at) return;
        const pop = E.outBack(L.clamp((tt - it.at) / 0.125));
        ctx.save();
        ctx.translate(it.x, Y);
        ctx.scale(pop, pop);
        icons[i]();
        // la llavecita
        const [kx, ky] = KEY_AT[i];
        let rot = -0.45;
        if (tt >= 2.5) {
          const a = tt - 2.5;
          rot += 0.3 * Math.sin(a * 40) * Math.exp(-a * 2.5);
        }
        C.key(ctx, { x: kx, y: ky, s: 0.3, rot, seed: 175 + i, holeFill: P.white });
        ctx.restore();
        if (tt >= 2.5) {
          const k = L.clamp((tt - 2.5) / 0.5);
          L.inkCircle(ctx, it.x + kx, Y + ky, 70 + 60 * E.outExpo(k), { color: P.annMagenta, width: 4, alpha: 1 - k * 0.85, seed: sd + 50 + i });
        }
        const k = L.clamp((tt - it.at) / 0.25);
        L.text(ctx, it.name, it.x, 700, { size: 50, weight: 700, align: 'center', color: P.ink, alpha: k });
        L.text(ctx, it.meta, it.x, 756, { size: 42, weight: 500, align: 'center', color: P.inkSoft, alpha: k });
      });

      C.caption(ctx, 'Por dónde se escapa sin querer', L.clamp(t / 0.25));
    },
  });
})();
