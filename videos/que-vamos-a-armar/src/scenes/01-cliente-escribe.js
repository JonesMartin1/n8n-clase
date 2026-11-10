// 01 cliente-escribe : el celular del cliente (G2). Vibra en 0.5, escribe en 1.0, manda la burbuja en 2.0,
// tildes en 2.5. Rótulo "1 · Un cliente manda un WhatsApp".
(function () {
  'use strict';
  const ID = 'cliente-escribe';
  const MSG = ['Hola! Quiero 2', 'docenas de', 'empanadas'];
  const TYPED = 'Hola! Quiero 2 docenas…';

  FILM.scene({
    id: ID,
    draw(ctx, t, info) {
      const L = info.lib, P = L.pal, C = FILM.cast, E = L.ease;
      t = L.clamp(t, 0, info.dur);
      const tt = L.onTwos(t);
      const sd = L.hash(ID) & 0xffff;

      L.paper(ctx, { seed: 3 });
      ctx.save();
      ctx.globalAlpha = 0.55;
      L.stripes(ctx, { colors: [P.stripeCream, P.stripeYellow], width: 150, offset: tt * 30, seed: sd });
      ctx.restore();

      // vibración: 0.5 a 1.0, en dos
      const vib = tt >= 0.5 && tt < 1.0 ? Math.sin((tt - 0.5) * 12 * Math.PI) * 6 : 0;
      const scr = C.phone(ctx, { x: 960 + vib, y: 485, h: 750, seed: 11 });

      if (tt >= 0.5 && tt < 1.17) {
        const k = (tt - 0.5) / 0.67;
        for (const side of [-1, 1]) {
          for (let i = 0; i < 3; i++) {
            const r = 60 + i * 34 + k * 30;
            const cx = 960 + side * 230, cy = 300;
            const a0 = side < 0 ? Math.PI * 0.8 : -Math.PI * 0.2;
            const pts = [];
            for (let j = 0; j <= 10; j++) {
              const a = a0 + (j / 10) * Math.PI * 0.4;
              pts.push([cx + Math.cos(a) * r * 0.5, cy + Math.sin(a) * r]);
            }
            L.inkPath(ctx, pts, { color: P.annYellow, width: 6, seed: sd + i + side * 7, alpha: 1 - k * 0.6 });
          }
        }
      }

      // campo de texto abajo de la pantalla
      const fy0 = scr.y1 - 74, fy1 = scr.y1 - 16;
      L.inkPath(ctx, L.rrectPts(scr.x0 + 14, fy0, scr.x1 - scr.x0 - 90, fy1 - fy0, 26, 14), {
        closed: true, width: 2.4, color: P.inkFaint, fill: P.white, seed: sd + 20,
      });
      L.inkCircle(ctx, scr.x1 - 42, (fy0 + fy1) / 2, 26, { width: 2.4, fill: P.chatGreen, seed: sd + 21 });
      L.inkPath(ctx, [[scr.x1 - 52, (fy0 + fy1) / 2 - 10], [scr.x1 - 30, (fy0 + fy1) / 2], [scr.x1 - 52, (fy0 + fy1) / 2 + 10]], {
        color: P.white, width: 3, smooth: false, seed: sd + 22, taper: 0,
      });
      if (tt >= 1.0 && tt < 2.0) {
        const pTyped = L.clamp((tt - 1.0) / 0.9);
        L.text(ctx, TYPED, scr.x0 + 34, fy1 - 18, { size: 26, weight: 500, color: P.ink, p: pTyped });
      } else if (tt < 1.0) {
        L.text(ctx, 'Mensaje', scr.x0 + 34, fy1 - 18, { size: 26, weight: 400, color: P.inkFaint });
      }

      // burbuja del cliente: pop en 2.0
      if (tt >= 2.0) {
        const pop = E.outBack(L.clamp((tt - 2.0) / 0.125));
        C.bubble(ctx, {
          side: 'right', x: scr.x1 - 18, y: 300, w: 300, lines: MSG, size: 32, pop,
          ticks: tt >= 2.5 ? 1 : 0, seed: sd + 30,
        });
      }

      C.caption(ctx, '1 · Un cliente manda un WhatsApp', L.clamp(t / 0.25));
    },
  });
})();
