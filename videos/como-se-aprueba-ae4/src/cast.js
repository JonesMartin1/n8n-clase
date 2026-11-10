/*
 * cast.js : las piezas que se repiten en los videos del taller ("Qué vamos a armar", "Cómo se aprueba AE4"),
 * dibujadas una sola vez acá para que todas las tomas las muestren iguales. Se carga después de lib.js y props.js, antes de las escenas.
 *
 *   caption   el rótulo de la toma (abajo, centrado)
 *   tag       etiqueta tipo sticker (Evolution, n8n, Odoo)
 *   phone     un celular; devuelve la pantalla en coordenadas del mundo
 *   bubble    globo de chat con una o dos líneas
 *   server    caja de servidor con ranuras y luz
 *   brick     ladrillo de LEGO con texto
 *   notebook  cuaderno abierto con renglones
 *   remote    control remoto (Dokploy)
 *   arrow     flecha dibujada a mano
 *   tableTop, tableLeg, mantel   la mesa de AE4 (G1) y su mantel cuadriculado
 *   calendar  hoja de almanaque
 *   person    un integrante de la pareja, de medio cuerpo
 *   laptop    notebook abierta vista de frente
 *
 * Todo es función pura de sus argumentos. Cada figura acepta { x, y, s, draw, seed, schem }:
 * schem: true la dibuja en contorno lavanda para el plano azul, sin rellenos.
 */
