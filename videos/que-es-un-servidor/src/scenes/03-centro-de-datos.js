// 03 centro-de-datos : un galpón con dos filas de servidores que titilan. En T 7.5 (t 0.5) el cartel
// "Amazon (AWS)", en 8.5 (t 1.5) un anillo marca "el tuyo", en 9.5 (t 2.5) el pin "en Estados Unidos".
(function () {
  'use strict';
  const ID = 'centro-de-datos';
  const BACK = [380, 612, 844, 1076, 1308, 1540];
  const FRONT = [300, 630, 960, 1290, 1620];

  FILM.scene({
    id: ID,
    draw(ctx, t, info) {
      const L = info.lib, P = L.pal, C = FILM.cast, E = L.ease;
      t = L.clamp(t, 0, info.dur);
      const tt = L.onTwos(t);
      const sd = L.hash(ID) & 0xffff;

      L.paper(ctx, { color: P.paperShade, seed: 9 });
      // piso del galpón
      L.inkPath(ctx, [[0, 640], [1920, 640], [1920, 1080], [0, 1080]], { closed: true, width: 3, fill: P.hallFloor, seed: sd + 1, smooth: false });
      for (let i = 0; i < 9; i++) {
        const x = -200 + i * 290;
        L.inkLine(ctx, 960 + (x - 960) * 0.55, 640, x, 1080, { width: 1.5, color: P.inkFaint, alpha: 0.5, seed: sd + 2 + i });
      }
      // lámparas del techo
      for (let i = 0; i < 4; i++) {
        const x = 330 + i * 420;
        L.inkLine(ctx, x, 0, x, 70, { width: 2.4, seed: sd + 20 + i });
        L.inkPath(ctx, [[x - 60, 100], [x + 60, 100], [x + 30, 70], [x - 30, 70]], { closed: true, width: 3, fill: P.inkSoft, seed: sd + 30 + i, smooth: false });
        ctx.save();
        ctx.globalAlpha = 0.12;
        ctx.fillStyle = P.sun;
        ctx.beginPath();
        ctx.moveTo(x - 60, 100);
        ctx.lineTo(x + 60, 100);
        ctx.lineTo(x + 150, 300);
        ctx.lineTo(x - 150, 300);
        ctx.fill();
        ctx.restore();
      }

      // fila de atrás: más chica y más tenue
      const blink = (i, row) => (L.h3(i + row * 10, Math.floor(tt * 4), sd) > 0.35 ? 1 : 0.2);
      ctx.save();
      ctx.globalAlpha *= 0.8;
      BACK.forEach((x, i) => C.server(ctx, { x, y: 440, w: 170, h: 300, led: blink(i, 0), seed: 61 + i * 3 }));
      ctx.restore();
      // fila de adelante
      FRONT.forEach((x, i) => {
        ctx.save();
        ctx.globalAlpha *= 0.2;
        ctx.fillStyle = P.ink;
        ctx.beginPath();
        ctx.ellipse(x + 10, 848, 140, 14, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        C.server(ctx, { x, y: 640, w: 230, h: 400, led: i === 2 ? 1 : blink(i, 1), seed: 71 + i * 3 });
      });

      // cartel colgado: Amazon (AWS) en 0.5
      if (tt >= 0.5) {
        const pop = E.outBack(L.clamp((tt - 0.5) / 0.125));
        L.inkLine(ctx, 840, 80, 860, 130, { width: 2.4, seed: sd + 40 });
        L.inkLine(ctx, 1080, 80, 1060, 130, { width: 2.4, seed: sd + 41 });
        C.tag(ctx, 'Amazon (AWS)', 960, 160, { size: 54, fill: P.awningRed, color: P.white, seed: sd + 42, pop });
      }

      // el tuyo: anillo y etiqueta en 1.5
      if (tt >= 1.5) {
        const k = L.clamp((t - 1.5) / 0.5);
        const r = E.outExpo(k);
        ctx.save();
        ctx.strokeStyle = P.annMagenta;
        ctx.lineWidth = 3;
        ctx.globalAlpha = 1 - 0.3 * L.clamp((t - 2.0) / 0.5);
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.ellipse(960, 640, 150 + 30 * r, 230 + 30 * r, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
        C.tag(ctx, 'el tuyo', 960, 400, { size: 50, fill: P.annMagenta, color: P.white, rot: -0.04, seed: sd + 43, pop: E.outBack(L.clamp((tt - 1.5) / 0.125)) });
      }

      // pin: en Estados Unidos en 2.5
      if (tt >= 2.5) {
        const pop = E.outBack(L.clamp((tt - 2.5) / 0.125));
        ctx.save();
        ctx.translate(1300, 200);
        ctx.scale(pop, pop);
        const pin = [];
        for (let i = 0; i <= 24; i++) {
          const a = Math.PI * 0.8 + (i / 24) * Math.PI * 1.4;
          pin.push([Math.cos(a) * 28, -20 + Math.sin(a) * 28]);
        }
        pin.push([0, 34]);
        L.inkPath(ctx, pin, { closed: true, width: 4, fill: P.annMagenta, seed: sd + 50 });
        L.inkCircle(ctx, 0, -20, 10, { width: 2.4, fill: P.white, seed: sd + 51 });
        ctx.restore();
        C.tag(ctx, 'en Estados Unidos', 1570, 200, { size: 44, seed: sd + 52, pop });
      }

      C.caption(ctx, 'Vive en un centro de datos de Amazon (AWS)', L.clamp(t / 0.25));
    },
  });
})();
