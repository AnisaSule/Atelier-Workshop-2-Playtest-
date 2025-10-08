let horse;
let sensorsEnabled = false;
let deviceRotationY = 0;

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
  textSize(24);
  background(220);
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
      sensorsEnabled = true;
      window.addEventListener('deviceorientation', handleOrientation);
      button.style.display = 'none';
    }
  });
}

function handleOrientation(event) {
  deviceRotationY = event.gamma || 0; // gamma = left/right tilt
}

function draw() {
  background(sensorsEnabled ? 200 : 220);
  fill(0);
  textSize(18);

  if (sensorsEnabled) {
    text("Tilt Y: " + deviceRotationY.toFixed(1), width/2, 50);
    text("Horse is running " + (deviceRotationY < 0 ? "LEFT" : "RIGHT"), width/2, 80);

    if (horse) {
      push();
      translate(width/2, height/2);
      if (deviceRotationY < 0) {
        scale(-1, 1); // mirror horizontally
      }
      image(horse, 0, 0, 200, 200);
      pop();
    }
  } else {
    text("Tap the button to enable sensors", width/2, height/2);
  }
}
