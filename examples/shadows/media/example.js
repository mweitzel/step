(function(){

keys = {
  left:37,
  up:38,
  right:39,
  "v":86,
  dodge:86
}


var i = 50
while(i--)Core.entities.push(new Ground())


a = new Player()
Core.entities.push(a)

Core.start()

})()
