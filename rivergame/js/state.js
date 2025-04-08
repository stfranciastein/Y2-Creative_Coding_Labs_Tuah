function handleGameState(elapsedTime) {
    if (inSafeZone) {
      let safeElapsed = millis() - safeZoneStart;
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
  
    //SC_Bookmark 3
    if (millis() > windTimer) {
      wind = random([-1, 0, 1]);
      windDirectionText = wind === 0 ? "Calm" : wind === 1 ? "East Wind" : "West Wind";
      windTimer = millis() + random(5000, 10000);
    }
  }
  