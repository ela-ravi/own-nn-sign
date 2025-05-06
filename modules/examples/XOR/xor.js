let nn;
const trainingData = [
  {
    input: [0, 1],
    output: [1],
  },
  {
    input: [1, 0],
    output: [1],
  },
  {
    input: [0, 0],
    output: [0],
  },
  {
    input: [1, 1],
    output: [0],
  },
];
let size;
let cols;
let rows;
function setup() {
  createCanvas(800, 800);
  nn = new NeuralNetwork(2, 4, 1);
  size = 30;
  cols = width / size;
  rows = height / size;
}
function draw() {
  //   noLoop();
  background(0);
  for (let i = 0; i < 1000; i++)
    for (let data of trainingData) nn.train(data.input, data.output);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const x = i / cols;
      const y = j / rows;
      const output = nn.feedForward([x, y]);
      console.log(output[0]);
      stroke(255);
      noFill();
      //   fill(output * 255);
      const startPoint = [i * size, j * size];
      rect(startPoint[0], startPoint[1], size, size);
      const t = Number(output * 255);
      fill(t);
      textSize(12);

      text(Number(t).toFixed(2), startPoint[0] + 5, startPoint[1] + 15);
    }
  }
}
