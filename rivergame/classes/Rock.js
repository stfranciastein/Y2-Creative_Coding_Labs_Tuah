class Rock extends Debris {
    constructor() {
      super(random(width), -20, random(20, 40), random(2, 4));
      this.shape = [];
      let points = floor(random(5, 9));
      for (let i = 0; i < points; i++) {
        let angle = map(i, 0, points, 0, TWO_PI);
        let radius = this.r + random(-5, 5);
        this.shape.push({ angle, radius });
      }
    }
  
    show() {
      fill(100);
      beginShape();
      for (let pt of this.shape) {
        let x = this.x + cos(pt.angle) * pt.radius;
        let y = this.y + sin(pt.angle) * pt.radius;
        vertex(x, y);
      }
      endShape(CLOSE);
    }
  
    hits(boat) {
      return (
        this.y + this.r > boat.y - boat.h / 2 &&
        this.y - this.r < boat.y + boat.h / 2 &&
        this.x + this.r > boat.x - boat.w / 2 &&
        this.x - this.r < boat.x + boat.w / 2
      );
    }
  }
  