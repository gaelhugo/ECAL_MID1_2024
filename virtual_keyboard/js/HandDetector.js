import { HandLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { drawLandmarks } from "@mediapipe/drawing_utils";
import EventEmitter from "@onemorestudio/eventemitterjs";

export default class HandDetector extends EventEmitter {
  constructor(videoElement) {
    super();
    this.videoElement = videoElement;
    console.log("HandDetector.js");
    this.canvas = document.createElement("canvas");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.finger = { x: null, y: null };
    this.createHandLandmarker();
  }

  async createHandLandmarker() {
    const vision = await FilesetResolver.forVisionTasks("./tasks/wasm");

    this._handLandmarker = await HandLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: `./tasks/hand_landmarker.task`,
        delegate: "GPU",
      },
      runningMode: "VIDEO", // this.runningMode,
      numHands: 2,
    });

    // this.detect();
    this.emit("ready", []);
  }

  detect() {
    let startTimeMs = performance.now();
    const results = this._handLandmarker.detectForVideo(
      this.videoElement,
      startTimeMs
    );
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (results.landmarks.length > 0) {
      //   console.log(results.landmarks);
      results.landmarks.forEach((pointsDeLaMain) => {
        drawLandmarks(this.ctx, pointsDeLaMain, { color: "red", radius: 5 });
      });

      // je peux stocker les coordonnées du bout du doigt
      this.finger = results.landmarks[0][8];
    } else {
      this.finger = { x: null, y: null };
    }
  }
}
