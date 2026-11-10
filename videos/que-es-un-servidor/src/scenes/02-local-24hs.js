// 02 local-24hs : plano azul. Un local en contorno con el cartel "ABIERTO 24 hs" que se enciende en T 4.0
// (t 0.5). Arriba pasan el sol (hasta t 1.5), la luna (t 1.5 a 2.5) y otra vez el sol: la luz sigue prendida.
(function () {
  'use strict';
  const ID = 'local-24hs';
  const BX0 = 600, BX1 = 1320, BY0 = 330, BY1 = 800;

  function skyPos(u) {
    return [L0(180, 1740, u), 560 - 400 * Math.sin(Math.PI * u)];
  }
  function L0(a, b, u) {
    return a + (b - a) * u;
  }

  FILM.scene({
    id: ID,
    draw(ctx, t, info) {
      const L = info.lib, P = L.pal, C = FILM.cast, E = L.ease;
      t = L.clamp(t, 0, info.dur);
      const tt = L.onTwos(t);
      const sd = L.hash(ID) & 0xffff;

      L.blueprint(ctx, { seed: 211, center: [960, 560], circles: 2, diagonals: 2 });

      // noche: estrellas mientras pasa la luna (1.5 a 2.5)
      const night = L.clamp((t - 1.4) / 0.2) * (1 - L.clamp((t - 2.4) / 0.2));
      if (night > 0) {
        const rs = L.rng(sd + 1);
        ctx.save();
        for (let i = 0; i < 40; i++) {
          const x = 120 + rs() * 1680, y = 100 + rs() * 260;
          ctx.globalAlpha = night * (0.4 + 0.6 * rs());
          ctx.fillStyle = P.lineWhite;
          ctx.beginPath();
          ctx.arc(x, y, 1.6 + rs() * 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // el camino del sol y de la luna
      const path = [];
      for (let i = 0; i <= 40; i++) path.push(skyPos(i / 40));
      L.inkPath(ctx, path, { color: P.lavender, width: 1.5, alpha: 0.3, seed: sd + 2 });

      let body = null;
      if (t < 1.5) body = { kind: 'sun', u: 0.4 + 0.6 * (t / 1.5) };
      else if (t < 2.5) body = { kind: 'moon', u: t - 1.5 };
      else body = { kind: 'sun', u: (t - 2.5) * 0.6 };
      const [sx, sy] = skyPos(body.u);
      if (body.kind === 'sun') {
        L.glowDot(ctx, sx, sy, 26, { color: P.glow, core: P.glow, rays: 12, intensity: 0.9, seed: sd + 3 });
      } else {
        ctx.save();
        ctx.fillStyle = P.lineWhite;
        ctx.beginPath();
        ctx.arc(sx, sy, 40, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = P.navy;
        ctx.beginPath();
        ctx.arc(sx + 18, sy - 10, 34, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // el piso
      L.inkLine(ctx, 160, BY1, 1760, BY1, { color: P.lavender, width: 2.5, seed: sd + 4 });

      // el local: contorno doble
      L.inkPath(ctx, L.rectPts(BX0, BY0, BX1 - BX0, BY1 - BY0, 30), { closed: true, color: P.lavender, width: 2.6, seed: sd + 5 });
      L.inkPath(ctx, L.rectPts(BX0 + 9, BY0 + 9, BX1 - BX0 - 18, BY1 - BY0 - 9, 30), { closed: true, color: P.lavender, width: 1.5, alpha: 0.5, seed: sd + 6 });
      // techo
      L.inkPath(ctx, [[BX0 - 30, BY0], [BX1 + 30, BY0], [BX1 + 30, BY0 - 26], [BX0 - 30, BY0 - 26]], { closed: true, color: P.lavender, width: 2.4, seed: sd + 7, smooth: false });

      // el cartel: se enciende en 0.5
      const on = t >= 0.5;
      const flick = on ? (t < 0.75 ? (Math.floor(t * 24) % 2 ? 0.4 : 1) : 1) : 0;
      const sgn = { x0: 700, y0: 360, x1: 1220, y1: 455 };
      if (on) {
        ctx.save();
        ctx.globalAlpha = 0.18 * flick;
        ctx.fillStyle = P.schemGreen;
        ctx.fillRect(sgn.x0 - 20, sgn.y0 - 16, sgn.x1 - sgn.x0 + 40, sgn.y1 - sgn.y0 + 32);
        ctx.restore();
      }
      L.inkPath(ctx, L.rrectPts(sgn.x0, sgn.y0, sgn.x1 - sgn.x0, sgn.y1 - sgn.y0, 16, 20), {
        closed: true, color: on ? P.schemGreen : P.lavender, width: 3, alpha: on ? flick : 0.5, seed: sd + 8,
      });
      L.text(ctx, 'ABIERTO 24 hs', 960, 427, { size: 58, weight: 800, align: 'center', color: on ? P.schemGreen : P.lavender, alpha: on ? flick : 0.35, tracking: 2 });
      if (on && t < 0.5 + 0.5) {
        const k = L.clamp((t - 0.5) / 0.5);
        ctx.save();
        ctx.globalAlpha = 1 - k;
        ctx.strokeStyle = P.magenta;
        ctx.lineWidth = 3;
        const g = 10 + 50 * E.outExpo(k);
        ctx.strokeRect(sgn.x0 - g, sgn.y0 - g, sgn.x1 - sgn.x0 + 2 * g, sgn.y1 - sgn.y0 + 2 * g);
        ctx.restore();
      }

      // toldo con ondas
      const aw = [];
      aw.push([BX0 - 10, 480]);
      aw.push([BX1 + 10, 480]);
      const n = 8, step = (BX1 - BX0 + 20) / n;
      for (let i = n; i >= 0; i--) {
        const x = BX0 - 10 + i * step;
        aw.push([x, 540]);
        if (i > 0) aw.push([x - step / 2, 556]);
      }
      L.inkPath(ctx, aw, { closed: true, color: P.lavender, width: 2.4, seed: sd + 9 });
      for (let i = 1; i < n; i++) {
        const x = BX0 - 10 + i * step;
        L.inkLine(ctx, x, 480, x, 540, { color: P.lavender, width: 1.5, alpha: 0.6, seed: sd + 10 + i });
      }

      // vidriera con la lámpara siempre prendida
      L.inkPath(ctx, L.rectPts(680, 590, 330, 190, 30), { closed: true, color: P.lavender, width: 2.4, seed: sd + 20 });
      L.inkLine(ctx, 845, 590, 845, 640, { color: P.lavender, width: 2, seed: sd + 21 });
      const pulse = 0.5 + 0.5 * Math.cos(((t % 0.5) / 0.5) * Math.PI * 2);
      L.glowDot(ctx, 845, 664, 18, { color: P.glow, core: P.glow, rays: 0, intensity: 0.75 + 0.25 * pulse, seed: sd + 22 });
      // puerta
      L.inkPath(ctx, L.rectPts(1080, 590, 170, 210, 30), { closed: true, color: P.lavender, width: 2.4, seed: sd + 23 });
      L.inkCircle(ctx, 1110, 700, 8, { color: P.lavender, width: 2, seed: sd + 24 });

      // sol y luna: etiquetas chicas al costado
      L.text(ctx, body.kind === 'sun' ? 'de día' : 'de noche', 1580, 712, { size: 48, weight: 700, align: 'center', color: body.kind === 'sun' ? P.glow : P.paleBlue });
      L.text(ctx, 'y sigue abierto', 1580, 764, { size: 42, weight: 600, align: 'center', color: P.lavender, alpha: on ? 1 : 0 });

      C.caption(ctx, 'Un servidor es como un local que nunca cierra', L.clamp(t / 0.25), { schem: true });
    },
  });
})();
