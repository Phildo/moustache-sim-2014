var GamePlayScene = function(game, canv)
{
  var self = this;

  var ih;
  var mo;

  self.ready = function()
  {
    ih = new InputHandler();
    mo = new Moustache();
  };

  self.tick = function()
  {
    mo.tick();
  };

  self.draw = function()
  {
    mo.draw(canv);
  };

  self.cleanup = function()
  {
  };
};

