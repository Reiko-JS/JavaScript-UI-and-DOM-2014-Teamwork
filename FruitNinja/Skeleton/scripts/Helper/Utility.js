define(function (require) {
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

    function calculateObjectCoordinates(object) {
        return {
            x: 0,
            y: 0
        };
    }

    return {
        getRandomNumber: function (min, max) {
            return getRandomNumber(min, max);
        },
        getRandomCoords: function (coordinateBoundaries) {
            return getRandomCoords(coordinateBoundaries);
        },
        getRandomDirection: function (coordinates, coordinateBoundaries) {
            return getRandomDirection(coordinates, coordinateBoundaries);
        }
    };
});