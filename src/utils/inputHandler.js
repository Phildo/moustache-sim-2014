var InputHandler = function(canv)
{
  var self = this;

  self.up    = false;
  self.left  = false;
  self.right = false;
  self.down  = false;

  self.mousedown = false;
  self.mousepos = {"x":0,"y":0};
  self.prevmousepos = {"x":0,"y":0};

  function downKey(e)
  {
    switch(e.keyCode)
    {
      case 87:
        self.up = true;
        break;
      case 65:
        self.left = true;
        break;
      case 68:
        self.right = true;
        break;
      case 83:
        self.down = true;
        break;
    }
  };

  function upKey(e)
  {
    switch(e.keyCode)
    {
      case 87:
        self.up = false;
        break;
      case 65:
        self.left = false;
        break;
      case 68:
        self.right = false;
        break;
      case 83:
        self.down = false;
        break;
    }
  };

  function downMouse(e)
  {
    self.mousedown = true;
  }

  function upMouse(e)
  {
    self.mousedown = false;
  }

  function moveMouse(e)
  {
    var x;
    var y;
    if (e.pageX || e.pageY)
    { 
      x = e.pageX;
      y = e.pageY;
    }
    else { 
      x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
      y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
    } 
    var c = document.getElementById('stage_container');
    x -= c.offsetLeft;
    y -= c.offsetTop;

    self.prevmousepos.x = self.mousepos.x;
    self.prevmousepos.y = self.mousepos.y;
    self.mousepos.x = x;
    self.mousepos.y = y;
  }

  document.addEventListener('keydown', downKey, false);
  document.addEventListener('keyup',   upKey,   false);
  document.addEventListener('mousedown', downMouse, false);
  document.addEventListener('mouseup', upMouse, false);
  document.addEventListener('mousemove', moveMouse, false);
};
