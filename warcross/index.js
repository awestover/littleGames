
// import libraries
const express = require('express'); // needs this library
let app = express();
const port = 3000; 
const server = require('http').createServer(app).listen(port);
const socket = require('socket.io');
let io = socket(server);
app.use(express.static('public'));
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const sprintf = require('sprintf-js').sprintf;
const Chance = require('chance');
let chance = new Chance();
const Crypto = require('crypto');

// MAKE SURE THAT THESE consts are consistent with sketch.js !!!!!!!!
const baseSpeed = 0.2;
const maxPlayers = 4;
const playerR = 30;
const VIEW_SIZE = 512; 
const FULL_SIZE = 2048;
const NUM_OBSTACLES = 20; 
const OBST_MULT = 7;
const bulletSpeed = 0.6;
const gemR = playerR*1.5;
const characterClassData = require("./public/CHAR_STATS.json");
const POWERUP_RESPAWN_TIMEOUT = 10000; // msec
const numPowerup = 1;
const powerupSize = 20;

console.log("server running");
app.post('/startGame', function(req, res){
	let characterClass = req.body.characterClass;
	let name = req.body.name;

	let salt = Crypto.randomBytes(8).toString('hex'); // 8 = 9-1, 512 = 2**9 
	let hash = Crypto.createHmac('sha512', salt);
	hash.update(name);
	let name_hash = hash.digest('hex');
	res.redirect(sprintf("index.html?name=%s&characterClass=%s&name_hash=%s&name_salt=%s", name, characterClass, name_hash, salt));
});

/*
 *	top left corner is red team (gem and players spawn here)
 *  no obstacles or powerups spawn in the red corner
 *  bottom right corner is blue team (gem and players spawn here)
 *  no obstacles or powerups spawn in the red corner
 *  everywhere else obstacles and powerups can spawn
 * */

let playerData = {};
let obstacleData = [];
let powerupData = [];
let bulletData = [];
let redGemData = {"pos": [VIEW_SIZE/2, VIEW_SIZE/2], "heldBy": -1};
let blueGemData = {"pos": [FULL_SIZE-VIEW_SIZE/2, FULL_SIZE-VIEW_SIZE/2], "heldBy": -1};

const minDistThreshold = VIEW_SIZE/2;// callibrate?
function realMod(n, m) { return ((n % m) + m) % m; }
// MAX : make this not spawn them too close together
for (let i = 0; i < NUM_OBSTACLES; i++){
	let minDistToObstacle = 0;
	let pos = [Math.random()*FULL_SIZE, Math.random()*FULL_SIZE];
	while(minDistToObstacle < minDistThreshold){
		minDistToObstacle = Infinity;
		// propose a position
		pos[0] = realMod(pos[0]+minDistThreshold*2*(Math.random()-0.5), FULL_SIZE);
		pos[1] = realMod(pos[1]+minDistThreshold*2*(Math.random()-0.5), FULL_SIZE);
		// calculate the min distance in a for loop
		for (let j = 0; j < obstacleData.length; j++){
			let potentialMinDistToObstacle = Math.sqrt(Math.pow(pos[0] - obstacleData[j].pos[0], 2) + Math.pow(pos[1] - obstacleData[j].pos[1], 2));
			if(potentialMinDistToObstacle < minDistToObstacle)
				minDistToObstacle = potentialMinDistToObstacle;
		}
		if((pos[0] < VIEW_SIZE && pos[1] < VIEW_SIZE)||(pos[0] > FULL_SIZE - VIEW_SIZE && pos[1] > FULL_SIZE - VIEW_SIZE)){
			pos = [Math.random()*FULL_SIZE, Math.random()*FULL_SIZE];
			minDistToObstacle = 0;
		}
	}
	obstacleData.push({
		"pos": pos, 
		"size": Math.max(chance.normal({mean: playerR*OBST_MULT, dev: playerR*3}), playerR*2)
	});
}

