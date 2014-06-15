define(function(require) {
    'use strict';

    var _fruitsWidth = 100;
    var _fruitsHeight = 100;

    // Constructor
    function CollisionDispatcher() {}

    /// <summary>
    /// Check if mouseCoordinate { x, y } is over fruit { fX, fY }
    /// </summary>
    function isMouseOverFruit(mouseCoordinate, x, y) {
        return x <= mouseCoordinate.x && (x + _fruitsWidth) > mouseCoordinate.x &&
            y <= mouseCoordinate.y && (y + _fruitsHeight) > mouseCoordinate.y;
    }

    /// <summary>
    /// 'mouseCoords' is collection of last 10-20 mouse coords that were on the screen { x, y }
    /// </summary>
    CollisionDispatcher.prototype.checkForCuttedOffFruits = function(mouseCoords, fruit, fX, fY) {
        if (!mouseCoords.isMouseDown) {
            return;
        }

        for (var j = 0; j < mouseCoords.path.length; j++) {
            if (isMouseOverFruit(mouseCoords.path[j], fX, fY)) {
                fruit.cutOff();
            }
        }
    };

    return CollisionDispatcher;
});