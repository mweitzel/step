function KeyPressOrderTest(){

}

KeyPressOrderTest.prototype.draw = function(ctx){

}

KeyPressOrderTest.prototype.update = function(){

  // press v
  if(Input.getKeyDown(86)){
    console.log("pressed  "+Core.lastUpdate + "\t" + Input.keyCodesDown[86])
  }
  if(Input.getKey(86)){
    console.log(" is down "+Core.lastUpdate + "\t" + Input.keyCodesDown[86])
  }
  if(Input.getKeyUp(86)){
    console.log("released "+Core.lastUpdate + "\t" + Input.keyCodesUp[86])
  }

}

Core.entities.push(new KeyPressOrderTest())