(function () {
  'use strict';

  const FILM = window.FILM;
  const L = FILM.lib;
  const P = L.pal;
  const clamp = (v, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
  const FONT = '"SF Pro Rounded", ui-rounded, "Helvetica Neue", system-ui, -apple-system, "Segoe UI", Arial, sans-serif';

  /** progreso del trazo i de n dado el progreso de la figura */
  const step = (d, i, n) => clamp((d * n - i) * 1.35);

  function local(ctx, o, fn) {
    ctx.save();
    ctx.translate(o.x || 0, o.y || 0);
    const s = o.s != null ? o.s : 1;
    if (o.rot) ctx.rotate(o.rot);
    if (s !== 1) ctx.scale(s, s);
    const out = fn();
    ctx.restore();
    return out;
  }

  function line(ctx, o) {
    return o.schem ? P.lavender : P.ink;
  }

  /** un trazo de tinta (o de lavanda en el plano azul) */
  function ink(ctx, pts, o, extra) {
    const q = Object.assign({ color: line(ctx, o), width: 4, wobble: 1.4, tremble: 0.35 }, extra);
    if (o.schem) {
      delete q.fill;
      q.width = Math.min(q.width, 3);
    }
    if (o.alpha != null) q.alpha = (q.alpha != null ? q.alpha : 1) * o.alpha;
    L.inkPath(ctx, pts, q);
  }

  function measure(ctx, str, size, weight) {
    ctx.save();
    ctx.font = `${weight} ${size}px ${FONT}`;
    const w = ctx.measureText(str).width;
    ctx.restore();
    return w;
  }

  // ---------------------------------------------------------------------------
  // Texto
  // ---------------------------------------------------------------------------

  /**
   * caption(ctx, str, p, o) : el rótulo de la toma. p 0..1 revela el texto (typewriter).
   *   o.schem true = plano azul (texto claro sobre banda oscura)
   */
  function caption(ctx, str, p, o = {}) {
    if (p <= 0) return;
    const size = o.size || 54;
    const y = o.y || 975;
    const w = measure(ctx, str, size, 600);
    const padX = 40, top = y - size * 0.98, bot = y + size * 0.36;
    ctx.save();
    ctx.globalAlpha *= clamp(p * 3);
    ctx.fillStyle = o.schem ? L.rgba(P.navyDeep, 0.78) : L.rgba(P.white, 0.82);
    const x0 = 960 - w / 2 - padX, x1 = 960 + w / 2 + padX;
    const r = (bot - top) / 2;
    ctx.beginPath();
    ctx.moveTo(x0 + r, top);
    ctx.lineTo(x1 - r, top);
    ctx.arc(x1 - r, top + r, r, -Math.PI / 2, Math.PI / 2);
    ctx.lineTo(x0 + r, bot);
    ctx.arc(x0 + r, top + r, r, Math.PI / 2, Math.PI * 1.5);
    ctx.fill();
    ctx.restore();
    L.text(ctx, str, 960, y, { size, weight: 600, align: 'center', color: o.schem ? P.lineWhite : P.ink, p: clamp(p) });
  }

  /**
   * tag(ctx, str, x, y, o) : etiqueta sticker centrada en (x, y). o.pop 0..1 escala de entrada.
   *   size 46, fill P.white, color P.ink, seed
   */
  function tag(ctx, str, x, y, o = {}) {
    const pop = o.pop == null ? 1 : o.pop;
    if (pop <= 0) return;
    const size = o.size || 46;
    const w = measure(ctx, str, size, 700) + 56;
    const h = size * 1.55;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(pop, pop);
    if (o.rot) ctx.rotate(o.rot);
    const box = L.rrectPts(-w / 2, -h / 2, w, h, h * 0.3, 18);
    if (o.schem) {
      L.inkPath(ctx, box, { closed: true, color: P.lavender, width: 2.6, fill: P.navy, seed: o.seed || 5 });
    } else {
      L.inkPath(ctx, box, { closed: true, color: P.ink, width: 4, fill: o.fill || P.white, seed: o.seed || 5 });
    }
    L.text(ctx, str, 0, size * 0.36, { size, weight: 700, align: 'center', color: o.schem ? P.lineWhite : o.color || P.ink });
    ctx.restore();
  }

  // ---------------------------------------------------------------------------
  // Celular
  // ---------------------------------------------------------------------------

  /**
   * phone(ctx, o) : celular centrado en (x, y), alto h (750 por defecto, G2).
   *   screenColor P.screen, draw 0..1, schem, seed
   * Devuelve { x0, y0, x1, y1 } de la pantalla en coordenadas del mundo (sin rot).
   */
  function phone(ctx, o = {}) {
    const h = o.h || 750;
    const w = h * (400 / 750);
    const d = o.draw == null ? 1 : clamp(o.draw);
    const sd = o.seed || 11;
    const x = o.x || 0, y = o.y || 0;
    const sx0 = -w / 2 + w * 0.06, sx1 = w / 2 - w * 0.06;
    const sy0 = -h / 2 + h * 0.107, sy1 = h / 2 - h * 0.107;
    ctx.save();
    ctx.translate(x, y);
    if (o.rot) ctx.rotate(o.rot);
    const body = L.rrectPts(-w / 2, -h / 2, w, h, w * 0.135, 20);
    if (!o.schem && d >= 1) {
      // sombra
      ctx.save();
      ctx.globalAlpha *= 0.18;
      ctx.fillStyle = P.ink;
      ctx.beginPath();
      ctx.ellipse(12, h / 2 + 18, w * 0.55, 16, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    ink(ctx, body, o, { closed: true, width: 5, fill: P.phoneCase, seed: sd, draw: step(d, 0, 3) });
    const scr = L.rrectPts(sx0, sy0, sx1 - sx0, sy1 - sy0, 10, 20);
    ink(ctx, scr, o, { closed: true, width: 3, fill: o.screenColor || P.screen, seed: sd + 1, draw: step(d, 1, 3) });
    // parlante y botón
    ink(ctx, [[-w * 0.12, -h / 2 + h * 0.055], [w * 0.12, -h / 2 + h * 0.055]], o, {
      width: 5, color: o.schem ? P.lavender : P.inkFaint, seed: sd + 2, draw: step(d, 2, 3),
    });
    L.inkCircle(ctx, 0, h / 2 - h * 0.054, h * 0.024, {
      color: o.schem ? P.lavender : P.inkFaint, width: 3, seed: sd + 3, draw: step(d, 2, 3),
    });
    if (!o.schem && o.header !== false && d >= 1) {
      // barra del chat: avatar y nombre
      ctx.save();
      ctx.fillStyle = P.chatGreen;
      ctx.fillRect(sx0 + 2, sy0 + 2, sx1 - sx0 - 4, h * 0.085);
      ctx.restore();
      ctx.save();
      ctx.fillStyle = P.white;
      ctx.beginPath();
      ctx.arc(sx0 + 44, sy0 + h * 0.044, h * 0.026, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      L.text(ctx, o.title || 'Empanadas Doña Rosa', sx0 + 80, sy0 + h * 0.058, { size: h * 0.032, weight: 600, color: P.white });
    }
    ctx.restore();
    return { x0: x + sx0, y0: y + sy0, x1: x + sx1, y1: y + sy1, top: y + sy0 + h * 0.085 };
  }

  /**
   * bubble(ctx, o) : globo de chat. o.side 'right' (cliente) | 'left' (respuesta).
   *   x, y (esquina superior del lado del que sale), w, lines [str], size 30, fill, pop 0..1, ticks 0..1
   */
  function bubble(ctx, o = {}) {
    const pop = o.pop == null ? 1 : o.pop;
    if (pop <= 0) return;
    const lines = o.lines || [''];
    const size = o.size || 30;
    const w = o.w || 300;
    const h = lines.length * size * 1.3 + size * 1.2;
    const right = o.side !== 'left';
    const x0 = right ? o.x - w : o.x;
    ctx.save();
    ctx.translate(right ? o.x : o.x, o.y);
    ctx.scale(pop, pop);
    ctx.translate(right ? -o.x : -o.x, -o.y);
    const pts = L.rrectPts(x0, o.y, w, h, 18, 16);
    L.inkPath(ctx, pts, { closed: true, color: P.ink, width: 3, fill: o.fill || (right ? P.bubbleOut : P.bubbleIn), seed: o.seed || 21 });
    // colita
    const tx = right ? o.x : o.x;
    const tail = right ? [[tx - 6, o.y + 8], [tx + 18, o.y + 2], [tx - 4, o.y + 28]] : [[tx + 6, o.y + 8], [tx - 18, o.y + 2], [tx + 4, o.y + 28]];
    L.inkPath(ctx, tail, { closed: true, color: P.ink, width: 2.6, fill: o.fill || (right ? P.bubbleOut : P.bubbleIn), seed: (o.seed || 21) + 1, smooth: false });
    lines.forEach((s, i) => L.text(ctx, s, x0 + 22, o.y + size * 1.15 + i * size * 1.3, { size, weight: 500, color: P.ink }));
    if (o.ticks) {
      const k = clamp(o.ticks);
      const bx = x0 + w - 64, by = o.y + h - 16;
      ctx.save();
      ctx.globalAlpha *= k;
      for (const dx of [0, 14]) {
        L.inkPath(ctx, [[bx + dx, by - 9], [bx + dx + 7, by - 2], [bx + dx + 20, by - 18]], { color: P.tickBlue, width: 3, smooth: false, seed: 40 + dx });
      }
      ctx.restore();
    }
    ctx.restore();
    return { x0, y0: o.y, x1: x0 + w, y1: o.y + h };
  }

  // ---------------------------------------------------------------------------
  // Servidor, ladrillo, cuaderno, control remoto, flecha
  // ---------------------------------------------------------------------------

  /**
   * server(ctx, o) : caja de servidor centrada en (x, y), w × h (por defecto 420 × 560).
   *   led 0..1 (brillo de la luz verde), window true deja una ventana arriba para meter algo adentro
   * Devuelve { x0, y0, x1, y1, win: {x0,y0,x1,y1}|null, led: [x, y] }
   */
  function server(ctx, o = {}) {
    const w = o.w || 420, h = o.h || 560;
    const x = o.x || 0, y = o.y || 0;
    const d = o.draw == null ? 1 : clamp(o.draw);
    const sd = o.seed || 61;
    const x0 = x - w / 2, y0 = y - h / 2;
    ink(ctx, L.rrectPts(x0, y0, w, h, 22, 20), o, { closed: true, width: 5, fill: P.serverGrey, seed: sd, draw: step(d, 0, 3) });
    let win = null;
    const slotTop = o.window ? y0 + h * 0.62 : y0 + h * 0.18;
    if (o.window) {
      win = { x0: x0 + w * 0.08, y0: y0 + h * 0.06, x1: x0 + w * 0.92, y1: y0 + h * 0.56 };
      ink(ctx, L.rrectPts(win.x0, win.y0, win.x1 - win.x0, win.y1 - win.y0, 12, 20), o, {
        closed: true, width: 3, fill: P.paperShade, seed: sd + 1, draw: step(d, 1, 3),
      });
    }
    const n = o.window ? 3 : 5;
    for (let i = 0; i < n; i++) {
      const yy = slotTop + i * 46;
      ink(ctx, [[x0 + w * 0.12, yy], [x0 + w * 0.62, yy]], o, {
        width: 6, color: o.schem ? P.lavender : P.serverDeep, seed: sd + 4 + i, draw: step(d, 2, 3),
      });
    }
    const led = [x0 + w * 0.82, slotTop];
    if (d >= 1) {
      const k = o.led == null ? 1 : o.led;
      if (o.schem) {
        L.glowDot(ctx, led[0], led[1], 9, { color: P.schemGreen, core: P.schemGreen, rays: 0, intensity: 0.5 + 0.5 * k });
      } else {
        ctx.save();
        ctx.fillStyle = L.mix(P.serverDeep, '#7BE07F', k);
        ctx.beginPath();
        ctx.arc(led[0], led[1], 13, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha *= 0.35 * k;
        ctx.beginPath();
        ctx.arc(led[0], led[1], 28, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        L.inkCircle(ctx, led[0], led[1], 13, { width: 2.4, seed: sd + 9 });
      }
    }
    return { x0, y0, x1: x0 + w, y1: y0 + h, win, led };
  }

  /**
   * brick(ctx, o) : ladrillo de LEGO centrado en (x, y), 320 × 150 (G1).
   *   color, lines [str] (texto blanco, 40 px), pop 0..1 (escala), schem
   */
  function brick(ctx, o = {}) {
    const pop = o.pop == null ? 1 : o.pop;
    if (pop <= 0) return;
    const w = o.w || 320, h = o.h || 150;
    const sd = o.seed || 81;
    ctx.save();
    ctx.translate(o.x || 0, o.y || 0);
    ctx.scale(pop, pop);
    const col = o.color || P.legoRed;
    const stud = w * 0.16, studH = 22;
    for (let i = 0; i < 3; i++) {
      const cx = -w / 2 + w * (0.2 + i * 0.3);
      const pts = L.rrectPts(cx - stud / 2, -h / 2 - studH, stud, studH + 6, 6, 10);
      ink(ctx, pts, o, { closed: true, width: 3.4, fill: col, seed: sd + i });
    }
    const body = L.rrectPts(-w / 2, -h / 2, w, h, 12, 20);
    ink(ctx, body, o, { closed: true, width: 4.4, fill: col, seed: sd + 5 });
    if (!o.schem) {
      // sombra inferior dentro del ladrillo
      L.hatch(ctx, L.rectPts(-w / 2 + 8, h / 2 - 26, w - 16, 20, 20), { spacing: 6, width: 1.4, color: P.ink, alpha: 0.35, seed: sd + 6, length: [10, 30] });
    }
    const lines = o.lines || [];
    const size = o.size || 40;
    const y0 = -((lines.length - 1) * size * 1.12) / 2 + size * 0.36;
    lines.forEach((s, i) => L.text(ctx, s, 0, y0 + i * size * 1.12, { size, weight: 700, align: 'center', color: o.schem ? P.lineWhite : o.textColor || P.white }));
    ctx.restore();
  }

  /**
   * notebook(ctx, o) : cuaderno abierto centrado en (x, y), w × h (1000 × 670).
   * Devuelve { left: {x0,y0,x1,y1}, right: {...}, rows: [y...] } (renglones de la página derecha y la izquierda).
   */
  function notebook(ctx, o = {}) {
    const w = o.w || 1000, h = o.h || 670;
    const x = o.x || 0, y = o.y || 0;
    const sd = o.seed || 101;
    const x0 = x - w / 2, y0 = y - h / 2;
    // tapa
    ink(ctx, L.rrectPts(x0 - 22, y0 - 16, w + 44, h + 40, 18, 20), o, { closed: true, width: 4.4, fill: P.odooPlum, seed: sd });
    // páginas
    const gap = 14;
    const left = { x0, y0, x1: x - gap, y1: y0 + h };
    const right = { x0: x + gap, y0, x1: x0 + w, y1: y0 + h };
    for (const [k, pg] of [[1, left], [2, right]]) {
      ink(ctx, L.rrectPts(pg.x0, pg.y0, pg.x1 - pg.x0, pg.y1 - pg.y0, 10, 20), o, { closed: true, width: 3.2, fill: P.white, seed: sd + k });
    }
    const rows = [];
    ctx.save();
    ctx.strokeStyle = o.schem ? P.lavender : P.pageLine;
    ctx.lineWidth = 2;
    ctx.globalAlpha *= 0.8;
    for (let r = 0; r < 9; r++) {
      const yy = y0 + 120 + r * 62;
      if (yy > y0 + h - 20) break;
      rows.push(yy);
      ctx.beginPath();
      ctx.moveTo(left.x0 + 30, yy);
      ctx.lineTo(left.x1 - 20, yy);
      ctx.moveTo(right.x0 + 20, yy);
      ctx.lineTo(right.x1 - 30, yy);
      ctx.stroke();
    }
    ctx.restore();
    // espiral del lomo
    for (let r = 0; r < 9; r++) {
      const yy = y0 + 40 + r * ((h - 80) / 8);
      L.inkCircle(ctx, x, yy, 12, { width: 3, color: line(ctx, o), seed: sd + 20 + r });
    }
    return { left, right, rows };
  }

  /** remote(ctx, o) : control remoto vertical centrado en (x, y), alto 260 a s 1. */
  function remote(ctx, o = {}) {
    const d = o.draw == null ? 1 : clamp(o.draw);
    return local(ctx, o, () => {
      const sd = o.seed || 131;
      ink(ctx, L.rrectPts(-55, -130, 110, 260, 40, 16), o, { closed: true, width: 4, fill: P.phoneCase, seed: sd, draw: step(d, 0, 2) });
      if (d < 1) return;
      const cols = o.schem ? [P.lavender, P.lavender, P.lavender] : [P.legoRed, P.legoYellow, P.legoGreen];
      [[0, -70, 22], [-22, -5, 15], [22, -5, 15], [0, 50, 15]].forEach(([bx, by, r], i) => {
        L.inkCircle(ctx, bx, by, r, { width: o.schem ? 2.4 : 3, color: line(ctx, o), fill: o.schem ? null : cols[i % 3], seed: sd + 1 + i });
      });
    });
  }

  /**
   * arrow(ctx, x1, y1, x2, y2, o) : flecha de tinta con punta. o.p 0..1 dibuja de x1 a x2.
   *   color, width 5, bend 0 (px, curva hacia la normal), seed
   */
  function arrow(ctx, x1, y1, x2, y2, o = {}) {
    const p = o.p == null ? 1 : clamp(o.p);
    if (p <= 0) return;
    const bend = o.bend || 0;
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
    const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len, ny = dx / len;
    const pts = [];
    for (let i = 0; i <= 24; i++) {
      const u = i / 24;
      const bx = (1 - u) * (1 - u) * x1 + 2 * u * (1 - u) * (mx + nx * bend) + u * u * x2;
      const by = (1 - u) * (1 - u) * y1 + 2 * u * (1 - u) * (my + ny * bend) + u * u * y2;
      pts.push([bx, by]);
    }
    const color = o.color || (o.schem ? P.lavender : P.ink);
    const width = o.width || (o.schem ? 3 : 5);
    L.inkPath(ctx, pts, { color, width, draw: p, seed: o.seed || 151, taper: [6, 2] });
    if (p >= 0.98) {
      const [ax, ay] = pts[24], [bx, by] = pts[21];
      const a = Math.atan2(ay - by, ax - bx);
      const hl = o.head || 26;
      L.inkPath(ctx, [[ax - Math.cos(a - 0.5) * hl, ay - Math.sin(a - 0.5) * hl], [ax, ay], [ax - Math.cos(a + 0.5) * hl, ay - Math.sin(a + 0.5) * hl]], {
        color, width, smooth: false, seed: (o.seed || 151) + 1, taper: [4, 4],
      });
    }
  }

  // ---------------------------------------------------------------------------
  // Piezas de "Cómo se aprueba AE4": la mesa, el mantel, el almanaque, la persona, la notebook
  // ---------------------------------------------------------------------------

  /**
   * tableTop(ctx, o) : la tabla de la mesa, centrada en (x, y), w × h (1240 × 56, G1).
   *   fill P.wood, schem, draw 0..1, seed
   */
  function tableTop(ctx, o = {}) {
    const w = o.w || 1240, h = o.h || 56;
    const x = o.x || 0, y = o.y || 0;
    const d = o.draw == null ? 1 : clamp(o.draw);
    const sd = o.seed || 201;
    const x0 = x - w / 2, y0 = y - h / 2;
    ink(ctx, L.rrectPts(x0, y0, w, h, 12, 24), o, { closed: true, width: 5, fill: o.fill || P.wood, seed: sd, draw: d });
    if (d < 1) return;
    // vetas de la madera
    for (let i = 0; i < 3; i++) {
      const yy = y0 + h * (0.3 + i * 0.22);
      const a = x0 + w * (0.04 + ((i * 0.37) % 0.3)), b = a + w * (0.2 + i * 0.07);
      ink(ctx, [[a, yy], [(a + b) / 2, yy + 3], [b, yy]], o, {
        width: 2, color: o.schem ? P.lavender : P.inkSoft, alpha: o.schem ? 0.45 : 0.55, seed: sd + 3 + i,
      });
    }
  }

  /**
   * tableLeg(ctx, o) : una pata de la mesa centrada en x, de y0 a y1, ancho w (70).
   *   fill (color de la pata), schem, draw 0..1, seed
   */
  function tableLeg(ctx, o = {}) {
    const w = o.w || 70;
    const x = o.x || 0, y0 = o.y0 || 0, y1 = o.y1 || 300;
    const d = o.draw == null ? 1 : clamp(o.draw);
    const tw = w * 0.82;
    const pts = [[x - w / 2, y0], [x + w / 2, y0], [x + tw / 2, y1], [x - tw / 2, y1]];
    ink(ctx, pts, o, { closed: true, width: 4.4, fill: o.fill || P.wood, seed: o.seed || 211, smooth: false, draw: d });
  }

  /**
   * mantel(ctx, o) : mantel cuadriculado apoyado en una tabla cuya cara de arriba está en y.
   *   x (centro), y, w (ancho del mantel), drop (cuánto cuelga adelante, 150), schem, seed, alpha
   * Devuelve { x0, x1, y0, y1 } de la cara que cuelga.
   */
  function mantel(ctx, o = {}) {
    const w = o.w || 1300, drop = o.drop || 150;
    const x = o.x || 0, y = o.y || 0;
    const sd = o.seed || 221;
    const x0 = x - w / 2, x1 = x + w / 2, y0 = y - 6, y1 = y + drop;
    const pts = [];
    for (let i = 0; i <= 12; i++) pts.push([x0 + 10 + ((w - 20) * i) / 12, y0]);
    for (let i = 1; i <= 6; i++) pts.push([x1 - 10 + (24 * i) / 6, y0 + ((y1 - 14 - y0) * i) / 6]);
    const n = 90, waves = 5.5;
    for (let i = 0; i <= n; i++) {
      const u = i / n;
      pts.push([x1 + 14 - (w + 28) * u, y1 - 14 + 14 * Math.cos(u * waves * Math.PI * 2)]);
    }
    for (let i = 5; i >= 1; i--) pts.push([x0 + 10 - (24 * i) / 6, y0 + ((y1 - 14 - y0) * i) / 6]);
    ctx.save();
    if (o.alpha != null) ctx.globalAlpha *= o.alpha;
    if (o.schem) {
      L.inkPath(ctx, pts, { closed: true, color: P.lineWhite, width: 3, fill: P.navyLight, seed: sd });
    } else {
      L.inkPath(ctx, pts, { closed: true, color: P.ink, width: 4, fill: P.white, seed: sd });
    }
    // cuadrillé: rectángulos alternados, recortados a la forma del mantel
    ctx.save();
    ctx.beginPath();
    pts.forEach(([px, py], i) => (i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)));
    ctx.closePath();
    ctx.clip();
    const cell = 46;
    ctx.fillStyle = o.schem ? L.rgba(P.lavender, 0.28) : L.rgba(P.red, 0.78);
    for (let r = 0; r * cell < drop + 20; r++) {
      for (let c = 0; c * cell < w + 40; c++) {
        if ((r + c) % 2) continue;
        ctx.fillRect(x0 - 20 + c * cell, y0 + r * cell, cell, cell);
      }
    }
    ctx.restore();
    if (!o.schem) L.inkPath(ctx, pts, { closed: true, color: P.ink, width: 4, seed: sd });
    ctx.restore();
    return { x0, x1, y0, y1 };
  }

  /**
   * calendar(ctx, o) : hoja de almanaque centrada en (x, y), w × h (440 × 520 a s 1).
   *   day '19', weekday 'JUEVES', month 'NOVIEMBRE', schem, seed, s, bare (solo el número: para íconos chicos)
   */
  function calendar(ctx, o = {}) {
    return local(ctx, o, () => {
      const w = 440, h = 520, sd = o.seed || 231;
      const x0 = -w / 2, y0 = -h / 2;
      ink(ctx, L.rrectPts(x0, y0, w, h, 22, 22), o, { closed: true, width: 5, fill: P.white, seed: sd });
      const band = 110;
      if (!o.schem) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x0 + 4, y0 + band);
        ctx.lineTo(x0 + 4, y0 + 22);
        ctx.quadraticCurveTo(x0 + 4, y0 + 4, x0 + 22, y0 + 4);
        ctx.lineTo(x0 + w - 22, y0 + 4);
        ctx.quadraticCurveTo(x0 + w - 4, y0 + 4, x0 + w - 4, y0 + 22);
        ctx.lineTo(x0 + w - 4, y0 + band);
        ctx.closePath();
        ctx.fillStyle = P.legoRed;
        ctx.fill();
        ctx.restore();
      }
      ink(ctx, [[x0 + 6, y0 + band], [x0 + w - 6, y0 + band]], o, { width: 4, seed: sd + 1 });
      // anillas
      for (const ax of [-110, 110]) {
        L.inkCircle(ctx, ax, y0 + 4, 16, { width: 4, color: line(ctx, o), fill: o.schem ? null : P.serverGrey, seed: sd + 2 + ax });
      }
      if (o.bare) {
        L.text(ctx, o.day || '19', 0, y0 + h - 70, { size: 250, weight: 800, align: 'center', color: o.schem ? P.lineWhite : P.ink });
        return;
      }
      L.text(ctx, o.month || 'NOVIEMBRE', 0, y0 + 80, { size: 50, weight: 800, align: 'center', color: o.schem ? P.lineWhite : P.white, tracking: 2 });
      L.text(ctx, o.weekday || 'JUEVES', 0, y0 + band + 78, { size: 56, weight: 700, align: 'center', color: o.schem ? P.lavender : P.inkSoft, tracking: 3 });
      L.text(ctx, o.day || '19', 0, y0 + h - 70, { size: 250, weight: 800, align: 'center', color: o.schem ? P.lineWhite : P.ink });
    });
  }

  /**
   * person(ctx, o) : un integrante de la pareja, de medio cuerpo; (x, y) es el centro de los hombros.
   *   s, shirt (color), hair (color), schem, seed, flip (mira hacia la izquierda)
   */
  function person(ctx, o = {}) {
    return local(ctx, o, () => {
      const sd = o.seed || 241;
      const body = [[-150, 170], [-140, 40], [-110, -30], [-50, -55], [50, -55], [110, -30], [140, 40], [150, 170]];
      ink(ctx, body, o, { closed: true, width: 5, fill: o.shirt || P.teal, seed: sd });
      // cuello
      ink(ctx, [[-26, -55], [-22, -82], [22, -82], [26, -55]], o, { width: 4, fill: P.duskRose, seed: sd + 1 });
      // cabeza y pelo
      L.inkCircle(ctx, 0, -160, 82, { width: 5, color: line(ctx, o), fill: o.schem ? P.navy : P.duskRose, seed: sd + 2 });
      const hair = [];
      for (let i = 0; i <= 16; i++) {
        const a = Math.PI + (i / 16) * Math.PI;
        hair.push([Math.cos(a) * 88, -165 + Math.sin(a) * 86]);
      }
      hair.push([70, -180], [20, -195], [-40, -185], [-82, -150]);
      ink(ctx, hair, o, { closed: true, width: 4, fill: o.hair || P.inkSoft, seed: sd + 3 });
      // ojos y sonrisa
      const eye = o.schem ? P.lineWhite : P.ink;
      for (const ex of [-28, 28]) {
        ctx.save();
        ctx.fillStyle = eye;
        ctx.beginPath();
        ctx.arc(ex, -150, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      ink(ctx, [[-28, -115], [0, -102], [28, -115]], o, { width: 4, seed: sd + 4 });
    });
  }

  /**
   * laptop(ctx, o) : notebook abierta vista de frente, centrada en (x, y) = centro de la base.
   *   w 520, screen color, schem, seed. Devuelve la pantalla { x0, y0, x1, y1 }.
   */
  function laptop(ctx, o = {}) {
    const w = o.w || 520;
    const sh = w * 0.62;
    const x = o.x || 0, y = o.y || 0;
    const sd = o.seed || 251;
    const lid = { x0: x - w / 2, y0: y - sh - 10, x1: x + w / 2, y1: y - 10 };
    ink(ctx, L.rrectPts(lid.x0, lid.y0, w, sh, 18, 20), o, { closed: true, width: 5, fill: P.phoneCase, seed: sd });
    const scr = { x0: lid.x0 + 22, y0: lid.y0 + 22, x1: lid.x1 - 22, y1: lid.y1 - 22 };
    ink(ctx, L.rrectPts(scr.x0, scr.y0, scr.x1 - scr.x0, scr.y1 - scr.y0, 8, 20), o, { closed: true, width: 3, fill: o.screen || P.screen, seed: sd + 1 });
    const base = [[x - w / 2 - 60, y + 30], [x - w / 2 + 10, y - 8], [x + w / 2 - 10, y - 8], [x + w / 2 + 60, y + 30]];
    ink(ctx, base, o, { closed: true, width: 5, fill: P.serverGrey, seed: sd + 2, smooth: false });
    return scr;
  }

  FILM.cast = Object.freeze({
    caption, tag, phone, bubble, server, brick, notebook, remote, arrow, step, local,
    tableTop, tableLeg, mantel, calendar, person, laptop,
  });
})();
