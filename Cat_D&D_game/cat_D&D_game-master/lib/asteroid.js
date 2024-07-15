(function() {
    // Namespace for Asteroids game to avoid global variable pollution
    window.Asteroids = (window.Asteroids) ? window.Asteroids : {};

    // Constructor for the Asteroid object
    var Asteroid = function(pos, game) {
        // Call the constructor of the parent class (movingObject) with the properties of the Asteroid
        Asteroids.movingObject.call(this, {
            color: Asteroid.COLOR,
            radius: Asteroid.RADIUS,
            vel: Asteroids.Util.randomVec(2), // Random velocity with a maximum speed of 2
            pos: pos,
            game: game,
            lives: 2, // Number of lives the asteroid has
            exploded: false, // Whether the asteroid is in an exploded state
            protection: 0 // Protection counter for explosion
        });
    };

    // Set up inheritance from the movingObject class
    Asteroid.inherits(Asteroids.movingObject);

    // Set default color for the Asteroid
    Asteroid.COLOR = "pink";

    // Set default radius for the Asteroid
    Asteroid.RADIUS = 18;

    // Method to draw the Asteroid on the canvas
    Asteroid.prototype.draw = function(ctx) {
        var pos = this.pos;
        base_image = new Image();

        // Check if the asteroid is exploded
        if (this.exploded) {
            base_image.src = './images/explosion.png'; // Use explosion image
            this.protection -= 1; // Decrease protection counter
            // If protection counter is less than 1, reset explosion state
            if (this.protection < 1) {
                this.exploded = false;
                // If no lives are left, remove the asteroid and add a point
                if (this.lives === 0) {
                    this.game.remove(this);
                    this.game.addPoint();
                }
            }
        } else if (this.lives > 1) {
            base_image.src = './images/mario_small.png'; // Use Mario image if lives are more than 1
        } else {
            base_image.src = './images/luigi_small.png'; // Use Luigi image if only 1 life is left
        }

        // Draw the image on the canvas, adjusting for the position
        ctx.drawImage(base_image, pos[0] - 17, pos[1] - 18);
    };

    // Method to handle collision with other objects
    Asteroid.prototype.collideWith = function(otherObject) {
        // Check if the other object is a Ship
        if (otherObject instanceof Asteroids.Ship) {
            this.game.remove(this); // Remove the asteroid
            otherObject.relocate(); // Relocate the ship
        } else if (otherObject instanceof Asteroids.Bullet) {
            // Check if the asteroid is not protected
            if (this.protection < 1) {
                this.game.remove(otherObject); // Remove the bullet
                this.exploded = true; // Set the asteroid to exploded state
                this.protection = 5; // Set protection counter
                this.lives -= 1; // Decrease the number of lives
                // Increase the velocity of the asteroid randomly
                this.vel[0] += (Math.random() * 8);
                this.vel[1] += (Math.random() * 8);
            }
        }
    };

    // Expose the Asteroid constructor to the Asteroids namespace
    window.Asteroids.Asteroid = Asteroid;
})();
