class Player {
	constructor(flame) {
		this.flame = flame;
		this.bugs = [];
	}

	render() {
		this.flame.render();
		for(let i = 0; i < this.bugs.length; i++){
			this.bugs[i].render();
		}
	}
	bugBehavior() {
		for(let i = 0; i < this.bugs.length; i++){
			this.bugs[i].seek(this.flame.pos);
			this.bugs[i].update();
		}
	}

}
