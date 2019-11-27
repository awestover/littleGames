class Prey extends Animal {
	constructor(radius) {
		super();
		this.type = "Prey"; 
		this.r = radius;
		this.radius = radius;
		this.updateTraitBounds("Prey", this.radius);
		this.getColor();
	}

	getColor() {
		this.c = color(0, this.squeezeColor(trait_info["Prey"], this.radius), 0);
	}

	update() { 
		super.update();
		if (random() < preyReproductionPr) {
			let newR = randomGaussian(this.r, 0);
			newR = Math.max(minR, newR);
			allAnimals.add(new Prey(newR));
		}
	}

}
