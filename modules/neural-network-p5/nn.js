const sigmoid = (x) => {
  // 1/(1+e^(-x))
  return 1 / (1 + Math.exp(x * -1));
};
class NeuralNetwork {
  constructor(input_nodes, hidden_nodes, output_nodes) {
    this.input_nodes = input_nodes;
    this.hidden_nodes = hidden_nodes;
    this.output_nodes = output_nodes;
    this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
    this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);
    this.weights_ih.randomize();
    this.weights_ho.randomize();
    this.bias_ih = new Matrix(this.hidden_nodes, 1);
    this.bias_ho = new Matrix(this.output_nodes, 1);
    this.bias_ih.randomize();
    this.bias_ho.randomize();
  }
  feedForward(input_array) {
    const inputs = Matrix.fromArray(input_array);
    const hidden = Matrix.multiply(this.weights_ih, inputs); // This creates feed forward dense layer
    hidden.add(this.bias_ih); // Add bias
    hidden.map(sigmoid); // Activation function in hidden layer

    const output = Matrix.multiply(this.weights_ho, hidden); // This creates feed forward dense layer
    output.add(this.bias_ho); // Add bias
    output.map(sigmoid); // Activation function
    return output.toArray();
  }
}
