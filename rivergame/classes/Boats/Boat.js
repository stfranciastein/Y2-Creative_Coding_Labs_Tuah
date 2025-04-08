class Boat {
  constructor(color = 'white') {
    this.x = width / 2;
    this.y = height - 60;
    this.w = 60;
    this.h = 30;
    this.xdir = 0;
    this.ydir = 0;
    this.color = color;

    this.abilityActive = false;
    this.abilityStart = 0;
    this.abilityDuration = 5000;
    this.cooldown = 10000;
    this.lastUsed = -10000;
    this.trail = [];

    this.tiltAngle = 0;
    this.targetTilt = 0;
  }

  setDirX(dir) {
    this.xdir = dir;
    this.targetTilt = dir * 40; // -10 for left, 10 for right
  }

  setDirY(dir) {
    this.ydir = dir;
  }

  isInvulnerable() {
    return this.type === "fat" && this.abilityActive;
  }

  isMagnetising() {
    return this.type === "default" && this.abilityActive;
  }

  triggerAbility() {
    if (millis() - this.lastUsed > this.cooldown) {
      this.abilityActive = true;
      this.abilityStart = millis();
      this.lastUsed = millis();
      if (typeof sfxpower !== 'undefined') sfxpower.play();
    }
  }

  update(wind) {
    if (millis() - this.abilityStart > this.abilityDuration) {
      this.abilityActive = false;
    }

    this.x += this.xdir * this.speed + wind;
    this.y += this.ydir * this.speed;

    this.x = constrain(this.x, this.w / 2, width - this.w / 2);
    this.y = constrain(this.y, this.h / 2, height - this.h / 2);

    this.tiltAngle = lerp(this.tiltAngle, this.targetTilt, 0.1);
  }

  show() {
    fill(this.color);
    noStroke();
    push();
    translate(this.x, this.y);
    rotate(radians(this.tiltAngle)); // Apply tilt, need to apply to every new shaped boat (not Vanguard)
    beginShape();
    vertex(0, -40);
    vertex(20, 20);
    vertex(0, 30);
    vertex(-20, 20);
    endShape(CLOSE);
    pop();
  }

  showAbilityEffect() {
    if (this.abilityActive) {
      push();
      strokeWeight(2);
      stroke(this.getAbilityColor());
      noFill();
      this.renderAbilityVisual();
      pop();
    }
  }

  getAbilityColor() {
    if (this.type === "default") return color(0, 255, 255);
    if (this.type === "fat") return color(255, 165, 0);
    if (this.type === "fast") return color(255, 255, 100);
    return color(255);
  }

  renderAbilityVisual() {}
}

// Refactored other boat shapes to subclasses