export default class Particle {
  constructor(x, y, radius, color, isExploding = false) {
    console.log("Particle initialized");
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    const maxVel = isExploding ? 10 : 1;
    this.velocity = {
      x: Math.random() * maxVel - maxVel / 2,
      y: Math.random() * maxVel - maxVel / 2,
    };
    this.isExploding = isExploding;
    this.lifeSpan = 0;
    this.maxLife = Math.random() * 50 + 20;
    this.angle = Math.random() * 360;
    // either +1 or -1
    this.direction = Math.random() > 0.5 ? 1 : -1;
    this.orbitx = Math.random() * (this.radius + 10);
    this.orbity = Math.random() * (this.radius + 10);
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    // check screen borders
    if (this.x >= window.innerWidth || this.x <= 0) {
      this.velocity.x = -this.velocity.x;
    }
    if (this.y >= window.innerHeight || this.y <= 0) {
      this.velocity.y = -this.velocity.y;
    }
    if (this.isExploding) {
      this.lifeSpan++;
    }
  }

  draw(ctx) {
    if (this.isExploding && this.lifeSpan >= this.maxLife) {
      // remove particle
      return;
    }
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();

    if (this.isExploding) return;
    // extra effect for fun
    ctx.beginPath();
    ctx.arc(
      this.x + Math.cos(this.angle * (Math.PI / 180)) * this.orbitx,
      this.y + Math.sin(this.angle * (Math.PI / 180)) * this.orbity,
      2,
      0,
      Math.PI * 2,
      false
    );
    ctx.fillStyle = "rgba(255,255,255,1)";
    ctx.fill();
    ctx.closePath();
    this.angle += 5 * this.direction;
  }

  //check if point is inside the circle
  isInside(x, y) {
    return Math.sqrt((this.x - x) ** 2 + (this.y - y) ** 2) < this.radius;
  }
}
