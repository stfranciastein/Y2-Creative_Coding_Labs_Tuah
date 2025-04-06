let boat; //type of boat
let debris = []; //originally called rocks mention in screencast you refactored to include all debris
let spawnTimer = 0;
let heartSpawnTimer = 0;
let coinSpawnTimer = 0;
let allowDebrisSpawning = true;
let speedMultiplier = 1;
let startTime;
let gameOver = false; //borrowed gameOver code from 1st year project, will set to true once your hearts are all gone
let finalScore = 0;
let coinsCollected = 0;
let boatType = "default";
let selected = false;
let showMainMenu = true;
let wind = 0;
let windTimer = 0;
let windDirectionText = "Calm"; // Default wind logic
let level = 1;
let inSafeZone = false; // Safe zone logic triggers on after 1 minute
let safeZoneStart = 0;
let selectedColor = 'white';
const colors = ['white', 'red', 'green', 'blue'];
let colorIndex = 0;

function setup() {
    let canvas = createCanvas(800, 800);
    canvas.parent("game-container");
    textAlign(CENTER, CENTER);
  }
  

function draw() {
  background(0, 100, 200);

  if (showMainMenu) return drawMainMenu();
  if (!selected) return drawBoatSelection();
  if (gameOver) return drawGameOver();


  let elapsedTime = (millis() - startTime) / 1000;
  finalScore = elapsedTime;
  speedMultiplier = 1 + elapsedTime / 60;   //speedMultiplier will increase after x seconds, probably change this to 60
  
  // After x seconds have ellapsed playing the game there needs to be a safe zone.
  // Currently as of your latest save you made the safe zone be 10 seconds long.
  if (inSafeZone) {
    let safeElapsed = millis() - safeZoneStart;
  
    // Always disable debris during grace period
    allowDebrisSpawning = false;
  
    if (safeElapsed > 10000) {
      inSafeZone = false;
      allowDebrisSpawning = true;
    } else if (safeElapsed > 5000) {
      let countdown = 5 - floor((safeElapsed - 5000) / 1000);
      textSize(64);
      fill(255, 255, 0);
      text(countdown, width / 2, height / 2 - 100);
    }
  }

  if (!inSafeZone) {
    if (floor(elapsedTime) % 60 === 0 && floor(elapsedTime) !== 0) {
      inSafeZone = true;
      safeZoneStart = millis();
      level++;
    }
  }
  

  // Wind Direction Text
  if (millis() > windTimer) {
    wind = random([-1, 0, 1]);
    windDirectionText = wind === 0 ? "Calm" : wind === 1 ? "East Wind" : "West Wind";
    windTimer = millis() + random(5000, 10000);
  }

  // UI which shows time and wind

  textSize(24);
  fill(255);
  textAlign(LEFT, TOP);
  text("Time: " + nf(elapsedTime, 0, 2) + "s", 10, 10);
  text("Wind: " + windDirectionText, 10, 40);
  fill(255, 215, 0);
  ellipse(540, 30, 20, 20);
  fill(255);
  textAlign(RIGHT, TOP);
  text(coinsCollected, 530, 20);
  for (let i = 0; i < boat.health; i++) drawHeart(20 + i * 30, 80);

  if (inSafeZone && millis() - safeZoneStart <= 5000) {
    textSize(48);
    fill(255, 255, 0);
    textAlign(CENTER, CENTER);
    text("Level " + level, width / 2, height / 2 - 200);
  }

  boat.update(wind);
  boat.show();

  //Check for debris spawning boolean so coins and hearts no longer spawn after safe zone.
  if (allowDebrisSpawning && millis() > spawnTimer) {
    debris.push(new Rock());
    spawnTimer = millis() + random(500, 1000);
  }
  if (allowDebrisSpawning && millis() > heartSpawnTimer) {
    debris.push(new HeartPickup());
    heartSpawnTimer = millis() + random(15000, 30000);
  }
  if (allowDebrisSpawning && millis() > coinSpawnTimer) {
    debris.push(new Coin());
    coinSpawnTimer = millis() + random(7000, 15000);
  }  

  for (let i = debris.length - 1; i >= 0; i--) {
    debris[i].update(speedMultiplier);
    debris[i].show();

    if (debris[i].hits(boat)) {
      if (debris[i] instanceof Rock && !inSafeZone) {
        boat.health--;
        if (boat.health <= 0) gameOver = true;
        debris.splice(i, 1);
      } else if (debris[i] instanceof HeartPickup) {
        if (boat.health < boat.maxHealth) boat.health++;
        debris.splice(i, 1);
      } else if (debris[i] instanceof Coin) {
        coinsCollected++;
        debris.splice(i, 1);
      }
    } else if (debris[i].offscreen()) {
      debris.splice(i, 1);
    }
  }
}

