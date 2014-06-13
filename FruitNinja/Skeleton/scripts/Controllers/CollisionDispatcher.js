define(function (require) {
    'use strict';

    var _context = null;
    var _gameElements = null;

    // Constructor
    function CollisionDispatcher(canvasCtx, gameElements) {
        _context = canvasCtx;
        _gameElements = gameElements;
    }

    // mouseCoords is array of last 10-20 mouse coords that was on the screen { x, y }
    function checkForCuttedOffFruits(mouseCoords) {
        // Check every element from gameElements

        // if mouse was over the fruit -> fruit.cutOff();
    }

    return CollisionDispatcher;
});