class Stingray extends Boat {
    constructor(color = 'white') {
      super(color);
      this.type = "fast";
      this.speed = 7;
      this.health = this.maxHealth = 2;
    }
  
    show() {
      fill(this.abilityActive ? color(255, 255, 100) : this.color);
      noStroke();
      push();
        translate(this.x, this.y);
        rotate(radians(this.tiltAngle));
        beginShape();
          vertex(0, -35);       
          vertex(20, 20);       
          vertex(5, 15);        
          vertex(0, 25);        
          vertex(-5, 15);       
          vertex(-20, 20);      
        endShape(CLOSE);
      pop();
    }
  
    update(wind) {
      if (millis() - this.abilityStart > this.abilityDuration) {
        this.abilityActive = false;
      }
      if (this.xdir !== 0) {
        this.tiltAngle = lerp(this.tiltAngle, this.xdir * 10, 0.1); // Smooth tilt
      } else {
        this.tiltAngle = lerp(this.tiltAngle, 0, 0.1); // Reset to upright
      }
  
      const effectiveSpeed = this.abilityActive ? this.speed * 2 : this.speed;
  
      this.x += this.xdir * effectiveSpeed + wind;
      this.y += this.ydir * effectiveSpeed;
  
      this.x = constrain(this.x, this.w / 2, width - this.w / 2);
      this.y = constrain(this.y, this.h / 2, height - this.h / 2);
    }
  }