let airFields = [];

function setup() {
    createCanvas(1200, 600)
    angleMode(DEGREES);
    // rectMode(CENTER); Having this as center will mess up the logic for checkpos
    airFields.push(new Airfield({
        height: 500,
        width: 500, 
        numPlanes: 12, 
        posX: 20 ,
        posY: 20 ,

    }))

    airFields.push(new Airfield({
        width: 500 , 
        height: 500, 
        numPlanes: 5, 
        posX: 600 ,
        posY: 20 ,

    }))


}

function draw() {
    background(150,200,255); // Need to draw the background in draw so that the planes don't generate a trail.

    for (let i=0; i<airFields.length; i++){
        airFields[i].renderAirfield();
        // airfield.generatePlanes();
        airFields[i].checkDist();
    }

}