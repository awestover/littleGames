let user = new User();

let seraphs = [];
let chimeras = [];
let barricades = [];
let tempBarricade;
let stoneRadius = 80;
let stonePos = new p5.Vector(0,0);
let seraphSpawnRate = 1.02;
let deadCt = 0;

function drawStone(){
	fill(0,255,0,50);
	ellipse(0,0,stoneRadius*2,stoneRadius*2);
}

function collideLine(aMin, aMax, bMin, bMax) {
	return ((bMin < aMax) && (bMax > aMin));
}

function rectHitsRect(posA, dimsA, posB, dimsB) {
	let xInt = collideLine(posA.x-dimsA.x/2, posA.x+dimsA.x/2, posB.x-dimsB.x/2, posB.x+dimsB.x/2);
	let yInt = collideLine(posA.y-dimsA.y/2, posA.y+dimsA.y/2, posB.y-dimsB.y/2, posB.y+dimsB.y/2);
	return (xInt && yInt);
}

function largeRadiusRandomPoint(r){
	return [r*Math.cos(Math.random()*2*Math.PI), r*Math.sin(Math.random()*2*Math.PI)];
}

function pointInRect(point, rectPos, rectDims){
	let xGood = (point.x > rectPos.x) && (point.x < rectDims.x + rectPos.x);
	let yGood = (point.y > rectPos.y) && (point.y < rectDims.y + rectPos.y);
	return yGood && xGood;
}

function circleHitsCircle(posA, rA, posB, rB){
	let dx2 = Math.pow(posA.x - posB.x, 2);
	let dy2 = Math.pow(posA.y - posB.y, 2);
	return dx2+dy2 <= Math.pow(rA+rB,2)
}

function rectHitsCircle(posCircle, rCircle, posRect, dimsRect){
  /*circle rectangle collision
  easier to think of circle running into rectangle, even though it is the other way arround
  Basic idea: if the point on the square which is closest to the circle isn't in the circle there is not collision
  otherwise there is collision.
  Clamp opperation: get the point in the sqare closest to the circles center X and Y
  */

  // gives center if circle is in rectangle, otherwise gives the coordinates of the closest side (x and y)
  let nearX = Math.max(posRect.x, Math.min(posCircle.x, posRect.x+dimsRect.x));
  let nearY = Math.max(posRect.y, Math.min(posCircle.y, posRect.y+dimsRect.y));

  let dx = nearX - posCircle.x; let dy = nearY - posCircle.y;

  return (dx*dx + dy*dy <= rCircle*rCircle);

}


function setup(){
	// ellipseMode(CENTER);
	createCanvas(window.innerWidth*0.95, window.innerHeight*0.95);
	textSize(30);
	tempBarricade = new Barricade(600,600)
}

function draw(){
	background(0);
	translate(width/2, height/2);
	drawStone();
	placeBarricade();
	Mouse();
	if (Math.random() > 1/seraphSpawnRate){
		seraphs.push(new Seraph(...largeRadiusRandomPoint(height*0.8)));
	}
	for(let i in seraphs){
		seraphs[i].render();
		seraphs[i].update();

		if (seraphs[i].health <= 0) {
			seraphs.splice(i, 1);
		}
		else if(rectHitsCircle(stonePos, stoneRadius, seraphs[i].pos, seraphs[i].dims)){	
			deadCt++;
		}
	}
	for(let i in chimeras){
		chimeras[i].render();
		chimeras[i].update();

		for(let j in seraphs){
			if (rectHitsRect(chimeras[i].pos, chimeras[i].dims, seraphs[j].pos, seraphs[j].dims)){
				meleeOnContact(j, i);
			}
		}

		let auraPos = createVector(chimeras[i].pos.x+chimeras[i].dims.x/2, chimeras[i].pos.y+chimeras[i].dims.y/2);
		for(let j in seraphs){
			if (rectHitsCircle(auraPos, chimeras[i].auraRadius, seraphs[j].pos, seraphs[j].dims)){
				seraphs[j].health -= chimeras[i].auraAttackDamage;
			}
		}

		if (chimeras[i].health <= 0) {
			chimeras.splice(i, 1);
		}
	}
	for(let i in barricades){
		barricades[i].render();
		for(let j in seraphs){
			if (rectHitsRect(barricades[i].pos, barricades[i].dims, seraphs[j].pos, seraphs[j].dims)){
				seraphs[j].bounce();
			}
		}
	}
	tempBarricade.render();
	fill(255,255,255);
	text("Slugs: "+user.slugs, 20-width/2, 30-height/2);
	text("Souls: "+user.souls, 20-width/2, 60-height/2);
	text("Deathct: "+deadCt, 20-width/2, 90-height/2);
}


