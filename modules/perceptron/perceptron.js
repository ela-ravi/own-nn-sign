class Perceptron {
  #wX = random(-1, 1);
  #wY = random(-1, 1);
  #wBias = random(-1, 1);
  constructor() {
    this.weights = [this.#wX, this.#wY, this.#wBias];
    this.learningRate = 0.1;
  }
  #sign(value) {
    if (value >= 0) return 1;
    else return -1;
  }
  guess(input, cons = false) {
    let sum = 0;
    const inputsArray = [input.x, input.y, input.bias];
    for (let i = 0; i < inputsArray.length; i++) {
      if (cons)
        console.log(
          `${sum} += ${inputsArray[i]} * ${this.weights[i]}: ${(sum +=
            inputsArray[i] * this.weights[i])}`
        );
      sum += inputsArray[i] * this.weights[i];
    }
    return this.#sign(sum);
  }
  train(point) {
    const predicted = this.guess(point);
    const difference = point.sign - predicted;
    const error = difference * this.learningRate;

    const inputsArray = [point.x, point.y, point.bias];
    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] += error * inputsArray[i];
    }
  }
  drawDecisionBoundary(s, lines, sw) {
    const strk = s ?? [0, 255, 0];
    const m = -(this.weights[0] / this.weights[1]);
    const b = -(this.weights[2] / this.weights[1]);
    const x1 = -1;
    const y1 = m * x1 + b;

    const x2 = 1;
    const y2 = m * x2 + b;

    const x1_c = deNormalize(x1, 0, width);
    const y1_c = deNormalize(y1, height, 0);
    const x2_c = deNormalize(x2, 0, width);
    const y2_c = deNormalize(y2, height, 0);

    stroke(strk[0], strk[1], strk[2]);
    strokeWeight(sw);
    line(x1_c, y1_c, x2_c, y2_c);
    lines?.push({ x1: x1_c, y1: y1_c, x2: x2_c, y2: y2_c, s: strk });
  }
}
