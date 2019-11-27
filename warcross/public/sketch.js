
const canvas = document.getElementById('minimap');
const minimap = canvas.getContext('2d');
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const minimapRadius = 5;

function renderMinimap(poses, color){
	minimap.clearRect(0, 0, canvas.width, canvas.height);
	for(let p in poses){
		minimap.fillRect(poses[p][0]/8, poses[p][1]/8, minimapRadius*2, minimapRadius*2);
	}
	minimap.fillStyle = color;
	minimap.fill();
}

let socket;
let name;
let nameValidation;
let characterClass;
let lastTime;
let dt;
// IF YOU CHANGE THESE VARIABLES YOU MUST MUST MUST MUST MUST edit the vars in index.js too
const playerR = 30;
const gemR = playerR*1.5;
const VIEW_SIZE = 512; 
const FULL_SIZE = 2048;
let bg;

let bulletGoing = false;
const KEY_CODES = {" ": 32, "t": 84, "w": 87, "a": 65, "s": 83, "d": 68, "r": 82};
const CHAR_CLASS_TYPES = ["architect", "shield", "fighter", "thief"];
let TEAM_COLORS;
let char_images = {};
let rockImage;
let redGemImg;
let blueGemImg;

function setup(){
	let cnv = createCanvas(window.innerHeight, window.innerHeight);
	cnv.position((windowWidth - width)/2, (windowHeight - height)/2);
	socket = io();
	socket.on("receiveData", renderData);
	socket.on("bulletCollisionsDetected", function(bulletsHit){
		for(let bullet in bulletsHit){
			socket.emit("attacked", {"name": name, "damage": 10});
		}
	});
	socket.on("playerCollisionsDetected", function(playersHit){
		for(let player in playersHit){
			if(!playersHit[player].sameTeam){
				socket.emit("attacked", {"name": playersHit[player].name, "damage": 50});
			}
		}
	});
	socket.on("powerupCollisionsDetected", function(powerupHit){
		for(let powerup in powerupHit){
			socket.emit("powerup", {"name": name, "speedBoostMult": 2});
		}
	});
	socket.on("win", function(team){
		window.location.href="winscreen.html?"+team;
	});
	socket.on("newMsg", function(message){
		$("#messages").append(message+"<br>");
	});
	socket.on("goDie", function(){
		window.location.href="hackerCaught.html";
	});
	lastTime = Date.now();
	const url_object = new URL(window.location.href);
	name = url_object.searchParams.get("name");
	nameValidation = {"hash": url_object.searchParams.get("name_hash"), "salt": url_object.searchParams.get("name_salt")};
	characterClass = url_object.searchParams.get("characterClass");
	let validCharacter = false;
	for(let cc in CHAR_CLASS_TYPES){
		if(characterClass === CHAR_CLASS_TYPES[cc]){
			validCharacter = true;
		}
	}
	if(!validCharacter){
		characterClass = "fighter";
	}
	socket.emit("playerJoined", {"name":name, "characterClass":characterClass});
	textAlign(CENTER);
	textSize(20);
	bg = loadImage("data/tileMap.png");
	rockImage = loadImage("data/rock.png")
	for(let char_type in CHAR_CLASS_TYPES){
		char_images[CHAR_CLASS_TYPES[char_type]] = loadImage("data/avatars/"+CHAR_CLASS_TYPES[char_type]+"Av.png");
	} 
	
	TEAM_COLORS = {
		"RED": color(255,0,0,100),
		"BLUE": color(0,0,255,100), 
		"GREEN": color(0,255,0,10)
	};
	blueGemImg = loadImage("data/blueGem.png");
	redGemImg = loadImage("data/redGem.png");
}

function keyReleased(){
	if (keyCode === KEY_CODES["t"]){  // t
		socket.emit("attacked", {"name":name, "damage":50});
	}
	if (keyCode === KEY_CODES[" "]){ // Space shooting
		socket.emit("bulletShot", {"name": name, "wh": window.innerHeight, "mouseX": mouseX, "mouseY": mouseY});
		bulletGoing = true;
	}
	if(keyCode === KEY_CODES["r"]){ // release
		socket.emit("releaseGem", name);

	}
}

function draw(){
	// hackable. FIX: put a cap on dt
	dt = Date.now() - lastTime;
	lastTime += dt;

	if (keyIsDown(KEY_CODES["w"]) ^ keyIsDown(KEY_CODES["s"])){
		if(keyIsDown(KEY_CODES["w"])){
			socket.emit("action", {"name":name,"action":"UP_ARROW", "dt":dt});
		}
		else{
			socket.emit("action", {"name":name,"action":"DOWN_ARROW","dt":dt});
		}
	}
	if(keyIsDown(KEY_CODES["a"]) ^ keyIsDown(KEY_CODES["d"])){
		if(keyIsDown(KEY_CODES["a"])){
			socket.emit("action", {"name":name,"action":"LEFT_ARROW","dt":dt});
		}
		else{
			socket.emit("action", {"name":name,"action":"RIGHT_ARROW","dt":dt});
		}
	}

	if(bulletGoing){
		socket.emit("updateBullet", {"dt": dt, "name": name});
	}

	socket.emit("requestData");
	socket.emit("checkPlayerCollisions", name);
	socket.emit("checkBulletCollisions", name);
	socket.emit("checkPowerupCollisions", name);

	socket.emit("checkRedGemCollisions", name);
	socket.emit("checkBlueGemCollisions", name);

	socket.emit("verifyName", {"name":name,"name_hash":nameValidation.hash,"name_salt":nameValidation.salt});

}

