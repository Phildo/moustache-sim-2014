var Stage = function()
{
  var width = 640;
  var height = 320;

  this.drawCanv = new Canv(width,height);
  this.drawCanv.context.fillStyle = "#000000";
  this.drawCanv.context.strokeStyle = "#000000";
  this.drawCanv.context.font = "12px vg_font";
  this.dispCanv = new Canv(width,height);
  this.dispCanv.canvas.style.border = "1px solid black";

  this.draw = function()
  {
    this.drawCanv.blitTo(this.dispCanv);
  };

  this.clear = function()
  {
    this.drawCanv.clear();
    this.dispCanv.clear();
  };

  document.getElementById("stage_container").insertBefore(this.dispCanv.canvas, document.getElementById("shadow"));
};

