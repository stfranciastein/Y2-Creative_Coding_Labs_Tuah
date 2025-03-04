class Aeroplane {
    
    constructor(){
        this.posX = random(0, 1000);
        this.posY = random(0, 1000);
        this.planeColour1 = random(100,255);
        this.planeColour2 = random(100,255);
        this.planeColour3 = random(100,255);

        this.apWidth = 50;
        this.apHeight = 20;
        this.tail = 40;

        this.velX = random(-3, 3);
        this.velY = random(-3, 3);
    }

    renderAeroplane(){
        noStroke();
        push()
            fill(this.planeColour1, this.planeColour2, this.planeColour3);
            // rect (this.posX, this.posY, 60, 60);
            // console.log("Test");
            let angle = atan2(this.velY, this.velX);

            rotate(angle);
            translate(this.posX, this.posY)
            beginShape()
                vertex(0,0);
                vertex(-this.tail, -this.apWidth/2);
                vertex(this.apHeight-this.tail,0);
                vertex(-this.tail,this.apWidth/2);
            endShape(CLOSE)
        pop()
    }

    movePlane(){
        this.posX = this.posX + this.velX;
        this.posY = this.posY + this.velY;
    }
}