
Maths = {}

//is really line length
Maths.vectorMagnitude = function(v){
  aSquared = (v.x0 - v.x1) * (v.x0 - v.x1)
  bSquared = (v.y0 - v.y1) * (v.y0 - v.y1)
  return Math.sqrt( aSquared + bSquared ) //c2 = a2 + b2 //magnitude of their vector.. just do that
}

Maths.scaledPoint = function(p, s){
  return {
    x:p.x*s,
    y:p.y*s
  }
}

Maths.pointAdd = function(p0, p1){
  return {
    x:p0.x+p1.x,
    y:p0.y+p1.y
  }
}

Maths.pointSubtract = function(p0, p1){
  return {
    x:p0.x-p1.x,
    y:p0.y-p1.y
  }
}

//Maths.vectorFromPoints = function(p0, p1){
//  return {
//    x0:p0.x,
//    y0:p0.y,
//    x1:p1.x,
//    y1:p1.y
//  }
//}

Maths.crossProd = function(a, b){
  return ((a.x*b.y) - (a.y*b.x))
}

Physics = {}

Physics.collide = function(collider, collidee){
  a = Physics.intersectionOf(collider.intersectionVector(), collidee.intersectionVector())
//  if(!!a)
//    collidee.addForce(collider.mass * collider.dx, collidee.y - collider.y)
  return a
}

Physics.intersectionOf = function(vectorA, vectorB){
  //http://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect
  o = {
    x:vectorB.x0 - vectorA.x0,
    y:vectorB.y0 - vectorA.y0
  }
  s = {
    x:vectorB.x1 - vectorB.x0,
    y:vectorB.y1 - vectorB.y0
  }
  r = {
    x:vectorA.x1 - vectorA.x0,
    y:vectorA.y1 - vectorA.y0
  }
  t = Maths.crossProd(o,s)/Maths.crossProd(r,s)
  u = Maths.crossProd(o,r)/Maths.crossProd(r,s)
  // t =  (q − p) × s / (r × s)
  // u = (q − p) × r / (r × s)
  var toReturn = false
  if( (u <= 1 && u >= 0 ) && (t <= 1 && t >= 0 ) ){
    toReturn = {
      x:vectorA.x0 + t*vectorA.x1,
      y:vectorA.y0 + t*vectorA.y1
    }  //p + t*r // or.. toReturn = q + r*s
    // console.log(toReturn)
  }
  // p + t r = q + u s

  return toReturn

}

function Player(){
  this.x = 200
  this.y = 200
  this.dx = 0
  this.dy = 0
  this.parent = {}
  this.lean = 0.13
  this.mass = 0.5
  this.isGrabbable = false

  this.dot = []

  var i = 800
  while(i){
    var j = 60
    while(j){
      this.dot.push([i,j])
      j--
    }
    i--
  }


}

