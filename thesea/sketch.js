let screen_dims;
let angles = [0,0,0];

const keyCodes = {"a":65, "d": 68, "s": 83, "w": 87, "space": 32};
const userR = 5;
const userVel = 3;
const enemyR = 20;
const enemyVel = 1;
const enemyHitValueLoss = 10;
let user;
let points = [];
let enemies = [];
let Npts = 20;
let Nens = 3;

function setup() {
  screen_dims = [windowWidth, windowHeight];
  createCanvas(screen_dims[0], screen_dims[1]);
  rectMode(CENTER);

  user = new User(createVector(2*userR,screen_dims[1]/2), userR);
  for (var i = 0; i < Npts; i++) {
    points.push(new Point(createVector(screen_dims[0]*random(0.2,1), screen_dims[1]*random(0.2,1)), random(-1,1), random(15,50)));
  }
  for (var i = 0; i < Nens; i++) {
    enemies.push(new Enemy(createVector(screen_dims[0]-enemyR*1.5, screen_dims[1]*random(0.2,1)), enemyR));
  }
}

function draw() {
  background(66,188,244);

  handleTilted();
  handleKeysDown();
  user.update();

  user.render();
  for (var i = Npts-1; i >= 0; i--) {
    points[i].render();
    if (userHitsPoint(user, points[i])) {
      user.value += points[i].value;
      Npts -= 1;
      points.splice(i,1);
    }
  }
  for (var i = Nens-1; i >= 0; i--) {
    enemies[i].render();
    enemies[i].update();
    enemies[i].seek(user.pos);
    if (userHitsEnemy(user, enemies[i])) {
      user.value -= enemyHitValueLoss;
      Nens -= 1;
      enemies.splice(i,1);
    }
  }
  fill(0,0,0);
  textSize(25);
  text("Value: "+ user.value, 50, 50);
}

function handleTilted() {
  let threshold = 10;
  let rotated = false;
  if (deviceOrientation == "landscape")
    rotated = true;

  if ((angles[2] < -threshold && !rotated) || (angles[1] < -threshold && rotated)) {
    user.vel.x = -userVel;
    user.vel.y = 0;
  }
  else if ((angles[2] > threshold && !rotated) || (angles[1] > threshold && rotated)) {
    user.vel.x = userVel;
    user.vel.y = 0;
  }
  if ((angles[1] < -threshold && !rotated) || (angles[2] < -threshold && rotated)) {
    user.vel.x = 0;
    user.vel.y = -userVel;
  }
  else if ((angles[1] > threshold && !rotated) || (angles[2] > threshold && rotated)) {
    user.vel.x = 0;
    user.vel.y = userVel;
  }
}

function touchEnded() {
  user.vel.mult(0);
}

function handleKeysDown() {
  if (keyIsDown(LEFT_ARROW) || keyIsDown(keyCodes['a'])) {
    user.vel.x = -userVel;
    user.vel.y = 0;
  }
  else if (keyIsDown(RIGHT_ARROW) || keyIsDown(keyCodes['d'])) {
    user.vel.x = userVel;
    user.vel.y = 0;
  }
  if (keyIsDown(UP_ARROW) || keyIsDown(keyCodes['w'])) {
    user.vel.x = 0;
    user.vel.y = -userVel;
  }
  else if (keyIsDown(DOWN_ARROW) || keyIsDown(keyCodes['s'])) {
    user.vel.x = 0;
    user.vel.y = userVel;
  }
  if(keyIsDown(keyCodes['space'])) {
    user.vel.mult(0);
  }
};

// accelerometer Data
window.addEventListener('deviceorientation', function(e)
{
  angles[0] = e.alpha;
  angles[1] = e.beta;
  angles[2] = e.gamma;
  for (let i = 0; i < 3; i++)
    if (!angles[i])
      angles[i]=0;
});
