
let user;
let enemy;

// the plan is to have the board be way bigger than the screen, but not yet...

function setup(){
	createCanvas(window.innerWidth, window.innerHeight);

	user = new Player(new Flame(createVector(width*0.2,height*0.5)));
	enemy = new Player(new Flame(createVector(width*0.8,height*0.5)));

	for (var i = 0; i < 3; i++) {
		user.bugs.push(new Bug(createVector(width*(random()*0.9+0.05), height*(random()*0.9+0.05))));
	}
}

function draw(){
	background(0);

	user.render();
	user.bugBehavior();
	enemy.render();
	enemy.bugBehavior();

	user.flame.pos.x = mouseX;

}
