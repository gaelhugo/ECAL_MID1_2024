// la définition de la classe Circle c'est comme définir une function mais sans les parenthèses
// la fonction par défaul est le constructor
// on peut passer des paramètres au constructor
// dans une class on n'écrit pas "function" pour TOUTES les fonctions
// une variable globale de class s'écrit avec "this."
class Circle {
  constructor(x, y, rayon) {
    this.x = x;
    this.y = y;
    this.rayon = rayon;
    // on initialise une couleur au bol
    this.color = "red";
    this.rotation = 0;
  }

  changeColor() {
    // on affect une couleur aléatoire
    this.color = `rgb(${Math.random() * 255},${Math.random() * 255},${
      Math.random() * 255
    })`;
    //on change la taille du rayon
    this.rayon = Math.random() * 100;
  }

  isInMe(mouseX, mouseY) {
    // on calcule la distance entre la souris et le centre
    let d = this.dist(mouseX, mouseY, this.x, this.y);
    // on compare cette distance au rayon
    if (d < this.rayon) {
      return true;
    } else {
      return false;
    }
  }

  draw(context) {
    //pour préparer la rotation
    context.save();
    //on translate le contexte au centre du cercle
    context.translate(this.x, this.y);
    //on fait la rotation
    context.rotate(this.rotation);
    //on dessine le cercle
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(0, 0, this.rayon, 0, 2 * Math.PI, true);
    context.fill();
    context.closePath();

    context.restore();
  }

  dist(x1, y1, x2, y2) {
    // calcule la distance entre deux points
    // pythagore power
    let d = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    return d;
  }
}
