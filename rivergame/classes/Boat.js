class Boat {
    constructor(type, color = 'white') {
      this.x = width / 2;
      this.y = height - 60;
      this.w = 60;
      this.h = 30;
      this.xdir = 0;
      this.ydir = 0;
      this.color = color;
      this.type = type;
  
      this.abilityActive = false;
      this.abilityStart = 0;
      this.abilityDuration = 5000; // 5 seconds
      this.cooldown = 10000; // 10 seconds
      this.lastUsed = -10000;
      this.trail = []; // For ghosties

  
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
      if (this.type === "fast" && this.abilityActive) {
        this.x += this.xdir * this.speed * 2 + wind;
        this.y += this.ydir * this.speed * 2;
      } else {
        this.x += this.xdir * this.speed + wind;
        this.y += this.ydir * this.speed;
      }
      this.x = constrain(this.x, this.w / 2, width - this.w / 2);
      this.y = constrain(this.y, this.h / 2, height - this.h / 2);
  
      if (this.abilityActive && millis() - this.abilityStart > this.abilityDuration) {
        this.abilityActive = false;
      }

      if (this.type === "fast" && this.abilityActive) {
        this.trail.push({ x: this.x, y: this.y, t: millis() });
        if (this.trail.length > 10) this.trail.shift();
      }      
    }
  
    show() {
      fill(this.color || 255);
      push();
      translate(this.x, this.y);
      beginShape();
      vertex(0, -40);
      vertex(20, 20);
      vertex(0, 30);
      vertex(-20, 20);
      endShape(CLOSE);
      pop();
    }
  
    triggerAbility() {
      if (millis() - this.lastUsed < this.cooldown) return;
      this.abilityActive = true;
      this.abilityStart = millis();
      this.lastUsed = millis();
      sfxpower.play();
    }
  
    showAbilityEffect() {
      if (!this.abilityActive) return;
  
      if (this.type === "default") {
            // Vanguard
            push();
                noFill();
                stroke(0, 255, 255);
                strokeWeight(2);
                ellipse(this.x, this.y, 200);
            pop();
        } else if (this.type === "fast") {
            // Stingray
            push();
                stroke(this.color);
                strokeWeight(2);
                line(this.x, this.y + 30, this.x, this.y + 50);          // Center tail
                line(this.x - 8, this.y + 25, this.x - 4, this.y + 50);  // Left tail
                line(this.x + 8, this.y + 25, this.x + 4, this.y + 50);  // Right tail
            pop();
        } else if (this.type === "fat") {
            // Bulwark
            push();
                translate(this.x, this.y);
                noFill();
                stroke(255, 140, 0);
                strokeWeight(3);
                scale(1.3);
                beginShape();
                    vertex(0, -40);
                    vertex(20, 20);
                    vertex(0, 30);
                    vertex(-20, 20);
                endShape(CLOSE);
            pop();
        }
    }
  
    isInvulnerable() {
      return this.type === "fat" && this.abilityActive;
    }
  
    isMagnetising() {
      return this.type === "default" && this.abilityActive;
    }
  }
  