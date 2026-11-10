// 03 en-criollo : le describís el flujo en criollo y te da el JSON para importar en n8n.
// t 0.5 (T 8.5) globo de vos con el pedido; t 1.0 flecha a la compu; t 1.5 sale la hoja flujo.json; t 2.0, 2.5, 3.0
// se arman los tres nodos en n8n (WhatsApp, Odoo, Responder) con sus cables.
// Rótulo "Le contás el flujo en criollo y te da el JSON para n8n".
(function () {
  'use strict';
  const ID = 'en-criollo';
  const YOU = [190, 330];
  const LAP = [1240, 330];
  const DOC = [1650, 360];
  const FY = 700;
  const NODES = [
    { x: 560, label: 'WhatsApp', icon: 'chatGreen', at: 2.0 },
    { x: 960, label: 'Odoo', icon: 'odooPlum', at: 2.5 },
    { x: 1360, label: 'Responder', icon: 'nodeIcon', at: 3.0 },
  ];
  const ASK = ['Cuando llega un pedido', 'por WhatsApp, crealo', 'en Odoo y contestale.'];
  const CAPTION = 'Le contás el flujo en criollo y te da el JSON para n8n';

  FILM.scene({
    id: ID,
    draw(ctx, t, info) {
      const L = info.lib, P = L.pal, C = FILM.cast, E = L.ease;
      t = L.clamp(t, 0, info.dur);
      const tt = L.onTwos(t);
      const sd = L.hash(ID) & 0xffff;

      L.paper(ctx, { seed: 9 });
      ctx.save();
      ctx.globalAlpha = 0.42;
      L.stripes(ctx, { colors: [P.stripeCream, P.stripeApricot], width: 160, offset: tt * 20, seed: sd });
      ctx.restore();

      // vos y el pedido en criollo
      C.person(ctx, { x: YOU[0], y: YOU[1], s: 0.75, fill: P.teal, seed: 313 });
      L.text(ctx, 'vos', YOU[0], 470, { size: 44, weight: 700, align: 'center', color: P.ink });
      // el globo de tres líneas (C.bubble lo dibujaría con letra chica): caja y colita hacia vos
      if (tt >= 0.5) {
        const pop = E.outBack(L.clamp((tt - 0.5) / 0.125));
        ctx.save();
        ctx.translate(300, 190);
        ctx.scale(pop, pop);
        ctx.translate(-300, -190);
        L.inkPath(ctx, L.rrectPts(300, 190, 600, 200, 18, 16), { closed: true, color: P.ink, width: 3, fill: P.bubbleIn, seed: sd + 2 });
        L.inkPath(ctx, [[306, 220], [270, 236], [304, 262]], { closed: true, color: P.ink, width: 2.6, fill: P.bubbleIn, smooth: false, seed: sd + 1 });
        ctx.restore();
        if (pop >= 1) {
          ASK.forEach((s, i) => {
            const p = L.clamp((tt - 0.6 - i * 0.12) / 0.15);
            L.text(ctx, s, 326, 248 + i * 54, { size: 40, weight: 600, color: P.ink, p });
          });
        }
      }

      // flecha a la compu: 1.0
      if (tt >= 1.0) {
        C.arrow(ctx, 920, 290, LAP[0] - 210, 320, { p: E.outCubic(L.clamp((tt - 1.0) / 0.25)), color: P.inkSoft, seed: sd + 3 });
      }

      // la compu-ayudante
      C.laptop(ctx, { x: LAP[0], y: LAP[1], w: 340, h: 230, seed: 333, look: tt < 1.5 ? -0.8 : 0.8, blink: tt >= 1.25 && tt < 1.35 ? 1 : 0 });

      // flujo.json: 1.5
      if (tt >= 1.5) {
        const u = E.outBack(L.clamp((tt - 1.5) / 0.2));
        ctx.save();
        ctx.translate(DOC[0], DOC[1]);
        ctx.scale(u, u);
        ctx.rotate(0.04);
        const r = C.doc(ctx, { x: 0, y: 0, w: 280, h: 330, lines: 0, seed: 237 });
        L.text(ctx, 'flujo.json', r.x0 + 28, r.y0 + 70, { size: 40, weight: 700, color: P.ink });
        L.text(ctx, '{ }', 0, 80, { size: 110, weight: 700, align: 'center', color: P.teal });
        ctx.restore();
      }

      // importar en n8n
      if (tt >= 1.75) {
        const p = E.outCubic(L.clamp((tt - 1.75) / 0.25));
        C.arrow(ctx, DOC[0] - 40, DOC[1] + 190, NODES[2].x + 120, FY - 80, { p, color: P.inkSoft, bend: -40, seed: sd + 4 });
        L.text(ctx, 'Importar', 1660, 630, { size: 42, weight: 700, align: 'center', color: P.inkSoft, alpha: p });
      }
      C.tag(ctx, 'n8n', 230, FY, { size: 46, rot: -0.05, pop: tt >= 2.0 ? E.outBack(L.clamp((tt - 2.0) / 0.125)) : 0, seed: sd + 5 });
      let prev = null;
      NODES.forEach((nd, i) => {
        if (tt < nd.at) return;
        const pop = E.outBack(L.clamp((tt - nd.at) / 0.125));
        const done = tt >= nd.at + 0.25;
        const n = C.node(ctx, { x: nd.x, y: FY, w: 330, h: 120, label: nd.label, iconColor: P[nd.icon], pop, state: done ? 'ok' : null, badge: L.clamp((tt - nd.at - 0.25) / 0.1), seed: 351 + i * 7 });
        if (prev) C.wire(ctx, prev.r, n.l, { p: L.clamp((tt - nd.at + 0.15) / 0.2), seed: sd + 10 + i });
        prev = n;
      });

      C.caption(ctx, CAPTION, L.clamp(t / 0.25));
    },
  });
})();