Player.prototype.draw = function(ctx){




  my_gradient = ctx.createRadialGradient(this.x, this.y, 15, this.x, this.y, 250)
  my_gradient.addColorStop(0, 'rgba(0,0,0,0)');
  my_gradient.addColorStop(1, 'black');
  ctx.fillStyle = my_gradient
  ctx.fillRect(0,0,640,480)

  for (var i=0; i < Core.entities.length; i++) {
    current = Core.entities[i]
    vector = {
      x0:this.x,
      y0:this.y,
      x1:current.x,
      y1:current.y,
    }

    if(!_.isEqual(current, this)){// && Maths.vectorMagnitude(vector) < 100){
      ctx.beginPath()
      farMiddle = Maths.pointAdd(Maths.pointSubtract(current, this), current)
//    my_gradient = ctx.createLinearGradient(current.x, current.y, current.x, farMiddle.y);
//      my_gradient = ctx.createRadialGradient(this.x, this.y, 10, this.x, this.y, 1200)

//      my_gradient.addColorStop(0, "black");
//      my_gradient.addColorStop(1, 'rgba(0,0,0,0)');
//      ctx.fillStyle = my_gradient
//      ctx.strokeStyle = 'rgba(125,125,0,1)'
      ctx.fillStyle = 'rgba(0,0,0,1)'

      myLight = {x:this.x,y:this.y - 1}

      itsLeft = {x:current.leftX(), y:current.y}
      itsRight = {x:current.rightX(), y:current.y}


      directionVector = Maths.pointSubtract(itsLeft, myLight)
      scaledDirectionVector = Maths.scaledPoint(directionVector, 10000000)
      farLeft = Maths.pointAdd(scaledDirectionVector, itsLeft)

      directionVector = Maths.pointSubtract(itsRight, myLight)
      scaledDirectionVector = Maths.scaledPoint(directionVector, 10000000)
      farRight = Maths.pointAdd(scaledDirectionVector, itsRight)


//      ctx.moveTo(this.x, this.y)
//      ctx.lineTo(itsLeft.x,itsLeft.y)
//      ctx.lineTo(itsRight.x,itsRight.y)

      ctx.moveTo(itsLeft.x, itsLeft.y)
      ctx.lineTo(farLeft.x, farLeft.y)
//      ctx.lineTo(farLeft.x, farLeft.y)
      ctx.lineTo(farRight.x, farRight.y)
      ctx.lineTo(itsRight.x, itsRight.y)

//      ctx.moveTo(this.x,this.y)
//      ctx.lineTo(current.leftX(),current.y)
//      ctx.lineTo(current.rightX(),current.y)

      ctx.fill()
    }




     ctx.fillStyle = "#FF00cc"

    ctx.fillStyle = "#FF00cc"
    ctx.fillRect(this.x-2,this.y-2,4,4)
    ctx.fillStyle = "#000000"


  }



//  var my_gradient = ctx.createLinearGradient(this.x, this.y, this.x, 0);
//  my_gradient.addColorStop(0, "black");
//  my_gradient.addColorStop(1, "white");

//  ctx.globalAlpha = 0.2;


//  //ctx.beginPath();
//  ctx.strokeStyle = 'rgba(0,0,0,0)'
//  ctx.moveTo(0,0)
//  ctx.lineTo(this.x,this.y)
//  ctx.lineTo(300,0)
//  ctx.globalAlpha = 0.5
//  ctx.fillStyle = my_gradient;
//  ctx.fill()
//  //ctx.beginPath()
//  ctx.globalAlpha = 1
//  ctx.fillStyle = "#FFffff"
//  //ctx.fillRect(0, 0, this.x, this.y);
//
//  ctx.fillStyle = 'rgba(125,125,125,1)'



}

Player.prototype.update = function(){
  // if(Input.isDodging())
    // this.parent = {}

  if(this.isFlying())
    this.flyingUpdate()
  else
    this.swingingUpdate()
  // console.log(this.x)
}

Player.prototype.intersectionVector = function(){
  return {
    x0:this.x,
    y0:this.y,
    x1:this.x - this.dx,
    y1:this.y - this.dy
  }
}

Player.prototype.isFlying = function(){
  return _.isEqual(this.parent, {})// || Input.isDodging()
}

Player.prototype.flyingUpdate = function(){
  this.dy += 0.005*Core.physicsTimeStep
  this.dy *= 0.999

  this.respondToInput()

  this.x += this.dx
  this.y += this.dy

  if(this.x <  0 && this.dx < 0)
    this.x = 640
  if(this.x > 640 )
    this.x = 0
  if(this.y > 480 )
    this.y = 0

  this.tryToGrabAnything()
}

Player.prototype.swingingUpdate = function(){

  this.respondToInput()

  this.x += this.dx
  this.y = this.parent.y
  this.dy = 0

  if(this.x <  0 && this.dx < 0)
    this.x = 640
  if(this.x > 640 )
    this.x = 0
  if(this.y > 480 )
    this.y = 0


  if(this.isDodging()){
    //if(Input.getKey(keys.left) || Input.getKey(keys.right))
    this.dy = -4
    // console.log(this.dx)
    this.parent = {}
  }
  else if(this.x < this.parent.leftX() || this.x > this.parent.rightX()){
    this.parent = {}
  }

}

Player.prototype.isDodging = function(){
  return Input.getKey(keys.dodge)
}

Player.prototype.tryToGrabAnything = function(){
  if(this.isDodging())
    return false

  man = this
  var platforms = _.filter(Core.entities, function(grabbable){ return (grabbable.isGrabbable && !!Physics.collide(man, grabbable)) });
  myFloor = _.max(platforms, function(platform){ return platform.y })
  if(!_.isNumber(myFloor))
    this.parent = myFloor
}


Player.prototype.respondToInput = function(){
  if(Input.getKey(keys.right)){
    this.dx += 0.005 * Core.physicsTimeStep
  }else if(Input.getKey(keys.left)){
    this.dx -= 0.005 * Core.physicsTimeStep
  }else{
    // this.dx *= 0.72
  }
    this.dx *= 0.95

}











