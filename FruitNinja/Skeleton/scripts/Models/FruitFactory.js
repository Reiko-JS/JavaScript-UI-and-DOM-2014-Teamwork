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

    var imagesFruits = [];
    var imagesFruitsHit = [];

    //TODO add onload check. When using image.onload in the for loop the .onload function is skipped
    function loadImages() {
        if (imagesFruits.length <= 0) {
            for (var i = 0, length = fruits.length; i < length; i++) {
                var image = new Image();
                image.src = 'images/' + fruits[i].type + '.png';
                //image.onload = function () {
                imagesFruits.push(image);
                //};
            }
        }
        if (imagesFruitsHit.length <= 0) {
            for (i = 0, length = fruits.length; i < length; i++) {
                var image = new Image();
                image.src = 'images/' + fruits[i].type + '-hit.png';
                //image.onload = function () {
                imagesFruitsHit.push(image);
                //};
            }
        }
    }

    function getRandomFruit(coordsBoundaries) {
        var randomNumber = Utility.getRandomNumber(0, fruits.length - 1);
        var randomFruit = fruits[randomNumber];
        //var fruitType = randomFruit.type;
        var fruitPoints = randomFruit.points,
            defImg = imagesFruits[randomNumber],
            hitImg = imagesFruitsHit[randomNumber];

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
        getFruitsList: getFruitsList,
        loadImages: loadImages
    };
});
