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
            var randomFruit = fruits[Utility.getRandomNumber(0, fruits.length)];
            var fruitType = randomFruit.type;
            var fruitPoints = randomFruit.points;
            var fruitDefaultImage = fruitType + '.png';
            var fruitHitImage = fruitType + '-hit.png';

        // ...
        var randomCoordinates = Utility.getRandomCoords(coordinateBoundaries),
            randomDirection = Utility.getRandomDirection(randomCoordinates, coordinateBoundaries);

        // ...

        return new Fruit(randomCoordinates, randomDirection, fruitDefaultImage, fruitHitImage, fruitPoints);
    }

    return {
        getRandomFruit: getRandomFruit
    };
});
