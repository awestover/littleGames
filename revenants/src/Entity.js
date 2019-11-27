class Entity{
	constructor(incarnation_x, incarnation_y){
		this.whichEntity = "generic";
		this.health = 10;
		this.maxspeed = 2;
		this.pos = new p5.Vector(incarnation_x, incarnation_y);
		this.vel = p5.Vector.random2D().mult(this.maxspeed);
		this.dims = new p5.Vector(10,10);
		this.anchor = new p5.Vector(incarnation_x, incarnation_y);
		this.anchorRadius = 80;
	}
	update(){
		// vel*dt, but dt=1
		let proposedpos = p5.Vector.add(this.pos, this.vel);
		let xGood = proposedpos.x>-width/2+this.dims.x/2 && proposedpos.x<width/2-this.dims.x/2;
		let yGood = proposedpos.y>-height/2+this.dims.y/2 && proposedpos.y<height/2-this.dims.y/2; 
		if (xGood)
			this.pos.x += this.vel.x
		if (yGood)
			this.pos.y += this.vel.y
	}

	seek(){
		let delta = p5.Vector.sub(this.anchor, this.pos);
		delta.mult(this.maxspeed/delta.mag());
		this.vel = delta;
	}

	random_anchored_walk(){
		if (p5.Vector.dist(this.anchor, this.pos) < this.anchorRadius){
			this.wanderAngle = this.vel.heading();
			if(Math.random() < 0.1){
				this.wanderAngle += (Math.random()-0.5)*0.6;
				this.vel = p5.Vector.fromAngle(this.wanderAngle);
				this.vel.mult(0.5*this.maxspeed/this.vel.mag());
			}
		}
		else {
			this.seek();
		}
	}
	// this could be  aproelm tin hte long run...
	bounce(){
		this.vel.mult(-1);
		for( let i = 0; i < 10; i++){
			this.pos.add(this.vel);
		}
	}

	render(){
		fill(255,0,0);
		rect(this.pos.x, this.pos.y, this.dims.x, this.dims.y);
		fill(100,100,100,100);
		ellipse(this.pos.x, this.pos.y, this.anchorRadius*2, this.anchorRadius*2);
	}
}
