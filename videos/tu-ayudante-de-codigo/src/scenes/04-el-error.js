// 04 el-error : plano azul. El nodo "Crear en Odoo" falla (t 0.5, T 12.5) y muestra el cartel rojo; en t 1.0 el error
// se copia y viaja al chat con tu ayudante; t 1.5, 2.0, 2.5 la compu contesta paso 1, 2 y 3; t 3.0 tag
// "explicámelo como si no supiera nada". Rótulo "Le pegás el error y te lo explica paso a paso".
(function () {
  'use strict';
  const ID = 'el-error';
  const NODE = [380, 300];
  const ERR = { x0: 170, y0: 420, x1: 590, y1: 600 };
  const CHAT = { x0: 730, y0: 140, x1: 1820, y1: 790 };
  const ASKB = { x0: 1110, y0: 250, x1: 1790, y1: 440 };
  const PASTE = { x0: 1140, y0: 340, x1: 1460, y1: 420 };
  const ANS = { x0: 760, y0: 470, x1: 1530, y1: 770 };
  const STEPS = ['qué significa', 'por qué pasa', 'cómo se arregla'];
  const TIP = 'explicámelo como si no supiera nada';

  FILM.scene({
    id: ID,
    draw(ctx, t, info) {
      const L = info.lib, P = L.pal, C = FILM.cast, E = L.ease;
      t = L.clamp(t, 0, info.dur);
      const tt = L.onTwos(t);
      const sd = L.hash(ID) & 0xffff;

      L.blueprint(ctx, { seed: 225, center: [380, 420], circles: 0, diagonals: 0 });
      L.guideCircle(ctx, NODE[0], 420, 300, { alpha: 0.14, width: 1.5 });

      // el nodo que falla
      const bad = tt >= 0.5;
      let shake = 0;
      if (bad) shake = 10 * Math.sin((tt - 0.5) * 50) * Math.exp(-(tt - 0.5) * 6);
      C.node(ctx, { x: NODE[0] + shake, y: NODE[1], w: 420, h: 130, label: 'Crear en Odoo', iconColor: P.lavender, schem: true, state: bad ? 'err' : null, badge: L.clamp((tt - 0.5) / 0.1), seed: 357 });
      C.tag(ctx, 'n8n', 240, 168, { schem: true, size: 46, rot: -0.05, seed: sd + 1 });

      // el cartel de error
      const errBox = (dx, dy, s, a) => {
        ctx.save();
        ctx.globalAlpha *= a;
        ctx.translate(dx, dy);
        ctx.scale(s, s);
        ctx.fillStyle = L.rgba(P.navyDeep, 0.7);
        ctx.fillRect(-160, -40, 320, 80);
        L.inkPath(ctx, L.rrectPts(-160, -40, 320, 80, 14, 14), { closed: true, color: P.magenta, width: 3, seed: sd + 3 });
        L.text(ctx, 'Error', -136, 14, { size: 40, weight: 800, color: P.magenta });
        L.inkPath(ctx, [[-10, -2], [130, -2]], { color: P.lavender, width: 4, seed: sd + 4 });
        L.inkPath(ctx, [[-10, 18], [80, 18]], { color: P.lavender, width: 4, seed: sd + 5 });
        ctx.restore();
      };
      if (bad) {
        const k = E.outBack(L.clamp((tt - 0.5) / 0.15));
        ctx.save();
        ctx.translate((ERR.x0 + ERR.x1) / 2, ERR.y0);
        ctx.scale(1, k);
        ctx.translate(-(ERR.x0 + ERR.x1) / 2, -ERR.y0);
        L.inkPath(ctx, L.rrectPts(ERR.x0, ERR.y0, ERR.x1 - ERR.x0, ERR.y1 - ERR.y0, 18, 16), { closed: true, color: P.magenta, width: 3.4, seed: sd + 2 });
        L.inkPath(ctx, [[NODE[0], NODE[1] + 66], [NODE[0], ERR.y0]], { color: P.magenta, width: 3, seed: sd + 6 });
        ctx.restore();
        if (k > 0.9) errBox((ERR.x0 + ERR.x1) / 2, (ERR.y0 + ERR.y1) / 2 - 20, 1, 1);
        if (tt >= 0.6) L.text(ctx, 'el nodo falló', (ERR.x0 + ERR.x1) / 2, ERR.y1 - 26, { size: 40, weight: 600, align: 'center', color: P.lineWhite, alpha: L.clamp((tt - 0.6) / 0.2) });
      }

      // el chat con tu ayudante
      ctx.save();
      ctx.globalAlpha *= 0.6;
      ctx.fillStyle = P.navyDeep;
      ctx.beginPath();
      L.tracePath(ctx, L.rrectPts(CHAT.x0, CHAT.y0, CHAT.x1 - CHAT.x0, CHAT.y1 - CHAT.y0, 26, 20));
      ctx.fill();
      ctx.restore();
      L.inkPath(ctx, L.rrectPts(CHAT.x0, CHAT.y0, CHAT.x1 - CHAT.x0, CHAT.y1 - CHAT.y0, 26, 20), { closed: true, color: P.lavender, width: 3, seed: sd + 7 });
      L.inkPath(ctx, [[CHAT.x0, CHAT.y0 + 90], [CHAT.x1, CHAT.y0 + 90]], { color: P.lavender, width: 2.6, seed: sd + 8 });
      C.laptop(ctx, { x: CHAT.x0 + 80, y: CHAT.y0 + 40, w: 100, h: 66, schem: true, seed: 335, blink: tt >= 1.4 && tt < 1.5 ? 1 : 0 });
      L.text(ctx, 'Chat con tu ayudante', CHAT.x0 + 160, CHAT.y0 + 62, { size: 42, weight: 700, color: P.lineWhite });

      // tu mensaje: el error pegado (1.0)
      if (tt >= 1.0) {
        const pop = E.outBack(L.clamp((tt - 1.1) / 0.125));
        if (pop > 0) {
          ctx.save();
          ctx.translate(ASKB.x1, ASKB.y0);
          ctx.scale(pop, pop);
          ctx.translate(-ASKB.x1, -ASKB.y0);
          L.inkPath(ctx, L.rrectPts(ASKB.x0, ASKB.y0, ASKB.x1 - ASKB.x0, ASKB.y1 - ASKB.y0, 22, 16), { closed: true, color: P.paleBlue, width: 3, seed: sd + 9 });
          L.text(ctx, '¿Qué significa este error?', ASKB.x0 + 28, ASKB.y0 + 60, { size: 40, weight: 600, color: P.lineWhite });
          ctx.restore();
        }
        // la copia viaja del cartel al chat
        const u = E.inOutCubic(L.clamp((tt - 1.0) / 0.3));
        const sx = (ERR.x0 + ERR.x1) / 2, sy = (ERR.y0 + ERR.y1) / 2 - 20;
        const tx = (PASTE.x0 + PASTE.x1) / 2, ty = (PASTE.y0 + PASTE.y1) / 2;
        errBox(L.lerp(sx, tx, u), L.lerp(sy, ty, u) - Math.sin(u * Math.PI) * 80, L.lerp(1, 0.95, u), 1);
        if (u < 1) {
          ctx.save();
          ctx.setLineDash([12, 10]);
          C.arrow(ctx, sx + 170, sy, L.lerp(sx + 170, tx - 170, u), L.lerp(sy, ty, u) - Math.sin(u * Math.PI) * 40, { schem: true, color: P.magenta, p: 1, seed: sd + 10 });
          ctx.restore();
        }
      }

      // la respuesta, paso a paso
      if (tt >= 1.5) {
        const pop = E.outBack(L.clamp((tt - 1.5) / 0.125));
        ctx.save();
        ctx.translate(ANS.x0, ANS.y0);
        ctx.scale(pop, pop);
        ctx.translate(-ANS.x0, -ANS.y0);
        L.inkPath(ctx, L.rrectPts(ANS.x0, ANS.y0, ANS.x1 - ANS.x0, ANS.y1 - ANS.y0, 22, 16), { closed: true, color: P.schemGreen, width: 3, seed: sd + 11 });
        ctx.restore();
        STEPS.forEach((s, i) => {
          const at = 1.5 + i * 0.5;
          if (tt < at) return;
          const k = L.clamp((tt - at) / 0.2);
          const y = ANS.y0 + 70 + i * 86;
          L.inkCircle(ctx, ANS.x0 + 56, y - 14, 30, { color: P.schemGreen, width: 3, seed: sd + 20 + i, draw: k });
          L.text(ctx, String(i + 1), ANS.x0 + 56, y, { size: 40, weight: 800, align: 'center', color: P.schemGreen, alpha: k });
          L.text(ctx, 'Paso ' + (i + 1) + ' · ' + s, ANS.x0 + 110, y, { size: 42, weight: 600, color: P.lineWhite, p: L.clamp((tt - at) / 0.25) });
        });
      }

      // el consejo: 3.0
      if (tt >= 3.0) {
        C.tag(ctx, TIP, 960, 860, { schem: true, size: 44, pop: E.outBack(L.clamp((tt - 3.0) / 0.125)), rot: -0.015, seed: sd + 12 });
      }

      C.caption(ctx, 'Le pegás el error y te lo explica paso a paso', L.clamp(t / 0.25), { schem: true });
    },
  });
})();
