// 08 odoo-ficticio : plano azul. El cuaderno de Odoo en contorno. Página izquierda "Clientes": tres nombres
// inventados con tilde en t 0.5, 1.0, 1.5 (T 24.5, 25, 25.5). Página derecha: en t 2.0 (T 26) aparecen clientes,
// proveedores y empleados reales; en t 2.5 (T 26.5) se tachan en magenta. Rótulo "Regla 4 · En Odoo, solo datos ficticios".
(function () {
  'use strict';
  const ID = 'odoo-ficticio';
  const FAKE = ['Cliente de prueba 1', 'Cliente de prueba 2', 'Ana Ejemplo'];
  const REAL = ['clientes reales', 'proveedores reales', 'empleados reales'];

  FILM.scene({
    id: ID,
    draw(ctx, t, info) {
      const L = info.lib, P = L.pal, C = FILM.cast, E = L.ease;
      t = L.clamp(t, 0, info.dur);
      const tt = L.onTwos(t);
      const sd = L.hash(ID) & 0xffff;

      L.blueprint(ctx, { seed: 217, center: [960, 500], circles: 0, diagonals: 0 });

      const nb = C.notebook(ctx, { x: 960, y: 500, w: 1100, h: 600, schem: true, seed: 103 });
      const row = (i) => nb.rows[i] - 14;
      const lx = nb.left.x0 + 40, rx = nb.right.x0 + 36;
      C.tag(ctx, 'Odoo', 960, 140, { schem: true, size: 50, seed: sd + 1 });

      L.text(ctx, 'Clientes', lx, row(0), { size: 48, weight: 700, color: P.lineWhite });
      FAKE.forEach((name, i) => {
        const at = 0.5 + i * 0.5;
        if (tt < at - 0.25) return;
        const p = L.clamp((tt - (at - 0.25)) / 0.25);
        L.text(ctx, name, lx, row(i + 1), { size: 40, weight: 600, color: P.lineWhite, p });
        if (tt >= at) {
          const k = E.outCubic(L.clamp((tt - at) / 0.15));
          const cx = nb.left.x1 - 50, cy = row(i + 1) - 14;
          L.inkPath(ctx, [[cx - 22, cy], [cx - 6, cy + 18], [cx + 26, cy - 22]], { color: P.schemGreen, width: 6, draw: k, smooth: false, seed: sd + 10 + i });
        }
      });
      if (tt >= 1.75) {
        L.text(ctx, 'datos inventados', lx, row(5), { size: 42, weight: 700, color: P.schemGreen, alpha: L.clamp((tt - 1.75) / 0.25) });
      }

      // la otra página: nunca datos reales
      if (tt >= 2.0) {
        const k = L.clamp((tt - 2.0) / 0.2);
        L.text(ctx, 'Nunca', rx, row(0), { size: 48, weight: 700, color: P.magenta, alpha: k });
        REAL.forEach((s, i) => L.text(ctx, s, rx, row(i + 1), { size: 40, weight: 600, color: P.lineWhite, alpha: k }));
        if (tt >= 2.5) {
          const kk = E.outExpo(L.clamp((tt - 2.5) / 0.25));
          REAL.forEach((s, i) => {
            const y = row(i + 1) - 14;
            L.inkPath(ctx, [[rx - 10, y + 2], [rx + 400, y - 2]], { color: P.magenta, width: 6, draw: kk, seed: sd + 20 + i });
          });
          const cx = (nb.right.x0 + nb.right.x1) / 2, cy = row(2) - 10;
          const r = L.clamp((tt - 2.5) / 0.5);
          L.inkCircle(ctx, cx, cy, 200 + 80 * E.outExpo(r), { ry: 140 + 50 * E.outExpo(r), color: P.magenta, width: 3, alpha: 1 - r, seed: sd + 30 });
        }
      }

      C.caption(ctx, 'Regla 4 · En Odoo, solo datos ficticios', L.clamp(t / 0.25), { schem: true });
    },
  });
})();
