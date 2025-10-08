function setup() {
	createCanvas(windowWidth, windowHeight);
	background(220);
	textAlign(CENTER, CENTER);
	textSize(24);
	text("Tap the button to enable sensors", width/2, height/2 - 40);
  
	permissionButton = createButton("Enable Motion Sensors");
	permissionButton.position(width/2 - 100, height/2);
	permissionButton.size(200, 40);
	permissionButton.style('font-size', '18px');
	permissionButton.style('background-color', '#4CAF50');
	permissionButton.style('color', 'white');
	permissionButton.style('border', 'none');
	permissionButton.style('border-radius', '5px');
	permissionButton.mousePressed(requestSensorPermission);
  
	console.log("Button created:", permissionButton);
  }
  

