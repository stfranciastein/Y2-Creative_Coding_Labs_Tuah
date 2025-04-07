class Plane extends Craft {
    _renderBaseShape() {
        beginShape();
        vertex(0, 0);
        vertex(-this.tail, -this.apWidth / 2);
        vertex(this.apHeight - this.tail, 0);
        vertex(-this.tail, this.apWidth / 2);
        endShape(CLOSE);
    }
}
