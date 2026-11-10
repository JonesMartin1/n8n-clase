// 07 explicalo : Regla 3, en el Coloquio. t 0.5 (T 24.5) el docente pregunta "¿Por qué pusiste este nodo?";
// t 1.0 la compu quiere contestar y la tacha una cruz (se duerme); t 1.5 vos contestás con tus palabras;
// t 2.0 tilde; t 2.5 tag "pedile que te explique hasta entenderlo". Rótulo "Regla 3 · Tenés que poder explicarlo vos".
(function () {
  'use strict';
  const ID = 'explicalo';
  const YOU = [330, 520];
  const PROF = [1600, 520];
  const LAP = [1120, 570];
  const Q = ['¿Por qué pusiste', 'este nodo?'];
  const A = ['Lo puse para crear', 'el pedido en Odoo'];

  FILM.scene({
    id: ID,
    draw(ctx, t, info) {
      const L = info.lib, P = L.pal, C = FILM.cast, E = L.ease;
      t = L.clamp(t, 0, info.dur);
      const tt = L.onTwos(t);
      const sd = L.hash(ID) & 0xffff;

      L.paper(ctx, { seed: 17 });
      ctx.save();
      ctx.globalAlpha = 0.45;
      L.stripes(ctx, { colors: [P.stripeSage, P.stripeSpring], width: 150, offset: tt * 20, seed: sd });
      ctx.restore();

      C.tag(ctx, 'Coloquio', 960, 160, { size: 52, fill: P.white, rot: -0.03, seed: sd + 1 });

      // la mesa
      L.inkPath(ctx, L.rrectPts(160, 680, 1600, 34, 12, 20), { closed: true, width: 4, fill: P.wood, seed: sd + 2 });

      // vos y el docente
      C.person(ctx, { x: YOU[0], y: YOU[1], s: 1.05, fill: P.teal, seed: 315 });
      C.person(ctx, { x: PROF[0], y: PROF[1], s: 1.05, fill: P.odooPlum, seed: 317 });
      L.text(ctx, 'vos', YOU[0], 780, { size: 48, weight: 700, align: 'center', color: P.ink });
      L.text(ctx, 'docente', PROF[0], 780, { size: 48, weight: 700, align: 'center', color: P.ink });

      // la pregunta: 0.5
      if (tt >= 0.5) {
        C.bubble(ctx, { x: 1490, y: 230, w: 520, side: 'right', lines: Q, size: 44, fill: P.white, pop: E.outBack(L.clamp((tt - 0.5) / 0.125)), seed: sd + 3 });
      }

      // la compu quiere contestar: 1.0, y queda tachada
      const crossed = tt >= 1.0;
      C.laptop(ctx, {
        x: LAP[0], y: LAP[1], w: 270, h: 180, seed: 341,
        sure: tt >= 0.75 && tt < 1.0 ? 1 : 0, sleep: tt >= 1.25, look: -0.6,
      });
      if (tt >= 0.75 && tt < 1.25) {
        L.text(ctx, '¡Yo sé!', LAP[0], LAP[1] - 130, { size: 44, weight: 800, align: 'center', color: P.agentFace, alpha: L.clamp((tt - 0.75) / 0.1) });
      }
      if (crossed) {
        const k = E.outCubic(L.clamp((tt - 1.0) / 0.2));
        L.inkPath(ctx, [[LAP[0] - 150, LAP[1] - 110], [LAP[0] + 150, LAP[1] + 130]], { width: 12, color: P.alertRed, draw: k, seed: sd + 4 });
        L.inkPath(ctx, [[LAP[0] + 150, LAP[1] - 110], [LAP[0] - 150, LAP[1] + 130]], { width: 12, color: P.alertRed, draw: L.clamp(k * 1.5 - 0.5), seed: sd + 5 });
        if (tt >= 1.25) L.text(ctx, 'z', LAP[0] + 110, LAP[1] - 120 - 10 * Math.sin(tt * 4), { size: 48, weight: 800, color: P.inkFaint });
      }

      // vos contestás: 1.5
      if (tt >= 1.5) {
        C.bubble(ctx, { x: 450, y: 330, w: 470, side: 'left', lines: A, size: 42, fill: P.bubbleOut, pop: E.outBack(L.clamp((tt - 1.5) / 0.125)), seed: sd + 6 });
      }
      // tilde: 2.0
      if (tt >= 2.0) {
        const k = E.outCubic(L.clamp((tt - 2.0) / 0.2));
        const cx = 870, cy = 300;
        L.inkCircle(ctx, cx, cy, 44, { width: 4, color: P.ink, fill: P.okGreen, seed: sd + 7, draw: k });
        L.inkPath(ctx, [[cx - 20, cy], [cx - 5, cy + 16], [cx + 22, cy - 16]], { width: 8, color: P.white, smooth: false, draw: k, seed: sd + 8 });
        const r = L.clamp((tt - 2.0) / 0.4);
        L.inkCircle(ctx, cx, cy, 60 + 50 * E.outExpo(r), { color: P.okGreen, width: 4, alpha: 1 - r, seed: sd + 9 });
      }

      // consejo: 2.5
      if (tt >= 2.5) {
        C.tag(ctx, 'pedile que te explique hasta entenderlo', 960, 860, { size: 44, fill: P.keyPale, rot: -0.015, pop: E.outBack(L.clamp((tt - 2.5) / 0.125)), seed: sd + 10 });
      }

      C.caption(ctx, 'Regla 3 · Tenés que poder explicarlo vos', L.clamp(t / 0.25));
    },
  });
})();
