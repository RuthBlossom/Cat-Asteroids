(function() {
    // Namespace for Asteroids game to avoid global variable pollution
    window.Asteroids = (window.Asteroids) ? window.Asteroids : {};

    // Constructor for the Bullet object
    var Bullet = function(pos, vel, dir, game) {
        // Check if the velocity is zero in both directions
        if (vel[0] === 0 && vel[1] === 0) {
            // Calculate the x and y components of the velocity based on the direction
            var y = Math.sin(Math.abs(dir) * Math.PI / 180); // Convert direction to radians and find sine
            var x = Math.cos(Math.abs(dir) * Math.PI / 180); // Convert direction to radians and find cosine
            vel = [x * 10, y * 10]; // Set velocity magnitude to 10
        } else {
            // Scale the velocity by a factor of 10 if it's not zero
            vel = [vel[0] * 10, vel[1] * 10];
        }
        // Call the constructor of the parent class (movingObject) with the properties of the Bullet
        Asteroids.movingObject.call(this, {
            color: Bullet.COLOR,
            radius: Bullet.RADIUS,
            vel: vel,
            pos: pos,
            game: game
        });
    };

    // Set up inheritance from the movingObject class
    Bullet.inherits(Asteroids.movingObject);

    // Set default color for the Bullet
    Bullet.COLOR = "#FFA500"; // Orange

    // Set default radius for the Bullet
    Bullet.RADIUS = 4; // Size of the fireball

    // Method to create a gradient for the Bullet's appearance
    Bullet.prototype.createGradient = function() {
        // Create a radial gradient centered at the Bullet's position
        this.gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.radius);
        // Add color stops to the gradient
        this.gradient.addColorStop(0, 'rgba(255, 165, 0, 1)'); // Orange
        this.gradient.addColorStop(0.5, 'rgba(255, 140, 0, 0.7)'); // Darker orange
        this.gradient.addColorStop(1, 'rgba(255, 69, 0, 0)'); // Transparent red
    };

    // Method to handle collision with other objects
    Bullet.prototype.collideWith = function(otherObject) {
        // Check if the other object is an instance of Asteroid
        if (otherObject instanceof Asteroids.Asteroid) {
            this.game.remove(this); // Remove the Bullet from the game
            this.game.remove(otherObject); // Remove the Asteroid from the game
            this.game.addPoint(); // Add a point to the game's score
        }
    };

    // Bullets are not wrappable (they disappear at the edge of the screen)
    Bullet.prototype.isWrappable = false;

    // Expose the Bullet constructor to the Asteroids namespace
    window.Asteroids.Bullet = Bullet;
})();
