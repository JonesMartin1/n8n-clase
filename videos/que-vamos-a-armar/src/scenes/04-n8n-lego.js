// 04 n8n-lego : la caja de LEGO. Los cuatro ladrillos G1 caen y encastran sobre una base en T 10, 11, 12, 13
// (t 0.5, 1.5, 2.5, 3.5). Rótulo "3 · n8n: la caja de LEGO donde se arma la lógica".
(function () {
  'use strict';
  const ID = 'n8n-lego';
  const BRICKS = [
    { x: 420, lines: ['Leer el', 'mensaje'], color: 'legoBlue', at: 0.5 },
    { x: 780, lines: ['¿Es un', 'pedido?'], color: 'legoYellow', at: 1.5, dark: true },
    { x: 1140, lines: ['Anotarlo', 'en Odoo'], color: 'legoRed', at: 2.5 },
    { x: 1500, lines: ['Contestarle'], color: 'legoGreen', at: 3.5 },
  ];
  const Y = 520;

  FILM.scene({
    id: ID,
    draw(ctx, t, info) {
      const L = info.lib, P = L.pal, C = FILM.cast, E = L.ease;
      t = L.clamp(t, 0, info.dur);
      const tt = L.onTwos(t);
      const sd = L.hash(ID) & 0xffff;

      L.paper(ctx, { color: P.paperButter, seed: 9 });

      C.tag(ctx, 'n8n', 960, 175, { size: 60, fill: P.annMagenta, color: P.white, seed: sd + 1, rot: -0.03 });

      // base de LEGO
      const bx0 = 220, bx1 = 1700, by0 = Y + 75, bh = 50;
      for (let i = 0; i < 18; i++) {
        const cx = bx0 + 40 + i * ((bx1 - bx0 - 80) / 17);
        L.inkPath(ctx, L.rrectPts(cx - 20, by0 - 14, 40, 18, 5, 8), { closed: true, width: 2.4, fill: P.serverGrey, seed: sd + 40 + i });
      }
      L.inkPath(ctx, L.rrectPts(bx0, by0, bx1 - bx0, bh, 10, 20), { closed: true, width: 4, fill: P.serverGrey, seed: sd + 2 });

      // huecos donde van los ladrillos (puntillado)
      ctx.save();
      ctx.setLineDash([10, 10]);
      ctx.strokeStyle = P.inkFaint;
      ctx.globalAlpha = 0.6;
      ctx.lineWidth = 2.5;
      for (const b of BRICKS) if (tt < b.at) ctx.strokeRect(b.x - 160, Y - 75, 320, 150);
      ctx.restore();

      // flechas entre ladrillos ya puestos (orden de lectura)
      for (let i = 0; i < 3; i++) {
        const a = BRICKS[i], b = BRICKS[i + 1];
        if (tt >= b.at + 0.25) {
          const k = L.clamp((tt - b.at - 0.25) / 0.25);
          C.arrow(ctx, a.x + 60, Y - 160, b.x - 60, Y - 160, { p: k, width: 4, bend: -30, head: 18, seed: sd + 60 + i });
        }
      }

      for (let i = 0; i < BRICKS.length; i++) {
        const b = BRICKS[i];
        const t0 = b.at - 0.35;
        if (tt < t0) continue;
        const k = L.clamp((tt - t0) / 0.35);
        const y = L.lerp(Y - 240, Y, k * k);
        const squash = tt >= b.at && tt < b.at + 0.17 ? 1 - 0.06 * Math.sin(((tt - b.at) / 0.17) * Math.PI) : 1;
        ctx.save();
        ctx.translate(b.x, Y + 75);
        ctx.scale(1 / squash, squash);
        ctx.globalAlpha *= L.clamp(k * 3);
        ctx.translate(-b.x, -(Y + 75));
        C.brick(ctx, { x: b.x, y, color: P[b.color], lines: b.lines, textColor: b.dark ? P.ink : P.white, seed: sd + 10 + i * 7 });
        ctx.restore();
        if (tt >= b.at && tt < b.at + 0.34) {
          const kk = (tt - b.at) / 0.34;
          for (const s of [-1, 1]) {
            FILM.props.speedLines(ctx, { x: b.x + s * 175, y: Y + 50, n: 3, len: 40 + 20 * kk, gap: 18, dir: s, seed: sd + 30 + i, alpha: 1 - kk });
          }
        }
      }

      C.caption(ctx, '3 · n8n: la caja de LEGO donde se arma la lógica', L.clamp(t / 0.25));
    },
  });
})();
