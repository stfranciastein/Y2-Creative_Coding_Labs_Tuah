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
    drawBackground();
  
    if (showMainMenu) return drawMainMenu();
    if (!selected) return drawBoatSelection();
    if (gameOver) return drawGameOver();
    if (paused) return drawPauseMenu();
  
    let elapsedTime = (millis() - startTime) / 1000;
    finalScore = elapsedTime;
    speedMultiplier = 1 + elapsedTime / 120;
  
    handleGameState(elapsedTime);
    handleBoat(wind);
    handleDebris(elapsedTime);
    drawHUD(elapsedTime);
  }
