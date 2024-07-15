(function() {
    // Namespace for Asteroids game to avoid global variable pollution
    window.Asteroids = (window.Asteroids) ? window.Asteroids : {};

    // Constructor for the HighScores object
    Asteroids.HighScores = function() {};

    // Method to fetch and display high scores from the Parse backend
    Asteroids.HighScores.prototype.fetchScores = function() {
        var GameScore = Parse.Object.extend("Score"); // Define the Parse Score class
        var query = new Parse.Query(GameScore); // Create a new query for the Score class
        query.descending("score"); // Sort results by score in descending order
        query.exists("score"); // Ensure that the score field exists
        query.limit(10); // Limit the results to the top 10 scores
        query.find({
            success: function(results) { // On successful query
                var $bestScores = $('#best-scores'); // Select the HTML element to display the scores
                $bestScores.empty(); // Clear any existing scores
                $bestScores.append("<div class='name'><b>Name</b></div><div class='score'><b>Score</b></div><br>"); // Add header for scores
                results.forEach(function(result) { // Iterate over the results
                    var str = "<div class='name'>" + result.get("username") +
                      "</div><div class='score'>" + result.get("score") +
                      "</div><br>"; // Format each score as HTML
                    $bestScores.append(str); // Append the formatted score to the display
                });
            },
            error: function(object, error) { // On query error
                console.error("Error fetching scores:", error.message);
                // Handle error (can add error handling code here)
            }
        });
    };

// Method to add a new score to the Parse backend
    Asteroids.HighScores.prototype.addScore = function(username, points) {
        var GameScore = Parse.Object.extend("Score");
        var gameScore = new GameScore();

        gameScore.set("username", username); // Set username attribute
        gameScore.set("score", parseInt(points)); // Convert points to integer if needed

        gameScore.save(null, {
            success: function(gameScore) {
                console.log('New score added with objectId: ' + gameScore.id);
                // After saving the score, fetch updated scores
                Asteroids.HighScores.prototype.fetchScores();
            },
            error: function(gameScore, error) {
                console.error('Failed to add new score, error: ' + error.message);
                // Handle error
            }
        });
    };


    // Event binding for the "Give me eternal glory!" button
    $(document).ready(function() {
        $('#add-score').on('click', function() {
            var points = $('#final-score').html();
            var username = $('#username').val();
            if (username && points) {
                var highScores = new Asteroids.HighScores();
                highScores.addScore(username, points);
            }
            $('#username').val(''); // Clear username input field
            $('#game-over').removeClass('visible').addClass('hidden'); // Hide game over screen
            $('#leaderboard').removeClass('hidden').addClass('visible'); // Show leaderboard
        });
    });

    // Example usage:
    // Call fetchScores method where needed, after ensuring Parse SDK is initialized
    // Asteroids.HighScores.fetchScores();
})();




