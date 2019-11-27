class Animal {
	constructor() {
		this.type = "Animal";
		this.isDead = false;
		this.pos = createVector(width*random(), height*random());
		this.vel = createVector(0, 0);
		this.r = 10;
		this.c = color(50,50,50);
	}

	update() {
		this.pos.add(this.vel);
		this.bounce();
	}

	bounce() {
		if (this.pos.x > width && this.vel.x > 0) {
			this.vel.x = -this.vel.x;
		}
		else if (this.pos.x < 0 && this.vel.x < 0) {
			this.vel.x = -this.vel.x;
		}
		if (this.pos.y > height && this.vel.y > 0) {
			this.vel.y = -this.vel.y;
		}
		if (this.pos.y < 0 && this.vel.y < 0) {
			this.vel.y = -this.vel.y;
		}
	}

	squeezeColor(range, trait) {
		return 50+150*(trait - range[0]) / (range[1]-range[0]);
	}

	display() {
		fill(this.c);
		ellipse(this.pos.x, this.pos.y, 2*this.r, 2*this.r);
		noFill();
	}

	updateTraitBounds(animalType, newVal) {
		let tmp = trait_info[animalType];
		if (newVal < tmp[0]) 
		{
			trait_info[animalType][0] = newVal;
		}
		else if (newVal > tmp[1]) {
			trait_info[animalType][1] = newVal;
		}
		else {
			return false;
		}
		for (let i = 0; i < allAnimals.animals.length; i++)
		{
			if (allAnimals.animals[i].type)
			allAnimals.animals[i].getColor();
		}
		return true;
	}

}
