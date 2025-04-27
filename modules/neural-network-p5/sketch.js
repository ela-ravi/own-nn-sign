function setup() {
  const neural_network = new NeuralNetwork(2, 2, 1);
  const inputs = [1, 0];
  const output = neural_network.feedForward(inputs);
  console.log(output);
}
