// Main Menu
function drawMainMenu() {
    background(0);
    imageMode(CENTER);
    image(menu1, width / 2, height / 2);
  
    textFont(font1);
    textAlign(CENTER, CENTER);
    noStroke();
  
    if (floor(millis() / 500) % 2 === 0) { // 500 = will blink every 500 millis/0.5 secs
        textSize(20);
        fill(255, 230, 255);
        text("Press [SPACE] to Start", width / 2, height / 2 + 20);
    }
    
  }
  
// Boat Selection Screen
function drawBoatSelection() {

    fill(0, 0, 0, 200);
    noStroke();
    rectMode(CENTER);
    rect(width / 2, height /2, 770, 770);

    textSize(25);
    fill(255);
    text("SELECT YOUR VESSEL WITH [NUM]", width / 2, 100);
    text("CONTROLS", width/2, 600);
    textSize(15);
    text("[1]: VANGUARD (3 Hearts)", width / 2, 180);
    text("[2]: STINGRAY (2 Hearts, Faster)", width / 2, 250);
    text("[3]: ICEBREAKER (5 Hearts, Slower)", width / 2, 320);



    textSize(10);
    text("Press [C] to change color", width / 2, 500);
    text("Current Color: " + selectedColor, width / 2, 530);

    text("Good all-rounder. Can activate a magnetic field to pull coins and hearts.", width / 2, 210);
    text("A ship for those who like to live fast. Can activate turbo to double speed.", width / 2, 280);
    text("Slow and steady. Can activate an invulnerability field that lasts 5 seconds.", width / 2, 350);

    textSize(12);
    text("Press the [ARROW KEYS] to move.", width / 2, 650);
    text("Press [E] to activate your ship's ability.", width / 2, 680);

    // Boat Preview
    push();
    translate(width / 2, 450);
    fill(selectedColor);
    beginShape();
        vertex(0, -40);    // Front (nose)
        vertex(20, 20);    // Right rear
        vertex(0, 30);     // Center back
        vertex(-20, 20);   // Left rear
    endShape(CLOSE);
    
    pop();
}

// Game over screen
function drawGameOver() {

    fill(0, 0, 0, 200);
    noStroke();
    rectMode(CENTER);
    rect(width / 2, height /2, 770, 770);

    textSize(50);
    fill(255);
    textAlign(CENTER, CENTER);
    text("GAME OVER", width / 2, height / 2 - 100);
    textSize(20);
    noStroke();
    text("Time Survived: " + nf(finalScore, 0, 2) + "s", width / 2, height / 2 - 20);
    text("You capsized at level " + level, width / 2, height / 2 + 20);
    text("Continue? [Y]", width / 2, height / 2 + 100);
    text("Press [R] to Return to Menu", width / 2, height / 2 + 230);
    
    textSize(15);
    text("OR", width / 2, height / 2 + 180)
    text("(Coins available " + coinsCollected + "/2)", width/ 2, height / 2 + 120);

}

function drawPauseMenu(){
    textAlign(CENTER, CENTER);
    textSize(52);
    fill(255);
    text("PAUSED", width / 2, height / 2 - 100);
    textSize(14);
    text("Music Credits", width / 2, height / 2 - 5)
    text("I Guess Time Just Makes Fools Of Us All", width / 2, height / 2 + 30);
    textSize(8);
    text("performed originally by Father John Misty, remixed by 8-Bit Arcade", width / 2, height / 2 + 50);
}