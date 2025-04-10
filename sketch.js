
let radius = 100;
let input, button;
let n = 8;

function setup() {
  createCanvas(900, 350);
  background(255);

  createP("¿Cuántas rebanadas por pizza?");
  input = createInput(n.toString());
  input.size(100);
  button = createButton('Generar pizzas');
  button.mousePressed(redibujar);

  noLoop();
  redibujar();
}

function redibujar() {
  background(255);
  n = int(input.value());
  if (n < 1) n = 1;

  drawPizza(150, 150, 'puntoPendiente');
  drawPizza(450, 150, 'dda');
  drawPizza(750, 150, 'bresenham');

  textSize(14);
  fill(0);
  noStroke();
  textAlign(CENTER);
  text("Punto-pendiente", 150, 320);
  text("DDA", 450, 320);
  text("Bresenham", 750, 320);
}

function drawPizza(cx, cy, algoritmo) {
  fill(255, 165, 0);
  stroke(0);
  ellipse(cx, cy, radius * 2);

  for (let i = 0; i < n; i++) {
    let angle = TWO_PI * i / n;
    let x = int(cx + radius * cos(angle));
    let y = int(cy + radius * sin(angle));
    if (algoritmo === 'puntoPendiente') puntoPendiente(cx, cy, x, y);
    else if (algoritmo === 'dda') dda(cx, cy, x, y);
    else if (algoritmo === 'bresenham') bresenham(cx, cy, x, y);
  }
}

function puntoPendiente(x0, y0, x1, y1) {
  if (x0 === x1) {
    for (let y = min(y0, y1); y <= max(y0, y1); y++) point(x0, y);
  } else {
    let m = (y1 - y0) / (x1 - x0);
    let b = y0 - m * x0;
    if (abs(x1 - x0) > abs(y1 - y0)) {
      let step = x0 < x1 ? 1 : -1;
      for (let x = x0; x !== x1; x += step) point(x, int(m * x + b));
    } else {
      let step = y0 < y1 ? 1 : -1;
      for (let y = y0; y !== y1; y += step) point(int((y - b) / m), y);
    }
  }
}

function dda(x0, y0, x1, y1) {
  let dx = x1 - x0, dy = y1 - y0;
  let steps = int(max(abs(dx), abs(dy)));
  let x_inc = dx / steps, y_inc = dy / steps;
  let x = x0, y = y0;
  for (let i = 0; i <= steps; i++) {
    point(int(round(x)), int(round(y)));
    x += x_inc; y += y_inc;
  }
}

function bresenham(x0, y0, x1, y1) {
  let dx = abs(x1 - x0), dy = abs(y1 - y0);
  let sx = x0 < x1 ? 1 : -1;
  let sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;
  while (true) {
    point(x0, y0);
    if (x0 === x1 && y0 === y1) break;
    let e2 = 2 * err;
    if (e2 > -dy) { err -= dy; x0 += sx; }
    if (e2 < dx) { err += dx; y0 += sy; }
  }
}
