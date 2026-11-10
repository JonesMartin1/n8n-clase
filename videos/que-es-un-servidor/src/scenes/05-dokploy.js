// 05 dokploy : el control remoto (Dokploy) a la izquierda y el servidor con pantallita a la derecha.
// Botón en T 14.5 (t 0.5); se prende "n8n" en 15.0 (t 1.0) y "Evolution" en 15.5 (t 1.5); otro botón en 16.5
// (t 2.5) y la luz del servidor titila.
(function () {
  'use strict';
  const ID = 'dokploy';
  const RX = 470, RY = 540, RS = 1.5;
  const SX = 1330, SY = 540;

  FILM.scene({
    id: ID,
    draw(ctx, t, info) {
      const L = info.lib, P = L.pal, C = FILM.cast, E = L.ease;
      t = L.clamp(t, 0, info.dur);
      const tt = L.onTwos(t);
      const sd = L.hash(ID) & 0xffff;

      L.paper(ctx, { seed: 5 });
      ctx.save();
      ctx.globalAlpha = 0.45;
      L.stripes(ctx, { colors: [P.stripeCream, P.stripeYellow], width: 140, angle: -0.52, offset: tt * 12, seed: sd });
      ctx.restore();

      // el control remoto
      ctx.save();
      ctx.globalAlpha *= 0.18;
      ctx.fillStyle = P.ink;
      ctx.beginPath();
      ctx.ellipse(RX + 14, RY + 130 * RS + 26, 110, 14, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      C.remote(ctx, { x: RX, y: RY, s: RS, rot: -0.06, seed: 131 });
      C.tag(ctx, 'Dokploy', RX, 250, { size: 54, fill: P.legoYellow, color: P.ink, rot: -0.04, seed: sd + 1 });
      L.text(ctx, 'el control remoto', RX, 840, { size: 44, weight: 600, align: 'center', color: P.inkSoft });

      // botón apretado (0.5 el grande, 2.5 el verde)
      const press = (at, bx, by, r) => {
        const k = t >= at && t < at + 0.33 ? 1 - L.clamp((t - at) / 0.33) : 0;
        if (k <= 0) return;
        const c = Math.cos(-0.06), s = Math.sin(-0.06);
        const wx = RX + (bx * c - by * s) * RS, wy = RY + (bx * s + by * c) * RS;
        ctx.save();
        ctx.globalAlpha = 0.45 * k;
        ctx.fillStyle = P.ink;
        ctx.beginPath();
        ctx.arc(wx, wy, r * RS, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        ctx.save();
        ctx.globalAlpha = k;
        ctx.strokeStyle = P.annYellow;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(wx, wy, r * RS + 14 + 30 * (1 - k), 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      };
      press(0.5, 0, -70, 22);
      press(2.5, 0, 50, 15);

      // ondas del control al servidor
      const waves = (at) => {
        if (t < at || t > at + 0.6) return;
        const u = (t - at) / 0.6;
        for (let i = 0; i < 3; i++) {
          const r = 60 + i * 50 + u * 160;
          const a = 1 - u;
          ctx.save();
          ctx.globalAlpha = a;
          ctx.strokeStyle = P.annBlue;
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.arc(RX + 40, 380, r, -0.5, 0.5);
          ctx.stroke();
          ctx.restore();
        }
      };
      waves(0.5);
      waves(2.5);
      if (t >= 0.5) {
        ctx.save();
        ctx.setLineDash([14, 10]);
        ctx.globalAlpha = 0.9;
        C.arrow(ctx, 640, 380, 1020, 380, { p: L.clamp((t - 0.5) / 0.4), color: P.annBlue, width: 4, bend: -30, seed: sd + 2 });
        ctx.restore();
      }

      // el servidor con su pantallita
      const flick = t >= 2.5 && t < 3.0 ? (Math.floor(t * 16) % 2 ? 0.2 : 1) : 1;
      const srv = C.server(ctx, { x: SX, y: SY, w: 560, h: 640, window: true, led: flick, seed: 63 });
      const win = srv.win;
      ctx.save();
      ctx.fillStyle = P.white;
      ctx.fillRect(win.x0 + 4, win.y0 + 4, win.x1 - win.x0 - 8, win.y1 - win.y0 - 8);
      ctx.fillStyle = P.phoneCase;
      ctx.fillRect(win.x0 + 4, win.y0 + 4, win.x1 - win.x0 - 8, 62);
      ctx.restore();
      L.text(ctx, 'tu servidor', win.x0 + 26, win.y0 + 50, { size: 40, weight: 700, color: P.white });

      const rows = [
        { name: 'n8n', at: 1.0, y: win.y0 + 150 },
        { name: 'Evolution', at: 1.5, y: win.y0 + 255 },
      ];
      rows.forEach((r, i) => {
        const on = tt >= r.at;
        L.inkLine(ctx, win.x0 + 20, r.y + 40, win.x1 - 20, r.y + 40, { width: 1.5, color: P.inkFaint, alpha: 0.5, seed: sd + 10 + i });
        L.inkCircle(ctx, win.x0 + 50, r.y - 14, 15, { width: 2.6, fill: on ? P.okGreen : P.serverGrey, seed: sd + 12 + i });
        L.text(ctx, r.name, win.x0 + 86, r.y, { size: 48, weight: 700, color: on ? P.ink : P.inkFaint });
        if (on) {
          const k = L.clamp((t - r.at) / 0.2);
          const bx = win.x1 - 90, by = r.y - 14;
          L.inkPath(ctx, [[bx - 26, by], [bx - 6, by + 22], [bx + 32, by - 26]], { color: P.okGreen, width: 8, draw: k, smooth: false, seed: sd + 14 + i });
          if (t - r.at < 0.4) {
            const f = (t - r.at) / 0.4;
            ctx.save();
            ctx.globalAlpha = 1 - f;
            ctx.strokeStyle = P.annMagenta;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(win.x0 + 50, r.y - 14, 20 + 30 * E.outExpo(f), 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
          }
        }
      });

      C.caption(ctx, 'Dokploy: el control remoto para manejarlo', L.clamp(t / 0.25));
    },
  });
})();
