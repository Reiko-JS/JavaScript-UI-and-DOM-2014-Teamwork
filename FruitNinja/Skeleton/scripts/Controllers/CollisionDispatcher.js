define(function (require) {
    'use strict';

    var _context = null;
    var _gameElements = null;
    var _fruitsWidth = 100;
    var _fruitsHeight = 100;

    // Constructor
    function CollisionDispatcher(canvasCtx, gameElements) {
        _context = canvasCtx;
        _gameElements = gameElements;
    }

    // mouseCoords is array of last 10-20 mouse coords that was on the screen { x, y }
    CollisionDispatcher.prototype.checkForCuttedOffFruits = function checkForCuttedOffFruits(mouseCoords, fruit, x, y) {
        //console.log(mouseCoords.isMouseDown);
        if (mouseCoords.isMouseDown) {
            for (var j = 0; j < mouseCoords.path.length; j++) {
                var mouseCoordinate = mouseCoords.path[j];
                if (x <= mouseCoordinate.x &&
                    (x + _fruitsWidth) > mouseCoordinate.x &&
                    y <= mouseCoordinate.y &&
                    (y + _fruitsHeight) > mouseCoordinate.y) {
                    fruit.cutOff();
                }
            }
        }
        // Check every element from gameElements\
        // if mouse was over the fruit -> fruit.cutOff();
    };

    return CollisionDispatcher;
});
