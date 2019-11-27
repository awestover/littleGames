
let trait_info = {
	"Prey": [4,50],
	"Predator": [1,1.1],
	"Personal": [1.5,15]
}

let preyReproductionPr = 0.001;
let minR = 0.1;

let allAnimals = new Collisions();

function setup() {
	createCanvas(innerWidth*0.9, innerHeight*0.9);
	ellipseMode(CENTER);

	for (let i = 0; i < 40; i++) {
		allAnimals.add(new Prey(trait_info["Prey"][0]+random()*(trait_info["Prey"][1]-trait_info["Prey"][0])));
	}
	for (let i = 0; i < 5; i++) {
		allAnimals.add(new Personal(trait_info["Personal"][0]+random()*(trait_info["Personal"][1]-trait_info["Personal"][0])));
	}
}

function draw() {
	background(150,150,150);

	let inds = allAnimals.collisions();
	if (inds.length != 0) {
		for (let i = 0; i < inds.length; i++)
		{
			let anis = [allAnimals.animals[inds[i][0]], allAnimals.animals[inds[i][1]]];
			if (anis[0].type == "Personal" && anis[1].type == "Prey") 
			{
				anis[1].isDead = true;
			}
			else if (anis[0].type == "Prey" && anis[1].type == "Personal") {
				anis[0].isDead = true;
			}
		}
	}	

	for (let i = 0; i < allAnimals.animals.length; i++) {
		if (!allAnimals.animals[i].isDead) {
			allAnimals.animals[i].display();
			allAnimals.animals[i].update();
		}
		else {
			allAnimals.animals.splice(i, 1);
			i -= 1;
		}
	}
}

setInterval(function() {
	let ct = 0;
	for (let i = 0; i < allAnimals.animals.length; i++)
	{
		if (allAnimals.animals[i].type == "Prey") 
		{
			ct += 1;
		}
	}
	if (ct == 0)
	{
		allAnimals.add(new Prey(trait_info["Prey"][0]+random()*(trait_info["Prey"][1]-trait_info["Prey"][0])));
	}
}, 1000);
