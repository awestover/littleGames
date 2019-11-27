class Barricade extends Entity {
	constructor(incarnation_x, incarnation_y){
		super(incarnation_x, incarnation_y);
		this.whichEntity = "barricade";

		this.isSelectedcted = 0;
		this.defaultColor = color(100, 42, 42);
		this.selectedColor = color(40, 200, 100)
		// this.health = set_barricade_value
		this.dims.x = 50;
		this.dims.y = 50;
	}
	render() {
		if (this.isSelected)
			fill(this.selectedColor);
		else
			fill(this.defaultColor);
		rect(this.pos.x-this.dims.x/2, this.pos.y-this.dims.y/2, this.dims.x, this.dims.y);
	}
}
