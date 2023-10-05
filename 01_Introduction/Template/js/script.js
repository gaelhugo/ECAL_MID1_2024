var i;

function createCanvas(width, height) {
  var canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  document.body.appendChild(canvas);
}

function setup() {
  console.log("setup");
  createCanvas(800, 800);
  i = 0;

  document.addEventListener("click", mousePressed);

  draw();
}

function draw() {
  //   console.log("draw");
  i += 1;
  requestAnimationFrame(draw);
}

function mousePressed(e) {
  console.log("mousePressed");
}

window.onload = function () {
  console.log("on est pret");
  setup();
};
