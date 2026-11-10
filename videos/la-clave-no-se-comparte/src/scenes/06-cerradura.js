// 06 cerradura : plano azul. Cambiar la clave es cambiar la cerradura. t 0.5 (T 17.5) cae el candado viejo;
// t 1.0 (T 18) baja el nuevo, abierto; t 1.5 (T 18.5) cierra y aparece la llave nueva; t 2.0 (T 19) la llave vieja
// tiembla con una cruz: ya no abre; t 2.5 (T 19.5) tag "antes del Coloquio".
// Rótulo "Regla 3 · Si se filtró, cambiala (como la cerradura)".
(function () {
  'use strict';
  const ID = 'cerradura';
  const LOCK = [960, 500];
  const OLD = [370, 540], NEW = [1570, 540];

  FILM.scene({
    id: ID,
    draw(ctx, t, info) {
      const L = info.lib, P = L.pal, C = FILM.cast, E = L.ease;
      t = L.clamp(t, 0, info.dur);
      const tt = L.onTwos(t);
      const sd = L.hash(ID) & 0xffff;

      L.blueprint(ctx, { seed: 213, center: [960, 480], circles: 0, diagonals: 0 });
      L.guideCircle(ctx, LOCK[0], LOCK[1], 330, { alpha: 0.16, width: 1.5 });

      // candado viejo: cae en 0.5
      if (tt < 1.0) {
        const u = tt >= 0.5 ? L.clamp((tt - 0.5) / 0.45) : 0;
        const y = LOCK[1] + 420 * u * u;
        const a = 1 - u;
        C.padlock(ctx, { x: LOCK[0] + 60 * u, y, s: 1.3, rot: 0.7 * u, schem: true, lineColor: P.magenta, alpha: a, seed: 191 });
        if (tt >= 0.5) {
          const k = L.clamp((tt - 0.5) / 0.4);
          L.inkCircle(ctx, LOCK[0], LOCK[1] + 60, 160 + 90 * E.outExpo(k), { color: P.magenta, width: 3, alpha: 1 - k, seed: sd + 1 });
        }
      }

      // candado nuevo: baja en 1.0, cierra en 1.5
      if (tt >= 1.0) {
        const u = E.outCubic(L.clamp((tt - 1.0) / 0.35));
        const open = tt < 1.5 ? 1 : 1 - E.outCubic(L.clamp((tt - 1.5) / 0.1));
        C.padlock(ctx, { x: LOCK[0], y: L.lerp(LOCK[1] - 180, LOCK[1], u), s: 1.3, schem: true, lineColor: P.schemGreen, alpha: u, open, seed: 197 });
        if (tt >= 1.5) {
          const k = L.clamp((tt - 1.5) / 0.4);
          L.glowDot(ctx, LOCK[0], LOCK[1] + 45, 22, { color: P.schemGreen, rays: 0, intensity: 0.8 - 0.5 * k, seed: sd + 2 });
          L.inkCircle(ctx, LOCK[0], LOCK[1] + 60, 150 + 80 * E.outExpo(k), { color: P.schemGreen, width: 3, alpha: 1 - k, seed: sd + 3 });
        }
      }

      // llave vieja
      let shake = 0;
      if (tt >= 2.0) {
        const a = tt - 2.0;
        shake = 14 * Math.sin(a * 50) * Math.exp(-a * 4);
      }
      C.key(ctx, { x: OLD[0] + shake, y: OLD[1], s: 0.8, schem: true, color: P.lavender, seed: 177 });
      L.text(ctx, 'clave vieja', OLD[0] - 20, 680, { size: 42, weight: 600, align: 'center', color: P.lavender });
      if (tt >= 2.0) {
        const k = E.outCubic(L.clamp((tt - 2.0) / 0.2));
        const cx = OLD[0] - 20, cy = OLD[1];
        L.inkPath(ctx, [[cx - 80, cy - 80], [cx + 80, cy + 80]], { color: P.magenta, width: 9, draw: k, seed: sd + 4 });
        L.inkPath(ctx, [[cx + 80, cy - 80], [cx - 80, cy + 80]], { color: P.magenta, width: 9, draw: L.clamp(k * 1.5 - 0.5), seed: sd + 5 });
        L.text(ctx, 'ya no abre', cx, 740, { size: 44, weight: 700, align: 'center', color: P.magenta, alpha: k });
      }

      // llave nueva: 1.5
      if (tt >= 1.5) {
        const k = E.outBack(L.clamp((tt - 1.5) / 0.125));
        ctx.save();
        ctx.translate(NEW[0], NEW[1]);
        ctx.scale(k, k);
        C.key(ctx, { x: 0, y: 0, s: 0.8, schem: true, color: P.schemGreen, seed: 179 });
        ctx.restore();
        L.text(ctx, 'clave nueva', NEW[0] - 20, 680, { size: 42, weight: 700, align: 'center', color: P.schemGreen, alpha: L.clamp((tt - 1.5) / 0.2) });
      }

      // antes del Coloquio: 2.5
      if (tt >= 2.5) {
        C.tag(ctx, 'antes del Coloquio', 960, 175, { schem: true, size: 46, pop: E.outBack(L.clamp((tt - 2.5) / 0.125)), seed: sd + 6 });
      }

      C.caption(ctx, 'Regla 3 · Si se filtró, cambiala (como la cerradura)', L.clamp(t / 0.25), { schem: true });
    },
  });
})();
