class Airfield {
    constructor(obj) {
        this.width = obj.width ?? 200;
        this.height = obj.height ?? 200;
        this.posX = obj.posX ?? 100
        this.posY = obj.posY ?? 100
        this.numPlanes = obj.numPlanes ?? 10;
        this.planes = [];
        this.alertNum = 0;
        //gen planes will populate planes array 
        this.generatePlanes();
    }


    renderAirfield() {
        push();
            translate(this.posX, this.posY);
            noStroke()
            fill(120, 200, 255)
            rect(0, 0, this.width, this.height);


            this.planes.forEach((plane) => {
                this.checkPos(plane);
                plane.renderPlanes();
                plane.movePlanes();

            });
        pop();

    }

    generatePlanes() {
        for (let i = 0; i < this.numPlanes; i++) {
            this.planes.push(new Plane({
                //sending an object
                posX: random(0, this.width),
                posY: random(0, this.height),
                valX: random(-1, 1),
                valY: random(-1, 1),
            }))
        }
    }

    checkPos(plane) {
        // X Boundaries
        if (plane.posX > this.width) {
            plane.posX = 0;
            plane.posY = map(plane.posY, 0, this.height, this.height, 0);
        } else if (plane.posX < 0) {
            plane.posX = this.width;
            plane.posY = map(plane.posY, 0, this.height, this.height, 0);
        }
    
        // Y Boundaries
        if (plane.posY > this.height) {
            plane.posY = 0;
            plane.posX = map(plane.posX, 0, this.width, this.width, 0);
        } else if (plane.posY < 0) {
            plane.posY = this.height; 
            plane.posX = map(plane.posX, 0, this.width, this.width, 0);
        }
    }
    

    checkDist(){
        this.planes.forEach(plane => plane.apAlert = 0);
        
        // let count = 0;

        for (let i=0; i<this.planes.length; i++){
            for (let j=i+1; j<this.planes.length; j++){
                let planeA = this.planes[i];
                let planeB = this.planes[j];
                let dist = sqrt((sq(planeA.posX - planeB.posX) + (sq(planeA.posY - planeB.posY))));

                if(dist < 40){
                    planeA.apAlert = true;
                    planeB.apAlert = true;
                    this.alertNum = this.alertNum + 1;
                    console.log('Collisions' + this.alertNum);
                }
                // console.log('The distance of this plane is: ' + dist);
                // count++
                // console.log(count);
            }
        }
    }
}







