// 05 regla-clave : Regla 1. El nodo Datos (G1, el mismo del video 3) con abc123••••. t 0.5 (T 16.5) la compu pide
// "Pasame tu clave"; t 1.0 la llave sale del valor hacia la compu; t 1.5 choca contra la cruz roja y vuelve;
// t 2.0–2.4 la clave se cambia por PEGAR_ACA; t 2.5 sale el flujo hacia la compu con tilde; t 3.0 tag.
// Rótulo "Regla 1 · Nunca le pegues una clave".
(function () {
  'use strict';
  const ID = 'regla-clave';
  const LAP = [1490, 450];
  const STOP = [1060, 470];
  const TIP = 'la clave la ponés vos, a mano, en n8n';

  FILM.scene({
    id: ID,
    draw(ctx, t, info) {
      const L = info.lib, P = L.pal, C = FILM.cast, E = L.ease;
      t = L.clamp(t, 0, info.dur);
      const tt = L.onTwos(t);
      const sd = L.hash(ID) & 0xffff;

      L.paper(ctx, { seed: 13 });
      ctx.save();
      ctx.globalAlpha = 0.5;
      L.stripes(ctx, { colors: [P.stripeCream, P.stripeYellow], width: 150, offset: tt * 30, seed: sd });
      ctx.restore();

      const swap = tt >= 2.0;
      const card = C.card(ctx, { highlight: tt >= 0.5 && tt < 2.0 ? E.outCubic(L.clamp((tt - 0.5) / 0.25)) : 0, seed: 291 });
      const [r1, r2] = card.rows;
      C.tag(ctx, 'n8n', 250, 196, { size: 46, rot: -0.06, seed: sd + 1 });
      L.text(ctx, 'tu flujo', 380, 210, { size: 40, weight: 600, color: P.inkSoft });
      L.text(ctx, 'https://…', r1.x0 + 20, r1.base, { size: 40, weight: 500, color: P.inkSoft });
      if (!swap || tt < 2.2) {
        const fade = swap ? 1 - L.clamp((tt - 2.0) / 0.2) : 1;
        L.text(ctx, 'abc123••••', r2.x0 + 20, r2.base, { size: 40, weight: 700, color: P.ink, alpha: fade });
        if (swap) L.inkPath(ctx, [[r2.x0 + 10, r2.base - 14], [r2.x1 - 10, r2.base - 16]], { color: P.alertRed, width: 6, draw: E.outExpo(L.clamp((tt - 2.0) / 0.1)), alpha: fade, seed: sd + 2 });
      }
      if (tt >= 2.2) {
        L.text(ctx, 'PEGAR_ACA', r2.x0 + 20, r2.base, { size: 40, weight: 800, color: P.okGreen, p: L.clamp((tt - 2.2) / 0.3) });
      }

      // la compu
      const asking = tt >= 0.5 && tt < 2.0;
      C.laptop(ctx, {
        x: LAP[0], y: LAP[1], w: 440, h: 290, seed: 337, look: -0.8,
        sure: asking ? 0.6 : 0, smile: tt >= 2.5 ? 1 : asking ? 0.6 : 0.8,
        blink: tt >= 1.5 && tt < 1.6 ? 1 : 0,
      });
      if (tt >= 0.5 && tt < 2.0) {
        const pop = E.outBack(L.clamp((tt - 0.5) / 0.125));
        C.bubble(ctx, { x: 1280, y: 140, w: 440, side: 'left', lines: ['Pasame tu clave'], size: 46, fill: P.agentScreen, pop, seed: sd + 3 });
      }

      // la llave intenta ir a la compu y choca con la cruz
      if (tt >= 1.0 && tt < 2.0) {
        const sx = r2.x1 + 110, sy = (r2.y0 + r2.y1) / 2;
        let x, y, s, rot = 0;
        if (tt < 1.5) {
          const u = E.inCubic(L.clamp((tt - 1.0) / 0.5));
          x = L.lerp(sx, STOP[0] - 170, u);
          y = L.lerp(sy, STOP[1], u) - Math.sin(u * Math.PI) * 30;
          s = L.lerp(0.25, 0.55, u);
        } else {
          const u = E.outCubic(L.clamp((tt - 1.5) / 0.45));
          x = L.lerp(STOP[0] - 170, sx, u);
          y = L.lerp(STOP[1], sy, u) - Math.sin(u * Math.PI) * 40;
          s = L.lerp(0.55, 0.25, u);
          rot = 0.6 * Math.sin(u * Math.PI);
        }
        C.key(ctx, { x, y, s, rot, seed: 171, holeFill: P.paper });
      }
      if (tt >= 1.25 && tt < 2.3) {
        const k = E.outBack(L.clamp((tt - 1.25) / 0.2));
        const a = tt >= 2.0 ? 1 - L.clamp((tt - 2.0) / 0.3) : 1;
        const hit = tt >= 1.5 ? tt - 1.5 : 0;
        const sh = hit > 0 ? 8 * Math.sin(hit * 50) * Math.exp(-hit * 6) : 0;
        ctx.save();
        ctx.globalAlpha *= a;
        ctx.translate(STOP[0] + sh, STOP[1]);
        ctx.scale(k, k);
        L.inkCircle(ctx, 0, 0, 110, { width: 6, color: P.ink, fill: P.alertRed, seed: sd + 4 });
        L.inkPath(ctx, [[-50, -50], [50, 50]], { width: 22, color: P.white, seed: sd + 5 });
        L.inkPath(ctx, [[50, -50], [-50, 50]], { width: 22, color: P.white, seed: sd + 6 });
        ctx.restore();
        if (tt >= 1.5) {
          L.text(ctx, '¡No!', STOP[0], STOP[1] + 190, { size: 60, weight: 800, align: 'center', color: P.alertRed, alpha: a * L.clamp((tt - 1.5) / 0.1) });
          const r = L.clamp((tt - 1.5) / 0.4);
          L.inkCircle(ctx, STOP[0], STOP[1], 130 + 90 * E.outExpo(r), { color: P.annMagenta, width: 4, alpha: (1 - r) * a, seed: sd + 7 });
        }
      }

      // sale el flujo con PEGAR_ACA: 2.5
      if (tt >= 2.5) {
        const p = E.outCubic(L.clamp((tt - 2.5) / 0.25));
        C.arrow(ctx, 860, 470, LAP[0] - 250, 470, { p, color: P.okGreen, width: 7, seed: sd + 8 });
        L.text(ctx, 'con PEGAR_ACA', 1030, 425, { size: 40, weight: 700, align: 'center', color: P.okGreen, alpha: p });
        const k = E.outCubic(L.clamp((tt - 2.6) / 0.2));
        const cx = LAP[0] + 230, cy = LAP[1] - 160;
        L.inkCircle(ctx, cx, cy, 44, { width: 4, color: P.ink, fill: P.okGreen, seed: sd + 9, draw: k });
        L.inkPath(ctx, [[cx - 20, cy], [cx - 5, cy + 16], [cx + 22, cy - 16]], { width: 8, color: P.white, smooth: false, draw: k, seed: sd + 10 });
      }

      // tag: 3.0
      if (tt >= 3.0) {
        C.tag(ctx, TIP, 960, 820, { size: 46, fill: P.keyPale, rot: -0.02, pop: E.outBack(L.clamp((tt - 3.0) / 0.125)), seed: sd + 11 });
      }

      C.caption(ctx, 'Regla 1 · Nunca le pegues una clave', L.clamp(t / 0.25));
    },
  });
})();
