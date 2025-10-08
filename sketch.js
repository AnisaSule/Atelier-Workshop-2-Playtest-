function setup() {
	createCanvas(windowWidth, windowHeight);
	background(220);
	textAlign(CENTER, CENTER);
	textSize(24);
	text("Tap to enable motion sensors", width/2, height/2);
  }
  
  function touchStarted() {
	if (typeof DeviceOrientationEvent !== 'undefined' &&
		typeof DeviceOrientationEvent.requestPermission === 'function') {
	  DeviceOrientationEvent.requestPermission()
		.then(response => {
		  if (response === 'granted') {
			text("Permission granted!", width/2, height/2 + 40);
		  } else {
			text("Permission denied.", width/2, height/2 + 40);
		  }
		})
		.catch(err => {
		  text("Error: " + err.message, width/2, height/2 + 40);
		});
	} else {
	  text("Permission not required on this device.", width/2, height/2 + 40);
	}
	return false;
  }
  