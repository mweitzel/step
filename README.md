step
===========

A small JS game engine with a smaller API. It provides access to true fixed update calls that are aware of input.

core.js is where its at. It exports the key object `Core`, create with
```js
var core = new Core(window, canvasContext)
```

## core.physicsTimeStep

Frequency at which update will be called. Defaults to 1000/60

## core.entities

Array of game objects. Adding an object to this list will attempt to call its draw(context) and update() functions.

## core.start()

Call this once everything is loaded to get things moving. After it is called once, it acts as `core.play`

## core.pause

Prevent internal time propogation

## core.play

Continue internal time propogation


## Input

Input is accessed through `core.input`. All browser key events are avaiable in the correct update calls.

*Note: `keyCode` is deprecated in most browsers and will be dropped soon. Will switch soon to `keyboardEvent.code` and bump version number.*

## core.input.getKey(keyCode)

returns true if the Key of code `keyCode` was down at time of the current frame.

## core.input.getKeyDown(keyCode)

returns true if the Key of code keyCode was first depressed at time of the current frame (only one frame will see this)

## core.input.getKeyUp(keyCode)

returns true if the Key of code keyCode was released at time of the current frame (only one frame will see this)
