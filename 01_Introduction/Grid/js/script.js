var k;
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
  createCanvas(1200, 800);
  backgroundColor = "white";
  k = 0;

  document.addEventListener("click", mousePressed);

  draw();
}

function draw() {
  context.clearRect(0, 0, 800, 800);
  var r = 10;
  k = 0;
  for (var j = 0; j < 10; j++) {
    //ligne
    for (var i = 0; i < 25; i++) {
      context.fillStyle = `hsl(${k * 3},50%,50%)`;
      circle(i * (3 * r) + r, r + j * (3 * r), r);
      k++;
    }
  }

  requestAnimationFrame(draw);
}

function mousePressed(e) {
  console.log("mousePressed");
}

window.onload = function () {
  console.log("on est pret");
  setup();
};
