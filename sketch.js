let sensorsEnabled = false;
let deviceRotationY = 0;
let deviceRotationX = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  textAlign(CENTER, CENTER);
  textSize(24);
  text("Waiting for motion sensor permission...", width/2, height/2);

  const button = document.getElementById("enableButton");
  button.addEventListener("click", () => {
    if (typeof DeviceOrientationEvent !== 'undefined' &&
        typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then(response => {
          if (response === 'granted') {
            sensorsEnabled = true;
            window.addEventListener('deviceorientation', handleOrientation);
            button.style.display = 'none';
          } else {
            alert("Permission denied. Please reload and try again.");
          }
        })
        .catch(err => {
          alert("Error: " + err.message);
        });
    } else {
      // Non-iOS devices
      sensorsEnabled = true;
      window.addEventListener('deviceorientation', handleOrientation);
      button.style.display = 'none';
    }
  });
}

function handleOrientation(event) {
  deviceRotationY = event.gamma || 0;
  deviceRotationX = event.beta || 0;
}

function draw() {
  background(sensorsEnabled ? 200 : 220);
  fill(0);
  textSize(18);
  if (sensorsEnabled) {
    text("Sensors enabled!", width/2, height/2 - 40);
    text("Tilt Y: " + deviceRotationY.toFixed(1), width/2, height/2);
    text("Tilt X: " + deviceRotationX.toFixed(1), width/2, height/2 + 30);
  } else {
    text("Tap the button to enable sensors", width/2, height/2);
  }
}