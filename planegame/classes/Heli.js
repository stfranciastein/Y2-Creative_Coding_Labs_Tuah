class Heli extends Craft {
    _renderBaseShape() {
        fill(0,255,0);
        stroke(0);
        strokeWeight(1);
        rect(0, 0, this.apHeight, this.apWidth / 2, this.apWidth / 4);
        stroke(0,255,0);
        strokeWeight(2);
        line(-15, 0, 15, 0);  // horizontal blade
        line(0, -15, 0, 15);  // vertical blade
    }
}
