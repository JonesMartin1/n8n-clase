// 04 pegar-aca : plano azul. El nodo Datos (G1) en contorno. t 0.5 (T 11) la clave se tacha en magenta y se va;
// t 1.0–1.5 se escribe PEGAR_ACA; t 2.0 (T 12.5) flecha "Exportar" al documento del flujo, que muestra PEGAR_ACA;
// t 2.5 (T 13) tilde verde. Rótulo "Regla 1 · Antes de exportar, cambiala por PEGAR_ACA".
(function () {
  'use strict';
  const ID = 'pegar-aca';
  const DOC = { x: 1460, y: 470, w: 380, h: 420 };

  FILM.scene({
    id: ID,
    draw(ctx, t, info) {
      const L = info.lib, P = L.pal, C = FILM.cast, E = L.ease;
      t = L.clamp(t, 0, info.dur);
      const tt = L.onTwos(t);
      const sd = L.hash(ID) & 0xffff;

      L.blueprint(ctx, { seed: 211, center: [490, 470], circles: 0, diagonals: 0 });
      L.guideCircle(ctx, 490, 470, 420, { alpha: 0.14, width: 1.5 });

      const card = C.card(ctx, { schem: true, seed: 291 });
      const [r1, r2] = card.rows;
      C.tag(ctx, 'n8n', 250, 196, { schem: true, size: 46, rot: -0.06, seed: sd + 1 });
      L.text(ctx, 'https://…', r1.x0 + 20, r1.base, { size: 40, weight: 500, color: P.lavender });

      // la clave vieja: se tacha en 0.5 y se desvanece hasta 1.0
      if (tt < 1.0) {
        const fade = tt >= 0.6 ? 1 - L.clamp((tt - 0.6) / 0.4) : 1;
        L.text(ctx, 'abc123••••', r2.x0 + 20, r2.base, { size: 40, weight: 700, color: P.lineWhite, alpha: fade });
        if (tt >= 0.5) {
          const k = E.outExpo(L.clamp((tt - 0.5) / 0.25));
          L.inkPath(ctx, [[r2.x0 + 10, r2.base - 14], [r2.x1 - 10, r2.base - 16]], { color: P.magenta, width: 6, draw: k, alpha: fade, seed: sd + 3 });
          L.inkCircle(ctx, (r2.x0 + r2.x1) / 2, (r2.y0 + r2.y1) / 2, 180 + 40 * k, { ry: 60 + 14 * k, color: P.magenta, width: 3, alpha: (1 - k) * fade, seed: sd + 4 });
        }
      }
      // PEGAR_ACA: 1.0 a 1.5
      if (tt >= 1.0) {
        const p = L.clamp((tt - 1.0) / 0.5);
        L.text(ctx, 'PEGAR_ACA', r2.x0 + 20, r2.base, { size: 40, weight: 700, color: P.schemGreen, p });
        if (p >= 1) {
          const k = L.clamp((tt - 1.5) / 0.3);
          L.inkCircle(ctx, (r2.x0 + r2.x1) / 2, (r2.y0 + r2.y1) / 2, 170 + 30 * E.outExpo(k), { ry: 54 + 10 * k, color: P.schemGreen, width: 3, alpha: 1 - k, seed: sd + 5 });
        }
      }

      // exportar: 2.0
      if (tt >= 2.0) {
        const p = L.clamp((tt - 2.0) / 0.25);
        C.arrow(ctx, 850, 470, DOC.x - DOC.w / 2 - 30, 470, { schem: true, p, color: P.lineWhite, seed: sd + 6 });
        L.text(ctx, 'Exportar', 1060, 430, { size: 44, weight: 700, align: 'center', color: P.lineWhite, alpha: p });
      }
      const dk = tt >= 2.0 ? 1 : 0.35;
      ctx.save();
      ctx.globalAlpha = dk;
      const d = C.doc(ctx, { x: DOC.x, y: DOC.y, w: DOC.w, h: DOC.h, lines: 0, schem: true, seed: 237 });
      ctx.restore();
      L.text(ctx, 'flujo del bot', d.x0 + 34, d.y0 + 74, { size: 42, weight: 700, color: P.lineWhite, alpha: dk });
      ctx.save();
      ctx.globalAlpha = 0.5 * dk;
      for (const yy of [120, 330]) L.inkPath(ctx, [[d.x0 + 34, d.y0 + yy], [d.x1 - 40, d.y0 + yy]], { color: P.lavender, width: 3, seed: sd + 7 + yy });
      ctx.restore();
      if (tt >= 2.25) {
        const k = L.clamp((tt - 2.25) / 0.2);
        L.text(ctx, 'evo_apikey:', d.x0 + 34, d.y0 + 200, { size: 40, weight: 600, color: P.lavender, alpha: k });
        L.text(ctx, 'PEGAR_ACA', d.x0 + 34, d.y0 + 262, { size: 44, weight: 700, color: P.schemGreen, alpha: k });
      }

      // tilde: 2.5
      if (tt >= 2.5) {
        const k = E.outCubic(L.clamp((tt - 2.5) / 0.2));
        const cx = d.x1 + 50, cy = d.y1 - 30;
        L.glowDot(ctx, cx, cy, 30, { color: P.schemGreen, rays: 0, intensity: 0.5 * k, seed: sd + 8 });
        L.inkPath(ctx, [[cx - 55, cy - 5], [cx - 15, cy + 38], [cx + 65, cy - 70]], { color: P.schemGreen, width: 12, draw: k, smooth: false, seed: sd + 9, taper: [6, 10] });
      }

      C.caption(ctx, 'Regla 1 · Antes de exportar, cambiala por PEGAR_ACA', L.clamp(t / 0.25), { schem: true });
    },
  });
})();
