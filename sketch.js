let horse;
let sensorsEnabled = false;
let deviceRotationY = 0;
let showIntro = true;

function preload() {
  horse = loadImage('Assets/horse.gif', 
    () => console.log("Horse loaded successfully"),
    (err) => console.error("Failed to load horse.gif:", err)
  );
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  textAlign(CENTER, CENTER);
  angleMode(DEGREES);
  
}

function draw() {
  background(255);

  if (showIntro) {
    fill(0);
    textSize(28);
    text("Horse in Motion ", width/2, height/2 - 60);

    // Draw "Run Away" button
    fill(30, 144, 255);
    rectMode(CENTER);
    rect(width/2, height/2 + 20, 200, 50, 10);
    fill(255);
    textSize(20);
    text("Run Away", width/2, height/2 + 20);
    return;
  }

  if (horse) {
    push();
    translate(width/2, height/2);
    if (deviceRotationY < 0) {
      scale(-1, 1); // mirror horizontally
    }
    image(horse, 0, 0, width, height); // full screen
    pop();
  }

  // Display Y tilt in large thin blue text
  fill(30, 144, 255);
  textSize(48);
  textStyle(NORMAL);
  text(deviceRotationY.toFixed(1) + "°", width/2, 80);
}

function touchStarted() {
  if (showIntro) {
    // Check if tap is inside "Run Away" button
    if (abs(mouseX - width/2) < 100 && abs(mouseY - (height/2 + 20)) < 25) {
      requestSensorPermission();
    }
  }
  return false;
}

function requestSensorPermission() {
  if (typeof DeviceOrientationEvent !== 'undefined' &&
      typeof DeviceOrientationEvent.requestPermission === 'function') {
    DeviceOrientationEvent.requestPermission()
      .then(response => {
        if (response === 'granted') {
          sensorsEnabled = true;
          window.addEventListener('deviceorientation', handleOrientation);
          showIntro = false;
        } else {
          alert("Permission denied. Please reload and try again.");
        }
      })
      .catch(err => {
        alert("Error: " + err.message);
      });
  } else {
    sensorsEnabled = true;
    window.addEventListener('deviceorientation', handleOrientation);
    showIntro = false;
  }
}

function handleOrientation(event) {
  deviceRotationY = event.gamma || 0;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
