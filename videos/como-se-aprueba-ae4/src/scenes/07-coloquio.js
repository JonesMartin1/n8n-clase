// 07 coloquio : reloj de 10 minutos. La porción verde (3 min, demo) se llena de T 24.5 a 25.5 (t 0.5–1.5); la
// amarilla (7 min, preguntas) de T 25.5 a 27.0 (t 1.5–3.0). Leyenda a la derecha: cada renglón entra con su porción.
(function () {
  'use strict';
  const ID = 'coloquio';
  const CX = 600, CY = 480, R = 300;
  const A0 = -Math.PI / 2;
  const DEMO = (3 / 10) * Math.PI * 2;

  function wedge(ctx, a0, a1, color, alpha) {
    ctx.save();
    ctx.globalAlpha *= alpha;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(CX, CY);
    ctx.arc(CX, CY, R - 14, a0, a1);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  FILM.scene({
    id: ID,
    draw(ctx, t, info) {
      const L = info.lib, P = L.pal, C = FILM.cast, E = L.ease;
      t = L.clamp(t, 0, info.dur);
      const tt = L.onTwos(t);
      const sd = L.hash(ID) & 0xffff;

      L.paper(ctx, { color: P.paperSky, seed: 15 });
      ctx.save();
      ctx.globalAlpha = 0.35;
      L.stripes(ctx, { colors: [P.stripeCream, P.stripeSky], width: 170, offset: tt * 24, seed: sd });
      ctx.restore();

      // el reloj
      L.inkCircle(ctx, CX + 12, CY + 16, R, { width: 0.1, fill: P.paperDeep, seed: sd + 1 });
      L.inkCircle(ctx, CX, CY, R, { width: 6, fill: P.white, seed: sd + 2 });

      const kDemo = E.inOutSine(L.clamp((tt - 0.5) / 1.0));
      const kPreg = E.inOutSine(L.clamp((tt - 1.5) / 1.5));
      if (kDemo > 0) wedge(ctx, A0, A0 + DEMO * kDemo, P.okGreen, 0.85);
      if (kPreg > 0) wedge(ctx, A0 + DEMO, A0 + DEMO + (Math.PI * 2 - DEMO) * kPreg, P.sun, 0.9);

      // marcas de los 10 minutos
      for (let i = 0; i < 10; i++) {
        const a = A0 + (i / 10) * Math.PI * 2;
        L.inkLine(ctx, CX + Math.cos(a) * (R - 40), CY + Math.sin(a) * (R - 40), CX + Math.cos(a) * (R - 12), CY + Math.sin(a) * (R - 12), {
          width: i === 0 || i === 3 ? 7 : 4, seed: sd + 10 + i,
        });
      }
      // separador entre demo y preguntas
      if (kDemo >= 1) {
        const a = A0 + DEMO;
        L.inkLine(ctx, CX, CY, CX + Math.cos(a) * (R - 14), CY + Math.sin(a) * (R - 14), { width: 5, seed: sd + 25 });
        L.inkLine(ctx, CX, CY, CX, CY - (R - 14), { width: 5, seed: sd + 26 });
      }

      // aguja: sigue el borde de lo que se va llenando
      const prog = tt < 1.5 ? DEMO * kDemo : DEMO + (Math.PI * 2 - DEMO) * kPreg;
      const ah = A0 + prog;
      L.inkLine(ctx, CX, CY, CX + Math.cos(ah) * (R - 60), CY + Math.sin(ah) * (R - 60), { width: 9, color: P.legoRed, seed: sd + 27, taper: [2, 8] });

      // los números en cada porción
      if (kDemo >= 1) {
        const a = A0 + DEMO / 2;
        L.text(ctx, '3', CX + Math.cos(a) * 190, CY + Math.sin(a) * 190 + 32, { size: 96, weight: 900, align: 'center', color: P.white });
      }
      if (kPreg >= 1) {
        const a = A0 + DEMO + (Math.PI * 2 - DEMO) / 2;
        L.text(ctx, '7', CX + Math.cos(a) * 190, CY + Math.sin(a) * 190 + 32, { size: 96, weight: 900, align: 'center', color: P.ink });
      }
      // centro
      L.inkCircle(ctx, CX, CY, 92, { width: 5, fill: P.white, seed: sd + 28 });
      L.text(ctx, '10', CX, CY + 8, { size: 72, weight: 900, align: 'center', color: P.ink });
      L.text(ctx, 'min', CX, CY + 52, { size: 40, weight: 700, align: 'center', color: P.inkSoft });

      // la leyenda
      const LX = 1010;
      L.text(ctx, 'Coloquio de la pareja', LX, 250, { size: 62, weight: 800, color: P.ink, p: L.clamp(t / 0.4) });
      const rows = [
        { y: 420, at: 0.5, col: P.okGreen, main: '3 min: demo en vivo', sub: 'un flujo y su efecto en Odoo' },
        { y: 620, at: 1.5, col: P.sun, main: '7 min: preguntas', sub: 'se valida por persona' },
      ];
      rows.forEach((r, i) => {
        if (tt < r.at) return;
        const pop = E.outBack(L.clamp((tt - r.at) / 0.17));
        ctx.save();
        ctx.translate(LX + 40, r.y - 18);
        ctx.scale(pop, pop);
        L.inkPath(ctx, L.rrectPts(-38, -38, 76, 76, 16, 12), { closed: true, width: 4, fill: r.col, seed: sd + 40 + i });
        ctx.restore();
        const a = L.clamp((tt - r.at) / 0.2);
        L.text(ctx, r.main, LX + 110, r.y, { size: 54, weight: 800, color: P.ink, alpha: a });
        L.text(ctx, r.sub, LX + 110, r.y + 56, { size: 40, weight: 600, color: P.inkSoft, alpha: a });
      });

      C.caption(ctx, 'Coloquio: 10 minutos, 3 de demo y 7 de preguntas', L.clamp(t / 0.25));
    },
  });
})();
