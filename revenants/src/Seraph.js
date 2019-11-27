class Seraph extends Entity {
	constructor(incarnation_x, incarnation_y){
		super(incarnation_x, incarnation_y);
		this.whichEntity = "seraph";
		this.meleeDamage = 5;
	}
	update(){
		this.random_anchored_walk();
		super.update();
	}
}
