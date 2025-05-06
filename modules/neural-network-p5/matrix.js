class Matrix {
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.data = Array(this.rows)
      .fill()
      .map(() => Array(this.cols).fill(0));
  }

  // Multiply with Matrix
  static multiplyM(matrixA, matrixB) {
    // Only for Matrix multiplication
    if (!matrixA instanceof Matrix || !matrixB instanceof Matrix) {
      console.log(
        "Provide 2 matrices where matrixA's columns === matrixB's rows"
      );
      return undefined;
    } else if (matrixA.columns === matrixB.rows) {
      // (ixk) x (kxj) = (ixj)
      const resultMatrix = new Matrix(matrixA.rows, matrixB.columns);
      resultMatrix.map((_, i, j) => {
        let sum = 0;
        for (let k = 0; k < matrixA.columns; k++) {
          sum += matrixA.data[i][k] * matrixB.data[k][j];
        }
        return sum;
      });
      return resultMatrix;
      // const aData = matrixA.data;
      // const bData = matrixB.data;
      // let resultMatrix = new Matrix(matrixA.rows, matrixB.columns);
      // let resultData = resultMatrix.data;
      // for (let i = 0; i < matrixA.rows; i++) {
      //   for (let j = 0; j < matrixB.columns; j++) {
      //     let sum = 0;
      //     for (let k = 0; j < matrixA.columns; k++) {
      //       const xx = aData[i][k] * bData[k][j];
      //       console.log("xx:", xx);
      //       if (Number.isNaN(xx)) {
      //         console.log("==> NAN:", aData[i][j], bData[i][j]);
      //       }
      //       sum += xx;
      //     }
      //     resultData[i][j] = sum;
      //   }
      // }
      // console.log("resultMatrix:", resultMatrix);
      // return resultMatrix;
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
  static map(matrix, fn) {
    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.columns; j++) {
        // this.data[i][j] *= value;
        matrix.data[i][j] = fn(matrix.data[i][j], i, j);
      }
    }
    return matrix;
  }
  toArray() {
    const array = [];
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

  //   Mutable subtraction
  static subtract(matrix1, matrix2) {
    if (matrix1 instanceof Matrix && matrix2 instanceof Matrix) {
      // Matrix subtraction
      const data1 = matrix1.data;
      const data2 = matrix2.data;
      for (let i = 0; i < matrix1.rows; i++) {
        for (let j = 0; j < matrix1.columns; j++) {
          data1[i][j] -= data2[i][j];
        }
      }
    } else {
      console.log("Provide 2 matrices for subtraction");
    }
    return matrix1;
  }
  //   Mutable Multiplication Element-wise
  multiplyE(value) {
    if (typeof value === "number") {
      // Scalar Multiplication
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.data[i][j] *= value;
        }
      }
    } else {
      const newData = value.data;
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.data[i][j] *= newData[i][j];
        }
      }
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
  print(str) {
    console.log(`${str}: rows: ${this.rows}, columns: ${this.columns}`);
    console.table(this.data);
  }
}

// FOR PRACTISE:
// const m = new Matrix(3,2);
// m.randomize();
// const n= new Matrix(2,2);
// n.add(5);
// m.print();
// n.print();
