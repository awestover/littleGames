// the food class

function Food(pos, transform, type) {
  this.pos = pos; // might be wrong
  this.transform = transform;
  this.type = type; // poison or growth?
};


Food.prototype.display = function()
{
  if (this.type == "poison")
  {
    fill (137, 244, 66, 100);
  }
  else {
    fill(206, 12, 154);
  }
  rect(this.pos[1]*transform[0], this.pos[0]*transform[1], transform[0], transform[1]);
}

Food.prototype.checkHit = function(snake)
{
  for (var i = 0; i < snake.body.length; i++)
  {
    if (snake.body[i][0] == this.pos[0] && snake.body[i][1] == this.pos[1])
    {
        return true;
    }
  }
  return false;
}
