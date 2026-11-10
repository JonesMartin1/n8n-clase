// 03 se-cae : la mesa de colores (G1) con la pata A3 corta. T 9.0 (t 0.5) chapita roja "7 de 15"; T 9.5 (t 1.0)
// tambalea; T 10.0 (t 1.5) se cae con polvo; T 10.5 (t 2.0) sello "NO APRUEBA · nota máxima 5 · los extras no cuentan".
(function () {
  'use strict';
  const ID = 'se-cae';
  const FLOOR = 740, Y0 = 328, LW = 70;
  const LEGS = [
    { x: 480, code: 'A1', name: 'Odoo', val: '12', col: 'odooPlum', dir: -1 },
    { x: 800, code: 'A2', name: 'Bizagi', val: '13', col: 'orange', dir: -1 },
    { x: 1120, code: 'A3', name: 'n8n o Make', val: '7', col: 'annMagenta', dir: 1, short: 150 },
    { x: 1440, code: 'A4', name: 'Proteger datos', val: '12', col: 'teal', dir: 1 },
  ];

  FILM.scene({
    id: ID,
    draw(ctx, t, info) {
      const L = info.lib, P = L.pal, C = FILM.cast, E = L.ease;
      t = L.clamp(t, 0, info.dur);
      const tt = L.onTwos(t);
      const sd = L.hash(ID) & 0xffff;

      L.paper(ctx, { color: P.paperCream, seed: 8 });
      // piso con sombra rayada
      L.hatch(ctx, L.rectPts(220, FLOOR, 1480, 26, 24), { spacing: 9, width: 1.6, color: P.inkFaint, alpha: 0.6, seed: sd + 1, length: [20, 60] });
      L.inkPath(ctx, [[200, FLOOR], [1720, FLOOR]], { color: P.ink, width: 4, seed: sd + 2 });

      // tambaleo 1.0–1.5 y caída 1.5–1.85
      const wob = tt >= 1.0 && tt < 1.5 ? Math.sin((tt - 1.0) * 6 * Math.PI) * 0.03 * ((tt - 1.0) / 0.5 + 0.3) : 0;
      const f = E.outBounce(L.clamp((tt - 1.5) / 0.4));
      const fallen = tt >= 1.5;

      ctx.save();
      // el tambaleo gira toda la mesa alrededor del pie de A2
      ctx.translate(800, FLOOR);
      ctx.rotate(wob);
      ctx.translate(-800, -FLOOR);

      LEGS.forEach((g, i) => {
        const y1 = FLOOR - (g.short || 0);
        ctx.save();
        if (fallen) {
          // cada pata cae hacia afuera girando sobre su pie
          const ang = g.dir * 1.5 * f;
          ctx.translate(g.x, FLOOR - (g.short ? (1 - f) * g.short : 0));
          ctx.rotate(ang);
          ctx.translate(-g.x, -FLOOR);
        }
        const yy0 = fallen && g.short ? Y0 + g.short : Y0;
        const yy1 = fallen && g.short ? FLOOR : y1;
        C.tableLeg(ctx, { x: g.x, y0: yy0, y1: yy1, w: LW, fill: P[g.col], seed: sd + 10 + i });
        ctx.restore();
      });

      // la tabla: cae sobre las patas
      const topY = L.lerp(300, FLOOR - 40, f);
      ctx.save();
      ctx.translate(960, topY);
      ctx.rotate(0.07 * f);
      C.tableTop(ctx, { x: 0, y: 0, w: 1240, seed: sd + 3 });
      ctx.restore();
      ctx.restore();

      // chapitas con el puntaje: fuera de la rotación, para que siempre se lean derechas
      LEGS.forEach((g, i) => {
        const bad = !!g.short;
        if (bad) {
          if (tt < 0.5) return;
          const pop = E.outBack(L.clamp((tt - 0.5) / 0.17));
          const y = fallen ? L.lerp((Y0 + FLOOR - g.short) / 2, 620, f) : (Y0 + FLOOR - g.short) / 2;
          C.tag(ctx, '7 de 15', g.x, y, { size: 48, pop, fill: P.legoRed, color: P.white, seed: sd + 20 + i, rot: -0.06 });
        } else {
          const a = fallen ? 1 - L.clamp((tt - 1.5) / 0.12) : 1;
          if (a <= 0) return;
          ctx.save();
          ctx.globalAlpha *= a;
          C.tag(ctx, g.val, g.x, (Y0 + FLOOR) / 2, { size: 40, fill: P.white, color: P.ink, seed: sd + 20 + i });
          ctx.restore();
        }
      });

      // hueco debajo de la pata corta, antes de caer
      if (!fallen && tt >= 0.5) {
        const a = L.clamp((tt - 0.5) / 0.25);
        ctx.save();
        ctx.globalAlpha *= a;
        ctx.setLineDash([8, 8]);
        ctx.strokeStyle = P.legoRed;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(1120, FLOOR - 140);
        ctx.lineTo(1120, FLOOR - 10);
        ctx.stroke();
        ctx.restore();
        L.text(ctx, 'no llega', 1170, FLOOR - 52, { size: 40, weight: 700, color: P.legoRed, alpha: a });
      }

      // polvo y líneas al chocar
      if (tt >= 1.75 && tt < 2.6) {
        const k = L.clamp((tt - 1.75) / 0.85);
        for (const [x, s] of [[420, -1], [760, -1], [1180, 1], [1520, 1]]) {
          FILM.props.dust(ctx, x, FLOOR - 6, { draw: 1, r: 20 + 18 * k, spread: 40 + 40 * k, seed: sd + 40 + x });
          FILM.props.speedLines(ctx, { x: x + s * 90, y: FLOOR - 60, n: 3, len: 40 + 30 * k, gap: 18, dir: s, seed: sd + 50 + x, alpha: 1 - k });
        }
      }

      // nombres de las patas (quedan fijos)
      LEGS.forEach((g) => {
        const bad = !!g.short;
        L.text(ctx, g.code, g.x, 806, { size: 46, weight: 800, align: 'center', color: bad ? P.legoRed : P.ink });
        L.text(ctx, g.name, g.x, 856, { size: 40, weight: 600, align: 'center', color: bad ? P.legoRed : P.inkSoft });
      });

      // el sello
      if (tt >= 2.0) {
        const k = E.outCubic(L.clamp((tt - 2.0) / 0.17));
        const s = L.lerp(1.6, 1, k);
        ctx.save();
        ctx.translate(960, 330);
        ctx.rotate(-0.07);
        ctx.scale(s, s);
        ctx.globalAlpha *= L.clamp(k * 2);
        const box = L.rrectPts(-450, -105, 900, 210, 26, 20);
        L.inkPath(ctx, box, { closed: true, color: P.legoRed, width: 9, fill: L.rgba(P.white, 0.9), seed: sd + 60 });
        L.inkPath(ctx, L.rrectPts(-432, -88, 864, 176, 18, 20), { closed: true, color: P.legoRed, width: 3, seed: sd + 61 });
        L.text(ctx, 'NO APRUEBA', 0, 6, { size: 92, weight: 900, align: 'center', color: P.legoRed, tracking: 4 });
        L.text(ctx, 'nota máxima 5 · los extras no cuentan', 0, 62, { size: 40, weight: 700, align: 'center', color: P.legoRed });
        ctx.restore();
      }

      C.caption(ctx, 'Si una sola pata no llega, la mesa se cae', L.clamp(t / 0.25));
    },
  });
})();
