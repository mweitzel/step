turnt-sansa
===========

A simple JS game engine with an easy API. It provides access to true fixed update calls that are aware of input.

core.js is where its at. It creates the two key objects, **Core** and **Input**

**Core**

  **physicsTimeStep**
  
    Frequency update will be called. defaults at 1000/60
  
  **entities**
    
    Array of game objects. Adding an object to this list will attempt to call its draw(context) and update() functions.
  
  **start**
    
    Call this once everything is loaded to get things moving. After it is called once, it acts as 'play'
  
  **pause**
    
    Prevent internal time propogation
  
  **play**
    
    Continue internal time propogation


**Input** - Input is highly coupled with Core. It catches all browser key events and makes them avaiable to the right update calls.
  
  **getKey(**keyCode**)**
    
    returns true if the Key of code keyCode was down at time of the current frame.
  
  **getKeyDown(**keyCode**)**
    
    returns true if the Key of code keyCode was first depressed at time of the current frame (only one frame will see this)
  
  **getKeyUp(**keyCode**)**
    
    returns true if the Key of code keyCode was released at time of the current frame (only one frame will see this)

There are other variables and methods available, but I haven't made them private yet. It works best if you don't use them.
