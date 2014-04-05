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
      newpt = [pt[0],pt[1]];
      newpt[0] += Math.random()*2*r-r;
      newpt[1] += Math.random()*2*r-r;
      d = Math.sqrt(Math.pow(pt.x-newpt.x,2)+Math.pow(pt.y-newpt.y,2));
    }
    return newpt;
  }

  self.growth = 0.0;
  self.growthrate = 0.0001;
  self.drawres = 0.1;
  self.color = "#000000";

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
  self.randomizeAroundOrigin = function(o,l)
  {
    var elbow = self.randomPtWithinROfPt(o,l);
    var tip   = self.randomPtWithinROfPt(o,l);
    self.setHairPts([o,elbow,tip]);
  }
  var no = false;
  self.biasTowardVec = function(bx, by)
  {
    var orig = spline.pts[0];
    var elbow = spline.pts[1];

    var l = Math.sqrt(Math.pow(elbow[0]-orig[0],2)+Math.pow(elbow[1]-orig[1],2));
    var newelbow = [(elbow[0]-orig[0]+bx)/l,(elbow[1]-orig[1]+by)/l];
    var l2 = Math.sqrt(Math.pow(newelbow[0],2)+Math.pow(newelbow[1],2));
    newelbow[0] /= l2;
    newelbow[1] /= l2;
    newelbow[0] *= l;
    newelbow[1] *= l;
    self.setElbow(orig[0]+newelbow[0],orig[1]+newelbow[1]);

    var elbow = spline.pts[1];
    var tip = spline.pts[2];

    var l = Math.sqrt(Math.pow(tip[0]-elbow[0],2)+Math.pow(tip[1]-elbow[1],2));
    var newtip = [(tip[0]-elbow[0]+bx)/l,(tip[1]-elbow[1]+by)/l];
    var l2 = Math.sqrt(Math.pow(newtip[0],2)+Math.pow(newtip[1],2));
    newtip[0] /= l2;
    newtip[1] /= l2;
    newtip[0] *= l;
    newtip[1] *= l;
    self.setTip(elbow[0]+newtip[0],elbow[1]+newtip[1]);

    no = true;
  }
  self.setHairPts = function(pts)
  {
    spline.setPts(pts);
  }

  self.tick = function(ih)
  {
    self.growth += self.growthrate;
    if(ih.mousedown && Math.sqrt(Math.pow(ih.mousepos.x-ih.prevmousepos.x,2)+Math.pow(ih.mousepos.y-ih.prevmousepos.y,2)) > 10)
    {
      self.biasTowardVec(ih.mousepos.x-ih.prevmousepos.x,ih.mousepos.y-ih.prevmousepos.y);
      //self.biasTowardVec(0,0);
    }
  }

  var pts = [[0,0],[0,0]]; //just so I don't have to re-allocate
  self.draw = function(canv)
  {
    canv.context.strokeStyle = self.color;
    canv.context.lineWidth = 0.5;

    var step = 0;
    var tmppt;
    var i;
    for(i = 0; i <= self.growth; i+=self.drawres)
    {
      tmppt = spline.ptForT(i);
      pts[step%2] = [tmppt[0]+0.01,tmppt[1]+0.01];
      if(step > 0) drawLine(pts[0][0],pts[0][1],pts[1][0],pts[1][1],canv)
      step++;
    }
      i = self.growth;
      tmppt = spline.ptForT(i);
      pts[step%2] = [tmppt[0]+0.01,tmppt[1]+0.01];
      if(step > 0) drawLine(pts[0][0],pts[0][1],pts[1][0],pts[1][1],canv)
      step++;
  }

  function drawLine(ox,oy,ex,ey,canvas)
  {
    canvas.context.beginPath();
    canvas.context.moveTo(ox,oy);
    canvas.context.lineTo(ex,ey);
    canvas.context.stroke();
  }

}

