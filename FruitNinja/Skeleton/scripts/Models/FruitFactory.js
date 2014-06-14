define(function (require) {
    'use strict';

    var Fruit = require('./Fruit.js');
    var Utility = require('./../Helper/Utility.js');

    var fruits = [{
            type: 'orange',
            points: 20
        }, {
            type: 'coconut',
            points: 30
        }, {
            type: 'watermelon',
            points: 30
        }
    ];

    function getRandomFruit(coordsBoundaries) {
        var randomFruit = fruits[Utility.getRandomNumber(0, fruits.length - 1)];
        var fruitType = randomFruit.type;
        var fruitPoints = randomFruit.points,
            defImg = fruitType + '.png',
            hitImg = fruitType + '-hit.png';

        var coords = Utility.getRandomCoords(coordsBoundaries),
            rndDir = Utility.getRandomDirection(coords, coordsBoundaries),
            angle = Utility.getRandomNumber(0, 30),
            factorY = Utility.getRandomNumber(2.5, 5);

        var newFruit = new Fruit(coords.x, coords.y, rndDir, angle, factorY, defImg, hitImg, fruitPoints);
        return newFruit;
    }

    function getFruitsList() {
        return fruits;
    }

    return {
        getRandomFruit: getRandomFruit,
        getFruitsList: getFruitsList
    };
});
