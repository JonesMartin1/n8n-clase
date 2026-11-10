// 07 respuesta : el mismo celular de 01 (G2) con la burbuja del cliente ya enviada. En 22 (t 1.0) llega la
// respuesta a la izquierda; en 23 (t 2.0) chispas. Rótulo "5 · Y el cliente recibe la respuesta, solo".
(function () {
  'use strict';
  const ID = 'respuesta';
  const MSG = ['Hola! Quiero 2', 'docenas de', 'empanadas'];
  const REPLY = ['¡Listo! Tu pedido', 'es el N° 12'];

  FILM.scene({
    id: ID,
    draw(ctx, t, info) {
      const L = info.lib, P = L.pal, C = FILM.cast, E = L.ease, PR = FILM.props;
      t = L.clamp(t, 0, info.dur);
      const tt = L.onTwos(t);
      const sd = L.hash(ID) & 0xffff;

      L.paper(ctx, { seed: 3 });
      ctx.save();
      ctx.globalAlpha = 0.55;
      L.stripes(ctx, { colors: [P.stripeCream, P.stripeSage], width: 150, offset: tt * 30, seed: sd });
      ctx.restore();

      // llega: pequeño salto del celular en 1.0
      const bump = tt >= 1.0 && tt < 1.25 ? -Math.sin(((tt - 1.0) / 0.25) * Math.PI) * 10 : 0;
      const scr = C.phone(ctx, { x: 960, y: 485 + bump, h: 750, seed: 11 });

      const fy0 = scr.y1 - 74, fy1 = scr.y1 - 16;
      L.inkPath(ctx, L.rrectPts(scr.x0 + 14, fy0, scr.x1 - scr.x0 - 90, fy1 - fy0, 26, 14), {
        closed: true, width: 2.4, color: P.inkFaint, fill: P.white, seed: sd + 20,
      });
      L.inkCircle(ctx, scr.x1 - 42, (fy0 + fy1) / 2, 26, { width: 2.4, fill: P.chatGreen, seed: sd + 21 });
      L.text(ctx, 'Mensaje', scr.x0 + 34, fy1 - 18, { size: 26, weight: 400, color: P.inkFaint });

      C.bubble(ctx, { side: 'right', x: scr.x1 - 18, y: 300 + bump, w: 300, lines: MSG, size: 32, ticks: 1, seed: sd + 30 });

      if (tt >= 1.0) {
        const pop = E.outBack(L.clamp((tt - 1.0) / 0.125));
        const b = C.bubble(ctx, { side: 'left', x: scr.x0 + 18, y: 470 + bump, w: 300, lines: REPLY, size: 32, pop, seed: sd + 40 });
        if (tt >= 2.0 && b) {
          const k = L.clamp((tt - 2.0) / 0.25);
          const pts = [[b.x1 + 70, b.y0 - 10, 30], [b.x1 + 120, b.y0 + 70, 22], [b.x0 - 90, b.y0 + 40, 26], [b.x1 + 60, b.y1 + 60, 18]];
          pts.forEach(([x, y, r], i) => {
            const tw = 0.8 + 0.2 * Math.sin(tt * 8 + i * 1.7);
            PR.sparkle(ctx, x, y, r * tw, { draw: k, color: i % 2 ? P.annMagenta : P.annYellow, width: 4, seed: sd + 50 + i });
          });
          if (k >= 1) PR.heart(ctx, b.x0 - 100, b.y1 + 40, 22, { color: P.ink, fill: P.washRed, seed: sd + 60 });
        }
      }

      C.caption(ctx, '5 · Y el cliente recibe la respuesta, solo', L.clamp(t / 0.25));
    },
  });
})();