function getNextPowerupLocation(){
	let pospowerup;
	let minDistToPowerup = 0;
	while(minDistToPowerup < minDistThreshold){
		minDistToPowerup = Infinity;
		pospowerup = [Math.random()*FULL_SIZE, Math.random()*FULL_SIZE];
		for(let j = 0; j < obstacleData.length; j++){
			if (circleHitsCircle(pospowerup, powerupSize/2, obstacleData[j].pos , obstacleData[j].size/2)){
				minDistToPowerup = 0;
				break;
			}
		}

		if(!minDistToPowerup){
			for(let k = 0; k < powerupData.length; k++){
				let potentialMinDistToPowerup = Math.sqrt(Math.pow(pospowerup[0] - powerupData[k].pos[0], 2) + Math.pow(pospowerup[1] - powerupData[k].pos[1], 2));
				if(potentialMinDistToPowerup < minDistToPowerup){
					minDistToPowerup = potentialMinDistToPowerup;
				}
			}
		}

		if((pospowerup[0] < VIEW_SIZE && pospowerup[1] < VIEW_SIZE)||(pospowerup[0] > (FULL_SIZE - VIEW_SIZE) && pospowerup[1] > (FULL_SIZE - VIEW_SIZE))) {
			pospowerup = [Math.random()*FULL_SIZE, Math.random()*FULL_SIZE];
			minDistToPowerup = 0;
		}
	}
	return pospowerup;
}

for (let i = 0; i < numPowerup; i++){
	powerupData.push({
		"pos": getNextPowerupLocation(),
		"size" : powerupSize,
		"frozen": false
	});
}

