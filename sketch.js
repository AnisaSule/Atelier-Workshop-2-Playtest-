let horse;

function preload() {
  horse = loadImage('/assets/horse.gif');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  window.sensorsEnabled = false;
}

function draw() {
  background(220);
  
  // Check if sensors are enabled
  if (window.sensorsEnabled) {
    // Green background when sensors work
    background(200, 255, 200);
    
    push();
    translate(width/2, height/2);
    
    // Flip horse if tilted left
    if (rotationY < 0) {
      scale(-1, 1);
    }
    
    imageMode(CENTER);
    image(horse, 0, 0, 200, 200);
    
    pop();
    
    // Show tilt values for debugging
    fill(0);
    textAlign(CENTER);
    textSize(16);
    text("Tilt Y: " + rotationY.toFixed(1), width/2, 50);
    text("Tilt X: " + rotationX.toFixed(1), width/2, 80);
    
  } else {
    // Show instructions
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(20);
    text("TAP ANYWHERE\nto enable motion sensors", width/2, height/2);
    
    // Show what device thinks is happening
    textSize(14);
    text("rotationY: " + rotationY, width/2, height/2 + 80);
  }
}

// Handle all touch/click events
function touchStarted() {
  requestSensorPermission();
  return false;
}

function mousePressed() {
  requestSensorPermission();
  return false;
}

function requestSensorPermission() {
  console.log("Touch detected! Requesting permissions...");
  
  // Check if we're on iOS 13+
  if (typeof DeviceOrientationEvent !== 'undefined' && 
      typeof DeviceOrientationEvent.requestPermission === 'function') {
    console.log("iOS detected - requesting permission");
    
    DeviceOrientationEvent.requestPermission()
      .then(response => {
        console.log("Permission response:", response);
        if (response === 'granted') {
          window.sensorsEnabled = true;
          console.log("Sensors enabled!");
        } else {
          console.log("Permission denied");
        }
      })
      .catch(err => {
        console.error("Permission error:", err);
      });
  } else {
    // Android or older devices
    console.log("Non-iOS device - enabling sensors directly");
    window.sensorsEnabled = true;
  }
}