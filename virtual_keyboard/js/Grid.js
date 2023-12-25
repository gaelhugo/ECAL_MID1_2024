export default class Grid {
  constructor(ctx) {
    console.log("Grid.js");
    // this.canvas = document.createElement("canvas");
    // this.canvas.width = window.innerWidth;
    // this.canvas.height = window.innerHeight;
    // document.body.appendChild(this.canvas);
    this.ctx = ctx; //this.canvas.getContext("2d");

    // this.draw()
  }

  draw(finger) {
    // dessiner une grille de 4 x 4
    const largeur = window.innerWidth / 4;
    const hauteur = window.innerHeight / 4;

    let indexDoigt = -1;
    if (finger.x === null || finger.y === null) {
      indexDoigt = -1;
    } else {
      const x = Math.floor((finger.x * window.innerWidth) / largeur);
      const y = Math.floor((finger.y * window.innerHeight) / hauteur);
      indexDoigt = y * 4 + x;
    }

    this.ctx.strokeStyle = "red";
    let index = 0;
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        this.ctx.beginPath();
        this.ctx.rect(x * largeur, y * hauteur, largeur, hauteur);
        this.ctx.stroke();
        this.ctx.closePath();
        if (index === indexDoigt) {
          this.ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
          this.ctx.fill();
        }

        this.ctx.font = "30px Arial";
        this.ctx.fillStyle = "red";
        this.ctx.fillText(index, x * largeur + 10, y * hauteur + 30);

        index++;
      }
    }
  }
}
