let bg;
let timeoutInSec;
let noOfColors;
let colorChoosen;

// constants
const F_RATE_ = 60;
const BLACK_ = 0;
const WHITE_ = 255;
const MOUSE_PRESSED_ = "MousePressed";
const TIMEOUT_ = "Timeout";

// Toggle Objects
let trainingToggleObject;
let trainOnMousePressedToggleObject;
let trainingMethodSelect;

// Toggle booleans
let isTrainingOn;
let trainOnMousedPressed;

// Circles
let leftCircle;
let rightCircle;
let outputCircleOnBlack;
let outputCircleOnWhite;

// Slider
let p5Slider;
let inputSlider;

// Neural Network
let neuralNetwork;

function setup() {
  createCanvas(700, 700);
  frameRate(F_RATE_);

  //   Initialization
  isTrainingOn = false;
  trainOnMousedPressed = true;
  timeoutInSec = 5;
  noOfColors = 0;
  colorChoosen = BLACK_;
  initializeObjects(); // find implementation from "./utils.js"

  //   Training method radio button creation
  trainingMethodSelect = createCustomSelect(trainingMethodSelect);

  //   Slider creation for color change timeout
  p5Slider = createSlider(0, 20);
  p5Slider.position(250, 670);
  p5Slider.size(300);
  p5Slider.value(timeoutInSec);
  timeoutInSec = p5Slider.value(); // Slider value

  //   Neural network instantiation
  neuralNetwork = new NeuralNetwork(3, 3, 2);
}
function mousePressed() {
  // MousePress on Training toggle
  if (
    dist(trainingToggleObject.x, trainingToggleObject.y, mouseX, mouseY) < 20
  ) {
    if (isTrainingOn) {
      isTrainingOn = false;
    } else {
      isTrainingOn = true;
      loop();
    }
  }
  //   MousePress on Left and Right circles
  if (isTrainingOn) {
    if (trainingMethodSelect.value() === MOUSE_PRESSED_) {
      if (
        mouseX > leftCircle.x - leftCircle.w / 2 &&
        mouseX < leftCircle.x + leftCircle.w / 2 &&
        mouseY > leftCircle.y - leftCircle.h / 2 &&
        mouseY < leftCircle.y + leftCircle.h / 2
      ) {
        colorChoosen = BLACK_;
        bg = {
          r: Math.floor(random(255)),
          g: Math.floor(random(255)),
          b: Math.floor(random(255)),
        };
        noOfColors++;
      } else if (
        mouseX > rightCircle.x - rightCircle.w / 2 &&
        mouseX < rightCircle.x + rightCircle.w / 2 &&
        mouseY > rightCircle.y - rightCircle.h / 2 &&
        mouseY < rightCircle.y + rightCircle.h / 2
      ) {
        colorChoosen = WHITE_;
        bg = {
          r: Math.floor(random(255)),
          g: Math.floor(random(255)),
          b: Math.floor(random(255)),
        };
        noOfColors++;
      }
    }
    let targetOutput =
      colorChoosen === BLACK_
        ? [colorChoosen / 255, 0]
        : [0, colorChoosen / 255];

    // Neural network Training happens
    neuralNetwork.train([bg.r, bg.g, bg.b], targetOutput);
  }
}

function draw() {
  background(0);

  //   Toggle Training button Creation
  textSize(20);
  toggleButton(isTrainingOn, trainingToggleObject);

  //   Timeout method flow
  if (isTrainingOn && trainingMethodSelect.value() === TIMEOUT_) {
    inputSlider.style.display = "block"; // display timeout slider
    fill(255);
    textSize(20);
    text("Color change Timeout", 50, 600);
    text(`${p5Slider.value()} seconds`, 50, 650);

    // Update circle background color based on timeout chosen in slider
    const updateColor = frameCount % (timeoutInSec * F_RATE_) === 0;

    if (updateColor && isTrainingOn) {
      bg = {
        r: Math.floor(random(255)),
        g: Math.floor(random(255)),
        b: Math.floor(random(255)),
      };
      noOfColors++; // Increase color counts displayed
    }
  } else if (inputSlider) {
    inputSlider.style.display = "none";
  }

  const r = bg.r;
  const g = bg.g;
  const b = bg.b;

  // r, g, b text header
  fill(255);
  textSize(20);
  text(`rgb(${r}, ${g}, ${b})`, 50, 50);

  //   left circle
  createCustomCircle(leftCircle, bg); // find implementation in "./utils.js"
  //   right circle
  createCustomCircle(rightCircle, bg); // find implementation in "./utils.js"

  //   All Circles Text
  strokeWeight(30);
  textSize(30);
  //   leftCircle Text
  fill(leftCircle.text.fillColor);
  text(
    `${leftCircle.text.content}\n\t\t${noOfColors}`,
    leftCircle.text.x,
    leftCircle.text.y
  );
  //   right circle text
  fill(rightCircle.text.fillColor);
  text(
    `${rightCircle.text.content}\n\t\t${noOfColors}`,
    rightCircle.text.x,
    rightCircle.text.y
  );

  //   output circle
  noStroke();
  const outputCircle =
    colorChoosen === BLACK_ ? outputCircleOnBlack : outputCircleOnWhite;
  createCustomCircle(outputCircle, { r: 255, g: 255, b: 255 }); // find implementation in "./utils.js"

  //   Flow when no training happens (toggled off training)
  if (!isTrainingOn) {
    inputSlider = document.querySelector('input[type="range"]');
    if (inputSlider) inputSlider.style.display = "none";
    // noLoop();
  }
}
