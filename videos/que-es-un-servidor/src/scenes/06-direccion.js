// 06 direccion : plano azul. Una ventana de navegador; de T 18.0 a 19.0 (t 0.5–1.5) se tipea la dirección,
// en 19.5 (t 2.0) se cierra el candadito, en 20.0 (t 2.5) el corchete "dominio".
(function () {
  'use strict';
  const ID = 'direccion';
  const WX0 = 260, WY0 = 180, WX1 = 1660, WY1 = 800;
  const AX0 = 340, AY0 = 270, AX1 = 1580, AY1 = 370;
  const TX = 480, TY = 340, TS = 52;
  const PRE = 'https://';
  const DOM = 'n8n.tunombre.duckdns.org';
  const FONT = '"SF Pro Rounded", ui-rounded, "Helvetica Neue", system-ui, -apple-system, "Segoe UI", Arial, sans-serif';

  FILM.scene({
    id: ID,
    draw(ctx, t, info) {
      const L = info.lib, P = L.pal, C = FILM.cast, E = L.ease;
      t = L.clamp(t, 0, info.dur);
      const tt = L.onTwos(t);
      const sd = L.hash(ID) & 0xffff;

      L.blueprint(ctx, { seed: 215, center: [960, 500], circles: 1, diagonals: 0 });

      // la ventana del navegador
      L.inkPath(ctx, L.rrectPts(WX0, WY0, WX1 - WX0, WY1 - WY0, 22, 24), { closed: true, color: P.lavender, width: 2.6, seed: sd + 1 });
      L.inkPath(ctx, L.rrectPts(WX0 + 9, WY0 + 9, WX1 - WX0 - 18, WY1 - WY0 - 18, 16, 24), { closed: true, color: P.lavender, width: 1.5, alpha: 0.5, seed: sd + 2 });
      [0, 1, 2].forEach((i) => L.inkCircle(ctx, WX0 + 50 + i * 36, WY0 + 44, 10, { color: P.lavender, width: 2, seed: sd + 3 + i }));
      L.inkLine(ctx, WX0 + 9, WY0 + 76, WX1 - 9, WY0 + 76, { color: P.lavender, width: 1.5, alpha: 0.6, seed: sd + 6 });

      // barra de la dirección
      L.inkPath(ctx, L.rrectPts(AX0, AY0, AX1 - AX0, AY1 - AY0, 50, 24), { closed: true, color: P.lineWhite, width: 3, fill: P.navyLight, seed: sd + 7 });
      const full = PRE + DOM;
      const p = L.clamp((t - 0.5) / 1.0);
      const n = Math.round(full.length * p);
      const shownPre = PRE.slice(0, Math.min(n, PRE.length));
      const shownDom = n > PRE.length ? DOM.slice(0, n - PRE.length) : '';
      ctx.save();
      ctx.font = `600 ${TS}px ${FONT}`;
      const wPre = ctx.measureText(PRE).width;
      const wDom = ctx.measureText(DOM).width;
      const wShown = ctx.measureText(shownPre).width + ctx.measureText(shownDom).width;
      ctx.restore();
      L.text(ctx, shownPre, TX, TY, { size: TS, weight: 600, color: P.lavender, alpha: 0.75 });
      L.text(ctx, shownDom, TX + wPre, TY, { size: TS, weight: 600, color: P.lineWhite });
      // cursor titilando mientras se escribe
      if (t < 1.75 && Math.floor(t * 4) % 2 === 0) {
        L.inkLine(ctx, TX + wShown + 6, TY - 40, TX + wShown + 6, TY + 8, { color: P.lineWhite, width: 3, seed: sd + 8 });
      }

      // el candadito: abierto hasta 2.0, cerrado y verde después
      const kL = E.outBack(L.clamp((t - 2.0) / 0.125));
      const closedNow = t >= 2.0;
      C.lock(ctx, { x: 408, y: 314, s: 0.95, schem: true, closed: closedNow ? kL : 0, color: closedNow ? P.schemGreen : P.lavender, seed: sd + 9 });
      if (closedNow) {
        const f = L.clamp((t - 2.0) / 0.5);
        if (f < 1) {
          ctx.save();
          ctx.globalAlpha = 1 - f;
          ctx.strokeStyle = P.magenta;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(410, 320, 40 + 50 * E.outExpo(f), 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }
        L.glowDot(ctx, 410, 330, 8, { color: P.schemGreen, rays: 0, intensity: 0.6, seed: sd + 10 });
        C.arrow(ctx, 410, 400, 470, 560, { schem: true, color: P.schemGreen, p: L.clamp((t - 2.0) / 0.25), bend: 30, seed: sd + 11 });
        const a = L.clamp((t - 2.15) / 0.2);
        L.text(ctx, 'candadito = conexión segura (HTTPS)', 500, 600, { size: 46, weight: 700, color: P.schemGreen, alpha: a });
      }

      // corchete "dominio" en 2.5
      if (t >= 2.5) {
        const k = L.clamp((t - 2.5) / 0.25);
        const x0 = TX + wPre, x1 = TX + wPre + wDom;
        L.bracket(ctx, x0, 400, x1, 400, { style: 'square', offset: 0, cap: 18, color: P.lineWhite, alpha: 0.9, width: 2.5, p: k });
        L.text(ctx, 'dominio = la dirección de tu servidor', (x0 + x1) / 2, 470, { size: 44, weight: 600, align: 'center', color: P.lineWhite, alpha: L.clamp((t - 2.6) / 0.2) });
      }

      // la página: n8n esperando adentro
      L.inkCircle(ctx, 1500, 690, 72, { color: P.lavender, width: 2.4, alpha: 0.7, seed: sd + 12 });
      L.text(ctx, 'n8n', 1500, 706, { size: 46, weight: 700, align: 'center', color: P.lavender, alpha: 0.85 });

      C.caption(ctx, 'Tiene una dirección con candadito (HTTPS)', L.clamp(t / 0.25), { schem: true });
    },
  });
})();
