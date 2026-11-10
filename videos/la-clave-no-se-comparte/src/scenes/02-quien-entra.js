// 02 quien-entra : plano azul. "Cualquiera" tiene la llave; la lleva a la puerta de la empresa (t 0.25 a 0.75),
// la puerta se abre en t 1.0 y adentro brilla el celular; en t 1.5, 2.0 y 2.5 sale un globo "Soy la empresa"
// hacia cada uno de tres clientes. Rótulo "Quien la tiene, manda mensajes como si fuera la empresa".
(function () {
  'use strict';
  const ID = 'quien-entra';
  const DOOR = { x: 900, y: 515, w: 320, h: 570 };
  const CLIENTS = [300, 520, 740];
  const KS = 0.6;

  FILM.scene({
    id: ID,
    draw(ctx, t, info) {
      const L = info.lib, P = L.pal, C = FILM.cast, E = L.ease;
      t = L.clamp(t, 0, info.dur);
      const tt = L.onTwos(t);
      const sd = L.hash(ID) & 0xffff;

      L.blueprint(ctx, { seed: 207, center: [900, 480], circles: 0, diagonals: 0 });
      L.guideCircle(ctx, 900, 500, 380, { alpha: 0.16, width: 1.5 });

      // cualquiera
      C.person(ctx, { x: 330, y: 470, schem: true, seed: 311 });
      L.text(ctx, '?', 330, 330, { size: 96, weight: 700, align: 'center', color: P.magenta, alpha: 0.6 + 0.4 * Math.cos(tt * 6) });
      L.text(ctx, 'cualquiera', 330, 690, { size: 42, weight: 600, align: 'center', color: P.lavender });

      // la puerta
      const op = E.outCubic(L.clamp((tt - 1.0) / 0.3));
      const d = C.door(ctx, {
        x: DOOR.x, y: DOOR.y, w: DOOR.w, h: DOOR.h, open: op, schem: true, seed: 211,
        inside: (c, r, k) => {
          L.glowDot(c, (r.x0 + r.x1) / 2 + 30, (r.y0 + r.y1) / 2 - 20, 26, { color: P.schemGreen, rays: 0, intensity: 0.4 * k, seed: sd + 3 });
          C.phone(c, { x: (r.x0 + r.x1) / 2 + 30, y: (r.y0 + r.y1) / 2 - 10, h: 300, schem: true, seed: 15, alpha: k });
        },
      });
      C.tag(ctx, 'la empresa', DOOR.x, 170, { schem: true, size: 44, seed: sd + 1 });

      // la llave: de la mano de cualquiera a la cerradura
      if (tt < 1.0) {
        const u = E.inOutCubic(L.clamp((tt - 0.25) / 0.5));
        const hx = d.hole[0] - 240 * KS, hy = d.hole[1];
        const x = L.lerp(500, hx, u), y = L.lerp(600, hy, u) - Math.sin(u * Math.PI) * 60;
        const turn = tt >= 0.75 ? E.outCubic(L.clamp((tt - 0.75) / 0.15)) : 0;
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(1, 1 - 0.55 * turn);
        C.key(ctx, { x: 0, y: 0, s: KS, schem: true, color: P.schemGold, seed: 173 });
        ctx.restore();
        if (tt >= 0.75) {
          const k = L.clamp((tt - 0.75) / 0.25);
          L.inkCircle(ctx, d.hole[0], d.hole[1], 20 + 50 * E.outExpo(k), { color: P.schemGold, width: 3, alpha: 1 - k, seed: sd + 4 });
        }
      }

      // tres clientes
      L.text(ctx, 'clientes', 1650, 190, { size: 42, weight: 600, align: 'center', color: P.lavender });
      CLIENTS.forEach((cy, i) => C.person(ctx, { x: 1660, y: cy, s: 0.55, schem: true, seed: 320 + i }));

      // globos: 1.5, 2.0, 2.5
      CLIENTS.forEach((cy, i) => {
        const at = 1.5 + i * 0.5;
        if (tt < at - 0.25) return;
        const u = E.outCubic(L.clamp((tt - (at - 0.25)) / 0.25));
        const x = L.lerp(1000, 1390, u), y = L.lerp(470, cy, u);
        const s = L.lerp(0.5, 1, u);
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(s, s);
        L.inkPath(ctx, L.rrectPts(-170, -42, 340, 84, 24, 14), { closed: true, color: P.magenta, width: 3.4, seed: sd + 10 + i });
        L.inkPath(ctx, [[150, 30], [190, 52], [168, 16]], { color: P.magenta, width: 3, smooth: false, seed: sd + 14 + i });
        L.text(ctx, 'Soy la empresa', 0, 14, { size: 40, weight: 700, align: 'center', color: P.lineWhite });
        ctx.restore();
        if (tt >= at) {
          const k = L.clamp((tt - at) / 0.4);
          L.inkCircle(ctx, 1660, cy, 70 + 50 * E.outExpo(k), { color: P.magenta, width: 3, alpha: 1 - k, seed: sd + 20 + i });
        }
      });

      C.caption(ctx, 'Quien la tiene, manda mensajes como si fuera la empresa', L.clamp(t / 0.25), { schem: true });
    },
  });
})();
