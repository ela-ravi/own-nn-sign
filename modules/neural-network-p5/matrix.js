class Matrix {
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.data = [];
    for (let i = 0; i < this.rows; i++) {
      this.data.push([]); // This creates empty row to add elements inside it in next loop
      for (let j = 0; j < this.columns; j++) {
        this.data[i][j] = 0;
      }
    }
  }
  static multiply(matrixA, matrixB) {
    // Only for Matrix multiplication
    if (!matrixA instanceof Matrix || !matrixB instanceof Matrix) {
      console.log(
        "Provide 2 matrices where matrixA's columns === matrixB's rows"
      );
      return undefined;
    } else if (matrixB.rows === matrixA.columns) {
      // (ixj) x (jxk) = (ixk)
      const aData = matrixA.data;
      const bData = matrixB.data;
      let resultMatrix = new Matrix(matrixA.rows, matrixB.columns);
      let resultData = resultMatrix.data;
      for (let i = 0; i < matrixA.rows; i++) {
        for (let k = 0; k < matrixB.columns; k++) {
          let sum = 0;
          for (let j = 0; j < matrixB.columns; j++) {
            sum += aData[i][j] * bData[j][k];
          }
          resultData[i][k] = sum;
        }
      }
      return resultMatrix;
    }
    console.log(
      "Provide 2 matrices where matrixA's columns === matrixB's rows"
    );
    return undefined;
  }
  static transpose(matrix) {
    const data = matrix.data;
    const transposeMatrix = new Matrix(matrix.columns, matrix.rows);
    const transposeData = transposeMatrix.data;
    for (let i = 0; i < transposeMatrix.rows; i++) {
      for (let j = 0; j < transposeMatrix.columns; j++) {
        transposeData[i][j] = data[j][i];
      }
    }
    return transposeMatrix;
  }
  // Matrix from array
  static fromArray(array) {
    const matrix = new Matrix(array.length, 1);
    for (let i = 0; i < array.length; i++) {
      matrix.data[i][0] = array[i];
    }
    return matrix;
  }
  toArray() {
    const array = [];
    const length = this.rows * this.columns;
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        array.push(this.data[i][j]);
      }
    }
    return array;
  }
  // randomize
  randomize() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        // this.data[i][j] = Math.floor( // Math.floor -> converts to a whole number
        //   Math.random() * // Between 0 & 1 (decimal like 0.3,0.4)
        //     10 // Between 0 & 9.99
        // );
        this.data[i][j] = Math.random() * 2 - 1; // between (-1 and 1)
      }
    }
  }
  //   Mutable addition
  add(value) {
    if (value instanceof Matrix) {
      // Matrix addition
      const newData = value.data;
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.data[i][j] += newData[i][j];
        }
      }
    } else if (typeof Number(value) === "number") {
      // Scalar addition
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.data[i][j] += value;
        }
      }
    }
  }
  //   Mutable Multiplication
  multiply(value) {
    if (typeof Number(value) === "number") {
      // Scalar Multiplication
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.data[i][j] *= value;
        }
      }
    } else {
      console.log("Provide a scalar value to multiply with matrix elements");
    }
  }
  // map
  map(fn) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        // this.data[i][j] *= value;
        this.data[i][j] = fn(this.data[i][j], i, j);
      }
    }
  }
  // print
  print() {
    console.table(this.data);
  }
}

// const m = new Matrix(3,2);
// m.randomize();
// const n= new Matrix(2,2);
// n.add(5);
// m.print();
// n.print();
