//update user display
function updateText()
{
	$("#stormlightCt").text("Stormlight: " + stormlight);
	$("#wisdomCt").text("Wisdom: " + wisdom);

	for (let ani in statsIdx) {
		$("#" + ani + "Ct").text(firstUpper(ani)+"s: "+allAnimals[statsIdx[ani]].getPopulation());
	}
	$("#num_food").text("Food: " + num_food);
	$("#recurring_pizza").text("Recurring Pizza: "+ recurring_pizza);
	$("#pizza_buyer").text("Pizza Buyers: "+ pizza_buyer);

	if (wisdom >= buyerCost || pizza_buyer > 0)
	{
		$("div#pizza_buyer_div").show();
	}
	else
	{
		$("div#pizza_buyer_div").hide();
	}

	if (allAnimals[statsIdx["shark"]].getPopulation() == 0 && wisdom == 0)
	{
		$("div#wisdom").hide();
	}
	else
	{
		$("div#wisdom").show();
	}

	for (let ani in statsIdx) {
		if (allAnimals[statsIdx[ani]].getPopulation() == 0 &&  stormlight >= allAnimals[statsIdx[ani]].getCost()) {
			$("#buy" + firstUpper(ani)).show();
		}
		else {
			$("#buy" + firstUpper(ani)).hide();
		}
	}

	if (userWon())
	{
		$("#finalDecision").show();
	}
	else
	{
		$("#finalDecision").hide();
	}
}
