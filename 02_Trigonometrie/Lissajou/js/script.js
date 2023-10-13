var a1;
var a2;
var centerX;
var centerY;
var width = 800;
var height = 800;
var context;
var rayon;
var color;
var bigRadius;
var smallRadius;

function createCanvas(w, h) {
  var canvas = document.createElement("canvas");
  context = canvas.getContext("2d");
  canvas.width = w;
  canvas.height = h;
  document.body.appendChild(canvas);
}

function circle(x, y, rayon) {
  context.beginPath();
  context.arc(x, y, rayon, 0, 2 * Math.PI, true);
  context.strokeStyle = "hsl(" + color + ", 50%,50%)";
  context.stroke();
  context.closePath();
}

function setup() {
  console.log("setup");
  createCanvas(width, height);
  color = 0;
  a1 = 0;
  a2 = 0;
  rayon = 400;
  bigRadius = 400;
  smallRadius = 100;
  centerX = width / 2;
  centerY = height / 2;

  // document.addEventListener("click", mousePressed);

  draw();
}

function draw() {
  //   console.log("draw");
  // context.clearRect(0, 0, width, height);
  context.fillStyle = "rgba(255,255,255,0.01)";
  context.fillRect(0, 0, width, height);
  //
  a1 += 0.4;
  a2 += 1.23;
  color += 1;
  var posx = centerX + Math.cos(a1 * (Math.PI / 180)) * bigRadius;
  var posy = centerY + Math.sin(a2 * (Math.PI / 180)) * smallRadius;
  var r = Math.abs(100 * Math.cos(a1 * (Math.PI / 180)));

  circle(posx, posy, r);

  requestAnimationFrame(draw);
}

function mousePressed(e) {
  console.log("mousePressed");
}

window.onload = function () {
  console.log("on est pret");
  setup();
};
