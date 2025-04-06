class Coin extends Debris {
    constructor() {
      super(random(50, width - 50), -20, 12, random(2, 3));
    }
  
    show() {
      fill(255, 215, 0);
      ellipse(this.x, this.y, this.r * 2);
    }
  
    hits(boat) {
      return dist(this.x, this.y, boat.x, boat.y) < this.r + boat.w / 2;
    }
  }
  