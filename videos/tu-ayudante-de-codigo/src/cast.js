/*
 * cast.js : las piezas que se repiten en "Tu ayudante de código" (copiado del video 3 y ampliado), dibujadas
 * una sola vez acá para que todas las tomas las muestren iguales. Se carga después de lib.js y props.js, antes de las escenas.
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
 *   key       la llave (la clave de Evolution), G2
 *   padlock   candado con arco que se abre
 *   door      puerta que se abre, con cerradura
 *   doc       hoja con esquina doblada
 *   folder    carpeta (Portafolio)
 *   magnifier lupa
 *   card      el nodo Datos del flujo (G1)
 *   person    figura simple: cabeza y hombros
 *   laptop    la compu-ayudante (el agente de código), con cara
 *   node      un nodo de n8n con nombre y estado (ok / err)
 *   wire      el cable entre dos nodos
 *   stamp     sello de goma ("sin IA", "anda")
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
  // "La clave no se comparte": llave, candado, puerta, hoja, carpeta, lupa, nodo Datos, persona
  // ---------------------------------------------------------------------------

  /**
   * key(ctx, o) : la llave (G2) centrada en (x, y); a s 1 mide 520 × 170 (aro a la izquierda, dientes abajo a la
   * derecha). o.color tinta en schem (schemGold por defecto), o.holeFill color del agujero del aro (paper).
   * Devuelve el centro del aro en el mundo (sin rotación) para colgar cosas.
   */
  function key(ctx, o = {}) {
    const sd = o.seed || 171;
    const s = o.s != null ? o.s : 1;
    local(ctx, o, () => {
      const lc = o.schem ? o.color || P.schemGold : P.ink;
      const shaft = L.rrectPts(-120, -17, 375, 34, 10, 16);
      const teeth = [[150, 14], [150, 54], [176, 54], [176, 38], [200, 38], [200, 62], [226, 62], [226, 14]];
      ink(ctx, teeth, o, { closed: true, width: 4, color: lc, fill: P.keyDeep, seed: sd + 1, smooth: false });
      ink(ctx, shaft, o, { closed: true, width: 4.4, color: lc, fill: P.keyGold, seed: sd });
      ink(ctx, L.ellipsePts(-180, 0, 80, 80, 48), o, { closed: true, width: 5, color: lc, fill: P.keyGold, seed: sd + 2 });
      if (!o.schem) {
        L.inkPath(ctx, L.ellipsePts(-192, 0, 27, 27, 28), { closed: true, width: 3.4, color: P.ink, fill: o.holeFill || P.paper, seed: sd + 3, alpha: o.alpha });
        const arc = [];
        for (let i = 0; i <= 10; i++) { const a = -2.6 + i * 0.12; arc.push([-180 + Math.cos(a) * 58, Math.sin(a) * 58]); }
        L.inkPath(ctx, arc, { width: 7, color: P.keyPale, seed: sd + 4, taper: [4, 4], alpha: o.alpha });
        L.inkPath(ctx, [[-80, 6], [235, 6]], { width: 4, color: P.keyDeep, alpha: 0.7 * (o.alpha != null ? o.alpha : 1), seed: sd + 5 });
      } else {
        L.inkPath(ctx, L.ellipsePts(-192, 0, 27, 27, 28), { closed: true, width: 2.6, color: lc, seed: sd + 3, alpha: o.alpha });
      }
    });
    return [(o.x || 0) - 180 * s, o.y || 0];
  }

  /**
   * padlock(ctx, o) : candado centrado en (x, y) a s 1: cuerpo 220 × 190 (y -40 a 150), arco arriba.
   *   color (cuerpo), open 0..1 sube el arco, schem, lineColor (schem)
   */
  function padlock(ctx, o = {}) {
    const sd = o.seed || 191;
    local(ctx, o, () => {
      const lc = o.schem ? o.lineColor || P.lavender : P.ink;
      const up = clamp(o.open || 0) * 60;
      const shackle = (r) => {
        const pts = [[-r, 20 - up]];
        for (let i = 0; i <= 20; i++) { const a = Math.PI + (i / 20) * Math.PI; pts.push([Math.cos(a) * r, -40 - up + Math.sin(a) * r]); }
        pts.push([r, 20 - up * 1.6]);
        return pts;
      };
      if (!o.schem) {
        L.inkPath(ctx, shackle(68), { width: 28, color: P.ink, seed: sd + 1, tremble: 0.2, alpha: o.alpha });
        L.inkPath(ctx, shackle(68), { width: 18, color: P.serverGrey, seed: sd + 2, tremble: 0.2, alpha: o.alpha });
      } else {
        L.inkPath(ctx, shackle(80), { width: 3, color: lc, seed: sd + 1, alpha: o.alpha });
        L.inkPath(ctx, shackle(56), { width: 2.4, color: lc, seed: sd + 2, alpha: 0.7 * (o.alpha != null ? o.alpha : 1) });
      }
      ink(ctx, L.rrectPts(-110, -40, 220, 190, 26, 18), o, { closed: true, width: 5, color: lc, fill: o.color || P.alertRed, seed: sd });
      ink(ctx, L.ellipsePts(0, 35, 20, 20, 24), o, { closed: true, width: 3, color: lc, fill: P.ink, seed: sd + 3 });
      ink(ctx, [[-9, 48], [-14, 95], [14, 95], [9, 48]], o, { closed: true, width: 3, color: lc, fill: P.ink, seed: sd + 4, smooth: false });
      if (!o.schem) L.hatch(ctx, L.rectPts(30, -30, 72, 172, 20), { spacing: 9, width: 1.4, color: P.ink, alpha: 0.3, seed: sd + 5, length: [14, 36] });
    });
  }

  /**
   * door(ctx, o) : puerta centrada en (x, y), w × h (320 × 570). open 0..1 la abre hacia la izquierda.
   *   inside(ctx, rect, open) dibuja lo que se ve adentro. Devuelve { x0, y0, x1, y1, hole: [x, y] } (cerradura cerrada).
   */
  function door(ctx, o = {}) {
    const w = o.w || 320, h = o.h || 570;
    const x = o.x || 0, y = o.y || 0;
    const sd = o.seed || 211;
    const x0 = x - w / 2, y0 = y - h / 2, x1 = x0 + w, y1 = y0 + h;
    const op = clamp(o.open || 0);
    ink(ctx, L.rectPts(x0 - 18, y0 - 18, w + 36, h + 18, 20), o, { closed: true, width: 5, fill: P.wood, seed: sd });
    if (op > 0) {
      if (o.schem) {
        ctx.save();
        ctx.globalAlpha *= 0.9;
        ctx.fillStyle = P.navyLight;
        ctx.fillRect(x0, y0, w, h);
        ctx.restore();
      } else {
        ctx.save();
        ctx.fillStyle = P.night;
        ctx.fillRect(x0, y0, w, h);
        ctx.restore();
      }
      if (o.inside) o.inside(ctx, { x0, y0, x1, y1 }, op);
    }
    const pw = w * (1 - 0.78 * op);
    const skew = 40 * op;
    const leaf = [[x0, y0], [x0 + pw, y0 - skew], [x0 + pw, y1 + skew * 0.6], [x0, y1]];
    ink(ctx, leaf, o, { closed: true, width: 5, fill: o.schem ? null : P.tan, seed: sd + 2, smooth: false });
    if (o.schem && op <= 0) {
      ctx.save();
      ctx.globalAlpha *= 0.9;
      ctx.fillStyle = P.navy;
      ctx.beginPath();
      leaf.forEach(([a, b], i) => (i ? ctx.lineTo(a, b) : ctx.moveTo(a, b)));
      ctx.fill();
      ctx.restore();
      ink(ctx, leaf, o, { closed: true, width: 5, seed: sd + 2, smooth: false });
    }
    if (op < 0.5) {
      ctx.save();
      ctx.globalAlpha *= 1 - op / 0.5;
      ink(ctx, L.rectPts(x0 + pw * 0.14, y0 + 50, pw * 0.72, h * 0.34, 16), o, { closed: true, width: 2.6, seed: sd + 3 });
      ink(ctx, L.rectPts(x0 + pw * 0.14, y0 + h * 0.56, pw * 0.72, h * 0.34, 16), o, { closed: true, width: 2.6, seed: sd + 4 });
      ctx.restore();
    }
    const hx = x0 + pw - 50, hy = y + 20;
    ink(ctx, L.rrectPts(hx - 18, hy - 30, 36, 64, 12, 10), o, { closed: true, width: 3, fill: P.serverGrey, seed: sd + 6 });
    L.inkCircle(ctx, hx, hy - 8, 7, { width: 2.6, color: line(ctx, o), fill: o.schem ? null : P.ink, seed: sd + 7 });
    ink(ctx, [[hx, hy - 4], [hx, hy + 16]], o, { width: 5, seed: sd + 8 });
    return { x0, y0, x1, y1, hole: [x0 + w - 50, y + 20] };
  }

  /**
   * doc(ctx, o) : hoja centrada en (x, y), w × h (300 × 380), esquina doblada arriba a la derecha.
   *   lines n renglones (5), lineTop, lineGap 34, fill. Devuelve { x0, y0, x1, y1 }.
   */
  function doc(ctx, o = {}) {
    const w = o.w || 300, h = o.h || 380;
    const x = o.x || 0, y = o.y || 0;
    const sd = o.seed || 231;
    const x0 = x - w / 2, y0 = y - h / 2, x1 = x0 + w, y1 = y0 + h;
    const f = Math.min(60, w * 0.18);
    if (!o.schem) {
      ctx.save();
      ctx.globalAlpha *= 0.14;
      ctx.fillStyle = P.ink;
      ctx.beginPath();
      [[x0, y0], [x1 - f, y0], [x1, y0 + f], [x1, y1], [x0, y1]].forEach(([a, b], i) => (i ? ctx.lineTo(a + 12, b + 14) : ctx.moveTo(a + 12, b + 14)));
      ctx.fill();
      ctx.restore();
    }
    ink(ctx, [[x0, y0], [x1 - f, y0], [x1, y0 + f], [x1, y1], [x0, y1]], o, { closed: true, width: 4.4, fill: o.fill || P.white, seed: sd, smooth: false });
    ink(ctx, [[x1 - f, y0], [x1 - f, y0 + f], [x1, y0 + f]], o, { closed: true, width: 3, fill: P.paperShade, seed: sd + 1, smooth: false });
    const n = o.lines == null ? 5 : o.lines;
    const top = o.lineTop != null ? o.lineTop : y0 + h * 0.28;
    const gap = o.lineGap || 34;
    for (let i = 0; i < n; i++) {
      const yy = top + i * gap;
      if (yy > y1 - 20) break;
      const len = (w - 70) * (i % 3 === 2 ? 0.6 : 1);
      ink(ctx, [[x0 + 34, yy], [x0 + 34 + len, yy]], o, { width: 4, color: o.schem ? P.lavender : P.inkFaint, alpha: 0.7, seed: sd + 3 + i });
    }
    return { x0, y0, x1, y1 };
  }

  /** folder(ctx, o) : carpeta centrada en (x, y), w × h (320 × 240). */
  function folder(ctx, o = {}) {
    const w = o.w || 320, h = o.h || 240;
    const x = o.x || 0, y = o.y || 0;
    const sd = o.seed || 251;
    const x0 = x - w / 2, y0 = y - h / 2;
    ink(ctx, [[x0, y0 + 10], [x0 + w * 0.36, y0 + 10], [x0 + w * 0.44, y0 - 28], [x0 + w, y0 - 28], [x0 + w, y0 + h], [x0, y0 + h]], o, {
      closed: true, width: 4.4, fill: P.folderDeep, seed: sd, smooth: false,
    });
    if (o.paper !== false) ink(ctx, L.rectPts(x0 + 26, y0 - 6, w - 52, h * 0.5, 20), o, { closed: true, width: 3, fill: P.white, seed: sd + 1 });
    ink(ctx, [[x0 - 8, y0 + 40], [x0 + w + 8, y0 + 40], [x0 + w, y0 + h], [x0, y0 + h]], o, { closed: true, width: 4.4, fill: P.folder, seed: sd + 2, smooth: false });
    if (!o.schem) L.hatch(ctx, L.rectPts(x0 + w * 0.55, y0 + h * 0.55, w * 0.42, h * 0.4, 20), { spacing: 10, width: 1.4, color: P.ink, alpha: 0.3, seed: sd + 3, length: [14, 40] });
  }

  /** magnifier(ctx, o) : lupa; la lente (radio r, 90) centrada en (x, y), mango hacia abajo a la derecha. */
  function magnifier(ctx, o = {}) {
    const r = o.r || 90;
    const sd = o.seed || 271;
    const x = o.x || 0, y = o.y || 0;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.PI / 4);
    ink(ctx, L.rrectPts(r + 4, -20, r * 1.7, 40, 16, 16), o, { closed: true, width: 4.4, fill: P.wood, seed: sd });
    ctx.restore();
    if (!o.schem) {
      ctx.save();
      ctx.globalAlpha *= 0.22;
      ctx.fillStyle = P.paleBlue;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    L.inkCircle(ctx, x, y, r, { width: o.schem ? 3 : 10, color: o.schem ? P.lavender : P.phoneCase, seed: sd + 1 });
    if (!o.schem) L.inkCircle(ctx, x, y, r + 6, { width: 2.4, color: P.ink, seed: sd + 2 });
    const arc = [];
    for (let i = 0; i <= 8; i++) { const a = -2.5 + i * 0.13; arc.push([x + Math.cos(a) * r * 0.72, y + Math.sin(a) * r * 0.72]); }
    L.inkPath(ctx, arc, { width: 6, color: o.schem ? P.lineWhite : P.white, alpha: 0.8, seed: sd + 3, taper: [4, 4] });
  }

  /**
   * card(ctx, o) : el nodo Datos (G1). A s 1 centrado en (490, 470) ocupa x 160–820, y 250–690.
   *   x, y (centro), s, schem, highlight 0..1 (wash en la fila de la clave), labels
   * Devuelve { rows: [{ x0, y0, x1, y1, tx, base }] } en el mundo (tx, base: dónde va el texto del valor).
   */
  function card(ctx, o = {}) {
    const x = o.x != null ? o.x : 490, y = o.y != null ? o.y : 470;
    const s = o.s != null ? o.s : 1;
    const sd = o.seed || 291;
    const lab = o.labels || ['evo_url', 'evo_apikey'];
    const ROWS = [[-75, 0, -22], [65, 140, 118]];
    local(ctx, { x, y, s }, () => {
      const body = L.rrectPts(-330, -220, 660, 440, 26, 20);
      if (!o.schem) {
        ctx.save();
        ctx.globalAlpha *= 0.16;
        ctx.fillStyle = P.ink;
        ctx.beginPath();
        ctx.ellipse(16, 236, 320, 18, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      ink(ctx, body, o, { closed: true, width: 5, fill: P.white, seed: sd });
      if (!o.schem) {
        ctx.save();
        ctx.fillStyle = P.cardHead;
        ctx.beginPath();
        ctx.moveTo(-326, -130);
        ctx.lineTo(-326, -194);
        ctx.quadraticCurveTo(-326, -216, -304, -216);
        ctx.lineTo(304, -216);
        ctx.quadraticCurveTo(326, -216, 326, -194);
        ctx.lineTo(326, -130);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
      ink(ctx, [[-330, -130], [330, -130]], o, { width: 4, seed: sd + 1 });
      L.text(ctx, 'Datos', -290, -158, { size: 52, weight: 700, color: o.schem ? P.lineWhite : P.white });
      if (o.highlight) {
        L.wash(ctx, L.rectPts(-316, 52, 632, 102, 24), { color: P.keyPale, alpha: 0.85, p: clamp(o.highlight), seed: sd + 2 });
      }
      ROWS.forEach(([a, b, base], i) => {
        L.text(ctx, lab[i], -290, base, { size: 40, weight: 600, color: o.schem ? P.lavender : P.inkSoft });
        ink(ctx, L.rrectPts(-20, a, 320, b - a, 14, 14), o, { closed: true, width: 3, fill: P.paper, seed: sd + 4 + i });
      });
    });
    const rows = ROWS.map(([a, b, base]) => ({
      x0: x - 20 * s, y0: y + a * s, x1: x + 300 * s, y1: y + b * s, tx: x - 2 * s, base: y + base * s,
    }));
    return { rows };
  }

  /** person(ctx, o) : figura simple centrada en (x, y): cabeza arriba, hombros abajo (alto ~260 a s 1). */
  function person(ctx, o = {}) {
    const sd = o.seed || 311;
    local(ctx, o, () => {
      const sh = [];
      for (let i = 0; i <= 24; i++) { const a = Math.PI + (i / 24) * Math.PI; sh.push([Math.cos(a) * 80, 130 + Math.sin(a) * 100]); }
      ink(ctx, sh, o, { closed: true, width: 4, fill: o.fill || P.inkSoft, seed: sd });
      ink(ctx, L.ellipsePts(0, -45, 48, 48, 32), o, { closed: true, width: 4, fill: o.fill || P.inkSoft, seed: sd + 1 });
    });
  }

  // ---------------------------------------------------------------------------
  // "Tu ayudante de código": la compu-ayudante, el nodo de n8n, el cable, el sello
  // ---------------------------------------------------------------------------

  /**
   * laptop(ctx, o) : la compu-ayudante (el agente) centrada en la pantalla (x, y), w × h (520 × 340 a s 1).
   *   face true (ojos y sonrisa), blink 0..1 cierra los ojos, wink true guiña el ojo derecho, sleep true (ojos
   *   cerrados, sin sonrisa), look -1..1 mueve la mirada, sure 0..1 cejas arriba (seguro de sí), schem,
   *   faceColor (schem), screenColor.
   * Devuelve { scr: {x0,y0,x1,y1}, x0, y0, x1, y1 } en el mundo (y1 incluye la base).
   */
  function laptop(ctx, o = {}) {
    const w = o.w || 520, h = o.h || 340;
    const x = o.x || 0, y = o.y || 0;
    const sd = o.seed || 331;
    const x0 = x - w / 2, y0 = y - h / 2;
    const m = Math.round(w * 0.045);
    const scr = { x0: x0 + m, y0: y0 + m, x1: x0 + w - m, y1: y0 + h - m };
    if (!o.schem && o.shadow !== false) {
      ctx.save();
      ctx.globalAlpha *= 0.16 * (o.alpha != null ? o.alpha : 1);
      ctx.fillStyle = P.ink;
      ctx.beginPath();
      ctx.ellipse(x + 14, y0 + h + 52, w * 0.62, 18, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    ink(ctx, L.rrectPts(x0, y0, w, h, w * 0.05, 20), o, { closed: true, width: 5, fill: P.phoneCase, seed: sd });
    ink(ctx, L.rrectPts(scr.x0, scr.y0, scr.x1 - scr.x0, scr.y1 - scr.y0, 12, 20), o, { closed: true, width: 3, fill: o.screenColor || P.agentScreen, seed: sd + 1 });
    const by = y0 + h + 4;
    ink(ctx, [[x0 - w * 0.06, by], [x0 + w * 1.06, by], [x0 + w * 1.13, by + w * 0.075], [x0 - w * 0.13, by + w * 0.075]], o, {
      closed: true, width: 4.4, fill: P.serverGrey, seed: sd + 2, smooth: false,
    });
    ink(ctx, [[x - w * 0.12, by + w * 0.035], [x + w * 0.12, by + w * 0.035]], o, { width: 4, color: o.schem ? P.lavender : P.serverDeep, seed: sd + 3 });
    if (o.face !== false) {
      const fc = o.schem ? o.faceColor || P.schemGreen : P.agentFace;
      const k = w / 520;
      const cx = x + (o.look || 0) * 26 * k, cy = (scr.y0 + scr.y1) / 2 - 12 * k;
      const ex = 82 * k, ey = cy - 30 * k, er = 19 * k;
      const blink = o.sleep ? 1 : clamp(o.blink || 0);
      const lw = Math.max(3, 7 * k);
      const a = o.alpha != null ? o.alpha : 1;
      [-1, 1].forEach((side) => {
        const exx = cx + side * ex;
        const closed = blink >= 0.5 || (o.wink && side === 1);
        if (closed) {
          L.inkPath(ctx, [[exx - er, ey + 2], [exx, ey + er * 0.5], [exx + er, ey + 2]], { width: lw, color: fc, seed: sd + 10 + side, alpha: a });
        } else if (o.schem) {
          L.inkCircle(ctx, exx, ey, er, { width: 3, color: fc, seed: sd + 12 + side, alpha: a });
        } else {
          ctx.save();
          ctx.globalAlpha *= a;
          ctx.fillStyle = fc;
          ctx.beginPath();
          ctx.ellipse(exx, ey, er, er * (1 - 0.8 * blink * 2), 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = P.white;
          ctx.beginPath();
          ctx.arc(exx + er * 0.35, ey - er * 0.35, er * 0.3, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
        if (o.sure) {
          const s = clamp(o.sure);
          L.inkPath(ctx, [[exx - er * 1.3, ey - er * (1.9 + 0.6 * s)], [exx + er * 1.3, ey - er * (2.1 + 0.9 * s) - side * 4 * k]], { width: lw * 0.8, color: fc, seed: sd + 14 + side, alpha: a });
        }
      });
      if (!o.sleep) {
        const mp = [];
        const sm = o.smile != null ? o.smile : 1;
        for (let i = 0; i <= 12; i++) {
          const u = i / 12;
          mp.push([cx - 62 * k + u * 124 * k, cy + 34 * k + Math.sin(u * Math.PI) * 34 * k * sm]);
        }
        L.inkPath(ctx, mp, { width: lw, color: fc, seed: sd + 16, alpha: a, taper: [3, 3] });
      } else {
        L.inkPath(ctx, [[cx - 30 * k, cy + 44 * k], [cx + 30 * k, cy + 44 * k]], { width: lw, color: fc, seed: sd + 17, alpha: a });
      }
    }
    return { scr, x0, y0, x1: x0 + w, y1: by + w * 0.075 };
  }

  /**
   * node(ctx, o) : un nodo de n8n centrado en (x, y), w × h (300 × 120), con un cuadradito de color a la
   *   izquierda y el nombre (label, 40 px). state null | 'ok' (tilde verde) | 'err' (borde y cartel rojo),
   *   badge 0..1 escala el cartelito del estado, pop 0..1, schem, iconColor.
   * Devuelve { x0, y0, x1, y1, l: [x, y], r: [x, y] } (los puntos de conexión).
   */
  function node(ctx, o = {}) {
    const w = o.w || 300, h = o.h || 120;
    const x = o.x || 0, y = o.y || 0;
    const sd = o.seed || 351;
    const x0 = x - w / 2, y0 = y - h / 2;
    const out = { x0, y0, x1: x0 + w, y1: y0 + h, l: [x0, y], r: [x0 + w, y] };
    const pop = o.pop == null ? 1 : o.pop;
    if (pop <= 0) return out;
    const err = o.state === 'err';
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(pop, pop);
    ctx.translate(-x, -y);
    if (!o.schem) {
      ctx.save();
      ctx.globalAlpha *= 0.14;
      ctx.fillStyle = P.ink;
      ctx.beginPath();
      L.tracePath(ctx, L.rrectPts(x0 + 10, y0 + 12, w, h, 22, 20));
      ctx.fill();
      ctx.restore();
    }
    const edge = err ? (o.schem ? P.magenta : P.alertRed) : null;
    ink(ctx, L.rrectPts(x0, y0, w, h, 22, 20), o, { closed: true, width: err ? 6 : 4.4, color: edge || line(ctx, o), fill: err ? P.errPink : P.white, seed: sd });
    const ic = 56;
    ink(ctx, L.rrectPts(x0 + 22, y - ic / 2, ic, ic, 12, 12), o, { closed: true, width: 3, fill: o.iconColor || P.nodeIcon, seed: sd + 1 });
    if (o.schem) L.inkCircle(ctx, x0 + 22 + ic / 2, y, 9, { width: 2.4, color: o.iconColor || P.lavender, seed: sd + 2 });
    const tx = x0 + 22 + ic + 18;
    L.text(ctx, o.label || '', tx + (w - (tx - x0) - 18) / 2, y + 14, { size: o.size || 40, weight: 700, align: 'center', color: o.schem ? P.lineWhite : P.ink });
    // puertos
    for (const [px, py] of [out.l, out.r]) {
      L.inkCircle(ctx, px, py, 9, { width: 2.6, color: o.schem ? P.lavender : P.ink, fill: o.schem ? null : P.white, seed: sd + 3 + px });
    }
    ctx.restore();
    const b = o.badge == null ? 1 : clamp(o.badge);
    if (o.state && b > 0) {
      const bx = x0 + w - 6, by = y0 + 4;
      ctx.save();
      ctx.translate(bx, by);
      ctx.scale(b, b);
      if (o.state === 'ok') {
        const c = o.schem ? P.schemGreen : P.okGreen;
        L.inkCircle(ctx, 0, 0, 30, { width: 3, color: o.schem ? c : P.ink, fill: o.schem ? null : c, seed: sd + 8 });
        L.inkPath(ctx, [[-14, 0], [-4, 12], [16, -12]], { width: 6, color: o.schem ? c : P.white, smooth: false, seed: sd + 9 });
      } else {
        const c = o.schem ? P.magenta : P.alertRed;
        L.inkCircle(ctx, 0, 0, 30, { width: 3, color: o.schem ? c : P.ink, fill: o.schem ? null : c, seed: sd + 8 });
        L.inkPath(ctx, [[-11, -11], [11, 11]], { width: 6, color: o.schem ? c : P.white, seed: sd + 9 });
        L.inkPath(ctx, [[11, -11], [-11, 11]], { width: 6, color: o.schem ? c : P.white, seed: sd + 10 });
      }
      ctx.restore();
    }
    return out;
  }

  /** wire(ctx, a, b, o) : cable entre dos puertos [x, y]; o.p 0..1 lo dibuja de a hacia b. */
  function wire(ctx, a, b, o = {}) {
    const p = o.p == null ? 1 : clamp(o.p);
    if (p <= 0) return;
    const pts = [];
    const dx = (b[0] - a[0]) * 0.5;
    for (let i = 0; i <= 20; i++) {
      const u = i / 20;
      const mu = 1 - u;
      const px = mu * mu * mu * a[0] + 3 * mu * mu * u * (a[0] + dx) + 3 * mu * u * u * (b[0] - dx) + u * u * u * b[0];
      const py = mu * mu * mu * a[1] + 3 * mu * mu * u * a[1] + 3 * mu * u * u * b[1] + u * u * u * b[1];
      pts.push([px, py]);
    }
    L.inkPath(ctx, pts, { width: o.width || (o.schem ? 3 : 4), color: o.color || (o.schem ? P.lavender : P.inkSoft), draw: p, seed: o.seed || 361 });
  }

  /**
   * stamp(ctx, str, x, y, o) : sello de goma rectangular, rotado, centrado en (x, y). o.pop 0..1 lo baja de grande
   *   a su tamaño; color, size 46, rot -0.12.
   */
  function stamp(ctx, str, x, y, o = {}) {
    const pop = o.pop == null ? 1 : clamp(o.pop);
    if (pop <= 0) return;
    const size = o.size || 46;
    const w = measure(ctx, str, size, 800) + 60;
    const h = size * 1.6;
    const s = 1 + 0.8 * (1 - pop);
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(o.rot != null ? o.rot : -0.12);
    ctx.scale(s, s);
    ctx.globalAlpha *= clamp(pop * 2);
    const c = o.color || P.alertRed;
    L.inkPath(ctx, L.rrectPts(-w / 2, -h / 2, w, h, 12, 18), { closed: true, width: 6, color: c, seed: o.seed || 371 });
    L.inkPath(ctx, L.rrectPts(-w / 2 + 9, -h / 2 + 9, w - 18, h - 18, 8, 18), { closed: true, width: 2.4, color: c, seed: (o.seed || 371) + 1 });
    L.text(ctx, str, 0, size * 0.36, { size, weight: 800, align: 'center', color: c });
    ctx.restore();
  }

  FILM.cast = Object.freeze({ caption, tag, phone, bubble, server, brick, notebook, remote, arrow, step, local, key, padlock, door, doc, folder, magnifier, card, person, laptop, node, wire, stamp });
})();
