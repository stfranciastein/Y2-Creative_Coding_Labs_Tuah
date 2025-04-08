let boat; //type of boat
let debris = []; //originally called rocks mention in screencast you refactored to include all debris
let spawnTimer = 0;
let heartSpawnTimer = 0;
let coinSpawnTimer = 0;
let allowDebrisSpawning = true; // Sets to false after safe zone is entered
let speedMultiplier = 1;
let startTime;
let gameOver = false; //borrowed gameOver code from 1st year project, will set to true once your hearts are all gone
let paused = false;
let finalScore = 0;
let coinsCollected = 0;
let boatType = "default";
let selected = false;
let showMainMenu = true;
let wind = 0;
let windTimer = 0;
let windDirectionText = "Calm"; // Default wind status is no winds
let level = 1; 
let inSafeZone = false; // Safe zone logic triggers on after 1 minute
let safeZoneStart = 0; // Counts down from the number you defined in the safe zone logic.
let selectedColor = 'white';
const colors = ['white', 'red', 'green', 'blue'];
let colorIndex = 0;
let verticalScroll = 0; // new: to simulate vertical background motion


//For in-game bg
let gridOffset = 0;
let currentGridScroll = 0;
let targetGridScroll = 0;

let currentWaveStrength = 10;
let targetWaveStrength = 10;

//Assets
let font1;
let menu1;
let music1;
let music2;
let sfxrock;
let sfxheart;
let sfxcoin;
let sfxpower;

//These are for powers
let barWidth = 100;
let barHeight = 10;
let barY = 60;

//Preload Assets
function preload() {
    font1 = loadFont('assets/fonts/PressStart2P-Regular.ttf');
    menu1 = loadImage('assets/images/Menu.png');
    
    //Music
    music1 = loadSound('assets/music/menu.mp3');
    music2 = loadSound('assets/music/game.mp3');

    //SFX
    sfxrock = loadSound('assets/music/sfx/rock.ogg');
    sfxheart = loadSound('assets/music/sfx/heart.ogg');
    sfxcoin = loadSound('assets/music/sfx/coin.ogg');
    sfxpower = loadSound('assets/music/sfx/power.ogg');
    sfxrock.setVolume(0.1);
    sfxcoin.setVolume(0.1);
    sfxheart.setVolume(0.1);
    sfxpower.setVolume(0.1);
  }
  

function setup() {
    let canvas = createCanvas(800, 800);
    canvas.parent("game-container");
    textAlign(CENTER, CENTER);
  }
  

