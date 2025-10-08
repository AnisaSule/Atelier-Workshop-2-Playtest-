let horse;
let errorMsg = "";
let tapDetected = false;
let deviceRotationY = 0;
let deviceRotationX = 0;

function preload() {
  // Try to load the horse image - catch errors
  try {
    horse = loadImage('Assets/horse.gif', 
      () => console.log("Horse loaded successfully"),
      (err) => {
        console.error("Failed to load horse.gif:", err);
        errorMsg = "Image not found. Check path: Assets/horse.gif";
      }
    );
  } catch(e) {
    console.error("Error in preload:", e);
    errorMsg = "Error loading image";
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  window.sensorsEnabled = false;
  
  // Initialize rotation values
  deviceRotationY = 0;
  deviceRotationX = 0;
  
  // Set up device orientation listener
  window.addEventListener('deviceorientation', handleOrientation);
  
  // Log device info
  console.log("Setup complete!");
  console.log("Device: " + navigator.userAgent);
  console.log("DeviceOrientationEvent available:", typeof DeviceOrientationEvent !== 'undefined');
  console.log("Has requestPermission:", typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function');
}

function handleOrientation(event) {
  // Update our own rotation variables
  deviceRotationY = event.gamma || 0; // gamma is left/right tilt (-90 to 90)
  deviceRotationX = event.beta || 0;  // beta is front/back tilt (-180 to 180)
}

function draw() {
  background(220);
  
  // Show error message if image didn't load
  if (errorMsg) {
    fill(255, 0, 0);
    textAlign(CENTER, CENTER);
    textSize(16);
    text(errorMsg, width/2, height/2 - 40);
    text("Make sure horse.gif is in Assets/ folder", width/2, height/2 - 10);
    text("Path should be: Assets/horse.gif", width/2, height/2 + 20);
    return;
  }
  
  // Check if sensors are enabled
  if (window.sensorsEnabled) {
    // Green background when sensors work
    background(200, 255, 200);
    
    if (horse) {
      push();
      translate(width/2, height/2);
      // Flip horse if tilted left
      if (deviceRotationY < 0) {
        scale(-1, 1);
      }
      imageMode(CENTER);
      image(horse, 0, 0, 200, 200);
      pop();
    }
    
    // Show tilt values for debugging
    fill(0);
    textAlign(CENTER);
    textSize(16);
    text("Tilt Y: " + deviceRotationY.toFixed(1), width/2, 50);
    text("Tilt X: " + deviceRotationX.toFixed(1), width/2, 80);
    text("Sensors ACTIVE!", width/2, height - 50);
  } else {
    // Show instructions
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(24);
    text("TAP SCREEN", width/2, height/2 - 40);
    textSize(18);
    text("to enable motion sensors", width/2, height/2);
    
    // Show debugging info
    textSize(14);
    if (tapDetected) {
      fill(0, 150, 0);
      text("✓ Tap detected! Waiting for permission...", width/2, height/2 + 60);
    }
    fill(100);
    text("Tilt Y: " + deviceRotationY.toFixed(1), width/2, height/2 + 100);
  }
}

// Multiple event handlers for better iOS compatibility
function touchStarted() {
  console.log("touchStarted fired");
  tapDetected = true;
  requestSensorPermission();
  return false; // Prevent default
}

function mousePressed() {
  console.log("mousePressed fired");
  tapDetected = true;
  requestSensorPermission();
  return false; // Prevent default
}

function touchEnded() {
  console.log("touchEnded fired");
  return false;
}

function requestSensorPermission() {
  console.log("=== requestSensorPermission called ===");
  
  // Check if we're on iOS 13+
  if (typeof DeviceOrientationEvent !== 'undefined' &&
      typeof DeviceOrientationEvent.requestPermission === 'function') {
    console.log("iOS 13+ detected - requesting permission via popup");
    
    DeviceOrientationEvent.requestPermission()
      .then(response => {
        console.log("Permission response:", response);
        if (response === 'granted') {
          window.sensorsEnabled = true;
          console.log("✓✓✓ Sensors GRANTED and enabled!");
        } else {
          console.log("✗✗✗ Permission DENIED by user");
          errorMsg = "Permission denied. Please reload and allow sensors.";
        }
      })
      .catch(err => {
        console.error("Permission error:", err);
        errorMsg = "Error requesting permission: " + err.message;
      });
  } else {
    // Android or older iOS
    console.log("Non-iOS 13+ device - enabling sensors directly (no permission needed)");
    window.sensorsEnabled = true;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}