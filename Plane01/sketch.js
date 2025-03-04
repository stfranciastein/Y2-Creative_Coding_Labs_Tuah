let planes = []
let numPlanes = 4000;

function setup() {
    createCanvas(1000, 1000);


    for(let i=0; i< numPlanes; i++){
    planes.push(new Aeroplane())
    }
    
    angleMode(DEGREES);
  }
  
function draw() {

    background(80, 207, 230)

    for(let i=0; i<numPlanes; i++){
        planes[i].renderAeroplane();
        planes[i].movePlane();
    }
  }