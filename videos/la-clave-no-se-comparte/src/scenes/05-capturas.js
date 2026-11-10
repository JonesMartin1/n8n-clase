// 05 capturas : la hoja del informe con una captura del nodo Datos donde se ve la clave. t 0.5–1.5 (T 14–15) entra
// la lupa y se para sobre la clave; t 1.5 (T 15) anillo y "¡ojo!"; t 2.0 (T 15.5) el marcador la tapa;
// t 2.5 (T 16) sello "Lista para subir". Rótulo "Regla 2 · Revisá cada captura antes de subirla".
(function () {
  'use strict';
  const ID = 'capturas';
  const CAP = { x0: 600, y0: 222, x1: 1320, y1: 760 };

  FILM.scene({
    id: ID,
    draw(ctx, t, info) {
      const L = info.lib, P = L.pal, C = FILM.cast, E = L.ease;
      t = L.clamp(t, 0, info.dur);
      const tt = L.onTwos(t);
      const sd = L.hash(ID) & 0xffff;

      L.paper(ctx, { color: P.paperCream, seed: 11 });
      ctx.save();
      ctx.globalAlpha = 0.35;
      L.stripes(ctx, { colors: [P.stripeCream, P.stripeSky], width: 150, offset: tt * 20, seed: sd });
      ctx.restore();

      // la hoja del informe
      const pg = C.doc(ctx, { x: 960, y: 490, w: 880, h: 770, lines: 2, lineTop: 810, lineGap: 34, seed: 239 });
      L.text(ctx, 'Informe AE4', pg.x0 + 70, pg.y0 + 82, { size: 50, weight: 700, color: P.ink });

      // la captura
      L.inkPath(ctx, L.rectPts(CAP.x0, CAP.y0, CAP.x1 - CAP.x0, CAP.y1 - CAP.y0, 20), { closed: true, width: 3.4, fill: P.stripeSky, seed: sd + 1 });
      ctx.save();
      ctx.fillStyle = P.serverGrey;
      ctx.fillRect(CAP.x0 + 2, CAP.y0 + 2, CAP.x1 - CAP.x0 - 4, 34);
      ctx.restore();
      [P.legoRed, P.legoYellow, P.legoGreen].forEach((c, i) => L.inkCircle(ctx, CAP.x0 + 26 + i * 26, CAP.y0 + 19, 8, { width: 2, fill: c, seed: sd + 2 + i }));
      const card = C.card(ctx, { x: 960, y: 510, seed: 293 });
      const [r1, r2] = card.rows;
      L.text(ctx, 'https://…', r1.x0 + 20, r1.base, { size: 40, weight: 500, color: P.inkSoft });
      L.text(ctx, 'abc123••••', r2.x0 + 20, r2.base, { size: 40, weight: 700, color: P.ink });

      // el marcador: 2.0
      const vx0 = r2.x0 + 8, vx1 = r2.x1 - 8, vy = (r2.y0 + r2.y1) / 2;
      if (tt >= 2.0) {
        const k = E.outCubic(L.clamp((tt - 2.0) / 0.3));
        L.inkPath(ctx, [[vx0, vy], [vx1, vy]], { color: P.ink, width: 62, draw: Math.max(0.01, k), seed: sd + 5, tremble: 0.2, taper: [2, 2] });
        if (k < 1) {
          const mx = L.lerp(vx0, vx1, k);
          ctx.save();
          ctx.translate(mx, vy);
          ctx.rotate(-0.6);
          L.inkPath(ctx, L.rrectPts(10, -28, 230, 56, 14, 12), { closed: true, width: 4, fill: P.phoneCase, seed: sd + 6 });
          L.inkPath(ctx, [[10, -18], [-24, -10], [-24, 10], [10, 18]], { closed: true, width: 3.4, fill: P.ink, smooth: false, seed: sd + 7 });
          L.inkPath(ctx, L.rrectPts(190, -30, 60, 60, 12, 10), { closed: true, width: 3.4, fill: P.legoRed, seed: sd + 8 });
          ctx.restore();
        }
      }

      // la lupa: entra 0.5–1.5, se va 1.75–2.0
      const lens = [r2.x0 + 120, vy];
      let mx, my;
      if (tt < 1.9) {
        const u = E.outCubic(L.clamp((tt - 0.5) / 1.0));
        mx = L.lerp(240, lens[0], u);
        my = L.lerp(760, lens[1], u) - Math.sin(u * Math.PI) * 120;
      } else {
        const u = E.inOutCubic(L.clamp((tt - 1.9) / 0.2));
        mx = L.lerp(lens[0], 1570, u);
        my = L.lerp(lens[1], 640, u);
      }
      C.magnifier(ctx, { x: mx, y: my, r: 120, seed: 271 });

      // la encontró: 1.5
      if (tt >= 1.5) {
        const k = L.clamp((tt - 1.5) / 0.5);
        if (tt < 2.25) L.inkCircle(ctx, lens[0], lens[1], 140 + 60 * E.outExpo(k), { color: P.annMagenta, width: 5, alpha: 1 - k * 0.9, seed: sd + 10 });
        const ka = tt < 2.25 ? E.outBack(L.clamp((tt - 1.5) / 0.125)) : 1 - L.clamp((tt - 2.25) / 0.25);
        if (ka > 0) {
          ctx.save();
          ctx.translate(1610, 300);
          ctx.scale(Math.max(0.01, ka), Math.max(0.01, ka));
          L.text(ctx, '¡ojo!', 0, 20, { size: 72, weight: 800, align: 'center', color: P.annMagenta });
          ctx.restore();
          C.arrow(ctx, 1560, 340, 1340, 520, { color: P.annMagenta, width: 5, p: ka >= 1 ? 1 : ka, bend: -40, head: 24, seed: sd + 11 });
        }
      }

      // sello: 2.5
      if (tt >= 2.5) {
        const k = E.outBack(L.clamp((tt - 2.5) / 0.125));
        ctx.save();
        ctx.translate(1585, 330);
        ctx.rotate(-0.1);
        ctx.scale(k * 1.0, k * 1.0);
        L.inkPath(ctx, L.rrectPts(-210, -62, 420, 124, 22, 14), { closed: true, width: 6, color: P.okGreen, fill: P.white, seed: sd + 12 });
        L.inkPath(ctx, [[-180, -2], [-150, 28], [-100, -34]], { color: P.okGreen, width: 10, smooth: false, seed: sd + 13 });
        L.text(ctx, 'Lista', -60, -4, { size: 48, weight: 800, align: 'left', color: P.okGreen });
        L.text(ctx, 'para subir', -60, 42, { size: 40, weight: 700, align: 'left', color: P.okGreen });
        ctx.restore();
      }

      C.caption(ctx, 'Regla 2 · Revisá cada captura antes de subirla', L.clamp(t / 0.25));
    },
  });
})();
