function handleDebris(elapsedTime) {
    if (allowDebrisSpawning && millis() > spawnTimer) {
      debris.push(new Rock());
      let baseMin = 600;
      let baseMax = 1100;
      let scale = constrain(elapsedTime / 120, 0, 1);
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
  
      if (debris[i].hits(boat)) {
        if (debris[i] instanceof Rock && !inSafeZone && !boat.isInvulnerable()) {
          boat.health--;
          if (boat.health <= 0) gameOver = true;
          debris.splice(i, 1);
          sfxrock.play();
        } else if (debris[i] instanceof HeartPickup) {
          if (boat.health < boat.maxHealth) boat.health++;
          debris.splice(i, 1);
          sfxheart.play();
        } else if (debris[i] instanceof Coin) {
          coinsCollected++;
          debris.splice(i, 1);
          sfxcoin.play();
        }
      } else if (debris[i].offscreen()) {
        debris.splice(i, 1);
      }
    }
  }
  