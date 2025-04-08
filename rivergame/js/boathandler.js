function handleBoat(wind) {
    boat.update(wind);
    boat.show();
    boat.showAbilityEffect();
  
    if (boat.isMagnetising()) {
      for (let d of debris) {
        if (d instanceof Coin || d instanceof HeartPickup) {
          let dx = boat.x - d.x;
          let dy = boat.y - d.y;
          let dist = sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            let pullStrength = 5; // the higher this is, the faster the pull
            let nx = dx / dist;
            let ny = dy / dist;
            d.x += nx * pullStrength;
            d.y += ny * pullStrength;          
          }
        }
      }
    }
  }
  