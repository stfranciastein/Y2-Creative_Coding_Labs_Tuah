class Bulwark extends Boat {
    constructor(color = 'white') {
      super(color);
      this.type = "fat";
      this.speed = 3;
      this.health = this.maxHealth = 5;
    }
  
    show() {
      fill(this.color);
      noStroke();
      push();
      translate(this.x, this.y);
      rotate(radians(this.tiltAngle));
  
      beginShape();
        vertex(0, -35);       
        vertex(18, -20);      
        vertex(25, 10);       
        vertex(20, 20);       
        vertex(-20, 20);      
        vertex(-25, 10);      
        vertex(-18, -20);     
      endShape(CLOSE);
  
      if (this.abilityActive) {
        noFill();
        stroke(255, 150, 0);
        strokeWeight(2);
        beginShape();
          vertex(0, -40);
          vertex(22, -22);
          vertex(30, 10);
          vertex(22, 25);
          vertex(-22, 25);
          vertex(-30, 10);
          vertex(-22, -22);
        endShape(CLOSE);
      }
  
      pop();
    }
  }