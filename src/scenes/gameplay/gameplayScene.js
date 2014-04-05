var GamePlayScene = function(game, canv)
{
  var self = this;

  var ih;
  var tickables;
  var drawables;

  self.ready = function()
  {
    ih = new InputHandler();
    tickables = [];
    drawables = [];

  };

  self.tick = function()
  {
    for(var i = 0; i < tickables.length; i++)
      tickables[i].tick(ih);
  };

  self.draw = function()
  {
    for(var i = 0; i < drawables.length; i++)
      drawables[i].draw(canv);
  };

  self.cleanup = function()
  {
  };

  self.wasDefeated = function(room)
  {
    console.log("Room defeated");
  }

  self.registerEntity = function(entity)
  {
    if(entity.tickable) tickables.push(entity);
    if(entity.drawable) drawables.push(entity);
  }

  self.unregisterEntity = function(entity)
  {
    if(entity.tickable) tickables.splice(tickables.indexOf(entity),1);
    if(entity.drawable) drawables.splice(drawables.indexOf(entity),1);
  }
};

