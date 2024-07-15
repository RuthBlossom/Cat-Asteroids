(function() {
    // Namespace for Asteroids game to avoid global variable pollution
    window.Asteroids = (window.Asteroids) ? window.Asteroids : {};

    // Utility module for the Asteroids game
    Asteroids.Util = {};

    // Add an `inherits` method to Function prototype for implementing inheritance
    Function.prototype.inherits = function(ParentClass) {
        // Define a surrogate function
        var Surrogate = function() {};
        // Set the prototype of the surrogate function to the prototype of the parent class
        Surrogate.prototype = ParentClass.prototype;
        // Set the prototype of the current function to an instance of the surrogate function
        this.prototype = new Surrogate();
    };

    // Utility function to generate a random vector of a given length
    Asteroids.Util.randomVec = function(length) {
        result = [];
        // Generate a vector with random values
        for (var i = 0; i < length; i++) {
            // Each component is a random number between -3 and 5
            result.push((Math.random() * 8) - 3);
        }
        return result;
    };
})();
