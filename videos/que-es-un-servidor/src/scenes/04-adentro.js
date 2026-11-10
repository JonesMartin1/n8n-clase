// 04 adentro : plano azul. "tu servidor" (x 260–1200, y 220–780) se traza en t 0–0.5; Evolution entra en
// T 11.0 (t 0.5), n8n en 11.5 (t 1.0); en 12.5 (t 2.0) la nube de Odoo, afuera y aparte.
(function () {
  'use strict';
  const ID = 'adentro';
  const BX0 = 260, BY0 = 220, BX1 = 1200, BY1 = 780;
  const OX = 1610; // centro de la nube de Odoo

  function cloudPts(cx, cy, w, h) {
    const pts = [];
    for (let i = 0; i < 60; i++) {
      const a = (i / 60) * Math.PI * 2;
      const r = 1 + 0.14 * Math.cos(a * 5 + 1.2);
      pts.push([cx + Math.cos(a) * (w / 2) * r, cy + Math.sin(a) * (h / 2) * r]);
    }
    return pts;
  }

  FILM.scene({
    id: ID,
    draw(ctx, t, info) {
      const L = info.lib, P = L.pal, C = FILM.cast, E = L.ease;
      t = L.clamp(t, 0, info.dur);
      const tt = L.onTwos(t);
      const sd = L.hash(ID) & 0xffff;

      L.blueprint(ctx, { seed: 213, center: [730, 500], circles: 1, diagonals: 0 });

      // la caja
      const kBox = E.inOutSine(L.clamp(t / 0.5));
      L.inkPath(ctx, L.rrectPts(BX0, BY0, BX1 - BX0, BY1 - BY0, 28, 24), { closed: true, color: P.lavender, width: 2, alpha: 0.3, seed: sd + 1 });
      L.inkPath(ctx, L.rrectPts(BX0, BY0, BX1 - BX0, BY1 - BY0, 28, 24), { closed: true, color: P.lineWhite, width: 4, draw: Math.max(0.001, kBox), seed: sd + 1 });
      if (kBox >= 1) {
        C.tag(ctx, 'tu servidor', 730, BY0, { schem: true, size: 48, seed: sd + 2 });
        const beat = 0.5 + 0.5 * Math.cos(((t % 0.5) / 0.5) * Math.PI * 2);
        L.glowDot(ctx, BX1 - 56, BY0 + 56, 11 + 5 * beat, { color: P.schemGreen, rays: 0, intensity: 0.6 + 0.4 * beat, seed: sd + 3 });
      }

      // los nodos
      const nodes = [
        { x: 500, name: 'Evolution', sub: 'el celular virtual', at: 0.5, r: 135 },
        { x: 960, name: 'n8n', sub: 'la caja de LEGO', at: 1.0, r: 125 },
      ];
      nodes.forEach((n, i) => {
        if (tt < n.at) return;
        const k = E.outBack(L.clamp((tt - n.at) / 0.125));
        ctx.save();
        ctx.translate(n.x, 500);
        ctx.scale(k, k);
        L.inkCircle(ctx, 0, 0, n.r, { color: P.schemGreen, width: 3.6, seed: sd + 10 + i });
        L.inkCircle(ctx, 0, 0, n.r - 10, { color: P.schemGreen, width: 1.5, alpha: 0.5, seed: sd + 12 + i });
        L.text(ctx, n.name, 0, 14, { size: 46, weight: 700, align: 'center', color: P.lineWhite });
        ctx.restore();
        if (k >= 1) L.text(ctx, n.sub, n.x, 690, { size: 40, weight: 600, align: 'center', color: P.lavender, alpha: L.clamp((tt - n.at) / 0.25) });
        // flash magenta al entrar
        const f = L.clamp((t - n.at) / 0.5);
        if (f > 0 && f < 1) {
          ctx.save();
          ctx.globalAlpha = 1 - f;
          ctx.strokeStyle = P.magenta;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(n.x, 500, n.r + 10 + 40 * E.outExpo(f), 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }
      });
      if (tt >= 1.125) C.arrow(ctx, 645, 500, 825, 500, { schem: true, p: L.clamp((t - 1.125) / 0.25), seed: sd + 15 });

      // la línea que separa: Odoo está aparte
      if (tt >= 1.75) {
        const k = L.clamp((t - 1.75) / 0.25);
        ctx.save();
        ctx.strokeStyle = P.lavender;
        ctx.globalAlpha = 0.7;
        ctx.lineWidth = 2.5;
        ctx.setLineDash([14, 10]);
        ctx.beginPath();
        ctx.moveTo(1330, 160);
        ctx.lineTo(1330, 160 + 680 * k);
        ctx.stroke();
        ctx.restore();
      }

      // la nube de Odoo en 2.0
      if (tt >= 2.0) {
        const k = L.clamp((t - 2.0) / 0.25);
        L.inkPath(ctx, cloudPts(1610, 480, 340, 210), { closed: true, color: P.lavender, width: 3, draw: k, seed: sd + 20 });
        if (k >= 1) {
          L.text(ctx, 'Odoo', OX, 500, { size: 56, weight: 700, align: 'center', color: P.lineWhite });
          L.text(ctx, 'aparte,', OX, 660, { size: 42, weight: 600, align: 'center', color: P.lavender });
          L.text(ctx, 'en su nube', OX, 710, { size: 42, weight: 600, align: 'center', color: P.lavender });
          C.arrow(ctx, 1090, 560, 1440, 540, { schem: true, p: L.clamp((t - 2.25) / 0.25), bend: 40, seed: sd + 21 });
        }
      }

      C.caption(ctx, 'Adentro viven Evolution y n8n; Odoo está aparte', L.clamp(t / 0.25), { schem: true });
    },
  });
})();
