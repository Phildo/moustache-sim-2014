var InputHandler = function()
{
  var self = this;

  self.up    = false;
  self.left  = false;
  self.right = false;
  self.down  = false;

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

  document.addEventListener('keydown', downKey, false);
  document.addEventListener('keyup',   upKey,   false);
};
