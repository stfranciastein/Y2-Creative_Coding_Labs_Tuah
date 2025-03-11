class Plane {
    constructor(obj) {
        //Pos
        this.posX = obj.posX ?? screenWidth / 2;
        this.posY = obj.posY ?? screenHeight / 2;

        //Velocity
        this.velocityX = obj.velocityX ?? random(-0.5, 0.5);
        this.velocityY = obj.velocityY ?? random(-0.5, 0.5);

        //Airplane
        this.apWidth = obj.apWidth ?? 20;
        this.apHeight = obj.apHeight ?? 30;
        this.apTail = obj.apTail ?? 8;

        //Alert System
        this.apAlert = false;
        this.apAlertCount = 0;
    }

    renderPlanes() {

        push();
        translate(this.posX, this.posY);

        
        if(this.apAlert){
            push();
                noFill();
                rotate(0);
                stroke(200, 0, 0);
                ellipse(this.apHeight*0.3, 0, this.apHeight*1.3);
                text('Collision Warning', 35, 5);
            pop();
            }

        rotate(atan2(this.velocityY, this.velocityX));
        fill(200, 200, 255);
        stroke(255, 255, 255);
        

        beginShape()
        vertex(0, 0) //this is the middle point of the Airplane
        vertex(-this.apTail, -this.apWidth / 2);
        vertex(this.apHeight - this.apTail, 0);
        vertex(-this.apTail, this.apWidth / 2);
        endShape(CLOSE);


        pop()

    }

    renderAlerts(){
        stroke(0,0,0);
        fill(0,0,0);
        textSize(15);
        text('Number of collisions ' + this.apAlertCount, 0, 0)
    }

    movePlanes() {
        this.posX = this.posX + this.velocityX;
        this.posY = this.posY + this.velocityY;
    }

}