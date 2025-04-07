class Heli extends Craft {
    _renderBaseShape() {
        // Helicopter body: pill shape
        fill(0);
        stroke(0);
        strokeWeight(1);
        rect(0, 0, this.apHeight, this.apWidth / 2, this.apWidth / 4); // rounded corners

        // Rotor blades: X shape
        stroke(0);
        strokeWeight(2);
        line(-15, -15, 15, 15);
        line(-15, 15, 15, -15);
    }
}
