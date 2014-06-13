define(function (require) {
    'use strict';
    var Fruit = require('./Fruit.js');
    var Utility = require('./../Helper/Utility.js');

    var fruits = [ // Fruit - points
        {
            type: 'orange',
            points: 20
        }, {
            type: 'apple',
            points: 30
        }, {
            type: 'watermelon',
            points: 30
        }
        //            ['orange', 20],
        //            ['apple', 30],
        //            [ /* ... */ ]
    ];

    function getRandomFruit(coordinateBoundaries) {
        var utility = new Utility(),
            randomFruit = fruits[utility.getRandomNumber(0, fruits.length)],
            fruitType = randomFruit.type,
            fruitPoints = randomFruit.points,
            fruitDefaultImage = fruitType + '.png',
            fruitHitImage = fruitType + '-hit.png';

        // ...
        var randomCoordinates = utility.getRandomCoords(coordinateBoundaries),
            randomDirection = utility.getRandomDirection(randomCoordinates, coordinateBoundaries);

        // ...

        return new Fruit(randomCoordinates, randomDirection, fruitDefaultImage, fruitHitImage, fruitPoints);
    }

    return {
        getRandomFruit: getRandomFruit
    };
});
