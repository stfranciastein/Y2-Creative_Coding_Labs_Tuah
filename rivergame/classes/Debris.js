class Debris {
  constructor(x, y, r, speed) {
    this.x = x || random(50, width - 50);
    this.y = y || -20;
    this.r = r;
    this.speed = speed;
  }

  update(multiplier) {
    this.y += this.speed * multiplier;
  }

  offscreen() {
    return this.y - this.r > height;
  }
}
