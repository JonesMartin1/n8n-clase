// 03 evolution : el servidor gris con un celular adentro (Evolution). La burbuja entra en T 6.5 (t 0.5), el
// celular virtual suena en 7.5 (t 1.5) y sale la flecha "aviso" en 8.5 (t 2.5).
(function () {
  'use strict';
  const ID = 'evolution';

  FILM.scene({
    id: ID,
    draw(ctx, t, info) {
      const L = info.lib, P = L.pal, C = FILM.cast, E = L.ease;
      t = L.clamp(t, 0, info.dur);
      const tt = L.onTwos(t);
      const sd = L.hash(ID) & 0xffff;

      L.paper(ctx, { color: P.paperSky, seed: 7 });

      const SX = 760, SY = 540;
      const srv = C.server(ctx, { x: SX, y: SY, w: 540, h: 660, window: true, led: 0.6 + 0.4 * Math.sin(tt * 6), seed: 63 });
      L.text(ctx, 'servidor', srv.x0 + 40, srv.y1 - 34, { size: 40, weight: 600, color: P.ink, alpha: 0.75 });
      const win = srv.win;
      const ring = tt >= 1.5 && tt < 2.25 ? Math.sin((tt - 1.5) * 16 * Math.PI) * 0.05 : 0;
      const pcx = (win.x0 + win.x1) / 2, pcy = (win.y0 + win.y1) / 2;
      const scr = C.phone(ctx, { x: pcx, y: pcy, h: 300, rot: ring, screenColor: P.evoBlue, header: false, seed: 13 });

      C.tag(ctx, 'Evolution', SX, srv.y0 - 50, { size: 50, fill: P.evoBlue, color: P.white, seed: sd + 1 });

      // la burbuja llega desde la izquierda y entra a la pantalla (0 a 0.5)
      const inP = E.outCubic(L.clamp(tt / 0.5));
      if (tt < 0.5) {
        const x = L.lerp(110, scr.x0 + 20, inP), y = L.lerp(300, scr.y0 + 50, inP);
        C.bubble(ctx, { side: 'left', x, y, w: 150, lines: ['Hola!…'], size: 28, seed: sd + 5 });
        FILM.props.speedLines(ctx, { x: x - 20, y: y + 30, n: 3, len: 70, dir: -1, seed: sd + 6 });
      } else {
        const pop = E.outBack(L.clamp((tt - 0.5) / 0.125));
        C.bubble(ctx, { side: 'left', x: scr.x0 + 14, y: scr.y0 + 40, w: 136, lines: ['Hola!…'], size: 26, pop, seed: sd + 5 });
      }

      // suena: ondas en 1.5
      if (tt >= 1.5 && tt < 2.5) {
        const k = (tt - 1.5) / 1.0;
        for (const side of [-1, 1]) {
          for (let i = 0; i < 2; i++) {
            const r = 40 + i * 30 + k * 30;
            const cx = pcx + side * 120, cy = pcy - 40;
            const a0 = side < 0 ? Math.PI * 0.75 : -Math.PI * 0.25;
            const pts = [];
            for (let j = 0; j <= 8; j++) {
              const a = a0 + (j / 8) * Math.PI * 0.5;
              pts.push([cx + Math.cos(a) * r * 0.5, cy + Math.sin(a) * r]);
            }
            L.inkPath(ctx, pts, { color: P.annYellow, width: 6, seed: sd + 10 + i + side, alpha: 1 - k * 0.7 });
          }
        }
      }

      // flecha "aviso" en 2.5
      if (tt >= 2.5) {
        const k = E.outCubic(L.clamp((tt - 2.5) / 0.33));
        C.arrow(ctx, srv.x1 + 30, 420, 1720, 420, { p: k, width: 7, color: P.annMagenta, bend: -30, seed: sd + 20 });
        if (k >= 1) {
          C.tag(ctx, 'aviso', 1390, 330, { size: 46, seed: sd + 21, pop: E.outBack(L.clamp((tt - 2.83) / 0.125)) });
          L.text(ctx, 'a n8n', 1640, 510, { size: 44, weight: 700, color: P.ink, align: 'center' });
        }
      }

      C.caption(ctx, '2 · Evolution: el celular virtual que lo recibe', L.clamp(t / 0.25));
    },
  });
})();
