define(function(require) {
    'use strict';

    // Constructor
    function Player(playerOptions) {
        this.points = 0;
        this.lives = playerOptions.lives;
        this.previousPointsCountState = -1;
    }

    /// <summary>
    /// Update player points
    /// </summary>
    Player.prototype.updatePoints = function(points) {
        this.previousPointsCountState = this.points;
        this.points += points;
    };

    return Player;
});