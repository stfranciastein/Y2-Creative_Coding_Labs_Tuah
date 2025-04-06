class Boat {
    constructor(type, color = 'white') {
      this.x = width / 2;
      this.y = height - 60;
      this.w = 60;
      this.h = 30;
      this.xdir = 0;
      this.ydir = 0;
      this.color = color;
  
      if (type === "default") {
        this.speed = 5;
        this.health = this.maxHealth = 3;
      } else if (type === "fast") {
        this.speed = 7;
        this.health = this.maxHealth = 2;
      } else if (type === "fat") {
        this.speed = 3;
        this.health = this.maxHealth = 5;
      }
    }
  
    setDirX(dir) {
      this.xdir = dir;
    }
  
    setDirY(dir) {
      this.ydir = dir;
    }
  
    update(wind) {
      this.x += this.xdir * this.speed + wind;
      this.y += this.ydir * this.speed;
      this.x = constrain(this.x, this.w / 2, width - this.w / 2);
      this.y = constrain(this.y, this.h / 2, height - this.h / 2);
    }
  
    show() {
      fill(this.color || 255);
      push();
        translate(this.x, this.y);
        beginShape();
            vertex(0, -40);    // Front (nose)
            vertex(20, 20);    // Right rear
            vertex(0, 30);     // Center back
            vertex(-20, 20);   // Left rear
        endShape(CLOSE);
      pop();
    }
  }
  