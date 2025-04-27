class Point {
  constructor(x, y, radius, fill) {
    this.x = x ? normalize(x, 0, width) : normalize(random(width), 0, width);
    this.y = y ? normalize(y, height, 0) : normalize(random(height), height, 0);
    this.bias = 1;
    this.sign = this.x > this.y ? 1 : -1;
    this.width = radius ?? 10;
    this.height = radius ?? 10;
    this.fill = fill ?? [255, 255, 255];
  }
  setRadius(radius) {
    this.width = radius;
    this.height = radius;
  }
  setStyles(fill) {
    this.fill = fill ?? [255, 255, 255];
  }
  show() {
    noStroke();
    const x = deNormalize(this.x, 0, width);
    const y = deNormalize(this.y, height, 0);
    fill(this.fill[0], this.fill[1], this.fill[2]);
    ellipse(x, y, this.width, this.height);
  }
}
