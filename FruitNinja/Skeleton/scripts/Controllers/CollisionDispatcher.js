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
    /// 'mousePath' is collection of last 10-20 mouse coords that were on the screen { x, y }
    /// </summary>
    CollisionDispatcher.prototype.checkForCuttedOffFruits = function(mousePath, fruitCollection) {
        var collectedPoints = 0;

        for (var i = 0; i < fruitCollection.length; i++) {
            if (fruitCollection[i].isCut) {
                continue;
            }

            for (var j = 0; j < mousePath.length; j++) {
                if (isMouseOverFruit(mousePath[j], fruitCollection[i].mX, fruitCollection[i].mY)) {
                    collectedPoints += fruitCollection[i].points;
                    fruitCollection[i].cutOff();
                    break;
                }
            }
        }

        return collectedPoints;
    };

    return CollisionDispatcher;
});