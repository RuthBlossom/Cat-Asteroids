// Define the inherits function for Function.prototype
Function.prototype.inherits = function(ParentClass){
    var Surrogate = function(){};
    Surrogate.prototype = ParentClass.prototype;
    this.prototype = new Surrogate();
};

// Define MovingObject and its prototype method
var MovingObject = function(){};

MovingObject.prototype.move = function(){
    return true;
};

// Define Asteroid and inherit from MovingObject
var Asteroid = function(){};

Asteroid.inherits(MovingObject);

// Now Asteroid inherits the move method from MovingObject
var asteroid = new Asteroid();
console.log(asteroid.move()); // Output: true

