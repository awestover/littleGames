class Personal extends Animal {
	constructor(speed) {
		super();
		this.type = "Personal";
		this.r = 10;
		this.speed = speed;
		this.vel.x = random(); this.vel.y = random();
		this.vel.mult(speed);
		this.updateTraitBounds("Personal", this.speed);
		this.getColor();
	}

	getColor() {
		this.c = color(0,0,this.squeezeColor(trait_info["Personal"], this.speed));
	}
}