class HeartPickup extends Debris {
  constructor() {
    super(random(50, width - 50), -20, 15, random(1.5, 3));
  }

  show() {
    fill(255, 0, 0);
    beginShape();
    vertex(this.x, this.y);
    bezierVertex(this.x - 7, this.y - 7, this.x - 14, this.y + 7, this.x, this.y + 14);
    bezierVertex(this.x + 14, this.y + 7, this.x + 7, this.y - 7, this.x, this.y);
    endShape(CLOSE);
  }

  hits(boat) {
    return dist(this.x, this.y, boat.x, boat.y) < this.r + boat.w / 2;
  }
}
