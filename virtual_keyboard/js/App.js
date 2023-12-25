import Camera from "./Camera.js";
import Grid from "./Grid.js";
import HandDetector from "./HandDetector.js";

export default class App {
  constructor() {
    console.log("App.js");
    this.cam = new Camera();

    this.handDetector = new HandDetector(this.cam.video);
    this.handDetector.addEventListener(
      "ready",
      this.onHandDetectorReady.bind(this)
    );
  }

  onHandDetectorReady(e) {
    this.grid = new Grid(this.handDetector.ctx);
    this.draw();
  }

  draw() {
    this.handDetector.detect();
    this.grid.draw(this.handDetector.finger);
    requestAnimationFrame(this.draw.bind(this));
  }
}
