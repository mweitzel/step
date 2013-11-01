function Rect() {
  this.x = Math.floor(Math.random() * (640 - 30));;
  this.y = Math.floor(Math.random() * (480 - 30));;
  this.w = Math.floor(Math.random() * (30));;
  this.h = Math.floor(Math.random() * (30));;
  this.rand = Math.random();
  this.velocity = Math.random() > 0.5 ? -1 : 1;
};

Rect.prototype.draw = function(context) {
  context.fillRect(this.x, this.y, this.w, this.h);
};

Rect.prototype.update = function() {
  if (this.y < 0) {
    this.velocity = 1*this.rand*this.rand;
  } else if (this.y > 450) {
    this.velocity = -1*this.rand*this.rand;
  }

  
  
  this.y += this.velocity*Core.physicsTimeStep*0.1;
};