// Hearts on UI
//  This is NOT the Hearts you can pick up, don't forgetti.
function drawHeart(x, y) {
  fill(255, 0, 0);
  beginShape();
  vertex(x, y);
  bezierVertex(x - 10, y - 10, x - 20, y + 10, x, y + 20);
  bezierVertex(x + 20, y + 10, x + 10, y - 10, x, y);
  endShape(CLOSE);
}

// Main Menu with Title
function drawMainMenu() {
  background(0, 100, 200);
  textSize(48);
  fill(255);
  text("River Run", width / 2, height / 2 - 40);
  textSize(24);
  text("Press SPACE to Start", width / 2, height / 2 + 20);
}

// Boat Selection Screen (Fix spacing later)
function drawBoatSelection() {
  background(0, 100, 200);
  textSize(32);
  fill(255);
  text("Select Your Boat", width / 2, 100);
  textSize(20);
  text("1 - Vanguard (3 Hearts)", width / 2, 200);
  text("2 - Stingray (2 Hearts, Faster)", width / 2, 250);
  text("3 - Icebreaker (5 Hearts, Slower)", width / 2, 300);
  text("Press C to change color", width / 2, 340);
  text("Current Color: " + selectedColor, width / 2, 370);

  push();
  translate(width / 2, 420);
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
  textSize(48);
  fill(255);
  textAlign(CENTER, CENTER);
  text("Game Over", width / 2, height / 2 - 90);
  textSize(32);
  text("Time Survived: " + nf(finalScore, 0, 2) + "s", width / 2, height / 2 - 20);
  text("Coins Collected: " + coinsCollected, width / 2, height / 2 + 20);
  text("Press R to Return to Menu", width / 2, height / 2 + 80);
}


/// Controls and Keybinds, nothing to fix.
function keyPressed() {
  if (showMainMenu && key === ' ') {
    showMainMenu = false;
    return;
  }

  if (!selected) {
    if (key === '1') {
      boatType = "default";
    } else if (key === '2') {
      boatType = "fast";
    } else if (key === '3') {
      boatType = "fat";
    } else if (key === 'c' || key === 'C') {
      colorIndex = (colorIndex + 1) % colors.length;
      selectedColor = colors[colorIndex];
      return;
    }
    if (['1', '2', '3'].includes(key)) {
      boat = new Boat(boatType, selectedColor);
      selected = true;
      startTime = millis();
    }
    return;
  }

  if (gameOver && (key === 'r' || key === 'R')) {
    selected = false;
    showMainMenu = true;
    gameOver = false;
    debris = [];
    coinsCollected = 0;
    return;
  }

  if (keyCode === LEFT_ARROW) boat.setDirX(-1);
  else if (keyCode === RIGHT_ARROW) boat.setDirX(1);
  else if (keyCode === UP_ARROW) boat.setDirY(-1);
  else if (keyCode === DOWN_ARROW) boat.setDirY(1);
}

function keyReleased() {
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) boat.setDirX(0);
  if (keyCode === UP_ARROW || keyCode === DOWN_ARROW) boat.setDirY(0);
}