io.sockets.on('connection', function(socket){
	console.log("connected");
	let userId;
	socket.on('action', function(actionData){
		let name = actionData["name"];
		if(!Object.keys(playerData).includes(name)){
			socket.emit("goDie");
		}
		else{
			if(!playerData[name].frozen){
				let action = actionData["action"];
				let dt = actionData["dt"];

				let proposedPos = [playerData[name].pos[0], playerData[name].pos[1]];
				// potential flaw: spawn in rock --> really bad
				switch(action){
					case "UP_ARROW":
						if (playerData[name]["pos"][1] > playerR)
							proposedPos[1] -= dt*playerData[name]["speed"];
						break;
					case "DOWN_ARROW":
						if (playerData[name]["pos"][1] < FULL_SIZE-playerR)
							proposedPos[1] += dt*playerData[name]["speed"];
						break;
					case "LEFT_ARROW":
						if (playerData[name]["pos"][0] > playerR)
							proposedPos[0] -= dt*playerData[name]["speed"];
						break;
					case "RIGHT_ARROW":
						if (playerData[name]["pos"][0] < FULL_SIZE-playerR)
							proposedPos[0] += dt*playerData[name]["speed"];
						break;
					default:
						break;
				}

				for(let i = 0; i < obstacleData.length; i++){
					// is size radius or diameter?
					if(circleHitsCircle(obstacleData[i].pos, obstacleData[i].size/2, proposedPos, playerR)){
						proposedPos[0] = playerData[name].pos[0];
						proposedPos[1] = playerData[name].pos[1];
						break;
					}
				}
				playerData[name].pos[0] = proposedPos[0];
				playerData[name].pos[1] = proposedPos[1];

				if(redGemData.heldBy == name){
					redGemData.pos[0] = proposedPos[0];
					redGemData.pos[1] = proposedPos[1];
				}
				if(blueGemData.heldBy == name){
					blueGemData.pos[0] = proposedPos[0];
					blueGemData.pos[1] = proposedPos[1];
				}
			}
		}
	});


	socket.on('checkBlueGemCollisions', function(name){
		if(!Object.keys(playerData).includes(name)){
			socket.emit("goDie");
		}
		else{
			if (blueGemData.heldBy != name){
				if (playerData[name].team === "BLUE"){
					if (blueGemData.heldBy === -1){
						if(circleHitsCircle(playerData[name].pos, playerR, blueGemData.pos, gemR)){
							blueGemData.heldBy = name;
						}
					}
				}
				else {// RED
						if(circleHitsCircle(playerData[name].pos, playerR, blueGemData.pos, gemR)){
							socket.emit('win', "RED");
					}
				}
			}
		}
	});

	socket.on('checkRedGemCollisions', function(name){
		if(!Object.keys(playerData).includes(name)){
			socket.emit("goDie");
		}
		else{
			if (redGemData.heldBy != name){
				if (playerData[name].team === "RED"){
					if (redGemData.heldBy === -1){
						if(circleHitsCircle(playerData[name].pos, playerR, redGemData.pos, gemR)){
							redGemData.heldBy = name;
						}
					}
				}
				else {// BLUE
					if(circleHitsCircle(playerData[name].pos, playerR, redGemData.pos, gemR)){
						socket.emit('win', "BLUE");
					}
				}
			}
		}
	});

	socket.on('checkPlayerCollisions', function(name){
		if(!Object.keys(playerData).includes(name)){
			socket.emit("goDie");
		}
		else{
			let playersHit = [];
			for(let player in playerData){
				if(player != name){
					if(circleHitsCircle(playerData[player].pos, playerR, playerData[name].pos, playerR)){
						playersHit.push({"name": player, "sameTeam": playerData[name].team === playerData[player].team});
					}
				}
			}
			if(playersHit.length != 0){
				socket.emit("playerCollisionsDetected", playersHit);
			}
		}
	});

	socket.on('checkPowerupCollisions', function(name){
		if(!Object.keys(playerData).includes(name)){
			socket.emit("goDie");
		} 
		else{
			let powerupsHit = [];
			for(let powerup in powerupData){
				if(!powerupData[powerup].frozen){
					if(circleHitsCircle(playerData[name].pos, playerR, powerupData[powerup].pos, powerupData[powerup].size)) {
						powerupsHit.push(powerup);
						powerupData[powerup].frozen = true;
						setTimeout(function(){
							powerupData[powerup].frozen = false;
							powerupData[powerup].pos = getNextPowerupLocation();
						}, POWERUP_RESPAWN_TIMEOUT);
					}
				}
			}
			if(powerupsHit.length != 0)
				socket.emit("powerupCollisionsDetected", powerupsHit);
		}
	});

	socket.on('checkBulletCollisions', function(name){
		let bulletsHit = [];
		for(let bullet in bulletData){
			if (bulletData[bullet].owner != name){
				// agh this is sketchy -- um how so? -- cuz bullets aren't circles?
				if(circleHitsCircle(playerData[name].pos, playerR, bulletData[bullet].pos, bulletData[bullet].width)){
					bulletsHit.push(bullet);
				}
			}
		}
		if(bulletsHit.length != 0){
			socket.emit("bulletCollisionsDetected", bulletsHit);
		}
	});

	socket.on('updateBullet', function(data){
		let dt = data.dt;
		let name = data.name;
		for(let bullet in bulletData){
			if (bulletData[bullet].owner === name){
				bulletData[bullet].pos[0] += bulletData[bullet].vel[0]*dt;
				bulletData[bullet].pos[1] += bulletData[bullet].vel[1]*dt;
			}
		}
	});

	socket.on('requestData', function(){
		socket.emit("receiveData", {"playerData": playerData, "bulletData": bulletData, "obstacleData": obstacleData, "powerupData": powerupData, "redGemData": redGemData, "blueGemData": blueGemData});
	});

	socket.on('playerJoined', function(data){
		let name = data.name;
		console.log("Player joined: "+name);
		let characterClass = data.characterClass;
		userId = name;
		let nameUsedAlready = false;
		for(let na in playerData){
			if (playerData[na] === name){
				nameUsedAlready = true;
			}
		}
		if (nameUsedAlready || Object.keys(playerData).length > maxPlayers)	{
			playerData[name] = {
				"pos": [FULL_SIZE*Math.random(), FULL_SIZE*Math.random()], 
				"speed": baseSpeed, 
				"health": 100,
				"isSpectator": true,
				"characterClass": characterClass,
				"team": "GREEN",
				"frozen": false
			};
		}
		else{
			let team = Object.keys(playerData).length % 2 === 0 ? "RED" : "BLUE";
			let spawnPos = (team==="RED") ? [(VIEW_SIZE-2*playerR)*Math.random()+playerR, (VIEW_SIZE-playerR*2)*Math.random()+playerR] : [FULL_SIZE-playerR-(VIEW_SIZE-playerR*2)*Math.random(), FULL_SIZE-playerR-(VIEW_SIZE-playerR*2)*Math.random()];
			
			playerData[name] = {
				"pos": spawnPos, 
				"speed": baseSpeed, 
				"health": 100,
				"isSpectator": false,
				"characterClass": characterClass,
				"team": team,
				"frozen": false
			};
		}
	});

	socket.on('bulletShot', function(data){
		let name = data.name;
		if(!playerData[name].frozen){
			let wh = data.wh;
			let mouseX = data.mouseX;
			let mouseY = data.mouseY;

			let px = playerData[name].pos[0];
			let py = playerData[name].pos[1];
			let tx = Math.min(Math.max(px, VIEW_SIZE/2), FULL_SIZE - VIEW_SIZE/2) - VIEW_SIZE/2;
			let ty = Math.min(Math.max(py, VIEW_SIZE/2), FULL_SIZE - VIEW_SIZE/2) - VIEW_SIZE/2;

			let fin = [mouseX/wh*VIEW_SIZE+tx, mouseY/wh*VIEW_SIZE+ty];
			let delta = [fin[0]-px, fin[1]-py];
			let deltaMag = Math.sqrt(delta[0] * delta[0] + delta[1] * delta[1]);
			delta[0] *= bulletSpeed/deltaMag;
			delta[1] *= bulletSpeed/deltaMag;

			bulletData.push({
				"pos": [px, py],
				"vel": delta,
				"owner": name, 
				"width": 4,
				"height": 20
			});
		}
	});

	socket.on('disconnect', function(){
		console.log("disconnect");
		delete playerData[userId];
	});

	socket.on('attacked', function(attackData){
		let name = attackData.name;
		if(!Object.keys(playerData).includes(name)){
			socket.emit("goDie");
		} 
		else{
			if(!playerData[name].frozen){
				playerData[name].health = Math.max(0, playerData[name].health - attackData.damage);
				if(playerData[name].health === 0){
					let respawnPos = (playerData[name].team==="RED") ? [(VIEW_SIZE-2*playerR)*Math.random()+playerR, (VIEW_SIZE-playerR*2)*Math.random()+playerR] : [FULL_SIZE-playerR-(VIEW_SIZE-playerR*2)*Math.random(), FULL_SIZE-playerR-(VIEW_SIZE-playerR*2)*Math.random()];
					
					playerData[name].frozen = true;
					setTimeout(function(){
						playerData[name].health = 100;
						playerData[name].pos = respawnPos;
						playerData[name].frozen = false;
					}, 5000);
				}
			}
		}
	});

	socket.on("sendMsg", function(msg){
		io.sockets.emit("newMsg", msg);
	});

	socket.on("verifyName", function(data){
		try{
			if(!checkNameWithHash(data.name, data.name_hash, data.name_salt)){
				socket.emit("goDie");
			}
		}
		catch(e){
			socket.emit("goDie");
		}
	});

	socket.on('powerup', function(powerupData){
		let name = powerupData["name"];
		let speedBoostMult = powerupData["speedBoostMult"];
        let rng = Math.floor(2*Math.random()); // this is kinda weird tbh, the powerups should probably have identities that they display so users can decide whether or not to go for a powerup
        if(rng === 1){
					playerData[name].speed = baseSpeed * speedBoostMult;
        }
        if(rng === 0){
					playerData[name].health += 50;
        }
	});

	// this is so trash MAJOR PROBLEMS WITH THIS
	// ex: can throw gem off of the screen, or into a rock!!
	socket.on("releaseGem", function(name){
		if(!Object.keys(playerData).includes(name)){
			socket.emit("goDie");
		} 
		else{
			let randTheta = Math.random()*Math.PI*2;
			if(playerData[name].team === "RED"){
				redGemData.heldBy = -1;
				redGemData.pos[0] += Math.cos(randTheta)*playerR*3;
				redGemData.pos[1] += Math.sin(randTheta)*playerR*3;
			}
			else if(playerData[name].team === "BLUE"){
				blueGemData.heldBy = -1;
				blueGemData.pos[0] += Math.cos(randTheta)*playerR*3;
				blueGemData.pos[1] += Math.sin(randTheta)*playerR*3;
			}
		}
	});
});

function circleHitsCircle(posA, rA, posB, rB){
	return (Math.sqrt(Math.pow(posA[0]-posB[0], 2) + Math.pow(posA[1] - posB[1], 2)) < rA + rB); 
}

function checkNameWithHash(name, claim_name_hash, name_salt){
	let hash = Crypto.createHmac('sha512', name_salt);
	hash.update(name);
	let real_name_hash = hash.digest('hex');
	return real_name_hash === claim_name_hash;
}

