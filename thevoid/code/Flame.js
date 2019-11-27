class Flame {
	constructor(pos) {
		this.pos = pos;
		this.health = 100;
	}
	render() {
		fill(10,255,10, 100);
		ellipse(this.pos.x, this.pos.y, this.health, this.health);
	}
}
