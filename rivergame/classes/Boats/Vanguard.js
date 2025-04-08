class Vanguard extends Boat {
    constructor(color = 'white') {
      super(color);
      this.type = "default";
      this.speed = 5;
      this.health = this.maxHealth = 3;
    }
  
    renderAbilityVisual() {
      ellipse(this.x, this.y, 120);
      ellipse(this.x, this.y, 150);
    }
    
  }