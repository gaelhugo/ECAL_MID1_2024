export default class Sounds {
  constructor() {
    this.ambientSound = new Audio("./Flickering.mp3");
    this.ambientSound.loop = true;
    this.drops = [new Audio("./drop2.mp4"), new Audio("./drop3.mp4")];
  }

  playAmbient() {
    this.ambientSound.play();
  }

  playDrop() {
    const index = Math.floor(Math.random() * 2);
    this.drops[index].currentTime = 0;
    this.drops[index].play();
  }
}
