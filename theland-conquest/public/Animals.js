class Animals {

	constructor(species)
	{
		this.species = species;
		for (let characteristic in stats[statsIdx[this.species]]) {
			this[characteristic] = stats[statsIdx[this.species]][characteristic];
		}
		this.population = this.initialPopulation;
	}

	getCost()
	{
		return this.cost;
	}

	getPopulation()
	{
		return this.population;
	}

	getStormlight()
	{
		return this.population*this.stormlight_collection;
	}

	getWisdom()
	{
		return this.population * this.wisdom_collection;
	}

	eatFood(num_food)
	{
		let new_food = num_food - this.population * this.food_consumption;
		if (new_food < 0)
		{
			let num_to_kill = -1*Math.floor(new_food/this.food_consumption);
			this.population -= num_to_kill
			return num_food-this.population*this.food_consumption;
		}
		else
		{
			return new_food;
		}
	}

	reproduce()
	{
		for (let i = 0; i < this.population; i++)
		{
			if (random() < this.reproductionPr)
			{
				this.population += 1;
			}
		}
	}

	buyFirst()
	{
		if (stormlight >= this.cost)
		{
			stormlight -= this.cost;
			this.population += 1;
			$.notify("Hooray you have a " + this.species, "success");
		}
		else
		{
			$.notify("You don't have enough resources to get a  " + this.species, "error");
		}
	}

}
