class User {
  constructor(pos, r) {
    // vector, position
    this.pos = pos;
    // vector, velocity
    this.vel = createVector(0,0);
    // half of side length
    this.r = r;
    // sum of all point values collectes
    this.value = 0;
  }
  render() {
    fill(0,0,0);
    rect(this.pos.x, this.pos.y, 2*this.r, 2*this.r);
  }
  update() {
    this.pos.add(this.vel);
  }
}
