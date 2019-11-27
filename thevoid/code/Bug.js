class Bug {
	constructor(pos) {
		// state variables 
		this.pos = pos;
		this.vel = createVector(0,0);
		
		// appearence parameters 
		this.h = 30;  // height
		this.w = 10;  // width

		// movement parameters
		this.maxSpeed = 5;
		this.maxAcc = 0.05;

		// fitness parameters
		this.health = 1;
		this.sightR = 20;
			
	} 
	render() {
		fill(255,255,255);
		// pos is the center of the triangle, 		
		push();
		translate(this.pos.x, this.pos.y);
		rotate(this.vel.heading()); 
		triangle(this.h*2/3, 0, -this.h/3, -this.w/2, -this.h/3, this.w/2);
		fill(255,0,0,50);
		ellipse(0,0, this.sightR*2, this.sightR*2);
		pop();
	}

	update() {
		this.pos.add(this.vel);
	}

	// behavior____________________________-
	// cool things to think about:
	// seek a moving target by predicting where it will move?
	// avoidance? how to make it efficient???
	// collisions
	// multiple things at once, what are the weights
	// attack
	seek(target) {
		let desiredVel = p5.Vector.sub(target, this.pos);
		desiredVel.setMag(this.maxSpeed);
		let acc = p5.Vector.sub(desiredVel, this.vel);
		acc.limit(this.maxAcc);
		// apply the force
		this.vel.add(acc);
	}
}
