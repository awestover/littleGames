function Snake(initPos, grid, transform) {
  this.body = [initPos];// head is at the begginning
  this.grid =  grid;
  this.transform = transform;
  this.dir = [0, 0];
};

Snake.prototype.display = function()
{
  for (var i = 0; i < this.grid[0]; i++)
  {
    for (var j = 0; j < this.grid[1]; j++)
    {
      for (var b = 0; b < this.body.length; b++)
      {
        if (this.body[b][0] == i && this.body[b][1] == j)
        {
          if (b == 0)
          {
              fill(255, 0, 0);
              ellipseMode(CORNER);
              noStroke();


              if (this.dir[0] == 0 && this.dir[1] == 0)
              {
                ellipse(j*transform[0], i*transform[1], transform[0], transform[1]);
              }

              if (this.dir[0] == 0 && this.dir[1] == -1)
              {
                ellipse(j*transform[0], i*transform[1], transform[0], transform[1]);
                rect(j*transform[0] + transform[1]/2, i*transform[1], transform[0]/2, transform[1]);

              }
              else if (this.dir[0] == 0 && this.dir[1] == 1)
              {
                ellipse(j*transform[0], i*transform[1], transform[0], transform[1]);
                rect(j*transform[0], i*transform[1], transform[0]/2, transform[1]);

              }
              else if (this.dir[0] == 1 && this.dir[1] == 0)
              {
                ellipse(j*transform[0], i*transform[1], transform[0], transform[1]);
                rect(j*transform[0], i*transform[1], transform[0], transform[1]/2);

              }
              else if (this.dir[0] == -1 && this.dir[1] == 0)
              {
                ellipse(j*transform[0], i*transform[1], transform[0], transform[1]);
                rect(j*transform[0], i*transform[1] + transform[1]/2, transform[0], transform[1]/2);

              }

              stroke(0);
          }
          else {
            if (b % 2 == 0)
            {
              fill(0, 170, 130);
            }
            else {
              fill(0, 130, 170);
            }
            rect(j*transform[0], i*transform[1], transform[0], transform[1]);
          }
        }
      }
    }
  }
}


Snake.prototype.update = function()
{
  if (this.dir[0] != 0 || this.dir[1] != 0)
  {
    for (var b = this.body.length - 1; b > 0; b--)
    {
      this.body[b][0] = this.body[b - 1][0];
      this.body[b][1] = this.body[b - 1][1];
    }
    var b = 0;
    this.body[b][0] = (this.body[b][0] + this.dir[0]) % this.grid[0];
    this.body[b][1] = (this.body[b][1] + this.dir[1]) % this.grid[1];

    // above moduli are not legit so this is neccessacry
    if (this.body[b][0] < 0)
    {
      this.body[b][0] += this.grid[0];
    }
    if (this.body[b][1] < 0)
    {
      this.body[b][1] += this.grid[1];
    }
  }
}

Snake.prototype.grow = function()
{
  var last = this.body[this.body.length - 1];
  var next = [last[0] - this.dir[last], last[1] - this.dir[last]];
  this.body.push(next);
}


//simpler version of the hash checking eatYourself
// function, theoretically worse, but I don't know...
Snake.prototype.simpleSuicide = function()
{
  for (var ba = 0; ba < this.body.length; ba++)
  {
    for (var bb = 0; bb < this.body.length; bb++)
    {
      if (ba != bb)
      {
        var rMatch = this.body[ba][0] == this.body[bb][0];
        var cMatch = this.body[ba][1] == this.body[bb][1];
        if (rMatch && cMatch)
        {
          return true;
        }
      }
    }
  }
  return false;
}

//does not quite work...
//don't worry about it though
Snake.prototype.eatYourself = function()
{
  var hashCols = [];
  var hashRows = [];

  //initialize hash table
  for (var c = 0; c < this.grid[0]; c++)
  {
    hashCols.push([]);
  }
  for (var r = 0; r < this.grid[1]; r++)
  {
    hashRows.push([]);//will store the index
  }

  //fill the table and check for collissions
  for (var b = 0; b < this.body.length; b++)
  {
    hashCols[this.body[b][0]].push(b);
    hashRows[this.body[b][1]].push(b);

    var rCollide = hashRows[this.body[b][1]].length > 1;
    var cCollide = hashCols[this.body[b][0]].length > 1;
    if (rCollide && cCollide)
    {

      for (var rr = 0; rr < hashRows.length; rr++)
      {
        for (var cc = 0; cc < hashCols.length; cc++)
        {
          if (hashRows[rr] == hashCols[cc] && hashRows[rr] != b)
          {
            //hash collide means snake ate itself
            return true;
          }
        }
      }

    }
  }
  return false; // no collide then you are not dead ... yet
}
