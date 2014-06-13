define(function (require) {
    'use strict';

    function getRandomNumber(min, max) {
        return (Math.random() * (max - min + 1) + min) | 0; //remove +1 if "max" is not wanted value
    }

    function getRandomDirection() {
        var rndNumber = getRandomNumber(0, 500);
        return ((rndNumber % 2) & 1) === 0
    }

    function getRandomCoords(coordBoundaries) {
        return {
            x: getRandomNumber(coordBoundaries.x.min, coordBoundaries.x.max),
            y: getRandomNumber(coordBoundaries.y.min, coordBoundaries.y.max),
        };
    }

    //function getRandomCoords(minX, maxX, minY, maxY) {
    //    return {
    //        x: getRandomNumber(minX, maxX),
    //        y: getRandomNumber(minY, maxY),
    //    };
    //}
    
    //function getRandomDirection(coordinates, coordinateBoundaries) {
    //    var centerX = (coordinateBoundaries.x.max - coordinateBoundaries.x.min) / 2;
    //    return {
    //        x: coordinates.x <= centerX ? 1 : -1, //If the current coordinates are on the left side than the trajectory will be to the right side
    //        y: 1 //Always goes up
    //    };
    //}

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