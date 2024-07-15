(function() {
    // Namespace for Asteroids game to avoid global variable pollution
    window.Asteroids = (window.Asteroids) ? window.Asteroids : {};

    // Constructor for the movingObject class
    Asteroids.movingObject = function(obj) {
        // Assign all properties from the obj parameter to the movingObject instance
        for (property in obj) {
            this[property] = obj[property];
        }
    };

    // Method to draw the movingObject on the canvas
    Asteroids.movingObject.prototype.draw = function(ctx) {
        ctx.beginPath(); // Begin a new path
        // Draw a circle at the object's position with its radius
        ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color; // Set the fill color to the object's color
        ctx.fill(); // Fill the path
    };

    // Method to check if this object is collided with another object
    Asteroids.movingObject.prototype.isCollidedWith = function(otherObject) {
        // Calculate the squared distance between the centers of the two objects
        var distance = Math.pow(otherObject.pos[0] - this.pos[0], 2) +
          Math.pow(this.pos[1] - otherObject.pos[1], 2);
        // Check if the squared distance is less than or equal to the squared sum of the radii
        return distance <= Math.pow(this.radius + otherObject.radius, 2);
    };

    // Method to move the object
    Asteroids.movingObject.prototype.move = function() {
        // Update the position by adding the velocity components
        this.pos[0] += this.vel[0];
        this.pos[1] += this.vel[1];
        // Check if the object is out of bounds and not wrappable
        if (this.isWrappable === false && this.game.isOutofBounds(this.pos)) {
            this.game.remove(this); // Remove the object from the game if it's out of bounds
        } else {
            // Wrap the position around the edges of the game area
            this.pos = this.game.wrap(this.pos);
        }
    };

    // Empty method for handling collisions with other objects (to be overridden)
    Asteroids.movingObject.prototype.collideWith = function(otherObject) {}

    // Property indicating whether the object can wrap around the edges of the game area
    Asteroids.movingObject.prototype.isWrappable = true;
})();
