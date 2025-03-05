class Aeroplane {
    
    constructor(obj){
        this.posX = obj.posX ?? random(0, 1000);
        this.posY = obj.posY ?? random(0, 1000);
        this.planeColour1 = obj.planeColour1 || random(200,255);
        this.planeColour2 = obj.planeColour2 || random(200,255);
        this.planeColour3 = obj.planeColour2 || random(200,255);

        this.apWidth = obj.apWidth || 50;
        this.apHeight = obj.apHeight || 20;
        this.tail = obj.tail || 40;

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

    //Needs to be moved to airfield
    // checkPos(){
    //     if (this.posX > 1000){
    //         this.posX = 0;
    //         this.posY = map(this.posY,0,1000,1000,0)
    //     } else if (this.posY < 0){
    //         this.posX = 1000;
    //         this.posY = map(this.posY,0,1000,1000,0)
    //     }       
    // }
 

    movePlane(){
        this.posX = this.posX + this.velX;
        this.posY = this.posY + this.velY;
    }
    
    
    // reversePlane(){
    //     this.posX = this.posX - this.velX;
    //     this.posY = this.posY - this.velY;
    // }
}