function mouseReleased(){
	if (keyIsDown(83)){		// s key
		reviveChimera(mouseX-width/2, mouseY-height/2);
	}
	else if (keyIsDown(68)){	// d key
		let selectedChimeraIndex = toggleSelectChimera(mouseX-width/2, mouseY-height/2);
		deleteChimera(selectedChimeraIndex);
	}
	else if (keyIsDown(66) && user.slugs > 50) {	// b key
			barricades.push(new Barricade(mouseX-width/2, mouseY-height/2));
			user.slugs -= 50;
	}
	else if (mouseButton === LEFT){		// select/unselect chimera
		toggleSelectChimera(mouseX-width/2, mouseY-height/2);
	}
}

function mousePressed(){
	if (keyIsDown(90)){		// z key, send all selected to anchor point
		setAnchor(mouseX-width/2, mouseY-height/2);
	}
}

function keyReleased() {
  if (keyCode === 65) {		// a key
		auraAttack();
  }
	else if (keyCode == 85){	// u key
		selectAll();
	}

	tempBarricade.pos.x = -1000;
	tempBarricade.pos.y= -1000;
}

function reviveChimera(posX, posY){
	if (user.souls > 0) {
		chimeras.push(new Chimera(posX, posY));
		user.souls--;
		console.log("spawned chimera");
	}
}

function toggleSelectChimera(x, y){
	for(let i in chimeras){
		if (pointInRect(createVector(x, y), chimeras[i].pos, chimeras[i].dims)){
			if (chimeras[i].isSelected) {
				chimeras[i].isSelected = 0;
				console.log("unselected chimera");
			}
			else {
				chimeras[i].isSelected = 1;
				console.log("selected chimera");
				console.log("Health: " + chimeras[i].health);
			}
			return i;
		}
	}
	return -1;
	console.log("none selected");
}

function deleteChimera(selectedChimeraIndex){
	if (selectedChimeraIndex == -1)
		return;
	user.souls++;
	chimeras.splice(selectedChimeraIndex, 1);
}

function meleeOnContact(impactedSeraphIndex, impactedChimeraIndex){
	chimeras[impactedChimeraIndex].health -= seraphs[impactedSeraphIndex].meleeDamage;
	seraphs[impactedSeraphIndex].health -= chimeras[impactedChimeraIndex].meleeDamage;
}

function auraAttack(){
	for(let i in chimeras){
		if (chimeras[i].isSelected && chimeras[i].auraAttackCooldown <= 0){
			chimeras[i].auraAttackCooldown = 10;

		}
	}
}

function selectAll(){
	for(let i in chimeras){
		if (!chimeras[i].isSelected)
			chimeras[i].isSelected = 1;
	}
}

function setAnchor(incarnation_x, incarnation_y){
	for(let i in chimeras){
		if (chimeras[i].isSelected){
			chimeras[i].anchor = createVector(incarnation_x, incarnation_y);
		}
	}
}

function placeBarricade(){
	if (keyIsDown(66)){
		//set the mouse to be a barricade
		tempBarricade.pos.x = mouseX-width/2;
		tempBarricade.pos.y = mouseY-height/2;
	}
}

function Mouse(){
	noCursor();
	fill(255, 0, 0, 0);
	stroke(255, 0, 0);
	strokeWeight(3);
	circle(mouseX-width/2, mouseY-height/2, 10);
	fill(0, 0, 0);
	stroke(0, 0, 0);
}

setInterval(function(){user.slugs+=3}, 1000);