function renderData(data) {
	let playerData = data["playerData"];
	let obstacleData = data["obstacleData"];
	let bulletData = data["bulletData"];
	let powerupData = data["powerupData"];
	let redGemData = data["redGemData"];
	let blueGemData = data["blueGemData"];

	push();
	scale(window.innerHeight/VIEW_SIZE);
	let px = playerData[name].pos[0];
	let py = playerData[name].pos[1];
	let tx = min(max(px, VIEW_SIZE/2), FULL_SIZE - VIEW_SIZE/2) - VIEW_SIZE/2;
	let ty = min(max(py, VIEW_SIZE/2), FULL_SIZE - VIEW_SIZE/2) - VIEW_SIZE/2;
	translate(-tx, -ty);
	image(bg, tx, ty, VIEW_SIZE, VIEW_SIZE, tx, ty, VIEW_SIZE, VIEW_SIZE);

	fill(255,0,0,100);
	rect(0,0,VIEW_SIZE,VIEW_SIZE);
	fill(0,0,255,100);
	rect(FULL_SIZE-VIEW_SIZE,FULL_SIZE-VIEW_SIZE,VIEW_SIZE,VIEW_SIZE);

	// Obstacles
	noStroke();
	fill("#606060");
	for(let obst in obstacleData){
		image(rockImage,obstacleData[obst].pos[0]-obstacleData[obst].size/2, obstacleData[obst].pos[1]-obstacleData[obst].size/2, obstacleData[obst].size, obstacleData[obst].size);
	}

	// Aim line
	if(keyIsDown(KEY_CODES[' '])){
		stroke("#ff0000");
		let pos = createVector(px, py);
		let fin = createVector(mouseX/window.innerHeight*VIEW_SIZE+tx, mouseY/window.innerHeight*VIEW_SIZE+ty);
		let delta = p5.Vector.sub(fin, pos);
		delta.setMag(130);
		line(pos.x + delta.x*0.1, pos.y + delta.y*0.1, pos.x + delta.x, pos.y + delta.y);
	}

	let allUserPoses = [];
	stroke("#000000");
	for (let player in playerData){
		fill(TEAM_COLORS[playerData[player].team]);
		ellipse(playerData[player].pos[0], playerData[player].pos[1], playerR*2.5, playerR*2.5)
		image(char_images[playerData[player].characterClass], playerData[player].pos[0]-playerR, playerData[player].pos[1]-playerR, playerR*2, playerR*2);
		fill(transparentify(colorHash(player)));
		text(player, playerData[player].pos[0], playerData[player].pos[1]-playerR*2);

		// Healthbar
		if (playerData[player].health >= 66)
			fill("#39ff14");
		else if (playerData[player].health >= 33)
			fill("#ff6700");
		else
			fill("#ff073a");
		rect(playerData[player].pos[0]-playerR*4/2, playerData[player].pos[1]-playerR*1.8, playerR*4*0.01*playerData[player].health, playerR/2, 20);

		allUserPoses.push(playerData[player].pos);
	}
	// draw it on the minimap
	renderMinimap(allUserPoses, "red");

	// powerups
	fill("#FF0000")
	for(let powerup in powerupData){
		if(!powerupData[powerup].frozen)
			ellipse(powerupData[powerup].pos[0], powerupData[powerup].pos[1], powerupData[powerup].size, powerupData[powerup].size);
	}

	// Bullets
	stroke("#ff0000");
	for (let bullet in bulletData){
		strokeWeight(bulletData[bullet].width);
		let bpos = createVector(bulletData[bullet].pos[0], bulletData[bullet].pos[1]);
		let bvel = createVector(bulletData[bullet].vel[0], bulletData[bullet].vel[1]);
		bvel.setMag(bulletData[bullet].height);
		line(bpos.x, bpos.y, bpos.x + bvel.x, bpos.y + bvel.y);
	}
	strokeWeight(2);
	stroke("#000000");

	// draw the gems 
	image(redGemImg, redGemData.pos[0]-gemR, redGemData.pos[1]-gemR, gemR*2, gemR*2);
	image(blueGemImg, blueGemData.pos[0]-gemR, blueGemData.pos[1]-gemR,gemR*2, gemR*2);

	if(playerData[name].frozen){
		fill(0,0,0);
		text("FROZEN", tx+VIEW_SIZE/2, ty+VIEW_SIZE/2);
	}
	pop();
}

function colorHash(socketIDNum) {
	let sketchySum = 0;
	for (let i = 0; i < socketIDNum.length; i++) {
		sketchySum += socketIDNum.charCodeAt(i);
	}
	let r = (sketchySum * 39) % 251;
	let g = (sketchySum * 27) % 251;
	let b = (sketchySum * 33) % 251;
	return color(r, g, b);
}

function transparentify(c){
	return color(c._getRed(), c._getBlue(), c._getGreen(), 50);	
}

function mousePressed(){
	console.log(mouseX);
}

function sendMessage(){
	let msg = name+": "+$("#msgTxt").val();
	socket.emit("sendMsg", msg);
}

