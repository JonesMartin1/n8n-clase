// 08 apagado : plano azul. El servidor con su llave; en T 25.5 (t 0.5) se apaga y la luz se muere. En 26.0
// (t 1.0) el cliente escribe "¿Hola?", en 26.5 (t 1.5) puntitos de espera, en 27.0 (t 2.0) "sin respuesta".
(function () {
  'use strict';
  const ID = 'apagado';
  const SX = 560, SY = 450;
  const PX = 1400, PY = 460;

  FILM.scene({
    id: ID,
    draw(ctx, t, info) {
      const L = info.lib, P = L.pal, C = FILM.cast, E = L.ease;
      t = L.clamp(t, 0, info.dur);
      const tt = L.onTwos(t);
      const sd = L.hash(ID) & 0xffff;

      L.blueprint(ctx, { seed: 217, center: [960, 470], circles: 1, diagonals: 0 });

      const off = t >= 0.5;

      // el servidor: apagado se ve tenue
      ctx.save();
      ctx.globalAlpha *= off ? 0.55 : 1;
      C.server(ctx, { x: SX, y: SY, w: 380, h: 480, schem: true, off, led: 1, seed: 65 });
      ctx.restore();
      C.tag(ctx, 'tu servidor', SX, 170, { schem: true, size: 46, seed: sd + 1 });

      // la llave de encendido
      const kSw = E.outCubic(L.clamp((t - 0.5) / 0.17));
      const swx0 = 440, swy = 790;
      L.inkPath(ctx, L.rrectPts(swx0, swy - 34, 150, 68, 34, 16), { closed: true, color: off ? P.lavender : P.schemGreen, width: 3, fill: P.navyLight, seed: sd + 2 });
      const knobX = L.lerp(swx0 + 116, swx0 + 34, kSw);
      L.inkCircle(ctx, knobX, swy, 24, { color: off ? P.lavender : P.schemGreen, width: 3, fill: off ? P.navy : P.schemGreen, seed: sd + 3 });
      L.text(ctx, off ? 'apagado' : 'prendido', swx0 + 180, swy + 16, { size: 46, weight: 700, color: off ? P.magenta : P.schemGreen });

      // flash al apagar
      if (off && t < 1.0) {
        const f = (t - 0.5) / 0.5;
        ctx.save();
        ctx.globalAlpha = 1 - f;
        ctx.strokeStyle = P.magenta;
        ctx.lineWidth = 3;
        const g = 10 + 50 * E.outExpo(f);
        ctx.strokeRect(SX - 190 - g, SY - 240 - g, 380 + 2 * g, 480 + 2 * g);
        ctx.restore();
      }

      // el celular del cliente
      const scr = C.phone(ctx, { x: PX, y: PY, h: 560, schem: true, seed: 14 });
      L.text(ctx, 'el cliente', PX, 800, { size: 42, weight: 600, align: 'center', color: P.lavender });

      if (tt >= 1.0) {
        const pop = E.outBack(L.clamp((tt - 1.0) / 0.125));
        C.bubble(ctx, { side: 'right', x: scr.x1 - 26, y: scr.y0 + 50, w: 190, lines: ['¿Hola?'], size: 42, pop, schem: true, seed: sd + 4 });
      }
      // puntitos de espera (1.5 a 2.0)
      if (tt >= 1.5 && tt < 2.0) {
        for (let i = 0; i < 3; i++) {
          const a = 0.35 + 0.65 * (Math.floor(tt * 6) % 3 === i ? 1 : 0);
          ctx.save();
          ctx.globalAlpha = a;
          ctx.fillStyle = P.lavender;
          ctx.beginPath();
          ctx.arc(scr.x0 + 50 + i * 30, scr.y0 + 230, 9, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // el mensaje no llega: flecha punteada con una cruz
      if (tt >= 1.0) {
        ctx.save();
        ctx.setLineDash([14, 10]);
        C.arrow(ctx, 1220, 450, 800, 450, { schem: true, p: L.clamp((t - 1.0) / 0.4), seed: sd + 5 });
        ctx.restore();
      }
      if (tt >= 2.0) {
        const k = E.outBack(L.clamp((tt - 2.0) / 0.125));
        const cx = 1010, cy = 450, r = 40 * k;
        L.inkLine(ctx, cx - r, cy - r, cx + r, cy + r, { color: P.magenta, width: 8, seed: sd + 6 });
        L.inkLine(ctx, cx - r, cy + r, cx + r, cy - r, { color: P.magenta, width: 8, seed: sd + 7 });
        const a = L.clamp((t - 2.0) / 0.2);
        L.text(ctx, 'sin respuesta', 1010, 560, { size: 44, weight: 700, align: 'center', color: P.magenta, alpha: a });
      }

      C.caption(ctx, 'Si se apaga, el bot deja de contestar', L.clamp(t / 0.25), { schem: true });
    },
  });
})();
