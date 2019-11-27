// functions
function updates()
{
	num_food += recurring_pizza;
	recurring_pizza += pizza_buyer;
	for (let i in allAnimals)
	{
		num_food = allAnimals[i].eatFood(num_food);
		allAnimals[i].reproduce();
	}
}

function addWisdom()
{
	let wisdomToAdd = 0;
	for (let i in allAnimals)
	{
		wisdomToAdd += allAnimals[i].getWisdom();
	}
	wisdom += wisdomToAdd;
}

function addStormlight()
{
	let stormlightToAdd = 0;
	for (let i in allAnimals)
	{
		stormlightToAdd += allAnimals[i].getStormlight();
	}
	stormlight += stormlightToAdd;
}

function orderPizza()
{
	if (stormlight > pizzaCost)
	{
		stormlight -= pizzaCost;
		recurring_pizza += 1;
	}
	else
	{
		$.notify("No pizza for you, you dont have the resources");
	}
}


function orderBuyer()
{
	if (wisdom >= buyerCost)
	{
		wisdom -= buyerCost;
		pizza_buyer += 1;
	}
	else
	{
		$.notify("you can't pay the buyer?");
	}
}

function userWon()
{
	let won = ( allAnimals[statsIdx["dino"]].getPopulation() == 1 );
	return won;
}

function saveTheLand()
{
	$.notify("you are so trash, it is legit called theland-conquest");
	initVars();
}

function destroyTheLand()
{
	$.notify("you win", "success");
	noLoop();
	$("body").prepend("<img src='imgs/alek4.png' style='width:100%;'></img>")
	window.scrollTo(0,0)
}

function cheat()
{
	let x = prompt("are you legit?");
	if (stupidHash(x) == 17153)
	{
		wisdom += 1e6;
		stormlight += 1e8;
		$.notify("you are sketchy but legit nonetheless");
	}
	else
	{
		$.notify("you are not legit");
	}
}

function firstUpper(x) {
	return x[0].toUpperCase() + x.slice(1);
}

function stupidHash(x)
{
	let y = 1;
	for (let i=0; i < x.length; i++)
	{
		y = ((7+y)*(x.charCodeAt(i) + 8191) + 10477) % 48383;
	}
	return y;
}
