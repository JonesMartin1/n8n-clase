// 02 cual-usar : plano azul. Tres tarjetas en contorno, una por opción gratis, con el nombre en un tag (sin logos).
// Pops en t 0.5, 1.0, 1.5 (T 4.5, 5, 5.5). t 2.0 brilla la estrella de Codex ("arrancá hoy"), t 2.5 gira el reloj
// de Copilot ("la verificación tarda"), t 3.0 gira la flecha de Antigravity ("cupo semanal").
// Rótulo "Tres opciones con versión gratis".
(function () {
  'use strict';
  const ID = 'cual-usar';
  const Y0 = 190, Y1 = 760;
  const CARDS = [
    { x: 400, name: 'Codex', sub: 'con tu ChatGPT', b1: 'Arrancá hoy', b2: 'sin instalar nada raro', col: 'schemGreen', at: 0.5, fx: 2.0 },
    { x: 960, name: 'Copilot Student', sub: 'de GitHub', b1: 'Pedilo ya', b2: 'la verificación tarda', col: 'schemGold', at: 1.0, fx: 2.5 },
    { x: 1520, name: 'Antigravity', sub: 'de Google', b1: 'Plan B', b2: 'cupo semanal', col: 'paleBlue', at: 1.5, fx: 3.0 },
  ];
  const W = 500;

  FILM.scene({
    id: ID,
    draw(ctx, t, info) {
      const L = info.lib, P = L.pal, C = FILM.cast, E = L.ease;
      t = L.clamp(t, 0, info.dur);
      const tt = L.onTwos(t);
      const sd = L.hash(ID) & 0xffff;

      L.blueprint(ctx, { seed: 221, center: [960, 470], circles: 0, diagonals: 0 });
      L.guideCircle(ctx, 960, 470, 460, { alpha: 0.12, width: 1.5 });

      const icons = [
        // chat: arrancá hoy
        (k, c) => {
          L.inkPath(ctx, L.rrectPts(-110, -62, 220, 124, 30, 16), { closed: true, color: P.lavender, width: 3, seed: sd + 1 });
          L.inkPath(ctx, [[-60, 60], [-84, 100], [-20, 62]], { color: P.lavender, width: 3, smooth: false, seed: sd + 2 });
          [-50, 0, 50].forEach((dx, i) => L.glowDot(ctx, dx, 0, 9, { color: P.lineWhite, core: P.lineWhite, rays: 0, intensity: 0.5, seed: sd + 3 + i }));
          // estrella
          const s = k > 0 ? 1 + 0.25 * Math.sin(L.clamp(k) * Math.PI) : 1;
          const pts = [];
          for (let i = 0; i < 10; i++) {
            const a = -Math.PI / 2 + (i * Math.PI) / 5;
            const r = (i % 2 ? 18 : 42) * s;
            pts.push([130 + Math.cos(a) * r, -70 + Math.sin(a) * r]);
          }
          L.inkPath(ctx, pts, { closed: true, color: c, width: 3, smooth: false, seed: sd + 6 });
          if (k > 0) L.glowDot(ctx, 130, -70, 30, { color: c, rays: 0, intensity: 0.5 * (1 - L.clamp(k)) + 0.2, seed: sd + 7 });
        },
        // reloj: tarda
        (k, c) => {
          L.inkCircle(ctx, 0, 0, 92, { color: P.lavender, width: 3, seed: sd + 10 });
          for (let i = 0; i < 12; i++) {
            const a = (i / 12) * Math.PI * 2;
            L.inkPath(ctx, [[Math.cos(a) * 76, Math.sin(a) * 76], [Math.cos(a) * 88, Math.sin(a) * 88]], { color: P.lavender, width: 2.4, seed: sd + 11 + i });
          }
          const spin = E.inOutCubic(L.clamp(k / 0.8)) * Math.PI * 4;
          const am = -Math.PI / 2 + 0.6 + spin, ah = -Math.PI / 2 + 2.4 + spin / 12;
          L.inkPath(ctx, [[0, 0], [Math.cos(am) * 66, Math.sin(am) * 66]], { color: c, width: 5, seed: sd + 30 });
          L.inkPath(ctx, [[0, 0], [Math.cos(ah) * 44, Math.sin(ah) * 44]], { color: P.lineWhite, width: 6, seed: sd + 31 });
          L.glowDot(ctx, 0, 0, 8, { color: c, core: c, rays: 0, intensity: 0.6, seed: sd + 32 });
        },
        // calendario con flecha de renovar: cupo semanal
        (k, c) => {
          L.inkPath(ctx, L.rrectPts(-100, -80, 200, 170, 18, 16), { closed: true, color: P.lavender, width: 3, seed: sd + 40 });
          L.inkPath(ctx, [[-100, -36], [100, -36]], { color: P.lavender, width: 3, seed: sd + 41 });
          [-50, 50].forEach((dx, i) => L.inkPath(ctx, [[dx, -100], [dx, -62]], { color: P.lavender, width: 4, seed: sd + 42 + i }));
          for (let r = 0; r < 2; r++) for (let q = 0; q < 4; q++) L.glowDot(ctx, -66 + q * 44, 0 + r * 44, 5, { color: P.lavender, core: P.lavender, rays: 0, intensity: 0.3, seed: sd + 44 + r * 4 + q });
          const rot = E.inOutCubic(L.clamp(k / 0.6)) * Math.PI * 2;
          ctx.save();
          ctx.translate(112, 80);
          ctx.rotate(rot);
          const arc = [];
          for (let i = 0; i <= 18; i++) { const a = -0.3 + (i / 18) * 4.9; arc.push([Math.cos(a) * 42, Math.sin(a) * 42]); }
          L.inkPath(ctx, arc, { color: c, width: 5, seed: sd + 50 });
          const [ex, ey] = arc[18];
          L.inkPath(ctx, [[ex - 16, ey - 14], [ex, ey], [ex + 18, ey - 10]], { color: c, width: 5, smooth: false, seed: sd + 51 });
          ctx.restore();
        },
      ];

      CARDS.forEach((cd, i) => {
        if (tt < cd.at) return;
        const pop = E.outBack(L.clamp((tt - cd.at) / 0.125));
        const col = P[cd.col];
        ctx.save();
        ctx.translate(cd.x, (Y0 + Y1) / 2);
        ctx.scale(pop, pop);
        ctx.translate(-cd.x, -(Y0 + Y1) / 2);
        ctx.save();
        ctx.globalAlpha *= 0.55;
        ctx.fillStyle = P.navyDeep;
        ctx.beginPath();
        L.tracePath(ctx, L.rrectPts(cd.x - W / 2, Y0, W, Y1 - Y0, 30, 20));
        ctx.fill();
        ctx.restore();
        L.inkPath(ctx, L.rrectPts(cd.x - W / 2, Y0, W, Y1 - Y0, 30, 20), { closed: true, color: P.lavender, width: 3, seed: sd + 60 + i });
        C.tag(ctx, cd.name, cd.x, Y0 + 2, { schem: true, size: 46, seed: sd + 64 + i });
        L.text(ctx, cd.sub, cd.x, Y0 + 118, { size: 42, weight: 600, align: 'center', color: P.lavender });
        const k = tt >= cd.fx ? tt - cd.fx : 0;
        ctx.save();
        ctx.translate(cd.x, Y0 + 300);
        icons[i](k, col);
        ctx.restore();
        L.text(ctx, cd.b1, cd.x, Y0 + 470, { size: 50, weight: 800, align: 'center', color: col });
        L.text(ctx, cd.b2, cd.x, Y0 + 528, { size: 40, weight: 600, align: 'center', color: P.lineWhite });
        ctx.restore();
        if (tt >= cd.fx) {
          const r = L.clamp((tt - cd.fx) / 0.45);
          L.inkCircle(ctx, cd.x, Y0 + 300, 120 + 70 * E.outExpo(r), { color: col, width: 3, alpha: 1 - r, seed: sd + 70 + i });
        }
      });

      C.caption(ctx, 'Tres opciones con versión gratis', L.clamp(t / 0.25), { schem: true });
    },
  });
})();
