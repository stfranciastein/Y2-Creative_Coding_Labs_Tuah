// Key pressed and released are needed because once you let go of the directional keys
// the game needs to take control of the boat's velocity again because of the wind (I hate maths)
function keyPressed() {
    if (key === ' ') {
      sfxcoin.play();
      if (showMainMenu) {
        showMainMenu = false;
        //Apparently you can't make music play automatically on Firefox so this will have to do.
        if (!music1.isPlaying()) { 
            music1.setVolume(0.01);
            music1.setLoop(true);
            music1.play();
        }
        return;
      } else if (!gameOver && selected) {
        paused = !paused;
        return;
      }
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
        if (boatType === "default") boat = new Vanguard(selectedColor);
        else if (boatType === "fast") boat = new Stingray(selectedColor);
        else if (boatType === "fat") boat = new Bulwark(selectedColor);

        selected = true;
        startTime = millis();
  
        // Stop menu music
        if (music1.isPlaying()) {
          music1.stop();
        }
  
        // Start gameplay music
        if (!music2.isPlaying()) {
          music2.setVolume(0.01);
          music2.setLoop(true);
          music2.play();
        }
      }
      return;
    }
  
    if (gameOver) {
      if (key === 'r' || key === 'R') {
        selected = false;
        showMainMenu = true;
        gameOver = false;
        debris = [];
        coinsCollected = 0;
        level = 1;
  
        // Stop gameplay music
        if (music2.isPlaying()) {
          music2.stop();
        }
  
        // Restart menu music
        if (!music1.isPlaying()) {
          music1.setVolume(0.01);
          music1.setLoop(true);
          music1.play();
        }
  
        return;
      }
  
      // Some logic to make use of coins, you can now revive with them
      if (key === 'y' || key === 'Y') {
        if (coinsCollected >= 2) {
          coinsCollected -= 2;
          boat.health = boat.maxHealth;
          gameOver = false;
        }
        return;
      }
    }
  
    //Screencast Bookmark 1.2
    if (keyCode === LEFT_ARROW) boat.setDirX(-1);
    else if (keyCode === RIGHT_ARROW) boat.setDirX(1);
    else if (keyCode === UP_ARROW) boat.setDirY(-1);
    else if (keyCode === DOWN_ARROW) boat.setDirY(1);
  
    if (key === 'e' || key === 'E') {
      boat.triggerAbility();
    }
  }
  

function keyReleased() {
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) boat.setDirX(0);
  if (keyCode === UP_ARROW || keyCode === DOWN_ARROW) boat.setDirY(0);
}
