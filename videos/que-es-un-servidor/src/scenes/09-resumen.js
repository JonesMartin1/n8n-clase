// 09 resumen : "Tu servidor, en 4 ideas" (G2). Cuatro renglones con ícono que entran en T 28.5, 29, 29.5 y 30
// (t 0.5, 1.0, 1.5, 2.0); se sostiene hasta 32 para que el docente pueda pausar.
(function () {
  'use strict';
  const ID = 'resumen';
  const ROWS = [
    { y: 330, at: 0.5, main: 'Una compu siempre prendida', sub: 'alquilada por mes en Amazon (AWS)' },
    { y: 500, at: 1.0, main: 'Ahí viven Evolution y n8n', sub: 'Odoo está aparte, en su nube' },
    { y: 670, at: 1.5, main: 'Se maneja con Dokploy', sub: 'y tiene dirección con candadito (HTTPS)' },
    { y: 840, at: 2.0, main: 'Apagalo si no lo usás y mirá el crédito', sub: 'pero que ande hasta el Coloquio' },
  ];

  function cloudPts(cx, cy, w, h) {
    const pts = [];
    for (let i = 0; i < 48; i++) {
      const a = (i / 48) * Math.PI * 2;
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

      L.paper(ctx, { seed: 17 });
      ctx.save();
      ctx.globalAlpha = 0.4;
      L.stripes(ctx, { colors: [P.stripeCream, P.stripeSage], width: 160, offset: tt * 20, seed: sd });
      ctx.restore();

      L.text(ctx, 'Tu servidor, en 4 ideas', 960, 175, { size: 72, weight: 700, align: 'center', color: P.ink, p: L.clamp(t / 0.4) });

      const icons = [
        // 1: el servidor prendido
        () => {
          ctx.save();
          ctx.scale(0.5, 0.5);
          C.server(ctx, { x: 0, y: 0, w: 200, h: 260, led: 1, seed: 61 });
          ctx.restore();
        },
        // 2: servidor con dos piezas y la nube aparte
        () => {
          ctx.save();
          ctx.translate(-34, 0);
          ctx.scale(0.5, 0.5);
          const s = C.server(ctx, { x: 0, y: 0, w: 200, h: 260, window: true, seed: 63 });
          const cy = (s.win.y0 + s.win.y1) / 2;
          L.inkCircle(ctx, -36, cy, 26, { width: 4, fill: P.evoBlue, seed: sd + 3 });
          L.inkCircle(ctx, 36, cy, 26, { width: 4, fill: P.legoRed, seed: sd + 4 });
          ctx.restore();
          L.inkPath(ctx, cloudPts(64, -30, 80, 52), { closed: true, width: 3, fill: P.odooPlum, seed: sd + 5 });
        },
        // 3: control remoto y candadito
        () => {
          C.remote(ctx, { x: -36, y: 0, s: 0.46, seed: 131 });
          C.lock(ctx, { x: 40, y: 10, s: 0.9, seed: sd + 6, fill: P.annYellow });
        },
        // 4: botón de encendido
        () => {
          const arc = [];
          for (let i = 0; i <= 30; i++) {
            const a = -Math.PI / 2 + 0.55 + (i / 30) * (Math.PI * 2 - 1.1);
            arc.push([Math.cos(a) * 44, Math.sin(a) * 44]);
          }
          L.inkCircle(ctx, 0, 0, 62, { width: 4, fill: P.okGreen, seed: sd + 7 });
          L.inkPath(ctx, arc, { color: P.white, width: 9, seed: sd + 8 });
          L.inkLine(ctx, 0, -50, 0, -6, { color: P.white, width: 9, seed: sd + 9 });
        },
      ];

      ROWS.forEach((r, i) => {
        if (tt < r.at) return;
        const pop = E.outBack(L.clamp((tt - r.at) / 0.17));
        const k = L.clamp((tt - r.at) / 0.25);
        // la tarjeta
        ctx.save();
        ctx.globalAlpha *= k;
        L.inkPath(ctx, L.rrectPts(200, r.y - 74, 1520, 148, 30, 24), { closed: true, width: 3, fill: P.white, seed: sd + 20 + i });
        ctx.restore();
        ctx.save();
        ctx.translate(310, r.y);
        ctx.scale(pop, pop);
        icons[i]();
        ctx.restore();
        L.text(ctx, r.main, 440, r.y - 6, { size: 50, weight: 700, color: P.ink, alpha: k });
        L.text(ctx, r.sub, 440, r.y + 44, { size: 40, weight: 500, color: P.inkSoft, alpha: k });
      });
    },
  });
})();
