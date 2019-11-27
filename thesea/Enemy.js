class Enemy {
  constructor(pos, r) {
      this.pos = pos;
      this.vel = createVector(0,0);
      this.r = r;
  }
  render() {
    fill(255,255,255);
    rect(this.pos.x, this.pos.y, 2*this.r, 2*this.r);
  }
  update() {
    this.pos.add(this.vel);
  }
  seek(pos) {
    this.vel = p5.Vector.sub(pos, this.pos).setMag(enemyVel);
  }
}
