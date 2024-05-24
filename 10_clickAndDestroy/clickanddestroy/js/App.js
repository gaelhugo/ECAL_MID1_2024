import Particle from "./Particle";
import Sounds from "./Sounds";
export default class App {
  constructor() {
    console.log("App initialized");
    const canvas = document.querySelector("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.ctx = canvas.getContext("2d");

    this.initBigParticles();
    this.initMouseListeners();
    this.initSounds();
    this.draw();
  }
  initSounds() {
    this.sounds = new Sounds();
  }

  initMouseListeners() {
    window.addEventListener("mousemove", (event) => {
      this.bigParticles.forEach((bigParticle) => {
        if (bigParticle.isInside(event.x, event.y)) {
          bigParticle.color = "white";
        } else {
          bigParticle.color = "rgb(120,120,0)";
        }
      });
    });
    // add click event to remove particles and add an explosion of micro particles
    window.addEventListener("click", (event) => {
      if (!this.isPlaying) {
        this.sounds.playAmbient();
        this.isPlaying = true;
      }
      // get the coordinate for the clicked particle
      const clickedParticle = this.bigParticles.find((bigParticle) =>
        bigParticle.isInside(event.x, event.y)
      );
      if (!clickedParticle) return;
      const max = 100;
      for (let i = 0; i < max; i++) {
        this.smallParticles.push(
          new Particle(clickedParticle.x, clickedParticle.y, 2, "white", true)
        );
      }
      // remove clickedParticle from the array
      this.bigParticles = this.bigParticles.filter(
        (bigParticle) => bigParticle !== clickedParticle
      );
      this.sounds.playDrop();
    });
  }

  initBigParticles() {
    this.bigParticles = [];
    this.smallParticles = [];
    const max = 20;
    for (let i = 0; i < max; i++) {
      this.bigParticles.push(
        new Particle(
          Math.random() * window.innerWidth,
          Math.random() * window.innerHeight,
          10,
          0
        )
      );
    }
  }

  draw() {
    this.ctx.fillStyle = `rgba(0,0,40,0.1)`;
    this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    this.bigParticles.forEach((bigParticle) => {
      bigParticle.update();
      bigParticle.draw(this.ctx);
    });
    this.smallParticles.forEach((smallParticle) => {
      smallParticle.update();
      smallParticle.draw(this.ctx);
    });
    requestAnimationFrame(this.draw.bind(this));
  }
}
