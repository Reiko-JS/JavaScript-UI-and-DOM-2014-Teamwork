define(function (require) {
    'use strict';
    function getRandomNumber(min, max) {
        return (Math.random() * (max - min) + min + 1) | 0;  //remove +1 if "max" is not wanted value
    }

    function getRandomCoords(coordinateBoundaries) {
        return {
            x: getRandomNumber(coordinateBoundaries.x.min, coordinateBoundaries.x.max),
            y: getRandomNumber(coordinateBoundaries.y.min, coordinateBoundaries.y.max)
        };
    }

    function getRandomDirection(coordinates, coordinateBoundaries) {
        var centerX = (coordinateBoundaries.x.max - coordinateBoundaries.x.min) / 2;
        return {
            x: coordinates.x <= centerX ? 1 : -1,  //If the current coordinates are on the left side than the trajectory will be to the right side
            y: 1 //Always goes up
        };
    }

    // ...

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