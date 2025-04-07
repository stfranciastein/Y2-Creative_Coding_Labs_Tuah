class Plane extends Craft {
    _renderBaseShape() {
        fill(0,255,100);
        stroke(0);
        strokeWeight(1);
        beginShape();
            vertex(0, 0);
            vertex(-this.tail, -this.apWidth / 2);
            vertex(this.apHeight - this.tail, 0);
            vertex(-this.tail, this.apWidth / 2);
        endShape(CLOSE);
    }
}
