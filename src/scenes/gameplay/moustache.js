var Moustache = function()
{
  var self = this;

  var hairs = [];
  for(var i = 0; i < 1000; i++)
  {
    var h = new Hair();
    h.randomizeAroundOrigin([Math.random()*320+160,Math.random()*50+125],100);
    hairs[i] = h;
  }
  
  self.tick = function(ih)
  {
    for(var i = 0; i < hairs.length; i++)
      hairs[i].tick(ih);
  }

  self.draw = function(canv)
  {
    for(var i = 0; i < hairs.length; i++)
      hairs[i].draw(canv);
  }
}

