let airFields = [];

function setup() {
    createCanvas(1200, 600)
    angleMode(DEGREES);
    // rectMode(CENTER); Having this as center will mess up the logic for checkpos
    airFields.push(new Airfield({
        height: 500,
        width: 500, 
        numPlanes: 5, 
        posX: 20 ,
        posY: 20 ,

    }))

    airFields.push(new Airfield({
        width: 500 , 
        height: 500, 
        numPlanes: 10, 
        posX: 600 ,
        posY: 20 ,

    }))

}

function draw() {
    background(150,200,255); // Need to draw the background in draw so that the planes don't generate a trail.

    for (let i=0; i<airFields.length; i++){
        airFields[i].renderAirfield();
        airFields[i].renderPlanes();
        airFields[i].movePlanes();
        airFields[i].checkDist();
        airFields[i].renderPlanes();
    }

}

function keyPressed(){
    switch (key) {
        case "1": currentPlane=1; break
        case "2": currentPlane=2; break
        case "3": currentPlane=3; break
        case "4": currentPlane=4; break
        case "5": currentPlane=5; break
        case "6": currentPlane=6; break
        case "7": currentPlane=7; break
        case "8": currentPlane=8; break
        case "9": currentPlane=9; break
        case "0": currentPlane=0; break
    }
    console.log(currentPlane);
}