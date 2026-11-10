// 01 casa-se-apaga : la notebook de casa. Pantalla prendida con un chat; en T 1.0 baja la tapa, en 1.5 queda
// cerrada (clack) y en 2.0 salen tres "z". Rótulo "Tu compu de casa se apaga cuando cerrás la tapa".
(function () {
  'use strict';
  const ID = 'casa-se-apaga';
  const HY = 720; // bisagra
  const LX0 = 600, LX1 = 1320, LY0 = 200; // tapa abierta

  FILM.scene({
    id: ID,
    draw(ctx, t, info) {
      const L = info.lib, P = L.pal, C = FILM.cast, E = L.ease;
      t = L.clamp(t, 0, info.dur);
      const tt = L.onTwos(t);
      const sd = L.hash(ID) & 0xffff;

      L.paper(ctx, { seed: 3 });
      ctx.save();
      ctx.globalAlpha = 0.45;
      L.stripes(ctx, { colors: [P.stripeCream, P.stripeSky], width: 140, angle: -0.52, offset: tt * 12, seed: sd });
      ctx.restore();

      // ventana con la luna (es de noche en casa)
      const wx0 = 1450, wy0 = 120, wx1 = 1760, wy1 = 400;
      L.inkPath(ctx, L.rrectPts(wx0, wy0, wx1 - wx0, wy1 - wy0, 10, 20), { closed: true, width: 4, fill: P.nightSky, seed: sd + 1 });
      ctx.save();
      ctx.fillStyle = P.white;
      ctx.beginPath();
      ctx.arc(1660, 200, 38, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = P.nightSky;
      ctx.beginPath();
      ctx.arc(1678, 188, 32, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      const rs = L.rng(sd + 2);
      for (let i = 0; i < 9; i++) {
        const sx = wx0 + 20 + rs() * (wx1 - wx0 - 40), sy = wy0 + 20 + rs() * (wy1 - wy0 - 40);
        const tw = 0.5 + 0.5 * Math.sin(tt * 5 + i * 1.7);
        ctx.save();
        ctx.globalAlpha = 0.4 + 0.6 * tw;
        ctx.fillStyle = P.white;
        ctx.beginPath();
        ctx.arc(sx, sy, 2.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      L.inkLine(ctx, (wx0 + wx1) / 2, wy0, (wx0 + wx1) / 2, wy1, { width: 4, seed: sd + 3 });
      L.inkLine(ctx, wx0, (wy0 + wy1) / 2, wx1, (wy0 + wy1) / 2, { width: 4, seed: sd + 4 });

      // la mesa
      L.inkPath(ctx, L.rectPts(140, 770, 1640, 46, 30), { closed: true, width: 4, fill: P.wood, seed: sd + 5 });
      L.hatch(ctx, L.rectPts(150, 796, 1620, 16, 30), { spacing: 7, width: 1.4, color: P.ink, alpha: 0.4, seed: sd + 6, length: [10, 30] });
      L.inkLine(ctx, 240, 816, 240, 1080, { width: 5, seed: sd + 7 });
      L.inkLine(ctx, 1680, 816, 1680, 1080, { width: 5, seed: sd + 8 });

      // la base de la notebook
      const base = [[520, 770], [1400, 770], [1356, HY], [564, HY]];
      ctx.save();
      ctx.globalAlpha *= 0.18;
      ctx.fillStyle = P.ink;
      ctx.beginPath();
      ctx.ellipse(975, 780, 470, 12, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      L.inkPath(ctx, base, { closed: true, width: 5, fill: P.laptopGrey, seed: sd + 9, smooth: false });
      for (let r = 0; r < 2; r++) {
        const y = 733 + r * 16;
        L.inkLine(ctx, 640 - r * 14, y, 1280 + r * 14, y, { width: 1.8, color: P.inkSoft, seed: sd + 10 + r });
      }
      // luz de encendido: verde hasta que se cierra
      const closedNow = tt >= 1.5;
      L.inkCircle(ctx, 1330, 756, 7, { width: 2, fill: closedNow ? P.serverDeep : P.okGreen, seed: sd + 12 });

      // la tapa: baja de 1.0 a 1.5 (se achica hacia la bisagra)
      const k = E.inOutCubic(L.clamp((tt - 1.0) / 0.5));
      if (k < 0.97) {
        const sy = 1 - k;
        const sx = 1 + 0.06 * k;
        ctx.save();
        ctx.translate(960, HY);
        ctx.scale(sx, sy);
        ctx.translate(-960, -HY);
        L.inkPath(ctx, L.rrectPts(LX0, LY0, LX1 - LX0, HY - LY0, 20, 24), { closed: true, width: 5, fill: P.laptopGrey, seed: sd + 13 });
        const scr = { x0: LX0 + 30, y0: LY0 + 28, x1: LX1 - 30, y1: HY - 26 };
        L.inkPath(ctx, L.rrectPts(scr.x0, scr.y0, scr.x1 - scr.x0, scr.y1 - scr.y0, 8, 24), { closed: true, width: 3, fill: P.screen, seed: sd + 14 });
        // un chat en la pantalla
        ctx.save();
        ctx.fillStyle = P.chatGreen;
        ctx.fillRect(scr.x0 + 3, scr.y0 + 3, scr.x1 - scr.x0 - 6, 62);
        ctx.restore();
        L.text(ctx, 'Mi bot', scr.x0 + 30, scr.y0 + 46, { size: 40, weight: 700, color: P.white });
        C.bubble(ctx, { side: 'right', x: scr.x1 - 40, y: scr.y0 + 100, w: 300, lines: ['Hola!'], size: 40, seed: sd + 15 });
        C.bubble(ctx, { side: 'left', x: scr.x0 + 40, y: scr.y0 + 240, w: 400, lines: ['¡Hola! ¿Qué querés?'], size: 40, seed: sd + 16 });
        // se oscurece al cerrar
        if (k > 0) {
          ctx.save();
          ctx.globalAlpha = 0.7 * k;
          ctx.fillStyle = P.ink;
          ctx.fillRect(scr.x0, scr.y0, scr.x1 - scr.x0, scr.y1 - scr.y0);
          ctx.restore();
        }
        ctx.restore();
      } else {
        // cerrada: la tapa queda acostada sobre la base
        L.inkPath(ctx, [[548, HY - 4], [1372, HY - 4], [1356, HY - 22], [564, HY - 22]], { closed: true, width: 5, fill: P.laptopGrey, seed: sd + 17, smooth: false });
      }

      // flecha amarilla: la tapa baja (1.0 a 1.75)
      if (tt >= 1.0 && tt < 2.0) {
        const p = L.clamp((t - 1.0) / 0.5);
        const fade = 1 - L.clamp((t - 1.6) / 0.4);
        ctx.save();
        ctx.globalAlpha *= fade;
        C.arrow(ctx, 1400, 260, 1430, 660, { p, color: P.annYellow, width: 7, bend: -60, seed: sd + 18 });
        ctx.restore();
      }

      // clack: anillo al cerrar
      if (tt >= 1.5 && tt < 2.0) {
        const r = E.outExpo(L.clamp((t - 1.5) / 0.3));
        ctx.save();
        ctx.globalAlpha = 1 - L.clamp((t - 1.5) / 0.45);
        ctx.strokeStyle = P.annMagenta;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.ellipse(960, HY - 10, 420 + 80 * r, 30 + 40 * r, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // zzz desde 2.0
      [0, 1, 2].forEach((i) => {
        const t0 = 2.0 + i * 0.25;
        if (tt < t0) return;
        const u = L.clamp((tt - t0) / 1.2);
        const x = 1180 + i * 70 + Math.sin(u * 5 + i) * 10;
        const y = 640 - i * 70 - u * 140;
        L.text(ctx, 'z', x, y, { size: 64 + i * 18, weight: 700, color: P.inkSoft, alpha: 1 - u * 0.5 });
      });
      if (tt >= 2.0) C.tag(ctx, 'apagada', 760, 600, { size: 48, fill: P.serverDeep, color: P.white, rot: -0.05, seed: sd + 19, pop: E.outBack(L.clamp((tt - 2.0) / 0.125)) });

      C.caption(ctx, 'Tu compu de casa se apaga cuando cerrás la tapa', L.clamp(t / 0.25));
    },
  });
})();
