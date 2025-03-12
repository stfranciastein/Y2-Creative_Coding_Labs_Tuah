class Plane {
    constructor(obj) {
        //Pos
        this.posX = obj.posX ?? random(0, 500);
        this.posY = obj.posY ?? random(0, 500);

        //Speed
        this.speed = obj.speed ?? random(1, 5);
        this.angle = obj.angle ?? random(0, 360);

        //Airplane
        this.apWidth = obj.apWidth ?? 20;
        this.apHeight = obj.apHeight ?? 30;
        this.apTail = obj.apTail ?? 8;

        //Alert System
        this.apAlert = 0;

        //Velocity (Old)
        // this.velocityX = obj.velocityX ?? random(-0.5, 0.5);
        // this.velocityY = obj.velocityY ?? random(-0.5, 0.5);

        //Velocity (New)
        this.velocityX = this.speed * cos(this.angle);
        this.velocityY = this.speed * sin(this.angle);
    }

    renderPlanes(id) {

        push();
        translate(this.posX, this.posY);
        
        if(this.apAlert){
            push();
                noFill();
                rotate(0);
                stroke(200, 0, 0);
                // ellipse(this.apHeight*0.3, 0, this.apHeight*1.3); Moved this code to lower down so it still draws on the centre of the plane.
                text('Collision Warning', 35, -15);
            pop();
            }

        fill(255);
        stroke(100);
        text("Flight Number #" + id, 35, 0);
        
        
        rotate(this.angle);
        fill(200, 200, 255);
        stroke(255, 255, 255);
        

        beginShape();
        vertex(0, 0);
        vertex(-this.apTail, -this.apWidth / 2);
        vertex(this.apHeight - this.apTail, 0);
        vertex(-this.apTail, this.apWidth / 2);
        endShape(CLOSE);

        if(this.apAlert){
            stroke(200, 0, 0);
            noFill();
            ellipse(this.apHeight*0.3, 0, this.apHeight*1.5);
        }


        pop()

    }

    move() {
        this.posX = this.posX + this.velocityX;
        this.posY = this.posY + this.velocityY;
    }

}

