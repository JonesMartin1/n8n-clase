// 06 aparte : plano azul. T 20.5 (t 0.5) la carpeta "Portafolio Digital" de la pareja; T 21.5 (t 1.5) dos cuadernos
// "Bitácora individual, una por persona"; T 22.5 (t 2.5) la franja "El informe y la Bitácora se escriben sin IA".
(function () {
  'use strict';
  const ID = 'aparte';

  FILM.scene({
    id: ID,
    draw(ctx, t, info) {
      const L = info.lib, P = L.pal, C = FILM.cast, E = L.ease;
      t = L.clamp(t, 0, info.dur);
      const tt = L.onTwos(t);
      const sd = L.hash(ID) & 0xffff;

      L.blueprint(ctx, { seed: 61, center: [960, 460], circles: 0, diagonals: 0 });

      // huecos punteados donde van a aparecer la carpeta y los cuadernos
      ctx.save();
      ctx.setLineDash([12, 12]);
      ctx.strokeStyle = P.lavender;
      ctx.globalAlpha = 0.35;
      ctx.lineWidth = 2.5;
      if (tt < 0.5) ctx.strokeRect(360, 260, 400, 280);
      if (tt < 1.5) {
        ctx.strokeRect(1135, 250, 210, 290);
        ctx.strokeRect(1375, 250, 210, 290);
      }
      ctx.restore();

      // la carpeta del Portafolio
      if (tt >= 0.5) {
        const pop = E.outBack(L.clamp((tt - 0.5) / 0.17));
        ctx.save();
        ctx.translate(560, 400);
        ctx.scale(pop, pop);
        // hojas que asoman
        for (let i = 0; i < 3; i++) {
          L.inkPath(ctx, L.rectPts(-160 + i * 30, -160 - i * 10, 280, 200, 20), { closed: true, color: P.lavender, width: 2.6, seed: sd + 1 + i });
          for (let r = 0; r < 3; r++) L.inkPath(ctx, [[-130 + i * 30, -120 - i * 10 + r * 30], [60 + i * 30, -120 - i * 10 + r * 30]], { color: P.paleBlue, width: 2, alpha: 0.6, seed: sd + 5 + i * 3 + r });
        }
        // la carpeta
        L.inkPath(ctx, [[-200, -110], [-200, -140], [-70, -140], [-40, -110]], { color: P.lineWhite, width: 3.4, smooth: false, seed: sd + 20 });
        L.inkPath(ctx, L.rrectPts(-200, -110, 400, 250, 16, 20), { closed: true, color: P.lineWhite, width: 3.6, fill: P.navyLight, seed: sd + 21 });
        L.text(ctx, 'AE1 · AE2 · flujos', 0, -10, { size: 40, weight: 600, align: 'center', color: P.paleBlue });
        L.text(ctx, 'decisiones', 0, 50, { size: 40, weight: 600, align: 'center', color: P.paleBlue });
        ctx.restore();
        const a = L.clamp((tt - 0.5) / 0.2);
        L.text(ctx, 'Portafolio Digital', 560, 620, { size: 52, weight: 800, align: 'center', color: P.lineWhite, alpha: a });
        L.text(ctx, 'abierto para el docente', 560, 676, { size: 42, weight: 600, align: 'center', color: P.lavender, alpha: a });
      }

      // las dos Bitácoras
      if (tt >= 1.5) {
        [[1240, -0.05, 0], [1480, 0.05, 1]].forEach(([x, rot, j]) => {
          const pop = E.outBack(L.clamp((tt - 1.5 - j * 0.08) / 0.17));
          if (pop <= 0) return;
          ctx.save();
          ctx.translate(x, 400);
          ctx.rotate(rot);
          ctx.scale(pop, pop);
          L.inkPath(ctx, L.rrectPts(-105, -150, 210, 290, 14, 20), { closed: true, color: P.lineWhite, width: 3.6, fill: P.navyLight, seed: sd + 30 + j });
          L.inkPath(ctx, [[-80, -150], [-80, 140]], { color: P.lavender, width: 2.6, seed: sd + 32 + j });
          C.person(ctx, { x: 10, y: -10, s: 0.32, schem: true, seed: sd + 34 + j });
          L.text(ctx, j ? 'Juan' : 'Ana', 10, 100, { size: 40, weight: 700, align: 'center', color: P.lineWhite });
          ctx.restore();
        });
        const a = L.clamp((tt - 1.5) / 0.2);
        L.text(ctx, 'Bitácora individual', 1360, 620, { size: 52, weight: 800, align: 'center', color: P.lineWhite, alpha: a });
        L.text(ctx, 'una por persona', 1360, 676, { size: 42, weight: 600, align: 'center', color: P.lavender, alpha: a });
      }

      // la franja: sin IA
      if (tt >= 2.5) {
        const k = E.outBack(L.clamp((tt - 2.5) / 0.17));
        ctx.save();
        ctx.translate(960, 790);
        ctx.scale(k, k);
        L.inkPath(ctx, L.rrectPts(-580, -50, 1160, 100, 50, 24), { closed: true, color: P.magenta, width: 3.6, fill: P.navyDeep, seed: sd + 40 });
        // robot tachado
        const rx = -505;
        L.inkPath(ctx, L.rrectPts(rx - 32, -26, 64, 52, 12, 12), { closed: true, color: P.lineWhite, width: 3, seed: sd + 41 });
        L.inkPath(ctx, [[rx, -26], [rx, -38]], { color: P.lineWhite, width: 3, seed: sd + 42 });
        L.inkCircle(ctx, rx, -42, 5, { color: P.lineWhite, width: 2.4, seed: sd + 43 });
        for (const ex of [-12, 12]) L.inkCircle(ctx, rx + ex, -6, 5, { color: P.lineWhite, width: 2.4, seed: sd + 44 + ex });
        L.inkLine(ctx, rx - 44, 40, rx + 44, -44, { color: P.magenta, width: 7, seed: sd + 46 });
        L.text(ctx, 'El informe y la Bitácora se escriben sin IA', -438, 16, { size: 46, weight: 800, color: P.lineWhite });
        ctx.restore();
      }

      C.caption(ctx, 'Además: el Portafolio y una Bitácora por persona', L.clamp(t / 0.25), { schem: true });
    },
  });
})();
