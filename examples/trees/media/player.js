
Maths = {}

Maths.crossProd = function(a, b){
  return ((a.x*b.y) - (a.y*b.x))
}

Physics = {}

Physics.collide = function(collider, collidee){
  a = Physics.intersectionOf(collider.intersectionVector(), collidee.intersectionVector())
  if(!!a)
    collidee.addForce(collider.mass * collider.dx, collidee.y - collider.y)
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
  this.x = 20
  this.y = 20
  this.dx = 1
  this.dy = 0
  this.parent = {}
  this.lean = 0.13
  this.mass = 0.5
  this.isGrabbable = false

  man = this

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

  ctx.fillStyle = "#FF00cc"

  // _.each(this.dot, function(dot){
  //   ctx.fillRect(dot[0],dot[1],1,1)
  // })
  // var i = 800
  // while(i){
  //   var j = 60
  //   while(j){
  //     ctx.fillRect(i,j,1,1)
  //     // ctx.drawLinRect(i,j,1,1)
  //
  //     j--
  //   }
  //   i--
  // }


  ctx.fillStyle = "#FF00cc"
  ctx.fillRect(this.x-2,this.y-2,4,4)
  ctx.fillStyle = "#000000"

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
  if(this.y > 400 )
    this.y = 0

  this.tryToGrabATree()
}

Player.prototype.swingingUpdate = function(){
  this.x = (this.parent.x + Tree.swayForHeight(this.parent, this.parent.y - this.y)) || this.x
  // this.y += this.dy
  // this.dy *= 0.89
  // console.log(Tree.swayForHeight)
  if(Input.getKey(keys.left)){
    this.parent.addForce(this.mass * this.lean * -1)
  }
  if(Input.getKey(keys.right)){
    this.parent.addForce(this.mass * this.lean)
  }
  if(Input.getKey(keys.up)){
    // this.y -= 3
  }
  else if(this.isDodging()){
    if(Input.getKey(keys.left) || Input.getKey(keys.right))
      this.dy = -2// + 100 * this.parent.strain()
    else
      this.dy = -.05
    // console.log(this.dx)
    this.dx = this.parent.momentum * 2
    // console.log(this.dx)
    this.parent = {}
  }
}

Player.prototype.isDodging = function(){
  return Input.getKey(keys.dodge)
}

Player.prototype.tryToGrabATree = function(){
  if(this.isDodging())
    return false

  var trees = _.filter(Core.entities, function(grabbable){ return (grabbable.isGrabbable && !!Physics.collide(man, grabbable)) });
  tree = _.max(trees, function(tree){ return tree.height })
  if(!_.isNumber(tree))
    this.parent = tree
}

Player.prototype.treeUpdate = function(){

}


Player.prototype.respondToInput = function(){
  if(Input.getKey(keys.right)){
    this.dx += 0.005 * Core.physicsTimeStep
  }else if(Input.getKey(keys.left)){
    this.dx -= 0.005 * Core.physicsTimeStep
  }else{
    // this.dx *= 0.72
  }
}











