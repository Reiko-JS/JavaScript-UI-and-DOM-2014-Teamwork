define(function(require) {
    'use strict';

    /// <summary>
    /// Return number in range [min, max]
    /// </summary>
    function getRandomNumber(min, max) {
        return (Math.random() * (max - min + 1) + min) | 0;
    }

    /// <summary>
    /// Return 'true' for left direction, otherwise return 'false' for right
    /// </summary>
    function getRandomDirection() {
        var rndNumber = getRandomNumber(0, 500);
        var isLeft = ((rndNumber % 2) & 1);
        return isLeft;
    }

    /// <summary>
    /// Return random 'x' and 'y'
    /// Parameter 'coordBoundaries' specified the range of 'x' and 'y'
    /// </summary>
    function getRandomCoords(coordBoundaries) {
        return {
            x: getRandomNumber(coordBoundaries.x.min, coordBoundaries.x.max),
            y: getRandomNumber(coordBoundaries.y.min, coordBoundaries.y.max),
        };
    }

    function calcDistanceBetweenTwoPoints(point1, point2) {
        return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
    }

    function calcAngleBetweenTwoPoints(point1, point2) {
        return Math.atan2(point2.x - point1.x, point2.y - point1.y);
    }

    function movePoint(point, canvasHeight, isDirectionLeft) {
        var pRadius = isDirectionLeft ? point.radius : -point.radius;

        return {
            x: point.x + pRadius * Math.cos(point.angle / 180 * Math.PI) / 1.2,
            y: canvasHeight - (point.y + point.radius * Math.sin(point.angle / 180 * Math.PI) * point.factorY)
        };
    }

    return {
        getRandomNumber: function(min, max) {
            return getRandomNumber(min, max);
        },
        getRandomCoords: function(coordinateBoundaries) {
            return getRandomCoords(coordinateBoundaries);
        },
        getRandomDirection: function(coordinates, coordinateBoundaries) {
            return getRandomDirection(coordinates, coordinateBoundaries);
        },
        calcDistanceBetweenTwoPoints: function(point1, point2) {
            return calcDistanceBetweenTwoPoints(point1, point2);
        },
        calcAngleBetweenTwoPoints: function(point1, point2) {
            return calcAngleBetweenTwoPoints(point1, point2);
        },
        movePoint: function(point, isDirectionLeft) {
            return movePoint(point, isDirectionLeft);
        }
    };
});