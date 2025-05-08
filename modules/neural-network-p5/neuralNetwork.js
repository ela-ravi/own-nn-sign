class NeuralNetwork {
  constructor(input_nodes, hidden_nodes, output_nodes) {
    this.input_nodes = input_nodes;
    this.hidden_nodes = hidden_nodes;
    this.output_nodes = output_nodes;

    this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
    this.weights_ih.randomize();
    this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);
    this.weights_ho.randomize();

    this.bias_ih = 1;
    this.bias_ho = 1;

    this.weights_bias_ih = new Matrix(this.hidden_nodes, 1);
    this.weights_bias_ih.randomize();
    this.weights_bias_ho = new Matrix(this.output_nodes, 1);
    this.weights_bias_ho.randomize();

    this.learningRate = 0.1;
  }
  feedForward(input_array) {
    const inputMatrix = Matrix.fromArray(input_array);
    // Input -> Hidden
    const hiddenMatrix = Matrix.multiplyM(this.weights_ih, inputMatrix); // This creates feed forward dense layer
    hiddenMatrix.add(this.weights_bias_ih); // Add bias
    hiddenMatrix.map(this.sigmoid); // Activation function in hidden layer

    // Hidden -> Output
    const outputMatrix = Matrix.multiplyM(this.weights_ho, hiddenMatrix); // This creates feed forward dense layer
    outputMatrix.add(this.weights_bias_ho); // Add bias
    outputMatrix.map(this.sigmoid); // Activation function
    return outputMatrix.toArray();
  }
  train(input_array, target_array) {
    const inputMatrix = Matrix.fromArray(input_array);
    
    // this.weights_ih.print("this.weights_ih");
    // inputMatrix.print("inputMatrix");
    // this.weights_ih.print("this.weights_ih");

    // Input -> Hidden
    const hiddenMatrix = Matrix.multiplyM(this.weights_ih, inputMatrix); // This creates feed forward dense layer
    hiddenMatrix.add(this.weights_bias_ih); // Add bias
    hiddenMatrix.map(this.sigmoid); // Activation function in hidden layer

    // this.weights_ho.print("this.weights_ho");
    // hiddenMatrix.print("HiddenMatrix");
    // this.weights_ho.print("this.weights_ho");

    // For debugging
    window.weights_ho = this.weights_ho;
    window.hiddenMatrix = hiddenMatrix;

    // Hidden -> Output
    const outputMatrix = Matrix.multiplyM(this.weights_ho, hiddenMatrix); // This creates feed forward dense layer

    outputMatrix.print("OutputMatrix");

    outputMatrix.add(this.weights_bias_ho); // Add bias
    outputMatrix.map(this.sigmoid); // Activation function
    // findout del_weights_ih, del_weights_ho, del_bias_ih, del_bias_ho

    // 1) del_weights_ho
    // Output Error
    const targetMatrix = Matrix.fromArray(target_array);

    targetMatrix.print("targetMatrix");

    const outputs_error = Matrix.subtract(targetMatrix, outputMatrix);

    let outputGradientMatrix = Matrix.map(outputMatrix, this.dSigmoid);

    outputGradientMatrix.print("outputGradientMatrix (DS)");
    outputs_error.print("outputs_error");

    outputGradientMatrix.multiplyE(outputs_error);

    // outputGradientMatrix.print("outputGradientMatrix (OE)");

    outputGradientMatrix.multiplyE(this.learningRate);

    // outputGradientMatrix.print("outputGradientMatrix (LR)");

    const hiddenMatrix_T = Matrix.transpose(hiddenMatrix);

    const del_weights_ho = Matrix.multiplyM(
      outputGradientMatrix,
      hiddenMatrix_T
    );
    
    // del_weights_ho.print("del_weights_ho");
    
    this.weights_ho.add(del_weights_ho);

    // 2) del_weights_ih
    // Hidden_Error = (W(ho)_transpose x outputError)
    const weights_ho_T = Matrix.transpose(this.weights_ho);
    const hiddenErrors = Matrix.multiplyM(weights_ho_T, outputs_error);

    // hiddenErrors.print("Hidden Errors:");

    let hiddenGradientMatrix = Matrix.map(hiddenMatrix, this.dSigmoid);
    
    // hiddenGradientMatrix.print("hiddenGradientMatrix");
    
    hiddenGradientMatrix.multiplyE(hiddenErrors);
    hiddenGradientMatrix.multiplyE(this.learningRate);

    const inputMatrix_T = Matrix.transpose(inputMatrix);
    const del_weights_ih = Matrix.multiplyM(
      hiddenGradientMatrix,
      inputMatrix_T
    );
    this.weights_ih.add(del_weights_ih);

    // 3) del_bias_ho
    this.weights_bias_ho.add(outputGradientMatrix);

    // 4) del_bias_ih
    this.weights_bias_ih.add(hiddenGradientMatrix);
  }
  sigmoid(x) {
    // f(x) = 1 / ( 1 + e^(-x))
    return 1 / (1 + Math.exp(x * -1));
  }
  dSigmoid(y) {
    return y * (1 - y);
  }
}
