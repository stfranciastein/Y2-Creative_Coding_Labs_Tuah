let airFields = [];

function setup() {
    createCanvas(1000, 1000);
    angleMode(DEGREES);
    rectMode(CENTER);
    airFields.push(new Airfield({
      numPlanes: 1000,
      airFieldPosX: 250}))

    airFields.push(new Airfield({
      numPlanes: 1000,
      airFieldPosX: 750
    }))
  }
  
function draw() {
    background(80, 207, 230);

    for (i = 0; i < airFields.length; i++) {
    airFields[i].renderAirfield();
    airFields[i].renderPlanes();
    airFields[i].movePlanes();
    airFields[i].checkPos();
    }

  }