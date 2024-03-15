export default class Circle {
  constructor(x, y, radius, color, ctx, note = null, piano = null) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.ctx = ctx;
    this.note = note;
    this.piano = piano;
    this.isPlayed = false;
  }

  playNote() {
    this.piano.sampler.triggerAttack(this.note);
  }

  move() {
    this.x += 5;
    if (this.x > window.innerWidth - 100) {
      if (this.isPlayed) return;

      this.playNote();
      this.isPlayed = true;
      this.radius *= 2;
    }
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }
}
