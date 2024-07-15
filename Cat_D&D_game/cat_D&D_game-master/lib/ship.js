(function() {
    // Namespace for Asteroids game to avoid global variable pollution
    window.Asteroids = (window.Asteroids) ? window.Asteroids : {};

    // Constructor for the Ship class
    var Ship = function(pos, game) {
        this.startingLives = 8; // Initial lives for the ship
        // Call the constructor of the parent class (movingObject) with ship-specific properties
        Asteroids.movingObject.call(this, {
            color: Ship.COLOR,
            radius: Ship.RADIUS,
            vel: [0, 0], // Initial velocity
            pos: pos, // Initial position
            game: game, // Reference to the game
            direction: 90, // Initial direction (in degrees)
            speed: 0, // Initial speed
            lives: this.startingLives, // Set initial lives
            exploded: 0 // Explosion state
        });
    };

    // Set up inheritance from the movingObject class
    Ship.inherits(Asteroids.movingObject);

    // Set default color for the Ship
    Ship.COLOR = "#F778A1"; // Pink

    // Set default radius for the Ship
    Ship.RADIUS = 25;

    // Conversion factor from degrees to radians
    Ship.TO_RADIANS = Math.PI / 180;

    // Method to draw the Ship on the canvas
    Ship.prototype.draw = function(ctx) {
        var pos = this.pos; // Get the position of the ship
        var base_image = new Image(); // Create a new image object
        if (this.exploded > 0) {
            base_image.src = './images/explosion.png'; // Display explosion image if the ship is exploded
            this.exploded -= 1; // Decrease explosion timer
        } else {
            base_image.src = './images/cat_sprite_large.png'; // Display ship image
        }

        // Set the desired size for the image
        var newWidth = 100; // Desired width
        var newHeight = 100; // Desired height

        var ship = this;
        var direction = this.direction;
        ctx.save(); // Save the current canvas state
        ctx.translate(pos[0], pos[1]); // Move the canvas origin to the ship's position
        ctx.rotate(Math.abs(direction) * Math.PI / 180); // Rotate the canvas to the ship's direction
        // Draw the image at the new size
        ctx.drawImage(base_image, -(newWidth / 2), -(newHeight / 2), newWidth, newHeight);
        ctx.restore(); // Restore the canvas state
    };

    // Method to handle relocation of the ship after a collision
    Ship.prototype.relocate = function() {
        if (this.exploded < 1) {
            this.lives -= 1; // Decrease lives
            $('#number-of-lives').html(this.lives); // Update lives on the UI
            if (this.lives == 0) {
                this.game.gameOver(); // End the game if no lives left
            }
            this.vel = [0, 0]; // Reset velocity
            this.exploded = 10; // Set explosion timer
        }
    };

    // Method to handle collisions with other objects
    Ship.prototype.collideWith = function(otherObject) {
        if (otherObject instanceof Asteroids.Asteroid) {
            this.relocate(); // Relocate the ship if it collides with an asteroid
            this.game.remove(otherObject); // Remove the asteroid from the game
        }
    };

    // Method to update the ship's speed and direction based on user input
    Ship.prototype.power = function(speed, direction) {
        this.speed += speed; // Adjust speed
        if (this.speed < 0) {
            this.speed = 0; // Prevent negative speed
        }
        if (this.speed > 15) {
            this.speed = 15; // Cap the speed at 15
        }
        this.direction += direction; // Adjust direction
        if (this.direction > 360) {
            this.direction -= 360; // Wrap direction around if it exceeds 360 degrees
        }
        if (this.direction < 0) {
            this.direction += 360; // Wrap direction around if it goes below 0 degrees
        }
        var y = Math.sin(Math.abs(this.direction) * Math.PI / 180); // Calculate the y component of the velocity
        var x = Math.cos(Math.abs(this.direction) * Math.PI / 180); // Calculate the x component of the velocity
        this.vel[0] = x * this.speed; // Set the x component of the velocity
        this.vel[1] = y * this.speed; // Set the y component of the velocity
    };

    // Method to fire a bullet
    Ship.prototype.fireBullet = function() {
        var bullet = new Asteroids.Bullet(this.pos, this.vel.slice(0), this.direction, this.game); // Create a new bullet
        this.game.bullets.push(bullet); // Add the bullet to the game's bullet array
    };

    // Method to reset the ship's state
    Ship.prototype.reset = function() {
        this.lives = this.startingLives; // Reset lives
        $('#number-of-lives').html(this.lives); // Update lives on the UI
        this.pos = this.game.randomPosition(); // Randomize position
        this.vel = [0, 0]; // Reset velocity
        this.exploded = 0; // Reset explosion state
        this.speed = 0; // Reset speed
        this.direction = 90; // Reset direction
    };

    // Expose the Ship constructor to the Asteroids namespace
    window.Asteroids.Ship = Ship;

})();




