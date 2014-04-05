var Game = function()
{
  var stage = new Stage();
  var scenes = [new NullScene(this, stage.drawCanv), new LoadingScene(this, stage.drawCanv), new GamePlayScene(this, stage.drawCanv)];
  var currentScene = 0;

  this.begin = function()
  {
    this.nextScene();
    tick();
  };

  var tick = function()
  {
    requestAnimFrame(tick,stage.dispCanv.canvas);
    stage.clear();
    scenes[currentScene].tick();
    scenes[currentScene].draw();
    stage.draw(); //blits from offscreen canvas to on screen one
  };

  this.nextScene = function()
  {
    scenes[currentScene].cleanup();
    currentScene++;
    scenes[currentScene].ready();
  };
};

