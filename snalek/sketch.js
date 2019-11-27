var screen_dims;
var grid;
var snake;
var fps;
var foods;
var extra_slow;
var ct;
var killed;
var goodFoodCt;

function preload()
{
	song = loadSound("MailManSong2.mp3");
}

function set_default_parameters()
{
  var smaller = min(windowWidth, windowHeight)*0.9;
  screen_dims = [smaller, smaller];
  grid = [20, 20];
  transform = [screen_dims[0] / grid[0], screen_dims[1] / grid[1]];
  snake = new Snake([5, 5], grid, transform);
  fps = 45;
  extra_slow = 10;
  ct = 0;
  console.log(snake.body[0][0] + ", " + snake.body[0][1]);
  foods = randomFood(10, grid, transform, snake.body);
}

function setup() {
  set_default_parameters();
  frameRate(fps);
  createCanvas(screen_dims[0], screen_dims[1]);
}

function draw() {
	ct = (ct + 1) % extra_slow;

	if (ct == 0)
	{
		background(255);
		drawGrid();
		snake.update();
		if (snake.simpleSuicide())
		{
			gameOverRoutine();
		}
		goodFoodCt = 0;
		for (var f = foods.length - 1; f >= 0; f--)
		{
			killed = false;
			if (foods[f].checkHit(snake))
			{
				if (foods[f].type == "poison")
				{
					console.log("I've been poisoned");
					gameOverRoutine();
				}
				else {
					snake.grow();
          killed = true;
  				foods.splice(f, 1);
				}
			}
			if (!killed)
			{
				foods[f].display();
				if (foods[f].type != "poison")
				{
					goodFoodCt += 1;
				}
			}
		}
	 	snake.display();
		if (foods.length == 0 || goodFoodCt == 0) {
			foods = randomFood(10, grid, transform, snake.body);
		}
	}
}

function drawGrid()
{
	for (var i = 0; i < grid[0]; i++)
	{
		for (var j = 0; j < grid[1]; j++)
		{
			fill(10, 10, 10, 150);
			rect(j*transform[0], i*transform[1], transform[0], transform[1]);
		}
	}
}

function gameOverRoutine()
{
	alert("Game Over");
	set_default_parameters();
}

function handleKey(key)
{
	var nextDir = [0, 0];
  if (key == "a")
  {
    nextDir = [0, -1];
  }
  else if (key == "w")
  {
    nextDir = [-1, 0];
  }
  else if (key == "s")
  {
    nextDir = [1, 0];
  }
  else if (key == "d")
  {
    nextDir = [0, 1];
  }
  snake.dir = nextDir;
}

function keyPressed() {
  handleKey(key.toLowerCase());
}

function valNotIn(array, val)
{
	for (var i = 0; i < array.length; i++)
	{
		if (array[i] == val)
		{
			return false;
		}
	}
	return true;
}

//big array should have sub arrays of the same length as array
function arrayValNotIn(big_array, array)
{
	for (var i = 0; i < big_array.length; i++)
	{
		if (big_array[i].length == array.length)
		{
			var allMatch = true;
			for (var j = 0; j < big_array[i].length; j++)
			{
				if (big_array[i][j] != array[j])
				{
					allMatch = false;
				}
			}
			if (allMatch)
			{
				return false;
			}
		}
	}
	return true;
}

function randomIntTo(max)
{
	return int(random()*max);
}

function randomFoodType(good_cutoff)
{
	if (random() < good_cutoff)
	{
		return "food";
	}
	else {
		return "poison";
	}
}

function randomFood(numFoods, grid, transform, snake_body)
{

	// list of foods to return, initialized to the border
	var tempFoods = generateBorderPoison(grid, transform);
	// forbiden loccations, i.e. already used
	var used_pos = [];

	// can't have stuff on the snake already
	for (var s = 0; s < snake_body.length; s++)
	{
		used_pos.push(snake_body[s]);
	}
	//no food allowed on the border
	for (var b = 0; b < tempFoods.length; b++)
	{
		used_pos.push(tempFoods[b].pos);
	}
	var foodsMade = 0;

	// if we are not already full...
	// avoids possible infinite loop
	if (tempFoods.length + numFoods < grid[0]*grid[1])
	{
		while (foodsMade < numFoods) {
			var newGuess = [randomIntTo(grid[0]), randomIntTo(grid[1])];
			if (arrayValNotIn(used_pos, newGuess)) {
				foodsMade += 1;
				tempFoods.push(new Food(newGuess, transform, randomFoodType(0.5)));
				used_pos.push(newGuess);
			}
		}
	}

	return tempFoods;
}

function generateBorderPoison(grid, transform)
{
	var the_poison = [];
	for (var i = 0; i < grid[0]; i++)
	{
		the_poison.push(new Food([i, 0], transform, "poison"));
		the_poison.push(new Food([i, grid[0]-1], transform, "poison"));
	}
	for (var i = 1; i < grid[1] - 1; i++)
	{
		the_poison.push(new Food([0, i], transform, "poison"));
		the_poison.push(new Food([grid[1]-1, i], transform, "poison"));
	}
	return the_poison;
}
