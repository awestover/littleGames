class Point {
  constructor(pos, value, r) {
    // a vector
    this.pos = pos;
    // -1 < value < 1
    this.value = value;
    // rgb for display, red is negative value, green is positive, gradient shows degree of value
    this.color = colorGradient[Math.floor(20*(1+this.value))];
    // size
    this.r = r;
  }
  render() {
    fill(...this.color, 200);
    ellipse(this.pos.x,this.pos.y,this.r*2);
  }
}
