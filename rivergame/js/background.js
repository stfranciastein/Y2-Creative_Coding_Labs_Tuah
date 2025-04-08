function drawBackground() {
    // Animated synthwave sine-grid background
    background(10, 0, 20);
    stroke(255, 0, 255, 80);
    strokeWeight(2);
    noFill();
  
    let scrollSpeed = 4 + abs(wind); // faster with stronger wind
    gridOffset += wind * scrollSpeed;
  
    // Smooth transitions based on wind
    targetGridScroll = wind * (2 + abs(wind));
    targetWaveStrength = 10 + abs(wind) * 5;
  
     // Smooth interpolation (easing)
    currentGridScroll = lerp(currentGridScroll, targetGridScroll, 0.1); //l
    currentWaveStrength = lerp(currentWaveStrength, targetWaveStrength, 0.05);
     // Apply scroll
    gridOffset += currentGridScroll;
  
    verticalScroll += 1.5;
  
    //Sin wave from someone's sketch on p5 repurposed to fit game
    // https://editor.p5js.org/stevenraysimon/sketches/HyTseadOg <== Original sketch
    for (let y = 0; y < height; y += 20) {
      beginShape();
      for (let x = 0; x < width; x += 10) { //notice problem here in screencast
        let wave = sin((x - gridOffset) * 0.01) * currentWaveStrength; //actual sin wave
        vertex(x, y + wave + verticalScroll % 20);
      }
      endShape();
    }
  
    // Vertical grid lines across entire screen (static)
    for (let x = 0; x <= width; x += 40) {
      line(x, 0, x, height);
    }
  }
  