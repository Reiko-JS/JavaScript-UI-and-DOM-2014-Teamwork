define(function(require) {
    'use strict';

    // Constructor
    function Player(playerOptions) {
        this.points = 0;
        this.lives = playerOptions.lives;
    }

    /// <summary>
    /// Update player points
    /// </summary>
    Player.prototype.updatePoints = function(points) {
        this.points += points;
    };

    return Player;
});