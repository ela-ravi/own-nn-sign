function randomPoints(count, containerArray) {
  for (let i = 0; i < count; i++) {
    const point = new Point();
    containerArray.push(point);
  }
}
function displayPoints(pointsArrays) {
  for (let point of pointsArrays) {
    point.show();
  }
}
function displayLines(lines) {
  for (let l of lines) {
    stroke(l.s[0], l.s[1], l.s[2]);
    line(l.x1, l.y1, l.x2, l.y2);
  }
}
function normalize(value, start, end) {
  return map(value, start, end, -1, 1);
}
function deNormalize(value, start, end) {
  return map(value, -1, 1, start, end);
}
