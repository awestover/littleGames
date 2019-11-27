// variables

// environment
let stormlight, wisdom, num_food;
let recurring_pizza, pizzaCost, buyerCost;
let pizza_buyer;

// animals
let allAnimals;

// graphics
let dogPic;

function initVars()
{
	stormlight = 0;
	wisdom = 0;
	num_food = 1;
	recurring_pizza = 1;
	pizzaCost = 10;
	buyerCost = 1;
	pizza_buyer = 0;

	allAnimals = [];
	for (let idx in stats) {
		allAnimals.push(new Animals(stats[idx].name));
	}
}
