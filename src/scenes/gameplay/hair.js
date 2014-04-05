var Hair = function()
{
  var self = this;

  //const helper
  self.randomPtWithinROfPt = function(pt, r)
  {
    //terribly ineficient but I don't care
    var d = r+1;
    var newpt;
    while(d > r)
    {
      newpt = {"x":pt.x,"y":pt,y}
      newpt.x += Math.random()*2r-r;
      newpt.y += Math.random()*2r-r;
      d = Math.sqrt(Math.pow(pt.x-newpt.x,2)+Math.pow(pt.y-newpt.y,2));
    }
    return newpt;
  }

  self.growth = 0.0;
  self.growthrate = 0.001;
  self.color = "#FFFFFF";
  var dirty = false;

  var spline = new Spline([[0.0,0.0],[0.0,0.0],[0.0,0.0]]);
  self.setOrigin = function(x,y)
  {
    var offx = x - spline.pts[0][0];
    var offy = y - spline.pts[0][1];
    self.setHairPts([
      [x,y],
      [spline.pts[1][0]+offx,spline.pts[1][1]+offy],
      [spline.pts[2][0]+offx,spline.pts[2][1]+offy]
    ]);
  }
  self.setElbow = function(x,y)
  {
    var offx = x - spline.pts[1][0];
    var offy = y - spline.pts[1][1];
    self.setHairPts([
      [spline.pts[0][0],spline.pts[0][1]],
      [x,y],
      [spline.pts[2][0]+offx,spline.pts[2][1]+offy]
    ]);
  }
  self.setTip = function(x,y)
  {
    self.setHairPts([
      [spline.pts[0][0],spline.pts[0][1]],
      [spline.pts[1][0],spline.pts[1][1]],
      [spline.pts[2][0],spline.pts[2][1]]
    ]);
  }
  self.setHairPts = function(pts)
  {
    spline.setPts(pts);
    dirty = true;
  }

  self.tick = function()
  {
    self.growth += self.growthrate;
  }

  self.draw = function(canv)
  {
    if(dirty)
    {
      for(var i = 0; i < self.growth; i+=self.growthrate)
      {
        
      }
    }
  }
}

