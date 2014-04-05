var LoadingScene = function(game, canv)
{
  var pad;
  var barw;
  var progress;

  var numimages = 1;
  var imagesloaded = 1;
  var images = [];

  var imageLoaded = function()
  {
    imagesloaded++;
  };

  this.ready = function()
  {
    pad = 20;
    barw = (canv.canvas.width-(2*pad));
    progress = 0;
    //canv.context.fillStyle = "#000000";
    //canv.context.font = "20px vg_font";
    //canv.context.fillText(".",0,0);// funky way to encourage the custom font to load

    for(var i = 0; i < numimages; i++)
    {
      images[i] = new Image();
      images[i].onload = imageLoaded; 
    }
    /*
    images[0].src = "assets/man.png";
    images[1].src = "assets/bubble.png";
    images[2].src = "assets/button.png";
    images[3].src = "assets/litbutton.png";
    images[4].src = "assets/1.png";
    images[5].src = "assets/2.png";
    images[6].src = "assets/3.png";
    images[7].src = "assets/4.png";
    images[8].src = "assets/5.png";
    images[9].src = "assets/6.png";
    images[10].src = "assets/7.png";
    images[11].src = "assets/8.png";
    images[12].src = "assets/9.png";
    images[13].src = "assets/angry.png";
    images[14].src = "assets/fine.png";
    images[15].src = "assets/happy.png";
    */
  };

  this.tick = function()
  {
    if(progress <= imagesloaded/numimages) progress += 0.01;
    if(progress >= 1.0) game.nextScene();
  };

  this.draw = function()
  {
    canv.context.fillRect(pad,canv.canvas.height/2,progress*barw,1);
    canv.context.strokeRect(pad-1,(canv.canvas.height/2)-1,barw+2,3);
  };

  this.cleanup = function()
  {
    progress = 0;
    imagesloaded = 0;
    images = [];//just used them to cache assets in browser; let garbage collector handle 'em.
    canv.context.fillStyle = "#FFFFFF";
    canv.context.fillRect(0,0,canv.canvas.width,canv.canvas.height);
  };
};
