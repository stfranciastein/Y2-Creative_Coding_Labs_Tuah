class Plane extends Craft{
    constructor(obj){

        super(obj);

        this.tail = obj.tail ?? 4;
        this.alert = false;
        

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
        beginShape();
            vertex(0,0);
            vertex(-this.tail,-this.apWidth/2)
            vertex(this.apHeight -this.tail,0)
            vertex(-this.tail,this.apWidth/2)
        endShape(CLOSE);


        if(this.alert){
            noFill()
            stroke(200, 0, 0);
            strokeWeight(2)
            ellipse(this.apHeight*0.15,0,this.apHeight*1.8)
        }
        pop()
    }
}