function draw() {
    // Animated synthwave sine-grid background
    background(10, 0, 20);
    stroke(255, 0, 255, 80); 
    strokeWeight(2);
    noFill();

    let scrollSpeed = 2 + abs(wind); // faster with stronger wind
    gridOffset += wind * scrollSpeed;

    // Smooth transitions based on wind
    targetGridScroll = wind * (2 + abs(wind)); // same formula as before
    targetWaveStrength = 10 + abs(wind) * 5;

    // Smooth interpolation (easing)
    currentGridScroll = lerp(currentGridScroll, targetGridScroll, 0.05);
    currentWaveStrength = lerp(currentWaveStrength, targetWaveStrength, 0.05);

    // Apply scroll
    gridOffset += currentGridScroll;

        //Sin wave from someone's sketch on p5 repurposed to fit game
        // https://editor.p5js.org/stevenraysimon/sketches/HyTseadOg <== Original sketch
        verticalScroll += 1.5; // control scroll speed here

        for (let y = 0; y < height; y += 20) {
            beginShape();
            for (let x = 0; x < width; x += 10) {
                let wave = sin((x - gridOffset) * 0.01) * currentWaveStrength;
                vertex(x, y + wave + verticalScroll % 20); // scrolls downward
            }
            endShape();
        }
        

        // Vertical grid lines across entire screen
        for (let x = 0; x <= width; x += 40) {
            line(x, 0, x, height);
        }  


    if (showMainMenu) return drawMainMenu();
    if (!selected) return drawBoatSelection();
    if (gameOver) return drawGameOver();
    if (paused) return drawPauseMenu(); // Skip rest of draw loop
      

    let elapsedTime = (millis() - startTime) / 1000;
    finalScore = elapsedTime;
    speedMultiplier = 1 + elapsedTime / 120;   //speedMultiplier will increase after x seconds, probably change this to 60
  
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IN-GAME HUD //////////////////////////////////////////////////////////////////////////////////////////////
// Wind and Time
    textSize(15);
    fill(255);
    textAlign(LEFT, TOP);
    text("Level: " + level, 10, 10);
    text("Time: " + nf(elapsedTime, 0, 2) + "s", 10, 40);
    text("Wind: " + windDirectionText, 12, 70);

        //Hearts Display
        for (let i = 0; i < boat.health; i++) {
            drawHeart(770 - i * 30, 10);
        }

        //Coins Display
        fill(255, 215, 0);
        ellipse(770, 60, 20, 20);
        fill(255);
        textAlign(RIGHT, TOP);
        text(coinsCollected, 750, 55);
  
        // Powers HUD (follows the boat)
        let cooldownProgress = constrain((millis() - boat.lastUsed) / boat.cooldown, 0, 1);
        let fillWidth = barWidth * cooldownProgress;
        let barY = boat.y + 50;
            // Background bar
            fill(100,100,100,100);
            noStroke();
            rect(boat.x, barY, barWidth, barHeight);

            // Fill bar
            fill(0, 255, 255);
            rect(boat.x, barY, fillWidth, barHeight);

            // If ability is ready
            let timeSinceUsed = millis() - boat.lastUsed;
            let timeSinceReady = millis() - (boat.lastUsed + boat.cooldown);
            textAlign(CENTER, TOP);
            textSize(6);
            fill(255);

            if (cooldownProgress >= 1 && timeSinceReady < 3000) {
            fill(255,255,100);
            text("ABILITY READY!!", boat.x, barY + barHeight + 5);
            }
            else if (cooldownProgress < 1 && timeSinceUsed < 5000) {
            text("ABILITY ACTIVATED", boat.x, barY + barHeight + 5);
            }

        //Safe Zone Text + Countdown
        if (inSafeZone && millis() - safeZoneStart <= 5000) {
            textSize(48);
            fill(255, 255, 0);
            textAlign(CENTER, CENTER);
            text("Level " + level, width / 2, height / 2 - 200);
        }

        boat.update(wind);
        boat.show();

        //Vanguard Power(Magnetise) Changes the direction of the coins/hearts to go towards the ship within a 100 radius
        boat.showAbilityEffect();
        if (boat.isMagnetising()) { 
            for (let d of debris) {
            if (d instanceof Coin || d instanceof HeartPickup) {
                let dx = boat.x - d.x;
                let dy = boat.y - d.y;
                let distSq = dx * dx + dy * dy;
                if (distSq < 100 * 100) {
                d.x += dx * 0.05;
                d.y += dy * 0.05;
                }
            }
            }
        }
  
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DEBRIS SPAWNER ///////////////////////////////////////////////////////////////////////////////////////////
//Checks for debris spawning boolean so coins and hearts no longer spawn after safe zone.

    if (allowDebrisSpawning && millis() > spawnTimer) {
        debris.push(new Rock());
        let baseMin = 600;
        let baseMax = 1100;
        let scale = constrain(elapsedTime / 120, 0, 1); // takes 2 minutes to fully kick in
        let newMin = lerp(baseMin, 400, scale);
        let newMax = lerp(baseMax, 800, scale);

        spawnTimer = millis() + random(newMin, newMax);
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Collision Logic //////////////////////////////////////////////////////////////////////////////////////////
//Original version used to only check if the boat was hit.
//Other if/else statements also check if the boat is in the safe zone (between levels) 
//or if it's the fat boat and the invulnerability ability is toggled on.

    if (debris[i].hits(boat)) {
        if (debris[i] instanceof Rock && !inSafeZone && !boat.isInvulnerable()) {
          boat.health--;
          if (boat.health <= 0) gameOver = true;
          debris.splice(i, 1)
          sfxrock.play();
        } else if (debris[i] instanceof HeartPickup) {
          if (boat.health < boat.maxHealth) boat.health++;
          debris.splice(i, 1)
          sfxheart.play();
        } else if (debris[i] instanceof Coin) {
          coinsCollected++;
          debris.splice(i, 1)
          sfxcoin.play();
        }
      }
      
    else if (debris[i].offscreen()) {
      debris.splice(i, 1);
    }
  }
}

// Hearts on UI
//  This is NOT the Hearts you can pick up.
function drawHeart(x, y) {
  fill(255, 0, 0);
  beginShape();
  vertex(x, y);
  bezierVertex(x - 10, y - 10, x - 20, y + 10, x, y + 20);
  bezierVertex(x + 20, y + 10, x + 10, y - 10, x, y);
  endShape(CLOSE);
}