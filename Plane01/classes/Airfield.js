class Airfield{
    constructor(obj){
        this.numPlanes = obj.numPlanes ?? 10;
        this.airFieldWidth = obj.airFieldWidth ?? 500;
        this.airFieldHeight = obj.airFieldHeight ?? 500;
        this.airFieldPosX = obj.airFieldPosX ?? 500;
        this.airFieldPosY = obj.airFieldPosY ?? 500;
        this.planes = [];
        this.generatePlanes();
    }

    renderAirfield() {
        fill(100,200,255)
        push()
            translate (this.airFieldPosX, this.airFieldPosY);
            rect (0,0, this.airFieldWidth, this.airFieldHeight);
        pop()
        
    }

    renderPlanes(){
        push ()
        translate (this.airFieldPosX, this.airFieldPosY);
        this.planes.forEach(plane => plane.renderAeroplane())
        pop ()
    }

    movePlanes(){
        this.planes.forEach(plane => {plane.movePlane();})
    }

    //Moved from the Aeroplane class because you need to check for the position relative to the airfield
    checkPos(){
        this.planes.forEach(plane => {
            if (plane.posX > this.airFieldWidth/2){
                plane.posX = this.airFieldWidth/2;
                plane.posY = map(plane.posY,0,1000,1000,0)
            } else if (plane.posY < 0){
                plane.posX = 1000;
                plane.posY = map(plane.posY,0,1000,1000,0)
            }       
       })

    }

    generatePlanes(){
        for (let i=0; i < this.numPlanes; i++){
            this.planes.push(new Aeroplane({
                posX: random(-this.airFieldWidth/2, this.airFieldWidth/2),
                posY: random(-this.airFieldHeight/2, this.airFieldHeight/2),
            }))
        }
    }
}

// for(let i=0; i< numPlanes; i++){
//     planes.push(new Aeroplane({
//       posX: 500,
//       posY: 500,
//       apWidth: 50, 
//       apHeight: 20, // nose to tails 
//       tail: 70,
//     }))
//     }

// for(let i=0; i<numPlanes; i++){
//     planes[i].renderAeroplane();
//     planes[i].checkPos();
//     planes[i].movePlane();
// }