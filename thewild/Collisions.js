// make it better later
// for simplicity all objects in the tree should probably either be circles or rectangles
// maybe somehow put probabilities too, like DONT check that one for a while since it is far away? 
// hopefully quadtree will make it so that that is useless though

class Collisions {
	constructor() {
		this.animals = [];
	}

	add(x) {
		this.animals.push(x);
	}

	collisions() {
		let inds = [];
		for (let i = 0; i < this.animals.length; i++)
		{
			for (let j = i+1; j < this.animals.length; j++) 
			{
				if (this.circleCollide(this.animals[i], this.animals[j])) {
					inds.push([i,j]);
				}
			}
		}
		return inds;
	}

	circleCollide(p1, p2) {
		let dist = Math.pow(p1.pos.x - p2.pos.x, 2) + Math.pow(p1.pos.y - p2.pos.y, 2);
		let rs = Math.pow(p1.r + p2.r, 2);
		return dist < rs;
	}

}
