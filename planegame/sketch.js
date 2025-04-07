let airFields = [];
let currentCraft = 0;
let keysHeld = {};
let moveP;
let canvasWidth = 1000;
let canvasHeight = 1000;


function setup() {
    createCanvas(canvasWidth, canvasHeight);
    angleMode(DEGREES);
    rectMode(CENTER);

    // //2 Airfields
    // airFields.push(new airField({ 
    //     airFieldPosY: 300 }));

    // airFields.push(new airField({ 
    //     airFieldPosX: 600, 
    //     airFieldPosY: 300 }));

    //1 Airfield (for submission appearance)
    airFields.push(new airField({
        airFieldPosX: canvasWidth / 2,
        airFieldPosY: canvasHeight / 2,
        width: 500,
        height: 500
    }))
}

function draw() {
    background(0);

    for (let af of airFields) {
        af.renderAirfield();
        af.renderCrafts();
        af.moveCrafts();
        af.checkpos();
        af.checkDis();
    }

    handleInput();
}

function keyPressed() {
    keysHeld[keyCode] = true;

    // Number keys 0–9 to select a craft
    if (key >= '0' && key <= '9') {
        let totalCrafts = airFields.reduce((sum, field) => sum + field.crafts.length, 0);
        currentCraft = constrain(int(key), 0, totalCrafts - 1);
    }
}

function keyReleased() {
    keysHeld[keyCode] = false;
}

function handleInput() {
    const selected = getCurrentCraft();
    if (!selected) return;

    if (keysHeld[LEFT_ARROW]) {
        selected.turnLeft();
    }
    if (keysHeld[RIGHT_ARROW]) {
        selected.turnRight();
    }
    if (keysHeld[UP_ARROW]) {
        selected.increaseSpeed();
    }
    if (keysHeld[DOWN_ARROW]) {
        selected.decreaseSpeed();
    }
}

function getCurrentCraft() {
    let index = currentCraft;
    for (let field of airFields) {
        if (index < field.crafts.length) {
            return field.crafts[index];
        }
        index -= field.crafts.length;
    }
    return null;
}
