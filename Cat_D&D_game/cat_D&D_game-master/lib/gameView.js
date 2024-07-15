(function() {
    // Namespace for Asteroids game to avoid global variable pollution
    window.Asteroids = (window.Asteroids) ? window.Asteroids : {};

    // Constructor for the GameView object
    Asteroids.GameView = function(canvas) {
        this.game = new Asteroids.Game(); // Create a new Game object
        this.ctx = canvas.getContext("2d"); // Get the 2D drawing context from the canvas
        this.gamePaused = false; // Initialize the gamePaused flag
    };

    // Start the game loop
    Asteroids.GameView.prototype.start = function() {
        var gameview = this; // Store reference to this for use inside the interval function
        this.gameLoop = setInterval(function() {
            gameview.bindKeyHandlers(); // Bind key handlers for controlling the game
            gameview.game.step(); // Advance the game state
            if (gameview.game.stopGame) { // Check if the game is over
                gameview.endGame();
            }
            gameview.game.draw(gameview.ctx); // Draw the game state
        }, 50); // Run the loop every 50 milliseconds
    };

    // Pause and unpause the game
    Asteroids.GameView.prototype.pauseGame = function() {
        var gameview = this; // Store reference to this for use inside the interval function
        if (!this.gamePaused) { // If the game is not currently paused
            this.gameLoop = clearInterval(this.gameLoop); // Stop the game loop
            this.gamePaused = true; // Set the gamePaused flag to true
            this.pauseLoop = setInterval(function() {
                gameview.bindPause(); // Bind the pause key handler
            }, 50); // Run the loop every 50 milliseconds
        } else { // If the game is currently paused
            this.pauseLoop = clearInterval(this.pauseLoop); // Stop the pause loop
            this.gameLoop = setInterval(function() {
                gameview.bindKeyHandlers(); // Bind key handlers for controlling the game
                gameview.game.step(); // Advance the game state
                if (gameview.game.stopGame) { // Check if the game is over
                    gameview.endGame();
                }
                gameview.game.draw(gameview.ctx); // Draw the game state
            }, 50); // Run the loop every 50 milliseconds
            this.gamePaused = false; // Set the gamePaused flag to false
        }
    };

    // End the game
    Asteroids.GameView.prototype.endGame = function() {
        this.game.draw(this.ctx); // Draw the final game state
        this.gameLoop = clearInterval(this.gameLoop); // Stop the game loop
    };

    // Bind the pause key (U key) to pause/unpause the game
    Asteroids.GameView.prototype.bindPause = function() {
        if (key.isPressed(85)) { // If the U key is pressed
            this.pauseGame();
        }
    };

    // Bind key handlers for controlling the ship and firing bullets
    Asteroids.GameView.prototype.bindKeyHandlers = function() {
        var speed = 0; // Initialize speed variable
        var direction = 0; // Initialize direction variable
        if (key.isPressed(32)) { // If the spacebar is pressed
            if (this.blockBullets == false) { // If bullets are not blocked
                this.game.ship.fireBullet(); // Fire a bullet from the ship
                this.blockBullets = true; // Block bullets
            }
        } else {
            this.blockBullets = false; // Unblock bullets when spacebar is released
        }
        if (key.isPressed(37)) { // If the left arrow key is pressed
            direction -= 10; // Decrease direction (rotate left)
        }
        if (key.isPressed(38)) { // If the up arrow key is pressed
            speed += 0.2; // Increase speed (move forward)
        }
        if (key.isPressed(39)) { // If the right arrow key is pressed
            direction += 10; // Increase direction (rotate right)
        }
        if (key.isPressed(40)) { // If the down arrow key is pressed
            speed -= 0.6; // Decrease speed (move backward)
        }
        this.game.ship.power(speed, direction); // Apply speed and direction to the ship
        if (key.isPressed(80)) { // If the P key is pressed
            this.pauseGame(); // Pause/unpause the game
        }
    };
})();
