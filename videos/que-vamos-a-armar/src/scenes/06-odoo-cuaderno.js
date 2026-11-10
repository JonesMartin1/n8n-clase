// 06 odoo-cuaderno : el cuaderno de la empresa (Odoo). Dos pedidos ya anotados; en T 18 (t 1.0) se escribe el
// renglón nuevo hasta T 19 (t 2.0); en T 19.5 (t 2.5) tilde verde grande.
(function () {
  'use strict';
  const ID = 'odoo-cuaderno';
  const OLD = [['N° 10 · Juan', '1 docena de carne'], ['N° 11 · Laura', '3 docenas mixtas']];
  const NEW = ['N° 12 · Ana', '2 docenas de empanadas'];

  FILM.scene({
    id: ID,
    draw(ctx, t, info) {
      const L = info.lib, P = L.pal, C = FILM.cast, E = L.ease;
      t = L.clamp(t, 0, info.dur);
      const tt = L.onTwos(t);
      const sd = L.hash(ID) & 0xffff;

      L.paper(ctx, { color: P.paperCream, seed: 13 });

      const nb = C.notebook(ctx, { x: 960, y: 505, w: 1000, h: 670, seed: 101 });
      const lx = nb.left.x0 + 40, rx = nb.right.x0 + 34;
      const row = (i) => nb.rows[i] - 14;

      L.text(ctx, 'Pedidos', lx, row(0), { size: 48, weight: 700, color: P.odooPlum });
      L.text(ctx, 'Qué pidió', rx, row(0), { size: 48, weight: 700, color: P.odooPlum });
      OLD.forEach(([a, b], i) => {
        L.text(ctx, a, lx, row(i + 1), { size: 40, weight: 500, color: P.inkSoft, alpha: 0.8 });
        L.text(ctx, b, rx, row(i + 1), { size: 40, weight: 500, color: P.inkSoft, alpha: 0.8 });
      });

      // renglón nuevo: resaltado cuando queda anotado
      const yN = row(3);
      if (tt >= 2.5) {
        const k = L.clamp((tt - 2.5) / 0.25);
        L.wash(ctx, L.rectPts(nb.left.x0 + 20, yN - 42, nb.right.x1 - nb.left.x0 - 40, 58, 24), { color: P.washYellow, alpha: 0.55, p: k, seed: sd + 3 });
      }
      if (tt >= 1.0) {
        const total = NEW[0].length + NEW[1].length;
        const n = Math.round(L.clamp((tt - 1.0) / 1.0) * total);
        const a = NEW[0].slice(0, Math.min(n, NEW[0].length));
        const b = NEW[1].slice(0, Math.max(0, n - NEW[0].length));
        L.text(ctx, a, lx, yN, { size: 40, weight: 700, color: P.ink });
        L.text(ctx, b, rx, yN, { size: 40, weight: 700, color: P.ink });
        if (tt < 2.17) {
          // lápiz en la punta de lo que se escribe
          ctx.save();
          ctx.font = '700 40px "SF Pro Rounded", ui-rounded, "Helvetica Neue", system-ui, "Segoe UI", Arial, sans-serif';
          const px = b.length ? rx + ctx.measureText(b).width : lx + ctx.measureText(a).width;
          ctx.restore();
          ctx.save();
          ctx.translate(px + 8, yN - 6);
          ctx.rotate(-0.7);
          const wob = Math.sin(tt * 30) * 2;
          L.inkPath(ctx, L.rrectPts(6, -12 + wob, 150, 24, 4, 10), { closed: true, width: 3, fill: P.legoYellow, seed: sd + 10 });
          L.inkPath(ctx, [[6, -12 + wob], [-18, wob], [6, 12 + wob]], { closed: true, width: 3, fill: P.tan, smooth: false, seed: sd + 11 });
          L.inkPath(ctx, L.rrectPts(150, -12 + wob, 26, 24, 4, 8), { closed: true, width: 3, fill: P.rose, seed: sd + 12 });
          ctx.restore();
        }
      }

      // tilde verde
      if (tt >= 2.5) {
        const k = E.outCubic(L.clamp((tt - 2.5) / 0.25));
        const cx = nb.right.x1 + 85, cy = yN - 20;
        L.inkPath(ctx, [[cx - 60, cy], [cx - 18, cy + 46], [cx + 70, cy - 70]], { color: P.okGreen, width: 16, draw: k, smooth: false, seed: sd + 20, taper: [6, 14] });
      }

      C.tag(ctx, 'Odoo', nb.left.x0 + 40, 140, { size: 52, fill: P.odooPlum, color: P.white, rot: -0.06, seed: sd + 1 });

      C.caption(ctx, '4 · Odoo: el cuaderno de la empresa', L.clamp(t / 0.25));
    },
  });
})();
