let horse;
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
  angleMode(DEGREES);

  // Prevent mobile scrolling/zooming
  lockGestures();

  // Enable motion sensors with tap-to-start
  enableGyroTap('Tap to start the horse!');
}

function draw() {
  background(255);

  if (!window.sensorsEnabled) {
    fill(0);
    textSize(28);
    text("Horse in Motion", width / 2, height / 2 - 60);

    // Draw "Run Away" button
    fill(30, 144, 255);
    rectMode(CENTER);
    rect(width / 2, height / 2 + 20, 200, 50, 10);
    fill(255);
    textSize(20);
    text("Run Away", width / 2, height / 2 + 20);
    return;
  }

  if (horse) {
    push();
    translate(width / 2, height / 2);
    if (rotationY < 0) {
      scale(-1, 1); // mirror horizontally
    }
    image(horse, 0, 0, width, height); // full screen
    pop();
  }

  // Display Y tilt in large thin blue text
  fill(30, 144, 255);
  textSize(48);
  textStyle(NORMAL);
  text(rotationY.toFixed(1) + "°", width / 2, 80);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
