// 04 mantel : plano azul. Mesa en pie (más chica que G1): tabla (960, 560) 1000 × 50, patas x 560, 827, 1093, 1360.
// T 12.5 (t 0.5) "B · Calidad 25 puntos" a la izquierda y "A · 4 patas 60 puntos" a la derecha. T 13.0 (t 1.0) aterriza
// el mantel "C · Extras". T 14, 14.5, 15 (t 2.0, 2.5, 3.0) aparecen arriba Mensajes y alertas, Servidor propio y Tablero.
(function () {
  'use strict';
  const ID = 'mantel';
  const TOPY = 560, TH = 50, LEG0 = TOPY + TH / 2, LEG1 = 830;
  const LEGX = [560, 827, 1093, 1360];
  const ITEMS = [
    { x: 560, name: 'Mensajes y alertas', at: 2.0 },
    { x: 960, name: 'Servidor propio', at: 2.5 },
    { x: 1360, name: 'Tablero', at: 3.0 },
  ];

  FILM.scene({
    id: ID,
    draw(ctx, t, info) {
      const L = info.lib, P = L.pal, C = FILM.cast, E = L.ease;
      t = L.clamp(t, 0, info.dur);
      const tt = L.onTwos(t);
      const sd = L.hash(ID) & 0xffff;
      const SURF = TOPY - TH / 2; // cara de arriba de la tabla

      L.blueprint(ctx, { seed: 47, center: [960, 520], circles: 0, diagonals: 0 });
      L.inkPath(ctx, [[380, LEG1 + 2], [1540, LEG1 + 2]], { color: P.lavender, width: 2, alpha: 0.5, seed: sd + 1 });

      // la mesa en pie, con sus cuatro patas en verde (todas llegaron)
      LEGX.forEach((x, i) => {
        ctx.save();
        ctx.fillStyle = L.rgba(P.schemGreen, 0.4);
        ctx.fillRect(x - 21, LEG0 + 4, 42, LEG1 - LEG0 - 8);
        ctx.restore();
        C.tableLeg(ctx, { x, y0: LEG0, y1: LEG1, w: 56, schem: true, seed: sd + 10 + i });
      });
      C.tableTop(ctx, { x: 960, y: TOPY, w: 1000, h: TH, schem: true, seed: sd + 2 });

      // A y B: T 12.5
      if (tt >= 0.5) {
        const a = L.clamp((tt - 0.5) / 0.2);
        L.text(ctx, 'B · Calidad', 420, SURF + 20, { size: 48, weight: 800, align: 'right', color: P.lineWhite, alpha: a });
        L.text(ctx, '25 puntos', 420, SURF + 74, { size: 44, weight: 700, align: 'right', color: P.paleBlue, alpha: a });
        C.arrow(ctx, 426, SURF + 96, 470, TOPY + 10, { schem: true, p: L.clamp((tt - 0.6) / 0.2), head: 16, bend: 10, seed: sd + 3 });
        L.text(ctx, 'A · 4 patas', 1420, 720, { size: 48, weight: 800, color: P.lineWhite, alpha: a });
        L.text(ctx, '60 puntos', 1420, 774, { size: 44, weight: 700, color: P.schemGreen, alpha: a });
      }

      // el mantel: cae de t 0.7 a 1.0 y aterriza en T 13.0
      if (tt >= 0.7) {
        const k = L.clamp((tt - 0.7) / 0.3);
        const dy = -230 * (1 - k * k);
        const land = tt >= 1.0 && tt < 1.17 ? Math.sin(((tt - 1.0) / 0.17) * Math.PI) : 0;
        ctx.save();
        ctx.translate(0, dy);
        const m = C.mantel(ctx, { x: 960, y: SURF, w: 880, drop: 118 + 10 * land, schem: true, alpha: L.clamp(k * 2), seed: sd + 4 });
        ctx.restore();
        if (tt >= 1.0) {
          C.tag(ctx, 'C · Extras', 960, (m.y0 + m.y1) / 2 + 4, { schem: true, size: 46, pop: E.outBack(L.clamp((tt - 1.0) / 0.17)), seed: sd + 5 });
        }
      }

      // los tres extras, apoyados sobre el mantel
      const base = SURF - 8;
      ITEMS.forEach((it, i) => {
        if (tt < it.at) return;
        const pop = E.outBack(L.clamp((tt - it.at) / 0.17));
        ctx.save();
        ctx.translate(it.x, base);
        ctx.scale(pop, pop);
        if (i === 0) {
          C.phone(ctx, { x: 0, y: -80, h: 150, schem: true, seed: sd + 30 });
          // campanita de alerta
          L.inkCircle(ctx, 58, -150, 22, { color: P.magenta, width: 3, seed: sd + 31 });
          L.text(ctx, '!', 58, -138, { size: 40, weight: 900, align: 'center', color: P.magenta });
        } else if (i === 1) {
          C.server(ctx, { x: 0, y: -78, w: 120, h: 150, schem: true, seed: sd + 32 });
        } else {
          L.inkPath(ctx, L.rrectPts(-95, -150, 190, 140, 10, 16), { closed: true, color: P.lavender, width: 3, seed: sd + 33 });
          [[-60, 40], [-20, 80], [20, 60], [60, 100]].forEach(([bx, bh], j) => {
            ctx.save();
            ctx.fillStyle = L.rgba(j === 3 ? P.schemGreen : P.paleBlue, 0.8);
            ctx.fillRect(bx - 13, -24 - bh, 26, bh);
            ctx.restore();
          });
          ctx.save();
          ctx.setLineDash([8, 6]);
          ctx.strokeStyle = P.magenta;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(-85, -94);
          ctx.lineTo(85, -94);
          ctx.stroke();
          ctx.restore();
        }
        ctx.restore();
        const a = L.clamp((tt - it.at) / 0.2);
        L.text(ctx, it.name, it.x, 330, { size: 42, weight: 700, align: 'center', color: P.lineWhite, alpha: a });
      });

      // cuánto suma cada extra
      if (tt >= 2.0) {
        const a = L.clamp((tt - 2.0) / 0.25);
        L.text(ctx, 'Cada extra suma 0, 5 o 10 puntos · tope: 100', 960, 190, { size: 50, weight: 800, align: 'center', color: P.schemGreen, alpha: a });
      }

      C.caption(ctx, 'Los extras son el mantel: suman solo con la mesa en pie', L.clamp(t / 0.25), { schem: true });
    },
  });
})();
