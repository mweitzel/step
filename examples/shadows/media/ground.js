function Ground(){
	this.x = Math.random() * 640 //20
	this.y = Math.random() * 480 //10
	this.width = 50
	this.isGrabbable = true
}

Ground.prototype.draw = function(ctx){

  ctx.beginPath()

	ctx.strokeStyle = "#000000"

 	ctx.moveTo(this.leftX(),this.y)
 	ctx.lineTo(this.rightX(),this.y)

  ctx.stroke()	
}

Ground.prototype.leftX = function(){
  return this.x - ( 0.5 * this.width )
}

Ground.prototype.rightX = function(){
  return this.x + ( 0.5 * this.width )
}

Ground.prototype.update = function(){


}

Ground.prototype.intersectionVector = function(){
	return {
		x0:this.leftX(),
		y0:this.y,
		x1:this.rightX(),
		y1:this.y
	}
}
