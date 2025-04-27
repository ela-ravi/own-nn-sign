let points = [];
let pointIndex = 0;
let neuron;
let trainingLimit = 1000;
let lines = [];
let rateOfPercentage = 0.1; // 10%
let percentage = rateOfPercentage;
let frames = 0;

function setup() {
  console.log("Setup");
  createCanvas(600, 600);
  frameRate(60);
  randomPoints(trainingLimit, points);
  neuron = new Perceptron();
}
function draw() {
  background(0);
  displayPoints(points);

  // train
  const condition = pointIndex < points.length && frames < trainingLimit;
  train(points[pointIndex], condition);
  pointIndex++;

  // Draw Lines at the rate of 10% of training data in red color
  if (frames === Math.floor(trainingLimit * percentage)) {
    console.log("Percentage:", percentage, frames, lines);
    const strokeLine = [255, 0, 0];
    neuron.drawDecisionBoundary(strokeLine, lines, 1);
    percentage += rateOfPercentage;
  }

  // Display already drawn lines in previous stroke color itself (red) for each time draw gets called
  displayLines(lines);
  // Display latest line in green color
  neuron.drawDecisionBoundary(undefined, undefined, 4);
}
function mousePressed() {
  console.log("x: ", mouseX, "\ty:", mouseY);
  const point = new Point(mouseX, mouseY, 15);
  const result = neuron.guess(point, true);
  console.log("Result:", result);
  if (result === 1) {
    const fill = [0, 255, 0];
    point.setStyles(fill);
  } else {
    const fill = [0, 0, 255];
    point.setStyles(fill);
  }
  points.push(point);
}

function train(data, predicate) {
  if (predicate) {
    neuron.train(data);
    frames++;
  } else {
    if (frames === trainingLimit) {
      console.log("Training completed");
      frames++;
    }
  }
}
