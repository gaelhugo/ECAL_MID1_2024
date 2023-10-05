var i;
var context;
var backgroundColor;

function rect(x, y, w, h) {
  context.beginPath();
  context.rect(x, y, w, h);
  context.fill();
  context.closePath();
}

function circle(x, y, rayon) {
  context.beginPath();
  context.arc(x, y, rayon, 0, 2 * Math.PI, true);
  context.fill();
  context.closePath();
}

function triangle(x, y, size) {
  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(x + size, y);
  context.lineTo(x + size, y + size);
  context.fill();
  context.closePath();
}

function createCanvas(width, height) {
  var canvas = document.createElement("canvas");
  context = canvas.getContext("2d");

  canvas.width = width;
  canvas.height = height;
  document.body.appendChild(canvas);
}

function setup() {
  console.log("setup");
  createCanvas(800, 800);
  backgroundColor = "green";
  i = 0;

  document.addEventListener("click", mousePressed);

  draw();
}

function draw() {
  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, 800, 800);

  i += 1;

  context.fillStyle = "rgba(255, 0, 0, 1)";
  rect(100, 100, 100, 100);
  context.fillStyle = "blue";
  circle(300, 300, i);
  triangle(100, 0, 100);

  requestAnimationFrame(draw);
}

function mousePressed(e) {
  console.log("mousePressed");
}

window.onload = function () {
  console.log("on est pret");
  setup();
};
