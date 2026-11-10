// 01 la-llave : el nodo Datos (G1) del flujo del bot. En t 0.5 aparecen los valores, en 1.0 se resalta la fila de
// la clave, en 1.5 la llave sale del valor y en 2.0 aterriza en (1330, 470); en 2.5 cuelga el llavero de casita.
// Rótulo "La clave de Evolution es como la llave de tu casa".
(function () {
  'use strict';
  const ID = 'la-llave';
  const END = [1400, 420];
  const S1 = 1.25;

  function house(ctx, L, P, x, y, rot, sd) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    L.inkCircle(ctx, 0, 0, 20, { width: 5, color: P.serverDeep, seed: sd });
    L.inkPath(ctx, [[0, 20], [0, 56]], { width: 4, color: P.serverDeep, seed: sd + 1 });
    L.inkPath(ctx, L.rectPts(-55, 110, 110, 92, 16), { closed: true, width: 4, fill: P.white, seed: sd + 2 });
    L.inkPath(ctx, [[-72, 114], [0, 56], [72, 114]], { closed: true, width: 4, fill: P.legoRed, seed: sd + 3, smooth: false });
    L.inkPath(ctx, L.rectPts(-16, 150, 32, 52, 10), { closed: true, width: 3, fill: P.wood, seed: sd + 4 });
    L.inkPath(ctx, L.rectPts(22, 128, 22, 22, 8), { closed: true, width: 2.6, fill: P.paleBlue, seed: sd + 5 });
    ctx.restore();
  }

  FILM.scene({
    id: ID,
    draw(ctx, t, info) {
      const L = info.lib, P = L.pal, C = FILM.cast, E = L.ease;
      t = L.clamp(t, 0, info.dur);
      const tt = L.onTwos(t);
      const sd = L.hash(ID) & 0xffff;

      L.paper(ctx, { seed: 3 });
      ctx.save();
      ctx.globalAlpha = 0.5;
      L.stripes(ctx, { colors: [P.stripeCream, P.stripeYellow], width: 150, offset: tt * 30, seed: sd });
      ctx.restore();

      const hl = tt >= 1.0 ? E.outCubic(L.clamp((tt - 1.0) / 0.25)) : 0;
      const card = C.card(ctx, { highlight: hl, seed: 291 });
      const [r1, r2] = card.rows;
      C.tag(ctx, 'n8n', 250, 196, { size: 46, rot: -0.06, seed: sd + 1 });
      L.text(ctx, 'el flujo del bot', 380, 210, { size: 40, weight: 600, color: P.inkSoft });

      // valores: pop en 0.5
      if (tt >= 0.5) {
        const k = E.outBack(L.clamp((tt - 0.5) / 0.125));
        for (const [r, str, col, w] of [[r1, 'https://…', P.inkSoft, 500], [r2, 'abc123••••', P.ink, 700]]) {
          ctx.save();
          ctx.translate(r.x0 + 20, r.base - 14);
          ctx.scale(k, k);
          L.text(ctx, str, 0, 14, { size: 40, weight: w, color: col });
          ctx.restore();
        }
      }

      // anillo de atención sobre la clave: 1.0
      if (tt >= 1.0 && tt < 1.75) {
        const k = L.clamp((tt - 1.0) / 0.5);
        const cx = (r2.x0 + r2.x1) / 2, cy = (r2.y0 + r2.y1) / 2;
        L.inkCircle(ctx, cx, cy, 190 + 50 * E.outExpo(k), { ry: 62 + 24 * E.outExpo(k), color: P.annYellow, width: 4, alpha: 1 - k * 0.8, seed: sd + 5 });
      }

      // la llave: sale en 1.5, aterriza en 2.0
      if (tt >= 1.5) {
        const u = E.outCubic(L.clamp((tt - 1.5) / 0.5));
        const sx = (r2.x0 + r2.x1) / 2 + 40, sy = (r2.y0 + r2.y1) / 2;
        const cx = L.lerp(sx, END[0], u), cy = L.lerp(sy, END[1], u) - Math.sin(u * Math.PI) * 140;
        const s = L.lerp(0.25, S1, u);
        // estela
        if (u < 1) {
          const pts = [];
          for (let i = 0; i <= 16; i++) {
            const v = (i / 16) * u;
            pts.push([L.lerp(sx, END[0], v), L.lerp(sy, END[1], v) - Math.sin(v * Math.PI) * 140]);
          }
          ctx.save();
          ctx.setLineDash([14, 10]);
          L.inkPath(ctx, pts, { width: 3, color: P.annBlue, alpha: 0.8, seed: sd + 7 });
          ctx.restore();
        }
        // sombra al aterrizar
        if (u >= 1) {
          ctx.save();
          ctx.globalAlpha = 0.14;
          ctx.fillStyle = P.ink;
          ctx.beginPath();
          ctx.ellipse(END[0] + 30, END[1] + 330, 330, 20, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
        C.key(ctx, { x: cx, y: cy, s, rot: (1 - u) * -0.5, seed: 171 });
        // llavero colgando del aro: desde 2.5
        const bow = [cx - 180 * s, cy];
        if (tt >= 2.5) {
          const a = tt - 2.5;
          const swing = 0.32 * Math.sin(a * 7) * Math.exp(-a * 1.6);
          const pop = E.outBack(L.clamp(a / 0.125));
          ctx.save();
          ctx.translate(bow[0] - 12 * s, bow[1]);
          ctx.scale(pop * 1.25, pop * 1.25);
          house(ctx, L, P, 0, 0, swing, sd + 20);
          ctx.restore();
        }
        // brillo al aterrizar
        if (tt >= 2.0 && tt < 2.5) {
          const k = L.clamp((tt - 2.0) / 0.4);
          for (let i = 0; i < 8; i++) {
            const a = (i / 8) * Math.PI * 2 + 0.3;
            const r0 = 360 + 40 * k, r1b = 390 + 80 * k;
            L.inkPath(ctx, [[END[0] + Math.cos(a) * r0, END[1] + Math.sin(a) * r0 * 0.55], [END[0] + Math.cos(a) * r1b, END[1] + Math.sin(a) * r1b * 0.55]], {
              width: 5, color: P.annYellow, alpha: 1 - k, seed: sd + 30 + i,
            });
          }
        }
      }

      C.caption(ctx, 'La clave de Evolution es como la llave de tu casa', L.clamp(t / 0.25));
    },
  });
})();
