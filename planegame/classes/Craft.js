class Craft{
    constructor(obj){

        this.pos = createVector(this.posX = obj.posX ?? 250, this.posY = obj.posY ?? 250)
        // this.posX = obj.posX ?? 250;
        // this.posY = obj.posY ?? 250;

        this.speed = obj.speed ?? random(0.2,3);
        this.angle = obj.angle ?? random(0,360);

        this.apWidth = obj.apWidth ?? 25;
        this.apHeight = obj.apHeight ?? 20;
        this.tail = obj.tail ?? 4;
        this.alert = true;
        
        this.vel = createVector(
            this.speed * cos(this.angle),
            this.speed * sin(this.angle)
        )
        

        this.updateVelocity();
    }

    updateVelocity(){
        this.vel.x = this.speed*cos(this.angle);
        this.vel.y = this.speed*sin(this.angle);
    }

    turnRight(){
        this.futureAngle += 15;
        this.updateVelocity();

    }

    turnLeft(){
        this.futureAngle += 15; 
        this.updateVelocity();

    }

    increaseSpeed(){
        this.speed += 0.3;
        this.updateVelocity();
    }

    decreaseSpeed(){
        this.speed -= 0.3;
        this.updateVelocity();
    }

    render(id){
       
        push();
        translate(this.pos.x,this.pos.y)

        //let angle = atan2(this.velY,this.velX);
        
        textSize(15)
        text(id,10,-10)

         rotate(this.angle)
        strokeWeight(2)
        fill(0);
        ellipse(0,0,this.apWidth);


        if(this.alert){
            noFill()
            stroke(200, 0, 0);
            strokeWeight(2)
            ellipse(this.apHeight*0.15,0,this.apHeight*1.8)
        }
        pop()
    }

    

    move(){
        push()
              if(this.angle<this.futureAngle){
            this.angle += 2.0;
            this.updateVelocity();
            }
            else if(this.angle<this.futureAngle){
                this.angle -= 2.0;
                this.updateVelocity();
            }
            this.pos.x = this.pos.x + this.vel.x;
            this.pos.y = this.pos.y + this.vel.y;
        pop()
    }
}
