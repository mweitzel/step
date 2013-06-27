function Tree(settings) {
	
	this.isGrabbable = true
	this.x = 620 * Math.random() + 10
	this.y = 400// + Math.random()*40
	this.height = Math.random()*200
	this.branches = []
	numberOfBranches = this.height - Math.random()*this.height * 0.5
	for(var i = 0; i < numberOfBranches; i++){
		var branch = {}
		branch.length = (Math.random() * (numberOfBranches - i)) * (Math.random() - 0.5)
		branch.height = i 
		this.branches.push(branch)
	}
	this.momentum = 0.0
	this.sway = 0
	
	this.rigidity = 0.01//* Math.random()*2;
	this.spring = 10;
	this.lastForceHeight = 0
	
	_.extend(this, settings)
}

Tree.prototype.draw = function(ctx) { 
	ctx.beginPath()

	if(this.sway == 0){
		ctx.moveTo(this.x-1.0,this.y);
		ctx.lineTo(this.x, this.y - this.height*0.6);

		ctx.moveTo(this.x,this.y);
		ctx.lineTo(this.x, this.y - this.height);

		ctx.moveTo(this.x+1.0,this.y);
		ctx.lineTo(this.x, this.y - this.height*0.3);
	}
	else{
		ctx.moveTo(this.x,this.y);
		ctx.quadraticCurveTo(this.x + this.sway * 0.1, this.y - this.height * 0.7 , this.x+this.sway,this.y-(this.height-(this.sway)*0.01));
	}

	var tree = this
	;(function drawBranches(){
		_.each(tree.branches, function(branch){
			relativeSway = Tree.swayForHeight(tree, branch.height)
			ctx.moveTo(tree.x+relativeSway, tree.y - branch.height + Tree.yDiff(relativeSway, branch.height))
			ctx.lineTo(tree.x+relativeSway + branch.length, tree.y - branch.height + 2 + Tree.yDiff(relativeSway, branch.height+2))
		})	
	})()

	ctx.stroke()
}

Tree.yDiff = function(sway, height){
	return 0// Math.abs(0/2* sway )/// height  )
}

Tree.swayForHeight = function(tree, height){
	return(((height/tree.height) *(height/tree.height) *(height/tree.height) * tree.sway)+((height/tree.height) * (height/tree.height) * tree.sway))/2
}

Tree.prototype.update = function() {
	this.momentum = this.momentum - (this.strain()*Core.physicsTimeStep)
	this.sway += this.momentum
	this.sway = this.dampen(this.sway)
	this.tryToBreak()
	// jitter
	this.x += 0.001 * (0.5 - Math.random())
	this.momentum += (0.5 -Math.random()) * 0.0135
}

Tree.prototype.intersectionVector = function(){
	return {
		x0:this.x,
		y0:this.y,
		x1:this.x + this.sway,
		y1:this.y-(this.height-(this.sway*this.sway)*0.001)
	}
}

Tree.prototype.dampen = function(sway){
	if(Math.abs(sway) < 10/this.height)
		return 0
	else
		return (1 - this.rigidity/1) * sway 
}

Tree.prototype.strain = function(){
	return (this.sway/this.height)* this.rigidity
}

Tree.prototype.addForce = function(force, height){
	height = height || this.height/2
	this.lastForceAdded = height
	this.momentum += force * (height/(this.height*this.rigidity))/100
	
}

Tree.prototype.tryToBreak = function(){
	if(Math.abs(this.strain()) > this.rigidity)
		this.breakAt(this.lastForceAdded/2)
}

Tree.prototype.breakAt = function(height){

	if(_.isEqual(this, man.parent)){
	  // man.dy = 0
	  man.dx = man.dx * 0.75
	  man.parent = {}
	  // height = height || 0
	}

	this.rigidity = this.rigidity * (this.height/height)
	this.rigidity = this.rigidity

	this.height = height

	flungBranches = _.filter(this.branches, function(branch){ return branch.height > height})
	// console.log(flungBranches)
	tree = this
	_.each(flungBranches, function(branch){
		toAdd = new Branch({
			x:tree.x+(tree.sway * branch.height/tree.height)/5,
			dx:tree.sway*Math.random() - (0.5 * tree.sway),
			dy:tree.height * Math.random()- (0.5 * tree.height),
			ds:Math.random() - 0.5,
			length:branch.length,
			isGrabbable:false,
			y:tree.y-branch.height,
			scheduledDeletion:Core.lastUpdate + 5000 * Math.random() * Math.random()
		})
		Core.entities.push(toAdd)
	})
	// make trunk too..
	
	this.branches = _.filter(this.branches, function(branch){ return branch.height < height})

	this.momentum = 0
	this.sway = this.sway * 2 / 5

}

function Branch(settings) {
	_.extend(this, settings)
}

Branch.prototype.draw = function(ctx) {
	ctx.beginPath()
	spin = 0.005
	line = [this.length*Math.cos(spin*this.ds*Core.lastUpdate),this.length*Math.sin(spin*this.ds*Core.lastUpdate)]
	// ctx.moveTo(this.x-this.length/2, this.y)
	// ctx.lineTo(this.x+this.length/2, this.y)
	ctx.moveTo(this.x-line[0], this.y-line[1])
	ctx.lineTo(this.x+line[0], this.y+line[1])
	ctx.stroke()
};

Branch.prototype.update = function() {
	this.x += 0.001 * this.dx * Core.physicsTimeStep
	this.y += 0.001 * this.dy * Core.physicsTimeStep
	this.deleteIfScheduled()
}

Branch.prototype.deleteIfScheduled = function() {
	if(this.scheduledDeletion < Core.lastUpdate){
		Core.entities = _.without(Core.entities, this)
		delete this
	}
}
