const trainingData = [
  { input: [0, 1], target: [1] },
  { input: [1, 0], target: [1] },
  { input: [0, 0], target: [0] },
  { input: [1, 1], target: [0] },
];
const epoch = 50000;
// const epoch = 100000;
function setup() {
  const neural_network = new NeuralNetwork(2, 4, 1);
  window.nn = neural_network;
  for (let i = 0; i < epoch; i++) {
    console.log("Training:", i++);
    for (let data of trainingData) {
      neural_network.train(data.input, data.target);
    }
  }
  console.log(neural_network.feedForward([0, 1])[0]);
  console.log(neural_network.feedForward([1, 0])[0]);
  console.log(neural_network.feedForward([0, 0])[0]);
  console.log(neural_network.feedForward([1, 1])[0]);
}
