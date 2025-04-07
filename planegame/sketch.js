let airFields = [];
let moveP;


function setup(){
    createCanvas(500,500)
    background(255,0,0)
    angleMode(DEGREES)
    rectMode(CENTER)
    airFields.push(new airField({
        
    }))
    
}

function draw(){
    background(180, 216, 250)
    airFields[0].renderAirfield()
    airFields[0].renderCrafts()
    airFields[0].moveCrafts()
    airFields[0].checkpos()
    airFields[0].checkDis()
}

function keyPressed(){
    switch(key){
        case "0": currentPlane=0;break;
        case "1": currentPlane=1;break;
        case "2": currentPlane=2;break;
        case "3": currentPlane=3;break;
        case "4": currentPlane=4;break;
        case "5": currentPlane=5;break;
        case "6": currentPlane=6;break;
        case "7": currentPlane=7;break;
        case "8": currentPlane=8;break;
        case "9": currentPlane=9;break;
    }
    console.log(currentPlane)

}