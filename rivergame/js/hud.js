function drawHUD(elapsedTime) {
    textSize(15);
    fill(255);
    textAlign(LEFT, TOP);
    text("Level: " + level, 10, 10);
    text("Time: " + nf(elapsedTime, 0, 2) + "s", 10, 40);
    text("Wind: " + windDirectionText, 12, 70);
  
    //Hearts hud
    for (let i = 0; i < boat.health; i++) {
      drawHeart(770 - i * 30, 10);
    }
  
    //Coins
    fill(255, 215, 0);
    ellipse(770, 60, 20, 20);
    fill(255);
    textAlign(RIGHT, TOP);
    text(coinsCollected, 750, 55);
  
    //Powers Progress Bar
    let cooldownProgress = constrain((millis() - boat.lastUsed) / boat.cooldown, 0, 1);
    let fillWidth = barWidth * cooldownProgress;
    let barY = boat.y + 50;
  
    fill(100, 100, 100, 100);
    noStroke();
    rect(boat.x, barY, barWidth, barHeight);
  
    fill(0, 255, 255);
    rect(boat.x, barY, fillWidth, barHeight);
  
    let timeSinceUsed = millis() - boat.lastUsed;
    let timeSinceReady = millis() - (boat.lastUsed + boat.cooldown);
    textAlign(CENTER, TOP);
    textSize(6);
    fill(255);
  
    //Powers Text
    if (cooldownProgress >= 1 && timeSinceReady < 3000) {
      fill(255, 255, 100);
      text("ABILITY READY!!", boat.x, barY + barHeight + 5);
    } else if (cooldownProgress < 1 && timeSinceUsed < 5000) {
      text("ABILITY ACTIVATED", boat.x, barY + barHeight + 5);
    }
  
    //Safezone text
    if (inSafeZone && millis() - safeZoneStart <= 5000) {
      textSize(48);
      fill(255, 255, 0);
      textAlign(CENTER, CENTER);
      text("Level " + level, width / 2, height / 2 - 200);
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
