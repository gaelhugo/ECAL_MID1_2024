// largeur totale de l'écran
var width = window.innerWidth;
// hauteur totale de l'écran
var height = window.innerHeight;
// contexte 2D
var context;
// image fixed
var image = null;
// largeur et hauteur par default de l'image ou de la video
var largeur = 1000;
var hauteur = 1000;
// tableau pour stocker la grille de cercles
var grille = [];
// variable pour stocker les pixels de l'image video
var video = null;
// une variable pour définir si on utilise la webcam ou l'image fixe
var webcam = true;

// fonction pour créer un canvas
function createCanvas(w, h) {
  var canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  context = canvas.getContext("2d");
  document.body.appendChild(canvas);
}

function setup() {
  console.log("setup");
  createCanvas(width, height);
  // on active la gestion de la souris
  document.addEventListener("mousedown", mousePressed);

  // pour l'exemple avec la webcam , on initialise la caméra
  if (webcam) {
    initialiserCamera();
  } else {
    // pour l'exemple avec l'image fixe
    image = new Image();
    // on attend que l'image soit chargée avant de l'afficher
    image.onload = () => {
      //on peut récupèrer la largeur et la hauteur de l'image
      largeur = image.width;
      hauteur = image.height;
    };
    // on définit la source de l'image
    image.src = "image/andy.jpg";
  }
  //on créé une grille de cercles
  // pour une grille de 1000x1000
  for (let j = 0; j < hauteur; j += 20) {
    for (let i = 0; i < largeur; i += 20) {
      let circle = new Circle(i, j, 10, context);
      // on affecte un angle incrémenteal à chaque cercle
      circle.angle = i * 0.2;
      // on stock le cercle dans le tableau
      grille.push(circle);
    }
  }
  draw();
}

function draw() {
  // on analyse les pixels de l'image
  detectPixels();
  //on efface tout l'écran en noir
  context.fillStyle = "black";
  context.fillRect(0, 0, width, height);
  // on dessine les cercles
  grille.forEach((circle, i) => {
    circle.draw();
    // le mouvment de chaque cercle est géré dans la fonction draw de la class Circle
  });

  requestAnimationFrame(draw);
}

function detectPixels() {
  // on prépare une variable pour stocker les pixels
  let pixels = null;
  // on dessine l'image dans le contexte
  // attention si on veut l'image static, il faut remplacer video par image
  if (webcam) {
    context.drawImage(video, 0, 0);
  } else {
    context.drawImage(image, 0, 0);
  }
  // on récupère les pixels de l'image
  pixels = context.getImageData(0, 0, largeur, hauteur);

  // on parcours tous les cercles
  grille.forEach((circle, i) => {
    //récupérer la couleur du pixel par l'index
    let index = (circle.origin.y * largeur + circle.origin.x) * 4;
    // on récupère les valeurs de rouge, vert et bleu
    let r = pixels.data[index];
    let g = pixels.data[index + 1];
    let b = pixels.data[index + 2];
    // on calcule l'intensité de la couleur
    let intensity = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    // circle.changeColor(r, g, b);
    // on change le rayon du cercle en fonction de l'intensité (pourcentage de 0 à 1)
    circle.changeRadius(intensity / 255);
  });
}

function initialiserCamera() {
  video = document.createElement("video");
  navigator.getMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;

  navigator.getMedia(
    {
      video: { width: largeur, height: hauteur },
      audio: false,
    },
    (stream) => {
      video.srcObject = stream;
      video.play();
    },
    (error) => {
      console.log(error);
    }
  );
}

function mousePressed(e) {}

window.onload = function () {
  console.log("on est pret");
  setup();
};
