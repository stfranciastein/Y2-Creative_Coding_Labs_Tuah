class Craft {
    constructor(obj) {
        this.pos = createVector(obj.posX ?? 250, obj.posY ?? 250);
        this.speed = obj.speed ?? random(0.2, 3);
        this.angle = obj.angle ?? random(0, 360);

        this.apWidth = obj.apWidth ?? 25;
        this.apHeight = obj.apHeight ?? 20;
        this.tail = obj.tail ?? 4;
        this.alert = true;
        this.futureAngle = this.angle;

        this.vel = createVector(0, 0);
        this.updateVelocity();
    }

    updateVelocity() {
        this.vel.x = this.speed * cos(this.angle);
        this.vel.y = this.speed * sin(this.angle);
    }

    turnRight() {
        this.futureAngle += 15;
        this.updateVelocity();
    }

    turnLeft() {
        this.futureAngle -= 15;
        this.updateVelocity();
    }

    increaseSpeed() {
        this.speed += 0.3;
        this.updateVelocity();
    }

    decreaseSpeed() {
        this.speed -= 0.3;
        this.updateVelocity();
    }

    _renderBaseShape() {
        fill(100);
        ellipse(0, 0, this.apWidth - 10); // default circle shape
    }

    render(id, isSelected = false) {
        
        if (this.alert) {
            push();
                translate(this.pos.x, this.pos.y);
                noFill();
                stroke(200, 0, 0);
                strokeWeight(2);
                ellipse(0, 0, this.apWidth + 25);
                textAlign(CENTER, CENTER);
                fill(255,0,0);
                textSize(12);
                stroke(0);
                text("Collision Alert", 0, - (this.apWidth + 10));
            pop();
        }
        
        push();
        translate(this.pos.x, this.pos.y);
        textSize(15);
        text(id, 10, -10);

        rotate(this.angle);
        strokeWeight(2);

        this._renderBaseShape();

        if (isSelected) {
            noFill();
            stroke(255, 255, 0);
            strokeWeight(3);
            ellipse(0, 0, this.apWidth + 15);
        }
        pop();
    }

    move() {
        if (this.angle < this.futureAngle) {
            this.angle += 2.0;
        } else if (this.angle > this.futureAngle) {
            this.angle -= 2.0;
        }
        this.updateVelocity();

        this.pos.add(this.vel);
    }
}
