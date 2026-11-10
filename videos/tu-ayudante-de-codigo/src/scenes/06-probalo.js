// 06 probalo : plano azul. Regla 2. t 0.5 (T 20.5) la compu, muy segura: "¡Seguro que anda!"; t 1.0 se aprieta Probar;
// t 1.5 tilde en WhatsApp y la señal viaja; t 2.0 cruz magenta en Odoo: "ese campo no existe" (la compu se achica);
// t 2.5 tag "vale cuando el dato aparece en tu Odoo". Rótulo "Regla 2 · No le creas: probalo en tu n8n y tu Odoo".
(function () {
  'use strict';
  const ID = 'probalo';
  const LAP = [300, 290];
  const BTN = { x: 1560, y: 250, w: 300, h: 100 };
  const FY = 560;
  const NODES = [
    { x: 470, label: 'WhatsApp' },
    { x: 960, label: 'Odoo' },
    { x: 1450, label: 'Responder' },
  ];
  const TIP = 'vale cuando el dato aparece en tu Odoo';
  const CAPTION = 'Regla 2 · No le creas: probalo en tu n8n y tu Odoo';

  FILM.scene({
    id: ID,
    draw(ctx, t, info) {
      const L = info.lib, P = L.pal, C = FILM.cast, E = L.ease;
      t = L.clamp(t, 0, info.dur);
      const tt = L.onTwos(t);
      const sd = L.hash(ID) & 0xffff;

      L.blueprint(ctx, { seed: 229, center: [960, 560], circles: 0, diagonals: 0 });
      L.guideCircle(ctx, 960, FY, 380, { alpha: 0.12, width: 1.5 });

      // la compu, muy segura de sí
      const oops = tt >= 2.0;
      const shrink = oops ? 1 - 0.08 * E.outCubic(L.clamp((tt - 2.0) / 0.3)) : 1;
      ctx.save();
      ctx.translate(LAP[0], LAP[1]);
      ctx.scale(shrink, shrink);
      C.laptop(ctx, {
        x: 0, y: 0, w: 330, h: 220, schem: true, seed: 339,
        sure: !oops && tt >= 0.5 ? E.outBack(L.clamp((tt - 0.5) / 0.2)) : 0,
        smile: oops ? 0 : 1, look: oops ? 0.9 : 0.4,
        faceColor: oops ? P.lavender : P.schemGreen,
      });
      ctx.restore();
      if (tt >= 0.5) {
        const pop = E.outBack(L.clamp((tt - 0.5) / 0.125));
        ctx.save();
        ctx.translate(510, 200);
        ctx.scale(pop, pop);
        ctx.translate(-510, -200);
        L.inkPath(ctx, L.rrectPts(510, 150, 520, 100, 24, 16), { closed: true, color: oops ? P.lavender : P.schemGreen, width: 3, seed: sd + 1 });
        L.inkPath(ctx, [[514, 216], [478, 236], [516, 192]], { color: oops ? P.lavender : P.schemGreen, width: 3, smooth: false, seed: sd + 2 });
        L.text(ctx, '¡Seguro que anda!', 770, 216, { size: 46, weight: 700, align: 'center', color: P.lineWhite, alpha: oops ? 0.55 : 1 });
        ctx.restore();
      }

      // botón Probar: 1.0
      const press = tt >= 1.0 ? Math.sin(L.clamp((tt - 1.0) / 0.2) * Math.PI) : 0;
      ctx.save();
      ctx.translate(BTN.x, BTN.y + press * 6);
      ctx.scale(1 - 0.06 * press, 1 - 0.06 * press);
      if (tt >= 1.0) {
        ctx.save();
        ctx.globalAlpha *= 0.3 + 0.3 * press;
        ctx.fillStyle = P.schemGreen;
        ctx.beginPath();
        L.tracePath(ctx, L.rrectPts(-BTN.w / 2, -BTN.h / 2, BTN.w, BTN.h, 26, 16));
        ctx.fill();
        ctx.restore();
      }
      L.inkPath(ctx, L.rrectPts(-BTN.w / 2, -BTN.h / 2, BTN.w, BTN.h, 26, 16), { closed: true, color: P.schemGreen, width: 3.4, seed: sd + 3 });
      L.inkPath(ctx, [[-100, -22], [-100, 22], [-64, 0]], { closed: true, color: P.schemGreen, width: 3.4, smooth: false, seed: sd + 4 });
      L.text(ctx, 'Probar', 30, 16, { size: 46, weight: 800, align: 'center', color: P.lineWhite });
      ctx.restore();
      if (tt >= 1.0) {
        const r = L.clamp((tt - 1.0) / 0.4);
        L.inkCircle(ctx, BTN.x, BTN.y, 150 + 60 * E.outExpo(r), { ry: 60 + 30 * E.outExpo(r), color: P.schemGreen, width: 3, alpha: 1 - r, seed: sd + 5 });
      }
      C.tag(ctx, 'tu n8n', BTN.x, 390, { schem: true, size: 42, seed: sd + 6 });

      // el flujo
      const ns = NODES.map((nd, i) => {
        const state = i === 0 && tt >= 1.5 ? 'ok' : i === 1 && tt >= 2.0 ? 'err' : null;
        const at = i === 0 ? 1.5 : 2.0;
        const sh = i === 1 && tt >= 2.0 ? 9 * Math.sin((tt - 2.0) * 50) * Math.exp(-(tt - 2.0) * 6) : 0;
        ctx.save();
        if (i === 2) ctx.globalAlpha *= tt >= 2.0 ? 0.4 : 1;
        const n = C.node(ctx, { x: nd.x + sh, y: FY, w: 340, h: 120, label: nd.label, schem: true, iconColor: P.lavender, state, badge: L.clamp((tt - at) / 0.1), seed: 361 + i * 5 });
        ctx.restore();
        return n;
      });
      C.wire(ctx, ns[0].r, ns[1].l, { schem: true, seed: sd + 7 });
      ctx.save();
      ctx.globalAlpha *= tt >= 2.0 ? 0.4 : 1;
      C.wire(ctx, ns[1].r, ns[2].l, { schem: true, seed: sd + 8 });
      ctx.restore();
      // la señal viaja: 1.0 → 1.5 al primero, 1.5 → 2.0 al segundo
      if (tt >= 1.0 && tt < 2.0) {
        const seg = tt < 1.5 ? 0 : 1;
        const u = L.clamp((tt - 1.0 - seg * 0.5) / 0.5);
        const x = seg === 0 ? L.lerp(BTN.x - 160, ns[0].x0 + 40, u) : L.lerp(ns[0].r[0], ns[1].l[0], u);
        const y = seg === 0 ? L.lerp(BTN.y + 60, FY - 60, u) : FY;
        L.glowDot(ctx, x, y, 14, { color: P.schemGreen, rays: 0, intensity: 0.9, seed: sd + 9 });
      }
      if (tt >= 2.0) {
        const k = L.clamp((tt - 2.0) / 0.2);
        L.text(ctx, 'ese campo no existe', NODES[1].x, FY + 130, { size: 44, weight: 700, align: 'center', color: P.magenta, alpha: k });
        const r = L.clamp((tt - 2.0) / 0.45);
        L.inkCircle(ctx, NODES[1].x, FY, 190 + 80 * E.outExpo(r), { ry: 80 + 40 * E.outExpo(r), color: P.magenta, width: 3, alpha: 1 - r, seed: sd + 10 });
      }

      // tag: 2.5
      if (tt >= 2.5) {
        C.tag(ctx, TIP, 960, 820, { schem: true, size: 46, pop: E.outBack(L.clamp((tt - 2.5) / 0.125)), seed: sd + 11 });
      }

      C.caption(ctx, CAPTION, L.clamp(t / 0.25), { schem: true });
    },
  });
})();
