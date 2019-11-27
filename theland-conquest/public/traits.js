let stats = [
	{
		"name": "dog",
		"food_consumption": 1,
		"stormlight_collection": 1,
		"wisdom_collection": 0,
		"reproductionPr": 0.04,
		"initialPopulation": 1,
		"cost": Math.pow(10,1)
	},
	{
		"name": "shark",
		"food_consumption": 2,
		"stormlight_collection": 3,
		"wisdom_collection": 1,
		"reproductionPr": 0.01,
		"initialPopulation": 0,
		"cost": Math.pow(10,2)
	},
	{
		"name": "balrog",
		"food_consumption": 3,
		"stormlight_collection": 10,
		"wisdom_collection": 9,
		"reproductionPr": 0.0001,
		"initialPopulation": 0,
		"cost": 3*Math.pow(10,2)
	},
	{
		"name": "bear",
		"food_consumption": 5,
		"stormlight_collection": 10,
		"wisdom_collection": 9,
		"reproductionPr": 0.001,
		"initialPopulation": 0,
		"cost": 5*Math.pow(10,2)
	},
	{
		"name": "butterfly",
		"food_consumption": 10,
		"stormlight_collection": 20,
		"wisdom_collection": 20,
		"reproductionPr": 0.001,
		"initialPopulation": 0,
		"cost": Math.pow(10,3)
	},
	{
		"name": "chicken",
		"food_consumption": 15,
		"stormlight_collection": 40,
		"wisdom_collection": 40,
		"reproductionPr": 0.0001,
		"initialPopulation": 0,
		"cost": 4*Math.pow(10,3)
	},
	{
		"name": "crab",
		"food_consumption": 20,
		"stormlight_collection": 50,
		"wisdom_collection": 60,
		"reproductionPr": 0.0001,
		"initialPopulation": 0,
		"cost": Math.pow(10,4)
	},
	{
		"name": "dragon",
		"food_consumption": 5,
		"stormlight_collection": 10,
		"wisdom_collection": 99,
		"reproductionPr": 0.0001,
		"initialPopulation": 0,
		"cost": 4*Math.pow(10,4)
	},
	{
		"name": "narwhal",
		"food_consumption": 5,
		"stormlight_collection": 10,
		"wisdom_collection": 99,
		"reproductionPr": 0.0001,
		"initialPopulation": 0,
		"cost": Math.pow(10,5)
	},
	{
		"name": "sheep",
		"food_consumption": 5,
		"stormlight_collection": 10,
		"wisdom_collection": 99,
		"reproductionPr": 0.0001,
		"initialPopulation": 0,
		"cost": Math.pow(10,5)
	},
	{
		"name": "squid",
		"food_consumption": 5,
		"stormlight_collection": 10,
		"wisdom_collection": 99,
		"reproductionPr": 0.0001,
		"initialPopulation": 0,
		"cost": Math.pow(10,5)
	},
	{
		"name": "dino",
		"food_consumption": 1,
		"stormlight_collection": 1,
		"wisdom_collection": 0,
		"reproductionPr": 0.001,
		"initialPopulation": 0,
		"cost": Math.pow(10,10)
	}
];

let statsIdx = {};
for (let idx in stats) {
	statsIdx[stats[idx].name] = idx;
}
