class Predator extends Animal {
	constructor(sight) {
		super();
		this.type = "Predator";
		this.r = 20;
		this.vel.x = random(); this.vel.y = random();
		this.sight = sight;
		this.updateTraitBounds("Predator", this.sight);
		this.getColor();
	}

	getColor() {
		this.c = color(this.squeezeColor(trait_info["Predator"], this.sight), 0, 0);
	}

}
