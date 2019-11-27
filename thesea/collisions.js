function userHitsPoint(user, pt) {
  // pt in rectangle closest to circles center (for x and y)
  let closeX = min(max(user.pos.x-user.r, pt.pos.x), user.pos.x+user.r);
  let closeY = min(max(user.pos.y-user.r, pt.pos.y), user.pos.y+user.r);
  // given 3 numbers a, b, c where a < b
  // to get the middle of the 3 numbers you do the clamp (min(max(a,c),b))
  let closestPt = createVector(closeX, closeY);
  return closestPt.sub(pt.pos).mag() < pt.r;
}

function userHitsEnemy(user, enemy) {
  // this is rectangle collision
  let xHit = max(user.pos.x-user.r, enemy.pos.x-enemy.r) < min(user.pos.x+user.r, enemy.pos.x+enemy.r);
  let yHit = max(user.pos.y-user.r, enemy.pos.y-enemy.r) < min(user.pos.y+user.r, enemy.pos.y+enemy.r);
  return yHit && xHit;
}
