// 07 taximetro : el taxímetro del crédito de regalo. Arranca en USD 100 y baja un mes por beat:
// 79 (T 22.0, t 1.0), 58 (t 1.5), 37 (t 2.0), 16 (t 2.5); en T 24.0 (t 3.0) llega a 0 y "¡se terminó!".
// Datos de guia-docente.md: ≈ USD 21 por mes, los USD 100 iniciales alcanzan ≈ 4 meses.
(function () {
  'use strict';
  const ID = 'taximetro';
  const MX0 = 560, MY0 = 220, MX1 = 1360, MY1 = 720;
  const MONO = 'Consolas, "Courier New", monospace';
  const STEPS = [
    { at: 0, v: 100, mes: 'hoy' },
    { at: 1.0, v: 79, mes: 'mes 1' },
    { at: 1.5, v: 58, mes: 'mes 2' },
    { at: 2.0, v: 37, mes: 'mes 3' },
    { at: 2.5, v: 16, mes: 'mes 4' },
    { at: 3.0, v: 0, mes: 'mes 5' },
  ];

  FILM.scene({
    id: ID,
    draw(ctx, t, info) {
      const L = info.lib, P = L.pal, C = FILM.cast, E = L.ease;
      t = L.clamp(t, 0, info.dur);
      const tt = L.onTwos(t);
      const sd = L.hash(ID) & 0xffff;

      L.paper(ctx, { seed: 21 });
      ctx.save();
      ctx.globalAlpha = 0.45;
      L.stripes(ctx, { colors: [P.stripeCream, P.stripeApricot], width: 140, angle: -0.52, offset: tt * 12, seed: sd });
      ctx.restore();

      let cur = STEPS[0];
      for (const s of STEPS) if (t >= s.at) cur = s;
      const end = cur.v === 0;
      const since = t - cur.at;
      const shake = cur.at > 0 && since < 0.17 ? Math.sin(since * 70) * 5 * (1 - since / 0.17) : 0;

      // sombra y cuerpo del taxímetro
      ctx.save();
      ctx.globalAlpha *= 0.2;
      ctx.fillStyle = P.ink;
      ctx.beginPath();
      ctx.ellipse(975, MY1 + 22, 430, 18, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      ctx.save();
      ctx.translate(shake, 0);
      // el cartelito "TAXI" arriba
      L.inkPath(ctx, L.rrectPts(850, 140, 220, 84, 18, 16), { closed: true, width: 4, fill: P.legoYellow, seed: sd + 9 });
      L.text(ctx, 'TAXI', 960, 199, { size: 50, weight: 800, align: 'center', color: P.ink, tracking: 4 });
      L.inkPath(ctx, L.rrectPts(MX0, MY0, MX1 - MX0, MY1 - MY0, 36, 24), { closed: true, width: 5, fill: P.meterBody, seed: sd + 1 });
      // franja a cuadros de taxi
      for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 2; j++) {
          if ((i + j) % 2) continue;
          ctx.save();
          ctx.fillStyle = P.legoYellow;
          ctx.fillRect(MX0 + 40 + i * 36, MY1 - 34 + j * 14, 36, 14);
          ctx.restore();
        }
      }
      L.hatch(ctx, L.rrectPts(MX1 - 90, MY0 + 30, 70, MY1 - MY0 - 60, 20, 20), { spacing: 7, width: 1.4, color: P.white, alpha: 0.18, seed: sd + 2 });
      L.text(ctx, 'crédito de regalo', 960, MY0 + 78, { size: 48, weight: 700, align: 'center', color: P.white });

      // el display
      const dx0 = 640, dy0 = 330, dx1 = 1280, dy1 = 560;
      L.inkPath(ctx, L.rrectPts(dx0, dy0, dx1 - dx0, dy1 - dy0, 18, 24), { closed: true, width: 4, fill: P.meterDark, seed: sd + 3 });
      const blinkOff = end && since < 0.5 && Math.floor(since * 8) % 2 === 1;
      if (!blinkOff) {
        const pop = cur.at > 0 && since < 0.125 ? 1 + 0.08 * Math.sin((since / 0.125) * Math.PI) : 1;
        ctx.save();
        ctx.translate(960, 445);
        ctx.scale(pop, pop);
        L.text(ctx, 'USD ' + cur.v, 0, 52, { size: 140, weight: 700, align: 'center', color: P.meterRed, family: MONO });
        ctx.restore();
      }
      L.text(ctx, cur.mes, 960, 640, { size: 50, weight: 700, align: 'center', color: end ? P.meterRed : P.white });
      // perillas
      L.inkCircle(ctx, MX0 + 70, MY1 - 70, 24, { width: 3, fill: P.serverGrey, seed: sd + 4 });
      L.inkCircle(ctx, MX1 - 70, MY1 - 70, 24, { width: 3, fill: P.serverGrey, seed: sd + 5 });
      ctx.restore();

      // la flecha que baja, en cada mes
      if (t >= 1.0 && !end) {
        const k = L.clamp(since / 0.25);
        C.arrow(ctx, 1460, 340, 1460, 340 + 220 * E.outCubic(k), { p: 1, color: P.annMagenta, width: 7, seed: sd + 6 });
        L.text(ctx, '− USD 21', 1500, 470, { size: 46, weight: 700, color: P.annMagenta, alpha: k });
      }

      // anillo amarillo en cada cambio
      if (cur.at > 0 && since < 0.4) {
        const f = since / 0.4;
        ctx.save();
        ctx.globalAlpha = 1 - f;
        ctx.strokeStyle = end ? P.annMagenta : P.annYellow;
        ctx.lineWidth = 4;
        const g = 12 + 40 * E.outExpo(f);
        ctx.strokeRect(dx0 - g, dy0 - g, dx1 - dx0 + 2 * g, dy1 - dy0 + 2 * g);
        ctx.restore();
      }

      // costo por mes
      C.tag(ctx, '≈ USD 21 por mes', 330, 300, { size: 44, seed: sd + 7, rot: -0.04 });
      L.text(ctx, 'cuesta el servidor', 330, 400, { size: 40, weight: 600, align: 'center', color: P.inkSoft });

      if (end) {
        const pop = E.outBack(L.clamp(since / 0.125));
        C.tag(ctx, '¡se terminó!', 960, 810, { size: 60, fill: P.annMagenta, color: P.white, rot: -0.03, seed: sd + 8, pop });
      }

      C.caption(ctx, 'Se alquila: el crédito gratis baja como un taxímetro', L.clamp(t / 0.25));
    },
  });
})();
