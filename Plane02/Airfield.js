class Airfield {
    constructor(obj) {
        this.width = obj.width ?? 200;
        this.height = obj.height ?? 200;
        this.posX = obj.posX ?? 100
        this.posY = obj.posY ?? 100
        this.numPlanes = obj.numPlanes ?? 10;

        this.planes = [];
        //gen planes will populate planes array 
        this.generatePlanes();

    }

    renderAirfield() {
        push();
            translate(this.posX, this.posY);
            stroke(255);
            fill(120, 200, 255)
            rect(0, 0, this.width, this.height);
        pop();
    }

    renderPlanes() {
        push();
        translate(this.airFieldPosX, this.airFieldPosY); 
        fill(0, 50, 0);
        console.log(planes);
        this.planes.forEach((plane,id) => {
            plane.render(id);
            console.log(id);
        });
        pop();
    }

    movePlanes(){
        this.planes.forEach(plane => {
            this.checkPos(plane);
            plane.move();
        })
    }

    generatePlanes() {
        for (let i = 0; i < this.numPlanes; i++) {
            let x = random(-this.width / 2, this.width / 2);
            let y = random(-this.height / 2, this.height / 2);

            this.planes.push(new Plane (x, y));
        }
    }
    

    renderPlanes() {
        push();
        translate(this.posX, this.posY);
        fill(0, 50, 0);
        this.planes.forEach((plane,id) => {
            plane.renderPlanes(id);
            // console.log('Test');
        });
        pop();
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
                    planeA.apAlert = 1;
                    planeB.apAlert = 1;
                }
                else if (dist < 20) {
                    planeA.apAlert = 2;
                    planeB.apAlert = 2;
                }
                // console.log('The distance of this plane is: ' + dist);
                // count++
                // console.log(count);
            }
        }
    }
}







