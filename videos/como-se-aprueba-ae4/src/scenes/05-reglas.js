// 05 reglas : tres tarjetas que entran en T 16.5, 17.5 y 18.5 (t 0.5, 1.5, 2.5).
//   1 la llave de la API tapada con PEGAR_ACA: "Ninguna clave a la vista" (si se ve: A4 máx. 10)
//   2 la ficha de un cliente inventado: "Datos de Odoo inventados" (ni un cliente real)
//   3 el sobre de la invitación: "Docente invitado a tu Odoo" (sin acceso: A1 = 0)
(function () {
  'use strict';
  const ID = 'reglas';
  const CW = 520, CY0 = 150, CY1 = 800;
  const CARDS = [
    { x: 350, at: 0.5, lines: ['Ninguna clave', 'a la vista'], warn: 'si se ve: A4 máx. 10', tint: 'stripeYellow' },
    { x: 960, at: 1.5, lines: ['Datos de Odoo', 'inventados'], warn: 'ni un cliente real', tint: 'stripeSage' },
    { x: 1570, at: 2.5, lines: ['Docente invitado', 'a tu Odoo'], warn: 'sin acceso: A1 = 0', tint: 'stripeSky' },
  ];

  FILM.scene({
    id: ID,
    draw(ctx, t, info) {
      const L = info.lib, P = L.pal, C = FILM.cast, E = L.ease;
      t = L.clamp(t, 0, info.dur);
      const tt = L.onTwos(t);
      const sd = L.hash(ID) & 0xffff;

      L.paper(ctx, { color: P.paperButter, seed: 12 });

      CARDS.forEach((c, i) => {
        // hueco punteado mientras la tarjeta no llegó
        if (tt < c.at) {
          ctx.save();
          ctx.setLineDash([12, 12]);
          ctx.strokeStyle = P.inkFaint;
          ctx.globalAlpha = 0.5;
          ctx.lineWidth = 3;
          ctx.strokeRect(c.x - CW / 2, CY0, CW, CY1 - CY0);
          ctx.restore();
          L.text(ctx, String(i + 1), c.x, (CY0 + CY1) / 2 + 30, { size: 90, weight: 800, align: 'center', color: P.inkFaint, alpha: 0.45 });
          return;
        }
        const k = L.clamp((tt - c.at) / 0.2);
        const pop = E.outBack(k);
        const cy = (CY0 + CY1) / 2;
        ctx.save();
        ctx.translate(c.x, cy);
        ctx.rotate((1 - k) * 0.12 * (i - 1 || 1) + (i - 1) * 0.015);
        ctx.scale(0.7 + 0.3 * pop, 0.7 + 0.3 * pop);
        ctx.globalAlpha *= L.clamp(k * 3);
        ctx.translate(-c.x, -cy);

        // la tarjeta
        L.inkPath(ctx, L.rrectPts(c.x - CW / 2 + 10, CY0 + 12, CW, CY1 - CY0, 26, 24), { closed: true, width: 0.1, fill: P.paperDeep, seed: sd + 1 + i });
        L.inkPath(ctx, L.rrectPts(c.x - CW / 2, CY0, CW, CY1 - CY0, 26, 24), { closed: true, width: 4.5, fill: P.white, seed: sd + 4 + i });
        L.inkPath(ctx, L.rrectPts(c.x - CW / 2 + 22, CY0 + 22, CW - 44, 330, 18, 24), { closed: true, width: 2.4, fill: P[c.tint], seed: sd + 7 + i });
        // número
        L.inkCircle(ctx, c.x - CW / 2 + 10, CY0 + 10, 36, { width: 4, fill: P.ink, seed: sd + 10 + i });
        L.text(ctx, String(i + 1), c.x - CW / 2 + 10, CY0 + 26, { size: 44, weight: 800, align: 'center', color: P.white });

        const ix = c.x, iy = CY0 + 190;
        if (i === 0) {
          // llave dorada que apunta a la etiqueta PEGAR_ACA
          ctx.save();
          ctx.translate(ix - 10, iy - 60);
          ctx.rotate(-0.2);
          L.inkCircle(ctx, -90, 0, 44, { width: 5, fill: P.sun, seed: sd + 20 });
          L.inkCircle(ctx, -90, 0, 14, { width: 3, fill: P.stripeYellow, seed: sd + 21 });
          L.inkPath(ctx, L.rectPts(-48, -12, 170, 24, 20), { closed: true, width: 4.5, fill: P.sun, seed: sd + 22 });
          L.inkPath(ctx, [[80, 12], [80, 40], [100, 40], [100, 12]], { width: 4, fill: P.sun, smooth: false, seed: sd + 23 });
          L.inkPath(ctx, [[110, 12], [110, 32], [122, 32]], { width: 4, smooth: false, seed: sd + 24 });
          ctx.restore();
          C.tag(ctx, 'PEGAR_ACA', ix, iy + 95, { size: 44, fill: P.washYellow, seed: sd + 25, rot: 0.03 });
        } else if (i === 1) {
          // ficha de un cliente inventado
          L.inkPath(ctx, L.rrectPts(ix - 200, iy - 125, 400, 250, 14, 20), { closed: true, width: 4, fill: P.white, seed: sd + 30 });
          L.inkCircle(ctx, ix - 125, iy - 40, 46, { width: 4, fill: P.duskRose, seed: sd + 31 });
          L.inkPath(ctx, [[ix - 165, iy + 40], [ix - 125, iy + 10], [ix - 85, iy + 40]], { width: 4, seed: sd + 32 });
          L.text(ctx, 'Cliente', ix - 55, iy - 52, { size: 40, weight: 600, color: P.inkSoft });
          L.text(ctx, 'Juana', ix - 55, iy + 2, { size: 44, weight: 800, color: P.ink });
          L.text(ctx, 'Inventada', ix - 55, iy + 52, { size: 44, weight: 800, color: P.ink });
          C.tag(ctx, 'ficticio', ix + 110, iy + 118, { size: 40, fill: P.okGreen, color: P.white, rot: -0.08, seed: sd + 33 });
        } else {
          // sobre de la invitación con el sello de Odoo
          const ex0 = ix - 190, ey0 = iy - 110, ew = 380, eh = 230;
          L.inkPath(ctx, L.rrectPts(ex0, ey0, ew, eh, 12, 20), { closed: true, width: 4.5, fill: P.white, seed: sd + 40 });
          L.inkPath(ctx, [[ex0 + 6, ey0 + 8], [ix, ey0 + 130], [ex0 + ew - 6, ey0 + 8]], { width: 4, smooth: false, seed: sd + 41 });
          L.inkCircle(ctx, ix, ey0 + 130, 44, { width: 4, fill: P.odooPlum, seed: sd + 42 });
          L.inkPath(ctx, [[ix - 18, ey0 + 130], [ix - 4, ey0 + 146], [ix + 22, ey0 + 112]], { color: P.white, width: 6, smooth: false, seed: sd + 43, taper: [3, 5] });
          C.tag(ctx, 'invitación', ix + 30, iy + 125, { size: 40, fill: P.odooPlum, color: P.white, rot: 0.05, seed: sd + 44 });
        }

        L.text(ctx, c.lines[0], c.x, CY0 + 432, { size: 48, weight: 800, align: 'center', color: P.ink });
        L.text(ctx, c.lines[1], c.x, CY0 + 490, { size: 48, weight: 800, align: 'center', color: P.ink });
        L.inkPath(ctx, [[c.x - 190, CY0 + 530], [c.x + 190, CY0 + 530]], { width: 2, color: P.inkFaint, seed: sd + 50 + i });
        L.text(ctx, c.warn, c.x, CY0 + 590, { size: 40, weight: 700, align: 'center', color: P.legoRed });
        ctx.restore();
      });

      C.caption(ctx, 'Tres reglas que no se negocian', L.clamp(t / 0.25));
    },
  });
})();
