Core.addRect = function() {
	Core.entities.push(new Rect());
};


var i = 400;
while (i--) Core.addRect();


keys = {
	left:37,
	up:38,
	right:39,
	"v":86,
	dodge:86
}

Core.start()

