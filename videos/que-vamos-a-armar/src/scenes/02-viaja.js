// 02 viaja : plano azul. Celular en contorno a la izquierda, servidor a la derecha, globo de red tenue en el
// medio y un arco punteado; un punto verde viaja de T 4.0 a 5.5 (t 0.5 a 2.0) y llega con un anillo.
(function () {
  'use strict';
  const ID = 'viaja';
  const A = [440, 400], B = [1450, 400], CTRL = [945, 120];

  function quad(u) {
    const v = 1 - u;
    return [v * v * A[0] + 2 * u * v * CTRL[0] + u * u * B[0], v * v * A[1] + 2 * u * v * CTRL[1] + u * u * B[1]];
  }

  FILM.scene({
    id: ID,
    draw(ctx, t, info) {
      const L = info.lib, P = L.pal, C = FILM.cast, E = L.ease;
      t = L.clamp(t, 0, info.dur);
      const tt = L.onTwos(t);
      const sd = L.hash(ID) & 0xffff;

      L.blueprint(ctx, { seed: 205, center: [960, 470], circles: 0, diagonals: 0 });

      // globo de red
      L.guideCircle(ctx, 960, 520, 190, { alpha: 0.35, width: 2 });
      ctx.save();
      ctx.strokeStyle = P.lavender;
      ctx.globalAlpha = 0.25;
      ctx.lineWidth = 2;
      const rot = tt * 0.6;
      for (let i = 0; i < 4; i++) {
        const rx = Math.abs(Math.cos(rot + (i * Math.PI) / 4)) * 190;
        ctx.beginPath();
        ctx.ellipse(960, 520, rx, 190, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      for (const dy of [-110, 0, 110]) {
        const rx = Math.sqrt(190 * 190 - dy * dy);
        ctx.beginPath();
        ctx.ellipse(960, 520 + dy, rx, 14, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();
      L.text(ctx, 'internet', 960, 760, { size: 40, weight: 600, align: 'center', color: P.lavender, alpha: 0.8 });

      C.phone(ctx, { x: 330, y: 520, h: 420, schem: true, seed: 12 });
      C.server(ctx, { x: 1590, y: 520, w: 300, h: 400, schem: true, led: tt >= 2.0 ? 1 : 0.3, seed: 62 });
      C.tag(ctx, 'tu servidor', 1590, 790, { schem: true, size: 40 });

      // arco punteado
      ctx.save();
      ctx.setLineDash([14, 14]);
      ctx.lineDashOffset = -tt * 40;
      ctx.strokeStyle = P.lavender;
      ctx.globalAlpha = 0.7;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(A[0], A[1]);
      ctx.quadraticCurveTo(CTRL[0], CTRL[1], B[0], B[1]);
      ctx.stroke();
      ctx.restore();

      // el mensaje viaja: 0.5 a 2.0
      const u = E.inOutSine(L.clamp((tt - 0.5) / 1.5));
      if (tt >= 0.25 && tt < 2.0) {
        const [x, y] = quad(u);
        for (let k = 1; k <= 4; k++) {
          const [hx, hy] = quad(Math.max(0, u - k * 0.03));
          L.glowDot(ctx, hx, hy, 10 - k * 1.6, { color: P.schemGreen, rays: 0, intensity: 0.6 - k * 0.12, seed: sd + k });
        }
        L.glowDot(ctx, x, y, 16, { color: P.schemGreen, rays: 0, seed: sd });
        // sobrecito: una burbuja chica que acompaña al punto
        L.inkPath(ctx, L.rrectPts(x - 46, y - 82, 92, 50, 14, 12), { closed: true, color: P.schemGreen, width: 3, seed: sd + 9 });
        L.text(ctx, 'Hola!', x, y - 47, { size: 26, weight: 700, align: 'center', color: P.lineWhite });
      }
      if (tt >= 2.0) {
        const k = L.clamp((tt - 2.0) / 0.33);
        L.inkCircle(ctx, B[0], B[1], 20 + 80 * E.outCubic(k), { color: P.magenta, width: 4, alpha: 1 - k, seed: sd + 20 });
        L.glowDot(ctx, B[0], B[1], 14, { color: P.schemGreen, rays: 0, intensity: 1 - k * 0.5, seed: sd + 21 });
      }

      C.caption(ctx, 'El mensaje viaja por internet', L.clamp(t / 0.25), { schem: true });
    },
  });
})();
