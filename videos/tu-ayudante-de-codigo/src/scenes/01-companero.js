// 01 companero : "vos" a la izquierda y la compu-ayudante con cara a la derecha. t 0.5 pop de vos, t 1.0 pop de la
// compu y el tag "tu ayudante", t 1.5 globo "¡Te lo armo!", t 2.0 sale una hoja de código (guiño),
// t 2.5 tag "…pero a veces se equivoca muy seguro" (cejas arriba). Rótulo "Un agente de código: …".
(function () {
  'use strict';
  const ID = 'companero';
  const YOU = [430, 520];
  const LAP = [1290, 440];
  const DOC = [800, 560];
  const CAPTION = 'Un agente de código: un compañero que sabe programar';
  const WARN = '…pero a veces se equivoca muy seguro';

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
      L.stripes(ctx, { colors: [P.stripeCream, P.stripeSky], width: 150, offset: tt * 24, seed: sd });
      ctx.restore();

      // vos: pop en 0.5
      if (tt >= 0.5) {
        const k = E.outBack(L.clamp((tt - 0.5) / 0.125));
        ctx.save();
        ctx.translate(YOU[0], YOU[1]);
        ctx.scale(k, k);
        C.person(ctx, { x: 0, y: 0, s: 1.15, fill: P.teal, seed: 311 });
        ctx.restore();
        L.text(ctx, 'vos', YOU[0], 760, { size: 50, weight: 700, align: 'center', color: P.ink, alpha: L.clamp((tt - 0.5) / 0.25) });
      }

      // la compu-ayudante: pop en 1.0
      if (tt >= 1.0) {
        const k = E.outBack(L.clamp((tt - 1.0) / 0.125));
        const a = tt - 1.0;
        const bob = Math.sin(a * 4) * 6;
        const blink = tt >= 3.2 && tt < 3.3 ? 1 : 0;
        ctx.save();
        ctx.translate(LAP[0], LAP[1] + bob);
        ctx.scale(k, k);
        C.laptop(ctx, {
          x: 0, y: 0, w: 560, h: 360, seed: 331,
          blink, wink: tt >= 2.1 && tt < 2.4, look: tt < 2.0 ? -0.6 : -0.2,
          sure: tt >= 2.5 ? E.outBack(L.clamp((tt - 2.5) / 0.2)) : 0,
        });
        ctx.restore();
        C.tag(ctx, 'tu ayudante', LAP[0], 175, { size: 46, fill: P.agentScreen, rot: 0.03, pop: E.outBack(L.clamp((tt - 1.0) / 0.125)), seed: sd + 1 });
      }

      // globo "¡Te lo armo!": 1.5
      if (tt >= 1.5) {
        C.bubble(ctx, { x: 990, y: 250, w: 380, side: 'right', lines: ['¡Te lo armo!'], size: 46, fill: P.agentScreen, pop: E.outBack(L.clamp((tt - 1.5) / 0.125)), seed: sd + 2 });
      }

      // la hoja de código: 2.0
      if (tt >= 2.0) {
        const u = E.outCubic(L.clamp((tt - 2.0) / 0.35));
        const x = L.lerp(LAP[0] - 200, DOC[0], u), y = L.lerp(LAP[1] + 40, DOC[1], u) - Math.sin(u * Math.PI) * 90;
        const s = L.lerp(0.3, 1, u);
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(s, s);
        ctx.rotate(-0.06 * u);
        const r = C.doc(ctx, { x: 0, y: 0, w: 250, h: 310, lines: 0, seed: 241 });
        L.text(ctx, '{ }', 0, -40, { size: 96, weight: 700, align: 'center', color: P.teal });
        const cols = [P.orange, P.teal, P.ochre, P.inkFaint];
        [0, 1, 2, 3].forEach((i) => {
          const w = [150, 110, 170, 90][i];
          L.inkPath(ctx, [[r.x0 + 40 + (i % 2) * 24, 30 + i * 32], [r.x0 + 40 + (i % 2) * 24 + w, 30 + i * 32]], { width: 9, color: cols[i], seed: sd + 10 + i });
        });
        ctx.restore();
        if (tt >= 2.0 && tt < 2.6) {
          const k = L.clamp((tt - 2.0) / 0.5);
          for (let i = 0; i < 7; i++) {
            const ang = (i / 7) * Math.PI * 2 + 0.4;
            const r0 = 190 + 30 * k, r1 = 220 + 70 * k;
            L.inkPath(ctx, [[DOC[0] + Math.cos(ang) * r0, DOC[1] + Math.sin(ang) * r0], [DOC[0] + Math.cos(ang) * r1, DOC[1] + Math.sin(ang) * r1]], {
              width: 5, color: P.annYellow, alpha: 1 - k, seed: sd + 20 + i,
            });
          }
        }
      }

      // la advertencia: 2.5
      if (tt >= 2.5) {
        C.tag(ctx, WARN, 960, 840, { size: 46, fill: P.keyPale, rot: -0.02, pop: E.outBack(L.clamp((tt - 2.5) / 0.125)), seed: sd + 3 });
        const k = L.clamp((tt - 2.5) / 0.5);
        L.inkCircle(ctx, LAP[0], LAP[1] - 40, 300 + 60 * E.outExpo(k), { ry: 230 + 40 * E.outExpo(k), color: P.annMagenta, width: 4, alpha: 1 - k, seed: sd + 4 });
      }

      C.caption(ctx, CAPTION, L.clamp(t / 0.25));
    },
  });
})();
