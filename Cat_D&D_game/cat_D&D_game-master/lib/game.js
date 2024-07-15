(function() {
    // Namespace for Asteroids game to avoid global variable pollution
    window.Asteroids = (window.Asteroids) ? window.Asteroids : {};

    // Constructor for the Game object
    var Game = function() {
        var shipPos = Game.randomPosition(); // Generate a random position for the ship
        this.ship = new Asteroids.Ship(shipPos, this); // Create a new Ship object
        this.asteroids = []; // Initialize the asteroids array
        this.addAsteroids(); // Add initial asteroids to the game
        this.bullets = []; // Initialize the bullets array
        this.points = 0; // Initialize the points
        this.stopGame = false; // Flag to control game state
    };

    // Game dimensions
    Game.DIM_X = 900;
    Game.DIM_Y = 550;
    Game.NUM_ASTEROIDS = 4; // Initial number of asteroids

    // Generate a random position within the game dimensions
    Game.randomPosition = function() {
        var x = Math.random() * Game.DIM_X;
        var y = Math.random() * Game.DIM_Y;
        return [x, y];
    };

    // Wrap position around the game dimensions
    Game.prototype.wrap = function(pos) {
        var x = pos[0];
        var y = pos[1];
        x = (x > Game.DIM_X) ? 0 : x;
        x = (x < 0) ? Game.DIM_X : x;
        y = (y > Game.DIM_Y) ? 0 : y;
        y = (y < 0) ? Game.DIM_Y : y;
        return [x, y];
    };

    // Add initial asteroids to the game
    Game.prototype.addAsteroids = function() {
        for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
            var pos = Game.randomPosition();
            this.asteroids.push(new Asteroids.Asteroid(pos, this));
        }
    };

    // Draw all game objects on the canvas
    Game.prototype.draw = function(ctx) {
        ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y); // Clear the canvas
        this.allObjects().forEach(function(object) {
            object.draw(ctx);
        });
        if (this.asteroids.length === 0) {
            this.gameOver();
        }
    };

    // Move all game objects
    Game.prototype.moveObjects = function() {
        this.allObjects().forEach(function(object) {
            object.move();
        });
    };

    // Check for collisions between all game objects
    Game.prototype.checkCollisions = function() {
        var collidedPairs = [];
        var objects = this.allObjects();
        for (var i = 0; i < objects.length - 1; i++) {
            for (var j = i + 1; j < objects.length; j++) {
                if (objects[i].isCollidedWith(objects[j])) {
                    collidedPairs.push([objects[i], objects[j]]);
                }
            }
        }
        collidedPairs.forEach(function(pair) {
            pair[0].collideWith(pair[1]);
        });
    };

    // Game step to move objects and check for collisions
    Game.prototype.step = function() {
        this.moveObjects();
        this.checkCollisions();
        this.addMoreAsteroids();
    };

    // Add more asteroids if there are fewer than 2
    Game.prototype.addMoreAsteroids = function() {
        if (this.asteroids.length < 2) {
            Game.NUM_ASTEROIDS = Math.random() * 5;
            this.addAsteroids();
        }
    };

    // Remove an object (either bullet or asteroid) from the game
    Game.prototype.remove = function(obj) {
        var arr = (obj instanceof Asteroids.Bullet) ? this.bullets : this.asteroids;
        var index = arr.indexOf(obj);
        if (index >= 0) {
            arr.splice(index, 1);
        }
    };

    // Get all game objects (asteroids, ship, and bullets)
    Game.prototype.allObjects = function() {
        return this.asteroids.concat([this.ship]).concat(this.bullets);
    };

    // Check if a position is out of bounds
    Game.prototype.isOutofBounds = function(pos) {
        var x = pos[0];
        var y = pos[1];
        return (x < 0 || x > Game.DIM_X || y < 0 || y > Game.DIM_Y);
    };

    // Add a point to the score
    Game.prototype.addPoint = function() {
        this.points += 1;
        $('#number-of-points').html(this.points);
    };

    // Handle game over state
    Game.prototype.gameOver = function() {
        this.removeAllObjects();
        this.asteroids = [];
        this.stopGame = true;
        $('#game-over').removeClass('hidden');
        $('#game-over').addClass('visible');
        $('#final-score').html(this.points);
    };

    // Remove all game objects
    Game.prototype.removeAllObjects = function() {
        var objs = this.allObjects();
        objs.forEach(function(obj) {
            this.remove(obj);
        }.bind(this));
    };

    // Expose the Game constructor to the Asteroids namespace
    Asteroids.Game = Game;
})();
