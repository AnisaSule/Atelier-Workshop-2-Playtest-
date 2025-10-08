let permissionButton;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  textAlign(CENTER, CENTER);
  textSize(24);
  text("Tap the button to enable sensors", width/2, height/2 - 40);

  permissionButton = createButton("Enable Motion Sensors");
  permissionButton.position(width/2 - 100, height/2);
  permissionButton.size(200, 40);
  permissionButton.mousePressed(requestSensorPermission);
}

function requestSensorPermission() {
  if (typeof DeviceOrientationEvent !== 'undefined' &&
      typeof DeviceOrientationEvent.requestPermission === 'function') {
    DeviceOrientationEvent.requestPermission()
      .then(response => {
        if (response === 'granted') {
          permissionButton.hide();
          text("✓ Permission granted!", width/2, height/2 + 60);
          window.sensorsEnabled = true;
        } else {
          text("✗ Permission denied.", width/2, height/2 + 60);
        }
      })
      .catch(err => {
        text("Error: " + err.message, width/2, height/2 + 60);
      });
  } else {
    text("Permission not required on this device.", width/2, height/2 + 60);
    window.sensorsEnabled = true;
  }
}
