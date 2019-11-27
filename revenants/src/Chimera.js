class Chimera extends Entity {
	constructor(incarnation_x, incarnation_y){
		super(incarnation_x, incarnation_y);
		this.whichEntity = "chimera";

		this.meleeDamage = 10;
		this.auraAttackDamage = 5;

		this.auraAttackCooldown = 0;
		this.isSelected = 0;
		this.defaultColor = color(0, 255, 242);
		this.selectedColor = color(40, 200, 100)

		this.auraRadius = 100;
		this.img = loadImage("data/skeletonWalk.png");
		this.animationCt = 0;
		this.numAnimationFrames = 13;
		this.dims = new p5.Vector(22, 33);
	}
	render() {
		this.random_anchored_walk();

		// if (this.isSelected)
		//   fill(this.selectedColor);
		// else
		//   fill(this.defaultColor);
		// rect(this.pos.x, this.pos.y, this.dims.x, this.dims.y);

		if (this.auraAttackCooldown > 0){
			fill(0, 255, 242, 50);
			ellipse(this.pos.x+this.dims.x/2, this.pos.y+this.dims.y/2, this.auraRadius*2, this.auraRadius*2);
			this.auraAttackCooldown -= 0.05;
		}
		push();
		translate(this.pos.x, this.pos.y)
		scale(Math.sign(this.vel.x),1);
		image(this.img,0,0, 2*this.dims.x, 2*this.dims.y, this.dims.x*this.animationCt,0,this.dims.x, this.dims.y);
		pop();
			
	}
	update(){
		this.random_anchored_walk();
		super.update();
		this.animationCt = (this.animationCt+1)%this.numAnimationFrames;
	}
}
