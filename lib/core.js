var Core = {
	physicsTimeStep: 1000/60,
	stats:{show:true},
	entities:[],
	draw: function() {
		this.context.clearRect(0, 0, 640, 480)

		for (var i=0; i < this.entities.length; i++) {
			this.entities[i].draw(this.context)
		}
	},
	step: function() {		
		for (var i=0; i < this.entities.length; i++) {
			this.entities[i].update()
		}	
		this.lastUpdate += this.physicsTimeStep
	},
	lastUniqueId: function(){
		return 0
	},
	uniqueId: function(){
		var a = Core.lastUniqueId()
		Core.lastUniqueId = function(){
			return a+1
		}
		return a + 1
	},
	update: function() {
		if(!Core.paused){
			var currentTime = new Date().getTime()
		}

		;(function preventExcessiveFrameBuildUp() {
			if( currentTime - Core.lastUpdate > 500){
				Core.lastUpdate = currentTime
			}
		})()

		;(function performAsManyFramesAsNecessary(){
			while(Core.lastUpdate < currentTime - Core.physicsTimeStep){
				Core.step()
				Core.stats.updateStats.update()
			}
		})()

		Core.draw()
		Core.stats.renderStats.update()
	
	},
	start: function() {
		
		;(function initiateStartTime() {
			if(Core.context = $('#viewport')[0].getContext("2d")){
				Core.startTime = new Date().getTime()
				Core.lastUpdate = Core.startTime
			}
		})()
		
		;(function createStats() {
      if(Core.stats.show){
  			Core.stats.renderStats = new Stats();
  			Core.stats.updateStats = new Stats();
  			document.body.appendChild(Core.stats.renderStats.domElement);
  			document.body.appendChild(Core.stats.updateStats.domElement);      
      }
      else{
  			Core.stats.renderStats = Core.stats.updateStats = {update:function(){}}
      }
		})()

		;(function define_onEachFrame() {
			var onEachFrame;
			if (window.webkitRequestAnimationFrame) {
			  onEachFrame = function(cb) {
			    (_cb = (function() { cb(); webkitRequestAnimationFrame(_cb); }))()
	 		  };
			} else if (window.mozRequestAnimationFrame) {
			  onEachFrame = function(cb) {
			    var _cb = function() { cb(); mozRequestAnimationFrame(_cb); }
			    _cb();
			  };
			} else {
			  onEachFrame = function(cb) {
			    setInterval(cb, 16)
			  }
			}

			window.onEachFrame = onEachFrame
		})()

		window.onEachFrame(function(){Core.update()})
		
		Core.start = Core.play
		// Core.start
		
	},
	paused:false,
	pause: function(){
		if(!this.paused){
			this.paused = true
		}
	},
	play: function(){
		if(this.paused){
			this.paused = false
		}
	},
}

var Input = {
	keyCodesDown:[],
	keyCodesUp:[],
	downAt:function(keyCode){
		return Input.keyCodesDown[keyCode] || 0
	},
	upAt:function(keyCode){
		return Input.keyCodesUp[keyCode] || 0
	},
	getKey:function(keyCode){									//frames are not backed up											//both keydown and keyup in same frame when backed up
		return ((Input.downAt(keyCode) > Input.upAt(keyCode)) && Input.downAt(keyCode) < Core.lastUpdate + Core.physicsTimeStep) || Input.getKeyDown(keyCode)
	},
	getKeyDown:function(keyCode){								//frames are not backed up
		return  (Input.downAt(keyCode) > Core.lastUpdate && Input.downAt(keyCode) < Core.lastUpdate + Core.physicsTimeStep)
	},
	getKeyUp:function(keyCode){									//frames are not backed up
		return (Input.upAt(keyCode) > Core.lastUpdate && Input.upAt(keyCode) < Core.lastUpdate + Core.physicsTimeStep)
	},
  downDuration:function(keyCode){
    return Math.max(0, Core.lastUpdate - Input.downAt(keyCode))
  }

}

$(document).keydown(function (event){
	if(!Input.getKey(event.keyCode)) //doesn't catch bs refires of the keypres..sssssssss!
		Input.keyCodesDown[event.keyCode] = event.timeStamp
})

$(document).keyup(function (event){
	Input.keyCodesUp[event.keyCode] = event.timeStamp
})

function GameObject(){ 
	this.id = Core.uniqueId()
} 
