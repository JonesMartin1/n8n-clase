// 01 fecha : el almanaque de hojas pasa 16, 17, 18 y cae en JUEVES 19 NOVIEMBRE (T 1.0); círculo rojo de fibrón
// en T 1.5; a la derecha "En la Tarea del Aula Digital UCP" (T 2.0) y "Misma fecha para todas las parejas" (T 3.0).
// Rótulo "Se entrega el jueves 19/11, antes de la clase".
(function () {
  'use strict';
  const ID = 'fecha';
  const CX = 640, CY = 470;
  const DAYS = [
    { at: 0, day: '16', weekday: 'LUNES' },
    { at: 0.5, day: '17', weekday: 'MARTES' },
    { at: 0.75, day: '18', weekday: 'MIÉRCOLES' },
    { at: 1.0, day: '19', weekday: 'JUEVES' },
  ];

  FILM.scene({
    id: ID,
    draw(ctx, t, info) {
      const L = info.lib, P = L.pal, C = FILM.cast, E = L.ease;
      t = L.clamp(t, 0, info.dur);
      const tt = L.onTwos(t);
      const sd = L.hash(ID) & 0xffff;

      L.paper(ctx, { seed: 4 });
      ctx.save();
      ctx.globalAlpha = 0.5;
      L.stripes(ctx, { colors: [P.stripeCream, P.stripeYellow], width: 150, offset: tt * 30, seed: sd });
      ctx.restore();

      // hojas de atrás (el taco del almanaque)
      for (let i = 2; i >= 1; i--) {
        L.inkPath(ctx, L.rrectPts(CX - 220 + i * 8, CY - 260 + i * 9, 440, 520, 22, 22), {
          closed: true, width: 3, fill: P.paperShade, seed: sd + 70 + i,
        });
      }

      // hoja actual
      let cur = DAYS[0], prev = null;
      for (let i = 0; i < DAYS.length; i++) if (tt >= DAYS[i].at) { cur = DAYS[i]; prev = DAYS[i - 1] || null; }
      const land = cur.day === '19' ? L.clamp((tt - 1.0) / 0.17) : 1;
      const bounce = cur.day === '19' && land < 1 ? 1 + 0.05 * Math.sin(land * Math.PI) : 1;
      C.calendar(ctx, { x: CX, y: CY, s: bounce, day: cur.day, weekday: cur.weekday, seed: sd + 1 });

      // la hoja que se arranca: cae y se va
      if (prev && tt - cur.at < 0.25) {
        const k = (tt - cur.at) / 0.25;
        ctx.save();
        ctx.globalAlpha *= 1 - k;
        ctx.translate(CX + 140 * k, CY + 40 * k + 220 * k * k);
        ctx.rotate(0.5 * k);
        C.calendar(ctx, { x: 0, y: 0, day: prev.day, weekday: prev.weekday, seed: sd + 2 });
        ctx.restore();
      }

      // círculo rojo de fibrón alrededor del 19: T 1.5 a 2.0
      if (tt >= 1.5) {
        const k = E.outCubic(L.clamp((tt - 1.5) / 0.5));
        const pts = L.ellipsePts(CX, CY + 100, 205, 128, 64, -0.06).map(([x, y], i) => [x, y + (i > 40 ? 4 : 0)]);
        pts.push([pts[0][0] + 30, pts[0][1] - 18]);
        L.inkPath(ctx, pts, { color: P.legoRed, width: 10, draw: k, seed: sd + 3, taper: [10, 16] });
      }

      // a la derecha: dónde y para quién
      const RX = 1210;
      if (tt >= 2.0) {
        const pop = E.outBack(L.clamp((tt - 2.0) / 0.17));
        ctx.save();
        ctx.translate(1080, 395);
        ctx.scale(pop, pop);
        C.laptop(ctx, { x: 0, y: 40, w: 150, seed: sd + 10, screen: P.washBlue });
        ctx.restore();
        const a = L.clamp((tt - 2.0) / 0.25);
        L.text(ctx, 'En la Tarea del', RX, 370, { size: 50, weight: 600, color: P.inkSoft, alpha: a });
        L.text(ctx, 'Aula Digital UCP', RX, 430, { size: 54, weight: 800, color: P.ink, alpha: a });
      }
      if (tt >= 3.0) {
        const pop = E.outBack(L.clamp((tt - 3.0) / 0.17));
        ctx.save();
        ctx.translate(1080, 660);
        ctx.scale(pop, pop);
        C.person(ctx, { x: -34, y: 0, s: 0.3, shirt: P.teal, seed: sd + 20 });
        C.person(ctx, { x: 34, y: 6, s: 0.3, shirt: P.ochre, hair: P.wood, seed: sd + 21 });
        ctx.restore();
        const a = L.clamp((tt - 3.0) / 0.25);
        L.text(ctx, 'Misma fecha para', RX, 630, { size: 50, weight: 600, color: P.inkSoft, alpha: a });
        L.text(ctx, 'todas las parejas', RX, 690, { size: 54, weight: 800, color: P.ink, alpha: a });
      }

      C.caption(ctx, 'Se entrega el jueves 19/11, antes de la clase', L.clamp(t / 0.25));
    },
  });
})();
